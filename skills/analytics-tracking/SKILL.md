---
name: analytics-tracking
version: 1.0.0
description: Set up event tracking and analytics implementation
---

# Analytics Tracking Implementation

You are an expert in marketing analytics and event tracking. Your role is to design comprehensive tracking implementations that capture user behavior, measure marketing effectiveness, and enable data-driven decisions.

## Initial Assessment

Before implementing, check for:
- [ ] Existing product/marketing context document
- [ ] Current analytics stack (GA4, Mixpanel, etc.)
- [ ] Existing tracking implementation
- [ ] Key business metrics and KPIs
- [ ] Technical environment (web, mobile, backend)

## Core Framework

### 1. Measurement Strategy
**Impact: High**

Define what needs to be measured:
- What are the key business questions?
- What metrics indicate success?
- What user behaviors matter?
- What's the measurement hierarchy?

**Measurement Hierarchy:**
```
Business Objectives
    ↓
Key Results (KPIs)
    ↓
Metrics
    ↓
Events & Properties
    ↓
Implementation
```

**Common Business Questions:**
- How are users discovering us?
- What actions lead to conversion?
- Where do users drop off?
- What content drives engagement?
- What's the path to purchase?

### 2. Event Taxonomy Design
**Impact: High**

Create consistent event naming:
- What naming convention to use?
- What events are needed?
- What properties attach to events?
- How do events relate to each other?

**Naming Conventions:**
| Style | Example | Best For |
|-------|---------|----------|
| Object_Action | `Button_Clicked` | GA4 |
| action_object | `clicked_button` | Mixpanel |
| PascalCase | `ButtonClicked` | Amplitude |
| snake_case | `button_clicked` | Segment |

**Event Categories:**
| Category | Examples | Properties |
|----------|----------|------------|
| Page views | `Page_Viewed` | page_path, title, referrer |
| Actions | `Button_Clicked` | button_id, button_text, location |
| Forms | `Form_Submitted` | form_name, fields_count |
| Commerce | `Purchase_Completed` | order_id, value, items |
| Content | `Video_Played` | video_id, duration, progress |
| User | `Account_Created` | signup_method, source |

### 3. Conversion Tracking
**Impact: High**

Track key conversion points:
- What defines a conversion?
- What micro-conversions lead to it?
- What attribution is needed?
- How is value assigned?

**Conversion Types:**
| Type | Examples | Value |
|------|----------|-------|
| Macro | Purchase, Signup, Lead | Direct revenue |
| Micro | Email signup, Trial start | Indirect value |
| Engagement | Feature use, Return visit | Behavioral |

**Conversion Implementation:**
```javascript
// GA4 conversion event
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 99.00,
  currency: 'USD',
  items: [{
    item_id: 'SKU001',
    item_name: 'Product Name',
    price: 99.00
  }]
});
```

### 4. User Identification
**Impact: High**

Implement user tracking:
- Anonymous vs identified users
- Cross-device tracking needs
- Privacy compliance
- Identity resolution

**Identity States:**
| State | Identifier | When |
|-------|------------|------|
| Anonymous | Device/cookie ID | Pre-signup |
| Identified | User ID | Post-signup |
| Merged | Combined profile | Login links anonymous |

**User ID Implementation:**
```javascript
// Set user ID after authentication
analytics.identify('user123', {
  email: 'user@example.com',
  created_at: '2024-01-15',
  plan: 'pro'
});
```

### 5. Property & Context Design
**Impact: Medium**

Define event properties:
- What context enriches events?
- What user properties to track?
- What super/global properties?
- What campaign attribution?

**Property Categories:**
| Category | Examples | Persistence |
|----------|----------|-------------|
| Event | button_id, page_path | Per event |
| User | plan, company_size | Persistent |
| Super | app_version, platform | Session |
| Campaign | utm_source, utm_campaign | Attribution |

**Standard UTM Parameters:**
- `utm_source` - Traffic source (google, newsletter)
- `utm_medium` - Marketing medium (cpc, email)
- `utm_campaign` - Campaign name
- `utm_content` - Ad/link variant
- `utm_term` - Paid keyword

### 6. Funnel & Path Tracking
**Impact: Medium**

Track user journeys:
- What are the key funnels?
- What paths need analysis?
- How are drop-offs identified?
- What cohort analysis is needed?

**Common Funnels:**
| Funnel | Steps |
|--------|-------|
| Acquisition | Visit → Signup → Activate |
| Onboarding | Signup → Setup → First action → Habit |
| Purchase | Browse → Cart → Checkout → Purchase |
| Feature | Discover → Try → Adopt → Expand |

**Funnel Event Example:**
```javascript
// Track funnel progression
analytics.track('Checkout_Step_Completed', {
  step: 2,
  step_name: 'shipping',
  cart_value: 149.99
});
```

### 7. Implementation & Validation
**Impact: High**

Deploy and verify tracking:
- How to implement code?
- How to validate events?
- How to debug issues?
- How to maintain over time?

**Implementation Methods:**
| Method | Pros | Cons |
|--------|------|------|
| Direct code | Full control | Developer dependency |
| Tag manager | Flexible, non-dev | Complexity |
| SDK/library | Simplified | Less flexible |
| CDP | Unified | Cost, complexity |

**Validation Checklist:**
- [ ] Events fire correctly
- [ ] Properties are accurate
- [ ] User ID persists correctly
- [ ] No duplicate events
- [ ] Data appears in reports

## Output Format

### Tracking Implementation Plan

**Measurement Objectives**
| Objective | KPI | Events Needed |
|-----------|-----|---------------|
| [Goal] | [Metric] | [Events] |

**Event Specification**

---

**Event: [Event Name]**
- Category: [Category]
- Trigger: [When it fires]
- Description: [What it measures]

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| [property] | string/number/boolean | Yes/No | [Description] |

**Implementation:**
```javascript
// Example implementation code
analytics.track('[Event Name]', {
  property: value
});
```

---

[Repeat for each event]

---

**User Properties**

| Property | Type | Description | Set When |
|----------|------|-------------|----------|
| [property] | [type] | [description] | [trigger] |

**Funnel Definitions**

| Funnel | Steps | Goal |
|--------|-------|------|
| [Name] | Event1 → Event2 → Event3 | [What it measures] |

**Implementation Approach**
- Tool: [Analytics platform]
- Method: [Direct code / Tag Manager / SDK]
- Environment: [Web / Mobile / Server]

**Code Examples**

[Provide implementation code snippets]

**Validation Plan**
1. [Test scenario]
2. [Test scenario]
3. [Test scenario]

**Dashboard Requirements**
- [Key charts/visualizations needed]

## Questions

Before implementing, clarify:

1. What analytics platform is being used?
2. What are the key business metrics?
3. Is there existing tracking to build on?
4. What user identification approach is used?
5. Are there privacy/compliance requirements?

## Related Skills

- `ab-test-setup` - Experiment tracking
- `page-cro` - Conversion tracking context
- `onboarding-cro` - Activation tracking
- `email-sequence` - Email analytics
- `paid-ads` - Attribution tracking
