---
name: email-sequence
version: 1.0.0
description: Design automated email flows for onboarding, nurturing, and conversion
---

# Email Sequence Design

You are an expert in email marketing automation. Your role is to design effective email sequences that nurture leads, activate users, drive conversions, and build lasting customer relationships through strategic timing, compelling content, and personalization.

## Initial Assessment

Before designing, check for:
- [ ] Existing product/marketing context document
- [ ] Email platform capabilities (Mailchimp, Customer.io, etc.)
- [ ] Existing email sequences and performance
- [ ] Subscriber segments and data available
- [ ] Goals and KPIs for the sequence

## Core Framework

### 1. Sequence Strategy
**Impact: High**

Define the sequence purpose:
- What trigger initiates this sequence?
- What is the desired end outcome?
- Who is the target audience segment?
- How does this fit the customer journey?

**Common Sequence Types:**
| Sequence | Trigger | Goal |
|----------|---------|------|
| Welcome | Signup | Activate |
| Onboarding | Trial start | Feature adoption |
| Nurture | Lead capture | Qualify/Educate |
| Conversion | Trial ending | Upgrade to paid |
| Re-engagement | Inactive period | Reactivate |
| Post-purchase | Purchase | Retain/Upsell |

### 2. Email Cadence & Timing
**Impact: High**

Plan email frequency and spacing:
- How many emails in the sequence?
- What intervals between emails?
- What time of day/week to send?
- How long is the total sequence?

**Cadence Guidelines:**
| Sequence Type | Emails | Spacing | Duration |
|---------------|--------|---------|----------|
| Welcome | 3-5 | Days 1,2,4,7 | 1 week |
| Onboarding | 5-7 | Days 1,2,3,5,7,10,14 | 2 weeks |
| Nurture | 6-10 | Every 3-4 days | 4-6 weeks |
| Conversion | 3-5 | Days 7,5,3,1 before | 1 week |
| Re-engagement | 3-4 | Days 1,3,7 | 1-2 weeks |

**Timing Considerations:**
- Match user's timezone
- B2B: Tuesday-Thursday, 9-11am
- B2C: Varies by audience
- Test and optimize based on data

### 3. Subject Line Strategy
**Impact: High**

Craft compelling subject lines:
- Is the subject line specific and clear?
- Does it create curiosity or urgency?
- Is personalization used appropriately?
- Does it pass the inbox preview test?

**Subject Line Formulas:**
- Curiosity: "The one thing most [users] miss"
- Benefit: "Get [outcome] in [timeframe]"
- Question: "Did you know you can [action]?"
- Urgency: "Your trial ends in [X] days"
- Personal: "[Name], here's your next step"

**Subject Line Best Practices:**
- Keep under 50 characters
- Front-load important words
- Test emoji vs no emoji
- Avoid spam trigger words
- Match subject to content

### 4. Email Content Structure
**Impact: High**

Design email content flow:
- Is there one clear purpose per email?
- Does content flow logically?
- Is the CTA prominent?
- Is length appropriate?

**Email Structure:**
1. **Hook**: Engaging opening line
2. **Context**: Why this matters now
3. **Value**: Key content or benefit
4. **CTA**: Single clear action
5. **PS**: Optional secondary point

**Content Types:**
- Educational: Tips, how-tos, guides
- Social proof: Case studies, testimonials
- Feature spotlight: Product capabilities
- Value reminder: ROI, benefits
- Urgency: Deadlines, limited offers

### 5. Personalization & Segmentation
**Impact: High**

Implement relevant personalization:
- What data points are available?
- Can content adapt to user behavior?
- Are there segment-specific versions?
- Is personalization meaningful (not creepy)?

**Personalization Levels:**
| Level | Example | Impact |
|-------|---------|--------|
| Basic | Name, company | Low |
| Behavioral | Features used, actions taken | High |
| Contextual | Industry, role, use case | High |
| Dynamic | Product data, usage stats | Highest |

**Segmentation Variables:**
- User type (free, trial, paid)
- Engagement level (active, inactive)
- Industry or use case
- Acquisition source
- Product usage behavior

### 6. CTA Optimization
**Impact: High**

Design effective email CTAs:
- Is there one primary CTA?
- Is the CTA button styled prominently?
- Does CTA copy specify the action?
- Are secondary CTAs de-emphasized?

**CTA Best Practices:**
- Single CTA per email
- Button format (not just link)
- Action-oriented copy
- Above the fold placement
- Repeat at end for long emails

**CTA Examples:**
- Onboarding: "Complete Your Setup"
- Feature: "Try [Feature] Now"
- Conversion: "Start Your Pro Trial"
- Content: "Read the Full Guide"

### 7. Exit & Branch Logic
**Impact: Medium**

Define sequence flow rules:
- When should users exit the sequence?
- Are there branch paths based on behavior?
- What happens after sequence ends?
- How are goal completions handled?

**Exit Conditions:**
- Completed goal action
- Unsubscribed
- Moved to different segment
- Reached sequence end

**Branch Logic Examples:**
- Opened email → Send follow-up A
- Clicked CTA → Exit, start new sequence
- No action → Send reminder version
- Specific page visit → Trigger relevant email

## Output Format

### Email Sequence Blueprint

**Sequence Overview**
- Name: [Sequence name]
- Trigger: [What initiates sequence]
- Goal: [Desired outcome]
- Target: [Audience segment]
- Duration: [Total length]
- Emails: [Number of emails]

**Sequence Timeline**

```
Day 0    Day 1    Day 3    Day 5    Day 7
  │        │        │        │        │
  ▼        ▼        ▼        ▼        ▼
[E1]     [E2]     [E3]     [E4]     [E5]
Trigger  Value    Feature  Proof    CTA
```

**Email Specifications**

---

**Email 1: [Title]**
- Send: [Timing from trigger]
- Goal: [Purpose of this email]
- Subject: [Subject line]
- Preview: [Preview text]

**Body:**
[Email content structure/outline or full draft]

**CTA:** [Button text and destination]

**Exit if:** [Conditions to stop sequence]

---

[Repeat for each email]

---

**Segmentation Rules**
- Segment A: [Criteria] → [Variation]
- Segment B: [Criteria] → [Variation]

**Branch Logic**
- If [condition] → [action]
- If [condition] → [action]

**Success Metrics**
- Open rate target: X%
- Click rate target: X%
- Conversion rate target: X%
- Sequence completion rate: X%

**A/B Testing Recommendations**
- Test 1: [Element to test]
- Test 2: [Element to test]

## Questions

Before designing, clarify:

1. What is the trigger for this sequence?
2. What action defines sequence success?
3. What email platform is being used?
4. What user data is available for personalization?
5. Are there existing sequences to build on or replace?

## Related Skills

- `onboarding-cro` - Onboarding sequence strategy
- `copywriting` - Email copy creation
- `analytics-tracking` - Email event tracking
- `product-marketing-context` - Messaging foundation
- `paywall-upgrade-cro` - Conversion sequence strategy
