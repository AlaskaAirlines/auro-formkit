# Dropdown Playwright Interaction Test Improvements

## Summary
- **Component**: `auro-dropdown`
- **Shared suite**: `apps/shared/dropdown-interaction.suite.ts`
- **Test harnesses**: React (`DropdownInteraction.tsx`) + Svelte (`dropdown-interaction/+page.svelte`)
- **Total tests**: 20 per framework × 2 frameworks = **40 passing test executions**
- **Viewports**: Desktop (1280×800) + Fullscreen mobile (390×844, iPhone 14)

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), the hybrid approach recommends Playwright for interaction-heavy scenarios. The dropdown is a foundational component used by `auro-select`, `auro-combobox`, and `auro-counter-group`, making its interaction contract critical:

- **Enter/Space key open** — WTR dispatches synthetic `KeyboardEvent`; Playwright uses real OS-level `keyboard.press()`.
- **Escape key close + focus return** — Real browser focus management across shadow DOM boundaries is unreliable with synthetic events.
- **Focus-loss closing** — Not testable in WTR (no real focus change mechanism).
- **noHideOnThisFocusLoss** — Requires real focus movement to verify the dropdown stays open.
- **noToggle** — Second click behavior only meaningful with real pointer events.
- **disableEventShow** / **disableKeyboardHandling** — Negative tests confirming these flags block real user input.
- **Fullscreen mobile** — `showModal()` path with different focus trap, only testable with real viewport emulation.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/dropdown-interaction.suite.ts` | Shared Playwright test suite (20 tests) |
| `apps/react-framework/src/pages/DropdownInteraction.tsx` | React test harness page with 8 fixture sections |
| `apps/react-framework/tests/dropdown-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/dropdown-interaction/+page.svelte` | Svelte test harness page with 8 fixture sections |
| `apps/svelte-framework/tests/dropdown-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/dropdown-interaction` route |
| `apps/react-framework/src/main.tsx` | Added `auro-dropdown` import |

## Test Fixtures

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | `chevron` | Click toggle, Enter/Space open, Escape close, focus return, focus-loss close, chevron indicator, events |
| `disabled` | `chevron disabled` | Click and keyboard no-op tests |
| `no-toggle` | `chevron noToggle` | Second click stays open |
| `disable-event-show` | `chevron disableEventShow` | Click/keyboard blocked, only `show()` works |
| `disable-keyboard` | `chevron disableKeyboardHandling` | Enter/Space do nothing |
| `no-hide-focus-loss` | `chevron noHideOnThisFocusLoss` | Focus loss does not close |
| `with-bib-content` | `chevron` + buttons inside bib | Focusable content inside bib |
| `fullscreen` | `chevron fullscreenBreakpoint="sm"` | Fullscreen mobile dialog tests |

An `#outside-element` button sits outside all dropdowns for focus-loss tests.

## Tests Added

### Desktop — Click interaction (6 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking the trigger opens the dropdown | Real click on shadow DOM trigger |
| Clicking the trigger again closes the dropdown | Toggle behavior via consecutive clicks |
| Clicking a disabled trigger does not open the dropdown | Disabled state protection |
| noToggle: second click does not close the dropdown | `noToggle` attribute prevents close |
| disableEventShow: click does not open the dropdown | Click blocked by attribute |
| disableEventShow: show() method opens the dropdown | Programmatic-only open path |

### Desktop — Keyboard interaction (4 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Enter opens the dropdown | Real `keyboard.press('Enter')` on focused trigger |
| Space opens the dropdown | Real `keyboard.press('Space')` on focused trigger |
| Escape closes the dropdown | Real Escape key while bib is open |
| Escape returns focus to the trigger | Focus management across shadow DOM on close |
| Enter on a disabled dropdown does not open it | Disabled keyboard protection |
| disableKeyboardHandling: Enter and Space do not open | `disableKeyboardHandling` blocks both keys |

### Desktop — Focus management (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Focus loss closes the dropdown | `locator.focus()` on external element triggers close — **not testable in WTR** |
| noHideOnThisFocusLoss: focus loss does not close the dropdown | Dropdown stays open despite focus moving outside |

### Desktop — Chevron indicator (1 test)
| Test | Key Behavior Validated |
|------|----------------------|
| Chevron points down when closed and up when open | `chevron-down` → `chevron-up` icon name toggle |

### Desktop — Events (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Fires auroDropdown-triggerClick when trigger is clicked | Custom event fires on real click |
| Fires auroDropdown-toggled when opened | Event detail `{ expanded: true }` |
| Fires auroDropdown-toggled when closed | Event detail `{ expanded: false }` |

### Fullscreen mobile (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Opens fullscreen dialog on mobile viewport | `isBibFullscreen === true` at 390px with `fullscreenBreakpoint="sm"` |
| Escape closes the fullscreen dialog | Escape inside `showModal()` dialog context |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| Enter/Space key | Synthetic `KeyboardEvent` dispatched on element | Real `keyboard.press()` fires OS-level key events |
| Focus-loss close | Not testable — no real focus change | `locator.focus()` on external element triggers actual focus-loss |
| noHideOnThisFocusLoss | Not testable — requires real focus movement | Real focus movement with `locator.focus()` verifies dropdown stays open |
| Fullscreen mobile | `setViewport()` + synthetic open (fragile) | Real viewport emulation with device dimensions |
| Escape focus return | `document.activeElement` unreliable across shadow DOM in WTR | Playwright verifies `shadowRoot.activeElement` matches trigger |
| Toggle behavior | Synthetic clicks may not reflect real event pipeline | Real trigger clicks exercise the full event → toggle → Floating UI pipeline |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte |

## Architecture

- **Shared suite pattern**: `dropdown-interaction.suite.ts` exports `dropdownInteractionSuite(framework)`, consumed by both framework spec files
- **Fixture isolation**: Each test targets a specific `data-testid` section
- **Helper functions**: `waitForDropdown()`, `dropdown()`, `isBibVisible()`, `waitForBibOpen()`, `waitForBibClosed()`, `focusTrigger()`, `clickTrigger()`, `isChevronUp()` — all using `expect.poll()` for resilient assertions
- **No test duplication**: WTR retains property reflection, attribute tests (bordered, common, inset, rounded), placement/offset configuration, slot checks, `matchWidth`, `autoPlacement`, `shift`, `noFlip`, hover toggle, and layout variant rendering

## Test Results

```
React:    20 passed
Svelte:   20 passed
```
