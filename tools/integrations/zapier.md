# Zapier

## Overview

Zapier is a no-code automation platform that connects over 6,000 apps, enabling automated workflows (Zaps) between different services without writing code.

## Authentication

### API Key (for custom integrations)

1. Go to Zapier Developer Platform
2. Create or select an integration
3. Get API credentials

### Webhook URLs

Most Zapier integrations use webhooks rather than direct API calls.

### Environment Variables

```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx
```

## Common Operations

### Send Data to Zapier Webhook

```javascript
async function triggerZap(webhookUrl, data) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

// Example: Send new signup to Zapier
await triggerZap(ZAPIER_WEBHOOK_URL, {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'premium',
  signed_up_at: new Date().toISOString()
});
```

### Common Automation Patterns

#### New Signup → Slack + CRM + Email

```javascript
// Single webhook triggers multiple actions in Zapier
async function onNewSignup(user) {
  await triggerZap(process.env.ZAPIER_NEW_SIGNUP_WEBHOOK, {
    event: 'signup',
    email: user.email,
    name: user.name,
    company: user.company,
    source: user.referralSource,
    timestamp: Date.now()
  });
}
```

#### Form Submission → Spreadsheet

```javascript
async function onFormSubmit(formData) {
  await triggerZap(process.env.ZAPIER_FORM_WEBHOOK, {
    form_name: formData.formId,
    fields: formData.fields,
    submitted_at: new Date().toISOString(),
    page_url: formData.pageUrl
  });
}
```

#### Purchase → Multi-channel Notification

```javascript
async function onPurchase(order) {
  await triggerZap(process.env.ZAPIER_PURCHASE_WEBHOOK, {
    event: 'purchase',
    order_id: order.id,
    customer_email: order.email,
    amount: order.total,
    currency: order.currency,
    products: order.items.map(i => i.name).join(', '),
    timestamp: Date.now()
  });
}
```

### NLA (Natural Language Actions) API

```javascript
// Zapier NLA for AI-powered actions
async function executeNLAAction(instruction, accessToken) {
  const response = await fetch(
    'https://nla.zapier.com/api/v1/dynamic/exposed/',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instructions: instruction
      })
    }
  );

  return response.json();
}

// Example: "Send an email to john@example.com saying hello"
await executeNLAAction(
  'Send an email to john@example.com with subject "Hello" and body "Hi there!"',
  NLA_ACCESS_TOKEN
);
```

### Webhooks from Zapier (Receiving)

```javascript
// Express.js handler for Zapier webhooks
app.post('/zapier/webhook', (req, res) => {
  const data = req.body;

  // Process the webhook data
  console.log('Received from Zapier:', data);

  // Zapier expects a 200 response
  res.status(200).json({ received: true });
});
```

### Testing Webhooks

```javascript
// Test webhook payload
async function testWebhook(webhookUrl) {
  const testData = {
    test: true,
    email: 'test@example.com',
    timestamp: Date.now()
  };

  const response = await triggerZap(webhookUrl, testData);
  console.log('Webhook test response:', response);
  return response;
}
```

### Common Zap Configurations

#### Marketing Stack Integration

```json
{
  "trigger": "Webhook Catch",
  "trigger_data": {
    "event": "signup"
  },
  "actions": [
    {
      "app": "Mailchimp",
      "action": "Add Subscriber"
    },
    {
      "app": "HubSpot",
      "action": "Create Contact"
    },
    {
      "app": "Slack",
      "action": "Send Message"
    }
  ]
}
```

#### Analytics Pipeline

```json
{
  "trigger": "Webhook Catch",
  "trigger_data": {
    "event": "purchase"
  },
  "actions": [
    {
      "app": "Google Sheets",
      "action": "Add Row"
    },
    {
      "app": "Mixpanel",
      "action": "Track Event"
    }
  ]
}
```

## Best Practices

1. **Use structured data** - Consistent JSON structure for webhooks
2. **Include timestamps** - Always send timestamps for ordering
3. **Error handling** - Set up error alerts in Zapier
4. **Test webhooks** - Use Zapier's testing tools before going live
5. **Use filters** - Add filter steps to control when Zaps run
6. **Multi-step Zaps** - Combine related actions in single Zaps

## Rate Limits

- Free: 100 tasks/month
- Starter: 750 tasks/month
- Pro: Varies by plan
- Webhooks: No strict limit, but throttled if excessive

## Related Skills

- `analytics-tracking` - Event routing to analytics
- `email-sequence` - Marketing automation triggers
- `form-cro` - Form submission handling
