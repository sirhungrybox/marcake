# Semrush

## Overview

Semrush is an all-in-one SEO and digital marketing toolkit that provides keyword research, competitive analysis, site audits, rank tracking, and content optimization tools.

## Authentication

### API Key

1. Log in to Semrush
2. Go to My Profile → API Units
3. Generate or copy your API key

### Environment Variables

```bash
SEMRUSH_API_KEY=your_api_key
```

## Common Operations

### Keyword Overview

```javascript
async function getKeywordOverview(keyword, database = 'us') {
  const response = await fetch(
    `https://api.semrush.com/?type=phrase_this&key=${SEMRUSH_API_KEY}&phrase=${encodeURIComponent(keyword)}&database=${database}&export_columns=Ph,Nq,Cp,Co,Nr`
  );

  return parseCSV(await response.text());
}

// Response columns:
// Ph = Keyword
// Nq = Search Volume
// Cp = CPC
// Co = Competition
// Nr = Number of Results
```

### Related Keywords

```javascript
async function getRelatedKeywords(keyword, database = 'us', limit = 100) {
  const response = await fetch(
    `https://api.semrush.com/?type=phrase_related&key=${SEMRUSH_API_KEY}&phrase=${encodeURIComponent(keyword)}&database=${database}&export_columns=Ph,Nq,Cp,Co&export_escape=1&display_limit=${limit}`
  );

  return parseCSV(await response.text());
}
```

### Domain Overview

```javascript
async function getDomainOverview(domain, database = 'us') {
  const response = await fetch(
    `https://api.semrush.com/?type=domain_ranks&key=${SEMRUSH_API_KEY}&domain=${domain}&database=${database}&export_columns=Dn,Rk,Or,Ot,Oc,Ad,At,Ac`
  );

  return parseCSV(await response.text());
}

// Response columns:
// Dn = Domain
// Rk = Rank
// Or = Organic Keywords
// Ot = Organic Traffic
// Oc = Organic Cost
// Ad = Adwords Keywords
// At = Adwords Traffic
// Ac = Adwords Cost
```

### Organic Keywords for Domain

```javascript
async function getDomainOrganicKeywords(domain, database = 'us', limit = 100) {
  const response = await fetch(
    `https://api.semrush.com/?type=domain_organic&key=${SEMRUSH_API_KEY}&domain=${domain}&database=${database}&export_columns=Ph,Po,Nq,Cp,Co,Ur,Tr&display_limit=${limit}`
  );

  return parseCSV(await response.text());
}

// Response columns:
// Ph = Keyword
// Po = Position
// Nq = Search Volume
// Cp = CPC
// Co = Competition
// Ur = URL
// Tr = Traffic %
```

### Backlinks Overview

```javascript
async function getBacklinksOverview(domain) {
  const response = await fetch(
    `https://api.semrush.com/analytics/v1/?key=${SEMRUSH_API_KEY}&type=backlinks_overview&target=${domain}&target_type=root_domain`
  );

  return response.json();
}
```

### Site Audit

```javascript
async function createSiteAudit(domain) {
  const response = await fetch(
    'https://api.semrush.com/management/v1/projects',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SEMRUSH_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: domain,
        name: `Audit ${domain}`
      })
    }
  );

  return response.json();
}
```

### Helper: Parse CSV Response

```javascript
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(';');

  return lines.slice(1).map(line => {
    const values = line.split(';');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
  });
}
```

## Best Practices

1. **Use database parameter** - Match to target market (us, uk, etc.)
2. **Monitor API units** - Requests consume units
3. **Cache results** - SEO data doesn't change rapidly
4. **Batch keyword research** - Multiple keywords per request
5. **Use export_columns** - Request only needed data

## Rate Limits

- API units vary by plan
- 10 requests/second maximum
- Results pagination available

## Related Skills

- `seo-audit` - Keyword and competitive analysis
- `programmatic-seo` - Keyword opportunity research
- `competitor-alternatives` - Competitive gap analysis
