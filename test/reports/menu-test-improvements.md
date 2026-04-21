# Menu & Menuoption Test Improvements

**Branch:** `jbaker/testCoverageImprovements`
**PR:** #1432
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-menu` unique test count | 55 | 128 | +73 |
| `auro-menuoption` unique test count | 0 | 24 | +24 |
| **Total unique tests** | **55** | **152** | **+97 (+176%)** |
| **Total test executions** | — | **304** | — |
| Code coverage | 80.47% (41 failures) | 96.97% | +16.50% |
| Test duration | ~81.5s (failures) | ~3.5s | -78.0s |

All tests run twice (desktop 800×800 + mobile 575px viewport).

Per-file line coverage:
- `auro-menu.js`: 99.42%
- `auro-menuoption.js`: 98.15%
- `auro-menu.context.js`: 94.80%
- `auro-menu-utils.js`: 100%

Uncovered areas (low-risk internal paths):
- `queuePendingValue()` retry logic in context — bounded retry for framework-specific timing (Svelte/React late property setting)
- A few branches in `auro-menu.context.js` (94.80%), `auro-menuoption.js` (98.15%), and `auro-menu.js` (99.42%)

### Infrastructure Change

Added `components/menu/web-test-runner.config.mjs` with `concurrency: 1` to prevent parallel test file execution under coverage instrumentation. The menu component's ContextProvider/MenuService pattern causes shared-state collisions when `auro-menu.test.js` and `auro-menuoption.test.js` run concurrently in the same browser. Updated `package.json` test scripts to use the local config.

### Bug Fix

Fixed pre-existing A11Y test failure in `auro-menuoption.test.js` — the fixture was missing an accessible name for the `<auro-menu>` (role="listbox"). Updated to use `aria-labelledby` pointing to an external `<span>`, which matches the real-world pattern where parent components (auro-select, auro-combobox) provide the label.

---

## Test Matrix by Describe Block

### Combined

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 6 | 7 | +1 |
| User Stories | 27 | 28 | +1 |
| Properties | 5 | 48 | +43 |
| Slots | 3 | 4 | +1 |
| Public Functions | 2 | 12 | +10 |
| Events | 0 | 13 | +13 |
| Private Functions | 1 | 1 | +0 |
| A11Y | 3 | 4 | +1 |
| Mouse Behavior | 1 | 2 | +1 |
| Keyboard Behavior | 7 | 33 | +26 |
| **Total** | **55** | **152** | **+97** |

### auro-menu.test.js

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | 6 | 6 | +0 |
| User Stories | 27 | 27 | +0 |
| Properties | 5 | 38 | +33 |
| Slots | 3 | 3 | +0 |
| Public Functions | 2 | 7 | +5 |
| Events | 0 | 10 | +10 |
| Private Functions | 1 | 1 | +0 |
| A11Y | 3 | 3 | +0 |
| Mouse Behavior | 1 | 1 | +0 |
| Keyboard Behavior | 7 | 32 | +25 |
| **Total** | **55** | **128** | **+73** |

### auro-menuoption.test.js (new file)

| Describe Block | Before | After | Delta |
|----------------|--------|-------|-------|
| Rendering | — | 1 | +1 |
| User Stories | — | 1 | +1 |
| Properties | — | 10 | +10 |
| Slots | — | 1 | +1 |
| Public Functions | — | 5 | +5 |
| Events | — | 3 | +3 |
| A11Y | — | 1 | +1 |
| Mouse Behavior | — | 1 | +1 |
| Keyboard Behavior | — | 1 | +1 |
| **Total** | **0** | **24** | **+24** |

---

## New Tests by Importance

| Importance | Count |
|------------|-------|
| High | 25 |
| Medium | 32 |
| Low | 15 |

### High Importance (25)

| Test | File | Section |
|------|------|---------|
| should update value when an option is selected | menu | Properties > value |
| should select an option when value is set programmatically | menu | Properties > value |
| should return the list of registered options | menu | Properties > options |
| should contain the selected option after making a selection | menu | Properties > selectedOptions |
| should contain multiple selected options in multiSelect mode | menu | Properties > selectedOptions |
| should return the selected option after making a selection | menu | Properties > selectedOption |
| should update after navigation | menu | Properties > optionActive |
| should update after navigating options | menu | Properties > index |
| should return the label of the selected option | menu | Properties > currentLabel |
| should fire when an option is selected | menu | Events > auroMenu-selectedOption |
| should include selection details in the event | menu | Events > auroMenu-selectedOption |
| should fire when an option is highlighted via navigation | menu | Events > auroMenu-activatedOption |
| should fire when selecting an option with an event attribute | menu | Events > auroMenu-customEventFired |
| should fire when loading property changes | menu | Events > auroMenu-loadingChange |
| should fire when value is set to a non-existent option | menu | Events > auroMenu-selectValueFailure |
| should fire when trying to deselect without allowDeselect | menu | Events > auroMenu-deselectPrevented |
| should fire when reset() is called | menu | Events > auroMenu-selectValueReset |
| should fire when options are added | menu | Events > auroMenu-optionsChange |
| should select an option when clicked | menuoption | User Stories |
| should set aria-selected to true when selected | menuoption | Properties > selected |
| should not select on click when disabled | menuoption | Properties > disabled |
| should fire when option is clicked | menuoption | Events > auroMenuOption-click |
| should not fire when disabled option is clicked | menuoption | Events > auroMenuOption-click |
| should toggle selection on click | menuoption | Mouse > Click |
| should fire on mouseover | menuoption | Events > auroMenuOption-mouseover |

### Medium Importance (32)

| Test | File | Section |
|------|------|---------|
| should default to false (allowDeselect) | menu | Properties |
| should allow deselection when set to true | menu | Properties > allowDeselect |
| should be true when loadingText slot is populated | menu | Properties > hasLoadingPlaceholder |
| should accept a layout property | menu | Properties > layout |
| should default to false (loading) | menu | Properties > loading |
| should reflect the loading attribute | menu | Properties > loading |
| should default to false (multiSelect) | menu | Properties > multiSelect |
| should reflect the multiSelect attribute | menu | Properties > multiSelect |
| should default to undefined (onDark) | menu | Properties > onDark |
| should be undefined initially (optionActive) | menu | Properties > optionActive |
| should default to false (selectAllMatchingOptions) | menu | Properties > selectAllMatchingOptions |
| should select all matching duplicate values when true | menu | Properties > selectAllMatchingOptions |
| should default to box (shape) | menu | Properties > shape |
| should accept a shape property | menu | Properties > shape |
| should default to sm (size) | menu | Properties > size |
| should accept a size property | menu | Properties > size |
| should default to undefined (value) | menu | Properties > value |
| should return an empty array for no options | menu | Properties > options |
| should return empty string when no option selected | menu | Properties > currentLabel |
| should return same value as options (items) | menu | Properties > items |
| should default to -1 (index) | menu | Properties > index |
| should highlight correct option when index set | menu | Properties > index |
| should return empty array when no option selected | menu | Properties > selectedOptions |
| should return undefined when no option selected | menu | Properties > selectedOption |
| should set the given option as active | menu | Public Functions > updateActiveOption |
| should fire when index is set programmatically | menu | Events > auroMenu-activatedOption |
| should default to false (disabled) | menuoption | Properties |
| should set aria-disabled when disabled | menuoption | Properties > disabled |
| should default to the value when key not set | menuoption | Properties > key |
| should use explicit key when provided | menuoption | Properties > key |
| should default to false (selected) | menuoption | Properties > selected |
| should accept a value property | menuoption | Properties > value |

### Low Importance (15)

| Test | File | Section |
|------|------|---------|
| should register the custom element (menu) | menu | Public Functions > register |
| should execute without error (resetShapeClasses) | menu | Public Functions |
| should execute without error (resetLayoutClasses) | menu | Public Functions |
| should execute without error (updateComponentArchitecture) | menu | Public Functions |
| should render content in the default slot | menuoption | Slots |
| should register the custom element (menuoption) | menuoption | Public Functions > register |
| should return true for normal visible option | menuoption | Public Functions > isActive |
| should return false for disabled option | menuoption | Public Functions > isActive |
| should return false for hidden option | menuoption | Public Functions > isActive |
| should return false for static option | menuoption | Public Functions > isActive |
| should have a tabIndex property | menuoption | Properties > tabIndex |
| should reflect the value attribute | menuoption | Properties > value |
| should be accessible (with aria-labelledby) | menuoption | A11Y |
| should have role option for keyboard navigation | menuoption | Keyboard |
| should be defined as a custom element | menuoption | Rendering |
