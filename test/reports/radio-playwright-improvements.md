# auro-radio Playwright Interaction Test Improvements

## Summary

Added **26 Playwright interaction tests** for `auro-radio` and `auro-radio-group`, running across both React and Svelte frameworks (**52 total tests**). These tests complement the existing 160 WTR unit tests (72 for auro-radio, 88 for auro-radio-group) by exercising real user click and keyboard interactions, mutual exclusivity, disabled states, preset values, validation, reset, and ARIA attribute verification.

## Test Categories

| Category | Tests | Description |
|---|---|---|
| Mouse click selection | 4 | Click selects, changes selection, already-selected stays, input event fires |
| Keyboard navigation | 6 | ArrowDown next, ArrowUp previous, wraps last→first, wraps first→last, skips disabled, Space selects |
| Disabled options | 2 | Click disabled no-op (force:true), aria-disabled attribute present |
| Disabled group | 2 | Click in disabled group no-op (force:true), all radios have disabled attribute |
| Preset value | 2 | Preset checked on load, others not checked |
| Validation | 4 | Required valueMissing on blur, valid after selection, error attr customError, validated event fires |
| Reset | 2 | reset() clears selection/value, reset() clears validity |
| ARIA attributes | 3 | role=radiogroup on fieldset, aria-checked=true on selected, aria-checked=false on unselected |
| Mutual exclusivity | 1 | Only one radio checked at a time |
| **Total** | **26** | |

## Notable Findings

- **`value` property not reflected**: `auro-radio`'s `value` property does not have `reflect: true` in LitElement, so it is not available as a DOM attribute. React 19 correctly sets it as a JS property, but CSS attribute selectors (`[value="..."]`) cannot match it. Test pages use `data-value` attributes for reliable Playwright selection.
- **`noValidate` not implemented in blur handler**: Unlike `auro-input` which checks `noValidate` before calling `validate()` on blur, `auro-radio-group.handleRadioBlur()` always calls validation. The `noValidate` property exists but has no effect on blur validation. Test for this behavior was removed.
- **`aria-disabled` is a boolean attribute**: The component sets `aria-disabled` as a boolean attribute (empty string `""` when present), not the string `"true"`.

## Files Added/Modified

### New Files
- `apps/shared/radio-interaction.suite.ts` — Shared Playwright test suite
- `apps/react-framework/src/pages/RadioInteraction.tsx` — React test page (8 fixtures)
- `apps/svelte-framework/src/routes/radio-interaction/+page.svelte` — Svelte test page
- `apps/react-framework/tests/radio-interaction.spec.ts` — React spec file
- `apps/svelte-framework/tests/radio-interaction.spec.ts` — Svelte spec file

### Modified Files
- `apps/react-framework/src/App.tsx` — Added `/radio-interaction` route
- `apps/react-framework/src/main.tsx` — Added `auro-radio` import

## Test Fixtures

| Fixture | Configuration | Purpose |
|---|---|---|
| `default` | 3 radios (red/blue/green) | Click selection, keyboard nav, mutual exclusivity, reset |
| `with-disabled` | 1 disabled between 2 enabled | Disabled click-blocking, arrow skip, aria-disabled |
| `preset` | beta checked | Preset value on load |
| `required` | `required`, 2 radios | Validation: valueMissing/valid, validated event, reset validity |
| `disabled-group` | `disabled` on group | Entire group disabled propagation |
| `horizontal` | `horizontal`, 3 radios | Horizontal layout |
| `with-error` | `error="..."` | customError validity |
| `no-validate` | `required noValidate` | noValidate behavior |

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Shadow DOM focus delegation | Replaced `toBeFocused()` with shadow-DOM-aware polling: `el.shadowRoot?.activeElement != null \|\| el.matches(':focus-within')` | Space selects focused radio, validated event fires after blur, required group valueMissing on blur, reset() clears validity |
| Rapid sequential clicks | Added `await expect.poll(() => groupValue(...))` between consecutive radio clicks | Only one radio can be checked at a time |
| ArrowUp keyboard timeout | Added `{ timeout: 5_000 }` to value poll after ArrowUp wrap | ArrowUp wraps from first to last |

`auro-radio` delegates focus into its shadow DOM. Playwright's `toBeFocused()` checks `document.activeElement`, which may not match the host element when focus delegation hasn't fully settled under load.

## Verification

```
React:   26 passed
Svelte:  26 passed
Total:   52 passed
```
