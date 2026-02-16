# TikTok Ads

## Overview

TikTok Ads provides advertising on TikTok and partner apps, reaching younger demographics with video-first ad formats including in-feed ads, branded effects, and TopView placements.

## Authentication

### Access Token

1. Create an app at ads.tiktok.com/marketing_api
2. Get your App ID and Secret
3. Generate access token via OAuth

### Environment Variables

```bash
TIKTOK_ACCESS_TOKEN=your_access_token
TIKTOK_ADVERTISER_ID=your_advertiser_id
TIKTOK_APP_ID=your_app_id
TIKTOK_SECRET=your_secret
```

## Common Operations

### Get Campaigns

```javascript
async function getCampaigns(advertiserId) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/campaign/get/',
    {
      method: 'GET',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN
      },
      params: {
        advertiser_id: advertiserId,
        page_size: 100
      }
    }
  );

  return response.json();
}
```

### Get Campaign Performance

```javascript
async function getCampaignReport(advertiserId, campaignIds, startDate, endDate) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        report_type: 'BASIC',
        dimensions: ['campaign_id', 'stat_time_day'],
        metrics: ['impressions', 'clicks', 'spend', 'conversion', 'cpc', 'cpm'],
        filters: [{
          field_name: 'campaign_id',
          filter_type: 'IN',
          filter_value: JSON.stringify(campaignIds)
        }],
        data_level: 'AUCTION_CAMPAIGN',
        start_date: startDate,
        end_date: endDate
      })
    }
  );

  return response.json();
}
```

### Create Campaign

```javascript
async function createCampaign(advertiserId, name, objective, budget) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/campaign/create/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        campaign_name: name,
        objective_type: objective, // 'CONVERSIONS', 'REACH', 'TRAFFIC'
        budget_mode: 'BUDGET_MODE_DAY',
        budget: budget,
        operation_status: 'DISABLE' // Start paused
      })
    }
  );

  return response.json();
}
```

### Create Ad Group

```javascript
async function createAdGroup(advertiserId, campaignId, name, targeting, budget) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/adgroup/create/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        campaign_id: campaignId,
        adgroup_name: name,
        placement_type: 'PLACEMENT_TYPE_AUTOMATIC',
        budget_mode: 'BUDGET_MODE_DAY',
        budget: budget,
        schedule_type: 'SCHEDULE_FROM_NOW',
        billing_event: 'CPC',
        bid_type: 'BID_TYPE_NO_BID',
        optimization_goal: 'CLICK',
        ...targeting,
        operation_status: 'DISABLE'
      })
    }
  );

  return response.json();
}
```

### Create Ad

```javascript
async function createAd(advertiserId, adgroupId, name, videoId, displayName, callToAction) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/ad/create/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        adgroup_id: adgroupId,
        creatives: [{
          ad_name: name,
          ad_format: 'SINGLE_VIDEO',
          video_id: videoId,
          display_name: displayName,
          call_to_action: callToAction,
          landing_page_url: 'https://example.com'
        }]
      })
    }
  );

  return response.json();
}
```

### Upload Video

```javascript
async function uploadVideo(advertiserId, videoFile) {
  const formData = new FormData();
  formData.append('advertiser_id', advertiserId);
  formData.append('upload_type', 'UPLOAD_BY_FILE');
  formData.append('video_file', videoFile);

  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/file/video/ad/upload/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN
      },
      body: formData
    }
  );

  return response.json();
}
```

### Get Audience Insights

```javascript
async function getAudienceSize(advertiserId, targeting) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/audience/estimate/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        ...targeting
      })
    }
  );

  return response.json();
}
```

### Create Custom Audience

```javascript
async function createCustomAudience(advertiserId, name, type) {
  const response = await fetch(
    'https://business-api.tiktok.com/open_api/v1.3/dmp/custom_audience/create/',
    {
      method: 'POST',
      headers: {
        'Access-Token': TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        custom_audience_name: name,
        custom_audience_type: type // 'CUSTOMER_FILE', 'ENGAGEMENT', etc.
      })
    }
  );

  return response.json();
}
```

## Best Practices

1. **Native content style** - Ads should feel organic to TikTok
2. **Vertical video** - 9:16 aspect ratio
3. **Sound on** - Audio is essential on TikTok
4. **Short and punchy** - 9-15 seconds optimal
5. **Use Spark Ads** - Boost organic posts

## Rate Limits

- 10 requests per second
- 100,000 requests per day
- Varies by endpoint

## Related Skills

- `paid-ads` - Video advertising strategy
- `social-content` - TikTok content creation
- `analytics-tracking` - TikTok Pixel setup
