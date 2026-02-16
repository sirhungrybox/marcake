# Mailchimp

## Overview

Mailchimp is an email marketing platform that provides email campaigns, automation, audience management, and basic marketing tools for businesses of all sizes.

## Authentication

### API Key

1. Go to Account → Extras → API Keys
2. Generate a new API key
3. Note your data center from the API key suffix (e.g., us21)

### Environment Variables

```bash
MAILCHIMP_API_KEY=xxxxxxxx-us21
MAILCHIMP_SERVER_PREFIX=us21
```

## Common Operations

### Initialize Client

```javascript
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});
```

### Add Subscriber

```javascript
async function addSubscriber(listId, email, mergeFields = {}, tags = []) {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: 'subscribed',
    merge_fields: mergeFields,
    tags: tags
  });

  return response;
}

// Example
await addSubscriber('list123', 'user@example.com', {
  FNAME: 'John',
  LNAME: 'Doe'
}, ['new-user', 'trial']);
```

### Update Subscriber

```javascript
const crypto = require('crypto');

async function updateSubscriber(listId, email, data) {
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const response = await mailchimp.lists.updateListMember(
    listId,
    subscriberHash,
    data
  );

  return response;
}
```

### Get Subscriber

```javascript
async function getSubscriber(listId, email) {
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const response = await mailchimp.lists.getListMember(listId, subscriberHash);
  return response;
}
```

### Add/Remove Tags

```javascript
async function updateTags(listId, email, tags) {
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const response = await mailchimp.lists.updateListMemberTags(
    listId,
    subscriberHash,
    {
      tags: tags.map(tag => ({
        name: tag.name,
        status: tag.status // 'active' or 'inactive'
      }))
    }
  );

  return response;
}

// Example: Add tag
await updateTags('list123', 'user@example.com', [
  { name: 'premium', status: 'active' }
]);
```

### Create Campaign

```javascript
async function createCampaign(listId, subject, fromName, replyTo) {
  const campaign = await mailchimp.campaigns.create({
    type: 'regular',
    recipients: {
      list_id: listId
    },
    settings: {
      subject_line: subject,
      from_name: fromName,
      reply_to: replyTo
    }
  });

  return campaign;
}
```

### Set Campaign Content

```javascript
async function setCampaignContent(campaignId, html) {
  const response = await mailchimp.campaigns.setContent(campaignId, {
    html: html
  });

  return response;
}
```

### Send Campaign

```javascript
async function sendCampaign(campaignId) {
  const response = await mailchimp.campaigns.send(campaignId);
  return response;
}
```

### Get Campaign Report

```javascript
async function getCampaignReport(campaignId) {
  const report = await mailchimp.reports.getCampaignReport(campaignId);
  return {
    opens: report.opens,
    clicks: report.clicks,
    unsubscribes: report.unsubscribed
  };
}
```

### Add to Automation

```javascript
async function addToAutomation(workflowId, workflowEmailId, email) {
  const response = await mailchimp.automations.addWorkflowEmailSubscriber(
    workflowId,
    workflowEmailId,
    {
      email_address: email
    }
  );

  return response;
}
```

### Get Lists

```javascript
async function getLists() {
  const response = await mailchimp.lists.getAllLists();
  return response.lists;
}
```

## Best Practices

1. **Use tags over multiple lists** - More flexible segmentation
2. **Double opt-in** - Better deliverability
3. **Batch operations** - Use batch endpoint for bulk changes
4. **Monitor engagement** - Clean inactive subscribers
5. **Test before sending** - Use test emails

## Rate Limits

- 10 concurrent connections
- Batch operations: 500 operations per call
- Transactional: 250 emails per hour (free tier)

## Related Skills

- `email-sequence` - Email automation design
- `form-cro` - Signup form integration
- `analytics-tracking` - Email engagement tracking
