# Alternatives, only when requested

Keep the default stack unless the user asks to change it. Offer a short relevant selection, explain the tradeoff, and confirm any unresolved choice before installing replacements. Verify current official support, package names, install commands, licensing, and non-interactive flags for the chosen option. These are candidates, not a prevalidated compatibility matrix.

| Choice | Candidates to investigate |
|---|---|
| Astro UI framework | React, Preact, Vue, Svelte, Solid, Alpine, or Astro without an added UI framework; check [Astro's current integrations](https://docs.astro.build/en/guides/framework-components/). |
| Styling | Vanilla CSS or Tailwind CSS; use the [current Astro styling instructions](https://docs.astro.build/en/guides/styling/) rather than assuming a legacy Tailwind integration. |
| Icons | Tabler's package for the chosen framework, Material Symbols, or the user's preferred library. |
| Components | Base UI, React Aria, Zag, Kendo UI, Prime, Mantine, Web Awesome, Untitled UI, shadcn/ui, or none. |
| Motion | Motion's API for the selected framework, browser animation APIs, or the user's preferred solution. |
| Prototype controls | Tweakpane or no controls. |
| Floating elements | Floating UI when the chosen component solution does not already cover positioning. |
| Conditional classes | With Tailwind, use clsx plus tailwind-merge through a local `cn()` helper. Otherwise use clsx only when the selected framework lacks equivalent class composition. |

Show only component libraries with documented support for the selected framework and runtime. React-only packages such as Base UI and Mantine are not general Astro integrations. Distinguish unstyled primitives (the default preference) from styled systems and commercial offerings. Verify which framework-specific product is meant by names such as Kendo or Prime; do not assume a single package works everywhere. Web components may need framework and SSR integration checks.

After a component library is chosen, check its current documentation for included or supported themes. Honor a theme already specified by the user or established project guidance. If multiple themes are available and none has been selected, present the relevant theme options and ask which to use before installing or configuring theme assets. Do not silently choose the library's default theme. If there is a single required theme, use it and state the choice; for an unstyled library, continue without adding a theme unless requested. Follow the selected theme's documented package, stylesheet, and provider setup.

When changing framework or selecting none, revisit the entire dependency plan: remove React-only Base UI, the React Nano Stores adapter, Tabler React, and Motion React usage as applicable; choose documented equivalents rather than retaining an unused React stack. Keep Nano Stores itself when compatible and add only the needed framework adapter. Without Tailwind, skip clsx if native class handling supplies equivalent behavior; with Tailwind, retain the `cn()` setup below. If there is no compatible unstyled component option, explain the limitation and offer none rather than installing a styled library silently.

Install only the agreed alternative. Use documented flags or direct configuration for its setup; do not open interactive installers or add paid credentials without the user's input.

## Tailwind class composition

When Tailwind is selected, verify [tailwind-merge's compatibility guidance](https://github.com/dcastil/tailwind-merge) against the installed Tailwind version, then install compatible versions of both dependencies:

```sh
npm install clsx tailwind-merge
```

Create a local helper in `src/lib/utils.ts`, following the familiar shadcn-style composition pattern:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` where conditional Tailwind classes and caller overrides are combined. Pass caller classes last so conflicting utilities resolve in their favor. Import using an existing alias or a relative path; do not assume an `@/` alias exists. In a confirmed additive setup, reuse an existing equivalent helper or choose a non-conflicting new path instead of overwriting the user's utility file. Do not install shadcn or a separate `cn` package merely to obtain this function. Tailwind merging is separate from native framework class composition, so this helper also applies when that framework has its own class-binding syntax.

Verify that conditional inputs work and conflicting utilities resolve as expected, such as `cn('px-2', false && 'hidden', 'px-4')` producing `px-4`. Keep `tailwind-merge` out of the vanilla CSS default.
