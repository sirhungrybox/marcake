# Ahrefs

## Overview

Ahrefs is an SEO toolset for backlink analysis, keyword research, competitor analysis, rank tracking, and site auditing. Known for having one of the largest backlink indexes.

## Authentication

### API Token

1. Log in to Ahrefs
2. Go to Account → API → Generate Token
3. Copy your API token

### Environment Variables

```bash
AHREFS_API_TOKEN=your_api_token
```

## Common Operations

### Domain Rating

```javascript
async function getDomainRating(domain) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/domain-rating?target=${domain}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Backlinks Overview

```javascript
async function getBacklinksOverview(domain) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/backlinks-stats?target=${domain}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Get Backlinks

```javascript
async function getBacklinks(domain, limit = 100) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/backlinks?target=${domain}&mode=domain&limit=${limit}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Organic Keywords

```javascript
async function getOrganicKeywords(domain, country = 'us', limit = 100) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/organic-keywords?target=${domain}&country=${country}&limit=${limit}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Keywords Explorer

```javascript
async function getKeywordData(keyword, country = 'us') {
  const response = await fetch(
    `https://api.ahrefs.com/v3/keywords-explorer/overview?keyword=${encodeURIComponent(keyword)}&country=${country}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Keyword Ideas

```javascript
async function getKeywordIdeas(keyword, country = 'us', limit = 100) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/keywords-explorer/keyword-ideas?keyword=${encodeURIComponent(keyword)}&country=${country}&limit=${limit}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Top Pages

```javascript
async function getTopPages(domain, limit = 100) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/top-pages?target=${domain}&limit=${limit}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Referring Domains

```javascript
async function getReferringDomains(domain, limit = 100) {
  const response = await fetch(
    `https://api.ahrefs.com/v3/site-explorer/refdomains?target=${domain}&limit=${limit}&output=json`,
    {
      headers: {
        'Authorization': `Bearer ${AHREFS_API_TOKEN}`
      }
    }
  );

  return response.json();
}
```

## Best Practices

1. **Use appropriate mode** - domain, prefix, exact, subdomains
2. **Filter by country** - For locale-specific data
3. **Monitor API credits** - Requests consume credits
4. **Cache competitive data** - Doesn't change rapidly
5. **Use limit parameter** - Request only what you need

## Rate Limits

- Credits vary by plan
- Rate limits depend on subscription tier
- Pagination available for large datasets

## Related Skills

- `seo-audit` - Backlink and keyword analysis
- `competitor-alternatives` - Competitive backlink gaps
- `content-strategy` - Content opportunity research
