# Datepicker Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 14 | 19 | +5 |
| Lines added | — | — | +73 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `DatepickerFocusWithin` | Pseudo-state | Focus-within pseudo-state on datepicker trigger |
| `DatepickerDisabled` | Static state | Disabled datepicker |
| `DatepickerError` | Static state | Datepicker with custom error message |
| `DatepickerInverse` | Inverse | Inverse appearance on dark background (single date) |
| `DatepickerInverseRange` | Inverse | Inverse appearance with range mode (departure + return) |

## Coverage Gaps Addressed

- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled state** — previously no disabled visual coverage
- **Error state** — previously no error visual coverage
- **Inverse appearance** — no inverse coverage (single date and range)
