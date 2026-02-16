# Mention Me

## Overview

Mention Me is an enterprise referral marketing platform specializing in e-commerce and retail, offering AB testing, fraud detection, and multi-channel referral programs.

## Authentication

### API Credentials

1. Contact Mention Me to get API access
2. Obtain your Partner Code and API Key
3. Get environment-specific endpoints

### Environment Variables

```bash
MENTION_ME_API_KEY=your_api_key
MENTION_ME_PARTNER_CODE=your_partner_code
MENTION_ME_API_URL=https://api.mention-me.com
```

## Common Operations

### Get Referrer by Email

```javascript
async function getReferrer(email) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referrer?` +
    `email=${encodeURIComponent(email)}&` +
    `partnerCode=${MENTION_ME_PARTNER_CODE}`,
    {
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Register Referrer

```javascript
async function registerReferrer(email, firstName, lastName) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referrer`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partnerCode: MENTION_ME_PARTNER_CODE,
        email: email,
        firstName: firstName,
        lastName: lastName
      })
    }
  );

  return response.json();
}
```

### Get Referral Link

```javascript
async function getReferralLink(referrerId) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referrer/${referrerId}/share-links?` +
    `partnerCode=${MENTION_ME_PARTNER_CODE}`,
    {
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Record Order (Track Conversion)

```javascript
async function recordOrder(orderData) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/order`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partnerCode: MENTION_ME_PARTNER_CODE,
        order: {
          orderIdentifier: orderData.orderId,
          total: orderData.total,
          currencyCode: orderData.currency,
          dateString: new Date().toISOString()
        },
        customer: {
          email: orderData.email,
          firstName: orderData.firstName,
          lastName: orderData.lastName
        },
        request: {
          situation: 'post-purchase'
        }
      })
    }
  );

  return response.json();
}
```

### Validate Referral Code

```javascript
async function validateReferralCode(code) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referral-code/validate`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partnerCode: MENTION_ME_PARTNER_CODE,
        referralCode: code
      })
    }
  );

  return response.json();
}
```

### Get Referrer Stats

```javascript
async function getReferrerStats(referrerId) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referrer/${referrerId}/stats?` +
    `partnerCode=${MENTION_ME_PARTNER_CODE}`,
    {
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`
      }
    }
  );

  return response.json();
}
```

### Client-Side Integration

```html
<!-- Mention Me Tag -->
<script>
  window.MentionMeConfig = {
    partnerCode: 'YOUR_PARTNER_CODE',
    locale: 'en_GB',
    situation: 'post-purchase'
  };
</script>
<script src="https://tag.mention-me.com/tag.js"></script>
```

### Post-Purchase Overlay

```javascript
// Trigger post-purchase referral overlay
function showReferralOverlay(orderData) {
  if (window.MentionMe) {
    window.MentionMe.show({
      situation: 'post-purchase',
      order: {
        orderIdentifier: orderData.orderId,
        total: orderData.total,
        currencyCode: 'USD'
      },
      customer: {
        email: orderData.email,
        firstName: orderData.firstName
      }
    });
  }
}
```

### Get Rewards

```javascript
async function getRewards(referrerId) {
  const response = await fetch(
    `${MENTION_ME_API_URL}/api/consumer/v2/referrer/${referrerId}/rewards?` +
    `partnerCode=${MENTION_ME_PARTNER_CODE}`,
    {
      headers: {
        'Authorization': `Bearer ${MENTION_ME_API_KEY}`
      }
    }
  );

  return response.json();
}
```

## Best Practices

1. **Post-purchase prompt** - Show referral ask after successful order
2. **Name sharing** - Mention Me's unique name-based referral
3. **A/B test offers** - Test different incentive structures
4. **Fraud detection** - Use built-in fraud prevention
5. **Multi-channel** - Enable sharing across email, social, SMS

## Rate Limits

- Rate limits vary by contract
- Contact Mention Me for specific limits

## Related Skills

- `referral-program` - E-commerce referral strategy
- `email-sequence` - Referral email automation
- `analytics-tracking` - Referral attribution
