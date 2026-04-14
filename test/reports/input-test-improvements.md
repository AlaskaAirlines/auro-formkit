# Input Test Improvements

**Branch:** `jbaker/testImprovements`
**PR:** #1432
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-input` test count | 71 | 120 | +49 |
| Code coverage | 88.70% | 91.43% | +2.73% |
| Test duration | ~2.1s | — | — |

Per-file line coverage:
- `base-input.js`: 96.92%
- `utilities.js`: 94.69%
- `i18n.js`: 94.35%
- `auro-input.js`: 93.10%

Uncovered areas (all low-risk internal paths):
- Layout-specific render branches in `auro-input.js` (`emphasized`, `snowflake` layout variants)
- Safari cursor management workarounds
- `MutationObserver` language change handler in `i18n.js`
- IMask `complete` event handler edge cases in `utilities.js`

### Notes

The `useAccessibleIt()` test plugin wraps every `it()` with an automatic accessibility check. The a11y pass-through properties (`a11yRole`, `a11yControls`, `a11yExpanded`, `a11yActivedescendant`) cannot be tested with active values in isolation because they create intentionally incomplete ARIA states (e.g., `role="combobox"` requires `aria-expanded` and `aria-controls` pointing to existing elements). These properties are designed for use by parent components (auro-combobox, auro-select) that provide the full ARIA context. Tests verify the default undefined state instead.

---

## Test Matrix by Describe Block

### auro-input.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 2 | 2 | +0 |
| User Stories | 23 | 23 | +0 |
| Properties | 34 | 70 | +36 |
| Slots | 7 | 7 | +0 |
| Public Functions | 1 | 9 | +8 |
| Events | 0 | 3 | +3 |
| Private Functions | 0 | 0 | +0 |
| A11Y | 2 | 2 | +0 |
| Mouse Behavior | 2 | 2 | +0 |
| Keyboard Behavior | 0 | 2 | +2 |
| **Total** | **71** | **120** | **+49** |

---

## New Tests by Importance

| Importance | Count |
|------------|-------|
| High | 18 |
| Medium | 22 |
| Low | 9 |

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
| should focus the input when tabbed to | Keyboard Behavior |
