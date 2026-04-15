# Input Test Improvements

**Branch:** `jbaker/testImprovements`
**PR:** #1432
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-input` unique test count | 71 | 176 | +105 |
| `auro-input` test executions | — | 352 | — |
| Code coverage | 88.70% | 100% | +11.30% |
| Test duration | ~2.1s | ~6.3s | +4.2s |

All tests run twice (desktop 800×800 + mobile 575px viewport).

Per-file line coverage:
- `auro-input.js`: 100%
- `base-input.js`: 100%
- `utilities.js`: 100%
- `i18n.js`: 100%

Uncovered areas: None — 100% overall coverage with all source files at 100% line and branch coverage.

### Notes

The `useAccessibleIt()` test plugin wraps every `it()` with an automatic accessibility check. The a11y pass-through properties (`a11yRole`, `a11yControls`, `a11yExpanded`, `a11yActivedescendant`) cannot be tested with active values in isolation because they create intentionally incomplete ARIA states (e.g., `role="combobox"` requires `aria-expanded` and `aria-controls` pointing to existing elements). These properties are designed for use by parent components (auro-combobox, auro-select) that provide the full ARIA context. Tests verify the default undefined state instead.

---

## Test Matrix by Describe Block

### auro-input.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 2 | 2 | +0 |
| User Stories | 23 | 32 | +9 |
| Properties | 34 | 70 | +36 |
| Slots | 7 | 8 | +1 |
| Public Functions | 1 | 10 | +9 |
| Events | 0 | 3 | +3 |
| Private Functions | 0 | 48 | +48 |
| A11Y | 2 | 2 | +0 |
| Mouse Behavior | 2 | 3 | +1 |
| Keyboard Behavior | 0 | 2 | +2 |
| **Total** | **71** | **176** | **+105** |

---

## New Tests by Importance

| Importance | Count |
|------------|-------|
| High | 18 |
| Medium | 22 |
| Low | 25 |

### High Importance (18)

| Test | Section |
|------|---------|
| should fail validation when required and empty | Properties > required |
| should set the required attribute on the input | Properties > required |
| should override all validation messages | Properties > setCustomValidity |
| should accept a custom message for rangeOverflow | Properties > setCustomValidityRangeOverflow |
| should accept a custom message for rangeUnderflow | Properties > setCustomValidityRangeUnderflow |
| should accept a custom message for tooLong | Properties > setCustomValidityTooLong |
| should accept a custom message for tooShort | Properties > setCustomValidityTooShort |
| should accept a custom message for valueMissing | Properties > setCustomValidityValueMissing |
| should be valid when input passes validation | Properties > validity |
| should reflect valueMissing when required and empty | Properties > validity |
| should contain the error message after validation failure | Properties > errorMessage |
| should toggle password visibility | Properties > showPassword |
| should validate and set validity attribute | Public Functions > validate |
| should set valid when value satisfies requirements | Public Functions > validate |
| should clear value and validity state | Public Functions > reset |
| should clear the input value | Public Functions > clear |
| should fire input event when value changes | Events > input |
| should fire after validation runs | Events > auroFormElement-validated |

### Medium Importance (22)

| Test | Section |
|------|---------|
| should use custom message for email validation failure | Properties > customValidityTypeEmail |
| should default to false (a11yActivedescendant) | Properties > a11yActivedescendant |
| should default to undefined (a11yControls) | Properties > a11yControls |
| should default to undefined (a11yExpanded) | Properties > a11yExpanded |
| should default to undefined (a11yRole) | Properties > a11yRole |
| should keep the label in the active position when set | Properties > activeLabel |
| should default to default (appearance) | Properties > appearance |
| should accept inverse appearance | Properties > appearance |
| should not have autocapitalize by default | Properties > autocapitalize |
| should set autocomplete on the input | Properties > autocomplete |
| should set autocorrect on the input | Properties > autocorrect |
| should set dvInputOnly attribute | Properties > dvInputOnly |
| should accept a lang attribute | Properties > lang |
| should accept a layout property | Properties > layout |
| should set the nested attribute | Properties > nested |
| should set the onDark attribute (deprecated) | Properties > onDark |
| should accept a shape property | Properties > shape |
| should accept a size property | Properties > size |
| should accept a custom message for badInput | Properties > setCustomValidityBadInput |
| should accept a custom message for customError | Properties > setCustomValidityCustomError |
| should accept a custom message for type validation | Properties > setCustomValidityForType |
| should fire when validity state changes | Events > auroInput-validityChange |

### Low Importance (9)

| Test | Section |
|------|---------|
| should register the custom element | Public Functions > register |
| should execute without error (resetShapeClasses) | Public Functions > resetShapeClasses |
| should execute without error (resetLayoutClasses) | Public Functions > resetLayoutClasses |
| should execute without error (updateComponentArchitecture) | Public Functions > updateComponentArchitecture |
| should set the icon attribute | Properties > icon |
| should set the id attribute on the element | Properties > id |
| should set the simple attribute | Properties > simple |
| should accept typed input | Keyboard Behavior |
| inputHidden returns true when hasDisplayValueContent is true with value and no focus | Private Functions |
| inputHidden first branch short-circuits when hasDisplayValueContent is true but focused | Private Functions |
| inputHidden first branch short-circuits when hasDisplayValueContent is true with no value | Private Functions |
| noFocusOrValue returns false when hasDisplayValueContent is true and focused | Private Functions |
| noFocusOrValue first branch short-circuits at hasValue when hasDisplayValueContent is true with no value | Private Functions |
| renderValidationErrorIconHtml uses inverse appearance when onDark is true | Private Functions |
| renderHtmlNotificationPassword uses inverse appearance when onDark is true | Private Functions |
| renderHtmlTypeIcon uses inverse appearance and disabled variant for credit-card icon when onDark and disabled | Private Functions |
| renderHtmlTypeIcon uses inverse appearance and disabled variant for date icon when onDark and disabled | Private Functions |
| patchInputEvent returns early when called with null | Private Functions |
| setLang sets lang to undefined when document lang changes to en | Private Functions |
| getMaskOptions uses default credit-card mask when format is undefined | Private Functions |
| getMaskOptions date parse converts 2-digit year <= 25 to 2000s | Private Functions |
| toNorthAmericanFormat defaults day to 01 when format has no dd component | Private Functions |
| toNorthAmericanFormat defaults month and year when format only has dd | Private Functions |
| parseDate uses default mm/dd/yyyy format when format is undefined | Private Functions |
| should focus the input when tabbed to | Keyboard Behavior |
