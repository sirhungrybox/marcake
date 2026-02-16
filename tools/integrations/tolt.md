# Tolt

## Overview

Tolt is a simple affiliate and referral tracking platform for SaaS, designed for quick setup with Stripe, Paddle, and other payment providers.

## Authentication

### API Key

1. Go to Tolt Dashboard → Settings → API
2. Copy your API key

### Environment Variables

```bash
TOLT_API_KEY=your_api_key
TOLT_PROGRAM_ID=your_program_id
```

## Common Operations

### Get Affiliates

```javascript
async function getAffiliates() {
  const response = await fetch(
    'https://api.tolt.io/v1/affiliates',
    {
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Get Affiliate by Email

```javascript
async function getAffiliateByEmail(email) {
  const response = await fetch(
    `https://api.tolt.io/v1/affiliates?email=${encodeURIComponent(email)}`,
    {
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Create Affiliate

```javascript
async function createAffiliate(email, name) {
  const response = await fetch(
    'https://api.tolt.io/v1/affiliates',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        name: name,
        program_id: TOLT_PROGRAM_ID
      })
    }
  );

  return response.json();
}
```

### Get Referrals

```javascript
async function getReferrals(affiliateId = null) {
  let url = 'https://api.tolt.io/v1/referrals';
  if (affiliateId) {
    url += `?affiliate_id=${affiliateId}`;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${TOLT_API_KEY}`
    }
  });

  return response.json();
}
```

### Create Referral

```javascript
async function createReferral(affiliateId, customerEmail) {
  const response = await fetch(
    'https://api.tolt.io/v1/referrals',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliate_id: affiliateId,
        customer_email: customerEmail
      })
    }
  );

  return response.json();
}
```

### Get Commissions

```javascript
async function getCommissions(status = null) {
  let url = 'https://api.tolt.io/v1/commissions';
  if (status) {
    url += `?status=${status}`; // pending, approved, paid
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${TOLT_API_KEY}`
    }
  });

  return response.json();
}
```

### Approve Commission

```javascript
async function approveCommission(commissionId) {
  const response = await fetch(
    `https://api.tolt.io/v1/commissions/${commissionId}/approve`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Mark Commission Paid

```javascript
async function markCommissionPaid(commissionId) {
  const response = await fetch(
    `https://api.tolt.io/v1/commissions/${commissionId}/pay`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Client-Side Tracking

```html
<!-- Add to your website -->
<script>
  (function(t,o,l,a,i){t[i]=t[i]||function(){(t[i].q=t[i].q||[]).push(arguments)};
  a=o.createElement(l);a.async=1;a.src='https://cdn.tolt.io/tolt.js';
  o.head.appendChild(a);
  })(window,document,'script','https://cdn.tolt.io/tolt.js','tolt');
  tolt('init', { program: 'YOUR_PROGRAM_ID' });
</script>
```

### Track Conversion (Server-side)

```javascript
async function trackConversion(customerEmail, amount, currency = 'USD') {
  const response = await fetch(
    'https://api.tolt.io/v1/conversions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOLT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_email: customerEmail,
        amount: amount,
        currency: currency
      })
    }
  );

  return response.json();
}
```

## Best Practices

1. **Simple setup** - Tolt is designed for quick implementation
2. **Use client-side tracking** - Captures referral cookies automatically
3. **Webhook integration** - Set up webhooks for real-time updates
4. **Stripe/Paddle native** - Use native integrations when possible
5. **Affiliate portal** - Direct affiliates to their branded dashboard

## Rate Limits

- Standard API rate limits apply
- Contact Tolt for high-volume needs

## Related Skills

- `referral-program` - Program strategy
- `analytics-tracking` - Conversion tracking
- `paywall-upgrade-cro` - Upgrade attribution
