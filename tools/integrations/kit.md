# Kit (formerly ConvertKit)

## Overview

Kit is a creator-focused email marketing platform designed for bloggers, podcasters, and online creators with powerful automation and landing page features.

## Authentication

### API Key and Secret

1. Go to Settings → Advanced → API
2. Copy your API Key and API Secret

### Environment Variables

```bash
KIT_API_KEY=your_api_key
KIT_API_SECRET=your_api_secret
```

## Common Operations

### Add Subscriber

```javascript
async function addSubscriber(email, firstName = '') {
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/{form_id}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: email,
        first_name: firstName
      })
    }
  );

  return response.json();
}
```

### Add Tag to Subscriber

```javascript
async function addTag(tagId, email) {
  const response = await fetch(
    `https://api.convertkit.com/v3/tags/${tagId}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: email
      })
    }
  );

  return response.json();
}
```

### Remove Tag from Subscriber

```javascript
async function removeTag(tagId, subscriberId) {
  const response = await fetch(
    `https://api.convertkit.com/v3/subscribers/${subscriberId}/tags/${tagId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: KIT_API_SECRET
      })
    }
  );

  return response.json();
}
```

### Get Subscriber

```javascript
async function getSubscriber(email) {
  const response = await fetch(
    `https://api.convertkit.com/v3/subscribers?api_secret=${KIT_API_SECRET}&email_address=${email}`
  );

  const data = await response.json();
  return data.subscribers[0];
}
```

### List All Tags

```javascript
async function getTags() {
  const response = await fetch(
    `https://api.convertkit.com/v3/tags?api_key=${KIT_API_KEY}`
  );

  return response.json();
}
```

### Create Tag

```javascript
async function createTag(name) {
  const response = await fetch(
    'https://api.convertkit.com/v3/tags',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        tag: { name: name }
      })
    }
  );

  return response.json();
}
```

### Get Forms

```javascript
async function getForms() {
  const response = await fetch(
    `https://api.convertkit.com/v3/forms?api_key=${KIT_API_KEY}`
  );

  return response.json();
}
```

### Add to Sequence

```javascript
async function addToSequence(sequenceId, email) {
  const response = await fetch(
    `https://api.convertkit.com/v3/sequences/${sequenceId}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: email
      })
    }
  );

  return response.json();
}
```

### Update Subscriber Custom Fields

```javascript
async function updateSubscriber(subscriberId, fields) {
  const response = await fetch(
    `https://api.convertkit.com/v3/subscribers/${subscriberId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: KIT_API_SECRET,
        first_name: fields.firstName,
        fields: fields.customFields
      })
    }
  );

  return response.json();
}
```

### Unsubscribe

```javascript
async function unsubscribe(email) {
  const response = await fetch(
    'https://api.convertkit.com/v3/unsubscribe',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: KIT_API_SECRET,
        email: email
      })
    }
  );

  return response.json();
}
```

### List Sequences

```javascript
async function getSequences() {
  const response = await fetch(
    `https://api.convertkit.com/v3/sequences?api_key=${KIT_API_KEY}`
  );

  return response.json();
}
```

## Best Practices

1. **Use tags for segmentation** - More flexible than multiple forms
2. **Forms for entry points** - Different forms for different offers
3. **Visual automations** - Build complex workflows in UI
4. **Custom fields** - Store subscriber data for personalization
5. **Test sequences** - Preview before activating

## Rate Limits

- 120 requests per minute
- Batch operations recommended for large lists

## Related Skills

- `email-sequence` - Sequence design
- `form-cro` - Form optimization
- `content-strategy` - Newsletter content planning
