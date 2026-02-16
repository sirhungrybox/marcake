# Google Ads

## Overview

Google Ads is Google's advertising platform for search, display, video, shopping, and app campaigns reaching billions of users across Google properties and partner networks.

## Authentication

### OAuth 2.0

Google Ads API requires OAuth 2.0 with a developer token.

1. Apply for Google Ads API access
2. Get a developer token
3. Create OAuth credentials in Google Cloud Console
4. Authorize with a Google Ads manager account

### Environment Variables

```bash
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_CLIENT_ID=your_client_id
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
GOOGLE_ADS_CUSTOMER_ID=1234567890
```

## Common Operations

### Initialize Client

```javascript
const { GoogleAdsApi } = require('google-ads-api');

const client = new GoogleAdsApi({
  client_id: GOOGLE_ADS_CLIENT_ID,
  client_secret: GOOGLE_ADS_CLIENT_SECRET,
  developer_token: GOOGLE_ADS_DEVELOPER_TOKEN
});

const customer = client.Customer({
  customer_id: GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: GOOGLE_ADS_REFRESH_TOKEN
});
```

### Get Campaign Performance

```javascript
async function getCampaignPerformance(startDate, endDate) {
  const campaigns = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY metrics.cost_micros DESC
  `);

  return campaigns;
}
```

### Get Ad Group Performance

```javascript
async function getAdGroupPerformance(campaignId) {
  const adGroups = await customer.query(`
    SELECT
      ad_group.id,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc
    FROM ad_group
    WHERE campaign.id = ${campaignId}
  `);

  return adGroups;
}
```

### Get Keyword Performance

```javascript
async function getKeywordPerformance(adGroupId) {
  const keywords = await customer.query(`
    SELECT
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.cost_micros
    FROM keyword_view
    WHERE ad_group.id = ${adGroupId}
  `);

  return keywords;
}
```

### Create Campaign

```javascript
async function createCampaign(name, budget, type = 'SEARCH') {
  // First create a budget
  const budgetResult = await customer.campaignBudgets.create({
    campaign_budget: {
      name: `${name} Budget`,
      amount_micros: budget * 1000000, // Convert to micros
      delivery_method: 'STANDARD'
    }
  });

  // Then create the campaign
  const campaignResult = await customer.campaigns.create({
    campaign: {
      name: name,
      advertising_channel_type: type,
      status: 'PAUSED',
      campaign_budget: budgetResult.results[0].resource_name,
      start_date: new Date().toISOString().split('T')[0].replace(/-/g, ''),
      manual_cpc: {}
    }
  });

  return campaignResult;
}
```

### Update Campaign Status

```javascript
async function updateCampaignStatus(campaignId, status) {
  const result = await customer.campaigns.update({
    resource_name: `customers/${GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
    status: status // 'ENABLED', 'PAUSED', 'REMOVED'
  });

  return result;
}
```

### Get Search Terms Report

```javascript
async function getSearchTerms(campaignId, startDate, endDate) {
  const searchTerms = await customer.query(`
    SELECT
      search_term_view.search_term,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.cost_micros
    FROM search_term_view
    WHERE campaign.id = ${campaignId}
      AND segments.date BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY metrics.impressions DESC
    LIMIT 100
  `);

  return searchTerms;
}
```

### Add Negative Keywords

```javascript
async function addNegativeKeyword(campaignId, keyword) {
  const result = await customer.campaignCriteria.create({
    campaign_criterion: {
      campaign: `customers/${GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
      keyword: {
        text: keyword,
        match_type: 'BROAD'
      },
      negative: true
    }
  });

  return result;
}
```

## Best Practices

1. **Use GAQL** - Google Ads Query Language for flexible queries
2. **Batch operations** - Reduce API calls
3. **Monitor quotas** - Track API usage
4. **Test in test account** - Use test accounts for development
5. **Handle micros** - Money values are in micros (1,000,000 = $1)

## Rate Limits

- 15,000 operations per day (developer token level)
- 1,600 requests per 100 seconds
- Varies by operation type

## Related Skills

- `paid-ads` - Campaign strategy
- `analytics-tracking` - Conversion tracking
- `ab-test-setup` - Ad creative testing
