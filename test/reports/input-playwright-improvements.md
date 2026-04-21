# auro-input Playwright Interaction Test Improvements

## Summary

Added **26 Playwright interaction tests** for `auro-input`, running across both React and Svelte frameworks (**52 total tests**). These tests complement the existing 171 WTR unit tests by exercising real user interaction flows including typing, blur validation, password toggle, clear button, credit card formatting, and focus management.

## Test Categories

| Category | Tests | Description |
|---|---|---|
| Typing and value | 4 | Type sets value, preset reflected, clear via keyboard, input event fires |
| Validation | 11 | Required/valueMissing, valid after fill, email reject/accept, minLength/tooShort, valid length, pattern mismatch/valid, noValidate, error attr, validated event |
| Disabled and readonly | 2 | Disabled blocks typing, readonly blocks typing |
| Password toggle | 3 | Default masked, toggle reveals text, toggle again hides |
| Clear button | 2 | Appears when value present, click clears value |
| Credit card formatting | 1 | Visa number formatted with spaces via IMask |
| Focus management | 2 | focus() targets native input, retains focus for typing |
| Reset | 1 | reset() clears value and validity |
| **Total** | **26** | |

## Files Added/Modified

### New Files
- `apps/shared/input-interaction.suite.ts` — Shared Playwright test suite
- `apps/react-framework/src/pages/InputInteraction.tsx` — React test page (12 fixtures)
- `apps/svelte-framework/src/routes/input-interaction/+page.svelte` — Svelte test page
- `apps/react-framework/tests/input-interaction.spec.ts` — React spec file
- `apps/svelte-framework/tests/input-interaction.spec.ts` — Svelte spec file

### Modified Files
- `apps/react-framework/src/App.tsx` — Added `/input-interaction` route

## Test Fixtures

| Fixture | Configuration | Purpose |
|---|---|---|
| `default` | Basic text input | Typing, clear button, focus |
| `required` | `required` | Validation on blur |
| `email` | `type="email" required` | Email pattern validation |
| `password` | `type="password"` | Password toggle show/hide |
| `credit-card` | `type="credit-card" icon` | IMask card formatting |
| `disabled` | `disabled value="Cannot edit"` | Disabled state |
| `readonly` | `readonly value="Read only"` | Readonly state |
| `preset` | `value="Hello World"` | Preset value reflection |
| `length-constraints` | `required minLength=3 maxLength=10` | Length validation |
| `pattern` | `required pattern="^\d{5}$"` | Pattern validation |
| `no-validate` | `required noValidate` | Skip validation on blur |
| `error-attr` | `error="Custom error message"` | Programmatic error |

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Focus before blur validation | Added `await expect(auroInput(...).locator('input')).toBeFocused()` after focus before click-outside blur | required field shows valueMissing on blur, noValidate prevents validation on blur, validated event fires after blur validation |

## Verification

```
React:   26 passed
Svelte:  26 passed
Total:   52 passed
```
