# PostHog

## Overview

PostHog is an open-source product analytics platform that includes event tracking, session recording, feature flags, A/B testing, and more. It can be self-hosted or used as a cloud service.

## Authentication

### Project API Key

1. Go to PostHog Project Settings
2. Copy your Project API Key (for tracking)
3. Get Personal API Key (for querying)

### Environment Variables

```bash
POSTHOG_API_KEY=phc_xxxxxxxxxx
POSTHOG_HOST=https://app.posthog.com  # or your self-hosted URL
POSTHOG_PERSONAL_API_KEY=phx_xxxxxxxxxx
```

## Common Operations

### Track Events (Client-side)

```javascript
// Initialize
posthog.init('YOUR_PROJECT_API_KEY', {
  api_host: 'https://app.posthog.com'
});

// Identify user
posthog.identify('user_123', {
  email: 'user@example.com',
  plan: 'premium'
});

// Track event
posthog.capture('purchase_completed', {
  product_id: 'SKU123',
  price: 99.99
});

// Track page view
posthog.capture('$pageview');
```

### Track Events (Server-side Node.js)

```javascript
const { PostHog } = require('posthog-node');

const posthog = new PostHog('YOUR_PROJECT_API_KEY', {
  host: 'https://app.posthog.com'
});

// Capture event
posthog.capture({
  distinctId: 'user_123',
  event: 'purchase_completed',
  properties: {
    product_id: 'SKU123',
    price: 99.99
  }
});

// Identify user
posthog.identify({
  distinctId: 'user_123',
  properties: {
    email: 'user@example.com',
    plan: 'premium'
  }
});

// Shutdown (important for Node.js)
await posthog.shutdown();
```

### Feature Flags

```javascript
// Client-side
if (posthog.isFeatureEnabled('new-checkout')) {
  // Show new checkout
}

// Server-side
const isEnabled = await posthog.isFeatureEnabled(
  'new-checkout',
  'user_123'
);

// Get feature flag payload
const payload = await posthog.getFeatureFlagPayload(
  'new-checkout',
  'user_123'
);
```

### Query API (HogQL)

```javascript
async function queryPostHog(query) {
  const response = await fetch(
    'https://app.posthog.com/api/projects/@current/query/',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERSONAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: query
        }
      })
    }
  );

  return response.json();
}

// Example: Get events from last 7 days
const result = await queryPostHog(`
  SELECT event, count()
  FROM events
  WHERE timestamp > now() - interval 7 day
  GROUP BY event
  ORDER BY count() DESC
`);
```

### Session Recording API

```javascript
async function getSessionRecordings(limit = 10) {
  const response = await fetch(
    `https://app.posthog.com/api/projects/@current/session_recordings?limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${PERSONAL_API_KEY}`
      }
    }
  );

  return response.json();
}
```

## Best Practices

1. **Use autocapture wisely** - Captures clicks automatically, but can be noisy
2. **Define custom events** - For key business actions
3. **Use feature flags** - For safe rollouts
4. **Set up cohorts** - For behavioral segments
5. **Review session recordings** - Understand user behavior

## Rate Limits

- Capture API: 100 requests/second
- Query API: 120 requests/hour
- Feature flags evaluated: No strict limit

## Related Skills

- `analytics-tracking` - Event setup
- `ab-test-setup` - PostHog Experiments
- `onboarding-cro` - Session recording analysis
