# Contributing to MarCake

Thank you for your interest in contributing to MarCake! This guide will help you add new skills or improve existing ones.

## Types of Contributions

### Adding New Skills

1. Identify a marketing capability gap
2. Create a new directory under `skills/`
3. Add a `SKILL.md` following the template below
4. Update `README.md` skills table
5. Add skill to `.claude-plugin/marketplace.json`
6. Submit a pull request

### Improving Existing Skills

1. Open the skill's `SKILL.md`
2. Enhance frameworks, add examples, or fix issues
3. Increment the version in frontmatter
4. Update `VERSIONS.md` with changes
5. Submit a pull request

### Adding Tool Integrations

1. Create a new file in `tools/integrations/`
2. Follow the integration guide template
3. Add to `tools/REGISTRY.md`
4. Submit a pull request

## Skill Template

```markdown
---
name: skill-name
version: 1.0.0
description: When to activate this skill (trigger conditions)
---

# Skill Title

You are an expert in [domain]. Your role is to [primary function].

## Initial Assessment

Before proceeding, check for:
- [ ] Existing product/marketing context
- [ ] Relevant existing assets
- [ ] Specific requirements or constraints

## Core Framework

### Dimension 1: [Category]
**Impact: High/Medium/Low**

- Assessment criteria
- Key questions
- Optimization opportunities

### Dimension 2: [Category]
**Impact: High/Medium/Low**

[Continue for 5-7 dimensions]

## Output Format

Provide deliverables in this structure:

### [Deliverable Type]
- Component 1
- Component 2
- Component 3

## Questions

Before executing, clarify:

1. [Contextual question]
2. [Scope question]
3. [Priority question]

## Related Skills

- `skill-name` - When to use
- `skill-name` - When to use
```

## Tool Integration Template

```markdown
# [Tool Name]

## Overview
Brief description of the tool and its marketing use cases.

## Authentication

### API Key Setup
Steps to obtain and configure API credentials.

### Environment Variables
```bash
TOOL_API_KEY=your_key_here
```

## Common Operations

### Operation 1
```javascript
// Code example
```

### Operation 2
```javascript
// Code example
```

## Best Practices

- Practice 1
- Practice 2

## Related Skills
- Skills that commonly use this tool
```

## Code Standards

### Frontmatter
- Use valid YAML
- Include all required fields (name, version, description)
- Keep description under 100 characters

### Content
- Use clear, direct language
- Include concrete examples
- Provide specific, actionable guidance
- Reference related skills and tools

### Versioning
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes to skill structure
- MINOR: New framework dimensions or outputs
- PATCH: Fixes and clarifications

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-skill`)
3. Make your changes
4. Test skill activation and outputs
5. Update documentation
6. Submit pull request with clear description

## Review Criteria

Pull requests are evaluated on:

- **Completeness**: All required sections present
- **Clarity**: Easy to understand and apply
- **Actionability**: Provides specific guidance
- **Consistency**: Follows existing patterns
- **Quality**: Well-written, error-free

## Questions?

Open an issue for:
- Skill suggestions
- Framework improvements
- Bug reports
- General questions

Thank you for making MarCake better!
