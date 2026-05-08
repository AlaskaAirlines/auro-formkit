# auro-menu Playwright Interaction Test Improvements

## Summary

Added **30 Playwright interaction tests** for `auro-menu` and `auro-menuoption`, running across both React and Svelte frameworks (**60 total tests**). These tests complement the existing 152 WTR unit tests by exercising real user click interactions, multi-select flows, programmatic navigation, nested menu traversal, and ARIA attribute verification.

## Test Categories

| Category | Tests | Description |
|---|---|---|
| Mouse click selection | 5 | Click selects, replaces, sets/removes selected attribute, fires event |
| Disabled options | 3 | Disabled ignores click (pointer-events: none), aria-disabled, enabled sibling works |
| Multi-select | 3 | Multiple selections, click-to-deselect toggle, JSON array value |
| Preset value | 2 | Initial value selects option, currentLabel reflects preset |
| Allow deselect | 2 | Click same option deselects, deselect prevented without flag + event |
| Programmatic navigation | 7 | Down highlights first/next, up wraps, skips disabled/hidden, makeSelection, activatedOption event |
| Reset | 2 | reset() clears selection, fires selectValueReset event |
| No checkmark | 1 | Selected option has no check icon when noCheckmark set |
| Nested menu | 3 | Child option selects on root, parent option works, navigation traverses nested |
| ARIA attributes | 2 | aria-selected on option, aria-multiselectable on menu |
| **Total** | **30** | |

## Files Added/Modified

### New Files
- `apps/shared/menu-interaction.suite.ts` — Shared Playwright test suite
- `apps/react-framework/src/pages/MenuInteraction.tsx` — React test page (9 fixtures)
- `apps/svelte-framework/src/routes/menu-interaction/+page.svelte` — Svelte test page
- `apps/react-framework/tests/menu-interaction.spec.ts` — React spec file
- `apps/svelte-framework/tests/menu-interaction.spec.ts` — Svelte spec file

### Modified Files
- `apps/react-framework/src/App.tsx` — Added `/menu-interaction` route

## Test Fixtures

| Fixture | Configuration | Purpose |
|---|---|---|
| `default` | 4 options | Single-select, click, events, deselect-prevented |
| `multiselect` | `multiSelect`, 4 options | Multi-select toggle, JSON array value |
| `with-disabled` | 1 disabled option between 2 enabled | Disabled option click-blocking, navigation skip |
| `preset` | `value="Oranges"` | Initial value selection |
| `allow-deselect` | `allowDeselect` | Click-to-deselect behavior |
| `no-checkmark` | `noCheckmark` | Visual checkmark suppression |
| `disabled-menu` | `disabled` | Entire menu disabled |
| `nested` | Child `auro-menu` inside parent | Nested option selection and navigation |
| `with-hidden` | 1 hidden option | Navigation skips hidden options |

## Verification

```
React:   30 passed (10.5s)
Svelte:  30 passed (24.3s)
Total:   60 passed
```
