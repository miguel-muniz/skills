# Skills

My collection of reusable agent skills, installable with the [skills CLI](https://skills.sh).

## Install

Install from this repository:

```sh
npx skills add miguel-muniz/skills
```

Install a specific skill:

```sh
npx skills add miguel-muniz/skills --skill SKILL_NAME
```

Add `--global` to install across projects. The CLI lets you choose the target agents.

## Available skills

<details>
<summary>mobbin-to-canvas — Organize Mobbin inspiration in a design canvas or HTML preview</summary>

[mobbin-to-canvas](skills/mobbin-to-canvas/SKILL.md) imports Mobbin screenshots from searches or selected collections into Figma, pen.dev, Paper, or another connected canvas. It follows the named tool or destination link and creates a local HTML preview when no destination is specified.

- Group related screens in named native sections where supported, using actual sections in Figma and minimal containers elsewhere; stack them vertically, left aligned, with 800px gaps.
- Arrange up to six screens per row with 80px gaps, using full-resolution downloaded images and preserving screenshot content and flow order.
- Name screen layers with canonical Mobbin screen URLs; use linked “View on Mobbin” annotations in Figma and supported annotations or screen hyperlinks elsewhere, reporting any limitations.
- Use selected collections without adding search results unless authorized; leave existing screens, duplicates, and manually added inspiration untouched unless explicitly asked to reorganize them.
- With no destination, create a simple local HTML page with bundled images and accessible source links, requiring no build or server.
- Verify sources, layout, links, and preservation of existing content; add no unrequested captions, backgrounds, decoration, or wrapper frames.

Install only this skill:

```sh
npx skills add miguel-muniz/skills --skill mobbin-to-canvas
```

</details>

<details>
<summary>prototype-scaffold — Set up a working prototype with interactive controls and portable HTML export</summary>

[prototype-scaffold](skills/prototype-scaffold/SKILL.md) creates an Astro-based prototyping environment with a working starter, project instructions for agents, and a self-contained HTML export for sharing.

- Use Astro, React, unstyled Base UI, Nano Stores, Motion, Tweakpane, Tabler React icons, vanilla CSS, clsx, and npm by default.
- Check current installation docs, package compatibility, and Node requirements; use non-interactive commands and protect existing files.
- Add draggable prototype controls with a saved position, hide-until-refresh, and reset position, backed by shared state.
- Keep realistic sample content in editable local files and document project conventions in `AGENTS.md`.
- Set up `npm run export` to bundle the prototype into a single HTML file, preserving earlier exports and hiding controls by default.
- Verify separate-island state sharing, type checks, builds, and interactions; offer alternatives on request, including Tailwind with a local `cn()` helper and a theme choice when relevant.

Install only this skill:

```sh
npx skills add miguel-muniz/skills --skill prototype-scaffold
```

</details>

## Repository layout

```text
skills/
  <skill-name>/
    SKILL.md       # Metadata and agent instructions
    references/    # Optional supporting documentation
    scripts/       # Optional executable helpers
    assets/        # Optional templates and other resources
AGENTS.md          # Repository contributor guidance
README.md
```

## Add a skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Include YAML frontmatter with a unique lowercase, hyphenated `name` matching the directory and a `description` explaining its purpose and when to use it.
3. Write focused instructions covering inputs, workflow, expected output, and verification. Keep supporting files inside the skill directory and link to them using relative paths.
4. Update the skill list above using the `<details>` / `<summary>` format in `AGENTS.md`. Maintain it when a skill is added, removed, renamed, or changes behavior.
5. Preview CLI discovery from the repository root:

   ```sh
   npx skills add . --list
   ```

Discovery requires at least one skill. For a local installation test, run `npx skills add /absolute/path/to/this/repo --skill SKILL_NAME` from a disposable project, then exercise the installed skill with an appropriate agent.

See the official [skill authoring guide](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md) for format and discovery details.

## Publishing

Push changes to [miguel-muniz/skills](https://github.com/miguel-muniz/skills). Verify installation from that remote after adding the first skill.
