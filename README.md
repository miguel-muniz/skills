# Skills

My collection of reusable agent skills, installable with the [skills CLI](https://skills.sh).

## Install

Once the first skill is available, install from this repository:

```sh
npx skills add miguel-muniz/skills
```

Install a specific skill:

```sh
npx skills add miguel-muniz/skills --skill SKILL_NAME
```

Add `--global` to install across projects. The CLI lets you choose the target agents.

## Available skills

No skills have been added yet. Add each skill here with its purpose and a link to its `SKILL.md`.

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
4. Update the skill list above.
5. Preview CLI discovery from the repository root:

   ```sh
   npx skills add . --list
   ```

Discovery requires at least one skill. For a local installation test, run `npx skills add /absolute/path/to/this/repo --skill SKILL_NAME` from a disposable project, then exercise the installed skill with an appropriate agent.

See the official [skill authoring guide](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md) for format and discovery details.

## Publishing

Push changes to [miguel-muniz/skills](https://github.com/miguel-muniz/skills). Verify installation from that remote after adding the first skill.
