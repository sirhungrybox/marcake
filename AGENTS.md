# MarCake Agent Specification

This document defines how AI agents should interact with MarCake skills.

## Repository Overview

MarCake provides structured marketing expertise through skill modules. Each skill:

- Defines a specific marketing capability
- Provides assessment frameworks
- Specifies expected outputs
- References related skills and tools

## Agent Skills Specification

### Skill Structure

Each skill file (`skills/*/SKILL.md`) contains:

```yaml
---
name: skill-identifier
version: 1.0.0
description: Trigger conditions for this skill
---
```

**Frontmatter Fields:**
- `name` - Unique skill identifier (kebab-case)
- `version` - Semantic version for tracking updates
- `description` - When the agent should activate this skill

### Skill Sections

1. **Role Definition** - Expert persona the agent adopts
2. **Initial Assessment** - Context checks before execution
3. **Core Framework** - Analysis dimensions with impact levels
4. **Output Format** - Expected deliverables structure
5. **Questions** - Clarifying questions for the task
6. **Related Skills** - Cross-references for skill chaining

## Writing Style Guidelines

### Voice
- Direct and actionable
- Expert but accessible
- Focused on outcomes, not theory

### Structure
- Use headers for scanability
- Include concrete examples
- Provide specific metrics where applicable

### Outputs
- Prioritize actionable recommendations
- Include implementation details
- Reference specific tools when relevant

## Skill Categories

### Conversion Optimization
Skills focused on improving conversion rates at various funnel stages:
- `page-cro` - Landing pages
- `signup-flow-cro` - Registration
- `onboarding-cro` - Activation
- `form-cro` - Lead capture
- `popup-cro` - Overlays
- `paywall-upgrade-cro` - Upgrades

### Content & Copy
Skills for creating and refining marketing content:
- `copywriting` - New copy creation
- `copy-editing` - Copy improvement
- `email-sequence` - Email automation
- `social-content` - Social media

### SEO & Discovery
Skills for organic search and discoverability:
- `seo-audit` - Technical SEO
- `programmatic-seo` - Scaled content
- `competitor-alternatives` - Comparison pages
- `schema-markup` - Structured data

### Measurement & Testing
Skills for analytics and experimentation:
- `analytics-tracking` - Event tracking
- `ab-test-setup` - Experiments

### Growth Engineering
Skills for building growth systems:
- `free-tool-strategy` - Marketing tools
- `referral-program` - Referral systems

### Strategy & Planning
Skills for marketing strategy:
- `marketing-ideas` - Ideation
- `marketing-psychology` - Behavioral science
- `launch-strategy` - Launches
- `pricing-strategy` - Pricing
- `content-strategy` - Content planning

### Foundational
Skills that support other skills:
- `product-marketing-context` - Context documents
- `paid-ads` - Advertising

## Tool Integration Guidance

When a skill references a tool:

1. Check `tools/REGISTRY.md` for capabilities
2. Review tool-specific guide in `tools/integrations/`
3. Verify authentication requirements
4. Use appropriate API methods

### Tool Categories
- **API** - Direct REST/GraphQL endpoints
- **MCP** - Model Context Protocol servers
- **CLI** - Command-line interfaces
- **SDK** - Language-specific libraries

## Update Checking Protocol

Agents should periodically verify skill versions:

1. Check local skill version in frontmatter
2. Compare against registry latest version
3. Notify user of available updates
4. Apply updates with user consent

## Execution Flow

```
User Request
     ↓
Skill Matching
     ↓
Context Assessment (check for existing context)
     ↓
Clarifying Questions (if needed)
     ↓
Framework Application
     ↓
Output Generation
     ↓
Related Skills Suggestion
```

## Best Practices

### Context First
Always check for existing product/marketing context before generating outputs. Use `product-marketing-context` skill to establish baseline.

### Skill Chaining
Complex marketing tasks often require multiple skills. Suggest logical next steps.

### Tool Awareness
Reference specific tool integrations when providing implementation guidance.

### Measurable Outcomes
Include success metrics and tracking recommendations where applicable.
