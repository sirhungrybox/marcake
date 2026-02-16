# Customer.io

## Overview

Customer.io is a marketing automation platform designed for sending targeted emails, push notifications, SMS, and in-app messages based on user behavior and attributes.

## Authentication

### API Keys

1. Go to Account Settings → API Credentials
2. Get Site ID and API Key (for tracking)
3. Get App API Key (for transactional/API access)

### Environment Variables

```bash
CUSTOMERIO_SITE_ID=your_site_id
CUSTOMERIO_API_KEY=your_api_key
CUSTOMERIO_APP_API_KEY=your_app_api_key
```

## Common Operations

### Initialize Track API

```javascript
const { TrackClient } = require('customerio-node');

const cio = new TrackClient(CUSTOMERIO_SITE_ID, CUSTOMERIO_API_KEY);
```

### Identify User

```javascript
async function identifyUser(userId, attributes) {
  await cio.identify(userId, {
    email: attributes.email,
    created_at: Math.floor(Date.now() / 1000),
    ...attributes
  });
}

// Example
await identifyUser('user_123', {
  email: 'user@example.com',
  first_name: 'John',
  plan: 'premium',
  company: 'Acme Inc'
});
```

### Track Event

```javascript
async function trackEvent(userId, eventName, data = {}) {
  await cio.track(userId, {
    name: eventName,
    data: data
  });
}

// Example
await trackEvent('user_123', 'purchase_completed', {
  product_id: 'SKU123',
  amount: 99.99
});
```

### Track Anonymous Event

```javascript
async function trackAnonymousEvent(anonymousId, eventName, data = {}) {
  await cio.trackAnonymous(anonymousId, {
    name: eventName,
    data: data
  });
}
```

### Delete User

```javascript
async function deleteUser(userId) {
  await cio.destroy(userId);
}
```

### Update Device (Mobile Push)

```javascript
async function registerDevice(userId, deviceId, platform, token) {
  await cio.addDevice(userId, deviceId, platform, {
    token: token,
    last_used: Math.floor(Date.now() / 1000)
  });
}
```

### Send Transactional Email

```javascript
const { APIClient, SendEmailRequest } = require('customerio-node');

const api = new APIClient(CUSTOMERIO_APP_API_KEY);

async function sendTransactionalEmail(transactionalId, to, data = {}) {
  const request = new SendEmailRequest({
    transactional_message_id: transactionalId,
    to: to,
    message_data: data,
    identifiers: {
      email: to
    }
  });

  const response = await api.sendEmail(request);
  return response;
}

// Example
await sendTransactionalEmail('1', 'user@example.com', {
  reset_link: 'https://example.com/reset?token=xxx'
});
```

### Trigger Broadcast

```javascript
async function triggerBroadcast(broadcastId, data = {}) {
  const response = await fetch(
    `https://api.customer.io/v1/campaigns/${broadcastId}/triggers`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CUSTOMERIO_APP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data
      })
    }
  );

  return response.json();
}
```

### Get Customer Attributes

```javascript
async function getCustomer(email) {
  const response = await fetch(
    `https://api.customer.io/v1/customers/${encodeURIComponent(email)}/attributes`,
    {
      headers: {
        'Authorization': `Bearer ${CUSTOMERIO_APP_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Suppress User

```javascript
async function suppressUser(userId) {
  await cio.suppress(userId);
}

async function unsuppressUser(userId) {
  await cio.unsuppress(userId);
}
```

## Best Practices

1. **Use segments** - Define segments in UI for targeting
2. **Event naming** - Consistent, descriptive event names
3. **Timestamps** - Use Unix timestamps for dates
4. **Batch identify calls** - Reduce API calls
5. **Test campaigns** - Use test segments before launch

## Rate Limits

- Track API: 100 requests/second
- App API: 10 requests/second
- Batch: 1000 customers per batch call

## Related Skills

- `email-sequence` - Campaign automation
- `onboarding-cro` - Behavioral email triggers
- `analytics-tracking` - Event tracking integration
