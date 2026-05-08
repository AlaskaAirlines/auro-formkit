# Input Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 8 | 15 | +7 |
| Lines added | — | — | +88 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `InputFocusWithin` | Pseudo-state | Focus-within pseudo-state on input |
| `InputDisabled` | Static state | Disabled input with label and helpText |
| `InputError` | Static state | Input with error message |
| `InputReadonly` | Static state | Readonly input with pre-set value |
| `InputInverse` | Inverse | Inverse appearance on dark background |
| `InputInverseDisabled` | Inverse | Inverse appearance with disabled state |
| `InputInverseError` | Inverse | Inverse appearance with error message |

## Coverage Gaps Addressed

- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled state** — previously no disabled visual coverage
- **Error state** — previously no error visual coverage
- **Readonly state** — previously no readonly visual coverage
- **Inverse appearance** — no inverse coverage (default, disabled, error)
