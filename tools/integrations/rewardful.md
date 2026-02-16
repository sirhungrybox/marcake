# Rewardful

## Overview

Rewardful is an affiliate and referral tracking platform designed for SaaS companies using Stripe for payments. It automatically tracks referrals and calculates commissions.

## Authentication

### API Key

1. Go to Rewardful Dashboard → Settings → API
2. Copy your API Secret

### Environment Variables

```bash
REWARDFUL_API_SECRET=your_api_secret
```

## Common Operations

### Get Affiliates

```javascript
async function getAffiliates(page = 1, limit = 100) {
  const response = await fetch(
    `https://api.getrewardful.com/v1/affiliates?page=${page}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`
      }
    }
  );

  return response.json();
}
```

### Get Affiliate by ID

```javascript
async function getAffiliate(affiliateId) {
  const response = await fetch(
    `https://api.getrewardful.com/v1/affiliates/${affiliateId}`,
    {
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`
      }
    }
  );

  return response.json();
}
```

### Create Affiliate

```javascript
async function createAffiliate(email, firstName, lastName) {
  const response = await fetch(
    'https://api.getrewardful.com/v1/affiliates',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        last_name: lastName
      })
    }
  );

  return response.json();
}
```

### Get Referrals

```javascript
async function getReferrals(affiliateId = null, page = 1) {
  let url = `https://api.getrewardful.com/v1/referrals?page=${page}`;
  if (affiliateId) {
    url += `&affiliate_id=${affiliateId}`;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${REWARDFUL_API_SECRET}`
    }
  });

  return response.json();
}
```

### Get Commissions

```javascript
async function getCommissions(affiliateId = null, status = null) {
  let url = 'https://api.getrewardful.com/v1/commissions?';
  if (affiliateId) url += `affiliate_id=${affiliateId}&`;
  if (status) url += `state=${status}&`; // pending, due, paid

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${REWARDFUL_API_SECRET}`
    }
  });

  return response.json();
}
```

### Update Affiliate

```javascript
async function updateAffiliate(affiliateId, data) {
  const response = await fetch(
    `https://api.getrewardful.com/v1/affiliates/${affiliateId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  return response.json();
}
```

### Create Referral (Manual)

```javascript
async function createReferral(affiliateId, customerEmail, stripeCustomerId) {
  const response = await fetch(
    'https://api.getrewardful.com/v1/referrals',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliate_id: affiliateId,
        email: customerEmail,
        stripe_customer_id: stripeCustomerId
      })
    }
  );

  return response.json();
}
```

### Get Campaign Stats

```javascript
async function getCampaignStats(campaignId) {
  const response = await fetch(
    `https://api.getrewardful.com/v1/campaigns/${campaignId}`,
    {
      headers: {
        'Authorization': `Bearer ${REWARDFUL_API_SECRET}`
      }
    }
  );

  return response.json();
}
```

### Webhook Handler

```javascript
function handleRewardfulWebhook(payload, signature) {
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  switch (payload.event) {
    case 'affiliate.created':
      handleNewAffiliate(payload.data);
      break;
    case 'referral.created':
      handleNewReferral(payload.data);
      break;
    case 'commission.created':
      handleNewCommission(payload.data);
      break;
    case 'commission.paid':
      handleCommissionPaid(payload.data);
      break;
  }
}
```

## Best Practices

1. **Use webhooks** - Real-time notifications for events
2. **Automate payouts** - Set up PayPal/Wise mass payments
3. **Track campaigns** - Create separate campaigns for different programs
4. **Monitor fraud** - Watch for suspicious referral patterns
5. **Integrate Stripe** - Native Stripe integration for accurate tracking

## Rate Limits

- 100 requests per minute
- Pagination for large datasets

## Related Skills

- `referral-program` - Program design
- `pricing-strategy` - Commission structures
- `analytics-tracking` - Referral attribution
