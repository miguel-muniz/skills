---
name: interface-standards
description: Create and refine product interfaces in code or canvas tools using practical visual design and UX pattern guidance. Use when building or reviewing screens and components, including icon buttons, tooltips, and grouped controls; load the relevant pattern guidance even when it is part of a larger interface task.
metadata:
  internal: true
---

# Interface Standards

A growing reference library for interface design across code, Figma, Paper, pen.dev, and other canvas tools. Currently, the library covers tooltips.

## Apply defaults in context

- Inspect the task's explicit instructions, the existing interface, available components, and project design guidance first. Keep project-specific context in the project, not in this skill.
- Treat this library's design choices as defaults where the user, design system, component library, or established project conventions do not provide guidance. Fill gaps rather than replacing the project's visual language or preferred implementation.
- Check accessibility independently of visual preferences. Identify conflicts that would make a control inaccessible rather than silently treating an accessible name or keyboard support as optional styling.
- Use the destination's available tools and required editing guidance. Do not assume a framework, component library, or canvas feature is available.

## Load only relevant guidance

| Task includes | Read before creating or changing it |
|---|---|
| Tooltips, icon-only buttons, contextual hover help, or groups of controls that need labels | [Tooltip guidelines](patterns/overlays/tooltip.md) |

Read the tooltip guide when these elements occur inside a larger screen or flow, even if the user did not explicitly request tooltips. The guide includes behavior, placement, visual defaults, and verification; use its code or canvas implementation section according to the destination.

## Work and verify

1. Identify applicable patterns and load their guidance before implementation.
2. Apply existing project guidance first, then fill unspecified decisions with the pattern defaults.
3. Inspect the result in context, including group orientation, available space, relevant interaction states, and viewport or frame edges. Use the pattern's verification checklist.
4. For code, exercise behavior in the running interface. For a canvas, verify geometry and represented states, and communicate behavior that cannot be implemented or tested there. Do not claim a static design proves runtime accessibility or collision handling.
5. Report what changed and any material verification gaps. Keep the work within the user's requested scope.
