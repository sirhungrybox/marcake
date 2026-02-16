# WordPress

## Overview

WordPress is the world's most popular CMS, powering over 40% of websites. It offers REST API access for content management, custom post types, and extensive plugin ecosystem.

## Authentication

### Application Passwords (Recommended)

1. Go to Users → Profile → Application Passwords
2. Create a new application password
3. Use with Basic Auth

### JWT Authentication (Plugin)

For token-based authentication, install JWT plugin.

### Environment Variables

```bash
WORDPRESS_URL=https://yoursite.com
WORDPRESS_USERNAME=your_username
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

## Common Operations

### Initialize Client

```javascript
const auth = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString('base64');

async function wpFetch(endpoint, options = {}) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`,
    {
      ...options,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    }
  );

  return response.json();
}
```

### Get Posts

```javascript
async function getPosts(page = 1, perPage = 10, status = 'publish') {
  return await wpFetch(`posts?page=${page}&per_page=${perPage}&status=${status}`);
}
```

### Get Post by ID

```javascript
async function getPost(postId) {
  return await wpFetch(`posts/${postId}`);
}
```

### Create Post

```javascript
async function createPost(title, content, status = 'draft') {
  return await wpFetch('posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      content: content,
      status: status // 'draft', 'publish', 'pending'
    })
  });
}
```

### Update Post

```javascript
async function updatePost(postId, updates) {
  return await wpFetch(`posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify(updates)
  });
}
```

### Delete Post

```javascript
async function deletePost(postId, force = false) {
  return await wpFetch(`posts/${postId}?force=${force}`, {
    method: 'DELETE'
  });
}
```

### Get Pages

```javascript
async function getPages(page = 1, perPage = 10) {
  return await wpFetch(`pages?page=${page}&per_page=${perPage}`);
}
```

### Create Page

```javascript
async function createPage(title, content, parentId = null) {
  const data = {
    title: title,
    content: content,
    status: 'draft'
  };

  if (parentId) {
    data.parent = parentId;
  }

  return await wpFetch('pages', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

### Get Categories

```javascript
async function getCategories() {
  return await wpFetch('categories');
}
```

### Create Category

```javascript
async function createCategory(name, slug = null, description = '') {
  return await wpFetch('categories', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: description
    })
  });
}
```

### Get Tags

```javascript
async function getTags() {
  return await wpFetch('tags');
}
```

### Upload Media

```javascript
async function uploadMedia(file, fileName) {
  const formData = new FormData();
  formData.append('file', file, fileName);

  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/media`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Disposition': `attachment; filename="${fileName}"`
      },
      body: formData
    }
  );

  return response.json();
}
```

### Get Users

```javascript
async function getUsers() {
  return await wpFetch('users');
}
```

### Search Posts

```javascript
async function searchPosts(query) {
  return await wpFetch(`posts?search=${encodeURIComponent(query)}`);
}
```

### Get Custom Post Types

```javascript
async function getCustomPosts(postType, page = 1) {
  return await wpFetch(`${postType}?page=${page}`);
}
```

### Update SEO Meta (Yoast)

```javascript
async function updateYoastMeta(postId, seoData) {
  return await wpFetch(`posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify({
      yoast_meta: {
        yoast_wpseo_title: seoData.title,
        yoast_wpseo_metadesc: seoData.description,
        yoast_wpseo_focuskw: seoData.focusKeyword
      }
    })
  });
}
```

## Best Practices

1. **Use Application Passwords** - More secure than basic passwords
2. **Cache responses** - WordPress can be slow under load
3. **Use _embed parameter** - Get related data in single request
4. **Custom post types** - Extend for structured content
5. **Consider WPGraphQL** - For more efficient queries

## Rate Limits

- Default: No strict limits (server-dependent)
- Hosting providers may impose limits
- Consider caching for high-traffic sites

## Related Skills

- `seo-audit` - WordPress SEO optimization
- `content-strategy` - Content management
- `schema-markup` - Structured data with plugins
