---
name: mobbin-to-canvas
description: Collect and organize Mobbin screenshot inspiration in Figma, pen.dev, Paper, or another connected design canvas. Use when importing Mobbin references into a design tool, explicitly reorganizing existing references, or creating a local HTML inspiration preview when no canvas destination is specified.
---

# Mobbin to Canvas

Collect the requested Mobbin references and place them in the user's chosen destination. Keep screenshots intact, retain source links, and apply the layout rules below using the destination's supported features.

## Choose the destination

- Use the design tool explicitly named by the user or identified by their destination link. Resolve the target file, page, or canvas through that tool's MCP connection. If the name and link conflict, or multiple targets remain plausible, ask which destination to use before writing.
- Do not pick a tool merely because it is connected or currently open. If the user provides no destination and none is established in the task context, create a simple local HTML preview as described below.
- If the user names a tool without a file, use its tools to resolve the intended destination from task context or selection. Ask when it remains unclear; do not edit an arbitrary open file or silently switch to HTML.
- Read the selected tool's required guides and inspect its current capabilities before editing. For Figma, follow the applicable Figma editing instructions. For Paper, load its MCP guide before other Paper tools. For pen.dev, load its canvas skill and execute/schema instructions before editing; access encrypted `.pen` files only through its MCP tools.
- If a requested destination cannot be accessed, explain the limitation and offer HTML as an alternative. Do not claim a canvas import succeeded or silently create a different destination.

## Collect the references

- Identify the requested screens and keep each screenshot paired with its canonical Mobbin screen URL throughout import. Ask for missing inputs only when they cannot be resolved from the task context or available tools.
- When the Mobbin plugin is available, follow its best-practices guidance. Before searching, also load its search guidance. If those instructions are unavailable, use the connected tools' documented capabilities.
- For retrieval calls destined for a design canvas, set `output_destination: "design_tool"` and `output_tool` to the actual product name, such as `Figma`, `pen.dev`, or `Paper`, when supported. For a local HTML preview, use `output_destination: "code"` and omit `output_tool` unless a specific destination product is known. Keep these values and a concise `task_intent` consistent across calls for the task.
- When the user specifies collections or saved screens, retrieve those references first. Do not supplement them with search results unless the user requests or authorizes it. Follow the tools' pagination and collection-selection rules; report retrieval limits rather than claiming to have fetched everything.
- Use screen search for individual screens and flow search for journeys. Preserve flow order using each screen's `position`; collection retrieval order is newest-save-first and does not establish flow sequence.
- Inspect each screenshot before importing. Download the full-resolution image from `image_url`, rather than reusing an inline preview. Image URLs expire after 30 days, so embed or upload the downloaded image using the destination's supported image mechanism. If WebP cannot be opened, request JPG.
- Use the screen's canonical `mobbin_url` for its layer name and source link. Do not use an image asset URL, collection URL, or app listing. Flow results provide a flow-level URL and individual screen IDs; resolve each screen's canonical URL using supported tools or user-provided links. Report unresolved URLs instead of inventing them.
- Group related screens by the user's categories, flow, or shared purpose.

## Scope of edits

Apply the layout and verification rules to the screens and containers created for the current import. Existing screens, including user-created duplicates and manually added Mobbin inspiration, must remain untouched unless the user explicitly asks to reorganize them. A general request to import more references does not authorize changes to existing content.

Before editing, inspect the destination and record existing nodes and their bounds and relevant properties. Place new content in unused canvas space. Do not move, resize, rename, reparent, replace, remove, or change the images, links, or annotations of existing nodes to enforce this skill's rules. When reorganization is explicitly requested, apply the rules only to existing content within the user's requested scope and preserve the rest. Do not remove or merge repeated screens.

## Organize the canvas

Follow this skill's canvas structure rather than the Mobbin redesign skill's reference-board template, which adds titles, captions, and wrapper frames.

1. Use a clearly named native section for each related set of screens when the destination supports sections. **In Figma, use actual sections, never frames or groups as substitutes.** In other tools without sections, use the lightest supported named container, such as an artboard or frame. Give it no decorative fill, border, or effects. If no container is supported, arrange each set spatially and retain its descriptive name in available metadata.
2. Arrange screens left to right, then top to bottom, with at most **6 screens per row**. Use **80px edge-to-edge gaps** between columns and **80px between row bounds**. For mixed heights, start the next row 80px below the tallest screen in the preceding row. Preserve screenshot dimensions and aspect ratios rather than cropping them to force uniform sizes. A grid is a visual arrangement; use manual positions or supported layout primitives when CSS grid or native grids are unavailable.
3. Use one screen object per screenshot. In Figma, use a **single frame with a direct image fill**, without a nested image rectangle. In other tools, prefer a single image-filled frame/artboard when supported; otherwise use one native image node. Preserve the screenshot's aspect ratio and full visible content. Add no decorative wrapper around a screen.
4. Name each screen object **only its canonical Mobbin screen URL**, with no title, prefix, suffix, or numbering, wherever layer naming is supported.
5. In Figma, attach an annotation to each screen frame with the exact text **“View on Mobbin”** linked to that screen's canonical URL. A comment, prototype interaction, or URL-only layer name does not replace that requirement. In other tools, prefer an equivalent native linked annotation; otherwise use a supported hyperlink on the screen object with “View on Mobbin” as its accessible label or tooltip where available. If neither is supported, retain the URL in the layer name and report that clickable source links could not be added. Do not invent APIs or add visible caption layers as a workaround. Report unsupported Figma annotation requirements explicitly.
6. Size each container to contain its screens. Stack the newly created containers in **one vertical column**, align their left edges, and leave exactly **800px between adjacent container edges** after finalizing dimensions. For tools without containers, use the screen bounds of each set. This spacing applies within the current import or explicitly requested reorganization, without moving pre-existing content.

Do not add anything else to the canvas unless asked: no text layers, titles, captions, labels, backgrounds, dividers, decoration, or decorative/wrapper frames. The minimal containers needed by tools without sections are the only structural exception. Group names belong in container names or metadata, and source links belong on screens or their annotations. Preserve unrelated existing canvas content.

## HTML preview fallback

When no destination is specified or established in context, produce a local `index.html` with the downloaded screenshots stored alongside it in an `images/` directory. Embed images as data URLs instead if a single self-contained file is more useful. Do not rely on expiring Mobbin image URLs, remote dependencies, a build step, or a server.

- Represent each related set with a semantic `<section>` and a descriptive accessible name, without adding a visible heading.
- Use a grid with at most six columns, 80px row and column gaps, and 800px between section edges. Preserve screenshot sizes and allow scrolling rather than cropping. A narrow viewport may use fewer columns while retaining order and spacing.
- Make each screenshot an `<img>` inside an `<a>` linking to its canonical Mobbin screen URL. Set the link's accessible label and tooltip to “View on Mobbin”; include useful image alt text. Keep repeated screens when requested. Store the source URL in a data attribute where canvas output would have a URL-only layer name.
- Keep the page visually minimal: screenshots and whitespace, with no visible titles, captions, navigation, decorative cards, or backgrounds unless requested. Preserve keyboard focus indicators for links.
- Escape text and attribute values and validate link schemes. Treat source metadata as data, not executable HTML or script.
- Open the local page in an available browser, check image loading, layout, source links, and keyboard access, and fix issues before handing it over. If browser inspection is unavailable, report that verification gap.

Return a link to the local HTML file and keep its image directory with it so the preview remains usable after moving or sharing the folder. Do not publish it unless requested.

## Verify the result

Before reporting completion:

1. Compare the imported screens with the requested source list. Confirm each requested screen has the correct screenshot and source URL, and investigate unintended omissions. Repeated source URLs or existing duplicated screens are not errors to clean up.
2. Inspect the node tree or HTML structure against the chosen destination's mapping above. Confirm descriptive container names, URL-only screen layer names where supported, and the correct image representation. Report capability adaptations instead of claiming every tool has Figma sections or annotations.
3. Measure screen positions and bounds: no row exceeds six screens, column gaps are 80px, and gaps between row bounds are 80px. Confirm no overlap or clipping.
4. Measure container or set bounds: left edges align in one vertical column, with exactly 800px between adjacent edges within the authorized scope.
5. Inspect each source link and its label or annotation where supported. Confirm its target is the corresponding canonical screen URL; open a representative link. Report any unsupported linking feature or unavailable link-activation check.
6. Inspect an overview and individual screens visually. Check image quality, full visible content, grouping, spacing, and the absence of unrequested additions. Compare pre-existing content against the initial inspection and confirm it remains unchanged outside any explicitly requested reorganization. Correct discrepancies only within the authorized scope and repeat affected checks.

Return the destination canvas link or local HTML file and a brief account of what was imported and verified. Explicitly identify any requirement that could not be completed or checked, including destination-specific adaptations.
