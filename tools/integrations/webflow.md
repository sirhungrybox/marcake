# Webflow

## Overview

Webflow is a visual web development platform that combines design, CMS, and hosting. It offers a powerful API for managing CMS collections, forms, and site publishing.

## Authentication

### API Token

1. Go to Site Settings → Integrations → API Access
2. Generate a new API token
3. Note the token (shown only once)

### Environment Variables

```bash
WEBFLOW_API_TOKEN=your_api_token
WEBFLOW_SITE_ID=your_site_id
```

## Common Operations

### Initialize Client

```javascript
const Webflow = require('webflow-api');

const webflow = new Webflow({ token: WEBFLOW_API_TOKEN });
```

### Get Sites

```javascript
async function getSites() {
  const sites = await webflow.sites();
  return sites;
}
```

### Get Collections

```javascript
async function getCollections(siteId) {
  const collections = await webflow.collections({ siteId });
  return collections;
}
```

### Get Collection Items

```javascript
async function getCollectionItems(collectionId, offset = 0, limit = 100) {
  const items = await webflow.items({
    collectionId,
    offset,
    limit
  });

  return items;
}
```

### Get Single Item

```javascript
async function getItem(collectionId, itemId) {
  const item = await webflow.item({
    collectionId,
    itemId
  });

  return item;
}
```

### Create Collection Item

```javascript
async function createItem(collectionId, data, publish = false) {
  const item = await webflow.createItem({
    collectionId,
    fields: {
      name: data.name,
      slug: data.slug,
      _archived: false,
      _draft: !publish,
      ...data.fields
    }
  });

  return item;
}

// Example: Create blog post
await createItem('blog_collection_id', {
  name: 'My New Post',
  slug: 'my-new-post',
  fields: {
    'post-body': '<p>Content here</p>',
    'post-summary': 'A brief summary',
    'main-image': 'https://example.com/image.jpg',
    'author': 'author_ref_id',
    'category': ['category_ref_id']
  }
}, true);
```

### Update Collection Item

```javascript
async function updateItem(collectionId, itemId, data) {
  const item = await webflow.updateItem({
    collectionId,
    itemId,
    fields: data
  });

  return item;
}
```

### Delete Collection Item

```javascript
async function deleteItem(collectionId, itemId) {
  const result = await webflow.removeItem({
    collectionId,
    itemId
  });

  return result;
}
```

### Publish Site

```javascript
async function publishSite(siteId, domains = null) {
  const result = await webflow.publishSite({
    siteId,
    domains // Optional: specific domains to publish
  });

  return result;
}
```

### Publish Collection Items

```javascript
async function publishItems(collectionId, itemIds) {
  const result = await webflow.publishItems({
    collectionId,
    itemIds
  });

  return result;
}
```

### Get Forms

```javascript
async function getForms(siteId) {
  const response = await fetch(
    `https://api.webflow.com/sites/${siteId}/forms`,
    {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0'
      }
    }
  );

  return response.json();
}
```

### Get Form Submissions

```javascript
async function getFormSubmissions(formId, offset = 0, limit = 100) {
  const response = await fetch(
    `https://api.webflow.com/forms/${formId}/submissions?offset=${offset}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0'
      }
    }
  );

  return response.json();
}
```

### Webhook Management (v2 API)

```javascript
async function createWebhook(siteId, triggerType, url) {
  const response = await fetch(
    `https://api.webflow.com/v2/sites/${siteId}/webhooks`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        triggerType: triggerType, // 'form_submission', 'collection_item_created', etc.
        url: url
      })
    }
  );

  return response.json();
}
```

### Upload Image to CMS

```javascript
async function uploadImage(collectionId, itemId, fieldSlug, imageUrl) {
  // Webflow requires updating the item with an image URL
  // Images must be hosted externally or use Webflow's asset hosting
  const result = await webflow.updateItem({
    collectionId,
    itemId,
    fields: {
      [fieldSlug]: imageUrl
    }
  });

  return result;
}
```

## Best Practices

1. **Batch operations** - Combine multiple item operations
2. **Publish strategically** - Don't publish after every change
3. **Use webhooks** - For form submissions and CMS changes
4. **Handle rate limits** - Implement retry logic
5. **Draft items first** - Create as draft, then publish in batch

## Rate Limits

- 60 requests per minute
- Implement exponential backoff
- Batch item operations when possible

## Related Skills

- `seo-audit` - Webflow SEO optimization
- `page-cro` - Landing page optimization
- `form-cro` - Webflow form optimization
