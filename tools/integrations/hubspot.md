# HubSpot

## Overview

HubSpot is an all-in-one CRM platform that includes marketing, sales, customer service, and CMS tools. It offers extensive APIs for contacts, deals, companies, email, and automation.

## Authentication

### Private App (Recommended)

1. Go to Settings → Integrations → Private Apps
2. Create a new private app
3. Select required scopes
4. Copy the access token

### OAuth 2.0 (For public apps)

1. Create an app in HubSpot Developer Portal
2. Implement OAuth flow
3. Exchange code for access token

### Environment Variables

```bash
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx
```

## Common Operations

### Create Contact

```javascript
const hubspot = require('@hubspot/api-client');
const client = new hubspot.Client({ accessToken: HUBSPOT_ACCESS_TOKEN });

async function createContact(email, firstName, lastName, properties = {}) {
  const contact = await client.crm.contacts.basicApi.create({
    properties: {
      email,
      firstname: firstName,
      lastname: lastName,
      ...properties
    }
  });

  return contact;
}
```

### Get Contact

```javascript
async function getContact(contactId) {
  const contact = await client.crm.contacts.basicApi.getById(
    contactId,
    ['email', 'firstname', 'lastname', 'company', 'lifecyclestage']
  );

  return contact;
}
```

### Search Contacts

```javascript
async function searchContacts(query) {
  const response = await client.crm.contacts.searchApi.doSearch({
    filterGroups: [{
      filters: [{
        propertyName: 'email',
        operator: 'CONTAINS_TOKEN',
        value: query
      }]
    }],
    properties: ['email', 'firstname', 'lastname'],
    limit: 100
  });

  return response.results;
}
```

### Create Deal

```javascript
async function createDeal(name, amount, stage, contactId) {
  const deal = await client.crm.deals.basicApi.create({
    properties: {
      dealname: name,
      amount: amount,
      dealstage: stage
    }
  });

  // Associate with contact
  if (contactId) {
    await client.crm.deals.associationsApi.create(
      deal.id,
      'contacts',
      contactId,
      [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
    );
  }

  return deal;
}
```

### Update Deal Stage

```javascript
async function updateDealStage(dealId, stage) {
  const deal = await client.crm.deals.basicApi.update(dealId, {
    properties: {
      dealstage: stage
    }
  });

  return deal;
}
```

### Send Transactional Email

```javascript
async function sendTransactionalEmail(emailId, toEmail, customProperties = {}) {
  const response = await client.marketing.transactional.publicSmtpTokensApi.send({
    emailId: emailId,
    message: {
      to: toEmail,
      sendId: `send-${Date.now()}`
    },
    contactProperties: customProperties
  });

  return response;
}
```

### Create Marketing Email

```javascript
async function createMarketingEmail(name, subject, body) {
  const response = await fetch(
    'https://api.hubapi.com/marketing/v3/emails',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        subject,
        body: {
          html: body
        }
      })
    }
  );

  return response.json();
}
```

### Add to Workflow

```javascript
async function enrollContactInWorkflow(workflowId, email) {
  const response = await fetch(
    `https://api.hubapi.com/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`
      }
    }
  );

  return response.json();
}
```

### Track Event

```javascript
async function trackEvent(eventName, email, properties = {}) {
  const response = await fetch(
    'https://api.hubapi.com/events/v3/send',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName,
        email,
        properties
      })
    }
  );

  return response.json();
}
```

## Best Practices

1. **Use batching** - Batch API available for bulk operations
2. **Respect rate limits** - 100 requests per 10 seconds
3. **Use webhooks** - For real-time updates
4. **Implement retry logic** - Handle transient failures
5. **Cache property definitions** - Don't fetch repeatedly

## Rate Limits

- Standard: 100 requests per 10 seconds
- Batch: 10 batch requests per second
- Search: 4 requests per second

## Related Skills

- `email-sequence` - Marketing automation
- `analytics-tracking` - CRM event tracking
- `form-cro` - Lead capture integration
