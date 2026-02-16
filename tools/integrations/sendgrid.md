# SendGrid

## Overview

SendGrid is an email delivery platform owned by Twilio that provides transactional email, marketing campaigns, and email API services with high deliverability.

## Authentication

### API Key

1. Go to Settings → API Keys
2. Create an API key with appropriate permissions
3. Store securely (shown only once)

### Environment Variables

```bash
SENDGRID_API_KEY=SG.xxxxxxxx
```

## Common Operations

### Initialize Client

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Send Single Email

```javascript
async function sendEmail(to, from, subject, text, html) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html
  };

  const response = await sgMail.send(msg);
  return response;
}
```

### Send with Template

```javascript
async function sendTemplateEmail(to, from, templateId, dynamicData) {
  const msg = {
    to: to,
    from: from,
    templateId: templateId,
    dynamicTemplateData: dynamicData
  };

  const response = await sgMail.send(msg);
  return response;
}

// Example
await sendTemplateEmail(
  'user@example.com',
  'noreply@yourapp.com',
  'd-xxxxxxxxxxxx',
  {
    first_name: 'John',
    reset_link: 'https://example.com/reset'
  }
);
```

### Send Multiple Emails

```javascript
async function sendBulkEmails(messages) {
  const response = await sgMail.send(messages);
  return response;
}

// Example
const messages = [
  {
    to: 'user1@example.com',
    from: 'noreply@yourapp.com',
    subject: 'Hello',
    text: 'Hello User 1'
  },
  {
    to: 'user2@example.com',
    from: 'noreply@yourapp.com',
    subject: 'Hello',
    text: 'Hello User 2'
  }
];

await sendBulkEmails(messages);
```

### Personalization (Multiple Recipients, One Call)

```javascript
async function sendPersonalizedBulk(recipients, from, templateId) {
  const msg = {
    from: from,
    templateId: templateId,
    personalizations: recipients.map(r => ({
      to: r.email,
      dynamicTemplateData: r.data
    }))
  };

  const response = await sgMail.send(msg);
  return response;
}
```

### Add Contact to List

```javascript
const sgClient = require('@sendgrid/client');
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

async function addContact(email, firstName, lastName, listIds = []) {
  const data = {
    list_ids: listIds,
    contacts: [{
      email: email,
      first_name: firstName,
      last_name: lastName
    }]
  };

  const [response] = await sgClient.request({
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: data
  });

  return response;
}
```

### Create List

```javascript
async function createList(name) {
  const [response] = await sgClient.request({
    method: 'POST',
    url: '/v3/marketing/lists',
    body: { name }
  });

  return response.body;
}
```

### Get Email Stats

```javascript
async function getEmailStats(startDate, endDate) {
  const [response] = await sgClient.request({
    method: 'GET',
    url: '/v3/stats',
    qs: {
      start_date: startDate,
      end_date: endDate
    }
  });

  return response.body;
}
```

### Webhook Handler

```javascript
const EventWebhook = require('@sendgrid/eventwebhook');

function handleWebhook(payload, signature, timestamp, publicKey) {
  const eventWebhook = new EventWebhook();
  const isValid = eventWebhook.verifySignature(
    publicKey,
    payload,
    signature,
    timestamp
  );

  if (!isValid) {
    throw new Error('Invalid signature');
  }

  const events = JSON.parse(payload);
  events.forEach(event => {
    switch (event.event) {
      case 'delivered':
        handleDelivered(event);
        break;
      case 'open':
        handleOpen(event);
        break;
      case 'click':
        handleClick(event);
        break;
      case 'bounce':
        handleBounce(event);
        break;
    }
  });
}
```

## Best Practices

1. **Use dynamic templates** - Manage content in SendGrid UI
2. **Implement webhooks** - Track delivery and engagement
3. **Warm up IP** - Gradually increase volume for new IPs
4. **Monitor reputation** - Check sender reputation regularly
5. **Handle bounces** - Remove hard bounces automatically

## Rate Limits

- Free: 100 emails/day
- Paid: Varies by plan (up to millions/month)
- API rate: 10,000 requests/second (Mail Send)

## Related Skills

- `email-sequence` - Transactional email implementation
- `analytics-tracking` - Email engagement tracking
- `onboarding-cro` - Welcome email setup
