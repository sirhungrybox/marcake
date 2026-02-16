# Amplitude

## Overview

Amplitude is a product analytics platform focused on understanding user behavior, identifying growth opportunities, and measuring feature impact. Known for its powerful behavioral cohorting and experimentation capabilities.

## Authentication

### API Keys

1. Go to Amplitude Settings → Projects
2. Find your API Key (for tracking)
3. Get Secret Key (for export APIs)

### Environment Variables

```bash
AMPLITUDE_API_KEY=your_api_key
AMPLITUDE_SECRET_KEY=your_secret_key
```

## Common Operations

### Track Events (Client-side)

```javascript
// Initialize
amplitude.init('YOUR_API_KEY');

// Identify user
amplitude.setUserId('user_123');

// Set user properties
amplitude.setUserProperties({
  email: 'user@example.com',
  plan: 'premium',
  company: 'Acme Inc'
});

// Track event
amplitude.track('Purchase Completed', {
  product_id: 'SKU123',
  price: 99.99,
  currency: 'USD'
});
```

### Track Events (Server-side Node.js)

```javascript
const Amplitude = require('@amplitude/analytics-node');

Amplitude.init('YOUR_API_KEY');

// Track event
Amplitude.track('Signup', {
  user_id: 'user_123',
  signup_method: 'google'
}, {
  user_id: 'user_123'
});

// Identify user
Amplitude.identify({
  user_id: 'user_123',
  user_properties: {
    plan: 'premium',
    company_size: '50-100'
  }
});
```

### HTTP API (Direct)

```javascript
async function trackEvent(userId, eventType, eventProperties) {
  const response = await fetch('https://api2.amplitude.com/2/httpapi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: 'YOUR_API_KEY',
      events: [{
        user_id: userId,
        event_type: eventType,
        event_properties: eventProperties,
        time: Date.now()
      }]
    })
  });

  return response.json();
}
```

### Export API (Query Data)

```javascript
async function exportEvents(start, end) {
  const auth = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64');

  const response = await fetch(
    `https://amplitude.com/api/2/export?start=${start}&end=${end}`,
    {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
  );

  return response.text(); // Returns GZIP compressed JSON lines
}
```

### Dashboard API

```javascript
async function getChartData(chartId) {
  const auth = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64');

  const response = await fetch(
    `https://amplitude.com/api/3/chart/${chartId}/query`,
    {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
  );

  return response.json();
}
```

## Best Practices

1. **Use Amplitude SDK** - Better batching and retry logic
2. **Plan your taxonomy** - Consistent event naming
3. **Leverage user properties** - Enable powerful segmentation
4. **Use group analytics** - For B2B company-level insights
5. **Set up Amplitude Experiment** - For A/B testing

## Rate Limits

- HTTP API: 1,000 events/second per project
- Export API: 360 requests/hour
- Dashboard API: 360 requests/hour

## Related Skills

- `analytics-tracking` - Event implementation
- `onboarding-cro` - Activation analysis
- `ab-test-setup` - Amplitude Experiment
