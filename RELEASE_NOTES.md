# Release Notes

The latest release is expanded by default. Select any release below to expand its notes.

Complete changelog history may be viewed [here](https://github.com/AlaskaAirlines/auro-formkit/releases).

<auro-accordion expanded>
<span slot="trigger">FormKit v6.0.3</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/06.00.03.md) -->
<!-- The below content is automatically added from ./docs/releases/06.00.03.md -->

# Release Notes

This document outlines all changes since the 6.0.2 release.

Version 6.0.3 is a **patch release** focused on `auro-menu`/`auro-combobox` handling of options that share a `value`, an `auro-dropdown` lifecycle fix for re-mounted triggers, a counter accessibility fix, and repairs to the interactive demo examples. No breaking API changes.

## Summary

This release resolves a group of selection, lifecycle, and accessibility defects:

- `auro-menu` (and `auro-combobox`) now correctly distinguish options that share the same `value` — clicking the second of two options coded the same (e.g. two airports both `SEA`) selects that option instead of the first, and multi-select can hold two same-value options independently.
- `auro-menu` multi-select now lets `Enter` re-select the highlighted option immediately after a deselect empties the entire selection, instead of no-oping until the highlight is moved away and back.
- `auro-dropdown` restores its trigger listeners after being detached and reattached to the DOM (e.g. when a parent such as `auro-drawer` moves it), so the bib opens again after a re-mount.
- `auro-counter` announces its value as a plain count rather than a percentage in some screen readers.
- Several interactive demo examples that rendered but did nothing now work, and the demo example wiring is made consistent across components.

All changes are backward compatible. No new attributes, properties, events, or slots were added; `value` remains the public identity for menu options. Consumers should update without migration work.

## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-MENU

- **Options that share a `value` are now distinguishable** — [AB#1602086](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1602086)

    Selection reconciliation previously resolved a value to an option with a first-by-value match (`items.find(i => i.value === this.value)`), so clicking the second of two options sharing a `value` selected and checkmarked the first, and multi-select could not hold two same-value options at once. Each option now receives a private, auto-generated `_optionKey` assigned by the root menu, and the user's exact pick is tracked via `_selectedKey`. Reconciliation prefers the keyed option and falls back to first-by-value for programmatic `value` sets and async preselection, so existing behavior is preserved. Multi-select stores selections by element identity and rebuilds `value`/`_selectedKey` in DOM order via `_sortSelectedByDomOrder()`. No public API change — `auro-menuoption.js` is unchanged and `_optionKey`/`_selectedKey` are internal and never reflected.

- **`Enter` re-selects the highlighted option after emptying the selection** — [AB#1606433](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1606433)

    In multi-select, deselecting the last remaining option collapsed `value` to `undefined`, which drove `updated()`'s no-match reconcile branch to reset `_index` to `-1` while `optionActive` still pointed at the highlighted option. The next `Enter` read `items[-1]` (`undefined`) and returned early, so pressing `Enter` again on the same option did nothing until the highlight was moved away and back. `makeSelection()` now recovers `_index` from `optionActive` when it has been reset to `-1` — mirroring `auro-combobox`'s `reconcileMenuIndex` fallback — so `Enter` consistently toggles the highlighted option. The guard is tight: it engages only when `_index` is negative and a valid active option exists.

### AURO-COMBOBOX

- **Same-value option identity preserved through value↔input sync** — [AB#1602086](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1602086)

    `auro-combobox` consumed the menu selection in two spots that discarded the selected element's identity during its value↔input sync, collapsing a same-value pick back onto the first matching option. Both are now guarded: `updated()` no longer clears the menu selection when it already matches the new value, and `handleInputValueChange` no longer writes the display label back into `value` while syncing the display. This is the combobox-side counterpart to the `auro-menu` duplicate-value fix above.

### AURO-DROPDOWN

- **Trigger works again after the element is re-mounted** — [AB#1611656](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1611656)

    When a parent component detaches and reattaches `auro-dropdown` (for example, `auro-drawer` moving its light-DOM children into `drawerBib`), `disconnectedCallback()` calls `floater.disconnect()`, which strips all trigger click/keydown listeners. Because `firstUpdated()` runs only once, `configure()` was never re-called after reconnect and the trigger was left permanently unresponsive — the bib would not open. `connectedCallback()` now re-runs `this.floater.configure()` when the floater was already initialized, restoring the trigger listeners after any reattach. The change is a no-op on initial connect (the guard is falsy before `firstUpdated()` first calls `configure()`).

### AURO-COUNTER

- **Value no longer announced as a percentage by screen readers** — [AB#1443553](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1443553)

    `aria-valuetext` was emitting a bare number on a `role="spinbutton"` element that also carries `aria-valuemin`/`aria-valuemax`, so some screen readers computed the value's position within the range and announced a percentage (e.g. "1.333%") instead of the count. The value is now wrapped in single quotes so the rendered attribute is unambiguously a human-readable string (e.g. `aria-valuetext="'1'"`), and the reader reads it verbatim. The numeric `aria-valuenow`/`aria-valuemin`/`aria-valuemax` props are intentionally left as numbers.

### DEMO EXAMPLES

- **Inert interactive examples repaired and wiring made consistent** — [AB#1611713](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1611713)

    Surfaced by the AuroDocsSite → FormKit 6 upgrade, a subset of interactive demo examples across `checkbox`, `counter`, `datepicker`, and `dropdown` rendered but did nothing — dismiss/close buttons, `show()`/`hide()` triggers, an error toggle, and a reset button that were embedded on a page but never called by that page's `initExamples()`. In `dropdown`, two additional runtime faults were fixed: section-header anchor ids (`#error`, `#matchWidth`) collided with example element ids so `document.querySelector` returned the header instead of the dropdown, and `getting-started` never invoked `initExamples()` at all. The affected examples are now imported and called, the id collisions removed, and the dropdown demo/example JS aligned to a single invocation pattern.

## Test Coverage

- **menu:** added duplicate-value fixtures (two `value="SEA"` options) and regression tests asserting that clicking index 1 selects index 1 (not index 0), that multi-select holds both independently and serializes in DOM order, and that `Enter` re-selects the highlighted option after a deselect empties the selection. Unit tests added for the new `resolveSelectedOption`/`resolveSelectedOptions` resolvers. Menu suite ~99.8% coverage.
- **combobox / select:** added same-value selection coverage guarding the value↔input sync and multiselect duplicate-value handling. Combobox suite ~98.0% coverage.
- **dropdown:** added a regression test that detaches and reattaches the element and verifies the trigger opens the bib after re-mount.

## Documentation

- Added duplicate-value API and customize examples for `auro-menu`, `auro-select`, and `auro-combobox`.
- Added post-mortems for the fixes in this release under [`docs/post-mortem/`](../post-mortem/): [1443553](../post-mortem/1443553.md), [1602086](../post-mortem/1602086.md), [1606433](../post-mortem/1606433.md), [1611656](../post-mortem/1611656.md), and [1611713](../post-mortem/1611713.md).
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v6.0.2</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/06.00.02.md) -->
<!-- The below content is automatically added from ./docs/releases/06.00.02.md -->

# Release Notes

This document outlines all changes since the 6.0.1 release.

Version 6.0.2 is a **patch release** focused on datepicker mobile/range layout polish, combobox and select loading states, and a handful of component-level fixes, plus build-integrity hardening that prevents malformed component bundles from ever shipping to npm again. No breaking API changes.

## Summary

This release resolves a group of visual and behavioral defects that surfaced across mobile layouts, range datepickers, and async-loading flows:

- Range `auro-datepicker` inputs now stay evenly sized and on-screen when labels are long, and their date values truncate symmetrically at narrow widths instead of one input clipping much sooner than the other.
- The `auro-datepicker` fullscreen (mobile) header now aligns flush with the rest of the layout and renders the From/To date values with the correct body typography.
- `auro-combobox` now opens its bib and shows the loading indicator while options load asynchronously, and the loading placeholder is correctly centered and sized to the trigger.
- `auro-dropdown` now closes when it becomes disabled while open.
- `auro-form` now submits on `Enter` from grouped controls (`auro-radio`, `auro-checkbox`, `auro-counter` used inside their `*-group` wrappers), matching the existing behavior for direct controls.
- Grouped `auro-counter` dividers pick up the correct inverse color token, and the `auro-bibtemplate` mobile header spacing is corrected.
- `auro-select` the loading placeholder is now correctly centered and sized to the trigger.

All changes are backward compatible. Consumers should update without migration work.

## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-DATEPICKER

- **Range inputs stay evenly sized with long labels** — [AB#1494482](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1494482)

    In a range datepicker, a long `fromLabel`/`toLabel` stretched the first input to full width and pushed the second (range-end) input off-screen. The two inputs now hold an even ~50/50 split at all widths (`flex: 1 1 0; min-width: 0`, scoped to `:host([range])`), and over-long labels truncate via the existing ellipsis. Single-input datepickers keep their original full-width behavior.

- **Range date values truncate symmetrically at small widths** — [AB#1602084](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1602084)

    Building on the range fix above: because the calendar icon renders only in the From input, the From half's text area was narrower than the To half's, so its date/placeholder clipped well before the To value ellipsized. The From container's flex-basis is now widened by the icon footprint (minus the To input's existing margin) so both text areas are equal and the values truncate in lockstep. Scoped to the classic range layout; single-input and non-classic layouts are untouched.

- **Mobile header alignment** — [AB#1494481](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1494481)

    In the fullscreen (mobile) calendar, the From/To date columns were indented from the left edge while the headline and calendar grid sat flush. The errant left padding on the header columns was removed so the header aligns with the rest of the mobile layout; the inter-column gutter is preserved.

- **Correct typography on mobile date display** — [AB#1598648](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598648)

    The From/To date values in the fullscreen header rendered with inherited typography rather than the intended body style. The value spans now carry the `body-default` class so their size and line-height match the design and the adjacent labels.

### AURO-COMBOBOX

- **Bib opens during async option loading** — [AB#1457608](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1457608)

    When a consumer set the menu's `loading` attribute in response to an `inputValue` event, the attribute change arrived after the combobox's update cycle had already run, so the bib never opened and the loading slots (`loadingIcon`, `loadingText`) stayed invisible until data arrived. `handleMenuLoadingChange` now opens the bib when loading starts (input has a value and the component has focus), so the loading indicator is visible throughout the load.

### AURO-SELECT

- **Restored trigger ellipsis truncation** — [AB#1594470](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1594470)

    A long selected value in a constrained-width classic select failed to truncate, and once truncating, ran under the chevron. The selected value now has the full truncation setup (`overflow: hidden; white-space: nowrap; text-overflow: ellipsis` with a `max-width: 100%` container), and `.triggerContent` uses `box-sizing: border-box` so its padding is included in the width and the text stays clear of the chevron.

### AURO-MENU

- **Loading placeholder centering and width** — [AB#1457608](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1457608)

    The menu inside combobox and select's loading placeholder was vertically off-center and rendered wider than the trigger, pushing the bib past the trigger edge. The loading wrapper now uses flex layout with `align-items: center` for true vertical centering, and the shadow-DOM loading placeholder is hardcoded with `nocheckmark` so its padding matches regular options.

### AURO-DROPDOWN

- **Closes when disabled while open** — [AB#1594444](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1594444)

    If `auro-dropdown` was open and then became disabled, it stopped taking input but left the popover on screen. The update cycle now hides the dropdown and clears its visible state when `disabled` becomes `true` while the popover is showing.

### AURO-FORM

- **Enter-to-submit from grouped controls** — [AB#1499589](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1499589)

    Pressing `Enter` from a grouped control (`auro-radio`, `auro-checkbox`, or `auro-counter` used through `auro-radio-group`, `auro-checkbox-group`, or `auro-counter-group`) did nothing, while `Enter` from a direct control such as `auro-input` submitted the form. The Enter gate in `handleKeyDown()` now resolves the tracked form element from `event.currentTarget` (the listener host) instead of `event.target` (the inner control), so grouped controls reach the form's existing submit path. Validation still governs whether the form actually dispatches `submit`.

### AURO-COUNTER

- **Inverse divider color in counter group** — [AB#1450397](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1450397)

    Counters inside an inverse `auro-counter-group` rendered the divider line in the wrong color because the divider color rule lived on the counter wrapper rather than the group's slotted divider selector. The rule was moved next to the selector that draws the divider so grouped counters pick up the correct inverse token.

### AURO-BIBTEMPLATE

- **Mobile header padding** — [AB#1364921](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1364921)

    In the fullscreen bib layout, header spacing was applied to the inner `.header` text container instead of the `.titleRow`, leaving the title and close-button row unevenly spaced. Spacing now lives on `.titleRow` so the title and close button align as a single unit.

## Build & Packaging

- **Bundled-imports verification prevents malformed component dist from shipping** — [AB#1575423](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1575423)

    Following the counter bundle leak in 5.12.0/5.12.1 (where `counter/dist` shipped unresolved bare imports for `auro-dropdown`/`auro-bibtemplate` due to a build-ordering race), this release adds three independent gates so the same failure class cannot reach npm again:

    1. `test/check-bundled-imports.mjs` scans every `components/*/dist/{index,registered}.js` against the rollup config's external allowlist (via `npm run test:dist`).
    2. The rollup config's `onwarn` handler now throws on `UNRESOLVED_IMPORT` instead of silently externalizing it, hard-failing the build.
    3. `pull-request.yml` and `release.yml` chain `test:dist` into the build so a failed check blocks caching and publishing.

## Test Coverage

- **datepicker:** added range regression tests asserting both inputs stay on-screen and evenly sized with long labels, and that their `.mainContent` text areas are equal so values truncate in lockstep at narrow widths. Each was proven to fail against the pre-fix CSS.
- **dropdown:** added a regression test that opens the dropdown, sets `disabled = true`, and verifies the popover is hidden.
- **form:** strengthened the shared `expectSubmitOnEnter()` helper to dispatch from inner interactive nodes, and added Enter-to-submit coverage for checkbox-group, radio-group, and counter-group.
- **build:** `check-bundled-imports.mjs` ships with smoke tests for its `findUnbundledImports` utility.

## Documentation

- Added loading-state examples for `auro-combobox` and `auro-select`.
- Added post-mortems for each fix in this release under [`docs/post-mortem/`](../post-mortem/): [1364921](../post-mortem/1364921.md), [1450397](../post-mortem/1450397.md), [1457608](../post-mortem/1457608.md), [1494481](../post-mortem/1494481.md), [1494482](../post-mortem/1494482.md), [1499589](../post-mortem/1499589.md), [1575423](../post-mortem/1575423.md), [1594444](../post-mortem/1594444.md), [1594470](../post-mortem/1594470.md), and [1602084](../post-mortem/1602084.md).
</content>
</invoke>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v6.0.1</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/06.00.01.md) -->
<!-- The below content is automatically added from ./docs/releases/06.00.01.md -->

# Release Notes

This document outlines all changes since the 6.0.0 release.

Version 6.0.1 is a **patch release** addressing focus-management regressions and displayValue rendering issues surfaced by the flight-search planbook integration. No breaking API changes.

## Summary

**This release is critical for any consumer using `auro-combobox` with preset values, framework-driven value bindings (React, Svelte), or the `displayValue` slot.** Without it:

- Comboboxes with a preset `value` attribute steal page focus on initial load, scrolling the viewport to the component — breaking SPA page transitions and deep-link flows.
- The first character typed after page load is silently swallowed (the bib doesn't open until the second keystroke), confusing users.
- The `displayValue` overlay renders blank on pre-selected comboboxes until the user interacts, making preset airport codes / flight selections invisible.
- After clicking a menu option, focus drops to `document.body` instead of moving to the clear button — breaking keyboard-tab flow and screen-reader navigation.

All four issues are fixed with no API changes. Consumers should update without migration work. The release also hardens `auro-dropdown` focus routing for future consumers and improves `auro-input`'s `displayValue` slot detection for custom-element content (e.g. `<auro-icon>`).

## Bug Fixes

### AURO-COMBOBOX

- **Blank displayValue on pre-selected combobox** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    When a combobox mounts with a preset `value` but option elements haven't loaded yet (`optionSelected` is null), the displayValue overlay was blank. A new fallback branch in `updateTriggerTextDisplay` synthesizes a temporary `<span slot="displayValue">` from the raw value until the real option loads.

- **Bib doesn't open on first keystroke after mount** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    A stale `_programmaticFilterRefresh` flag from mount-time `updated('value')` suppressed `_userTyped` on the first keystroke, preventing the bib from opening. The flag is now self-clearing via `this.updateComplete.then(...)` immediately after it's set, so it can never survive into the next user interaction.

- **Focus theft on initial page load with preset value** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    The bib input's static `autofocus` attribute (rendered on every Lit cycle, including initial mount when the bib is closed) caused the browser to auto-focus the native input on element upgrade. Fixed by making `autofocus` conditional on `dropdownOpen && isBibFullscreen`.

- **Focus not restored to clear button after click selection** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    After a click selection closes the bib, focus falls to `document.body`. `clearBtn.focus()` silently failed because the shadow DOM focus chain wasn't active. Fixed by priming the chain (`this.input.focus()` first, then `clearBtn.focus()`) and suppressing the dropdown's competing generic focus restoration via a new `noFocusRestoreOnClose` flag.

- **`focusin` handler caused focus-redirect loops in frameworks** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    The unconditional `this.focus()` call in the `focusin` listener conflicted with external focus management. Scoped to fire only when `event.composedPath()[0] === this` (the host itself is the focus origin, not a shadow DOM child).

### AURO-DROPDOWN

- **Removed `delegatesFocus: true`** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    `delegatesFocus` on the dropdown host caused unwanted focus cascading during Lit lifecycle DOM manipulation (transient focus touches on the host during `requestUpdate()`, slotchange, etc.). Removed as a defensive measure — the combobox handles all focus routing explicitly.

- **Added `focusTrigger()` helper** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    Replaces direct `this.trigger.focus()` calls (which silently fail when the trigger div has no `tabindex`). Queries `slot.assignedElements()` directly since `getFocusableElements()` can't traverse slot projections.

- **Added `noFocusRestoreOnClose` flag** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    A new private flag (separate from `noHideOnThisFocusLoss`) that suppresses the dropdown's generic focus restoration on close. Used by consumers (combobox) that manage their own focus routing. Prevents the dropdown's `focusTrigger()` from racing with the combobox's `setClearBtnFocus`.

- **Guarded strategy-change `setInputFocus`** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    The `auroDropdown-strategy-change` handler now only focuses the input when the dropdown is actually open, preventing focus theft during hot reload / re-initialization.

### AURO-INPUT

- **Null-safe `checkDisplayValueSlotChange` with light-DOM fallback** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    `this.shadowRoot.querySelector(...)` could fail if called before `firstUpdated`. Added optional chaining and a light-DOM fallback so `hasDisplayValueContent` reflects slotted content even before the shadow slot renders. The fallback also detects custom elements (e.g. `<auro-icon>`) via `shadowRoot !== null`.

- **Content-aware `hasDisplayValueContent` evaluation** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    Empty `<span slot="displayValue"></span>` forwarded from the consumer is no longer treated as "has content" — prevents the displayValue wrapper from rendering empty while blocking the combobox's synthetic displayValue. Custom elements rendering via shadow DOM are correctly detected as content.

- **Guarded `requestUpdate()` to avoid unnecessary re-renders** — [AB#1598671](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1598671)

    `checkDisplayValueSlotChange()` now only calls `requestUpdate()` when `hasDisplayValueContent` actually changed, avoiding extra render cycles on slot content changes that don't affect the computed state.

## Test Coverage

- **combobox:** 488 passing (added 6 new tests covering synthetic displayValue, preset-value first-keystroke, programmatic sync guards, setClearBtnFocus echo guard, focusin composedPath, and open-handler timing guard)
- **dropdown:** 358 passing (added 4 new tests covering `focusTrigger()` with slotted content and `noFocusRestoreOnClose` suppression)
- **input:** 563 passing (updated multi-level slot test to validate `{ flatten: true }` option)

## Documentation

- Added post-mortem: [`docs/post-mortem/1598671.md`](../post-mortem/1598671.md) — comprehensive analysis of root causes, fix patterns, dead-end investigations, and 11 lessons learned covering `delegatesFocus`, shadow DOM focus routing, one-shot flag patterns, and event retargeting.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v6.0.0</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/06.00.00.md) -->
<!-- The below content is automatically added from ./docs/releases/06.00.00.md -->

# Release Notes

This document outlines all changes since the 5.12.1 release.

Version 6.0.0 is a **major release** driven by the datepicker keyboard-navigation rewrite, locale/i18n support for date components, form-state correctness fixes, and an architectural rollback of the auro-menu / auro-select / auro-combobox distributed-state model introduced in 5.9. Consumers should read the Migration Guide carefully before updating.

## Migration Guide

1. **auro-datepicker / auro-input — Date props now require ISO-formatted strings** [AB#1428414](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1428414)
    - Any date value passed to `auro-datepicker` (e.g. `value`, `valueEnd`, `centralDate`, `minDate`, `maxDate`, `referenceDate`) or to `auro-input` when `type="date"` must now be an ISO-formatted date string (`YYYY-MM-DD`).
    - Locale-specific display formatting is now derived from the `locale` attribute rather than from the input value itself.

1. **auro-form — Disabled fields excluded from state and submission** [AB#1541873](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1541873)
    - Disabled controls are no longer included in `form.value`, in the `submit` event's `detail.value`, or in validation.
    - **Disabled required fields no longer block submission.** Any workflow that relied on `disabled + required` to gate submit must use a different constraint mechanism (e.g. removing the field from the DOM, using `readonly`, or adding an explicit submission guard).

1. **auro-menu — `@lit/context` MenuService architecture removed** [AB#1560485](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560485)
    - The 5.9-era `MenuService` / `MenuContext` centralized state model has been removed. `auro-menu` again owns all state and manipulates option elements directly (the pre-5.9 distributed model).
    - The following 5.9-only APIs have been removed and any usage must be updated:
        - `menu.menuService`
        - `allowDeselect` attribute
        - `selectAllMatchingOptions`
        - The `key` attribute on `auro-menuoption`
        - The `auroMenu-deselectPrevented` event
    - All `auro-menuoptions` are required to have a unique `value`.
    - The `auroMenu-selectedOption` event detail no longer includes `.options`, `.stringValue`, or `.label`. Read state from the `auro-menu` element itself instead of the event payload. The event now emits `{source}` only.

1. **auro-combobox — Reverted to pre-5.9 architecture** [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)
    - Consumers using the 5.9 combobox event payloads must migrate to reading state from `combobox.menu` and the pre-5.9 event contract described above.
    - Empty-input "show all" filter behavior from 5.9 is removed. With an empty filter value, `availableOptions` is empty; static options display on empty input; `noMatch` options only display when `filterValue` is present and never under `noFilter`.

1. **auro-select — Reverted to pre-5.9 distributed state architecture** [AB#1560488](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560488)
    - Any code touching `select.menu.menuService` or listening for `auroMenu-deselectPrevented` must be updated (see the `auro-menu` guidance above).

1. **auro-menu — Selected 5.9 API examples quarantined** [AB#1560484](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560484)
    - The `allowDeselect`, `selectAllMatchingOptions`, `key`, and `duplicateValues` API examples have been moved to a quarantine directory and removed from Storybook and documentation. They are no longer part of the supported public surface.

1. **auro-datepicker — `disabledDays` deprecated in favor of `blackoutDates`**
    - The legacy `disabledDays` property (an array of Unix timestamps) is deprecated. Consumers should migrate to the new `blackoutDates` property on `auro-datepicker`, which takes an array of `YYYY-MM-DD` ISO date strings.
    - `disabledDays` is still honored for backward compatibility but emits a one-time `console.debug` deprecation notice the first time a non-empty value is observed. Support will be removed in a future major release.
    - `blackoutDates` memoization is keyed on the array reference, so in-place mutations (`blackoutDates.push(...)`, `blackoutDates[i] = ...`, `blackoutDates.splice(...)`) will not trigger a re-render. To update, reassign the property: `el.blackoutDates = [...el.blackoutDates, '2024-12-25']`.

        ```diff
        - <auro-datepicker .disabledDays=${[1735084800, 1735171200]}></auro-datepicker>
        + <auro-datepicker .blackoutDates=${['2024-12-25', '2024-12-26']}></auro-datepicker>
        ```

## Features

### AURO-DATEPICKER

- **Full keyboard navigation** — [AB#1553712](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1553712)

    The datepicker calendar now supports full WAI-ARIA compliant keyboard navigation: arrow keys move through the date grid, and Enter/Space select the focused date. Focus behavior across month-boundary navigation has been reworked so that focus consistently lands on the intended cell.

    **Migration Guide:** _No changes required._

- **Locale and internationalization support** — [AB#1428414](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1428414)

    The datepicker now supports locale-aware rendering, including localized month names, weekday labels, and cell ARIA strings. The component derives its display formatting from the `locale` attribute, decoupling display from the underlying ISO date value.

    **Migration Guide:** See the Migration Guide above — date props must now be passed as ISO-formatted strings (`YYYY-MM-DD`).

- **`referenceDate` functionality and UI** — [AB#1553712](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1553712)

    A fully developed `referenceDate` feature lets consumers highlight a reference date within the calendar (e.g. "today" or an anchor point for a booking flow). The UI treatment and the underlying property contract are now both in place.

    **Migration Guide:** _No changes required._

- **Performance and accessibility improvements** — [AB#1553712](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1553712)

    Broad performance and screen reader improvements: compressed timers on the open cycle, `aria-current="date"` on the today cell, `aria-roledescription="calendar"` on the grid, `aria-hidden` removed from cells, single-day range hover preview, live-region announcements for range preview during selection, and memoized active-date computation.

    **Migration Guide:** _No changes required._

- **Optional label overrides via slot**

    A new set of label slots allows consumers to override calendar labels without subclassing.

    **Migration Guide:** _No changes required._

### AURO-INPUT

- **Locale and internationalization support** — [AB#1428414](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1428414)

    The input now supports locale-aware date formatting when used as `type="date"`, aligned with the datepicker's locale support.

    **Migration Guide:** See the Migration Guide above — date props must now be passed as ISO-formatted strings (`YYYY-MM-DD`).

### AURO-SELECT

- **Type-ahead functionality** — [AB#1567365](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1567365)

    Typing characters while the select is focused now jumps to matching options. Prefix matches are preferred over repeat-character cycling, hidden and static options are skipped, and the type-ahead buffer clears on Escape, blur, and programmatic value changes. Type-ahead announcements are routed to the bib root on mobile so VoiceOver reads them correctly.

    **Migration Guide:** _No changes required._

### AURO-FORM

- **Disabled fields excluded from form state and submission** — [AB#1541873](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1541873)

    `auro-form` now aligns with native HTML form semantics for disabled controls:

    - Disabled fields are excluded from `form.value` and from the `submit` event's `detail.value`.
    - Disabled fields are skipped during submit-time validation.
    - Disabled fields are ignored when computing validity and initial-state dirtiness.
    - Runtime `disabled`/`name` attribute mutations are handled and keep form state accurate.

    **Migration Guide:** See the Migration Guide above — disabled required fields no longer block submission.

- **Dirty-value-flag model for `isInitialState`** — [AB#1541873](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1541873)

    Form state tracking now uses a dirty-value-flag model. Fields cleared by the user after having been prefilled are correctly reported as dirty, and captured `null` initial values are preserved across `initializeState` re-runs and across runtime field renames.

    **Migration Guide:** _No changes required._

## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-COMBOBOX

- **`aria-activedescendant` + SPA-preselect races**

    Fixed a race between `aria-activedescendant` assignment and single-page-app preselection that could leave the combobox pointing at the wrong option on first render.

- **Combobox value preferred over input value on mount** — When the combobox's programmatic value and the input's current value diverge on mount, the combobox value now wins.

- **Restore trigger caret to end-of-text on reopen** — [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)

    When reopening the combobox, the text cursor now lands at the end of the trigger text rather than jumping to the beginning.

- **Focus moves to clear button only when a value is selected** — Previously, focus could jump to a not-yet-relevant clear button.

- **Input synchronization, `persistInput`, and validation** — Multiple related fixes tighten how the trigger input, the in-bib input, and the underlying menu value stay in sync when values change programmatically, when the user types, and when `persistInput` is set.

- **Framework-integration gaps resolved** — [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)

    Framework tests uncovered gaps in how combobox synced with menu across React and Svelte remounts; those gaps are now closed.

### AURO-SELECT

- **Home/End open the bib and activate an option when collapsed** — When the select is closed, pressing Home or End now opens the bib and focuses the first / last enabled option. Hidden, `disabled` and `static` options are skipped in the open-fallback path.

- **`aria-setsize` / `aria-posinset` re-stamped on option changes** — When options are added, removed, or reordered at runtime, position ARIA is now recalculated.

- **Type-ahead buffer clears on programmatic value change and `reset()`** — Prevents stale characters from surviving a programmatic reset.

- **Type-ahead announcement routed to bib root on mobile** — Screen readers now announce matches correctly in fullscreen mode.

- **Ctrl / Meta / Alt-chorded keys ignored in type-ahead and Space branches** — Keyboard shortcuts no longer accidentally arm the type-ahead buffer or toggle the bib.

- **Prefer prefix match over repeat-character cycle** — When two matching strategies are both available, the more predictable prefix match wins.

- **Duplicate "selected" announce silenced on bib open** — Screen readers no longer double-announce the current selection when the bib opens.

- **`multiSelect` picks preserved on valueless option click** — Clicking an option without a `value` attribute no longer wipes the current multi-select selection.

- **Guard against external mutation of multi-select state** — [AB#1560488](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560488)

    The `optionSelected` array is cloned when read externally, preventing external code from silently corrupting internal state.

- **Trigger label refreshes on menu value-match failure** — [AB#1560488](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560488)

    When the menu can't match a programmatic value, the trigger label is refreshed instead of holding onto a stale display value.

- **Label observer scoped to slotted node and rewired on reconnect** — Runtime accessible-name updates now work correctly even after the component is disconnected and reconnected.

- **`multiSelect` toggle announces the changed option** — Screen readers hear which option was added or removed on multi-select changes.

- **Native `change` event guarded in `multiSelect` mode** — Prevents spurious internal state updates in multiselect flows.

- **Autofill divergence handled in `multiSelect`** — Autofilled values no longer leave the hidden native select and visible bib out of sync.

- **First-keystroke type-ahead no longer opens to intermediate active option** — On the first type-ahead keystroke, the select opens directly on the matching option.

- **Double activation on End / Home open prevented** — Fixed a bug where the bib could receive two activations on open.

### AURO-MENU

- **XSS-safe DOM manipulation in match highlighting** — `matchWord` handling now uses safe DOM APIs, preventing HTML injection through option content.

- **Selection handling normalizes null, undefined, and empty values** — Fixed multiple edge cases where these values could desync selection state.

- **Change detection compares selected options as sets** — Eliminates false-positive change events when the same set of options is selected in a different order.

- **Nested menus reinitialize on content change** — Nested `auro-menu` elements now correctly refresh accessibility attributes when their contents change.

- **Selection state no longer desyncs in `handleClick`** — Fixed a race that could leave `optionSelected` out of sync with the visible selection.

- **Duplicate `selection change` events removed** — Selection change notifications are streamlined to fire exactly once per change.

- **`selectValueFailure` guarded during item initialization** — Prevents the event from firing before items are ready.

- **Value normalization tolerates non-string and malformed JSON** — Selection handling no longer throws on unexpected value shapes.

- **Author-set `size` / `shape` preserved on `auro-menuoption`** — Propagation from parent menu no longer overwrites options that set their own sizing.

- **`noCheckmark` propagates consistently through nested menus** — Nested menus now honor the parent's `noCheckmark` value.

- **Array values stringified for attribute reflection** — Array-typed values are now correctly reflected as string attributes.

### AURO-DATEPICKER

- **Timezone-safe value handling** — Values are no longer directly converted to `Date`, avoiding day-shift bugs caused by timezone offsets.

- **Out-of-range cells properly disabled** — Cells outside the allowed range no longer appear interactive.

- **Cell ARIA strings localized** — Cell labels honor the active locale.

- **Range mode: no calendar update on cell click** — [AB#1553712](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1553712)

    Clicking a cell while in range-selection mode no longer triggers an unwanted calendar re-render.

- **Calendar month height corrected** — All calendar month grids now render at a consistent, correct height.

- **Grid width enforced** — Prevents layout drift in months with fewer than six visible rows.

- **Disabled cells cannot be activated** — Keyboard navigation no longer allows activation of disabled cells.

- **Improved scrolling behavior for active cell in mobile view** — The active cell scrolls into view reliably.

- **Focus ring flash suppressed on `activeCell`** — Focus handling on the grid no longer produces a flash of the focus ring during navigation.

- **`lastHoveredDate` corrected on button-driven month navigation** — Hover preview state is preserved correctly when the user changes months by clicking the next/previous button.

- **Range corners clipped for border radius on range-start cell** — Border radius on the first day of a range now renders correctly.

- **Fullscreen toggle rendering fix** — [AB#1553712](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1553712)

    Fixed a rendering issue when toggling in and out of fullscreen mode.

### AURO-INPUT

- **Firefox: native number-input spinners hidden** — [AB#1588304](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1588304)

    Matches the existing Chrome/Safari behavior — Firefox's native spinners are now hidden.

- **iMask cursor throw on credit-card format change** — [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)

    Prevented an iMask cursor throw when switching between credit-card format masks.

- **Partial date validation** — Partial date values entered in a date-typed input are now validated correctly.

- **Multi-level `displayValue` slot content resolved** — Slotted content nested more than one level deep is now honored.

- **`maskInstance` nulled after destroy** — Prevents a dangling reference after the input is disconnected.

- **Whitespace and leading/trailing special characters removed on format** — Input normalization now handles these edge cases.

- **`i18n` helptext removed from date input** — The autogenerated helptext no longer appears on a `type="date"` input; consumers own the helptext string.

- **Deprecation message format updated and ESLint rules cleaned up** — Consistent, machine-parseable deprecation messages.

- **Dead code removed, date edge cases tested, explicit format preserved on locale change** — Explicit `format` values are no longer overwritten by a locale change.

- **Selection-range error handling simplified** — Reduces the surface area of the internal try/catch when setting selection ranges.

### AURO-INPUT / FORM-VALIDATION

- **Datepicker range validity unblocked** — [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)

    Fixed an input + form-validation interaction that prevented range datepickers from validating correctly.

### AURO-FORM

- **`_initialValues` migrates across runtime field renames** — Renaming a field's `name` attribute at runtime no longer loses its captured initial value.

- **Captured `null` initial values preserved** — Explicit `null` initial values now survive `initializeState` re-runs.

- **Listeners attach to fields that gain a `name` after initial render** — Fields whose `name` attribute is set after initial render are now tracked correctly.

### AURO-DROPDOWN

- **`aria-haspopup="listbox"` on combobox trigger** — Assistive technology correctly identifies the combobox trigger's popup type.

- **`aria-haspopup` reflects trigger focusability** — Only focusable triggers advertise a popup.

- **Focus returns to trigger when dropdown is closed** — Focus reliably returns to the trigger after the dropdown closes.

### AURO-COUNTER

- **Chromium dropdown auto-close prevented** — Fixed an interaction that could cause the counter's dropdown to auto-close in Chromium browsers.

### GENERAL

- **Keyboard functionality and docs gap-close** — [AB#1550261](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1550261)

    Addresses several gaps between the components (combobox, select) and the shared keyboard-behavior specification, plus corresponding documentation updates.

## Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-DATEPICKER

- **Compressed open-cycle timers** — Four overlapping timers per open cycle have been consolidated for lower CPU work per open.

- **Memoized `computeActiveDate`** — Avoids repeat calculation on renders that don't change the active date.

- **`isBlackout` runs in constant time per render** — Previously O(N) per render; now memoized against the blackout array reference.

- **Single-day range hover preview** — Hovering a date in range mode now previews a single-day range when appropriate.

- **`aria-current="date"` on today cell** — Screen readers now announce today's cell.

- **`aria-roledescription="calendar"` on the grid** — Assistive technology correctly identifies the calendar region.

- **Range preview announces to assistive technology during selection** — Live-region updates emit as the user builds a range.

- **`@default` tags added to ten property JSDocs** — Improves IDE tooling and generated API docs.

### AURO-COMBOBOX

- **`getOptionLabel` no longer clones the DOM per keystroke** — Significant CPU savings during rapid typing.

- **Double filter write per keystroke eliminated** — Only one filter write per keystroke now.

- **Simplified `bibNeedsSync` condition** — Cleaner value-sync path.

- **iMask throw can no longer strand `_syncingDisplayValue`** — Robust to iMask errors mid-sync.

- **Improved detection of user-initiated input changes** — More reliable distinction between programmatic and user changes.

- **`aria-expanded` correctness** — Attribute now updates in the right order relative to state changes.

- **Double screen-reader announce eliminated** — Selection announcements fire exactly once.

- **`menu.optionSelected` no longer holds stale write-back** — Prevents cross-render selection leaks.

### AURO-SELECT

- **Type-ahead buffer clears on Escape and blur** — Buffer state is no longer sticky across focus loss.

- **`updateDisplayedValue` skipped on valueless click with no prior selection** — Avoids unnecessary work.

- **Label observer scoped to the slotted node** — Reduces observer overhead.

- **`getActiveOptions` extracted to `selectUtils`** — Shared helper cleaner across the codebase.

- **Type-ahead timeout buffer reset delegated to a shared function** — DRY for the type-ahead reset path.

- **Type-ahead uses `textContent` instead of `innerText`** — Faster and layout-independent.

### AURO-INPUT

- **Input value-object getters aligned with datepicker patterns** — Consistent shape across the two components makes shared logic simpler.

- **`aria-pressed` on show-password button** — Toggle state announced correctly.

## Documentation

- **Localization docs cleanup** — [AB#1428414](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1428414)

    Comprehensive cleanup of localization docs for input and datepicker, plus new shape/layout localization pages.

- **CSS-only pages** — New CSS-only usage pages have been added for components.

- **`auro-form` documentation updated** — Fills gaps in form-level API docs, adds a v6 behavior-changes section to the customize page, and improves the column layout example structure.

- **`setCustomValidityPatternMismatch` documented on `auro-input`** — API is now surfaced in the docs.

- **Select customization: submenu support documented** — Adds submenu content to the select customization docs.

- **Select: "None" option pattern documented** — [AB#1589552](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1589552)

    Documents the recommended pattern for offering a "None" option to clear a selection.

- **Select `MANUAL_TESTING` filled in** — Coverage for type-ahead, a11y announcements, and fullscreen Tab focus behavior added.

- **Keyboard-behavior notes for Meta and Alt keys** — Cross-platform Windows/macOS behavior documented.

## Testing

- **Datepicker: leap-year, DST, timezone, and `toFormattedValue` coverage** — Substantial expansion of edge-case coverage for the new keyboard/locale work.

- **Pre-5.9 menu test baseline restored** — [AB#1560481](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560481)

    Menu test baseline re-established for the architectural revert.

- **5.9-only multi-select tests quarantined** — Tests that only make sense under the 5.9 architecture are isolated to a quarantine directory.

- **XSS-safety and `noCheckmark` propagation tests added on `auro-menu`** — Locks in the safe-DOM-manipulation and propagation fixes.

- **Framework-integration test gaps closed** — [AB#1560490](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1560490)

    Combobox + menu framework tests filled to catch React/Svelte-specific regressions.

- **Type-ahead test coverage** — Static-no-options, Space-stays-a-toggle, and dynamic disable-mid-typing cases covered on `auro-select`.

- **Design-token CSS served locally in tests** — [AB#1568829](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1568829)

    Replaces CDN fetches to eliminate a class of CI flake.

- **CI: split per-component and per-framework test jobs** — [AB#1568829](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1568829)

    Parallelizes CI and isolates failures to their owning component or framework.

- **Playwright cached via `additional-build-command`** — [AB#1568829](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1568829)

    Speeds up CI runs by caching Playwright browser binaries.

- **Playwright version bumped to unblock Node 24.16+** — [AB#1568829](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1568829)

    `@playwright/test` and `playwright` bumped to `^1.60.0`.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v5.12.1</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/05.12.01.md) -->
<!-- The below content is automatically added from ./docs/releases/05.12.01.md -->

# Release Notes

## Bug Fixes

- **Correct typos and form index page imports** — Fixed minor typos and corrected imports on the form index documentation page.

## Chores

- **Remove docProcessor from build-tools** — Deleted `docProcessor.mjs` (moved to auro-library), removed its export from the build-tools package, and stripped the optional demo JS bundling from the rollup config. Removed stale `api.min.js` script tags from all component demo HTML files. Added `customize.js` and `getting-started.js` for the form component. Updated `turbo.json` with explicit auro-form build dependencies and cleaned up root `package.json` devDependencies.

## Documentation

- **Update docs to work in new CLI system** — Updated documentation files across components to be compatible with the new CLI-based doc system.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v5.12.0</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/05.12.00.md) -->
<!-- The below content is automatically added from ./docs/releases/05.12.00.md -->

# Release Notes

This document outlines all changes since the 5.10.0 release.

## Migration Guide

1. **auro-datepicker — Update slot names for screen reader labels**
    - Remove any `bib.fullscreen.dateLabel` slot content.
    - Add `fromLabel` and `bib.fullscreen.fromLabel` slots (and `toLabel` / `bib.fullscreen.toLabel` if using `range`) to all `<auro-datepicker>` elements.

1. **auro-dropdown — Remove `disableFocusTrap` attribute**
    - The `disableFocusTrap` attribute has been removed. It can be safely deleted from any `<auro-dropdown>` usage — focus trapping is now managed automatically.

1. **auro-counter — `value` property expects a numeric string**
    - The `value` property now expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are normalized to `undefined`.

## Features

### AURO-FORM

- **Smarter form submission** [AB#1485830](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485830)

    Pressing the `Enter` key while focus is inside a form (e.g. focus in an auro-input) now submits the form.

    **Migration Guide:** _No changes required._

### AURO-DATEPICKER

- **Improved date picker labels** [AB#1398255](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1398255)

    The datepicker better implements ARIA labeling, making it easier to understand for people using screen readers, particularly when using the `snowflake` layout.

    **Migration Guide:**

    1. Remove any defined `bib.fullscreen.dateLabel` slot content.
    1. It is now *required* to use the `fromLabel` and `bib.fullscreen.fromLabel` slots (and the `toLabel` and `bib.fullscreen.toLabel` slots if using `range`) in order to ensure screen reader support with all `<auro-datepicker>` elements of any layout. Add slot content as necessary.

        ```diff
        <auro-datepicker range layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
            <span slot="ariaLabel.bib.close">Close Calendar</span>
            <span slot="label">Dates</span>
            <span slot="bib.fullscreen.headline">Datepicker Headline</span>
        -   <span slot="bib.fullscreen.dateLabel">Choose a date</span>
        +   <span slot="fromLabel">Choose a date</span>
        +   <span slot="toLabel">To Date Test</span>
        +   <span slot="bib.fullscreen.fromLabel">Choose a date</span>
        +   <span slot="bib.fullscreen.toLabel">To Date Test</span>
        </auro-datepicker>
        ```

- **Input event for value tracking**

    The datepicker now dispatches an `input` event when the value changes, making it easier to track value updates in real time.

    **Migration Guide:** _No changes required._

### AURO-COMBOBOX/COUNTER/DATEPICKER/DROPDOWN/SELECT

- **Keyboard handling overhaul**

    All dropdown-based components now have consistent, well-defined keyboard interactions following WAI-ARIA patterns:

    - **auro-combobox** — ArrowUp/Down to navigate options, Enter to select, Tab to cycle through the clear button in fullscreen mode, Escape to close and return focus to the trigger
    - **auro-counter** — ArrowUp to increment, ArrowDown to decrement when the counter is focused
    - **auro-datepicker** — Escape closes the calendar; other keyboard events controlling the behavior of the dropdown and content within are now restricted
    - **auro-dropdown** — Enter/Space to toggle open/close, Escape to close, Tab to move through focusable content within the dropdown
    - **auro-select** — ArrowUp/Down to navigate options, Enter to select, Space to open, Home/End to jump to first/last option, Tab to select-and-close, type-ahead character search

    **Migration Guide:**

    1. The `disableFocusTrap` attribute on `auro-dropdown` has been removed. If you were using this attribute, it can be safely removed — focus trapping is now managed automatically.

        ```diff
        - <auro-dropdown disableFocusTrap> ... </auro-dropdown>
        + <auro-dropdown> ... </auro-dropdown>
        ```

    1. The `value` property on `auro-counter` expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are now normalized to `undefined`.

### AURO-DROPDOWN

- **`disableKeyboardHandling` attribute**

    A new `disableKeyboardHandling` attribute has been added. If set, the dropdown will not handle any keyboard events internally, and you are responsible for managing keyboard interactions on the dropdown content.

    **Migration Guide:** _No changes required._

### AURO-MENUOPTION

- **`noMatch` property for empty state**

    A new `noMatch` property on `auro-menuoption` allows it to serve as a "no matching results" placeholder. Options with `noMatch` set will not be highlighted or selectable when all regular options are filtered out.

    **Migration Guide:** _No changes required._

## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Mobile VoiceOver click through** — [AB#1385830](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1385830)

    Fixed an issue where a user could interact with page content behind a dropdown bib while using VoiceOver accessibility tools on a mobile device.

- **Mobile scroll lock** — [AB#1490375](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1490375)

    Fixed a bug where the page would get stuck and unable to scroll after closing a dropdown on a mobile device, including when using the browser back button.

- **Screen reader support in fullscreen mode** — [AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392)

    Dropdown-based components now correctly announce option navigation and selection to screen readers when displayed in fullscreen (mobile) mode.

- **Escape no longer closes parent dialogs and drawers**

    Pressing Escape to close a dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container. Only the dropdown itself closes.

- **Support inside dialog and drawer components**

    Dropdown and select components now work correctly when placed inside `auro-dialog` and `auro-drawer`.

- **Consistent Tab and Enter focus behavior** — [AB#1528762](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528762)

    Fixed inconsistent focus movement when tabbing through and pressing Enter on dropdown-based components.

- **Support for container query enabled content** — [AB#1514679](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1514679)

    Dropdown components now work correctly when placed inside container query enabled content, such as elements using Tailwind CSS's `@container` class.

- **Mobile dropdown close on tap** — [AB#1536433](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1536433)

    Fixed an issue where tapping outside a dropdown on mobile did not close it reliably.

### AURO-COMBOBOX/SELECT

- **Menu selections with mobile device VoiceOver** — [AB#1467197](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1467197)

    Fixed an issue where mobile device VoiceOver users were unable to make menu selections.

### AURO-COMBOBOX

- **Async option load support**

    When options are loaded asynchronously (e.g., from an API), a programmatically set `value` is now preserved until the options arrive, then the matching option is selected automatically.

- **Value swap support**

    Programmatically swapping values between two comboboxes (e.g., origin/destination swap) now correctly updates both the internal state and the displayed input text.

- **Fullscreen bib stability** — [AB#1485868](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485868)

    Fixed issues where the fullscreen bib could close prematurely when clearing input or could fail to reopen after being closed.

- **Emphasized layout in fullscreen**

    The `emphasized` layout color no longer incorrectly appears in the fullscreen dialog input.

- **Arrow keys no longer move the text cursor**

    When the dropdown is open and you press ArrowUp/Down to navigate through options, the text cursor in the input field no longer jumps to the beginning or end of the text.

- **Alt/Meta + ArrowUp/Down supported** — [AB#1528758](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528758)

    When the dropdown is open, pressing Alt+ArrowDown or Cmd+ArrowDown jumps to the last rendered option, and Alt+ArrowUp or Cmd+ArrowUp jumps to the first rendered option. Disabled options are skipped.

- **Arrow keys no longer skip nested menus** — [AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)

    Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.

- **Active option updates after filtering** — [AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)

    When available options change due to input filtering, the visually highlighted option is recalculated. If the previously highlighted option is no longer visible, the first available option is highlighted.

- **Trailing whitespace no longer breaks filtering** — [AB#1520589](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1520589)

    When editing input text using cursor keys and backspace, residual trailing whitespace no longer causes the filter to fail to match options.

- **Value updates on input** — [AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)

    In default `suggestion` mode, the `value` property now updates in real time as the user types, regardless of whether the text matches an available option.

- **Reselecting a pre-selected option no longer deselects it**

    Clicking an already-selected option no longer toggles it off.

- **`noMatch` options are not marked active**

    When all regular options are filtered out, `noMatch` placeholder options are no longer visually highlighted as active.

### AURO-INPUT

- **Credit card autofill** — [AB#1481792](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1481792)

    Fixed a bug where auto-filling a credit card number could trigger a false validation error.

- **Clear button resets validity**

    Clicking the clear button now resets the input's validation state, preventing stale error messages from remaining visible after clearing the field.

### AURO-COUNTER

- **Screen reader accessibility** — [AB#1443553](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1443553)

    The `<auro-counter>` component now announces the correct numeric value to screen readers.

- **VoiceOver swipe gestures work in counter-group dropdown** — [AB#1516615](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1516615)

    On mobile devices using VoiceOver, swiping up and down now correctly increments and decrements counter values inside a counter-group dropdown.

- **Removed unsupported aria tag** — [AB#1516613](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1516613)

    Removed an unsupported ARIA attribute that could cause screen reader confusion.

- **Counter-group initializes with correct trigger value**

    The counter-group now calculates and displays the correct total in the trigger as soon as its counters are first rendered.

### AURO-DATEPICKER

- **Calendar month navigation** — [AB#1530050](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1530050)

    Fixed a bug where pressing the next/previous month button could skip a month.

- **`referenceDates` format consistency** — [AB#1485868](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485868)

    The `referenceDates` property now uses the same date format as other date values for consistency. Backward compatibility with the previous format is maintained.

- **Calendar closes on focus loss** — [AB#1528738](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528738)

    The datepicker calendar now properly closes when focus leaves the component.

- **Input clear button no longer reopens the calendar**

    Clicking or pressing Enter/Space on the input's clear button no longer triggers the calendar to reopen.

- **Out-of-range dates no longer appear interactive** — [AB#1494448](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494448)

    When a user types a date outside the allowed min/max range, the corresponding calendar cell now correctly appears disabled with no hover styles.

### AURO-DROPDOWN

- **Disabled state announced to assistive technology**

    The dropdown trigger now correctly communicates `aria-disabled` when the `disabled` attribute is set.

- **Fullscreen mode works with late-loading stylesheets**

    The mobile breakpoint is now resolved lazily, fixing an issue where fullscreen mode failed to activate in WebKit when external stylesheets hadn't loaded yet.

### AURO-MENU

- **Disabled menu prevents selection**

    Clicking an option inside a disabled menu no longer selects it.

- **Consistent option height when selecting and deselecting**

    Selected menu options displaying a checkmark icon no longer cause a visible height shift. All options maintain a consistent height regardless of selection state.

### AURO-SELECT

- **Focus returns to trigger after click selection** — [AB#1528057](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528057)

    After selecting an option by clicking it, focus now reliably returns to the dropdown trigger.

- **Enter no longer blocks form submission**

    When the dropdown is closed, pressing Enter is no longer consumed by the select, allowing native form submission to proceed.

- **Arrow keys no longer skip nested menus** — [AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)

    Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.

- **Option selection works on first Enter press**

    Selecting an option with the keyboard no longer requires pressing Enter twice.

- **Prevent deselect on single-select**

    Selecting an already-selected option in single-select mode no longer deselects it.

- **`value` property respected on hot reload** — [AB#1483855](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1483855)

    The select component now correctly responds to changes to the `value` property during a hot reload, ensuring the displayed selection stays in sync with the programmatic value.

### GENERAL

- **Clear button key events no longer propagate** — [AB#1510818](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1510818)

    Key events on input and datepicker clear buttons no longer bubble up to parent components, preventing unintended dropdown opening or option selection.

- **`id` attribute preserved in Svelte** — [AB#1551040](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1551040)

    The `id` attribute is now reflected inline so it is no longer removed during Svelte component updates.

- **Breakpoint values use design tokens**

    Mobile breakpoint values now use design tokens for consistency across components.

## Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Better focus management**

    When a popup panel closes, your focus is reliably returned to the right place on the page.

- **Keyboard navigation**

    Tabbing through auro-select, auro-combobox, and auro-datepicker now behaves more consistently and predictably across an entire form.

### AURO-SELECT

- **Smoother scrolling** [AB#1489578](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1489578)

    When opening the bib, the selected item is automatically scrolled into view so users don't have to hunt for it.

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Fullscreen screen reader support**

    Dropdown-based components are now fully screen reader compatible in both desktop and mobile/fullscreen viewports.

### AURO-COMBOBOX/SELECT

- **Option list scrolls when it exceeds available space**

    Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

## Documentation

- **Comprehensive component docs** — Documentation for all components has been rewritten or significantly expanded, including new or improved pages for [combobox](https://auro.alaskaair.com/components/auro/combobox/getting-started), [select](https://auro.alaskaair.com/components/auro/select/getting-started), [input](https://auro.alaskaair.com/components/auro/input/getting-started), [datepicker](https://auro.alaskaair.com/components/auro/datepicker/getting-started), [counter](https://auro.alaskaair.com/components/auro/counter/getting-started), [dropdown](https://auro.alaskaair.com/components/auro/dropdown/getting-started), [form](https://auro.alaskaair.com/components/auro/form/getting-started), [menu](https://auro.alaskaair.com/components/auro/menu/getting-started), [checkbox](https://auro.alaskaair.com/components/auro/checkbox/getting-started), and [radio](https://auro.alaskaair.com/components/auro/radio/getting-started).

- **Keyboard behavior documentation** — Added detailed keyboard interaction guides covering dropdown, combobox, counter, datepicker, and select components, aligned with the keyboard handling overhaul.

- **Accessibility documentation** — New accessibility pages added for select, including a VoiceOver demo page. HTML encoding issues in accessibility docs have been fixed.

- **Manual testing guides** — Added and updated manual testing documentation for multiple components, including a flight search planbook.

- **Customization content** — Customization documentation has been separated into its own dedicated page for easier discovery.

- **API page fixes** — Fixed broken API pages and added missing JSDoc comment blocks and event documentation (notably for auro-form and auro-menuoption).

- **Restructured page layout** — Doc pages have been restructured for better responsiveness and navigation, with the "layout" page renamed to "design" and README content updated across components.

## Testing

- **Cross-framework Playwright test suite** — A new shared test architecture runs the same 20 Playwright test suites against both React and Svelte framework apps, validating that all components behave identically regardless of the consuming framework.

- **Significant coverage expansion** — Over 26,000 net new lines of test code across 82 component-level test files, covering keyboard interactions, accessibility, screen reader announcements, slot rendering, public/private functions, and visual regression scenarios.

- **Accessibility testing** — Added Playwright-native accessibility tree assertions to validate screen reader behavior in both desktop and fullscreen (mobile) viewports.

- **Storybook interaction tests** — New Storybook tests added for multiple components, providing visual regression and interaction coverage that runs in CI.

- **Keyboard strategy unit tests** — Dedicated unit tests for the shared keyboard utility, verifying handler registration, context passing, and key dispatch behavior.

- **Flakiness improvements** — Multiple passes to eliminate flaky tests in CI, including increased timeouts, proper element-ready waits, and guards against race conditions in bib-ready state detection.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v5.11.1</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/05.11.01.md) -->
<!-- The below content is automatically added from ./docs/releases/05.11.01.md -->

# Release Notes — Keyboard Maps

## Migration Guide

This release includes changes that may require code updates beyond simply updating to the latest package version.

### 1. `disableFocusTrap` removed (auro-dropdown)

The `disableFocusTrap` attribute on `auro-dropdown` has been removed. If you were using this attribute, it can be safely removed from your markup — focus trapping is now managed automatically.

```html
<!-- Remove this attribute, no replacement needed -->
<auro-dropdown disableFocusTrap> ... </auro-dropdown>
```

### 2. Counter `value` property type coercion

The `value` property on `auro-counter` expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are now normalized to `undefined`. If you were setting `value` to arbitrary strings, those will now resolve to `undefined`.

---

## New Features

### Keyboard handling overhaul

All dropdown-based components now have consistent, well-defined keyboard interactions following WAI-ARIA patterns:

- **auro-combobox** — ArrowUp/Down to navigate options, Enter to select, Tab to cycle through the clear button in fullscreen mode, Escape to close and return focus to the trigger
- **auro-counter** — ArrowUp to increment, ArrowDown to decrement when the counter is focused
- **auro-datepicker** — Escape closes the calendar; other keyboard events controlling the behavior of the dropdown and content within is now restricted. Full calendar keyboard navigation is planned for a future release as part of a component redesign.
- **auro-dropdown** — Enter/Space to toggle open/close, Escape to close, Tab to move through focusable content within the dropdown
- **auro-select** — ArrowUp/Down to navigate options, Enter to select, Space to open, Home/End to jump to first/last option, Tab to select-and-close, type-ahead character search

### Keyboard behavior documentation

New documentation for keyboard interactions has been added to each component, including detailed key-by-key behavior tables and interactive demos.

- [auro-combobox](https://auro.alaskaair.com/components/auro/combobox/keyboard)
- [auro-counter](https://auro.alaskaair.com/components/auro/counter/keyboard)
- [auro-counter-group](https://auro.alaskaair.com/components/auro/counter-group/keyboard)
- [auro-datepicker](https://auro.alaskaair.com/components/auro/datepicker/keyboard)
- [auro-dropdown](https://auro.alaskaair.com/components/auro/dropdown/keyboard)
- [auro-select](https://auro.alaskaair.com/components/auro/select/keyboard)

> Additional components will be added in a future update.

### `disableKeyboardHandling` attribute (auro-dropdown)

A new `disableKeyboardHandling` attribute has been added. If set, the dropdown will not handle any keyboard events internally, and you are responsible for managing keyboard interactions on the dropdown content.

```html
<auro-dropdown disableKeyboardHandling> ... </auro-dropdown>
```

---

## Bug Fixes

### auro-combobox

- **A11Y**
  - **Screen reader support in fullscreen mode** ([AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392) - Reported by: Dale Sande) — Combobox now correctly announces option navigation and selection to screen readers when displayed in fullscreen (mobile) mode. Previously, announcements could be missed because the trigger area was inert while the fullscreen dialog was open.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the combobox dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Arrow keys no longer move the text cursor** — When the dropdown is open and you press ArrowUp/Down to navigate through options, the text cursor in the input field no longer jumps to the beginning or end of the text. The cursor stays in place while the option highlight moves.
  - **Alt/Meta + ArrowUp/Down supported** ([AB#1528758](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528758)) — When the dropdown is open, pressing Alt+ArrowDown or Cmd+ArrowDown jumps to the last rendered option, and Alt+ArrowUp or Cmd+ArrowUp jumps to the first rendered option. Disabled options are skipped. Without a modifier, arrow keys continue to move one option at a time.
  - **Arrow keys no longer skip nested menus** ([AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)) — Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.
- **UI/UX**
  - **Active option updates after filtering** ([AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)) — When available options change due to input filtering, the visually highlighted (focused, not selected) option is recalculated. If the previously highlighted option is no longer visible, the first available option is highlighted.
  - **Trailing whitespace no longer breaks filtering** ([AB#1520589](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1520589)) — When editing input text using cursor keys and backspace, residual trailing whitespace could remain in the input value (e.g., `"a "` instead of `"a"`), causing the filter to fail to match options. The input value is now trimmed correctly so filtering works as expected.
  - **Value updates on input**([AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)) — Combobox behaves as a suggestion list by default, meaning any value typed in the input is valid and options are provided as suggestions. Previously, when a user typed text that didn't match any option, the combobox `value` property remained unchanged (stuck on the last selected option or empty). Now the `value` property updates in real time as the user types, regardless of whether the text matches an available option. This allows forms to capture free-text input from comboboxes. Note: this does not apply when `behavior="filter"` is set — in filter mode, the combobox requires an option to be selected for the value to update, and will fail validation if no option is selected.
  - **Fullscreen close no longer steals focus** — Previously, closing the combobox in desktop mode would force focus back to the input, even if the user had already moved focus elsewhere (e.g., by clicking on another element). Now focus is only explicitly returned to the input when closing a fullscreen (mobile) combobox, which requires it because the fullscreen dialog takes over the page. In desktop mode, the browser's natural focus behavior is preserved.
  - **Option list scrolls when it exceeds available space** — Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

### auro-counter

- **A11Y**
  - **VoiceOver swipe gestures work in counter-group dropdown** ([AB#1516615](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1516615) - Reported by: Dale Sande) — On mobile devices using VoiceOver, swiping up and down now correctly increments and decrements counter values inside a counter-group dropdown. Previously, these gestures had no effect.
- **Events**
  - **Value updates fire correctly** — Counter components now reliably trigger value updates and input events.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the counter-group dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Tab navigation within counter-group dropdown** — When a counter-group is displayed inside a dropdown, individual counters can now be tabbed through correctly. Previously, focus would get stuck on the first counter and not advance to subsequent counters.
- **UI/UX**
  - **Counter-group initializes with correct trigger value** — Previously, the counter-group's trigger text could appear empty or stale on initial render. The counter-group now calculates and displays the correct total in the trigger as soon as its counters are first rendered. This is particularly important when presetting counter values in the group, as the trigger now reflects the preset totals immediately without requiring user interaction.

### auro-datepicker

- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the datepicker calendar inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
- **UI/UX**
  - **Calendar closes on focus loss** ([AB#1528738](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528738)) — The datepicker calendar now properly closes when focus leaves the component, with correct handling of fullscreen transitions.
  - **Input clear button no longer reopens the calendar** — Clicking or pressing Enter/Space on the input's clear button no longer triggers the calendar to reopen.
  - **Focus restored correctly after closing fullscreen** — Previously, closing the fullscreen calendar would always pull focus back to the datepicker input, even if the user had already tabbed to another element on the page. Now focus is only returned to the input when the calendar is closed by an explicit action like pressing Escape or selecting a date.
  - **Out-of-range dates no longer appear interactive in the calendar** ([AB#1494448](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494448)) — When a user types a date outside the allowed min/max range into the input and then opens the calendar, the corresponding date cell now correctly appears disabled. Previously, hovering over that date displayed interactive hover styles, implying it could be selected.

### auro-dropdown

- **A11Y**
  - **Disabled state announced to assistive technology** — The dropdown trigger now correctly communicates `aria-disabled` when the `disabled` attribute is set.
- **UI/UX**
  - **Fullscreen mode works with late-loading stylesheets** — The mobile breakpoint is now resolved lazily, fixing an issue where fullscreen mode failed to activate in WebKit when external stylesheets hadn't loaded yet at component initialization.
  - **`noToggle` example no longer breaks other dropdowns** ([AB#1494298](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494298)) — Interacting with a `noToggle` dropdown no longer causes other dropdowns on the same page to stop functioning correctly.

### auro-menu

- **UI/UX**
  - **Consistent option height when selecting and deselecting** — Previously, selected menu options displaying a checkmark icon were slightly taller than deselected options without the icon, causing a visible height shift when toggling selections. All options now maintain a consistent height regardless of selection state.

### auro-select

- **A11Y**
  - **Screen reader support in fullscreen mode** ([AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392) - Reported by: Dale Sande) — Select now correctly announces option navigation and selection to screen readers when displayed in fullscreen (mobile) mode. Previously, announcements could be missed because the trigger area was inert while the fullscreen dialog was open.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the select dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Enter no longer blocks form submission** — When the dropdown is closed, pressing Enter is no longer consumed by the select, allowing native form submission to proceed.
  - **Enter no longer silently toggles selection in multiselect** ([AB#1528031](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528031)) — In multiselect mode, pressing Enter while the dropdown was closed would toggle the last highlighted option without opening the dropdown. Now pressing Enter opens the dropdown as expected instead of silently modifying the selection.
  - **Arrow keys no longer skip nested menus** ([AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)) — Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.
  - **Keyboard works immediately** — Select keyboard handling now works reliably as soon as the component renders.
  - **Option selection works on first Enter press** — Selecting an option with the keyboard no longer requires pressing Enter twice. Previously, the first Enter press only closed the dropdown without committing the selection, requiring a second Enter press to actually select the option. Now a single Enter press selects the highlighted option and closes the dropdown in one action.
- **UI/UX**
  - **Prevent deselect on single-select** — Selecting an already-selected option in single-select mode no longer deselects it.
  - **`value` property respected on hot reload** ([AB#1483855](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1483855) - Reported by: Mitchel Spears) — The select component now correctly responds to changes to the `value` property during a hot reload, ensuring the displayed selection stays in sync with the programmatic value.
  - **Option list scrolls when it exceeds available space** — Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

### All dropdown-based components (select, combobox, datepicker, counter-group)

- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close a dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container. Only the dropdown itself closes; the dialog or drawer remains open.
- **UI/UX**
  - **Support for container query enabled content** ([AB#1514679](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1514679) - Reported by: Caleb Wells) — Dropdown components now work correctly when placed inside container query enabled content, such as elements using Tailwind CSS's `@container` class. Previously, `contain: layout` on an ancestor could prevent the dropdown popover from rendering in the correct position.

### General

- **Events**
  - **Input clear button key events no longer propagate** ([AB#1510818](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1510818)) — Key events on input and datepicker clear buttons no longer bubble up to parent components, preventing unintended dropdown opening or option selection. In combobox and select, this means pressing ArrowUp/Down while the clear button is focused no longer opens the dropdown.

- **Keyboard Behavior**
  - **Consistent Tab and Enter focus behavior** ([AB#1528762](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528762)) — Fixed inconsistent focus movement when tabbing through and pressing Enter on dropdown-based components.

- **UI/UX**
  - **Focus restored after closing fullscreen dropdowns** — Focus is properly returned to the trigger element when a fullscreen dropdown closes.

---

## Improvements

### Performance

- **Lazy breakpoint resolution** — Mobile breakpoint CSS tokens are now resolved on-demand instead of cached at component initialization, eliminating a race condition with external stylesheets in WebKit.

### Accessibility

- **Fullscreen screen reader support** — Dropdown-based components are now fully screen reader compatible in both desktop and mobile/fullscreen viewports.
- **Disabled dropdown announcement** — Disabled dropdowns now announce their state to assistive technology.

---

## Testing

### New and Changed Unit Tests

| Component | Rendering | User Stories | Properties | Slots | Public Functions | A11Y | Mouse Behavior | Keyboard Behavior | Total |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| checkbox | — | 3 new | 7 new | 5 new | — | — | 2 new | — | 17 new |
| combobox | 1 new | 18 new, 1 changed | 13 new | 8 new | 3 new | 7 new | 7 new | 29 new | 86 new, 1 changed |
| counter | — | — | — | 5 new | — | — | 4 new | 6 new | 15 new |
| datepicker | — | 4 new | 5 new | 10 new | — | — | — | 4 new | 23 new |
| dropdown | 1 new | — | 3 new | 3 new | — | 3 new | 1 new | 2 new | 13 new |
| form | — | — | — | 1 new | — | — | 2 new | — | 3 new |
| input | — | — | — | 7 new | — | — | — | — | 7 new |
| menu | 3 new | 16 new | 5 new | 3 new | 2 new | — | 1 new | 7 new | 38 new |
| radio | — | — | 3 new | 3 new | — | — | — | — | 6 new |
| select | — | — | — | 8 new | — | 4 new | 7 new | 32 new | 51 new |
| **TOTALS** | **5 new** | **41 new, 1 changed** | **36 new** | **53 new** | **5 new** | **14 new** | **24 new** | **80 new** | **259 new, 1 changed** |

### Storybook visual regression changes

Chromatic visual regression tests updated in 4 components. These are render-only tests used for visual regression testing.

| Component | Total Stories | New | Changed |
|:---|:---:|:---:|:---:|
| combobox | 13 | 3 | 2 |
| datepicker | 10 | — | — |
| menu | 8 | 6 | — |
| select | 12 | 2 | 5 |
| **TOTALS** | **43** | **11** | **7** |

### Framework integration tests

New Playwright tests validate that Auro web components work correctly when consumed through React and Svelte wrapper layers — not just in a vanilla JavaScript environment. These tests catch framework-specific issues such as components losing state after a virtual DOM re-render, event bindings failing across framework boundaries, or props not syncing after a remount. The initial suites below target recently reported React and Svelte integration issues; coverage will be expanded in future releases.

| Component | Tests | What it covers |
|:---|:---:|:---|
| auro-combobox | 4 | Initial rendering, value persistence across DOM remount, invalid value handling |
| auro-counter-group | 3 | Dropdown rendering, Tab/Shift+Tab focus management within the dropdown |
| auro-counter-group | 2 | Initial rendering with preset values, value persistence across DOM remount |
| auro-datepicker | 7 | Focus-loss behavior in fullscreen and non-fullscreen modes, keyboard contract for bib open/close |
| auro-select | 8 | Single-select and multiselect initial rendering, value persistence across DOM remount, invalid value handling |
| auro-counter | 2 | Initial rendering, value persistence across DOM remount |
| **TOTALS** | **26** | |

### Manual Test Plans

Manual test plans have been introduced to complement the automated test suite, providing structured verification of interactive behaviors that are difficult to validate programmatically.

- [checkbox](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/checkbox/test/MANUAL_TESTING.md)
- [combobox](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/combobox/test/MANUAL_TESTING.md)
- [counter](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/counter/test/MANUAL_TESTING.md)
- [datepicker](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/datepicker/test/MANUAL_TESTING.md)
- [dropdown](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/dropdown/test/MANUAL_TESTING.md)
- [form](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/form/test/MANUAL_TESTING.md)
- [input](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/input/test/MANUAL_TESTING.md)
- [menu](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/menu/test/MANUAL_TESTING.md)
- [radio](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/radio/test/MANUAL_TESTING.md)
- [select](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/select/test/MANUAL_TESTING.md)

> All manual test plans have been executed as part of this release and will be included in the release process going forward.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-accordion>
<span slot="trigger">FormKit v5.11.0</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/05.11.00.md) -->
<!-- The below content is automatically added from ./docs/releases/05.11.00.md -->

### Features

#### AURO-FORM

- **Smarter form submission** [AB#1485830](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485830)

    Pressing the `Enter` key while focus is inside a form (e.g. focus in an auro-input) now submits the form.

    **Migration Guide:** _No changes required._

#### AURO-DATEPICKER

- **Improved date picker labels** [AB#1398255](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1398255)

    The datepicker better implements ARIA labeling, making it easier to understand for people using screen readers, particularly when using the `snowflake` layout.

    **Migration Guide:**

    1. Remove any defined `bib.fullscreen.dateLabel` slot content.
    1. It is now *required* to use the `fromLabel` and `bib.fullscreen.fromLabel` slots (and the `toLabel` and `bib.fullscreen.toLabel` slots if using `range`) in order to ensure screen reader support with all `<auro-datepicker>` elements of any layout. Add slot content as necessary.

        ```diff
        <auro-datepicker range layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
            <span slot="ariaLabel.bib.close">Close Calendar</span>
            <span slot="label">Dates</span>
            <span slot="bib.fullscreen.headline">Datepicker Headline</span>
        -   <span slot="bib.fullscreen.dateLabel">Choose a date</span>
        +   <span slot="fromLabel">Choose a date</span>
        +   <span slot="toLabel">To Date Test</span>
        +   <span slot="bib.fullscreen.fromLabel">Choose a date</span>
        +   <span slot="bib.fullscreen.toLabel">To Date Test</span>
        </auro-datepicker>
        ```

### Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Mobile VoiceOver Click through** — [AB#1385830](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1385830)

    Fixed an issue where a user could interact with page content behind a dropdown bib while using VoiceOver accessibility tools on a mobile device.

- **Mobile scroll lock** — [AB#1490375](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1490375) 

    Fixed a bug where the page would get stuck and unable to scroll after closing a dropdown on a mobile device, including when using the browser back button. 

#### AURO-COMBOBOX/SELECT

- **Menu selections with mobile device VoiceOver** — [AB#1467197](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1467197)

    Fixed an issue where mobile device VoiceOver users were unable to make menu selections.

#### AURO-INPUT

- **Credit card autofill** — Fixed a bug where auto-filling a credit card number could trigger a false validation error. [AB#1481792](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1481792)

#### AURO-COUNTER

- **Screen reader accessibility** — The `<auro-counter>` component now announces the correct numeric value to screen readers. [AB#1443553](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1443553)

<!-- - **Reset behavior** — Clearing a dropdown selection now fully resets the field as expected. -->

### Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Better focus management**

    When a popup panel closes, your focus is reliably returned to the right place on the page.

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Keyboard navigation**

    Tabbing through auro-select, auro-combobox, and auro-datepicker now behaves more consistently and predictably across an entire form.

#### AURO-SELECT

- **Smoother scrolling** [AB#1489578](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1489578)

    When opening the bib, the selected item is automatically scrolled into view so users don't have to hunt for it.
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- INSERT CHANGELOG BELOW - NO HEADING LEVEL REQUIRED AS IT'S ALREADY IN THE SOURCE CONTENT -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./CHANGELOG.md) -->
<!-- The below content is automatically added from ./CHANGELOG.md -->

# Changelog

You can view a complete history of changes to this repository on the GitHub releases page:

https://github.com/AlaskaAirlines/auro-formkit/releases
<!-- AURO-GENERATED-CONTENT:END -->
</content>
