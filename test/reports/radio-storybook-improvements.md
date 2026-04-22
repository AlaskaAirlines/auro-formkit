# Radio Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 6 | 15 | +9 |
| Lines added | — | — | +130 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `RadioFocusWithin` | Pseudo-state | Focus-within pseudo-state on radio group |
| `RadioPreSelected` | Static state | Pre-selected radio option (checked attribute) |
| `RadioDisabledOption` | Static state | Individual disabled radio option within group |
| `RadioGroupDisabled` | Static state | Entire radio group disabled with pre-selected option |
| `RadioGroupError` | Static state | Radio group with error message |
| `RadioInverse` | Inverse | Inverse appearance on dark background |
| `RadioInverseChecked` | Inverse | Inverse appearance with pre-selected option |
| `RadioInverseDisabled` | Inverse | Inverse appearance with entire group disabled |
| `RadioInverseError` | Inverse | Inverse appearance with error message |

## Coverage Gaps Addressed

- **Focus-within pseudo-state** — previously no visual focus coverage
- **Pre-selected state** — no snapshot of pre-checked radio option
- **Disabled option** — no visual coverage of individually disabled radio
- **Disabled group** — no visual coverage of fully disabled group
- **Error state** — no error visual coverage
- **Inverse appearance** — no inverse coverage (default, checked, disabled, error)
