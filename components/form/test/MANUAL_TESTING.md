# Manual Testing — auro-form

Automated tests already cover auro-form's orchestration logic: value collection and per-element
value shape (`auro-form-interactions.test.js`, `validation-value-setting.test.js`), element
discovery, submit/reset workflows and event payloads, submit/reset button auto-enablement, the
`validity` getter, `isInitialState`/dirty tracking, disabled-element propagation, and the public
API (`auro-form.test.js`). The manual cases below focus only on what those unit tests cannot
confirm: real end-to-end flows a human perceives in a browser, composed keyboard traversal,
layout, screen-reader behavior, and cross-browser rendering. Cases marked **[v6]** are new or
changed in the formkit v6 migration — prioritize them when regression-testing an upgrade.

## Smoke Test

[ ] Load a form with a couple of `auro-*` fields (e.g. `auro-input`, `auro-select`) plus submit/reset buttons — verify everything renders
[ ] Fill all required fields validly and click submit — verify the submit fires and the happy path succeeds
[ ] Leave a required field empty and click submit — verify submission is blocked and errors are shown on the invalid field(s)
[ ] Edit a few fields, then click reset — verify all fields visibly return to their initial state
[ ] Tab from the first field through to the submit button and press Enter — verify the form is reachable by keyboard and submits

## Depth

### Real user submit / reset flow

[ ] Fill a multi-field form (mix of `auro-input`, `auro-select`, `auro-checkbox-group`, `auro-datepicker`) end to end as a real user and submit — verify the perceived result matches what was entered
[ ] On mobile (below `sm`), choose a value through the fullscreen bib of `auro-select` / `auro-combobox` / `auro-datepicker` / `auro-counter-group`, then submit — verify the chosen value is collected **[v6]**
[ ] Reset a form the user has edited — verify errors clear and every field settles back to its initial value in one pass (no visible flicker of the reset/submit buttons) **[v6]**

### Keyboard traversal (composed form)

[ ] Tab and Shift+Tab across the whole assembled form — verify focus moves in logical order through every field and the submit/reset buttons
[ ] Press Enter from a single-line text field — verify the form submits; press Enter inside a `textarea` field — verify a newline is inserted and the form does not submit
[ ] When the form auto-enables a previously-disabled submit/reset button, verify it re-enters the tab order and is operable by keyboard **[v6]**

### Appearance & Layout

[ ] Inspect the assembled form at desktop and mobile widths — verify field spacing, alignment, and wrapping read correctly
[ ] Verify submit/reset buttons appear visually disabled when the form auto-disables them and cannot be activated by mouse or touch **[v6]**

### Cross-browser

[ ] Repeat the smoke happy-path and error-path in Chrome, Safari, and Firefox — verify consistent rendering and behavior

### Screen Reader
auro-form adds no ARIA role and no focus management of its own; per-field labels/errors are owned
by each component. Do a short VoiceOver/NVDA pass over the emergent form-level behaviors only:
[ ] Failed submit — verify all invalid fields surface their errors and the result is coherent (note: auro-form does **not** move focus to the first invalid field — confirm that is acceptable for the flow)
[ ] Runtime DOM changes (add / remove / rename / disable a field) — verify no rogue focus loss or spurious announcements **[v6]**
