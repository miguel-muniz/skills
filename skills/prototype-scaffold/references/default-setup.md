# Default setup recipe

Documentation and package names checked on 2026-11-06. Recheck these sources and current package metadata at execution time before installing.

## Sources and packages

| Tool | Official source | Packages or integration |
|---|---|---|
| Astro | [Install](https://docs.astro.build/en/install-and-setup/), [CLI flags](https://github.com/withastro/astro/tree/main/packages/create-astro) | `create-astro`, `astro` |
| Astro React | [Integration](https://docs.astro.build/en/guides/integrations-guide/react/), [hydration](https://docs.astro.build/en/guides/framework-components/) | `@astrojs/react`, React and associated peers |
| Base UI | [Quick start](https://base-ui.com/react/overview/quick-start) | `@base-ui/react` |
| Nano Stores | [Upstream documentation](https://github.com/nanostores/nanostores), [Astro island recipe](https://docs.astro.build/en/recipes/sharing-state-islands/) | `nanostores`, `@nanostores/react` |
| Motion | [React installation](https://motion.dev/docs/react-installation) | `motion`; import from `motion/react` |
| Tweakpane | [Getting started](https://tweakpane.github.io/docs/getting-started/) | `tweakpane`; TypeScript development support through `@tweakpane/core` as documented |
| Tabler | [React icons](https://docs.tabler.io/icons/libraries/react) | `@tabler/icons-react` |
| clsx | [Upstream documentation](https://github.com/lukeed/clsx) | `clsx` |
| Development checks | [Astro TypeScript](https://docs.astro.build/en/guides/typescript/) | `@astrojs/check`, `typescript` |

At the check date, Astro's installation docs specify Node 22.23.4 or newer on a supported release line and exclude odd-numbered versions. npm metadata for the current React Nano Stores adapter restricts Node to `^22.0.0 || ^24.0.0 || >=26.0.0`. Check the current intersection rather than adopting either statement alone; a supported even-numbered LTS release satisfying all selected tools is preferable.

Use `npm view <package>@latest version engines peerDependencies peerDependenciesMeta deprecated --json` for each selected package, including `create-astro` and `astro`. Optional peers are not automatically required installations. Reconcile documentation and registry differences before proceeding. Avoid deprecated package aliases such as older Base UI package names; confirm the current official one.

## Non-interactive creation

After destination and runtime checks, use this verified command shape. Replace `./prototype` with the safely quoted approved path, or `.` only for a confirmed empty current directory. The CLI creates the target folder when it does not exist.

```sh
npm create --yes astro@latest ./prototype -- --template minimal --add react --install --no-git --no-ai --yes --skip-houston
```

The first `--yes` approves npm's package execution; the second answers Astro's setup choices. The remaining flags select the template, integration, dependency install, and skip Git and generated AI instruction files. Verify flags using the current CLI help before running if they differ from the linked documentation. Change the working directory to the approved target after creation.

```sh
npm install motion tweakpane nanostores @nanostores/react @base-ui/react @tabler/icons-react clsx
npm install --save-dev @astrojs/check typescript @tweakpane/core
```

Use current compatible stable releases and retain `package-lock.json`. Let the official React integration configure its peers; inspect the result before adding missing packages. Record actual resolved versions rather than hard-coding this reference's check-date versions into new projects.

## Minimal starter wiring

Use the generated project structure, adding only what the starter needs:

```text
src/pages/index.astro          # Entry page with separate React islands
src/components/Prototype.tsx  # Small interactive starter
src/components/PrototypeAction.tsx  # Separate island that changes shared state
src/stores/prototype.ts       # Shared Nano Store and actions
src/components/PrototypeControls.tsx  # Tweakpane lifecycle
src/styles/global.css         # Minimal vanilla CSS
src/data/                    # Editable, deterministic sample content
```

- Mount the React entry with `client:load` so interactions work. Put shared state in an imported store module and subscribe with `useStore` from `@nanostores/react`; use `atom` or `map` from `nanostores`. Astro frontmatter runs on the server and is not a reactive client subscriber. Keep prototype state client-oriented; do not mutate shared server stores with per-user request data.
- Use a small Base UI control, such as a popover, with the documented imports and parts. Follow its current portal setup: an isolated application root and documented body positioning where required. Make the starter readable with minimal CSS rather than importing a theme.
- Import animation components from `motion/react` and honor reduced-motion preferences. Import a named icon from `@tabler/icons-react` and use `clsx` for conditional React classes.
- Create Tweakpane in a React effect, following [the controls reference](prototype-controls.md) for the panel shell, position persistence, hiding, reset, and lifecycle. Connect a binding to the shared store so changing a knob visibly affects the prototype. Keep the binding object stable and update it when external store changes need to appear in the pane.
- Show prototype controls only in development by default, with a clear way to hide them. A documented explicit flag can enable them in a shared prototype when requested. Keep controls out of the simulated product UI and avoid introducing product requirements.

## Checks

Add a `check` script equivalent to `astro check` if absent, then run:

```sh
npm run check
npm run build
npm run export
npm run dev -- --host 127.0.0.1
```

Choose an unused port if needed. A passing build does not verify browser hydration or input behavior; follow the entrypoint's runtime checks. If checks require additional packages, install their documented development dependencies without interactive prompts.
