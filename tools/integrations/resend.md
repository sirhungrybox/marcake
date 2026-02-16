# Resend

## Overview

Resend is a modern email API built for developers, offering simple integration, React email support, and excellent deliverability for transactional emails.

## Authentication

### API Key

1. Go to Resend Dashboard → API Keys
2. Create a new API key
3. Store securely

### Environment Variables

```bash
RESEND_API_KEY=re_xxxxxxxx
```

## Common Operations

### Initialize Client

```javascript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
```

### Send Email

```javascript
async function sendEmail(to, from, subject, html, text = null) {
  const { data, error } = await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    html: html,
    text: text
  });

  if (error) {
    throw error;
  }

  return data;
}

// Example
await sendEmail(
  'user@example.com',
  'hello@yourapp.com',
  'Welcome!',
  '<h1>Welcome to our app!</h1>'
);
```

### Send with React Email

```javascript
import { WelcomeEmail } from './emails/welcome';

async function sendReactEmail(to, from, subject, EmailComponent, props) {
  const { data, error } = await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    react: EmailComponent(props)
  });

  return data;
}
```

### Send to Multiple Recipients

```javascript
async function sendBulkEmail(recipients, from, subject, html) {
  const { data, error } = await resend.emails.send({
    from: from,
    to: recipients, // Array of emails
    subject: subject,
    html: html
  });

  return data;
}
```

### Send with Attachments

```javascript
async function sendWithAttachment(to, from, subject, html, attachments) {
  const { data, error } = await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    html: html,
    attachments: attachments.map(a => ({
      filename: a.name,
      content: a.content // Base64 or Buffer
    }))
  });

  return data;
}
```

### Schedule Email

```javascript
async function scheduleEmail(to, from, subject, html, scheduledAt) {
  const { data, error } = await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    html: html,
    scheduledAt: scheduledAt // ISO 8601 format
  });

  return data;
}
```

### Get Email

```javascript
async function getEmail(emailId) {
  const { data, error } = await resend.emails.get(emailId);
  return data;
}
```

### Create Audience

```javascript
async function createAudience(name) {
  const { data, error } = await resend.audiences.create({
    name: name
  });

  return data;
}
```

### Add Contact to Audience

```javascript
async function addContact(audienceId, email, firstName = '', lastName = '') {
  const { data, error } = await resend.contacts.create({
    audienceId: audienceId,
    email: email,
    firstName: firstName,
    lastName: lastName
  });

  return data;
}
```

### List Contacts

```javascript
async function listContacts(audienceId) {
  const { data, error } = await resend.contacts.list({
    audienceId: audienceId
  });

  return data;
}
```

### Remove Contact

```javascript
async function removeContact(audienceId, email) {
  const { data, error } = await resend.contacts.remove({
    audienceId: audienceId,
    email: email
  });

  return data;
}
```

### Verify Domain

```javascript
async function addDomain(domain) {
  const { data, error } = await resend.domains.create({
    name: domain
  });

  return data; // Contains DNS records to add
}
```

## Best Practices

1. **Verify domains** - Better deliverability with verified sender
2. **Use React Email** - Type-safe, component-based emails
3. **Handle errors** - Check for errors on every call
4. **Monitor deliverability** - Use webhooks for tracking
5. **Batch similar sends** - Reduce API calls

## Rate Limits

- Free: 100 emails/day
- Pro: 50,000 emails/month
- API: 10 requests/second

## Related Skills

- `email-sequence` - Transactional email flows
- `onboarding-cro` - Welcome email implementation
- `signup-flow-cro` - Verification emails
