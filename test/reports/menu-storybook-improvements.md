# Menu Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 7 | 11 | +4 |
| Lines added | — | — | +45 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `MenuFocusWithin` | Pseudo-state | Focus-within pseudo-state on menu |
| `MenuDisabledOptions` | Static state | Menu with individually disabled options and hr separators |
| `MenuDisabled` | Static state | Entire menu disabled |
| `DarkExampleStories` | API example | Grouped API example stories for dark theme |

## Coverage Gaps Addressed

- **Focus-within pseudo-state** — previously no visual focus coverage
- **Disabled options** — no visual coverage of individually disabled menu items
- **Disabled menu** — no visual coverage of fully disabled menu
- **Dark theme API examples** — no visual coverage of dark-themed menu variants
