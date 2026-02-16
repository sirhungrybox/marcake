# Meta Ads (Facebook & Instagram)

## Overview

Meta Ads provides advertising across Facebook, Instagram, Messenger, and the Audience Network. It offers powerful targeting based on demographics, interests, behaviors, and custom audiences.

## Authentication

### Access Token

1. Create an app at developers.facebook.com
2. Get a User or System User access token
3. Grant ads_management and ads_read permissions

### Environment Variables

```bash
META_ACCESS_TOKEN=your_access_token
META_AD_ACCOUNT_ID=act_123456789
META_APP_ID=your_app_id
META_APP_SECRET=your_app_secret
```

## Common Operations

### Get Campaign Insights

```javascript
async function getCampaignInsights(campaignId, startDate, endDate) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${campaignId}/insights?` +
    `fields=campaign_name,impressions,clicks,spend,actions,cpc,cpm,ctr` +
    `&time_range={"since":"${startDate}","until":"${endDate}"}` +
    `&access_token=${META_ACCESS_TOKEN}`
  );

  return response.json();
}
```

### Get All Campaigns

```javascript
async function getCampaigns(adAccountId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/campaigns?` +
    `fields=id,name,status,objective,daily_budget,lifetime_budget` +
    `&access_token=${META_ACCESS_TOKEN}`
  );

  return response.json();
}
```

### Create Campaign

```javascript
async function createCampaign(adAccountId, name, objective, status = 'PAUSED') {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/campaigns`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        objective: objective, // CONVERSIONS, REACH, TRAFFIC, etc.
        status: status,
        special_ad_categories: [],
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

### Create Ad Set

```javascript
async function createAdSet(adAccountId, campaignId, name, targeting, budget) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/adsets`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_id: campaignId,
        name: name,
        targeting: targeting,
        daily_budget: budget * 100, // In cents
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'CONVERSIONS',
        status: 'PAUSED',
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

### Create Ad

```javascript
async function createAd(adAccountId, adSetId, creativeId, name) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/ads`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        adset_id: adSetId,
        creative: { creative_id: creativeId },
        status: 'PAUSED',
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

### Create Custom Audience

```javascript
async function createCustomAudience(adAccountId, name, description) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/customaudiences`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        description: description,
        subtype: 'CUSTOM',
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

### Create Lookalike Audience

```javascript
async function createLookalikeAudience(adAccountId, sourceAudienceId, country, ratio) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/customaudiences`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Lookalike ${ratio}% - ${country}`,
        subtype: 'LOOKALIKE',
        origin_audience_id: sourceAudienceId,
        lookalike_spec: JSON.stringify({
          country: country,
          ratio: ratio / 100 // 1-10% expressed as 0.01-0.10
        }),
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

### Get Ad Creatives

```javascript
async function getCreatives(adAccountId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/adcreatives?` +
    `fields=id,name,object_story_spec,thumbnail_url` +
    `&access_token=${META_ACCESS_TOKEN}`
  );

  return response.json();
}
```

### Update Campaign Status

```javascript
async function updateCampaignStatus(campaignId, status) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${campaignId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status, // 'ACTIVE', 'PAUSED', 'DELETED'
        access_token: META_ACCESS_TOKEN
      })
    }
  );

  return response.json();
}
```

## Best Practices

1. **Use Marketing API SDK** - Official SDKs available
2. **Test with sandbox** - Use test ad accounts
3. **Batch requests** - Reduce API calls
4. **Monitor frequency** - Watch ad fatigue
5. **Use Conversions API** - Server-side tracking for iOS 14+

## Rate Limits

- 200 calls per hour per ad account
- Varies by endpoint and operation
- Use batch requests to reduce calls

## Related Skills

- `paid-ads` - Campaign strategy
- `analytics-tracking` - Pixel and CAPI setup
- `ab-test-setup` - Creative testing
