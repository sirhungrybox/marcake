# Segment

## Overview

Segment is a Customer Data Platform (CDP) that collects, cleans, and routes customer data to hundreds of tools. It acts as a single source of truth for customer data, simplifying analytics and marketing tool integration.

## Authentication

### Write Key (for tracking)

1. Go to Segment Workspace → Connections → Sources
2. Create or select a source
3. Copy the Write Key

### Access Token (for APIs)

1. Go to Settings → Access Management → Tokens
2. Create a new token with appropriate permissions

### Environment Variables

```bash
SEGMENT_WRITE_KEY=your_write_key
SEGMENT_ACCESS_TOKEN=your_access_token
SEGMENT_WORKSPACE=your_workspace_slug
```

## Common Operations

### Track Events (Client-side Analytics.js)

```javascript
// Initialize (usually in HTML)
analytics.load('YOUR_WRITE_KEY');

// Identify user
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'premium',
  company: 'Acme Inc'
});

// Track event
analytics.track('Purchase Completed', {
  product_id: 'SKU123',
  price: 99.99,
  currency: 'USD'
});

// Page view
analytics.page('Home');
```

### Track Events (Server-side Node.js)

```javascript
const Analytics = require('@segment/analytics-node');

const analytics = new Analytics({ writeKey: 'YOUR_WRITE_KEY' });

// Identify user
analytics.identify({
  userId: 'user_123',
  traits: {
    email: 'user@example.com',
    plan: 'premium'
  }
});

// Track event
analytics.track({
  userId: 'user_123',
  event: 'Purchase Completed',
  properties: {
    product_id: 'SKU123',
    price: 99.99
  }
});

// Group (for B2B)
analytics.group({
  userId: 'user_123',
  groupId: 'company_456',
  traits: {
    name: 'Acme Inc',
    employees: 100,
    plan: 'enterprise'
  }
});

// Close connection
await analytics.closeAndFlush();
```

### Profile API

```javascript
async function getUserProfile(userId) {
  const response = await fetch(
    `https://profiles.segment.com/v1/spaces/${SPACE_ID}/collections/users/profiles/user_id:${userId}/traits`,
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${ACCESS_TOKEN}:`).toString('base64')}`
      }
    }
  );

  return response.json();
}
```

### Config API

```javascript
async function getSourceConfig(sourceId) {
  const response = await fetch(
    `https://api.segmentapis.com/sources/${sourceId}`,
    {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Destination Functions

```javascript
// Example destination function
async function onTrack(event, settings) {
  const response = await fetch(settings.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });

  return response;
}
```

## Best Practices

1. **Define a tracking plan** - Use Protocols for schema enforcement
2. **Use Personas** - For computed traits and audiences
3. **Implement identify calls** - Link anonymous to known users
4. **Use group for B2B** - Track company-level data
5. **Set up destination filters** - Send only relevant data to each tool

## Rate Limits

- Tracking API: 500 requests/second per source
- Profile API: 100 requests/second
- Config API: 100 requests/minute

## Related Skills

- `analytics-tracking` - Unified tracking implementation
- `email-sequence` - Route data to email tools
- `product-marketing-context` - Customer data foundation
