# Counter Playwright Interaction Test Improvements

## Summary
- **Components**: `auro-counter`, `auro-counter-group`
- **Shared suite**: `apps/shared/counter-interaction.suite.ts`
- **Test harnesses**: React (`CounterInteraction.tsx`) + Svelte (`counter-interaction/+page.svelte`)
- **Total tests**: 25 per framework × 2 frameworks = **50 passing test executions**
- **Complements**: Existing `counter-dropdown.suite.ts` (Tab navigation) and `counter-remount.suite.ts` / `single-counter-remount.suite.ts` (value persistence)

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), the hybrid approach recommends keeping WTR for fast unit tests while Playwright covers interaction-heavy scenarios. The counter component has key gaps:

- **ArrowUp/ArrowDown on enabled counters** was never tested anywhere — WTR only tested the disabled no-op case.
- **Click on +/- buttons** was never tested — WTR called `el.increment()` / `el.decrement()` directly, bypassing the actual button click pipeline.
- **Counter-group dropdown interactions** (open, close, Escape, click-outside) need real browser context for focus-loss behavior.
- **Group max constraint enforcement** (disabling all plus buttons when total hits max) is a multi-step flow best validated with real clicks.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/counter-interaction.suite.ts` | Shared Playwright test suite (22 tests) |
| `apps/react-framework/src/pages/CounterInteraction.tsx` | React test harness page with 5 fixture sections |
| `apps/react-framework/tests/counter-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/counter-interaction/+page.svelte` | Svelte test harness page with 5 fixture sections |
| `apps/svelte-framework/tests/counter-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/counter-interaction` route |

## Test Fixtures

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | Standalone counter (min=0, max=9, value starts at 0) | ArrowUp/ArrowDown, button clicks |
| `at-max` | Counter pre-set to value=9, max=9 | Max boundary tests, plus button disabled |
| `at-min` | Counter pre-set to value=0, min=0 | Min boundary tests, minus button disabled |
| `disabled` | Disabled counter with value=3 | Keyboard and mouse no-op tests |
| `dropdown-group` | Counter-group with `isDropdown`, max=6, 3 counters | Dropdown open/close, group max, Tab navigation |

An `#outside-element` button sits outside all counters for focus-loss tests.

## Tests Added

### Standalone Counter — Keyboard interaction (6 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| ArrowUp increments the counter value | Real key event on spinbutton — **not tested in WTR** |
| ArrowDown decrements the counter value | Real key event on spinbutton — **not tested in WTR** |
| ArrowUp does not exceed max value | Boundary enforcement via keyboard |
| ArrowDown does not go below min value | Boundary enforcement via keyboard |
| ArrowUp is a no-op when counter is disabled | Disabled state keyboard protection |
| ArrowDown is a no-op when counter is disabled | Disabled state keyboard protection |

### Standalone Counter — Mouse interaction (7 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking the plus button increments the value | Real button click — **WTR only tests programmatic `increment()`** |
| Clicking the minus button decrements the value | Real button click — **WTR only tests programmatic `decrement()`** |
| Plus button is disabled when value equals max | Visual disabled state at boundary |
| Minus button is disabled when value equals min | Visual disabled state at boundary |
| Clicking plus on a counter at max does not change the value | Boundary click-protection |
| Clicking minus on a counter at min does not change the value | Boundary click-protection |
| Clicking buttons on a disabled counter does not change the value | Disabled state click-protection |

### Standalone Counter — Accessibility (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Counter has spinbutton role with correct ARIA attributes | `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` |
| aria-valuenow updates after ArrowUp | Dynamic ARIA state reflects value changes |

### Counter-Group Dropdown — Open/close (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking the trigger opens the dropdown | Real click triggers popover |
| Escape closes the dropdown | `stopPropagation` Escape handling |
| Clicking outside closes the dropdown | Focus-loss via `locator.focus()` on external element |

### Counter-Group Dropdown — Keyboard interaction (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| ArrowUp increments a counter inside the dropdown | Keyboard inside open dropdown |
| ArrowDown decrements a counter inside the dropdown | Keyboard inside open dropdown |
| Tab navigates between counters in the dropdown | Focus moves across counter elements |

### Counter-Group Dropdown — Mouse interaction (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking plus on a counter inside the dropdown increments it | Button click inside dropdown context |
| Clicking minus on a counter inside the dropdown decrements it | Button click inside dropdown context |

### Counter-Group Dropdown — Group max constraint (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Incrementing counters up to group max disables all plus buttons | All 3 plus buttons disabled when total=6 |
| Group total reflects sum of all counters | `el.total` equals sum of individual counter values |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| ArrowUp/ArrowDown on enabled counter | Only tested disabled no-op case | Real OS-level key events on focused spinbutton |
| Button clicks | Called `el.increment()`/`el.decrement()` directly | `click()` on actual `auro-counter-button` elements |
| Dropdown focus-loss | Not testable — no real focus change | `locator.focus()` on external element triggers close |
| Group max enforcement | Tested programmatically | Multi-step real clicks verify button disabled state |
| Tab navigation in dropdown | Tested in separate suite | Also validated here with ArrowUp/ArrowDown inside dropdown |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte |

## Relationship to Existing Suites

| Suite | What it tests |
|-------|--------------|
| `counter-dropdown.suite.ts` | Tab focus navigation, Shift+Tab backward navigation, dropdown stays open |
| `counter-remount.suite.ts` | Value persistence across DOM unmount/remount (group) |
| `single-counter-remount.suite.ts` | Value persistence across DOM unmount/remount (standalone) |
| **`counter-interaction.suite.ts` (new)** | ArrowUp/ArrowDown, button clicks, boundaries, disabled, dropdown open/close, group max |

No test overlap exists between the suites.

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Tab without focus confirmation | Added `await expect(counter(...).first()).toBeFocused()` after Tab into dropdown content before ArrowUp/ArrowDown | ArrowUp increments counter in dropdown, ArrowDown decrements counter in dropdown |

## Architecture

- **Shared suite pattern**: `counter-interaction.suite.ts` exports `counterInteractionSuite(framework)`, consumed by both framework spec files
- **Fixture isolation**: Each test targets a specific `data-testid` section
- **Helper functions**: `waitForCounter()`, `counter()`, `counterGroup()`, `counterValue()`, `focusCounter()`, `clickPlus()`, `clickMinus()`, `isPlusDisabled()`, `isMinusDisabled()`, `isBibVisible()`, `waitForBibOpen()`, `waitForBibClosed()` — all using shadow DOM traversal and `expect.poll()` for resilient assertions

## Test Results

```
React:    25 passed
Svelte:   25 passed
```
