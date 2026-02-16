# Adobe Analytics

## Overview

Adobe Analytics is an enterprise analytics platform that provides advanced analysis, real-time data processing, and integration with the Adobe Experience Cloud ecosystem.

## Authentication

### OAuth 2.0 / JWT Authentication

Adobe Analytics API uses OAuth 2.0 or JWT (Service Account) authentication through Adobe I/O.

1. Go to [Adobe Developer Console](https://developer.adobe.com/console)
2. Create a new project
3. Add Adobe Analytics API
4. Generate credentials (OAuth or JWT)

### Environment Variables

```bash
ADOBE_CLIENT_ID=your_client_id
ADOBE_CLIENT_SECRET=your_client_secret
ADOBE_ORG_ID=your_org_id
ADOBE_TECHNICAL_ACCOUNT_ID=your_tech_account_id
ADOBE_PRIVATE_KEY_PATH=/path/to/private.key
```

## Common Operations

### Generate Access Token (JWT)

```javascript
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');

async function getAccessToken() {
  const privateKey = fs.readFileSync(process.env.ADOBE_PRIVATE_KEY_PATH);

  const jwtPayload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    iss: process.env.ADOBE_ORG_ID,
    sub: process.env.ADOBE_TECHNICAL_ACCOUNT_ID,
    aud: `https://ims-na1.adobelogin.com/c/${process.env.ADOBE_CLIENT_ID}`,
    'https://ims-na1.adobelogin.com/s/ent_analytics_bulk_ingest_sdk': true
  };

  const token = jwt.sign(jwtPayload, privateKey, { algorithm: 'RS256' });

  const response = await axios.post(
    'https://ims-na1.adobelogin.com/ims/exchange/jwt',
    new URLSearchParams({
      client_id: process.env.ADOBE_CLIENT_ID,
      client_secret: process.env.ADOBE_CLIENT_SECRET,
      jwt_token: token
    })
  );

  return response.data.access_token;
}
```

### Run Report (Analytics 2.0 API)

```javascript
async function runReport(reportSuiteId, dateRange, metrics, dimensions) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    `https://analytics.adobe.io/api/${COMPANY_ID}/reports`,
    {
      rsid: reportSuiteId,
      globalFilters: [{
        type: 'dateRange',
        dateRange: dateRange // e.g., "2024-01-01T00:00:00/2024-01-31T23:59:59"
      }],
      metricContainer: {
        metrics: metrics.map(m => ({ id: m }))
      },
      dimension: dimensions[0],
      settings: {
        limit: 50,
        page: 0
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': process.env.ADOBE_CLIENT_ID,
        'x-proxy-global-company-id': COMPANY_ID
      }
    }
  );

  return response.data;
}
```

### Get Dimensions

```javascript
async function getDimensions(reportSuiteId) {
  const accessToken = await getAccessToken();

  const response = await axios.get(
    `https://analytics.adobe.io/api/${COMPANY_ID}/dimensions?rsid=${reportSuiteId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': process.env.ADOBE_CLIENT_ID
      }
    }
  );

  return response.data;
}
```

### Get Metrics

```javascript
async function getMetrics(reportSuiteId) {
  const accessToken = await getAccessToken();

  const response = await axios.get(
    `https://analytics.adobe.io/api/${COMPANY_ID}/metrics?rsid=${reportSuiteId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': process.env.ADOBE_CLIENT_ID
      }
    }
  );

  return response.data;
}
```

### Data Insertion API

```javascript
async function insertData(reportSuiteId, data) {
  const response = await axios.post(
    `https://api.omniture.com/b/ss/${reportSuiteId}/0`,
    data,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );

  return response.data;
}
```

## Best Practices

1. **Use Analytics 2.0 API** - More flexible than legacy API
2. **Cache access tokens** - They're valid for 24 hours
3. **Use segments** - Pre-define segments in UI, reference by ID
4. **Batch reports** - Combine related metrics in single request
5. **Monitor rate limits** - Enterprise limits vary by contract

## Rate Limits

- Reports API: 6-12 concurrent reports (varies by contract)
- Data Insertion: 2000 events/second per report suite
- API calls: Rate limits vary by product tier

## Related Skills

- `analytics-tracking` - Implementation planning
- `ab-test-setup` - Adobe Target integration
- `page-cro` - Conversion analysis
