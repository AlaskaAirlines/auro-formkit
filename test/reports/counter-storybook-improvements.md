# Counter Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 11 | 18 | +7 |
| Lines added | — | — | +95 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `CounterFocusWithin` | Pseudo-state | Focus-within pseudo-state on standalone counter |
| `CounterDisabled` | Static state | Disabled counters with short and long labels |
| `CounterError` | Static state | Counter with custom error message |
| `CounterInverse` | Inverse | Inverse appearance on dark background |
| `CounterInverseDisabled` | Inverse | Inverse appearance with disabled counters |
| `CounterInverseError` | Inverse | Inverse appearance with error message |
| `CounterInverseGroup` | Inverse | Inverse appearance on counter-group with helpText |

## Coverage Gaps Addressed

- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled state** — previously no disabled visual coverage
- **Error state** — previously no error visual coverage
- **Inverse appearance** — no inverse coverage (default, disabled, error, group)
