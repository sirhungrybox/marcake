# LinkedIn Ads

## Overview

LinkedIn Ads provides B2B advertising with professional targeting based on job titles, companies, industries, skills, and seniority levels across LinkedIn's network.

## Authentication

### OAuth 2.0

1. Create an app at linkedin.com/developers
2. Request Marketing Developer Platform access
3. Implement OAuth 2.0 flow
4. Get access token with appropriate scopes

### Environment Variables

```bash
LINKEDIN_ACCESS_TOKEN=your_access_token
LINKEDIN_AD_ACCOUNT_ID=your_ad_account_id
```

## Common Operations

### Get Campaign Groups

```javascript
async function getCampaignGroups(adAccountId) {
  const response = await fetch(
    `https://api.linkedin.com/rest/adAccounts/${adAccountId}/adCampaignGroups`,
    {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }
  );

  return response.json();
}
```

### Get Campaigns

```javascript
async function getCampaigns(adAccountId) {
  const response = await fetch(
    `https://api.linkedin.com/rest/adAccounts/${adAccountId}/adCampaigns`,
    {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }
  );

  return response.json();
}
```

### Get Campaign Analytics

```javascript
async function getCampaignAnalytics(campaignId, startDate, endDate) {
  const response = await fetch(
    `https://api.linkedin.com/rest/adAnalytics?` +
    `q=analytics&pivot=CAMPAIGN&dateRange.start.day=${startDate.day}` +
    `&dateRange.start.month=${startDate.month}&dateRange.start.year=${startDate.year}` +
    `&dateRange.end.day=${endDate.day}&dateRange.end.month=${endDate.month}` +
    `&dateRange.end.year=${endDate.year}&campaigns=urn:li:sponsoredCampaign:${campaignId}` +
    `&fields=impressions,clicks,costInLocalCurrency,conversions`,
    {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'LinkedIn-Version': '202401'
      }
    }
  );

  return response.json();
}
```

### Create Campaign

```javascript
async function createCampaign(adAccountId, campaignGroupId, name, targeting) {
  const response = await fetch(
    `https://api.linkedin.com/rest/adAccounts/${adAccountId}/adCampaigns`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        account: `urn:li:sponsoredAccount:${adAccountId}`,
        campaignGroup: `urn:li:sponsoredCampaignGroup:${campaignGroupId}`,
        name: name,
        type: 'SPONSORED_UPDATES',
        costType: 'CPC',
        status: 'PAUSED',
        targetingCriteria: targeting,
        locale: { country: 'US', language: 'en' }
      })
    }
  );

  return response.json();
}
```

### Create Targeting

```javascript
function buildTargeting(options) {
  const targeting = {
    include: {
      and: []
    }
  };

  // Job titles
  if (options.jobTitles) {
    targeting.include.and.push({
      or: {
        'urn:li:adTargetingFacet:titles': options.jobTitles
      }
    });
  }

  // Seniorities
  if (options.seniorities) {
    targeting.include.and.push({
      or: {
        'urn:li:adTargetingFacet:seniorities': options.seniorities
      }
    });
  }

  // Industries
  if (options.industries) {
    targeting.include.and.push({
      or: {
        'urn:li:adTargetingFacet:industries': options.industries
      }
    });
  }

  // Company sizes
  if (options.companySizes) {
    targeting.include.and.push({
      or: {
        'urn:li:adTargetingFacet:staffCountRanges': options.companySizes
      }
    });
  }

  return targeting;
}
```

### Create Ad Creative

```javascript
async function createCreative(adAccountId, name, content) {
  const response = await fetch(
    'https://api.linkedin.com/rest/adCreatives',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        account: `urn:li:sponsoredAccount:${adAccountId}`,
        name: name,
        type: 'SPONSORED_STATUS_UPDATE',
        status: 'ACTIVE',
        ...content
      })
    }
  );

  return response.json();
}
```

### Get Audience Counts

```javascript
async function getAudienceCount(adAccountId, targetingCriteria) {
  const response = await fetch(
    'https://api.linkedin.com/rest/adTargetingAnalytics?' +
    `q=audienceCounts&accounts=List(urn:li:sponsoredAccount:${adAccountId})`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401'
      },
      body: JSON.stringify({
        targetingCriteria: targetingCriteria
      })
    }
  );

  return response.json();
}
```

## Best Practices

1. **Start with broad targeting** - Narrow based on performance
2. **Use Lead Gen Forms** - Better conversion rates
3. **Minimum audience size** - 50,000+ for optimal delivery
4. **Frequency caps** - Prevent ad fatigue
5. **A/B test creatives** - Test messaging and images

## Rate Limits

- 100 requests per day per application
- 500 requests per day per member
- Varies by endpoint

## Related Skills

- `paid-ads` - B2B advertising strategy
- `analytics-tracking` - LinkedIn Insight Tag
- `ab-test-setup` - Creative testing
