# Tooltips

These are fallback design defaults. Follow explicit user instructions and established project or component guidance where provided; preserve accessible naming and operability.

## Purpose and content

- Give every icon-only button a tooltip with concise text identifying its action. Prefer an action label such as “Search” or “Duplicate”; keep it consistent with the control's accessible name.
- Tooltips can progressively disclose additional information about a control or displayed content. Use them to preview details available elsewhere without requiring navigation, or reveal a more precise version of summarized information. Keep the preview concise and ensure important information is also available without hover, including on touch devices.
- Keep tooltip content non-interactive. If it needs links, buttons, or focusable content, use an appropriate popover or dialog pattern instead.

## Accessible names and behavior

- A tooltip does not replace the trigger's accessible name. For an icon-only button, use a visually hidden text label, `aria-label`, or `aria-labelledby`; hide a purely decorative icon from assistive technology. A role alone does not name a control.
- Expose genuinely supplementary tooltip text as a description using appropriate tooltip semantics and an association such as `aria-describedby`. Avoid announcing an identical label twice as both name and description. Preserve the existing library's accessible implementation when it satisfies the requirement.
- Open on hover after warmup and immediately on focus. Keep focus on the trigger. Support Escape dismissal without moving focus or the pointer; do not immediately reopen a dismissed tooltip until a fresh trigger interaction.
- Keep the tooltip visible when the pointer moves from the trigger onto the tooltip, including across the gap. This lets users move the pointer out of the way or read magnified content; it does not make the tooltip's content clickable or focusable. Keep it visible while either is hovered, or while the trigger remains focused, unless dismissed. Do not automatically time out readable content.

The [W3C hover/focus guidance](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) explains dismissible, hoverable, and persistent content. These accessibility considerations are distinct from the placement and timing preferences below.

## Shared warmup and cooldown

Use one shared timing policy across related tooltip triggers in the interface, not an independent warmup for every button.

| State or event | Expected behavior |
|---|---|
| Cold: pointer enters a trigger | Start the warmup delay; show only if the pointer is still there when it completes. |
| Pointer leaves before warmup completes | Cancel the pending opening; a tooltip that never appeared does not warm the group. |
| Any tooltip becomes visible | Enter the warm state. Moving to another trigger shows its tooltip immediately, replacing the prior one. |
| Last tooltip closes and no trigger remains active | Begin the cooldown period. Another trigger entered before expiry opens immediately and keeps the group warm. |
| Cooldown expires with no tooltip active | Return to cold; the next hover must complete warmup again. |
| Trigger receives focus | Show immediately regardless of warmup or cooldown. |

Warmup, close delay, cooldown, and animation duration are different settings. A tooltip does not need to remain visible during cooldown. Use existing project timing values where available. Otherwise establish configurable, shared warmup and cooldown durations; this guide does not prescribe exact milliseconds. Clear stale timers on trigger changes, dismissal, and removal so delayed tooltips do not appear on abandoned controls.

## Placement

### Choose a side using the control group

Anchor to the bounds of the element the tooltip describes, not the pointer. For a button, use the full button bounds rather than just its icon. Prefer **above the trigger, horizontally centered** when there is room and this avoids neighboring controls.

The preferred side must also respect the direction of the group. Keep the tooltip out of the path of sibling interactive elements:

| Situation | Preferred placement |
|---|---|
| Standalone control or ordinary horizontal row with space above | Above, centered on its trigger. |
| Horizontal controls below a header or against the top boundary | Below the controls when above is unavailable or obstructed. |
| Horizontal controls above a footer or against the bottom boundary | Above the controls. |
| Vertical stack of controls | Beside the trigger, vertically centered, so it does not cover the controls above or below. |
| Vertical controls on the left edge of a panel | To the right, into the available content area. |
| Vertical controls on the right edge of a panel | To the left, into the available content area. |

### Keep the whole tooltip visible

1. Determine the preferred side from the table, then evaluate the actual tooltip size, viewport, clipping boundaries, surrounding panels, and sibling control bounds. A panel boundary matters when it clips content or defines the usable region; do not assume every ancestor is a clipping boundary.
2. If the tooltip would be cut off or cover sibling controls, flip to the opposite viable side. Evaluate alternate sides if needed. Choose a visible, non-obstructing placement before optimizing centering.
3. Shift along the chosen side only as much as necessary to fit. Keep the tooltip visibly associated with its trigger and preserve the gap; do not shift it over the trigger or neighboring controls merely to avoid overflow.
4. For a wide tooltip on a horizontal row, align its left edge with a left-edge trigger or its right edge with a right-edge trigger when centering would overflow. This applies above or below the row.
5. For a tall tooltip beside a vertical stack, align its top edge with a top-edge trigger or its bottom edge with a bottom-edge trigger when vertical centering would overflow. This applies on either side of the stack.
6. Re-evaluate on scrolling, resizing, zoom, or content changes. Wrap long content and constrain its width to the available region rather than letting it run offscreen. If no placement can fit, shorten supplementary content or use another help pattern; do not accept clipped content as the final solution.

Avoid covering or intercepting sibling controls even when the tooltip technically fits the viewport. A generic collision library will not necessarily understand control grouping; configure placement and fallback candidates from the group context.

## Visual defaults

- Where there is no established spacing guidance, use a **4px gap** between the trigger's outer bounds and the tooltip's nearest visible edge. Preserve it after flips and alignment changes.
- Do not include an arrow unless explicit instructions or established project guidance require one.
- Reuse the project's typography, color, padding, radius, shadow, width, and motion conventions. Keep text legible and maintain adequate contrast.
- No additional fixed styling values are prescribed yet. Keep concise labels compact; wrap supplementary explanations naturally without truncating their meaning.

## Implement in code

Use the existing tooltip primitive and shared provider where available. Inspect its naming, delay, side/alignment, offset, collision, portal, and dismissal APIs before building a replacement.

If the project has no tooltip component or positioning solution, [Floating UI](https://floating-ui.com/docs/tooltip) can handle the positioning mechanics. Choose the package appropriate to the existing stack rather than adding React to a non-React project. Positioning utilities still need accessible naming, interaction state, and shared timing.

- Start with the group-aware placement above. Use [`offset`](https://floating-ui.com/docs/offset) for the gap, [`flip`](https://floating-ui.com/docs/flip) for side changes, and [`shift`](https://floating-ui.com/docs/shift) for alignment corrections. A typical middleware order is `offset`, `flip`, then `shift`; configure boundaries and fallback candidates for the context. Do not combine `flip` with `autoPlacement`.
- Use [`autoUpdate`](https://floating-ui.com/docs/autoupdate) while the tooltip is mounted/open, with cleanup when it closes. Use a supported portal or overlay layer when ancestor clipping prevents correct display, preserving the trigger association and appropriate stacking context.
- In React, [`FloatingDelayGroup`](https://floating-ui.com/docs/floatingdelaygroup) with `useDelayGroup` can share hover timing; `timeoutMs` extends the instant phase after the close delay. Its near-instant group opening uses 1ms. Handle focus opening without the hover warmup. In other stacks, use equivalent shared state rather than requiring this React API.

Check the installed version's APIs when implementing. Library examples are implementation references, not overrides for these default group-placement rules.

## Implement in a canvas

Use existing tooltip components and prototype features where available. Position the tooltip relative to the element it describes, and show alternate placements where needed near edges. Use the 4px default gap unless the project specifies another value.

For a static design, show how the tooltip looks and where it appears. If implementation notes are requested, explain when it opens, how it closes, and how its placement changes near edges. Do not add those notes as visible text on the product screen unless requested. A static design cannot verify working timers, keyboard behavior, or automatic repositioning; say which behaviors have not been tested.

## Verification

Exercise representative cases relevant to the task:

- Icon-only buttons have concise tooltips and independent accessible names; supplemental descriptions do not duplicate labels unnecessarily.
- First hover waits, leaving early cancels it, movement between warmed triggers is immediate, and a hover after cooldown waits again. Focus opens immediately in either state. Pending timers cannot reopen a dismissed or abandoned tooltip.
- Escape closes without moving focus; pointer travel across the 4px gap into the tooltip preserves visibility. Focus and pointer state do not incorrectly cancel one another.
- A horizontal toolbar uses above/below placement without covering siblings; top and bottom boundaries produce the appropriate side.
- A vertical toolbar uses side placement without covering siblings; left and right boundary cases open into available space.
- Long tooltips near left/right edges align or shift horizontally; those near top/bottom edges of vertical stacks align or shift vertically. All remain fully visible and retain the gap.
- Scroll, resize, zoom, and clipped-container cases keep the tooltip anchored and readable in code; verify equivalent geometry in canvas states.
- Explicit project placement or spacing guidance overrides these fallback design defaults. Report any accessibility conflict separately.

For code, exercise the live UI rather than relying only on a screenshot. For a canvas, inspect bounds and relevant states and report untestable runtime behavior. Report verification gaps without claiming full compliance.
