# Checkbox Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 2 | 11 | +9 |
| Lines added | — | — | +134 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `CheckboxHover` | Pseudo-state | Hover pseudo-state on checkbox group |
| `CheckboxFocusWithin` | Pseudo-state | Focus-within pseudo-state on checkbox group |
| `CheckboxChecked` | Static state | Pre-checked options rendered |
| `CheckboxDisabledOptions` | Static state | Mix of disabled checked/unchecked options |
| `CheckboxGroupDisabled` | Static state | Entire group disabled |
| `CheckboxGroupError` | Static state | Group with error message |
| `CheckboxInverse` | Inverse | Inverse appearance on dark background with checked option |
| `CheckboxInverseDisabled` | Inverse | Inverse appearance with group disabled |
| `CheckboxInverseError` | Inverse | Inverse appearance with error message |

## Coverage Gaps Addressed

- **Hover pseudo-state** — previously no visual hover coverage
- **Focus-within pseudo-state** — previously no visual focus coverage
- **Checked state** — no static pre-checked snapshot
- **Disabled options/group** — no disabled visual coverage
- **Error state** — no error visual coverage
- **Inverse appearance** — no inverse coverage (default, disabled, error)
