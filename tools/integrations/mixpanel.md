# Mixpanel

## Overview

Mixpanel is a product analytics platform that helps you understand user behavior through event tracking, funnel analysis, and cohort retention. It excels at answering questions about how users interact with your product.

## Authentication

### API Credentials

1. Go to Mixpanel Project Settings
2. Find your Project Token (for tracking)
3. Get API Secret (for export/query API)
4. Get Service Account credentials (for Data Pipelines)

### Environment Variables

```bash
MIXPANEL_TOKEN=your_project_token
MIXPANEL_API_SECRET=your_api_secret
MIXPANEL_PROJECT_ID=your_project_id
```

## Common Operations

### Track Events (Client-side)

```javascript
// Initialize
mixpanel.init('YOUR_PROJECT_TOKEN');

// Identify user
mixpanel.identify('user_123');

// Set user properties
mixpanel.people.set({
  '$email': 'user@example.com',
  '$name': 'John Doe',
  'plan': 'premium'
});

// Track event
mixpanel.track('Purchase Completed', {
  'product_id': 'SKU123',
  'price': 99.99,
  'currency': 'USD'
});
```

### Track Events (Server-side)

```javascript
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('YOUR_PROJECT_TOKEN');

// Track event
mixpanel.track('Signup', {
  distinct_id: 'user_123',
  signup_method: 'google',
  plan: 'free'
});

// Set user properties
mixpanel.people.set('user_123', {
  '$email': 'user@example.com',
  'plan': 'premium'
});
```

### Query API (Export Data)

```javascript
const axios = require('axios');

async function queryMixpanel(fromDate, toDate) {
  const auth = Buffer.from(`${API_SECRET}:`).toString('base64');

  const response = await axios.get(
    `https://data.mixpanel.com/api/2.0/export`,
    {
      params: {
        from_date: fromDate,
        to_date: toDate,
        event: '["Signup", "Purchase"]'
      },
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
  );

  return response.data;
}
```

### Funnel Analysis (Query API)

```javascript
async function getFunnelData(funnelId, fromDate, toDate) {
  const auth = Buffer.from(`${API_SECRET}:`).toString('base64');

  const response = await axios.get(
    `https://mixpanel.com/api/2.0/funnels`,
    {
      params: {
        funnel_id: funnelId,
        from_date: fromDate,
        to_date: toDate
      },
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
  );

  return response.data;
}
```

## Best Practices

1. **Define a tracking plan** - Document events before implementing
2. **Use super properties** - Set properties that persist across events
3. **Identify users early** - Link anonymous to identified
4. **Batch server-side events** - Improve performance
5. **Use group analytics** - For B2B account-level analysis

## Rate Limits

- Track API: No strict limit, but batch for efficiency
- Query API: 60 requests/hour for free, higher for paid
- Export API: 60 requests/hour

## Related Skills

- `analytics-tracking` - Event taxonomy design
- `onboarding-cro` - Activation funnel tracking
- `ab-test-setup` - Experiment analysis
