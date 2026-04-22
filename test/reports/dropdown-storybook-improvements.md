# Dropdown Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 20 | 28 | +8 |
| Lines added | — | — | +115 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `DropdownDefault` | Static state | Default closed dropdown (baseline visual) |
| `DropdownHover` | Pseudo-state | Hover pseudo-state on trigger |
| `DropdownFocusWithin` | Pseudo-state | Focus-within pseudo-state on dropdown |
| `DropdownDisabled` | Static state | Disabled dropdown with chevron, label, and helpText |
| `DropdownError` | Static state | Dropdown with error state and helpText |
| `DropdownInverse` | Inverse | Inverse appearance on dark background |
| `DropdownInverseDisabled` | Inverse | Inverse appearance with disabled state |
| `DropdownInverseError` | Inverse | Inverse appearance with error state |

## Coverage Gaps Addressed

- **Default closed state** — previously no baseline closed snapshot
- **Hover pseudo-state** — previously no visual hover coverage
- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled state** — previously no disabled visual coverage
- **Error state** — previously no error visual coverage
- **Inverse appearance** — no inverse coverage (default, disabled, error)
