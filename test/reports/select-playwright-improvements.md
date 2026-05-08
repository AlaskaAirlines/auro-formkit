# Select Playwright Interaction Test Improvements

## Summary
- **Component**: `auro-select`
- **Shared suite**: `apps/shared/select-interaction.suite.ts`
- **Test harnesses**: React (`SelectInteraction.tsx`) + Svelte (`select-interaction/+page.svelte`)
- **Total tests**: 50 per framework × 2 frameworks = **100 passing test executions**
- **Viewports**: Desktop (1280×800) + Fullscreen mobile (390×844, iPhone 14)

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), `auro-select` is one of four components that benefit most from Playwright over WTR for interaction-heavy scenarios. The discussion identifies specific behaviors where WTR's synthetic events miss real browser behavior:

- **Type-ahead cycling**: Real browser type-ahead has timing windows (typing "bb" fast cycles through "b" matches vs typing "b"..."b" slowly). Playwright can test with real inter-keystroke delays.
- **Multi-select keyboard interaction**: Enter keeping the bib open, selecting multiple items, then Tab to close — a multi-step flow where intermediate state matters.
- **Click outside to close**: Explicitly commented out in WTR with a BUG note about `popover='manual'` + `noHideOnThisFocusLoss`. Playwright can test real focus-loss scenarios.
- **Trigger focus return after selection**: `expect(locator).toBeFocused()` is more reliable across shadow DOM.
- **Native select autofill sync**: Real form submission and browser autofill are only testable in Playwright.

This follows the recommended **hybrid approach**: WTR retains fast, granular unit tests (properties, attributes, rendering, a11y), while Playwright covers multi-step user interaction flows and viewport-dependent behavior.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/select-interaction.suite.ts` | Shared Playwright test suite (50 tests) |
| `apps/react-framework/src/pages/SelectInteraction.tsx` | React test harness page with 9 fixture sections |
| `apps/react-framework/tests/select-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/select-interaction/+page.svelte` | Svelte test harness page with 9 fixture sections |
| `apps/svelte-framework/tests/select-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/select-interaction` route |

## Test Fixtures

Each test harness page provides 9 scoped select fixtures via `data-testid` sections:

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | 4 options (Apples, Oranges, Bananas, Grapes) | Arrow cycling, Enter/Tab/Escape, click-outside, focus return |
| `nested` | Nested `auro-menu` with 4 options across 2 levels | Cross-boundary keyboard traversal |
| `preset` | Pre-selected value (Oranges) | Re-selection / deselect tests |
| `multiselect` | `multiselect` attribute, 4 options | Enter keeps bib open, multi-item selection + Tab close |
| `typeahead` | 4 options (Apple, Apricot, Avocado, Banana) | Type-ahead cycling with same-letter options |
| `required` | `required` attribute | Validation tests |
| `disabled-first` | First option disabled | Home-skips-disabled behavior |
| `disabled-last` | Last option disabled | End-skips-disabled behavior |
| `disabled-multi` | `multiselect` with first option disabled | Disabled option in multiselect click tests |

An `#outside-element` button sits outside all selects for click-outside-to-close tests.

## Tests Added

### Desktop — Keyboard Navigation (16 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| ArrowDown / ArrowUp cycle through options | Real key events with wrapping navigation |
| ArrowDown / ArrowUp navigate nested menus | Cross-boundary traversal across nested `auro-menu` |
| Alt+ArrowDown jumps to last option | Modifier combo (OS-level key events) |
| Meta+ArrowDown jumps to last option | macOS modifier combo |
| Alt+ArrowUp jumps to first option | Modifier combo |
| Meta+ArrowUp jumps to first option | macOS modifier combo |
| Home jumps to the first option | Standard listbox keyboard contract |
| End jumps to the last option | Standard listbox keyboard contract |
| ArrowDown opens bib when collapsed | Open from closed state |
| ArrowUp opens bib when collapsed | Open from closed state |
| Enter opens bib when collapsed | Open from closed state |
| Space toggles the bib open and closed | Toggle behavior |
| Enter selects active option and closes bib | Selection + close in one keystroke |
| Tab selects active option and closes bib | Tab selecting + simultaneous close |
| Shift+Tab selects active option and closes bib | Reverse-tab across shadow DOM |
| Escape closes bib without making a selection | No selection forced on dismiss |

### Desktop — Type-ahead cycling (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Selects the first option matching the pressed key | Real `keyboard.press()` with timing windows |
| Cycles through options with the same starting letter | A → Apple → Apricot → Avocado → Apple (wrapping) |
| Does nothing when no option matches the pressed key | No change on unmatched key |

### Desktop — Multi-select keyboard interaction (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Enter keeps the bib open in multiselect mode | Bib stays open after selection |
| Can select multiple items then Tab to close | Enter (Apples) → ArrowDown → Enter (Oranges) → Tab close — multi-step flow |

### Desktop — Click outside to close (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Closes the bib when clicking an element outside the select | Real focus-loss via `page.click()` — **commented out in WTR with BUG note** |
| Does not make a selection when clicking outside | No forced selection on focus-loss |
### Desktop — Mouse interaction (6 tests)
| Test | Key Behavior Validated |
|------|------------------------|
| Clicking the trigger toggles the bib open and closed | Real click toggle behavior |
| Clicking an option selects it and closes the bib | Real click on menu option triggers selection + bib close |
| Clicking a disabled option does not select or close the bib | Disabled option ignores real click events |
| Clicking an option in multiselect selects it and keeps the bib open | Multiselect click keeps bib open |
| Clicking an already-selected option in multiselect deselects it | Toggle deselect via click in multiselect mode |
| Clicking a disabled option in multiselect does nothing | Disabled option in multiselect ignores clicks |
### Desktop — Focus management (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Returns focus to trigger after selecting via Enter | `trigger.matches(':focus')` across shadow DOM |
| Returns focus to trigger after selecting via click | `trigger.matches(':focus')` after option click |

### Desktop — Screen reader announcements (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Populates live region when type-ahead activates an option | `#srAnnouncement` receives text on keydown |
| Clears live region after announcement duration | Auto-clear timer (~1000ms) — replaces fragile `setTimeout(2200)` in WTR |

### Fullscreen mobile (8 tests)
| Test | Key Behavior Validated |
|------|------------------------|
| Opens fullscreen dialog on mobile viewport | `isBibFullscreen === true` at 390px width |
| Keyboard navigation works in fullscreen mode | ArrowDown inside fullscreen dialog |
| Enter selects option and closes fullscreen dialog | Selection within dialog context |
| Escape closes fullscreen dialog | Composed event propagation across shadow boundaries |
| Tab closes fullscreen dialog | Tab behavior inside dialog context |
| Trigger is set to inert while fullscreen dialog is open | `dropdown.trigger.inert === true` during fullscreen |
| Trigger inert and focus are restored after fullscreen dialog closes | `trigger.inert === false` + trigger has focus after Escape |
| Screen reader announcements route to bib live region in fullscreen | Announcements go to bib's shadow root, not host |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| Type-ahead cycling | `KeyboardEvent` with synthetic `key` property | `keyboard.press()` fires real OS-level key events with actual timing windows |
| Click outside to close | Commented out with BUG note — `popover='manual'` + `noHideOnThisFocusLoss` | `page.click()` on an outside element triggers actual focus-loss |
| Focus return after selection | `trigger.matches(':focus')` unreliable across shadow DOM in WTR | Playwright's real focus management validates focus position reliably |
| Multi-select multi-step flow | Synthetic events don't capture intermediate state timing | Real keystroke sequences test actual intermediate state transitions |
| Fullscreen mobile flow | `setViewport()` + `requestAnimationFrame` waits (fragile) | Device emulation with real viewport resize |
| Screen reader live region timing | `setTimeout(resolve, 2200)` hard-coded wait | `expect.poll()` with auto-retry eliminates timing fragility |
| Modifier key combos | Synthetic `KeyboardEvent` with `altKey`/`metaKey` flags | Real modifier key dispatch via `Alt+ArrowDown` etc. |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte, verifiable in Firefox/WebKit |

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Focus before keyboard action | Updated `focusTrigger()` helper to poll-confirm focus landed on trigger via `dropdown.trigger.matches(':focus')` | All tests using `focusTrigger()` (ArrowDown/ArrowUp/Enter/Space opens bib, keyboard navigation) |
| Keyboard before active option set | Added `await expect.poll(() => activeOptionValue(...), { timeout: 5_000 })` after `waitForBibOpen()` before any keyboard press | 15 keyboard navigation tests (Alt/Meta+Arrow, Home, End, Enter/Tab/Shift+Tab selection, disabled skip variants, fullscreen keyboard) |

Unlike combobox, `auro-select` auto-activates the first option when the bib opens. The guard confirms `optionActive` is set before keyboard events fire.

## Architecture

- **Shared suite pattern**: `select-interaction.suite.ts` exports `selectInteractionSuite(framework, options?)`, consumed by both framework spec files with a one-liner
- **Fixture isolation**: Each test targets a specific `data-testid` section, preventing cross-test interference without requiring page reloads
- **Helper functions**: `waitForSelect()`, `openBib()`, `focusTrigger()`, `waitForBibOpen()`, `waitForBibClosed()`, `activeOptionValue()`, `selectValue()` — all using `expect.poll()` for resilient assertions
- **No test duplication**: These tests cover interaction flows not already covered in WTR; WTR retains property reflection, slot checks, validity state, public function contracts, private edge cases, native select sync, and `useAccessibleIt()` a11y audits

## Test Results

```
React:    50 passed
Svelte:   50 passed
```
