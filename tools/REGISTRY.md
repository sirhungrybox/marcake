# MarCake Tools Registry

This registry documents integrations with 33 marketing tools, providing setup guides, API references, and best practices for AI agent interactions.

## Tool Capability Matrix

| Tool | Category | API | MCP | CLI | SDK | Auth Type |
|------|----------|-----|-----|-----|-----|-----------|
| Adobe Analytics | Analytics | ✓ | - | - | ✓ | OAuth |
| Ahrefs | SEO | ✓ | - | - | - | API Key |
| Amplitude | Analytics | ✓ | - | - | ✓ | API Key |
| Customer.io | Email | ✓ | - | - | ✓ | API Key |
| Dub.co | Referral/Links | ✓ | - | - | ✓ | API Key |
| GA4 | Analytics | ✓ | - | - | ✓ | OAuth |
| Google Ads | Advertising | ✓ | - | - | ✓ | OAuth |
| Google Search Console | SEO | ✓ | - | - | ✓ | OAuth |
| HubSpot | CRM | ✓ | - | ✓ | ✓ | OAuth/API Key |
| Kit | Email | ✓ | - | - | - | API Key |
| LinkedIn Ads | Advertising | ✓ | - | - | - | OAuth |
| Mailchimp | Email | ✓ | - | - | ✓ | OAuth/API Key |
| Mention-Me | Referral | ✓ | - | - | - | API Key |
| Meta Ads | Advertising | ✓ | - | - | ✓ | OAuth |
| Mixpanel | Analytics | ✓ | - | - | ✓ | API Key |
| PostHog | Analytics | ✓ | - | - | ✓ | API Key |
| Resend | Email | ✓ | - | - | ✓ | API Key |
| Rewardful | Referral | ✓ | - | - | ✓ | API Key |
| Salesforce | CRM | ✓ | - | ✓ | ✓ | OAuth |
| Segment | Analytics | ✓ | - | - | ✓ | Write Key |
| Semrush | SEO | ✓ | - | - | - | API Key |
| SendGrid | Email | ✓ | - | - | ✓ | API Key |
| Shopify | Commerce | ✓ | - | ✓ | ✓ | OAuth/API Key |
| Stripe | Payments | ✓ | - | ✓ | ✓ | API Key |
| TikTok Ads | Advertising | ✓ | - | - | ✓ | OAuth |
| Tolt | Referral | ✓ | - | - | - | API Key |
| Webflow | CMS | ✓ | - | ✓ | ✓ | API Key |
| WordPress | CMS | ✓ | - | ✓ | ✓ | App Password |
| Zapier | Automation | ✓ | - | - | - | API Key |

## Quick Start by Use Case

### Email Marketing Setup
1. **Transactional Email**: [Resend](integrations/resend.md) or [SendGrid](integrations/sendgrid.md)
2. **Email Campaigns**: [Mailchimp](integrations/mailchimp.md) or [Kit](integrations/kit.md)
3. **Marketing Automation**: [Customer.io](integrations/customer-io.md)

### Analytics Implementation
1. **Web Analytics**: [GA4](integrations/ga4.md)
2. **Product Analytics**: [Mixpanel](integrations/mixpanel.md), [Amplitude](integrations/amplitude.md), or [PostHog](integrations/posthog.md)
3. **Customer Data Platform**: [Segment](integrations/segment.md)
4. **Enterprise Analytics**: [Adobe Analytics](integrations/adobe-analytics.md)

### SEO Tools
1. **Search Console**: [Google Search Console](integrations/google-search-console.md)
2. **Keyword Research**: [Semrush](integrations/semrush.md) or [Ahrefs](integrations/ahrefs.md)

### Paid Advertising
1. **Search Ads**: [Google Ads](integrations/google-ads.md)
2. **Social Ads**: [Meta Ads](integrations/meta-ads.md), [LinkedIn Ads](integrations/linkedin-ads.md)
3. **Video Ads**: [TikTok Ads](integrations/tiktok-ads.md)

### CRM & Sales
1. **SMB CRM**: [HubSpot](integrations/hubspot.md)
2. **Enterprise CRM**: [Salesforce](integrations/salesforce.md)

### Referral & Affiliate
1. **SaaS Affiliate**: [Rewardful](integrations/rewardful.md)
2. **E-commerce Referral**: [Mention-Me](integrations/mention-me.md)
3. **Simple Referral**: [Tolt](integrations/tolt.md)
4. **Link Management**: [Dub.co](integrations/dub-co.md)

### Commerce & CMS
1. **E-commerce**: [Shopify](integrations/shopify.md)
2. **Payments**: [Stripe](integrations/stripe.md)
3. **No-code CMS**: [Webflow](integrations/webflow.md)
4. **Traditional CMS**: [WordPress](integrations/wordpress.md)

### Automation
1. **Integration Platform**: [Zapier](integrations/zapier.md)

## Agent Integration Recommendations

### For AI Agents

When integrating with these tools, agents should:

1. **Check Authentication First**
   - Verify API keys/tokens are configured
   - Handle auth errors gracefully
   - Request credentials if missing

2. **Use Read Operations Carefully**
   - Prefer batch operations over multiple single requests
   - Cache responses when appropriate
   - Respect rate limits

3. **Write Operations with Caution**
   - Confirm before making changes
   - Use test/sandbox modes when available
   - Log all mutations

4. **Handle Errors Gracefully**
   - Provide meaningful error messages
   - Suggest troubleshooting steps
   - Know when to escalate to humans

### API vs SDK

| Approach | Pros | Cons | Use When |
|----------|------|------|----------|
| Direct API | Universal, current | More code | Quick integration |
| Official SDK | Type safety, helpers | Dependency | Heavy usage |
| MCP Server | Agent-optimized | Setup required | AI workflows |

### Rate Limiting Guidelines

Most marketing APIs have rate limits. Common patterns:

| Platform | Typical Limit | Strategy |
|----------|---------------|----------|
| Analytics | 10-50 req/sec | Batch requests |
| Email | 100-1000/sec | Queue sends |
| CRM | 100-500/sec | Bulk operations |
| Advertising | 1-10/sec | Cache data |

## Integration Template

Each integration guide follows this structure:

1. **Overview** - What the tool does
2. **Authentication** - How to set up access
3. **Common Operations** - Key API calls
4. **Code Examples** - Implementation snippets
5. **Best Practices** - Tips for effective use
6. **Related Skills** - Which MarCake skills use this tool

## Contributing New Integrations

To add a new tool integration:

1. Create `tools/integrations/[tool-name].md`
2. Follow the template structure
3. Add to capability matrix above
4. Include working code examples
5. Test authentication flow
6. Submit PR
