# Checkbox Playwright Interaction Test Improvements

## Summary
- **Components**: `auro-checkbox`, `auro-checkbox-group`
- **Shared suite**: `apps/shared/checkbox-interaction.suite.ts`
- **Test harnesses**: React (`CheckboxInteraction.tsx`) + Svelte (`checkbox-interaction/+page.svelte`)
- **Total tests**: 22 per framework × 2 frameworks = **44 passing test executions**
- **First Playwright coverage**: No Playwright tests existed previously for checkbox.

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), the hybrid approach recommends Playwright for interaction-heavy scenarios. The checkbox component had notable gaps:

- **Space key toggle was never tested** — the `handleKeyDown` method is implemented in source but no WTR test exercises it.
- **WTR tests click `input.click()`** (the hidden native input) rather than the checkbox host element, bypassing the component's `click` event handler which calls `evt.preventDefault()` and delegates to the input.
- **Tab navigation between checkboxes in a group** is not tested in WTR.
- **Required group validation after user interaction** (check → uncheck → blur → error) is a multi-step flow better tested with real user events.
- **Cross-framework validation** — no checkbox tests existed in React or Svelte.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/checkbox-interaction.suite.ts` | Shared Playwright test suite (22 tests) |
| `apps/react-framework/src/pages/CheckboxInteraction.tsx` | React test harness page with 6 fixture sections |
| `apps/react-framework/tests/checkbox-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/checkbox-interaction/+page.svelte` | Svelte test harness page with 6 fixture sections |
| `apps/svelte-framework/tests/checkbox-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/checkbox-interaction` route |
| `apps/react-framework/src/main.tsx` | Added `auro-checkbox` import |

## Test Fixtures

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | Single unchecked checkbox | Click/Space toggle, events |
| `disabled` | Single disabled checkbox | Disabled no-op tests |
| `checked` | Single pre-checked checkbox | Uncheck tests |
| `group` | Group with 3 checkboxes (Apples, Oranges, Bananas) | Multi-select, Tab navigation |
| `required-group` | Required group with 2 checkboxes | Validation tests |
| `disabled-group` | Disabled group with 2 checkboxes | Disabled group tests |

An `#outside-element` button sits outside all checkboxes for focus-loss/validation tests.

## Tests Added

### Single Checkbox — Mouse interaction (4 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking a checkbox checks it | Real click on host element — **WTR clicks the hidden `<input>`** |
| Clicking a checked checkbox unchecks it | Toggle off via real click |
| Clicking a disabled checkbox does not toggle it | Disabled state protection |
| Clicking a pre-checked checkbox unchecks it | Starting from checked state |

### Single Checkbox — Keyboard interaction (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Space toggles the checkbox on | **Not tested in WTR** — first test of `handleKeyDown` |
| Space toggles the checkbox off | Toggle off via real Space key |
| Space on a disabled checkbox does not toggle it | Disabled keyboard protection |

### Single Checkbox — ARIA attributes (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| aria-checked reflects the checked state | Dynamic `aria-checked` toggle: false → true → false |
| aria-disabled is set on disabled checkbox | `aria-disabled="true"` on disabled element |
| Checkbox has role="checkbox" | Correct ARIA role on host element |

### Single Checkbox — Events (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Fires input event when clicked | Native `input` event dispatched |
| Fires auroCheckbox-input event when clicked | Custom event dispatched on interaction |

### Checkbox Group — Mouse interaction (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking multiple checkboxes in a group checks them independently | Multi-select behavior |
| Unchecking one does not affect others | Independent toggle behavior |
| Clicking a checkbox in a disabled group does not toggle it | Group-level disabled enforcement |

### Checkbox Group — Keyboard interaction (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Tab navigates between checkboxes in a group | **Not tested in WTR** — focus moves via Tab |
| Space selects a checkbox after Tab navigation | Tab + Space combination flow |

### Checkbox Group — Validation (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Required group shows error when no checkbox is selected after interaction | Check → uncheck → blur → `validity === 'valueMissing'` |
| Required group clears error when a checkbox is selected | Error cleared by selecting an option |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| Space key toggle | **Not tested at all** | Real `keyboard.press('Space')` tests the `handleKeyDown` code path |
| Click handler | `input.click()` on hidden input bypasses host click handler | `locator.click()` on host element exercises the full `evt.preventDefault()` → `input.click()` pipeline |
| Tab navigation in group | Not tested | Real Tab moves focus between `auro-checkbox` elements across shadow DOM |
| Required validation flow | Not tested as a multi-step interaction | Check → uncheck → blur → assert error → check → assert cleared |
| Disabled group enforcement | Tested per-checkbox in WTR | Tested via real click on checkbox inside a disabled group |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte |

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Focus before keyboard action | Added `await expect(checkbox(...)).toBeFocused()` after `focusCheckbox()` before Space key presses | Space toggles on, Space toggles off, Space on disabled |
| Rapid sequential clicks | Added `await expect.poll(() => isChecked(...)).toBe(true)` between consecutive clicks | Clicking multiple checkboxes, unchecking one does not affect others |
| Required group check/uncheck | Added intermediate `expect.poll` waits between check → uncheck → blur steps | Required group clears error |

## Architecture

- **Shared suite pattern**: `checkbox-interaction.suite.ts` exports `checkboxInteractionSuite(framework)`, consumed by both framework spec files
- **Fixture isolation**: Each test targets a specific `data-testid` section
- **Helper functions**: `waitForCheckbox()`, `checkbox()`, `checkboxGroup()`, `isChecked()`, `focusCheckbox()` — using `expect.poll()` for resilient assertions
- **No test duplication**: WTR retains property reflection, slot checks, event detail verification, custom validity, `reset()` behavior, and `useAccessibleIt()` a11y audits

## Test Results

```
React:    22 passed
Svelte:   22 passed
```
