# Accessibility Tree Test Suite — Summary

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Overview

This PR adds a new **accessibility tree test suite** that verifies ARIA roles, states, properties, and screen reader support across all interactive components. The suite uses Playwright's built-in accessibility APIs (`toHaveRole`, `toHaveAccessibleName`, `toHaveAttribute`) to assert on the browser's computed accessibility tree — the same tree that assistive technologies like VoiceOver and NVDA consume.

The tests run in both the React and Svelte framework apps, validating that ARIA semantics are correct regardless of the host framework.

---

## Files Added

| File | Purpose |
|------|---------|
| `apps/shared/accessibility-tree.suite.ts` | Shared test suite (41 tests across 7 components) |
| `apps/svelte-framework/tests/accessibility-tree.spec.ts` | Svelte runner |
| `apps/react-framework/tests/accessibility-tree.spec.ts` | React runner |

---

## Aggregate Stats

| Metric | Value |
|--------|-------|
| Total tests | 41 per framework (82 total) |
| Components covered | 7 (checkbox, radio, input, menu, dropdown, counter, select, combobox) |
| Frameworks tested | React, Svelte |
| Pass rate | 82/82 (100%) |

---

## Per-Component Coverage

### Checkbox (6 tests)

| Test | What's Verified |
|------|-----------------|
| role + accessible name | Host element has `role="checkbox"`, accessible name from label text |
| unchecked state | `aria-checked="false"` on unchecked checkbox |
| checked state | `aria-checked="true"` on pre-checked checkbox |
| disabled state | `aria-disabled="true"` on disabled checkbox |
| group structure | `<fieldset>` + `<legend>` present in checkbox-group shadow DOM |
| state update on click | `aria-checked` toggles from `"false"` to `"true"` after click |

### Radio (6 tests)

| Test | What's Verified |
|------|-----------------|
| role + accessible name | Host element has `role="radio"`, accessible name from label text |
| radiogroup role | Inner `<fieldset>` has `role="radiogroup"` |
| unselected state | `aria-checked="false"` on unselected radio |
| preset checked | `aria-checked="true"` on pre-selected radio |
| disabled state | `aria-disabled` attribute present on disabled radio |
| mutual exclusivity | Selecting one radio updates `aria-checked` across the group |

### Input (6 tests)

| Test | What's Verified |
|------|-----------------|
| label association | Shadow DOM `<label for=id>` linked to `<input>` |
| describedby | `aria-describedby` links input to help text element |
| invalid state | `aria-invalid="true"` after validation failure |
| valid state | `aria-invalid="false"` after successful validation |
| error announcement | Error help text has `role="alert"` + `aria-live="assertive"` |
| password toggle | Password notification toggle element present in shadow DOM |

### Menu (6 tests)

| Test | What's Verified |
|------|-----------------|
| listbox role | `auro-menu` host has `role="listbox"` |
| option role | `auro-menuoption` host has `role="option"` |
| selected state | `aria-selected="true"` on clicked option |
| unselected state | `aria-selected="false"` on unselected options |
| disabled option | `aria-disabled="true"` on disabled option |
| multiselect | `aria-multiselectable="true"` on multi-select menu |

### Dropdown (3 tests)

| Test | What's Verified |
|------|-----------------|
| trigger element | Shadow DOM `#trigger` element exists and is interactive |
| popover state | `isPopoverVisible` updates after trigger click |
| disabled state | `aria-disabled` present on disabled trigger |

> **Note:** Standalone `auro-dropdown` does not set `aria-expanded` or `aria-controls`; those are set by parent components (`auro-select`, `auro-combobox`) that assign `a11yRole`.

### Counter (6 tests)

| Test | What's Verified |
|------|-----------------|
| spinbutton role | `role="spinbutton"` on counter control |
| value attributes | `aria-valuemin`, `aria-valuemax`, `aria-valuenow` present with correct values |
| value update | `aria-valuenow` updates after increment click |
| label association | `aria-labelledby` links spinbutton to label element |
| disabled state | `aria-disabled` on disabled counter's spinbutton |
| button labels | Both increment and decrement buttons have `aria-label` |

### Select (5 tests)

| Test | What's Verified |
|------|-----------------|
| combobox trigger | Trigger element has `role="combobox"` |
| listbox menu | `auro-menu` inside select has `role="listbox"` |
| option indexing | Options get `aria-setsize` and `aria-posinset` when dropdown opens |
| live region | `#srAnnouncement` has `aria-live="polite"` for screen reader announcements |
| error alert | `role="alert"` element appears after validation failure |

### Combobox (3 tests)

| Test | What's Verified |
|------|-----------------|
| combobox role | Nested `<input>` has `role="combobox"` (inside auro-input shadow DOM) |
| live region | `#srAnnouncement` has `aria-live="polite"` for screen reader announcements |
| listbox menu | `auro-menu` inside combobox has `role="listbox"` |

---

## Flakiness Hardening (Related Changes)

Alongside the accessibility tests, all shared Playwright test suites were hardened against shadow DOM timing issues:

### Wait Function Improvements

| File | Change |
|------|--------|
| `checkbox-interaction.suite.ts` | `waitForCheckbox` now waits for shadow DOM `<input>` |
| `input-interaction.suite.ts` | `waitForInput` now waits for shadow DOM `<input>` |
| `menu-interaction.suite.ts` | `waitForMenu` now waits for `updateComplete` |
| `radio-interaction.suite.ts` | `waitForRadio` now waits for shadow DOM `<input>` |
| `dropdown-interaction.suite.ts` | `waitForDropdown` now waits for shadow DOM `#trigger` |
| `form-interaction.suite.ts` | `waitForForm` now waits for shadow DOM `<input>` |

### `expect(await ...)` → `expect.poll(...)` Conversions

All 35 instances of `expect(await ...)` across 6 shared test suites were converted to `expect.poll(...)` to prevent flakiness from shadow DOM timing:

| File | Conversions |
|------|-------------|
| `checkbox-interaction.suite.ts` | 12 |
| `radio-interaction.suite.ts` | 8 |
| `input-interaction.suite.ts` | 4 |
| `dropdown-interaction.suite.ts` | 8 |
| `form-interaction.suite.ts` | 2 |
| `menu-interaction.suite.ts` | 1 |

Zero `expect(await ...)` patterns remain in any shared test suite.

---

## What These Tests Catch

These tests serve as **automated regression guards** for screen reader compatibility:

- **Missing ARIA roles** — e.g., a refactor that removes `role="listbox"` from a menu
- **Broken label associations** — e.g., a `<label for=id>` that no longer matches an `<input>`
- **Missing state announcements** — e.g., `aria-checked` not updating after a click
- **Broken error announcements** — e.g., `role="alert"` removed from validation messages
- **Lost screen reader live regions** — e.g., `aria-live="polite"` removed from announcement spans

## What These Tests Do Not Cover

- Actual VoiceOver/NVDA spoken output (requires manual testing)
- Touch gesture navigation (iOS VoiceOver swipe patterns)
- Screen reader rotor navigation
- Announcement timing and interruption behavior
