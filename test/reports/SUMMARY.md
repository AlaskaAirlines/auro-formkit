# Test Improvements Summary — All Components

**Branch:** `jbaker/testImprovements`
**PR:** [#1432](https://github.com/AlaskaAirlines/auro-formkit/pull/1432)
**Date:** April 15, 2026

---

## Overall Metrics

| Component | Tests Before | Tests After | Change | Coverage Before | Coverage After | Coverage Δ |
|-----------|-------------|-------------|--------|-----------------|----------------|------------|
| bibtemplate | 0 | 32 | +32 | N/A | 100% | — |
| checkbox | 23 | 115 | +92 | 97.04% | 99.64% | +2.60% |
| combobox¹ | 167 | 379 | +212 | 94.28% | 100% | +5.72% |
| counter | 48 | 133 | +85 | 92.00% | 100% | +8.00% |
| datepicker | 76 | 196 | +120 | 89.35% | 99.92% | +10.57% |
| dropdown | 50 | 138 | +88 | 87.72% | 100% | +12.28% |
| form | 28 | 71 | +43 | 98.13% | 100% | +1.87% |
| helptext | 0 | 31 | +31 | N/A | 100% | — |
| input | 71 | 176 | +105 | 88.70% | 100% | +11.30% |
| layoutElement | 0 | 25 | +25 | N/A | 100% | — |
| menu² | 55 | 152 | +97 | 80.47% | 96.96% | +16.49% |
| radio | 16 | 122 | +106 | 96.56% | 100% | +3.44% |
| select¹ | 87 | 346 | +259 | 93.88% | 100% | +6.12% |
| **Totals** | **621** | **1,916** | **+1,295** | **~91.5%** | **~99.7%** | **+~8.2%** |

¹ Combobox and select tests run twice (desktop + mobile viewport); counts are test executions, not test blocks.
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

| Section | Total Tests | Delta | % of Total |
|---------|-----------|-------|------------|
| Properties | 536 | +406 | 38.5% |
| Private Functions | 246 | +245 | 17.7% |
| Public Functions | 126 | +110 | 9.1% |
| Keyboard Behavior | 107 | +50 | 7.7% |
| User Stories | 84 | +19 | 6.0% |
| Rendering | 73 | +38 | 5.2% |
| Slots | 66 | +27 | 4.7% |
| Events | 66 | +66 | 4.7% |
| A11Y | 50 | +25 | 3.6% |
| Mouse Behavior | 35 | +11 | 2.5% |
| Lifecycle | 3 | +3 | 0.2% |
| **Total** | **1,392** | **+1,000** | |

Note: Section totals count unique test blocks across all components. Combobox and select run tests twice (desktop + mobile viewport); their test execution counts are higher. Form has tests across 3 files with non-standard groupings.

---

## Tests by Importance

| Priority | bibtemplate | checkbox | combobox | counter | datepicker | dropdown | form | helptext | input | layoutElement | menu | radio | select | Total |
|----------|-----------|----------|----------|---------|------------|----------|------|----------|-------|---------------|------|-------|--------|-------|
| Critical | — | 5 | — | — | — | — | — | 2 | — | — | — | 6 | — | 13 |
| High | 7 | 13 | 25 | 16 | 18 | 9 | 5 | 7 | 18 | 8 | 25 | 12 | 12 | 175 |
| Medium | 6 | 12 | 64 | 27 | 38 | 39 | 3 | 10 | 22 | 13 | 32 | 10 | 37 | 313 |
| Low | 4 | 7 | 11 | 42 | 63 | 40 | 1 | 10 | 25 | — | 15 | 8 | 41 | 267 |
| **Total** | **17** | **37** | **100** | **85** | **119** | **88** | **9** | **29** | **65** | **21** | **72** | **36** | **90** | **768** |

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
