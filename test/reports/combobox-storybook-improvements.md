# Combobox Storybook Improvements

**Branch:** `jbaker/storybookTestCoverageImprovements`
**PR:** #1445
**Date:** April 2026

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Chromatic-enabled stories | 17 | 23 | +6 |
| Lines added | — | — | +115 |

All new stories use the `chromatic-enabled` tag for Chromatic visual regression snapshots at xs and xl viewports. Viewport sizes are sourced from `@aurodesignsystem/design-tokens` (`ds-grid-breakpoint-xs`, `ds-grid-breakpoint-xl`) to stay in sync with WTR unit tests.

---

## New Stories Added

| Story | Type | Description |
|-------|------|-------------|
| `ComboboxDisabled` | Static state | Disabled combobox with menu options |
| `ComboboxError` | Static state | Combobox with custom error message |
| `ComboboxDisabledOption` | Interactive | Bib open with one disabled menu option visible |
| `ComboboxInverse` | Inverse | Inverse appearance on dark background |
| `ComboboxInverseDisabled` | Inverse | Inverse appearance with combobox disabled |
| `ComboboxInverseError` | Inverse | Inverse appearance with error message |

## Coverage Gaps Addressed

- **Disabled state** — previously no visual snapshot of disabled combobox
- **Error state** — previously no error visual coverage
- **Disabled option** — no visual coverage of disabled menu option within open bib
- **Inverse appearance** — no inverse coverage (default, disabled, error)
