# Salesforce

## Overview

Salesforce is the world's leading enterprise CRM platform, offering sales, service, marketing, and commerce clouds with extensive customization and integration capabilities.

## Authentication

### OAuth 2.0 (Connected App)

1. Setup → App Manager → New Connected App
2. Enable OAuth settings
3. Select required scopes
4. Use OAuth flow to obtain access token

### Username-Password Flow

```javascript
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  loginUrl: 'https://login.salesforce.com'
});

await conn.login('username', 'password' + 'securityToken');
```

### Environment Variables

```bash
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_security_token
SALESFORCE_CLIENT_ID=your_client_id
SALESFORCE_CLIENT_SECRET=your_client_secret
SALESFORCE_LOGIN_URL=https://login.salesforce.com
```

## Common Operations

### Initialize Connection

```javascript
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  oauth2: {
    clientId: SALESFORCE_CLIENT_ID,
    clientSecret: SALESFORCE_CLIENT_SECRET,
    redirectUri: 'https://your-app.com/callback'
  },
  instanceUrl: 'https://yourinstance.salesforce.com',
  accessToken: accessToken
});
```

### Query Records (SOQL)

```javascript
async function queryRecords(soql) {
  const result = await conn.query(soql);
  return result.records;
}

// Example: Get recent leads
const leads = await queryRecords(`
  SELECT Id, Name, Email, Company, Status
  FROM Lead
  WHERE CreatedDate = LAST_N_DAYS:30
  ORDER BY CreatedDate DESC
  LIMIT 100
`);
```

### Create Lead

```javascript
async function createLead(leadData) {
  const result = await conn.sobject('Lead').create({
    FirstName: leadData.firstName,
    LastName: leadData.lastName,
    Email: leadData.email,
    Company: leadData.company,
    LeadSource: 'Web'
  });

  return result;
}
```

### Create Opportunity

```javascript
async function createOpportunity(oppData) {
  const result = await conn.sobject('Opportunity').create({
    Name: oppData.name,
    Amount: oppData.amount,
    StageName: oppData.stage,
    CloseDate: oppData.closeDate,
    AccountId: oppData.accountId
  });

  return result;
}
```

### Update Record

```javascript
async function updateRecord(objectType, id, data) {
  const result = await conn.sobject(objectType).update({
    Id: id,
    ...data
  });

  return result;
}

// Example: Update opportunity stage
await updateRecord('Opportunity', 'oppId', {
  StageName: 'Closed Won'
});
```

### Bulk Operations

```javascript
async function bulkCreate(objectType, records) {
  const job = conn.bulk.createJob(objectType, 'insert');
  const batch = job.createBatch();

  batch.execute(records);

  return new Promise((resolve, reject) => {
    batch.on('response', resolve);
    batch.on('error', reject);
  });
}
```

### Search Records (SOSL)

```javascript
async function searchRecords(searchTerm) {
  const result = await conn.search(`
    FIND {${searchTerm}}
    IN ALL FIELDS
    RETURNING Lead(Id, Name, Email), Contact(Id, Name, Email)
  `);

  return result.searchRecords;
}
```

### Get Object Metadata

```javascript
async function getObjectMetadata(objectType) {
  const metadata = await conn.sobject(objectType).describe();
  return {
    fields: metadata.fields,
    recordTypes: metadata.recordTypeInfos
  };
}
```

### Create Task

```javascript
async function createTask(taskData) {
  const result = await conn.sobject('Task').create({
    Subject: taskData.subject,
    WhoId: taskData.contactId,
    WhatId: taskData.relatedToId,
    Status: 'Not Started',
    Priority: 'Normal',
    ActivityDate: taskData.dueDate
  });

  return result;
}
```

## Best Practices

1. **Use SOQL efficiently** - Query only needed fields
2. **Batch operations** - Use Bulk API for large datasets
3. **Handle governor limits** - Salesforce has strict limits
4. **Use composite API** - Combine multiple operations
5. **Cache metadata** - Describe calls are expensive

## Rate Limits

- REST API: Varies by edition (1,000+ calls/24hrs)
- Bulk API: 10,000 batches/24hrs
- Query: 100,000 rows/query

## Related Skills

- `analytics-tracking` - CRM integration
- `email-sequence` - Sales engagement
- `form-cro` - Lead capture to CRM
