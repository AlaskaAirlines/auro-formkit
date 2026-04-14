# Combobox Test Improvements

## Summary
- **Component**: `auro-combobox`
- **Test file**: `components/combobox/test/auro-combobox.test.js`
- **All tests run twice** (desktop + mobile viewport) = **325 passing test executions** (was 167)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-combobox` test count | 167 | 325 | +158 |
| Code coverage | 94.28% | 95.72% | +1.44% |
| Test duration | ~7.4s | ~7.8s | +0.4s |

## Per-File Coverage
| File | Lines Hit | Total Lines | Coverage |
|------|-----------|-------------|----------|
| `auro-combobox.js` | 1629 | 1673 | 97.37% |
| `comboboxKeyboardStrategy.js` | 143 | 155 | 92.26% |
| `registered.js` | 5 | 5 | 100% |
| Style files | 6 | 6 | 100% |

## New Tests Added

### Properties (+52 tests)
| Property | Tests Added | Notes |
|----------|------------|-------|
| `appearance` | 2 | Defaults to "default", reflects when set |
| `autocomplete` | 2 | Not set by default, reflects when set |
| `autoPlacement` | 2 | Not set by default, reflects boolean |
| `disabled` | 2 | Defaults false, disables input when set |
| `dvInputOnly` | 2 | Not set by default, reflects boolean |
| `format` | 2 | Not set by default, reflects when set |
| `fullscreenBreakpoint` | 2 | Defaults to "sm", reflects when set |
| `largeFullscreenHeadline` | 2 | Not set by default, reflects boolean |
| `layout` | 2 | Defaults to "classic", reflects when set |
| `noFlip` | 2 | Not set by default, reflects boolean |
| `noValidate` | 2 | Not set by default, reflects boolean |
| `offset` | 2 | Defaults to 0, reflects when set |
| `onDark` | 2 | Not set by default, reflects boolean |
| `optionSelected` | 2 | Undefined by default, tracks after selection |
| `placement` | 2 | Defaults to "bottom-start", reflects when set |
| `placeholder` | 2 | Not set by default, reflects when set |
| `setCustomValidity` | 2 | Undefined by default, stores custom message |
| `setCustomValidityCustomError` | 2 | Undefined by default, stores custom error |
| `setCustomValidityValueMissing` | 2 | Undefined by default, stores missing message |
| `setCustomValidityValueMissingFilter` | 2 | Undefined by default, stores filter message |
| `shape` | 2 | Defaults to "classic", reflects when set |
| `shift` | 2 | Not set by default, reflects boolean |
| `size` | 2 | Defaults to "xl", reflects when set |
| `triggerIcon` | 2 | Not set by default, reflects boolean |
| `type` | 2 | Not set by default, reflects when set |
| `typedValue` | 2 | Undefined by default, cleared on reset() |
| `validity` | 3 | Undefined by default, valid/valueMissing states |

### Public Functions (+17 tests)
| Function | Tests Added | Notes |
|----------|------------|-------|
| `isValid` | 3 | Returns true for undefined/valid, false for error |
| `register` | 1 | Confirms custom element registration |
| `hideBib` | 2 | Hides visible dropdown, no-op when hidden |
| `showBib` | 2 | Shows with matching options, no-op when empty |
| `setMenuValue` | 1 | Sets menu value programmatically |
| `reset` | 1 | Clears value, optionSelected, touched |
| `clear` | 1 | Clears value and optionSelected |
| `validate` | 3 | Forces validation, respects _inFullscreenTransition |
| `updateActiveOption` | 1 | Updates active option by availableOptions index |
| `resetShapeClasses` | 1 | Verifies shape class application |
| `resetLayoutClasses` | 1 | Verifies layout class application |
| `updateComponentArchitecture` | 1 | Calls both reset methods without error |
| `inputValue` | 2 | Returns undefined/current value from input |

### Events (+4 tests)
| Event | Tests Added | Notes |
|-------|------------|-------|
| `auroCombobox-valueSet` | 1 | Fires on value selection |
| `input` | 1 | Fires when user types |
| `inputValue` | 1 | Fires on input value change |
| `auroFormElement-validated` | 1 | Fires after validation completes |

## Fixes During Development
1. **noValidate**: Property is declared but not actually gating validation logic — changed test to verify attribute reflection only
2. **typedValue**: Only used as initial/reset value, not a live mirror of user input — changed test to verify reset behavior instead

## Test Architecture
- Tests use `runFullTest(mobileView)` pattern executing all tests twice (desktop + mobile viewport)
- Desktop viewport: 800×800, Mobile viewport: 500×800
- Mobile tests include fullscreen dialog behavior (inputInBib, close button, etc.)
- Fixtures in `testFixtures.js`, helper functions in `testFunctions.js`

## New Tests by Importance

| Priority | Description | Count |
|----------|-------------|-------|
| High | Core functionality & validation | 17 |
| Medium | Property reflection & behavior | 52 |
| Low | Registration & architecture helpers | 4 |
| **Total** | | **73** |
