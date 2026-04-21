# Playwright Interaction Test Improvements — Summary

## Overview

This document summarizes all Playwright interaction test suites added across the auro-formkit monorepo. Each suite follows a **shared suite pattern** — a single `.suite.ts` file in `apps/shared/` is consumed by both React and Svelte spec files, ensuring identical test coverage across frameworks.

All suites follow the **hybrid approach** recommended in [AlaskaAirlines/discussions#632](https://github.com/orgs/AlaskaAirlines/discussions/632): WTR retains fast, granular unit tests (properties, attributes, rendering, a11y), while Playwright covers multi-step user interaction flows and viewport-dependent behavior.

## Test Totals

| Component | Suite File | Tests per Framework | Total (×2) |
|-----------|-----------|--------------------:|----------:|
| checkbox | `checkbox-interaction.suite.ts` | 22 | 44 |
| combobox | `combobox-interaction.suite.ts` | 35 | 70 |
| counter | `counter-interaction.suite.ts` | 25 | 50 |
| datepicker | `datepicker-interaction.suite.ts` | 24 | 48 |
| dropdown | `dropdown-interaction.suite.ts` | 20 | 40 |
| form | `form-interaction.suite.ts` | 23 | 46 |
| input | `input-interaction.suite.ts` | 26 | 52 |
| menu | `menu-interaction.suite.ts` | 30 | 60 |
| radio | `radio-interaction.suite.ts` | 26 | 52 |
| select | `select-interaction.suite.ts` | 50 | 100 |
| **Total** | | **281** | **562** |

### Framework Results

```
React:    304 passed
Svelte:   302 passed
```

Note: Framework totals include pre-existing suites (remount, fullscreen, counter-dropdown) in addition to the interaction suites listed above.

## What Playwright Covers That WTR Cannot

| Capability | WTR Limitation | Playwright Advantage |
|------------|---------------|---------------------|
| OS-level keyboard events | `sendKeys()` dispatches synthetic events | `keyboard.press()` fires real key events through the browser's input pipeline |
| Modifier key combos | Synthetic `KeyboardEvent` with `altKey`/`metaKey` flags | Real `Alt+ArrowDown`, `Meta+ArrowUp` dispatch |
| Click outside to close | No real focus-loss mechanism | `page.click('#outside-element')` triggers actual focus-loss |
| Filter-as-you-type | `setInputValue()` bypasses browser input pipeline | `keyboard.type()` fires real input events |
| Fullscreen mobile | `setViewport()` + `requestAnimationFrame` chains (fragile) | Device emulation with real viewport resize |
| Screen reader live region | `setTimeout(resolve, 2200)` hard-coded waits | `expect.poll()` with auto-retry |
| Focus management across shadow DOM | `document.activeElement` unreliable across boundaries | Real focus position verification via shadow DOM traversal |
| Cross-framework validation | Tests only run in WTR's Chromium context | Same suite runs in React + Svelte |

## Flakiness Fixes

All suites were audited for race conditions that cause intermittent failures under CI load. Four root-cause patterns were identified and systematically fixed across 8 of 10 suites:

### Pattern 1: Focus Without Confirmation

**Problem**: Calling `el.focus()` on a web component with shadow DOM focus delegation doesn't guarantee focus has settled before the next action (blur, keyboard press).

**Fix**: Poll-confirm focus landed before proceeding.

| Component | Technique |
|-----------|-----------|
| checkbox | `await expect(checkbox(...)).toBeFocused()` after `focusCheckbox()` |
| counter | `await expect(counter(...).first()).toBeFocused()` after Tab |
| dropdown | `focusTrigger()` helper polls `el.shadowRoot.activeElement === trigger` |
| form | `focusInput()` helper polls `el.shadowRoot.activeElement === inp` |
| input | `await expect(auroInput(...).locator('input')).toBeFocused()` |
| radio | Polls `el.shadowRoot?.activeElement != null \|\| el.matches(':focus-within')` |
| select | `focusTrigger()` helper polls `dropdown.trigger.matches(':focus')` |

### Pattern 2: Rapid Sequential Clicks Without Intermediate Waits

**Problem**: Consecutive `.click()` calls can fire before the previous click's state change propagates through the component.

**Fix**: Add `expect.poll()` between clicks to confirm intermediate state.

| Component | Tests Affected |
|-----------|---------------|
| checkbox | Clicking multiple checkboxes, unchecking one does not affect others, required group clears error |
| radio | Only one radio can be checked at a time |

### Pattern 3: Keyboard Before Bib/Options Ready

**Problem**: After the bib opens, keyboard navigation can fire before the component has set `optionActive` (select) or rendered options into the DOM (combobox).

**Fix**: Wait for the component-specific ready signal before pressing keys.

| Component | Guard | Rationale |
|-----------|-------|-----------|
| select | `await expect.poll(() => activeOptionValue(...)).toBe('Apples')` | Select auto-activates first option on open — guard confirms it's set |
| combobox | `await waitForOptionsReady(page, fixture)` | Combobox does NOT auto-activate — guard confirms options are rendered in DOM |

### Pattern 4: Fixed `waitForTimeout` Instead of State-Based Polling

**Problem**: `page.waitForTimeout(200)` is brittle — too short under load, wastefully long otherwise.

**Fix**: Replace with `expect.poll()` targeting the actual state change.

| Component | Replacements | Remaining |
|-----------|-------------|-----------|
| datepicker | 12 of 16 replaced with `getValue()`, `getValueEnd()`, `toBeFocused()`, `shadowRoot.activeElement` polls | 4 negative assertions (proving bib does NOT open) — brief timeouts are the only viable approach |
| form | 1 replaced — `waitForTimeout(500)` → `expect.poll(...).toBe(false)` for negative submit check | — |

### Suites Without Flakiness Fixes

| Component | Reason |
|-----------|--------|
| menu | No focus delegation or bib timing issues — tests use direct click + `expect.poll()` |
| datepicker-fullscreen (pre-existing) | Already used `expect.poll()` throughout |

## Architecture

### Shared Suite Pattern

```
apps/shared/<component>-interaction.suite.ts    ← shared test logic
apps/react-framework/tests/<component>.spec.ts  ← one-liner: import + call
apps/svelte-framework/tests/<component>.spec.ts ← one-liner: import + call
```

Each suite exports a function like `selectInteractionSuite(framework, options?)` that registers all `test.describe` blocks. Framework spec files consume it with a single import + call.

### Test Page Pattern

```
apps/react-framework/src/pages/<Component>Interaction.tsx
apps/svelte-framework/src/routes/<component>-interaction/+page.svelte
```

Each test page provides scoped fixtures via `data-testid` sections. An `#outside-element` button sits outside all components for focus-loss tests.

### Resilient Assertion Pattern

All suites use `expect.poll()` for state assertions rather than `waitForTimeout` or snapshot-style `expect()`. This auto-retries until the assertion passes or the timeout expires, eliminating timing fragility.

### No Test Duplication

Playwright interaction suites cover behaviors not testable in WTR. WTR retains:
- Property reflection and attribute tests
- Slot rendering verification
- Validity state and public function contracts
- `useAccessibleIt()` a11y audits
- Private edge cases and internal method tests

## Individual Reports

| Report | Path |
|--------|------|
| Checkbox | [checkbox-playwright-improvements.md](checkbox-playwright-improvements.md) |
| Combobox | [combobox-playwright-improvements.md](combobox-playwright-improvements.md) |
| Counter | [counter-playwright-improvements.md](counter-playwright-improvements.md) |
| Datepicker | [datepicker-playwright-improvements.md](datepicker-playwright-improvements.md) |
| Dropdown | [dropdown-playwright-improvements.md](dropdown-playwright-improvements.md) |
| Form | [form-playwright-improvements.md](form-playwright-improvements.md) |
| Input | [input-playwright-improvements.md](input-playwright-improvements.md) |
| Menu | [menu-playwright-improvements.md](menu-playwright-improvements.md) |
| Radio | [radio-playwright-improvements.md](radio-playwright-improvements.md) |
| Select | [select-playwright-improvements.md](select-playwright-improvements.md) |
