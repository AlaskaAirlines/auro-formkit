# Storybook Test Coverage Improvements — Summary

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Overview

This PR adds **68 new Chromatic-enabled Storybook stories** across 11 components (plus enables 4 previously-disabled snapshots in Form), bringing the total from **106 to 174 stories**. The primary focus areas are:

1. **Inverse appearance** — Added across all 8 components that support it (checkbox, combobox, counter, datepicker, dropdown, input, radio, select)
2. **Missing state coverage** — Disabled, error, readonly, pre-selected, and default/closed states
3. **Pseudo-state coverage** — Hover and focus-within for components that lacked it
4. **New component coverage** — HelpText had zero stories; now has 4
5. **Chromatic enablement** — Form had all snapshots disabled; now enabled for all 4 stories
6. **Design token alignment** — Storybook viewport breakpoints now sourced from `@aurodesignsystem/design-tokens` to match WTR unit tests

All stories use the `chromatic-enabled` tag and are captured at xs and xl viewports. Viewport sizes are sourced from the `ds-grid-breakpoint-*` design tokens to stay in sync with WTR unit tests.

---

## Aggregate Stats

| Metric | Value |
|--------|-------|
| Files changed | 12 |
| Lines added | +1,032 |
| Lines removed | -15 |
| New story exports | 68 |
| Snapshots enabled (Form) | 4 |
| Total stories (before) | 106 |
| Total stories (after) | 174 |

---

## Per-Component Summary

| Component | Before | After | New Stories | Key Additions |
|-----------|--------|-------|-------------|---------------|
| checkbox | 2 | 11 | +9 | Hover, focus, checked, disabled, error, inverse (3) |
| combobox | 17 | 23 | +6 | Disabled, error, disabled option, inverse (3) |
| counter | 11 | 18 | +7 | Focus, disabled, error, inverse (4) |
| datepicker | 14 | 19 | +5 | Focus, disabled, error, inverse (2) |
| dropdown | 20 | 28 | +8 | Default closed, hover, focus, disabled, error, inverse (3) |
| form | 5 | 5 | 0* | *Enabled Chromatic snapshots for all 4 stories |
| helptext | 0 | 4 | +4 | New file — default, error, inverse (2) |
| input | 8 | 15 | +7 | Focus, disabled, error, readonly, inverse (3) |
| menu | 7 | 11 | +4 | Focus, disabled options, disabled menu, dark API examples |
| radio | 6 | 15 | +9 | Focus, pre-selected, disabled, error, inverse (4) |
| select | 16 | 25 | +9 | Default closed, hover, focus, disabled, error, inverse (3) |

---

## Cross-Cutting Gaps Addressed

### Inverse Appearance (27 stories)

No component had inverse appearance coverage. Added across all 8 components that support `appearance="inverse"`:

| Component | Inverse Stories |
|-----------|----------------|
| checkbox | Inverse, InverseDisabled, InverseError |
| combobox | Inverse, InverseDisabled, InverseError |
| counter | Inverse, InverseDisabled, InverseError, InverseGroup |
| datepicker | Inverse, InverseRange |
| dropdown | Inverse, InverseDisabled, InverseError |
| helptext | Inverse, InverseError |
| input | Inverse, InverseDisabled, InverseError |
| radio | Inverse, InverseChecked, InverseDisabled, InverseError |
| select | Inverse, InverseDisabled, InverseError |

All inverse stories render on a dark background (`var(--ds-color-background-darkest)`) for visual clarity.

### Pseudo-States (12 stories)

Added hover and/or focus-within pseudo-state stories to components that lacked them:

- checkbox (hover, focus-within)
- counter (focus-within)
- datepicker (focus-within)
- dropdown (hover, focus-within)
- input (focus-within)
- menu (focus-within)
- radio (focus-within)
- select (hover, focus-within)

### Static States (19 stories)

Disabled, error, readonly, pre-selected, and default/closed states added where missing:

- checkbox: checked, disabled options, group disabled, group error
- combobox: disabled, error, disabled option
- counter: disabled, error
- datepicker: disabled, error
- dropdown: default closed, disabled, error
- helptext: default, error
- input: disabled, error, readonly
- radio: pre-selected, disabled option, group disabled, group error
- select: default closed, disabled option, disabled, error

### Form Chromatic Enablement

Removed `chromatic: { disableSnapshot: true }` from Form meta and added `chromatic-enabled` tag to all 4 stories (SuccessfulSubmit, ResetForm, EnterKeySubmit, CustomRegistration).

### Viewport Breakpoint Alignment

Updated `.storybook/modes.ts` to import breakpoint values from `@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json` instead of hardcoding them. This ensures Storybook/Chromatic viewports use the same source of truth as the WTR unit tests, which derive `mobileBreakpointWidth` from `ds-grid-breakpoint-sm`.

| Token | Used By |
|-------|---------|
| `ds-grid-breakpoint-xs` | Storybook xs viewport, Chromatic mobile snapshot |
| `ds-grid-breakpoint-sm` | WTR mobile viewport (`parseInt(token, 10) - 1`) |
| `ds-grid-breakpoint-md` | Storybook md viewport |
| `ds-grid-breakpoint-lg` | Storybook lg viewport |
| `ds-grid-breakpoint-xl` | Storybook xl viewport, Chromatic desktop snapshot |

---

## Individual Reports

Detailed per-component reports are available in `test/reports/`:

- [checkbox-storybook-improvements.md](checkbox-storybook-improvements.md)
- [combobox-storybook-improvements.md](combobox-storybook-improvements.md)
- [counter-storybook-improvements.md](counter-storybook-improvements.md)
- [datepicker-storybook-improvements.md](datepicker-storybook-improvements.md)
- [dropdown-storybook-improvements.md](dropdown-storybook-improvements.md)
- [form-storybook-improvements.md](form-storybook-improvements.md)
- [helptext-storybook-improvements.md](helptext-storybook-improvements.md)
- [input-storybook-improvements.md](input-storybook-improvements.md)
- [menu-storybook-improvements.md](menu-storybook-improvements.md)
- [radio-storybook-improvements.md](radio-storybook-improvements.md)
- [select-storybook-improvements.md](select-storybook-improvements.md)
