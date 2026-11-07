# Instructions for future project agents

Create an `AGENTS.md` in the new prototype project explaining how to continue work consistently. This file belongs to the target prototype, not the skill repository.

For a target with existing guidance, read it first and preserve it. The scaffold's non-overwrite rule still applies: propose a specific additive section for approval rather than replacing or silently rewriting an existing instructions file. If an equivalent section is already present, report any proposed updates rather than duplicating it. Do not create agent-specific copies unless the user requests support for a particular agent.

Write concise instructions based on the actual setup, covering:

- **Purpose:** This project is a design prototype. Keep implementation understandable and proportionate to the behavior being explored.
- **Installed tools and entry points:** Name the selected framework, component library, icons, styling, and actual source locations. Reuse the selected tools for standard UI before adding overlapping dependencies.
- **State:** Components in separate Astro islands do not share React context. Use the shared store for cross-island state; keep purely local state in its owning component. Identify the concrete store and controls parameter files.
- **Styles and classes:** Identify the global CSS import and component styling approach. Use `clsx` for React's conditional classes, or the local `cn()` helper when Tailwind was selected. Use Astro's native `class:list` where appropriate.
- **Prototype controls:** Explain how to add a shared parameter and its Tweakpane binding, drag or reset the panel, and hide it for the current load. State where controls are enabled and how exported controls are opted into.
- **Sample content:** Keep realistic hand-authored fixtures in `src/data/`, or the actual chosen directory. Reuse them across development and export; avoid adding fake-data packages.
- **Portable export:** Identify the export entry, Vite export configuration, script, and output directory. Reuse product components and styles in both entries. When adding screens, assets, or global styles, update the export composition and route mapping too. Keep internal export navigation compatible with `file://` and bundle all required resources.
- **Checks:** Record the real dev, type-check, build, and export commands, plus the separate-island and local-file checks required after relevant changes.

Keep instructions specific to what was installed. Include no unused library options, unresolved template markers, or fabricated commands. Put human-oriented setup and sharing directions in the README as well.
