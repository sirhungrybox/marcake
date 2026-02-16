# Google Search Console

## Overview

Google Search Console provides data about your website's presence in Google search results, including search queries, click-through rates, indexation status, and technical issues.

## Authentication

### OAuth 2.0

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Search Console API
3. Create OAuth 2.0 credentials
4. Verify site ownership in Search Console

### Service Account

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

Grant service account access:
1. Go to Search Console property
2. Settings → Users and permissions
3. Add user with service account email

### Environment Variables

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
GSC_SITE_URL=https://example.com/
```

## Common Operations

### Search Analytics Query

```javascript
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

async function getSearchAnalytics(siteUrl, startDate, endDate) {
  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: startDate,
      endDate: endDate,
      dimensions: ['query', 'page'],
      rowLimit: 1000
    }
  });

  return response.data.rows;
}
```

### Get Top Queries

```javascript
async function getTopQueries(siteUrl, startDate, endDate, limit = 100) {
  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: startDate,
      endDate: endDate,
      dimensions: ['query'],
      rowLimit: limit,
      orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }]
    }
  });

  return response.data.rows;
}
```

### Get Index Coverage

```javascript
async function getIndexCoverage(siteUrl) {
  const response = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: 'https://example.com/page',
      siteUrl: siteUrl
    }
  });

  return response.data;
}
```

### Submit Sitemap

```javascript
async function submitSitemap(siteUrl, sitemapUrl) {
  const response = await searchconsole.sitemaps.submit({
    siteUrl: siteUrl,
    feedpath: sitemapUrl
  });

  return response.data;
}
```

### Get Sitemaps

```javascript
async function getSitemaps(siteUrl) {
  const response = await searchconsole.sitemaps.list({
    siteUrl: siteUrl
  });

  return response.data.sitemap;
}
```

### Request Indexing

```javascript
async function requestIndexing(siteUrl, url) {
  const response = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: url,
      siteUrl: siteUrl
    }
  });

  // Note: Direct indexing requests are limited
  return response.data;
}
```

### Filter by Country/Device

```javascript
async function getSearchByCountry(siteUrl, startDate, endDate) {
  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: startDate,
      endDate: endDate,
      dimensions: ['country'],
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'device',
          operator: 'equals',
          expression: 'MOBILE'
        }]
      }]
    }
  });

  return response.data.rows;
}
```

## Best Practices

1. **Query in batches** - Use pagination for large datasets
2. **Compare time periods** - Track trends over time
3. **Filter by page type** - Analyze different content sections
4. **Monitor indexation** - Catch issues early
5. **Track Core Web Vitals** - Via GSC experience report

## Rate Limits

- Search Analytics API: 200 queries/minute per project
- URL Inspection API: 2,000 requests/day per property
- Sitemaps API: Limited by property

## Related Skills

- `seo-audit` - Technical SEO analysis
- `programmatic-seo` - Index monitoring
- `content-strategy` - Query opportunity analysis
