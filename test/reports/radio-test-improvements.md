# Radio & Radio-Group Test Improvements

**Branch:** `jbaker/testImprovements`
**PR:** #1432
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-radio` test count | 10 | 58 | +48 |
| `auro-radio-group` test count | 6 | 64 | +58 |
| **Total unique tests** | **16** | **122** | **+106 (+663%)** |
| **Total test executions** | — | **244** | — |
| Code coverage | 96.56% | 100% | +3.44% |
| Test duration | ~1.2s | ~2.2s | +1.0s |

All tests run twice (desktop 800×800 + mobile 575px viewport).

Per-file line coverage:
- `auro-radio.js`: 100%
- `auro-radio-group.js`: 100%

All branches covered.

---

## Test Matrix by Describe Block

### Combined

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 2 | 10 | +8 |
| User Stories | 0 | 4 | +4 |
| Properties | 7 | 50 | +43 |
| Slots | 3 | 6 | +3 |
| Public Functions | 1 | 8 | +7 |
| Events | 0 | 13 | +13 |
| Private Functions | 0 | 10 | +10 |
| A11Y | 1 | 9 | +8 |
| Mouse Behavior | 1 | 4 | +3 |
| Keyboard Behavior | 1 | 8 | +7 |
| **Total** | **16** | **122** | **+106** |

### auro-radio.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 2 | 7 | +5 |
| User Stories | 0 | 2 | +2 |
| Properties | 4 | 22 | +18 |
| Slots | 0 | 0 | 0 |
| Public Functions | 1 | 3 | +2 |
| Events | 0 | 10 | +10 |
| Private Functions | 0 | 1 | +1 |
| A11Y | 1 | 5 | +4 |
| Mouse Behavior | 1 | 3 | +2 |
| Keyboard Behavior | 1 | 5 | +4 |
| **Total** | **10** | **58** | **+48** |

### auro-radio-group.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 0 | 3 | +3 |
| User Stories | 0 | 2 | +2 |
| Properties | 3 | 28 | +25 |
| Slots | 3 | 6 | +3 |
| Public Functions | 0 | 5 | +5 |
| Events | 0 | 3 | +3 |
| Private Functions | 0 | 9 | +9 |
| A11Y | 0 | 4 | +4 |
| Mouse Behavior | 0 | 1 | +1 |
| Keyboard Behavior | 0 | 3 | +3 |
| **Total** | **6** | **64** | **+58** |

---

## New Tests by Importance

| Priority | Description | Count |
|----------|-------------|-------|
| Critical | Prevents silent regressions or guards core behavior | 6 |
| High | Covers important properties and a11y paths | 12 |
| Medium | Covers secondary properties, edge cases, and integration | 10 |
| Low | Basic attribute reflection and structural checks | 8 |
| **Total** | | **36** |

### Critical — prevents silent regressions or guards core behavior

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 1 | radio | `appearance` defaults to `'default'` | Ensures constructor initializes correctly |
| 2 | radio | `auroRadio-selected` fires only when checked becomes true | Guards selection event contract |
| 3 | radio | Space key `preventDefault` blocks page scroll | Core keyboard UX |
| 4 | radio-group | `validate()` sets `valueMissing` when required and empty | Core form validation path |
| 5 | radio-group | `reset()` clears all checked states and value | Core form reset path |
| 6 | radio-group | Arrow keys skip disabled items | Keyboard nav must not get stuck |

### High — covers important properties and a11y paths

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 7 | radio | `touched` set on focus, cleared on reset | Dirty-state tracking for validation |
| 8 | radio | `aria-checked` reflects checked state | Screen reader accuracy |
| 9 | radio | `aria-disabled` when disabled | Screen reader accuracy |
| 10 | radio | `tabindex` toggles with checked (0/-1) | Keyboard focus management |
| 11 | radio | `toggleSelected` event has bubbles/composed | Cross-shadow-DOM propagation |
| 12 | radio | `focusSelected` event on focus | Group relies on this for tracking |
| 13 | radio-group | Error propagates to child radios | Visual error feedback on children |
| 14 | radio-group | Error cleared from children when validity becomes valid | Error state cleanup |
| 15 | radio-group | `touched` set on child blur | Group dirty-state for validation |
| 16 | radio-group | Error help text renders with `role="alert"` | Accessible error messaging |
| 17 | radio-group | `aria-invalid` set/cleared with validity | ARIA error state |
| 18 | radio-group | `auroFormElement-validated` event fires | Form integration contract |

### Medium — covers secondary properties, edge cases, and integration

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 19 | radio | `resetRadio` event fires on checked change | Group uses this for coordination |
| 20 | radio | `change` event fires on input click | Standard form event contract |
| 21 | radio | Host click delegates to internal input | Click-anywhere-on-host pattern |
| 22 | radio-group | `appearance` propagates to children | Theme propagation |
| 23 | radio-group | `onDark` propagates to children | Theme propagation |
| 24 | radio-group | `required` propagates to children | Required state propagation |
| 25 | radio-group | `horizontal` layout with displayFlex class | Layout variant behavior |
| 26 | radio-group | `slotchange` updates items array | Dynamic DOM mutation handling |
| 27 | radio-group | Nested radios discovered in group | Deep DOM structure support |
| 28 | radio-group | Value empty string when radio has null/undefined value | Edge case value handling |

### Low — basic attribute reflection and structural checks

| # | Component | Test | Rationale |
|---|-----------|------|-----------|
| 29 | radio | Basic rendering: shadow DOM, input present | Sanity check |
| 30 | radio | `id`, `name`, `value`, `label` attribute reflection | Standard attribute tests |
| 31 | radio | `onDark`, `required` attribute reflection | Theme/validation attribute tests |
| 32 | radio | `inputId` generation | Internal id for label association |
| 33 | radio-group | Shadow root and fieldset exist | Structural verification |
| 34 | radio-group | `optionSelected` undefined/set | Selection tracking |
| 35 | radio-group | `setCustomValidity*` properties | Custom error message API |
| 36 | radio-group | `noValidate` reflection | Opt-out validation |
