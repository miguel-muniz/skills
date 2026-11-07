---
name: prototype-scaffold
description: Scaffold a new coded prototype with Astro, React, Base UI, Nano Stores, Motion, Tweakpane, and Tabler React icons. Use when setting up a fresh prototyping environment; use the default stack unless the user requests substitutions or additions.
---

# Prototype Scaffold

Set up a working prototyping environment using the default stack below. Announce the stack and say that alternatives are available on request. Proceed without a framework, styling, or component-library questionnaire. Honor choices already made in the conversation.

| Purpose | Default |
|---|---|
| Project shell | Astro minimal template, TypeScript |
| Interactive UI | React through Astro's official integration |
| Components | Base UI, unstyled |
| Shared state | Nano Stores with the React adapter |
| Motion | Motion for React |
| Prototype controls | Tweakpane |
| Icons | Tabler React |
| Styling | Vanilla CSS |
| Conditional classes | clsx |
| Package manager | npm |

Read [default setup](references/default-setup.md) before scaffolding. Read [alternatives](references/alternatives.md) only if the user asks to replace or add a tool. Do not install alternatives speculatively.

Also read [prototype controls](references/prototype-controls.md) when Tweakpane is included, [HTML export](references/html-export.md) to set up portable sharing, and [project instructions](references/project-instructions.md) before writing guidance for future agents. These resources are bundled with this skill; no companion skill is required.

## Before writing files

1. **Refresh the setup instructions.** Open the official documentation linked in the default setup reference for every selected tool. Confirm package names, maintained releases, install commands, CLI flags, and compatibility. Cross-check npm package metadata for `engines`, peer dependencies, and deprecation notices. The recorded recipe is a starting point, not permission to use stale commands. If current docs cannot be reached, report the verification gap and ask before installing an unverified stack.
2. **Check the runtime.** Run `node --version` and `npm --version`. Compare the installed versions with the supported ranges of Astro, its CLI and integration, and the selected packages. Satisfy their intersection, including unsupported Node release lines; checking only the largest minimum is insufficient. If Node is missing or incompatible, explain the required supported version and pause dependent setup. Do not silently change the user's global runtime or bypass engine/peer checks.
3. **Resolve the destination.** Use the folder explicitly requested or clearly established in context. Otherwise default to the current working directory and state the resolved absolute path. Ask when the user intends a separate prototype folder but its location or name is unclear.
4. **Inspect the target, including hidden files.** A non-empty folder requires user confirmation before setup continues. Offer a new empty child folder as the simplest safe option. Confirmation does not authorize deletion or overwriting. Never run the scaffold CLI directly against a non-empty target: if the user confirms additive setup there, generate in a separate empty staging directory, compare every destination path, and copy only new, non-conflicting files. If any file conflicts or a destination is a symlink into existing content, stop and resolve the destination with the user. Do not merge, replace, or delete their files to make the scaffold fit.

Recheck the destination immediately before creation. Use npm unless the user requests another manager. Pass explicit flags for all CLI choices and package-runner confirmation; do not automate interactive prompts with keystrokes or use overwrite/force flags. If a command unexpectedly prompts, stop and inspect its documented flags.

## Create and connect the environment

1. Use Astro's CLI to create the chosen folder with the minimal template and React integration, following the verified recipe. Keep generated files inside the approved target or isolated staging folder. Do not initialize Git, create a remote, or publish unless requested.
2. Install the default dependencies and development checks. Resolve compatibility problems from current docs; do not use `--force` or `--legacy-peer-deps` to hide them.
3. Create a minimal working entry page with separately hydrated React components that share a store, plus the browser-only prototype controls described in the controls reference. Use a simple demonstration of the installed tools to prove the environment is connected; do not build an unsolicited product or elaborate dashboard.
4. Apply the setup reference's browser/SSR rules. Use vanilla CSS and keep Base UI unstyled apart from the minimal styles needed for a usable starter. If Tailwind is requested, follow the alternatives reference to add `tailwind-merge` and a local `cn()` helper. Do not add a styled component library, CSS framework, or separate Floating UI dependency by default.
5. Keep realistic sample content in editable local modules under `src/data/`. Tailor names, dates, quantities, and copy to the known prototype domain; use a small neutral sample if the domain is unspecified. Do not introduce fake-data dependencies or scatter duplicate fixtures through components. Keep examples deterministic so the dev and exported versions start from the same data, and use no real private records.
6. Set up `npm run export` using the HTML export reference. Reuse the prototype components and stores rather than recreating a second version of the product UI. Exported HTML must work without a server or adjacent asset files; preserve the normal Astro build.
7. Write project agent guidance using the project-instructions reference. Record the stack and actual file paths, state and styling conventions, controls behavior, placeholder-data location, and export maintenance requirements.
8. Write a short project README with the actual stack, supported runtime, install/dev/check/build/export commands, entry files, and how to use or hide prototype controls. Preserve any existing README; for confirmed additive setup, place new setup notes in a non-conflicting file instead.

## Verify and hand off

- Confirm the expected dependencies, React integration, hydration directives, and npm lockfile exist. Run the type check, production build, and HTML export in the new project. Address failures caused by the setup.
- Start the dev server on an available local port. Use an available browser to verify that the page renders without hydration errors, a Base UI control works, a Tabler icon renders, store changes update the UI, Motion runs, and a Tweakpane binding changes a visible prototype property. Dispose controls on cleanup and check that remounting does not duplicate panes. If browser access is unavailable, state that runtime interactions were not verified.
- Prove shared state across islands: hydrate two sibling components separately, change a store value from one, and observe the other update without navigation or refresh. A parent and child inside one React root are not this check. Confirm prototype controls use that same store. Adapt the separate-root check to the chosen framework if React was replaced.
- Exercise dragging, reloading to restore position, hide-until-refresh, reset position, and viewport resizing. Confirm hidden state does not survive a reload and saved offscreen positions recover safely.
- Open the exported file directly with `file://`, without the dev server, and exercise the main interaction and any included navigation. Confirm scripts, styles, images, and fonts are embedded and require no network access. Controls should be hidden in the default export. Report export limitations for any feature that requires a backend or server-only Astro behavior; do not call an asset-dependent page self-contained.
- For additive setup, confirm pre-existing files are unchanged. Do not retry a failed scaffold in a partially populated folder; inspect the failure and continue safely or use another approved empty target.
- Return the absolute prototype path, installed stack, commands to run and export it, generated HTML path, checks performed, and any remaining issues. Mention once that the user can ask for alternatives or extras; do not present the full options catalog unprompted. Report whether a dev server remains running and its URL if applicable.
