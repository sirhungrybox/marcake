# Dub.co

## Overview

Dub.co is a modern link management platform with analytics, short links, QR codes, and referral tracking features designed for marketing teams and developers.

## Authentication

### API Key

1. Go to Dub.co Dashboard → Settings → API Keys
2. Create a new API key
3. Copy and store securely

### Environment Variables

```bash
DUB_API_KEY=dub_xxxxxxxx
DUB_WORKSPACE_ID=ws_xxxxxxxx
```

## Common Operations

### Create Short Link

```javascript
async function createLink(url, domain = null, key = null) {
  const response = await fetch(
    'https://api.dub.co/links',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        domain: domain, // Custom domain or null for dub.sh
        key: key // Custom slug or null for random
      })
    }
  );

  return response.json();
}
```

### Create Link with UTM Parameters

```javascript
async function createLinkWithUTM(url, utmParams, customSlug = null) {
  const response = await fetch(
    'https://api.dub.co/links',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        key: customSlug,
        utm_source: utmParams.source,
        utm_medium: utmParams.medium,
        utm_campaign: utmParams.campaign,
        utm_term: utmParams.term,
        utm_content: utmParams.content
      })
    }
  );

  return response.json();
}
```

### Get Link Analytics

```javascript
async function getLinkAnalytics(linkId, interval = '24h') {
  const response = await fetch(
    `https://api.dub.co/analytics?linkId=${linkId}&interval=${interval}`,
    {
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Get Clicks by Country

```javascript
async function getClicksByCountry(linkId) {
  const response = await fetch(
    `https://api.dub.co/analytics/country?linkId=${linkId}`,
    {
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Get All Links

```javascript
async function getLinks(page = 1, perPage = 100) {
  const response = await fetch(
    `https://api.dub.co/links?page=${page}&perPage=${perPage}`,
    {
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Update Link

```javascript
async function updateLink(linkId, updates) {
  const response = await fetch(
    `https://api.dub.co/links/${linkId}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );

  return response.json();
}
```

### Delete Link

```javascript
async function deleteLink(linkId) {
  const response = await fetch(
    `https://api.dub.co/links/${linkId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Bulk Create Links

```javascript
async function bulkCreateLinks(links) {
  const response = await fetch(
    'https://api.dub.co/links/bulk',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(links.map(link => ({
        url: link.url,
        key: link.slug,
        utm_source: link.utmSource,
        utm_medium: link.utmMedium,
        utm_campaign: link.utmCampaign
      })))
    }
  );

  return response.json();
}
```

### Create QR Code

```javascript
async function createQRCode(linkId, options = {}) {
  const params = new URLSearchParams({
    linkId: linkId,
    ...options
  });

  const response = await fetch(
    `https://api.dub.co/qr?${params}`,
    {
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  // Returns image data
  return response.blob();
}
```

### Get Link by Slug

```javascript
async function getLinkBySlug(domain, slug) {
  const response = await fetch(
    `https://api.dub.co/links/info?domain=${domain}&key=${slug}`,
    {
      headers: {
        'Authorization': `Bearer ${DUB_API_KEY}`
      }
    }
  );

  return response.json();
}
```

## Best Practices

1. **Custom domains** - Use branded domains for higher CTR
2. **UTM tracking** - Always add UTM parameters for attribution
3. **Link groups** - Organize links by campaign or project
4. **Password protection** - Secure sensitive links
5. **Expiration dates** - Set expiration for time-limited campaigns

## Rate Limits

- Free: 100 links/month
- Pro: 5,000 links/month
- API: 600 requests/minute

## Related Skills

- `analytics-tracking` - Link attribution
- `referral-program` - Referral link tracking
- `paid-ads` - Campaign tracking links
