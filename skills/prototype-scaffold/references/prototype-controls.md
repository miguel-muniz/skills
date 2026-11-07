# Prototype controls

Use Tweakpane to change meaningful prototype state or content without editing source. Include a small initial set that fits the starter, with a dropdown for a meaningful state or data variant when appropriate. Store those values in the shared Nano Stores module so every island sees the same changes. Keep temporary panel position and visibility separate from simulated product state.

Review [Tweakpane's container, binding refresh, and visibility APIs](https://tweakpane.github.io/docs/misc/) before implementing.

## Panel behavior

- Create one controls panel per page, outside the simulated product layout. Give it a compact shell containing a dedicated drag handle, the Tweakpane container, and clear actions for hiding and resetting position. Avoid relying on undocumented Tweakpane header markup for dragging.
- Dragging the handle moves the panel using pointer events and pointer capture. Do not initiate dragging from inputs, sliders, or buttons inside the panel. Allow keyboard movement from the focused handle, for example using arrow keys, and give the handle an accessible name and visible focus indicator.
- Remember only the panel's position in browser storage under a project-specific key. Validate stored values, clamp the panel to the current viewport, and recover from invalid data or unavailable storage. Re-clamp after viewport changes so the handle and actions remain reachable; constrain panel size or allow internal scrolling on small screens.
- “Hide until refresh” hides the complete panel for this page load. Do not save hidden state to persistent storage. A reload makes the panel visible again wherever controls are enabled.
- “Reset position” removes the saved coordinates and moves the panel to its initial safe corner. Resetting position must not reset the prototype's data or state controls.
- Keep controls development-only by default and hidden in ordinary exports. If the user requests controls in a shared export, make that an explicit export-entry setting and include the same controls component.

## Lifecycle and state

Mount the panel from one browser-only component. In React, create it in an effect and dispose it on cleanup. A dynamic import must check that the component is still mounted before creating DOM or subscribing. Remove the shell, listeners, resize handlers, store subscriptions, and pane instance on cleanup. React development remounts must not leave duplicate panels.

Bind Tweakpane to a stable parameter object. Binding changes update the shared store; store changes update the parameter object and refresh the relevant binding. Avoid feedback loops. Keep single-component UI state local when other islands do not need it.

Keep panel styling modest and independent of the product's design. Document where to add a new parameter and its binding in project agent instructions. Implement the shell locally in the prototype; no external companion skill is required.
