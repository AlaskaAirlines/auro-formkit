# auro-datepicker Test Improvements

**Component:** `@aurodesignsystem/auro-datepicker`
**Branch:** `jbaker/testImprovements`
**Date:** 2025-04-15

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| `auro-datepicker` tests | 76 | 196 | +120 (+158%) |
| Combined coverage | 89.35% | 99.92% | +10.57% |
| Test duration | ~7.2s | ~8.4s | +1.2s |

## Per-File Coverage

| File | Coverage |
|------|----------|
| auro-datepicker.js | 100% |
| auro-calendar.js | 100% |
| auro-calendar-cell.js | 100% |
| auro-calendar-month.js | 100% |
| datepickerKeyboardStrategy.js | 100% |
| utilities.js | 100% |
| utilitiesCalendar.js | 100% |
| utilitiesCalendarRender.js | 98.73% |
| registered.js | 100% |

## Tests Added by Section

| Section | Before | After | Delta |
|---------|--------|-------|-------|
| Rendering | 5 | 5 | +0 |
| User Stories | 8 | 8 | +0 |
| Properties | 40 | 80 | +40 |
| Slots | 10 | 10 | +0 |
| Public Functions | 1 | 15 | +14 |
| Events | 0 | 5 | +5 |
| Private Functions | 0 | 60 | +60 |
| A11Y | 1 | 1 | +0 |
| Mouse Behavior | 6 | 6 | +0 |
| Keyboard Behavior | 5 | 5 | +0 |
| **Total** | **76** | **195** | **+119** |

Note: 1 additional skipped test brings the runtime total to 196.

## New Tests by Importance

| Priority | Description | Count |
|----------|-------------|-------|
| High | Core functionality | 18 |
| Medium | Property reflection & behavior | 38 |
| Low | Inherited helpers & private functions | 63 |
| **Total** | | **119** |

### High (P0) — Core functionality
| Test | Property/Method |
|------|-----------------|
| disabled: should not open the bib when disabled | `disabled` |
| reset: should clear value and validation state | `reset()` |
| validate: should set valueMissing when required and no value | `validate()` |
| validate: should set valid when value is present | `validate()` |
| hideBib: should close the bib when called | `hideBib()` |
| showBib: should open the bib when called | `showBib()` |
| resetInputs: should clear input values | `resetInputs()` |
| clear: should clear the current value | `clear()` |
| values: returns array with range values | `values` |
| setCustomValidity: custom message for all states | `setCustomValidity` |
| setCustomValidityCustomError: custom error text | `setCustomValidityCustomError` |
| setCustomValidityRangeOverflow: custom overflow text | `setCustomValidityRangeOverflow` |
| setCustomValidityRangeUnderflow: custom underflow text | `setCustomValidityRangeUnderflow` |
| auroDatePicker-valueSet event | `auroDatePicker-valueSet` |
| auroDatePicker-toggled event | `auroDatePicker-toggled` |
| auroDatePicker-monthChanged event | `auroDatePicker-monthChanged` |
| auroDatePicker-newSlotContent event | `auroDatePicker-newSlotContent` |
| auroFormElement-validated event | `auroFormElement-validated` |

### Medium (P1) — Property reflection & behavior
| Test | Property/Method |
|------|-----------------|
| appearance: default value | `appearance` |
| appearance: inverse attribute | `appearance` |
| autoPlacement: default false | `autoPlacement` |
| autoPlacement: reflection | `autoPlacement` |
| centralDate: default to current date | `centralDate` |
| centralDate: update visible month | `centralDate` |
| disabled: default false | `disabled` |
| disabled: reflection | `disabled` |
| dvInputOnly: default false | `dvInputOnly` |
| dvInputOnly: reflection | `dvInputOnly` |
| largeFullscreenHeadline: default false | `largeFullscreenHeadline` |
| largeFullscreenHeadline: reflection | `largeFullscreenHeadline` |
| layout: default classic | `layout` |
| layout: custom value | `layout` |
| monthNames: default English month names | `monthNames` |
| noFlip: default false | `noFlip` |
| noFlip: reflection | `noFlip` |
| noValidate: default falsy | `noValidate` |
| noValidate: reflection | `noValidate` |
| offset: default 0 | `offset` |
| offset: custom value | `offset` |
| onDark: default false | `onDark` |
| onDark: reflection | `onDark` |
| placeholder: custom text | `placeholder` |
| placeholderEndDate: custom text | `placeholderEndDate` |
| placement: default bottom-start | `placement` |
| placement: custom value | `placement` |
| shape: default classic | `shape` |
| shape: custom value | `shape` |
| shift: default false | `shift` |
| shift: reflection | `shift` |
| size: default lg | `size` |
| stacked: default false | `stacked` |
| stacked: reflection | `stacked` |
| valueEnd: default undefined | `valueEnd` |
| valueEnd: preset display | `valueEnd` |
| values: empty array when no value | `values` |
| values: single value array | `values` |

### Low (P2) — Inherited helpers
| Test | Property/Method |
|------|-----------------|
| register: element is registered | `register()` |
| resetShapeClasses: callable | `resetShapeClasses()` |
| resetLayoutClasses: callable | `resetLayoutClasses()` |
| updateComponentArchitecture: callable | `updateComponentArchitecture()` |

## Notes

- 1 pre-existing skipped test (`should set an error when a wrongly formatted value is passed`) remains skipped
- Datepicker does not use `useAccessibleIt()` — a11y is tested via a single manual axe check
- `appearance="inverse"` and `onDark` fixtures wrapped in dark background `<div>` for contrast compliance
- Only remaining uncovered file is `utilitiesCalendarRender.js` (98.73%) — edge cases in calendar render utilities
- 60 Private Functions tests cover: calendar-cell methods (dateChanged, isLastHoveredDate, isReferenceDate, handleHover, isInRange), calendar-month null guards, locale overrides, snowflake layout error icon, range + onDark input rendering, bibDialogLabel, labelHidden, monthDiff, and more
