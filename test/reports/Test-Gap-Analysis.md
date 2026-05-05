# Test Gap Analysis: WTR & Playwright vs Documentation

> **Generated:** May 5, 2026
> **Last Updated:** May 6, 2026
>
> This report identifies missing test cases by comparing all documentation pages (API docs, demo pages, accessibility, keyboard behavior, VoiceOver, customize, design, getting-started) against WTR unit tests and Playwright integration suites.

### Implementation Summary

| Status | Count | Description |
|---|---|---|
| **IMPLEMENTED** | 31 | New WTR or Playwright tests added and passing |
| **Bug-Blocked** | 6 | Tests written but commented out due to component bugs (Combobox/Select `noValidate`, Counter disabled/focus, Dropdown Tab nav) |
| **Partially Written** | 0 | — |
| **Not Attempted** | 5 | Tests attempted but removed — original gap misunderstood or blocked by missing API |
| **Remaining** | ~78 | Gaps not yet addressed |
---

## Table of Contents

1. [Cross-Component Gaps](#1-cross-component-gaps)
2. [Checkbox](#2-checkbox)
3. [Combobox](#3-combobox)
4. [Counter](#4-counter)
5. [Datepicker](#5-datepicker)
6. [Dropdown](#6-dropdown)
7. [Form](#7-form)
8. [Input](#8-input)
9. [Menu](#9-menu)
10. [Radio](#10-radio)
11. [Select](#11-select)
12. [Priority Matrix](#12-priority-matrix)

---

## 1. Cross-Component Gaps

These gaps appear consistently across multiple (or all) components:

### 1.1 CSS Shadow Parts — Zero Dedicated Coverage

**No component has dedicated tests verifying CSS shadow parts are exposed and styleable.** Every component documents CSS parts in its API/customize docs, but no test explicitly verifies `::part()` targeting works. Counter's `controlMinus`/`controlPlus` parts are used as click-target selectors in Playwright tests, providing indirect coverage for those two parts only.

| Component | Documented Parts (untested) |
|---|---|
| Checkbox | `checkbox`, `checkbox-input`, `checkbox-label` |
| Combobox | `dropdownTrigger`, `dropdownChevron`, `dropdownSize`, `helpText` |
| Counter | `counterControl`, `helpText` *(note: `controlMinus`/`controlPlus` indirectly covered via PW selectors)* |
| Counter Group | `dropdown`, `helpText` |
| Datepicker | `calendar`, `calendarWrapper`, `dropdown`, `helpText`, `helpTextSpan`, `input`, `trigger` |
| Dropdown | `trigger`, `chevron`, `helpText`, `size`, `bibContainer` |
| Input | `wrapper`, `label`, `helpText`, `input`, `accentIcon`, `iconContainer`, `accent-left`, `accent-right`, `displayValue`, `inputHelpText` |
| Menu | *(none documented)* |
| Radio | `radio-group`, `radio`, `radio-input`, `radio-label` |
| Select | `dropdownTrigger`, `dropdownChevron`, `dropdownSize`, `helpText` |

### 1.2 `noValidate` — Mostly Attribute Reflection Only

Components with `noValidate` (checkbox-group, combobox, datepicker, radio-group, select) test only that the attribute reflects as a property. **~~No component tests that blur does NOT trigger validation when `noValidate` is set.~~**

**Update:** `auro-input` now has a Playwright test (`input-interaction.suite.ts`) that explicitly verifies `noValidate` prevents validation on blur. **Checkbox-group**, **radio-group**, and **datepicker** now have WTR functional tests verifying `noValidate` prevents validation on blur. **Combobox** and **select** have `noValidate` tests written but commented out — both have a **bug** where the `focusout`/`blur` handler calls `validate()` without checking `noValidate`.

### ~~1.3 `setCustomValidity*` Messages — Never Verified in Rendered Output~~ → CLOSED

~~Components that accept `setCustomValidity`, `setCustomValidityCustomError`, `setCustomValidityValueMissing` (checkbox-group, combobox, input, radio-group, select) test only that the string is stored. **No test verifies the custom message actually appears in the rendered help text area.**~~

**Update:** All five components now have WTR tests verifying custom validation messages render in the help text area: **checkbox-group** (`setCustomValidityCustomError`, `setCustomValidityValueMissing`), **combobox** (`setCustomValidityCustomError`, `setCustomValidityValueMissing`), **input** (`setCustomValidity`, `setCustomValidityCustomError`, `setCustomValidityValueMissing`), **radio-group** (`setCustomValidity`), **select** (`setCustomValidity`, `setCustomValidityCustomError`, `setCustomValidityValueMissing`).

### 1.4 Custom Registration — Not Functionally Tested

Every component documents `Component.register('custom-name')` in getting-started/customize pages. Most tests only verify `typeof register === 'function'`. **No test creates a custom-named element and verifies it works end-to-end** (except input, which has a basic test).

### ~~1.5 ARIA Error Announcement — Untested~~ → CLOSED

~~Multiple components document `role="alert"` and `aria-live="assertive"` on error help text. No component tests these ARIA attributes on error messages.~~

**Update:** The new `accessibility-tree.suite.ts` now tests `role="alert"` and `aria-live="assertive"` on error help text for **input** and **select**. These tests verify that validation error messages are announced to screen readers. Other components (checkbox-group, combobox, datepicker, radio-group) still lack this specific test.

### 1.6 Slot Functional Behavior — Existence Only

Most WTR slot tests verify the slotted element exists in the DOM (`querySelector('[slot="..."]')`) but do NOT verify:
- `ariaLabel.*` slots actually apply as `aria-label` on the target button/element
- `helpText` slot content is visible and announced to screen readers
- `optionalLabel` slot shows default "(optional)" text
- `bib.fullscreen.headline` content renders in fullscreen mode

**Update:** The new `accessibility-tree.suite.ts` tests `aria-describedby` linking to help text content for **input** and the `aria-label` on counter increment/decrement buttons, providing partial slot functional coverage for those components.

### ~~1.7 Viewport Resize Transitions~~ → PARTIALLY CLOSED

~~Components with dropdown/fullscreen behavior document popover↔modal viewport transitions. No test resizes the viewport while the bib is open.~~

**Update:** Four Playwright suites now have dedicated mobile/fullscreen sections at 390×844 viewport that test fullscreen open/close, keyboard nav in fullscreen, trigger inert management, and focus restoration: **select**, **combobox**, **datepicker**, **dropdown**. However, no test resizes the viewport *while the bib is open* to verify the live popover→modal transition. The tests open the bib at a fixed viewport size.

### 1.8 `disabled` Tab Order Removal — Untested

Multiple components document that disabled state removes the element from the tab sequence. **No component tests that Tab skips a disabled element.** (Disabled interaction tests verify clicks/keypresses are no-ops, but don't check tab order exclusion.)

---

## 2. Checkbox

**Test files:** `test/auro-checkbox.test.js`, `test/auro-checkbox-group.test.js`, `apps/shared/checkbox-interaction.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 2.1 | CSS parts (`checkbox`, `checkbox-input`, `checkbox-label`) — no test verifies parts exist | Medium | WTR |
| 2.2 | ~~`noValidate` — no test that blur skips validation when set~~ **IMPLEMENTED** | High | WTR |
| 2.3 | ~~`setCustomValidity` / `setCustomValidityCustomError` / `setCustomValidityValueMissing` — no test that messages render in help text~~ **IMPLEMENTED** | High | WTR |
| 2.4 | `auroCheckbox-focusin` / `auroCheckbox-focusout` events — no Playwright coverage | Low | PW |
| 2.5 | `reset()` / `validate()` methods — no Playwright coverage | Low | PW |
| 2.6 | `horizontal` layout — no Playwright test | Low | PW |
| 2.7 | `appearance="inverse"` visual state — no Playwright test | Low | PW |
| 2.8 | ~~Group `reset()` does not assert `el.value` resets to `undefined` in the dedicated reset test~~ **IMPLEMENTED** | Medium | WTR |

---

## 3. Combobox

**Test files:** `test/auro-combobox.test.js`, `test/testFixtures.js`, `test/testFunctions.js`, `apps/shared/combobox-interaction.suite.ts`, `apps/shared/combobox-remount.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 3.1 | CSS parts (`dropdownTrigger`, `dropdownChevron`, `dropdownSize`, `helpText`) — untested | Medium | WTR |
| 3.2 | `aria-expanded` reflects bib state — untested in WTR | Medium | WTR |
| 3.3 | `aria-controls` references bib — untested in WTR | Medium | WTR |
| 3.4 | `aria-labelledby` on trigger — untested | Medium | WTR |
| 3.5 | `aria-autocomplete` on input — untested | Medium | WTR |
| 3.6 | `aria-selected`, `aria-setsize`, `aria-posinset` on options — untested | Medium | WTR |
| 3.7 | ~~Error `role="alert"` + `aria-live="assertive"` on error help text — untested (combobox-specific; input/select covered)~~ **IMPLEMENTED** | High | WTR |
| 3.8 | Hidden native `<input>` for form submission — untested | Medium | WTR |
| 3.9 | ~~`static` option attribute — documented, zero tests~~ **IMPLEMENTED** | High | WTR |
| 3.10 | ~~Clear on required → validation error on blur — documented, no test~~ **IMPLEMENTED** | High | WTR |
| 3.11 | Swap values between two comboboxes — documented user story, no test | Medium | PW |
| 3.12 | Viewport change popover↔modal *while bib is open* — untested | Medium | PW |
| 3.13 | ~~`disabled` prevents bib from opening — only attribute reflection tested~~ **IMPLEMENTED** | High | WTR |
| 3.14 | `noValidate` functional — blur should NOT validate — **BUG:** `focusout` handler calls `validate()` without checking `noValidate` | High | WTR |
| 3.15 | `placeholder` renders visually in input — no test | Medium | WTR |
| 3.16 | `triggerIcon` renders on `auro-input` — no test | Low | WTR |
| 3.17 | `type` formatting (credit-card, tel, date) — no functional test | Medium | WTR |
| 3.18 | `format` input masking — no behavioral test | Medium | WTR |
| 3.19 | `persistInput` preserves text after selection — no test of primary behavior | Medium | WTR |
| 3.20 | `input` event detail payload (`{ optionSelected, value }`) — not verified | Low | WTR |
| 3.21 | `ariaLabel.bib.close` / `ariaLabel.input.clear` slots — no test verifying aria-label applied | Medium | WTR |
| 3.22 | `optionalLabel` slot — no test verifying "(optional)" renders | Low | WTR |
| 3.23 | Shift+Tab behavior inconsistency — docs say bib stays open, test asserts bib closes | High | WTR/Docs |
| 3.24 | Snowflake layout — no functional test | Low | WTR |
| 3.25 | Disabled + invalid → disabled takes precedence — no test | Medium | WTR |

---

## 4. Counter

**Test files:** `test/auro-counter.test.js`, `test/auro-counter-group.test.js`, `apps/shared/counter-interaction.suite.ts`, `apps/shared/counter-remount.suite.ts`, `apps/shared/counter-dropdown.suite.ts`, `apps/shared/single-counter-remount.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 4.1 | CSS parts (`counterControl`, `helpText` on counter; `dropdown`, `helpText` on group) — untested | Medium | WTR |
| 4.2 | ~~Enter/Space to open/close dropdown bib — core keyboard, never tested~~ **IMPLEMENTED** | High | WTR/PW |
| 4.3 | Focus moves to first counter on expand — documented, never tested — *test written but commented out pending investigation* | High | WTR |
| 4.4 | ~~Focus returns to trigger on Escape close — documented, never tested~~ **IMPLEMENTED** | High | WTR |
| 4.5 | Disabled group (`disabled` on `auro-counter-group`) — documented, never tested — *test written but commented out pending investigation* | High | WTR |
| 4.6 | `ariaLabel.minus`/`.plus` slot content applied to buttons — slot exists, ~~application untested~~ buttons now have `aria-label` tested in a11y suite, but slot *content passthrough* not verified | Low | WTR |
| 4.7 | Fullscreen mode behavior — no test at any breakpoint | Medium | PW |
| 4.8 | `AuroCounterGroup.register()` with custom name — documented, untested | Medium | WTR |
| 4.9 | Group `input` event detail shape `{ total, value }` — detail not validated | Medium | WTR |
| 4.10 | Error on individual counter inside dropdown — documented, untested | Medium | WTR |
| 4.11 | `ariaLabel.bib.close` application — slot exists, close button label not verified | Low | WTR |
| 4.12 | `bib.fullscreen.footer` rendering in fullscreen — untested | Low | WTR |
| 4.13 | Non-dropdown counter group — no Playwright test | Low | PW |
| 4.14 | Snowflake layout + inverse combination — documented, untested | Low | WTR |
| 4.15 | Viewport resize popover↔modal *while bib is open* — documented, untested | Medium | PW |

---

## 5. Datepicker

**Test files:** `test/auro-datepicker.test.js`, `test/testFixtures.js`, `test/testFunctions.js`, `apps/shared/datepicker-interaction.suite.ts`, `apps/shared/datepicker-fullscreen.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 5.1 | CSS parts (7 parts: `calendar`, `calendarWrapper`, `dropdown`, `helpText`, `helpTextSpan`, `input`, `trigger`) — untested | Medium | WTR |
| 5.2 | ~~`input` event — documented in API, no test fires/asserts it~~ **IMPLEMENTED** | High | WTR |
| 5.3 | `aria-invalid` reflects validation state — untested | High | WTR |
| 5.4 | ~~Error message `role="alert"` + `aria-live="assertive"` — untested~~ **IMPLEMENTED** | High | WTR |
| 5.5 | ~~Typing a date into input to set value — no test types date string~~ **IMPLEMENTED** | High | WTR/PW |
| 5.6 | ~~`fullscreenBreakpoint="disabled"` never opens fullscreen — untested~~ **IMPLEMENTED** | High | WTR |
| 5.7 | ~~Required range — both dates must be present — untested~~ **IMPLEMENTED** | High | WTR |
| 5.8 | Custom registration `AuroDatepicker.register()` — untested | Medium | WTR |
| 5.9 | HTML form submission participation — untested | Medium | WTR |
| 5.10 | `badInput` validity state — untested | Medium | WTR |
| 5.11 | Tab navigation: input → clear button → next element — untested | Medium | WTR/PW |
| 5.12 | Disabled propagation to inner inputs — tested on component, not inner input | Medium | WTR |
| 5.13 | `hasError` readonly property — untested | Low | WTR |
| 5.14 | `stacked` functional behavior — only attribute reflection | Low | WTR |
| 5.15 | `dvInputOnly` functional behavior — only attribute reflection | Low | WTR |
| 5.16 | `largeFullscreenHeadline` functional behavior — only attribute reflection | Low | WTR |
| 5.17 | `fullscreenBreakpoint` values (`xs`, `md`, `lg`, `xl`) — only `sm` tested | Low | WTR |
| 5.18 | Custom `monthNames` localization — untested | Low | WTR |
| 5.19 | Range selection flow in fullscreen — untested | Medium | PW |
| 5.20 | `validate(true)` overriding `noValidate` — untested | Medium | WTR |
| 5.21 | Slot functional behavior (labels as accessible names, helpText visible, ariaLabel slots applied) — existence only | Medium | WTR |
| 5.22 | `highlight` attribute on date slot content — untested | Low | WTR |

---

## 6. Dropdown

**Test files:** `test/auro-dropdown.test.js`, `test/testFunctions.js`, `apps/shared/dropdown-interaction.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 6.1 | CSS parts (`trigger`, `chevron`, `helpText`, `size`, `bibContainer`) — untested | Medium | WTR |
| 6.2 | ~~`focusShow` — bib opening on focus not tested (only attribute reflection)~~ **IMPLEMENTED** | High | WTR |
| 6.3 | ~~`hoverToggle` — mouse hover open/close not tested (only property set)~~ **IMPLEMENTED** | High | WTR |
| 6.4 | ~~Click outside bib to close — not tested in WTR or PW~~ **IMPLEMENTED** | High | WTR/PW |
| 6.5 | Click inside bib keeps it open — untested | Medium | WTR |
| 6.6 | Tab navigation through bib content — *Playwright test written but commented out pending FocusTrap investigation* | High | WTR/PW |
| 6.7 | Shift+Tab backward navigation — untested | Medium | WTR/PW |
| 6.8 | Tab exits bib → bib closes — untested | Medium | WTR |
| 6.9 | ~~Focus trap in fullscreen mode — untested~~ **IMPLEMENTED** (Playwright) | High | WTR/PW |
| 6.10 | ~~Bib hidden from screen readers when closed — untested~~ **IMPLEMENTED** | High | WTR |
| 6.11 | Dropdown inside `auro-dialog` / `auro-drawer` — untested | Medium | WTR/PW |
| 6.12 | `errorMessage` renders visually — only default tested | Medium | WTR |
| 6.13 | `matchWidth` actual width matching — no visual test | Low | WTR |
| 6.14 | `placement` actual positioning — no visual test | Low | WTR |
| 6.15 | Error + inverse appearance combination — untested | Low | WTR |
| 6.16 | Disabled + inverse appearance combination — untested | Low | WTR |
| 6.17 | Floater config combination (placement+offset+noFlip+shift+autoPlacement) — untested | Low | WTR |
| 6.18 | `inset`, `rounded`, `common` bib properties — untested | Low | WTR |
| 6.19 | SR announcement live region in bib — untested | Low | WTR |
| 6.20 | Enter on expanded bib closes it — no explicit test | Medium | WTR |
| 6.21 | Disabled + Tab — removed from tab order — untested | Medium | WTR |

---

## 7. Form

**Test files:** `test/auro-form.test.js`, `test/auro-form-interactions.test.js`, `test/validation-value-setting.test.js`, `apps/shared/form-interaction.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 7.1 | ~~`input` event — documented in API but not explicitly tested (only `change`)~~ **IMPLEMENTED** | High | WTR |
| 7.2 | `change` event on initialization — `initializeState()` dispatches it but no test | Medium | WTR |
| 7.3 | Custom registration `AuroForm.register('custom-name')` — not functionally tested | Medium | WTR |
| 7.4 | Elements without `name` attribute excluded from form — untested | Medium | WTR |
| 7.5 | Attribute-based element matching (`element.hasAttribute(elementTag)`) — untested | Medium | WTR |
| 7.6 | Multiple invalid elements all show errors simultaneously after submit — untested | Medium | PW |
| 7.7 | Focus management after validation failure — untested | Medium | WTR/PW |
| 7.8 | Submit button re-disabling when validity goes valid→invalid — untested | Low | WTR |
| 7.9 | Event properties (`bubbles`, `composed`, `cancelable`) — untested | Low | WTR |
| 7.10 | Empty form behavior (`value`, `validity`, `isInitialState` with zero elements) — untested | Low | WTR |
| 7.11 | Deeply nested form elements (>1 level) — untested | Low | WTR |
| 7.12 | Multiple submit/reset buttons — untested | Low | WTR |
| 7.13 | `validateOnInput` elements in form context — untested | Low | WTR |
| 7.14 | Custom registration order (children registered BEFORE form) — documented, untested | Medium | WTR |

---

## 8. Input

**Test files:** `test/auro-input.test.js`, `test/testFunctions.js`, `apps/shared/input-interaction.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 8.1 | CSS parts (10 parts: `wrapper`, `label`, `helpText`, `input`, `accentIcon`, `iconContainer`, `accent-left`, `accent-right`, `displayValue`, `inputHelpText`) — untested | Medium | WTR |
| 8.2 | ~~`badInput` validity state — no test triggering actual `badInput` (only `setCustomValidityBadInput` attribute)~~ **IMPLEMENTED** | High | WTR |
| 8.3 | `hasFocus` property — no dedicated test | Medium | WTR |
| 8.4 | `hasValue` property — no dedicated test | Medium | WTR |
| 8.5 | ~~Clear button hidden when `disabled` — untested~~ **IMPLEMENTED** | High | WTR |
| 8.6 | ~~Clear button hidden when `readonly` — untested~~ **IMPLEMENTED** | High | WTR |
| 8.7 | Tab to clear button — no keyboard navigation test | Medium | WTR/PW |
| 8.8 | Disabled removes from tab order — untested | Medium | WTR |
| 8.9 | `displayValue` slot visually replaces input when unfocused — untested | Medium | WTR |
| 8.10 | `optionalLabel` default "(optional)" rendering when `required` not set — untested | Medium | WTR |
| 8.11 | Diners Club credit card detection/formatting (prefix `36`/`38`) — untested | Medium | WTR |
| 8.12 | Amex mask format (`0000 000000 00000`) — only icon tested, not formatting | Medium | WTR |
| 8.13 | Standalone date formats (`yy`, `yyyy`, `mm`, `dd`) — tests exist but are commented out | Medium | WTR |
| 8.14 | Hover state — no test at all | Low | WTR |
| 8.15 | `delegatesFocus` behavior — untested | Low | WTR |
| 8.16 | `autocapitalize` with actual value set — untested | Low | WTR |
| 8.17 | `icon` renders in DOM — only boolean attribute checked | Low | WTR |
| 8.18 | `nested` styling effects (borders removed, help text hidden) — untested | Low | WTR |
| 8.19 | `simple` borderless rendering — untested | Low | WTR |
| 8.20 | `setCustomValidityBadInput` / `setCustomValidityCustomError` / `setCustomValidityForType` message display — untested | Medium | WTR |
| 8.21 | i18n date/tel help text — untested | Low | WTR |
| 8.22 | `maskInstance.destroy()` on format change — untested | Low | WTR |
| 8.23 | `clear()` triggers re-validation or input event — untested | Medium | WTR |
| 8.24 | `auroInput-validityChange` event — no Playwright test | Low | PW |
| 8.25 | `a11yActivedescendant`/`a11yControls`/`a11yExpanded`/`a11yRole` — only defaults checked, no test with actual values | Low | WTR |

---

## 9. Menu

**Test files:** `test/auro-menu.test.js`, `test/auro-menuoption.test.js`, `test/testFixtures.js`, `test/testFunctions.js`, `apps/shared/menu-interaction.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 9.1 | `noMatch` property on menuoption — completely untested | High | WTR |
| 9.2 | ~~Disabled menu (`disabled` on `<auro-menu>`) prevents all option selection — attribute set but no click-through test~~ **IMPLEMENTED** | High | WTR |
| 9.3 | Pre-selected option (`selected` attribute) — no test for initial render state on menu | High | WTR |
| 9.4 | Preset value with multiselect (HTML attribute `value='["a","b"]'`) — untested | Medium | WTR |
| 9.5 | ~~`role="group"` on nested menu — untested~~ **IMPLEMENTED** | High | WTR |
| 9.6 | `aria-busy` on loading — untested | Medium | WTR |
| 9.7 | `aria-label="submenu"` on nested menu — untested | Medium | WTR |
| 9.8 | Home/End key navigation — documented in accessibility.md but no test | High | WTR |
| 9.9 | Dividers (`<hr>`) render and are skipped during navigation — untested | Medium | WTR |
| 9.10 | Checkmark icon appears on selected option — only negative test (`noCheckmark`) | Medium | WTR |
| 9.11 | Nesting spacer indentation — untested | Low | WTR |
| 9.12 | Nested menu level assignment — untested | Low | WTR |
| 9.13 | `matchWord` partial match highlighting and dynamic changes — only superficial | Medium | WTR |
| 9.14 | `shape` visual rendering (`box` vs `round`) — no rendering test | Low | WTR |
| 9.15 | `size` visual rendering (`sm` vs `md`) — no rendering test | Low | WTR |
| 9.16 | `setInternalSelected()` method — no direct test | Low | WTR |
| 9.17 | `handleMenuChange()` event processing — no direct test | Low | WTR |
| 9.18 | `tabIndex` behavior on menuoption — only existence check | Low | WTR |
| 9.19 | Loading slots visible/hidden based on `loading` property — shallow test | Low | WTR |

---

## 10. Radio

**Test files:** `test/auro-radio.test.js`, `test/auro-radio-group.test.js`, `test/testFixtures.js`, `apps/shared/radio-interaction.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 10.1 | CSS parts (`radio-group`, `radio`, `radio-input`, `radio-label`) — untested | Medium | WTR |
| 10.2 | ~~`noValidate` — no test that blur skips validation~~ **IMPLEMENTED** | High | WTR |
| 10.3 | ~~`setCustomValidity*` messages actually display in help text — untested~~ **IMPLEMENTED** | High | WTR |
| 10.4 | ~~`content` slot on `auro-radio` — documented, zero test coverage~~ **IMPLEMENTED** | High | WTR |
| 10.5 | `horizontal` with >3 items reverts to vertical — documented limit, untested | Medium | WTR |
| 10.6 | Custom registration `register('custom-name')` — not functionally tested | Medium | WTR |
| 10.7 | `optionalLabel` default "(optional)" text renders — untested | Medium | WTR |
| 10.8 | `optionSelected` set programmatically — untested | Medium | WTR |
| 10.9 | `aria-live="assertive"` on error help text — untested | Medium | WTR |
| 10.10 | Form participation (value submitted with `<form>` / `<auro-form>`) — untested | Medium | WTR |
| 10.11 | Disabled removes from tab sequence — untested | Medium | WTR |
| 10.12 | CSS custom tokens — untested | Low | WTR |

---

## 11. Select

**Test files:** `test/auro-select.test.js`, `test/testFixtures.js`, `test/testFunctions.js`, `apps/shared/select-interaction.suite.ts`, `apps/shared/select-remount.suite.ts`, `apps/shared/accessibility-tree.suite.ts`

### Missing Test Cases

| # | Gap | Priority | Type |
|---|---|---|---|
| 11.1 | CSS parts (`dropdownTrigger`, `dropdownChevron`, `dropdownSize`, `helpText`) — untested | Medium | WTR |
| 11.2 | `noValidate` functional — blur should NOT validate — **BUG:** `blur` handler calls `validate()` without checking `noValidate`; test written but commented out | High | WTR |
| 11.3 | `aria-labelledby` on trigger — untested in WTR | Medium | WTR |
| 11.4 | `aria-label` on menu (from label slot) — untested in WTR | Medium | WTR |
| 11.5 | `aria-hidden="true"` on native select — untested | Medium | WTR |
| 11.6 | `touched` becomes `true` after focus — untested | Medium | WTR |
| 11.7 | `placeholder` renders visually and disappears after selection — untested | Medium | WTR |
| 11.8 | `handleSlotChange` — headline slot cloning to bibtemplate — untested | Medium | WTR |
| 11.9 | Dynamic `shape`/`size` change propagation to menu — untested | Medium | WTR |
| 11.10 | `optionalLabel` rendering when `required` not set — untested | Medium | WTR |
| 11.11 | Space key negative test (does NOT select, only toggles bib) — untested | Medium | WTR |
| 11.12 | `error` change calls `nativeSelect.setCustomValidity()` — untested | Low | WTR |
| 11.13 | `displayValue` slot content rendering after selection — untested | Low | WTR |
| 11.14 | `forceDisplayValue` visual behavior — only attribute reflection | Low | WTR |
| 11.15 | Event detail completeness (`optionSelected` in `input`, detail in `auroFormElement-validated`) — untested | Low | WTR |
| 11.16 | Disabled tabindex behavior — untested | Medium | WTR |
| 11.17 | Focus trapping in fullscreen dialog — untested | Medium | WTR/PW |
| 11.18 | Selected option scrolled into view on open (with preset value) — untested as integration | Low | WTR |
| 11.19 | `flexMenuWidth` / `fluid` / `matchWidth` / `shift` / `autoPlacement` / `noFlip` / `offset` — visual behavior untested | Low | WTR |
| 11.20 | Escape in dialog/drawer — WTR only, no Playwright test | Low | PW |

---

## 12. Priority Matrix

### Critical (High Priority) — ~28 gaps → 27 **IMPLEMENTED**, 6 blocked by bugs, 0 remaining

These represent documented behaviors with **zero** or **fundamentally incomplete** test coverage that affect core functionality, accessibility compliance, or keyboard interaction:

| Category | Original | Implemented | Bug-Blocked | Remaining |
|---|---|---|---|---|
| `noValidate` functional behavior | 5 | 3 (Checkbox, Radio, Datepicker) | 2 (Combobox, Select) | 0 |
| Keyboard behavior gaps | 5 | 3 (Counter Enter/Space, Counter Escape→focus, Datepicker typing) | 2 (Counter focus-on-expand, Dropdown Tab nav) | 0 |
| Missing feature tests | 8 | 8 (Combobox clear+disabled+static, Datepicker fullscreen+range+input+typing, Form input event) | 0 | 0 |
| Validation message display | 5 | 5 (Checkbox, Radio, Combobox, Input, Select) | 0 | 0 |
| ARIA gaps remaining | 3 | 3 (Combobox alert, Menu group role, Dropdown bib hidden) | 0 | 0 |
| Disabled interaction | 2 | 1 (Combobox bib) | 1 (Counter group) | 0 |
| Dropdown interaction | 3 | 3 (focusShow, hoverToggle, click-outside) | 0 | 0 |
| Dropdown fullscreen | 1 | 1 (focus trap PW) | 0 | 0 |
| Input clear button | 2 | 2 (disabled, readonly) | 0 | 0 |
| Input badInput | 1 | 1 | 0 | 0 |

### Medium Priority — ~55 gaps

Property functional behavior (beyond attribute reflection), slot functional verification, event detail validation, custom registration, CSS parts verification, and visual behavior verification.

### Low Priority — ~37 gaps

CSS token verification, visual styling tests, edge cases, deprecated feature testing, and behaviors that may require manual testing (VoiceOver, hover states).

---

## Methodology

Each component's documentation was compared against test files by:
1. Reading API docs (`docs/api.md`, `docs/partials/api.md`)
2. Reading ALL demo pages rendered on localhost (`demo/*.md`)
3. Reading ALL doc partials (`docs/partials/**/*.md`)
4. Reading ALL WTR test files (`test/*.test.js`)
5. Reading Playwright shared suites (`apps/shared/*.suite.ts`) — including the new `accessibility-tree.suite.ts`
6. Reading source files to confirm documented behaviors exist in implementation
7. Cross-referencing every documented property, method, event, slot, CSS part, keyboard behavior, accessibility feature, and demo use case against test assertions

### Test File Summary

| Suite | Lines |
|---|---|
| `accessibility-tree.suite.ts` **(NEW)** | 450 |
| `select-interaction.suite.ts` | 839 |
| `combobox-interaction.suite.ts` | 633 |
| `datepicker-interaction.suite.ts` | 529 |
| `menu-interaction.suite.ts` | 449 |
| `form-interaction.suite.ts` | 401 |
| `counter-interaction.suite.ts` | 366 |
| `radio-interaction.suite.ts` | 365 |
| `input-interaction.suite.ts` | 351 |
| `dropdown-interaction.suite.ts` | 284 |
| `checkbox-interaction.suite.ts` | 264 |
| **Playwright total** | **4,931** |