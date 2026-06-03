/**
 * DGAwijzer.nl — Configuratie
 * Stel hier het Cloudflare Worker endpoint in na deployment.
 * Laat WORKER_ENDPOINT leeg om de fallback-links te tonen.
 */
const DGAWIJZER_CONFIG = {
  // Vul in na deployment van de Cloudflare Worker:
  // WORKER_ENDPOINT: "https://adzuna-proxy.jouw-naam.workers.dev/api/jobs",
  WORKER_ENDPOINT: "",

  // Fallback zoek-URLs (worden getoond als WORKER_ENDPOINT leeg is of faalt)
  FALLBACK_URLS: {
    adzuna:     q => `https://www.adzuna.nl/zoeken?q=${encodeURIComponent(q)}&l=Nederland`,
    linkedin:   q => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=Nederland`,
    indeed:     q => `https://nl.indeed.com/jobs?q=${encodeURIComponent(q)}&l=Nederland`,
    glassdoor:  q => `https://www.glassdoor.nl/Job/nederland-${encodeURIComponent(q.toLowerCase().replace(/ /g,'-'))}-vacatures-SRCH_IL.0,10_IN178_KO11,${11+q.length}.htm`,
  }
};
