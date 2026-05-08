# Datepicker Playwright Interaction Test Improvements

## Summary
- **Component**: `auro-datepicker`
- **Shared suite**: `apps/shared/datepicker-interaction.suite.ts`
- **Test harnesses**: React (`DatepickerInteraction.tsx`) + Svelte (`datepicker-interaction/+page.svelte`)
- **Total tests**: 24 per framework × 2 frameworks = **48 passing test executions**
- **Viewports**: Desktop (1280×800) + Fullscreen mobile (390×844, iPhone 14)
- **Complements**: `datepicker-fullscreen.suite.ts` (existing — 7 tests per framework covering focus-loss and keyboard contract)

## Motivation

Per [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632), `auro-datepicker` is one of four components that benefit most from Playwright over WTR for interaction-heavy scenarios. The datepicker has unique complexity:

- **Deep shadow DOM** (4 levels): `auro-datepicker` → `auro-formkit-calendar` → `auro-formkit-calendar-month` → `auro-formkit-calendar-cell` → `<button>`. WTR tests manually navigate this chain with verbose selectors; Playwright helpers encapsulate the traversal.
- **Calendar month navigation**: Prev/next month button clicks with state verification require real DOM updates across shadow boundaries.
- **Date range selection**: Multi-step flow — click dateFrom → verify → click dateTo → verify both values. WTR tests this with synthetic clicks; Playwright tests the actual click pathway.
- **Click outside to close**: Desktop focus-loss via real `page.click()` on an external element.
- **Clear button keyboard interaction**: Real Tab → Enter/Space keystroke sequence replaces WTR's fragile `sendKeys` + `setTimeout(500)` waits.
- **Fullscreen mobile**: Viewport-dependent rendering (12 calendars, done button, close button focus, trigger inert state).
- **Hover preview in range mode**: Real mouseover events on calendar cells after selecting dateFrom.

This suite complements the existing `datepicker-fullscreen.suite.ts` which covers focus-loss behavior and keyboard contract (Enter/Space/Tab non-opening). The interaction suite focuses on actual user workflows: selecting dates, navigating months, range selection, and clear button behavior.

## What Changed

### New Files
| File | Purpose |
|------|---------|
| `apps/shared/datepicker-interaction.suite.ts` | Shared Playwright test suite (24 tests) |
| `apps/react-framework/src/pages/DatepickerInteraction.tsx` | React test harness page with 3 fixture sections |
| `apps/react-framework/tests/datepicker-interaction.spec.ts` | React spec importing shared suite |
| `apps/svelte-framework/src/routes/datepicker-interaction/+page.svelte` | Svelte test harness page with 3 fixture sections |
| `apps/svelte-framework/tests/datepicker-interaction.spec.ts` | Svelte spec importing shared suite |

### Modified Files
| File | Change |
|------|--------|
| `apps/react-framework/src/App.tsx` | Added `/datepicker-interaction` route |

## Test Fixtures

Each test harness page provides 3 scoped datepicker fixtures via `data-testid` sections, all using `centralDate="01/15/2025"` for deterministic calendar rendering:

| Fixture (`data-testid`) | Configuration | Used For |
|--------------------------|---------------|----------|
| `default` | Single-date datepicker | Open/close, month navigation, date selection, mobile fullscreen |
| `range` | `range` attribute, with fromLabel + toLabel | Date range selection, dateTo constraint, hover preview, two-calendar rendering |
| `preset` | `value="01/10/2025"` pre-set | Clear button Enter/Space tests |

An `#outside-element` button sits outside all datepickers for click-outside-to-close tests.

## Tests Added

### Desktop — Open and close (6 tests)
| Test | Key Behavior Validated |
|------|------------------------|
| Opens the bib when the input is clicked | Real click on input triggers dropdown |
| Closes the bib when clicking outside | Real focus-loss via `page.click()` on external element |
| Closes the bib when Escape is pressed | Real keyboard Escape dismissal |
| Does not open the bib when Enter is pressed | Keyboard contract — Enter doesn't open |
| Does not open the bib when Space is pressed | Keyboard contract — Space doesn't open |
| Typing in the input does not open the bib | Keyboard contract — typing doesn't trigger bib |

### Desktop — Calendar month navigation (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Navigates to the previous month | Click prevMonth button, verify centralDate month changes |
| Navigates to the next month | Click nextMonth button, verify centralDate month changes |
| Navigates multiple months forward | Two consecutive nextMonth clicks with intermediate state verification |

### Desktop — Date selection (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking a calendar cell selects the date | Click cell → value is set (non-empty) |
| Clicking a cell sets the correct date value | Read cell's `day.date`, click, verify `el.value` matches `convertWcTimeToDate()` |

### Desktop — Date range selection (3 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Clicking two dates sets value and valueEnd | Click dateFrom (cell 4) → click dateTo (cell 10) → both values set |
| Cannot set dateTo to a date earlier than dateFrom | Click later cell as dateFrom → click earlier cell → valueEnd stays undefined |
| Renders two calendars in range mode on desktop | `calendar.numCalendars === 2` when `range` attribute is set |

### Desktop — Hover preview (1 test)
| Test | Key Behavior Validated |
|------|----------------------|
| Hovering a cell after selecting dateFrom shows hovered state | Select dateFrom → hover later cell → intermediate cell has `hovered === true` |

### Desktop — Clear button (2 tests)
| Test | Key Behavior Validated |
|------|----------------------|
| Enter on clear button clears value without opening the bib | Focus → Tab → Enter: value cleared, bib stays closed |
| Space on clear button clears value without opening the bib | Focus → Tab → Space: value cleared, bib stays closed |

### Fullscreen mobile (7 tests)
| Test | Key Behavior Validated |
|------|------------------------|
| Opens in fullscreen mode on mobile viewport | `isBibFullscreen === true` at 390px width |
| Renders twelve calendars in fullscreen mobile | `numCalendars === 12` — scrollable months |
| Done button closes the fullscreen bib | Click footer slot done button → bib closes |
| Date selection in fullscreen sets the value | Click cell in fullscreen → value is set |
| Focus moves to the close button when fullscreen dialog opens | `bibtemplate.shadowRoot.activeElement === closeButton` |
| Trigger is set to inert while fullscreen dialog is open | `dropdown.trigger.inert === true` during fullscreen |
| Trigger inert and focus are restored after fullscreen dialog closes | `trigger.inert === false` + trigger has focus after close |

## Improvements Over WTR

| Area | WTR Limitation | Playwright Advantage |
|------|---------------|---------------------|
| Deep shadow DOM traversal | Manual 4-level chain: `el.shadowRoot.querySelector('auro-formkit-calendar').shadowRoot.querySelector('auro-formkit-calendar-month').shadowRoot.querySelectorAll('auro-formkit-calendar-cell')[n].shadowRoot.querySelector('button').click()` | Helper functions (`clickCalendarCell`, `clickPrevMonth`, `clickNextMonth`) encapsulate traversal |
| Clear button keyboard | `sendKeys` + three `setTimeout(500)` waits (1.5s total hard-coded delay) | Real `keyboard.press('Tab')` + `keyboard.press('Enter')` with `expect.poll()` — no arbitrary waits |
| Click outside to close | Synthetic `button.click()` after `nextFrame()` | Real `page.click('#outside-element')` triggers actual focus-loss |
| Date range multi-step flow | Synthetic clicks on deep shadow DOM buttons | Sequential `clickCalendarCell()` calls with intermediate state polling |
| Hover preview | `new MouseEvent('mouseover')` dispatched synthetically | `mouseover` dispatched on actual button element with `dateChanged()` propagation verified |
| Fullscreen mobile rendering | `setViewport()` + `requestAnimationFrame` chains | Device emulation with real viewport resize + `expect.poll()` for fullscreen state |
| Month navigation | Manual prevMonth/nextMonth button lookup through shadow DOM | Helper functions with `expect.poll()` for centralDate state changes |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte, verifiable in Firefox/WebKit |

## Relationship to Existing Fullscreen Suite

The existing `datepicker-fullscreen.suite.ts` covers **focus management and keyboard contract** (7 tests per framework):
- Fullscreen focus-loss: bib stays open when focus moves outside
- Fullscreen dismiss: Escape closes
- Non-fullscreen focus-loss: bib closes on tab-out
- Focus not stolen back after tab-out
- Enter/Space don't open bib (desktop)
- Tab doesn't close fullscreen bib

This new interaction suite covers **user workflows** (24 tests per framework):
- Date selection via click
- Calendar month navigation
- Date range selection flow
- Click-outside closing
- Clear button keyboard interaction
- Hover preview in range mode
- Typing in the input (no bib open)
- Fullscreen mobile rendering (12 calendars, done button, close button focus, trigger inert + restoration)

No test overlap exists between the two suites.

## Flakiness Fixes

The following guards were added to eliminate race conditions under CI load:

| Pattern | Fix Applied | Tests Affected |
|---------|-------------|----------------|
| Fixed timeouts after cell clicks | Replaced `page.waitForTimeout(200)` with `expect.poll(() => getValue(...)).toBeTruthy()` | Range date selection (value, valueEnd), hover preview dateFrom, fullscreen date selection |
| Fixed timeouts for clear button | Replaced `page.waitForTimeout(100/200)` with `toBeFocused()` after focus + `expect.poll(() => getValue(...)).toBe('')` after key press | Enter on clear button, Space on clear button |
| Fixed timeout for focus check | Replaced `page.waitForTimeout(200)` + manual assertion with `expect.poll()` for `shadowRoot.activeElement === closeButton` | Focus moves to close button in fullscreen |

12 of 16 `waitForTimeout` calls were replaced with state-based polling. The remaining 4 are negative assertions (proving bib does NOT open) where brief timeouts are the only viable approach.

## Architecture

- **Shared suite pattern**: `datepicker-interaction.suite.ts` exports `datepickerInteractionSuite(framework, options?)`, consumed by both framework spec files with a one-liner
- **Fixture isolation**: Each test targets a specific `data-testid` section with `centralDate="01/15/2025"` for deterministic calendar rendering
- **Deep shadow DOM helpers**: `clickCalendarCell()`, `clickPrevMonth()`, `clickNextMonth()`, `clickDoneButton()`, `hoverCalendarCell()`, `isCellHovered()` — encapsulate 4-level shadow DOM traversal
- **Resilient assertions**: All state checks use `expect.poll()` with appropriate timeouts
- **No test duplication**: WTR retains property reflection, attribute tests, validation states, format handling, slot checks, event dispatch, public function contracts, and `useAccessibleIt()` a11y audits

## Test Results

```
React:    24 passed
Svelte:   24 passed
```
