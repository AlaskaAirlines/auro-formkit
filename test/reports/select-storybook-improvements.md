# Select Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 16 | 25 | +9 |
| Lines added | — | — | +171 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `SelectDefault` | Static state | Default closed select with placeholder text (baseline visual) |
| `SelectHover` | Pseudo-state | Hover pseudo-state on select trigger |
| `SelectFocusWithin` | Pseudo-state | Focus-within pseudo-state on select |
| `SelectDisabledOption` | Interactive | Bib open with one disabled menu option visible |
| `SelectDisabled` | Static state | Disabled select with placeholder |
| `SelectError` | Static state | Select with custom error message |
| `SelectInverse` | Inverse | Inverse appearance on dark background |
| `SelectInverseDisabled` | Inverse | Inverse appearance with disabled state |
| `SelectInverseError` | Inverse | Inverse appearance with error message |

## Coverage Gaps Addressed

- **Default closed state** — previously no baseline closed snapshot
- **Hover pseudo-state** — previously no visual hover coverage
- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled option** — no visual coverage of disabled menu option within open bib
- **Disabled state** — previously no disabled visual coverage
- **Error state** — previously no error visual coverage
- **Inverse appearance** — no inverse coverage (default, disabled, error)
