# Google Analytics 4 (GA4)

## Overview

Google Analytics 4 is Google's current analytics platform for measuring website and app traffic, user behavior, and conversions. It uses an event-based data model and integrates with Google's advertising products.

## Authentication

### OAuth 2.0 Setup

GA4 uses OAuth 2.0 for API access.

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project or select existing
3. Enable Google Analytics Data API
4. Create OAuth 2.0 credentials
5. Configure consent screen

### Service Account (Server-to-Server)

For automated access:

```bash
# Download service account JSON key
# Set environment variable
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

### Environment Variables

```bash
GA4_PROPERTY_ID=properties/123456789
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```

## Common Operations

### Run a Report

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const client = new BetaAnalyticsDataClient();

async function runReport() {
  const [response] = await client.runReport({
    property: 'properties/YOUR_PROPERTY_ID',
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
  });

  return response.rows;
}
```

### Get Real-Time Data

```javascript
async function getRealtimeData() {
  const [response] = await client.runRealtimeReport({
    property: 'properties/YOUR_PROPERTY_ID',
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'activeUsers' }],
  });

  return response.rows;
}
```

### Track Events (Client-side)

```javascript
// gtag.js event tracking
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 99.99,
  currency: 'USD',
  items: [{
    item_id: 'SKU001',
    item_name: 'Product Name',
    price: 99.99
  }]
});
```

### Measurement Protocol (Server-side)

```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = 'YOUR_API_SECRET';

async function sendEvent(clientId, eventName, params) {
  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: eventName, params }]
      })
    }
  );
  return response;
}
```

## Best Practices

1. **Use Data API for reporting** - Don't scrape the UI
2. **Batch requests** - Combine multiple dimensions/metrics
3. **Cache frequently accessed data** - Reduce API calls
4. **Use Measurement Protocol for server events** - More reliable than client
5. **Set up BigQuery export** - For advanced analysis

## Rate Limits

- Core Reporting API: 10,000 requests/day per project
- Real-time API: 10 requests/second per property
- Measurement Protocol: No strict limit, but batch recommended

## Related Skills

- `analytics-tracking` - Implementation guidance
- `ab-test-setup` - Experiment tracking
- `page-cro` - Conversion tracking
