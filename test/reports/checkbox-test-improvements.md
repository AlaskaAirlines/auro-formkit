# Checkbox & Checkbox-Group Test Improvements

**Branch:** `jbaker/testCoverageImprovements`
**PR:** #1432
**Date:** June 2025

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-checkbox` test count | 9 | 54 | +45 |
| `auro-checkbox-group` test count | 14 | 61 | +47 |
| **Total unique tests** | **23** | **115** | **+92 (+400%)** |
| **Total test executions** | — | **229** | — |
| Code coverage | 97.04% | 99.64% | +2.6% |
| Test duration | ~1.7s | ~7.8s | +6.1s |

All tests run twice (desktop 800×800 + mobile 575px viewport). The only untestable branch is `evt.isTrusted` (browser-security gate that cannot be triggered in unit tests).

Dead code identified: `layout` propagation block in `auro-checkbox-group.js` `updated()` — `layout` is never declared as a Lit property so `changedProperties.has('layout')` is always false.

---

## Test Matrix by Describe Block

### Combined

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 0 | 10 | +10 |
| User Stories | 3 | 5 | +2 |
| Properties | 7 | 46 | +39 |
| Slots | 5 | 7 | +2 |
| Public Functions | 0 | 8 | +8 |
| Events | 0 | 14 | +14 |
| A11Y | 5 | 13 | +8 |
| Mouse Behavior | 2 | 5 | +3 |
| Keyboard Behavior | 0 | 7 | +7 |
| **Total** | **23** | **115** | **+92** |

### auro-checkbox.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 0 | 6 | +6 |
| User Stories | 0 | 2 | +2 |
| Properties | 0 | 18 | +18 |
| Slots | 1 | 1 | 0 |
| Public Functions | 0 | 3 | +3 |
| Events | 0 | 8 | +8 |
| A11Y | 5 | 6 | +1 |
| Mouse Behavior | 2 | 4 | +2 |
| Keyboard Behavior | 0 | 6 | +6 |
| **Total** | **9** | **54** | **+45** |

### auro-checkbox-group.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 0 | 4 | +4 |
| User Stories | 3 | 3 | 0 |
| Properties | 7 | 28 | +21 |
| Slots | 4 | 6 | +2 |
| Public Functions | 0 | 5 | +5 |
| Events | 0 | 6 | +6 |
| A11Y | 0 | 7 | +7 |
| Mouse Behavior | 0 | 1 | +1 |
| Keyboard Behavior | 0 | 1 | +1 |
| **Total** | **14** | **61** | **+47** |

---

## New Tests by Importance

| Priority | Description | Count |
|----------|-------------|-------|
| Critical | Prevents silent regressions or guards core behavior | 5 |
| High | Covers important properties and a11y paths | 13 |
| Medium | Covers secondary properties, edge cases, and integration | 12 |
| Low | Basic attribute reflection and structural checks | 7 |
| **Total** | | **37** |

### Critical — prevents silent regressions or guards core behavior

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 1 | checkbox | `appearance` defaults to `'default'` | Caught a constructor typo (`this.apperance`) that left the property undefined |
| 2 | checkbox | Programmatic `.checked` toggle does **not** emit events | Guards against infinite loops when the group sets `.checked` |
| 3 | checkbox | Space key calls `preventDefault()` to block page scroll | Core keyboard interaction — missing behavior would break UX |
| 4 | checkbox-group | `validate()` sets `validity` to `valueMissing` when required and empty | Core form validation path |
| 5 | checkbox-group | `reset()` clears all checked states and resets `value` | Core form reset path |

### High — covers important properties and a11y paths

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 6 | checkbox | `touched` reflects as attribute after interaction | Tracks dirty/pristine state used by form validation |
| 7 | checkbox | Checkmark SVG visible only when checked | Visual correctness of the primary indicator |
| 8 | checkbox | Error border toggles with `error` property | Visual feedback for validation state |
| 9 | checkbox | Dynamic `aria-label` updates when slot content changes | Screen reader accuracy after DOM mutation |
| 10 | checkbox | `inputId` generates a deterministic internal id | Needed for label association in shadow DOM |
| 11 | checkbox | `disconnectedCallback` removes keyboard listener | Prevents memory leaks on component teardown |
| 12 | checkbox | Space key unchecks an already-checked checkbox | Full toggle cycle coverage |
| 13 | checkbox-group | `touched` set on child interaction and cleared on `reset()` | Dirty-state tracking for group-level validation |
| 14 | checkbox-group | Error help text renders in `helpText` slot when `error` is set | User-facing validation message visibility |
| 15 | checkbox-group | Focus-leave triggers validation on required group | Validates on blur-away, not just on submit |
| 16 | checkbox-group | `auroCheckbox-focusout` sets `document.auroCheckboxGroupActive` | Tracks active group for cross-component focus management |
| 17 | checkbox-group | `auroCheckbox-focusout` adds focusin listener and resets `focusWithin` on outside focus | Ensures validation fires when focus leaves the group |
| 18 | checkbox-group | `auroCheckbox-focusout` sets `focusWithin` to true when initially false | First-focusout initialization path |

### Medium — covers secondary properties, edge cases, and integration

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 19 | checkbox | `register()` with custom tag name creates working element | Custom element registration API contract |
| 20 | checkbox | `focusin` dispatched via `focus()` method | Ensures programmatic focus fires expected event |
| 21 | checkbox | Event objects carry correct `bubbles`/`composed` flags | Cross-shadow-DOM event propagation |
| 22 | checkbox | Host `click` delegates to internal input | Click-anywhere-on-host pattern |
| 23 | checkbox-group | `horizontal` reflects attribute and sets max children | Layout variant behavior |
| 24 | checkbox-group | `noValidate` suppresses validation | Opt-out validation path |
| 25 | checkbox-group | `setCustomValidity` / `setCustomValidityCustomError` / `setCustomValidityValueMissing` | Custom error message API |
| 26 | checkbox-group | Dynamic slotchange adds new checkbox to internal array | Covers runtime DOM mutation handling |
| 27 | checkbox-group | Disabled propagation to dynamically added children | Ensures late-added checkboxes inherit group state |
| 28 | checkbox-group | `onDark` propagates to child checkboxes | Theme propagation |
| 29 | checkbox-group | `appearance` propagates to child checkboxes | Appearance propagation |
| 30 | checkbox-group | Rendering: shadow root exists, fieldset present, slots rendered | Basic structural verification |

### Low — basic attribute reflection and structural checks

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 31 | checkbox | Basic rendering: shadow DOM exists, input present | Sanity check that component renders |
| 32 | checkbox | `id`, `name`, `value` attribute reflection | Standard attribute mirror tests |
| 33 | checkbox | `onDark` attribute reflection | Theme attribute test |
| 34 | checkbox-group | `validity` reflects `'valid'` when no constraints | Baseline validity state |
| 35 | checkbox-group | Keyboard behavior: space key toggles child within group | Structural keyboard test |
| 36 | checkbox-group | Mouse behavior: click on child within group updates `value` | Structural click test |
| 37 | checkbox-group | A11Y: `role`, `aria-invalid`, `aria-required` attributes | Standard ARIA attribute tests |

---

## Bug & Dead Code Findings

1. **Constructor typo** (`auro-checkbox.js`): `this.apperance = 'default'` → `this.appearance = 'default'`. The misspelling caused `appearance` to remain `undefined` after construction. Fixed by the developer.

2. **Dead code** (`auro-checkbox-group.js`, `updated()`, ~line 347): A block that propagates `layout` to child checkboxes can never execute because `layout` is not declared in `static get properties()`, meaning Lit never adds it to `changedProperties`. Coverage report confirms "statement not covered."
