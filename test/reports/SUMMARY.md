# Test Improvements Summary — All Components

**Branch:** `jbaker/testImprovements`
**PR:** [#1432](https://github.com/AlaskaAirlines/auro-formkit/pull/1432)
**Date:** April 14, 2026

---

## Overall Metrics

| Component | Tests Before | Tests After | Change | Coverage Before | Coverage After | Coverage Δ | Duration Before | Duration After | Duration Δ |
|-----------|-------------|-------------|--------|-----------------|----------------|------------|-----------------|----------------|------------|
| bibtemplate | 0 | 30 | +30 | N/A | 96.93% | — | N/A | ~1.3s | — |
| checkbox | 23 | 112 | +89 | 97.04% | 98.94% | +1.90% | ~1.7s | ~2.0s | +0.3s |
| combobox¹ | 167 | 325 | +158 | 94.28% | 95.72% | +1.44% | ~7.4s | ~7.8s | +0.4s |
| counter | 48 | 110 | +62 | 92.00% | 95.36% | +3.36% | ~1.8s | ~2.7s | +0.9s |
| datepicker | 76 | 136 | +60 | 89.35% | 93.03% | +3.68% | ~7.2s | ~8.1s | +0.9s |
| dropdown | 50 | 104 | +54 | 87.72% | 89.30% | +1.58% | ~1.3s | ~1.8s | +0.5s |
| form | 28 | 40 | +12 | 98.13% | 98.14% | +0.01% | ~3.3s | — | — |
| helptext | 0 | 29 | +29 | N/A | 97.04% | — | N/A | — | — |
| input | 71 | 120 | +49 | 88.70% | 91.43% | +2.73% | ~2.1s | — | — |
| layoutElement | 0 | 25 | +25 | N/A | 100% | — | N/A | ~1.5s | — |
| menu² | 55 | 127 | +72 | 80.47% | 92.67% | +12.20% | ~81.5s | ~2.0s | −79.5s |
| radio | 16 | 112 | +96 | 96.56% | 97.88% | +1.32% | ~1.2s | ~1.8s | +0.6s |
| select | 87 | 142 | +55 | 93.88% | 95.05% | +1.17% | ~9.2s | ~10.6s | +1.4s |
| **Totals** | **621** | **1,412** | **+791** | | | | | | |

¹ Combobox tests run twice (desktop + mobile viewport); counts are test executions, not `it()` blocks.
² Menu baseline had 41 pre-existing failures due to concurrent test file collisions; fixed by adding `concurrency: 1` config.

---

## New Infrastructure

| Component | What was added |
|-----------|---------------|
| bibtemplate | New test file, test script in `package.json` |
| helptext | New test file, test script in `package.json` |
| layoutElement | New test file, test fixtures, `web-test-runner.config.mjs`, test script in `package.json` |
| menu | New `web-test-runner.config.mjs` with `concurrency: 1`, new `auro-menuoption.test.js` |

---

## Tests Added by Section (Aggregated)

| Section | New Tests | % of Total |
|---------|-----------|------------|
| Properties | 408 | 57.3% |
| Public Functions | 107 | 15.0% |
| Events | 63 | 8.8% |
| Rendering | 38 | 5.3% |
| A11Y | 21 | 2.9% |
| Slots | 21 | 2.9% |
| Keyboard Behavior | 21 | 2.9% |
| User Stories | 10 | 1.4% |
| Mouse Behavior | 8 | 1.1% |
| Private Functions | 5 | 0.7% |
| Lifecycle | 3 | 0.4% |
| **Total** | **~712** | |

Note: Section totals are approximate; some components track sections differently.

---

## Tests by Importance

| Priority | bibtemplate | checkbox | combobox | counter | datepicker | dropdown | form | helptext | input | layoutElement | menu | radio | select | Total |
|----------|-----------|----------|----------|---------|------------|----------|------|----------|-------|---------------|------|-------|--------|-------|
| Critical | — | 5 | — | — | — | — | — | 2 | — | — | — | 6 | — | 13 |
| High | 5 | 10 | 17 | 12 | 18 | 9 | 5 | 7 | 18 | 8 | 25 | 12 | 11 | 157 |
| Medium | 6 | 12 | 52 | 19 | 38 | 39 | 3 | 10 | 22 | 13 | 32 | 10 | 37 | 293 |
| Low | 4 | 7 | 4 | 5 | 4 | 6 | 1 | 10 | 9 | — | 15 | 8 | 7 | 80 |
| **Total** | **15** | **34** | **73** | **36** | **60** | **54** | **9** | **29** | **49** | **21** | **72** | **36** | **55** | **543** |

---

## Bug Fixes & Dead Code Findings

| Component | Finding |
|-----------|---------|
| checkbox | Constructor typo: `this.apperance` → `this.appearance` (fixed by developer) |
| checkbox | Dead code: `layout` propagation in `updated()` can never execute — `layout` not in `static get properties()` |
| menu | Pre-existing A11Y failure: `auro-menuoption` fixture missing accessible name for `role="listbox"` — fixed with `aria-labelledby` |
| menu | Pre-existing 41 test failures from concurrent test file collisions — fixed with `concurrency: 1` config |

---

## Individual Reports

- [bibtemplate](bibtemplate-test-improvements.md)
- [checkbox](checkbox-test-improvements.md)
- [combobox](combobox-test-improvements.md)
- [counter](counter-test-improvements.md)
- [datepicker](datepicker-test-improvements.md)
- [dropdown](dropdown-test-improvements.md)
- [form](form-test-improvements.md)
- [helptext](helptext-test-improvements.md)
- [input](input-test-improvements.md)
- [layoutElement](layoutElement-test-improvements.md)
- [menu](menu-test-improvements.md)
- [radio](radio-test-improvements.md)
- [select](select-test-improvements.md)
