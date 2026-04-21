# Combobox Playwright Interaction Test Improvements

## Summary
- **Component**: `auro-combobox`
- **Shared suite**: `apps/shared/combobox-interaction.suite.ts`
- **Test harnesses**: React (`ComboboxInteraction.tsx`) + Svelte (`combobox-interaction/+page.svelte`)
- **Total tests**: 35 per framework × 2 frameworks = **70 passing test executions**
- **Viewports**: Desktop (1280×800) + Fullscreen mobile (390×844, iPhone 14)

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), the combobox is one of four components that benefit most from Playwright over WTR for interaction-heavy scenarios. The discussion identifies specific behaviors where WTR's synthetic events (`sendKeys`, `setInputValue`) miss real browser behavior that Playwright's OS-level `keyboard.press()` and `page.click()` capture.

This follows the recommended **hybrid approach**: WTR retains fast, granular unit tests (properties, attributes, rendering, a11y), while Playwright covers multi-step user interaction flows and viewport-dependent behavior.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/combobox-interaction.suite.ts` | Shared Playwright test suite (35 tests) |
| `apps/react-framework/src/pages/ComboboxInteraction.tsx` | React test harness page with 6 fixture sections |
| `apps/react-framework/tests/combobox-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/combobox-interaction/+page.svelte` | Svelte test harness page with 6 fixture sections |
| `apps/svelte-framework/tests/combobox-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/combobox-interaction` route |

## Test Fixtures

Each test harness page provides 6 scoped combobox fixtures via `data-testid` sections:

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | 2 options (Apples, Oranges) | Arrow cycling, Enter/Tab/Escape, click-outside |
| `three-options` | 3 options (Apples, Oranges, Grapes) | Home, End, Alt/Meta modifier combos |
| `disabled-first` | First option disabled | Home-skips-disabled behavior |
| `nested` | Nested `auro-menu` with 4 options across 2 levels | Cross-boundary keyboard traversal |
| `filter` | `behavior="filter"` + `required` | Fullscreen validation flow |
| `no-filter` | `noFilter` attribute | Screen reader live region tests |

An `#outside-element` button sits outside all comboboxes for click-outside-to-close tests.

## Tests Added

### Desktop — Keyboard Navigation (15 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| ArrowDown / ArrowUp cycle through options | Wrapping navigation with real key events |
| ArrowDown / ArrowUp navigate nested menus | Cross-boundary traversal (option 1 → option a → option b → option 2) |
| Alt+ArrowDown jumps to last option | Modifier combo (OS-level key events) |
| Meta+ArrowDown jumps to last option | macOS modifier combo |
| Alt+ArrowUp jumps to first option | Modifier combo |
| Meta+ArrowUp jumps to first option | macOS modifier combo |
| Home jumps to first enabled option | Standard listbox keyboard contract |
| Home skips a disabled first option | Disabled-aware navigation |
| End jumps to last option | Standard listbox keyboard contract |
| Enter opens bib when input has a value | Bib open/close lifecycle |
| Enter selects active option and closes bib | Selection + close in one keystroke |
| Tab selects active option and closes bib | Tab selecting + simultaneous close |
| Shift+Tab closes the bib | Reverse-tab across shadow DOM boundaries |
| Escape closes bib without making a selection | No selection forced on dismiss |
| ArrowUp opens bib when closed | Re-open from closed state |

### Desktop — Filter as you type (5 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Filters options by typed text using real input events | Real `keyboard.type()` bypasses synthetic `setInputValue()` |
| Bold-highlights matching substrings | `<strong>` tag injection on matched characters |
| Trailing space is stripped for matching | `"a "` matches same as `"a"` |
| Leading space does not match any options | `" a"` treated as intentional non-match |
| Hides bib when no options match | Bib auto-closes on zero results |

### Desktop — Screen reader announcements (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Populates live region when an option is activated | `#srAnnouncement` receives text on ArrowDown |
| Clears live region after announcement duration | Auto-clear timer (~1000ms) — replaces fragile `setTimeout(2200)` in WTR |

### Desktop — Click outside to close (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Closes bib when clicking an element outside the combobox | Real focus-loss via `page.click()` — **not testable in WTR** |
| Does not select an option when clicking outside | No forced selection on focus-loss |

### Desktop — Mouse interaction (2 tests)
| Test | Key Behavior Validated |
|------|------------------------|
| Clicking an option selects it and closes the bib | Real click on menu option triggers selection + bib close |
| Clicking a disabled option does not select or close the bib | Disabled option ignores real click events |

### Fullscreen mobile (9 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Opens fullscreen dialog on mobile viewport | `isBibFullscreen === true` at 390px width |
| Keyboard navigation works in fullscreen mode | ArrowDown inside fullscreen dialog |
| Escape closes fullscreen dialog | Composed event propagation across shadow boundaries |
| Tab closes fullscreen dialog | Tab behavior inside dialog context |
| Clicking the close button closes the fullscreen dialog | Close button in `auro-bibtemplate` shadow DOM triggers `hideBib()` |
| Filter behavior validates after fullscreen close without selection | Type → close fullscreen → blur → `validity === 'valueMissing'` |
| Trigger is set to inert while fullscreen dialog is open | `dropdown.trigger.inert === true` during fullscreen |
| Trigger inert and focus are restored after fullscreen dialog closes | `trigger.inert === false` + trigger has focus after Escape |
| Screen reader announcements route to bib live region in fullscreen | Announcements go to bib's shadow root, not host |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| Keyboard events | `sendKeys()` dispatches synthetic events | `keyboard.press()` fires real OS-level key events |
| Filter-as-you-type | `setInputValue()` bypasses browser input pipeline | `keyboard.type()` fires real input events through the actual pipeline |
| Click outside to close | Not testable — no real focus-loss mechanism | `page.click()` on an outside element triggers actual focus-loss |
| Fullscreen mobile flow | `setViewport()` + `requestAnimationFrame` waits (fragile) | Device emulation with real viewport resize |
| Screen reader live region timing | `setTimeout(resolve, 2200)` hard-coded wait | `expect.poll()` with auto-retry eliminates timing fragility |
| Modifier key combos | Synthetic `KeyboardEvent` with `altKey`/`metaKey` flags | Real modifier key dispatch via `Alt+ArrowDown` etc. |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte, verifiable in Firefox/WebKit |

## Architecture

- **Shared suite pattern**: `combobox-interaction.suite.ts` exports `comboboxInteractionSuite(framework, options?)`, consumed by both framework spec files with a one-liner
- **Fixture isolation**: Each test targets a specific `data-testid` section, preventing cross-test interference without requiring page reloads
- **Helper functions**: `waitForCombobox()`, `combobox()`, `focusCombobox()`, `typeInCombobox()`, `waitForBibOpen()`, `waitForBibClosed()`, `isBibVisible()`, `activeOptionValue()`, `comboboxValue()` — all using `expect.poll()` for resilient assertions
- **No test duplication**: These tests cover interaction flows not already covered in WTR; WTR retains property reflection, slot checks, validity state, public function contracts, private edge cases, and `useAccessibleIt()` a11y audits

## Test Results

```
React:    35 passed
Svelte:   35 passed
```
