# Adzuna Proxy Worker — DGAwijzer.nl

## Wat doet deze worker?
Serverloze Cloudflare Worker die Adzuna vacatures ophaalt als proxy,
zodat de API-sleutel **nooit** in de frontend-code staat.

## Setup (5 minuten)

### 1. Maak een gratis Adzuna account
→ https://developer.adzuna.com  
Noteer je `App ID` en `App Key`.

### 2. Installeer Wrangler (Cloudflare CLI)
```bash
npm install -g wrangler
wrangler login
```

### 3. Maak een Worker aan
```bash
wrangler init adzuna-proxy
# Kopieer adzuna-worker.js naar src/index.js
# Zet in wrangler.toml: name = "adzuna-proxy"
```

### 4. Voeg secrets toe (worden NOOIT in code gezet)
```bash
wrangler secret put ADZUNA_APP_ID
# → voer je App ID in

wrangler secret put ADZUNA_APP_KEY
# → voer je App Key in
```

### 5. Deploy
```bash
wrangler deploy
```
Je krijgt een URL zoals:  
`https://adzuna-proxy.jouw-naam.workers.dev`

### 6. Configureer de frontend
Open `/js/config.js` en vul in:
```js
WORKER_ENDPOINT: "https://adzuna-proxy.jouw-naam.workers.dev/api/jobs",
```

## Endpoint

```
GET /api/jobs?q=<functie>&where=<locatie>&page=1
```

| Parameter | Verplicht | Standaard | Max |
|---|---|---|---|
| `q` | Ja | — | 100 tekens |
| `where` | Nee | `Nederland` | 50 tekens |
| `page` | Nee | `1` | `5` |

### Voorbeeld response
```json
{
  "count": 142,
  "page": 1,
  "q": "directeur accountantskantoor",
  "where": "Nederland",
  "jobs": [
    {
      "title": "Directeur Accountantskantoor",
      "company": "Baker Tilly",
      "location": "Amsterdam",
      "redirect_url": "https://...",
      "created": "2026-05-15T09:00:00Z",
      "salary_min": 80000,
      "salary_max": 110000,
      "salary_is_predicted": false
    }
  ]
}
```

## Rate limiting & caching
- Max **20 verzoeken per minuut** per IP
- Edge caching: **6 uur** (Cache-Control: max-age=21600)
- Bij overschrijding: HTTP 429 + Retry-After: 60

## Kosten
Cloudflare Workers gratis tier: **100.000 verzoeken/dag**.
Bij normaal gebruik van DGAwijzer meer dan voldoende.
