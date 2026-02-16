# Shopify

## Overview

Shopify is an e-commerce platform that enables businesses to create online stores, manage inventory, process payments, and handle fulfillment with extensive customization options.

## Authentication

### Admin API (Private App)

1. Go to Settings → Apps and sales channels → Develop apps
2. Create a new app
3. Configure Admin API scopes
4. Install and get access token

### Storefront API (Public)

For customer-facing operations with limited scope.

### Environment Variables

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxx
SHOPIFY_STOREFRONT_TOKEN=xxxxxxxx
```

## Common Operations

### Initialize Client

```javascript
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'your-store',
  accessToken: SHOPIFY_ADMIN_ACCESS_TOKEN
});
```

### Get Products

```javascript
async function getProducts(limit = 50) {
  const products = await shopify.product.list({ limit });
  return products;
}
```

### Get Product by ID

```javascript
async function getProduct(productId) {
  const product = await shopify.product.get(productId);
  return product;
}
```

### Create Product

```javascript
async function createProduct(productData) {
  const product = await shopify.product.create({
    title: productData.title,
    body_html: productData.description,
    vendor: productData.vendor,
    product_type: productData.type,
    variants: [{
      price: productData.price,
      sku: productData.sku,
      inventory_management: 'shopify'
    }],
    images: productData.images
  });

  return product;
}
```

### Get Orders

```javascript
async function getOrders(status = 'any', limit = 50) {
  const orders = await shopify.order.list({
    status: status,
    limit: limit
  });

  return orders;
}
```

### Get Order by ID

```javascript
async function getOrder(orderId) {
  const order = await shopify.order.get(orderId);
  return order;
}
```

### Get Customers

```javascript
async function getCustomers(limit = 50) {
  const customers = await shopify.customer.list({ limit });
  return customers;
}
```

### Create Customer

```javascript
async function createCustomer(customerData) {
  const customer = await shopify.customer.create({
    email: customerData.email,
    first_name: customerData.firstName,
    last_name: customerData.lastName,
    phone: customerData.phone,
    tags: customerData.tags,
    accepts_marketing: customerData.acceptsMarketing
  });

  return customer;
}
```

### Update Inventory

```javascript
async function updateInventory(inventoryItemId, locationId, quantity) {
  const result = await shopify.inventoryLevel.set({
    inventory_item_id: inventoryItemId,
    location_id: locationId,
    available: quantity
  });

  return result;
}
```

### Create Discount Code

```javascript
async function createDiscountCode(priceRuleId, code) {
  const discountCode = await shopify.discountCode.create(priceRuleId, {
    code: code
  });

  return discountCode;
}
```

### Create Price Rule

```javascript
async function createPriceRule(ruleData) {
  const priceRule = await shopify.priceRule.create({
    title: ruleData.title,
    target_type: 'line_item',
    target_selection: 'all',
    allocation_method: 'across',
    value_type: 'percentage',
    value: `-${ruleData.percentOff}`,
    customer_selection: 'all',
    starts_at: new Date().toISOString()
  });

  return priceRule;
}
```

### Webhook Management

```javascript
// Create webhook
async function createWebhook(topic, address) {
  const webhook = await shopify.webhook.create({
    topic: topic, // 'orders/create', 'customers/create', etc.
    address: address,
    format: 'json'
  });

  return webhook;
}

// List webhooks
async function listWebhooks() {
  return await shopify.webhook.list();
}
```

### GraphQL API

```javascript
async function graphqlQuery(query, variables = {}) {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN
      },
      body: JSON.stringify({ query, variables })
    }
  );

  return response.json();
}

// Example: Get products with GraphQL
const productsQuery = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
```

## Best Practices

1. **Use GraphQL** - More efficient than REST for complex queries
2. **Implement webhooks** - Real-time updates instead of polling
3. **Respect rate limits** - 2 requests/second for REST
4. **Use bulk operations** - For large data exports
5. **Test on development store** - Free development stores available

## Rate Limits

- REST API: 2 requests/second (bucket of 40)
- GraphQL: 50 cost points/second (bucket of 1000)
- Webhook delivery: Near real-time

## Related Skills

- `analytics-tracking` - E-commerce tracking
- `email-sequence` - Post-purchase automation
- `pricing-strategy` - Product pricing
