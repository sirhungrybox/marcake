# 🎂 MarCake

**Marketing Skills for AI Agents**

MarCake is a comprehensive collection of 25 marketing skill modules designed to transform AI agents into expert marketing assistants. Each skill provides structured frameworks, assessment criteria, and actionable outputs for specific marketing tasks.

## Why MarCake?

AI agents are powerful, but generic. MarCake gives them specialized marketing expertise:

- **Structured Frameworks** - Battle-tested methodologies for each marketing discipline
- **Contextual Awareness** - Skills that check for existing context before generating outputs
- **Actionable Outputs** - Specific deliverables, not vague recommendations
- **Tool Integration** - 29 marketing tool guides for seamless workflows

## Skills Library

### Conversion Optimization

| Skill | Description |
|-------|-------------|
| [page-cro](skills/page-cro/SKILL.md) | Landing page optimization and conversion analysis |
| [signup-flow-cro](skills/signup-flow-cro/SKILL.md) | Registration flow optimization |
| [onboarding-cro](skills/onboarding-cro/SKILL.md) | Post-signup activation and user engagement |
| [form-cro](skills/form-cro/SKILL.md) | Lead capture form optimization |
| [popup-cro](skills/popup-cro/SKILL.md) | Modal and overlay optimization |
| [paywall-upgrade-cro](skills/paywall-upgrade-cro/SKILL.md) | In-app upgrade moment optimization |

### Content & Copy

| Skill | Description |
|-------|-------------|
| [copywriting](skills/copywriting/SKILL.md) | Marketing page copy creation |
| [copy-editing](skills/copy-editing/SKILL.md) | Editing and improving existing copy |
| [email-sequence](skills/email-sequence/SKILL.md) | Automated email flow design |
| [social-content](skills/social-content/SKILL.md) | Social media content creation |

### SEO & Discovery

| Skill | Description |
|-------|-------------|
| [seo-audit](skills/seo-audit/SKILL.md) | Technical and on-page SEO analysis |
| [programmatic-seo](skills/programmatic-seo/SKILL.md) | Scaled page generation strategies |
| [competitor-alternatives](skills/competitor-alternatives/SKILL.md) | Comparison and alternative pages |
| [schema-markup](skills/schema-markup/SKILL.md) | Structured data implementation |

### Measurement & Testing

| Skill | Description |
|-------|-------------|
| [analytics-tracking](skills/analytics-tracking/SKILL.md) | Event tracking setup and implementation |
| [ab-test-setup](skills/ab-test-setup/SKILL.md) | Experiment design and hypothesis formation |

### Growth Engineering

| Skill | Description |
|-------|-------------|
| [free-tool-strategy](skills/free-tool-strategy/SKILL.md) | Marketing tools and calculators |
| [referral-program](skills/referral-program/SKILL.md) | Referral program design |

### Strategy & Planning

| Skill | Description |
|-------|-------------|
| [marketing-ideas](skills/marketing-ideas/SKILL.md) | SaaS marketing ideation |
| [marketing-psychology](skills/marketing-psychology/SKILL.md) | Behavioral science applications |
| [launch-strategy](skills/launch-strategy/SKILL.md) | Product launch planning |
| [pricing-strategy](skills/pricing-strategy/SKILL.md) | Pricing and packaging optimization |
| [content-strategy](skills/content-strategy/SKILL.md) | Content planning and calendars |

### Foundational

| Skill | Description |
|-------|-------------|
| [product-marketing-context](skills/product-marketing-context/SKILL.md) | Marketing context documentation |
| [paid-ads](skills/paid-ads/SKILL.md) | Advertising campaign management |

## Installation

### Method 1: npx (Recommended)

```bash
# Initialize MarCake in your project
npx marcake init

# Browse available skills
npx marcake list

# View a specific skill
npx marcake skill page-cro
```

This copies MarCake to a `.marcake/` directory in your project.

### Method 2: npm Install

```bash
npm install marcake
```

Then use programmatically:

```javascript
const marcake = require('marcake');

// Get all skills
const skills = marcake.getSkills();

// Get specific skill content
const pageCro = marcake.getSkill('page-cro');
```

### Method 3: Git Submodule

```bash
git submodule add https://github.com/sirhungrybox/marcake.git .marcake
```

Then reference skills in your project's CLAUDE.md:

```markdown
## Marketing Skills
Import marketing expertise from `.marcake/skills/`
```

### Method 4: Direct Clone

```bash
git clone https://github.com/sirhungrybox/marcake.git
```

## Usage

### With Claude Code

Once installed, invoke skills naturally:

```
"Optimize this landing page for conversions"
→ Activates page-cro skill

"Create an email welcome sequence"
→ Activates email-sequence skill

"Set up analytics tracking for our checkout"
→ Activates analytics-tracking skill
```

### Skill Chaining

Skills reference each other. A typical workflow:

1. **product-marketing-context** - Establish baseline context
2. **marketing-ideas** - Generate campaign concepts
3. **copywriting** - Create messaging
4. **page-cro** - Optimize landing page
5. **analytics-tracking** - Set up measurement
6. **ab-test-setup** - Design experiments

## Tool Integrations

MarCake includes integration guides for 33 marketing tools:

- **Analytics**: GA4, Mixpanel, Amplitude, PostHog, Segment, Adobe Analytics
- **SEO**: Google Search Console, Semrush, Ahrefs
- **CRM**: HubSpot, Salesforce
- **Payments**: Stripe
- **Referral**: Rewardful, Tolt, Mention-Me, Dub.co
- **Email**: Mailchimp, Customer.io, SendGrid, Resend, Kit
- **Advertising**: Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads
- **Automation**: Zapier
- **Commerce/CMS**: Shopify, WordPress, Webflow

See [tools/REGISTRY.md](tools/REGISTRY.md) for the complete integration guide.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new skills or improving existing ones.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**MarCake** - Making AI agents marketing-fluent.
