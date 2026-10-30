# Repository guidance

## Purpose

This repository houses reusable agent skills distributed through the skills CLI at https://skills.sh. Keep it focused on skill source files and their supporting resources.

## Structure

- Put each installable skill in `skills/<skill-name>/SKILL.md`.
- Use a unique lowercase, hyphenated directory name and matching frontmatter `name`.
- Include a frontmatter `description` that explains what the skill does and when an agent should activate it.
- Keep optional `references/`, `scripts/`, and `assets/` within the owning skill directory.
- Maintain the available-skills list in `README.md` when adding, renaming, or removing a skill.

## Authoring

- Write direct, actionable instructions with clear inputs, steps, outputs, and completion checks.
- Keep each skill scoped to a coherent task. Move lengthy supporting material into linked reference files.
- Use paths relative to the skill directory for bundled resources. Avoid author-specific absolute paths.
- State required tools and dependencies; do not assume another skill is installed.
- Keep secrets, credentials, private data, and generated output out of committed resources.
- Do not add placeholder installable skills, a root `SKILL.md`, or application scaffolding merely to fill out the repository.
- Add dependencies and automation only when a skill needs them.

## Verification

- Check that frontmatter is valid YAML, required fields are present, and names are unique.
- Check that referenced files exist and documented commands match the intended tools.
- Once skills exist, run `npx skills add . --list` from the repository root and confirm the expected skills appear.
- For behavior changes, exercise a representative task with the skill. Test helper scripts in proportion to their behavior and risk.
- Run `git diff --check` before handing off changes. Report the checks performed and any verification gaps.

## Distribution

The standard `skills/` layout supports CLI discovery without a package manifest or build step. Preserve installation through `npx skills add OWNER/REPO`. Use the actual Git remote when updating README installation examples; do not invent a GitHub owner or repository URL.
