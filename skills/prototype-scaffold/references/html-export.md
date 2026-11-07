# Portable HTML export

Set up a separate production bundle that reuses the prototype's UI and shared state and writes one self-contained HTML file. A normal Astro build remains available for hosting. Do not describe its HTML plus asset folder as a single-file export.

## Verify dependencies

Check current [Vite build guidance](https://vite.dev/guide/build.html) and [vite-plugin-singlefile documentation](https://github.com/richardtallent/vite-plugin-singlefile) and their engine and peer ranges before installing. Add compatible versions as direct development dependencies:

```sh
npm install --save-dev vite vite-plugin-singlefile
```

Check any framework/compiler or styling plugins needed by the selected framework and include those in the export build too. For example, Tailwind's Vite plugin must also run here if Tailwind is selected. The Astro dev build does not automatically configure this separate bundle.

## Entry and configuration

Create `prototype-export.html` at the project root, with a document title, viewport metadata, one root element, and a module entry at `/src/export/main.tsx`. Adapt the extension and mount API when the framework differs.

In `src/export/main.tsx`, mount the same components used by the Astro page, including the same props. Import everything required by the layout: global styles, fonts, theme setup, local data, and providers. Use the same stores and initial values. Keep controls off by default with an explicit entry setting. Do not copy the UI into a parallel implementation or import `.astro` components directly into a plain Vite React bundle.

For React, use `createRoot` from `react-dom/client`. The minimal starter can be one screen. When the prototype has multiple screens, compose them through an explicit hash-based route map in this entry, sharing the same screen components as the Astro routes. Preserve the hash when changing URLs. Server endpoints, cookies, and server-only Astro logic require a local mock or a stated export limitation; never silently drop required behavior.

Create `vite.export.config.ts` using this baseline, adding any required framework or styling plugins:

```ts
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  publicDir: false,
  plugins: [viteSingleFile()],
  build: {
    sourcemap: false,
    rollupOptions: { input: 'prototype-export.html' },
  },
});
```

Copy the bundled [export command](../assets/export-prototype.mjs) to `scripts/export-prototype.mjs` in the new prototype and add `"export": "node scripts/export-prototype.mjs"` to its package scripts. This helper uses a fresh temporary build directory and creates a uniquely named HTML file in `exports/` without overwriting earlier exports. It does not clean the normal Astro `dist/` or a user's existing output files. In additive setup, resolve path conflicts before copying.

The helper explicitly selects production mode and the production Node environment so a development shell cannot accidentally produce JSX development helpers in the portable bundle. Preserve project-specific aliases, compilation settings, and styling plugins in the export configuration.

If the user asks for saved export presets or multiple review variants, define explicit defaults for title, start route, control visibility, and prototype state overrides. Validate override keys, types, and allowed values against the actual store before building. Apply those values before the UI mounts, keep panel position and hidden state out of them, and give each variant a distinct output file. One-off choices should not silently change future export defaults. The bundled helper implements the base single-file export only; extend and test it before documenting any preset or command-line options.

## Resources and portability

Inline JavaScript, CSS, images, and fonts. Use bundled imports that become embedded data or inline content; do not rely on `/public` paths, CDN scripts, hosted fonts, sibling files, or runtime data fetches. The plugin handles script and stylesheet bundling but does not guarantee every asset is embedded. Inspect its current limitations and use inline SVG or explicit data URLs when necessary. Treat remote links users deliberately follow as destinations, not dependencies needed to render the prototype.

The helper rejects builds that emit files besides a single HTML document. This is a useful check but cannot detect every runtime network request or a missing resource. Open the copied HTML directly from an unrelated folder with the dev server stopped. Verify initial content, interactions, internal navigation if any, styles, and assets without network access. Confirm no external resource requests are required. Report unavailable checks honestly.

Keep exports reproducible from source; do not hand-edit generated HTML. Ignore `exports/` in the prototype's Git configuration unless the user wants generated artifacts tracked. Document how to create and share an export in its README and project agent instructions.
