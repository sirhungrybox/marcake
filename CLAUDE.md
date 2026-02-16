# MarCake - Claude Code Execution Context

## Overview

MarCake is a marketing skills library for AI agents. This file provides execution context for Claude Code.

## Directory Structure

- `skills/` - 25 marketing skill modules, each with a `SKILL.md`
- `tools/` - Tool integration guides and registry
- `.claude-plugin/` - Plugin configuration

## Skill Loading

When a user request matches a skill's description trigger, load and apply the corresponding `SKILL.md` framework.

## Key Files

- `AGENTS.md` - Agent specification and guidelines
- `tools/REGISTRY.md` - Tool capability index
- `skills/product-marketing-context/SKILL.md` - Load first for context establishment

## Execution Guidelines

1. **Context Check**: Before executing content skills, verify if `product-marketing-context` exists
2. **Framework Application**: Follow the Core Framework section in each skill
3. **Output Generation**: Use the Output Format specification
4. **Tool References**: Check `tools/integrations/` for implementation details

## Common Workflows

### New Project Setup
1. Run `product-marketing-context` to establish baseline
2. Store context for subsequent skill executions

### Content Creation
1. Check existing context
2. Apply relevant content skill (copywriting, email-sequence, etc.)
3. Reference brand voice from context

### Optimization Tasks
1. Gather current state/metrics if available
2. Apply CRO skill framework
3. Provide prioritized recommendations

### Analytics Implementation
1. Apply `analytics-tracking` skill
2. Reference specific tool guide from `tools/integrations/`
3. Provide implementation code

## Skill Triggers

Each skill's frontmatter `description` field indicates when to activate. Match user intent to skill descriptions for appropriate selection.
