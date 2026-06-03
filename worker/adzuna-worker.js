/**
 * Cloudflare Worker — Adzuna Vacature Proxy voor DGAwijzer.nl
 *
 * SETUP:
 * 1. Maak account op https://workers.cloudflare.com
 * 2. Maak een nieuw Worker aan en plak deze code
 * 3. Voeg secrets toe via wrangler of het dashboard:
 *    wrangler secret put ADZUNA_APP_ID
 *    wrangler secret put ADZUNA_APP_KEY
 * 4. Deploy: wrangler deploy
 * 5. Kopieer de worker URL naar /js/config.js → WORKER_ENDPOINT
 *
 * ENDPOINT: GET /api/jobs?q=<functie>&where=<locatie>&page=1
 */

const ALLOWED_ORIGINS = ["https://dgawijzer.nl", "https://www.dgawijzer.nl"];
const CACHE_TTL = 21600; // 6 uur
const MAX_RESULTS = 10;
const RATE_LIMIT_PER_MIN = 20; // per IP

// Eenvoudige in-memory rate limiter (reset per Worker-instantie)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_PER_MIN) return false;
  entry.count++;
  rateLimitMap.set(ip, entry);
  return true;
}

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/api/jobs") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Rate limit
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60", ...corsHeaders(origin) },
      });
    }

    const q     = (url.searchParams.get("q") || "").slice(0, 100);
    const where = (url.searchParams.get("where") || "Nederland").slice(0, 50);
    const page  = Math.min(parseInt(url.searchParams.get("page") || "1"), 5);

    if (!q) {
      return new Response(JSON.stringify({ error: "Parameter 'q' is verplicht" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Cache key
    const cacheKey = new Request(
      `https://adzuna-cache/${encodeURIComponent(q)}/${encodeURIComponent(where)}/${page}`
    );
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) {
      const resp = new Response(cached.body, cached);
      resp.headers.set("X-Cache", "HIT");
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => resp.headers.set(k, v));
      return resp;
    }

    // Adzuna API aanroepen
    const apiUrl = new URL(
      `https://api.adzuna.com/v1/api/jobs/nl/search/${page}`
    );
    apiUrl.searchParams.set("app_id",  env.ADZUNA_APP_ID);
    apiUrl.searchParams.set("app_key", env.ADZUNA_APP_KEY);
    apiUrl.searchParams.set("what",    q);
    apiUrl.searchParams.set("where",   where);
    apiUrl.searchParams.set("results_per_page", String(MAX_RESULTS));
    apiUrl.searchParams.set("content-type", "application/json");

    let adzunaResp;
    try {
      adzunaResp = await fetch(apiUrl.toString());
    } catch (e) {
      return new Response(JSON.stringify({ error: "Upstream fout", detail: e.message }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    if (!adzunaResp.ok) {
      return new Response(JSON.stringify({ error: "Adzuna API fout", status: adzunaResp.status }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const raw = await adzunaResp.json();

    // Filter tot minimale velden
    const jobs = (raw.results || []).slice(0, MAX_RESULTS).map(j => ({
      title:               j.title,
      company:             j.company?.display_name || null,
      location:            j.location?.display_name || null,
      redirect_url:        j.redirect_url,
      created:             j.created,
      salary_min:          j.salary_min || null,
      salary_max:          j.salary_max || null,
      salary_is_predicted: j.salary_is_predicted === "1",
    }));

    const body = JSON.stringify({ count: raw.count || 0, page, q, where, jobs });
    const response = new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_TTL}`,
        "X-Cache": "MISS",
        ...corsHeaders(origin),
      },
    });

    // Sla op in edge cache
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
