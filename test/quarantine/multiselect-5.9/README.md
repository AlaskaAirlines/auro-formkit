# Quarantined MultiSelect 5.9 Tests

## Why these tests exist

Preserved baseline for future multiSelect rebuild per ADO #1544890 AC2. These tests were written against the 5.9 MenuService/Lit Context architecture (PR #1225) and exercised features removed in the v6 revert.

## What contract they encode

- JSON-stringified array value contract (e.g. `'["Apples"]'`)
- `allowDeselect` attribute on `auro-menu`
- `selectAllMatchingOptions` attribute on `auro-menu`
- `key` attribute on `auro-menuoption`
- `menuService` property on `auro-menu` (Lit Context provider)
- `auroMenu-deselectPrevented` event

## Activation procedure

1. Change `describe.skip` to `describe` in each `.spec.js` file
2. Restore imports — each file documents the imports it needs at the top
3. Copy fixtures from `testFixtures.multiselect.js` back to the component test dirs
4. Run with `npm run test`

## Known incompatibilities

These tests assume the MenuService/Lit Context architecture. A future multiSelect rebuild on a different architecture will need to rewrite assertions, but the test cases (what to test) remain valid.

## Origin

- ADO #1544889 (implementation scope)
- PR #1225 (MenuService introduction)
- PR #1432 (coverage expansion, 2,483 tests added)
