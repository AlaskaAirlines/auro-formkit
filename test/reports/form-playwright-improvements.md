# auro-form Playwright Interaction Test Improvements

## Summary

Added **23 Playwright interaction tests** for `auro-form`, running across both React and Svelte frameworks (**46 total tests**). These tests complement the existing 40 WTR unit tests by exercising real user interaction flows including typing, clicking buttons, keyboard submission, and multi-element form handling.

## Test Categories

| Category | Tests | Description |
|---|---|---|
| Form value collection | 3 | Named input collection, preset values, checkbox-group arrays |
| Form validity | 3 | Untouched (null), valid after fill, invalid after clear |
| isInitialState | 3 | Initial true, false after typing, true after reset |
| Submit interaction | 2 | Button click fires event when valid, submit() no-op when invalid |
| Enter key submission | 2 | Enter fires submit when valid, no-op when invalid |
| Reset interaction | 3 | Clears values, fires event with previousValue, restores initial state |
| Button disabled states | 4 | Submit/reset disabled initially, enabled after change/validation |
| Validation error display | 1 | submit() surfaces valueMissing on required fields |
| Events | 1 | Change event fires on input value change |
| Mixed element form | 1 | Collects values from input + checkbox-group together |
| **Total** | **23** | |

## Files Added/Modified

### New Files
- `apps/shared/form-interaction.suite.ts` — Shared Playwright test suite
- `apps/react-framework/src/pages/FormInteraction.tsx` — React test page (4 fixtures)
- `apps/svelte-framework/src/routes/form-interaction/+page.svelte` — Svelte test page
- `apps/react-framework/tests/form-interaction.spec.ts` — React spec file
- `apps/svelte-framework/tests/form-interaction.spec.ts` — Svelte spec file

### Modified Files
- `apps/react-framework/src/App.tsx` — Added `/form-interaction` route
- `apps/react-framework/src/main.tsx` — Added `auro-form` and `auro-input` imports

## Test Fixtures

| Fixture | Elements | Purpose |
|---|---|---|
| `simple` | 2 required auro-inputs + submit + reset buttons | Core form operations |
| `prefilled` | 1 auro-input with preset value | Initialization behavior |
| `mixed` | auro-input + auro-checkbox-group + submit + reset | Multi-element forms |
| `validation` | Required + optional auro-inputs + submit | Validation error display |

## Verification

```
React:   23 passed (11.8s)
Svelte:  23 passed (22.4s)
Total:   46 passed
```
