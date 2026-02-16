# Stripe

## Overview

Stripe is a payment processing platform that handles online payments, subscriptions, invoicing, and financial operations for internet businesses.

## Authentication

### API Keys

1. Go to Stripe Dashboard → Developers → API Keys
2. Copy your Secret Key (sk_live_xxx or sk_test_xxx)
3. Use test keys for development

### Environment Variables

```bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
```

## Common Operations

### Initialize Client

```javascript
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

### Create Customer

```javascript
async function createCustomer(email, name, metadata = {}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata
  });

  return customer;
}
```

### Create Subscription

```javascript
async function createSubscription(customerId, priceId) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent']
  });

  return subscription;
}
```

### Create Checkout Session

```javascript
async function createCheckoutSession(priceId, successUrl, cancelUrl, customerId = null) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    success_url: successUrl,
    cancel_url: cancelUrl
  });

  return session;
}
```

### Get Customer

```javascript
async function getCustomer(customerId) {
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ['subscriptions']
  });

  return customer;
}
```

### Cancel Subscription

```javascript
async function cancelSubscription(subscriptionId, immediately = false) {
  if (immediately) {
    return await stripe.subscriptions.cancel(subscriptionId);
  }

  // Cancel at period end
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true
  });
}
```

### Create Payment Intent

```javascript
async function createPaymentIntent(amount, currency, customerId = null) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // in cents
    currency,
    customer: customerId,
    automatic_payment_methods: { enabled: true }
  });

  return paymentIntent;
}
```

### List Invoices

```javascript
async function listInvoices(customerId, limit = 10) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit
  });

  return invoices.data;
}
```

### Webhook Handler

```javascript
function handleWebhook(req, endpointSecret) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
      handleSubscriptionCreated(event.data.object);
      break;
    case 'customer.subscription.updated':
      handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      handleSubscriptionCanceled(event.data.object);
      break;
    case 'invoice.paid':
      handleInvoicePaid(event.data.object);
      break;
    case 'invoice.payment_failed':
      handlePaymentFailed(event.data.object);
      break;
  }

  return { received: true };
}
```

### Create Coupon

```javascript
async function createCoupon(percentOff, duration, code) {
  const coupon = await stripe.coupons.create({
    percent_off: percentOff,
    duration: duration, // 'once', 'repeating', 'forever'
    id: code
  });

  return coupon;
}
```

### Apply Coupon to Subscription

```javascript
async function applyPromotion(subscriptionId, couponId) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    coupon: couponId
  });

  return subscription;
}
```

## Best Practices

1. **Use webhooks** - Don't rely solely on client-side callbacks
2. **Idempotency keys** - Prevent duplicate charges
3. **Test mode first** - Use test API keys for development
4. **Expand objects** - Reduce API calls with expand parameter
5. **Handle failures** - Implement retry logic for payments

## Rate Limits

- 100 read requests per second
- 100 write requests per second
- Webhooks: No strict limit, but implement queueing

## Related Skills

- `pricing-strategy` - Stripe pricing integration
- `paywall-upgrade-cro` - Payment flow optimization
- `analytics-tracking` - Revenue tracking
