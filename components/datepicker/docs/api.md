# auro-datepicker

The `auro-datepicker` component provides users with a way to select a date or date range from a calendar popup or fullscreen calendar on mobile.

## Properties

| Property                          | Attribute                         | Modifiers | Type                | Default        | Description                                      |
|-----------------------------------|-----------------------------------|-----------|---------------------|----------------|--------------------------------------------------|
| `appearance`                      | `appearance`                      |           | `string`            | "default"      |                                                  |
| `autoPlacement`                   | `autoPlacement`                   |           | `boolean`           | false          |                                                  |
| `calendarFocusDate`               | `calendarFocusDate`               |           | `string`            |                | Date to first show in the calendar (ISO `YYYY-MM-DD`). |
| `calendarFocusDateObject`         |                                   | readonly  | `Date \| undefined` |                | Read-only local-time `Date` for `calendarFocusDate`. |
| `centralDate`                     | `centralDate`                     |           | `string`            |                | Currently visible month marker (ISO `YYYY-MM-DD`, non-reflected). |
| `dayDecorations`                  |                                   |           |                     |                | Optional callback `(date: Date) => { parts?: string[], label?: string, ariaLabel?: string } \| null`<br />for per-cell decoration. Replaces the legacy `date_MM_DD_YYYY` / `popover_MM_DD_YYYY` slots. |
| `disabled`                        | `disabled`                        |           | `boolean`           | false          |                                                  |
| `dvInputOnly`                     | `dvInputOnly`                     |           | `boolean`           | false          |                                                  |
| `error`                           | `error`                           |           | `string`            |                |                                                  |
| `format`                          | `format`                          |           | `string`            | "undefined"    |                                                  |
| `fullscreenBreakpoint`            | `fullscreenBreakpoint`            |           | `string`            | "sm"           |                                                  |
| `handleCalendarChange`            |                                   |           |                     |                |                                                  |
| `handleCalendarFocusDay`          |                                   |           |                     |                |                                                  |
| `handleCalendarPointerOut`        |                                   |           |                     |                |                                                  |
| `handleCalendarPointerOver`       |                                   |           |                     |                |                                                  |
| `handleClearClick`                |                                   |           |                     |                |                                                  |
| `handleClick`                     |                                   |           |                     |                |                                                  |
| `hasError`                        |                                   | readonly  | `boolean`           |                |                                                  |
| `inputmode`                       | `inputmode`                       |           | `string`            |                |                                                  |
| `largeFullscreenHeadline`         | `largeFullscreenHeadline`         |           | `boolean`           | false          |                                                  |
| `layout`                          | `layout`                          |           | `string`            | "classic"      |                                                  |
| `locale`                          | `locale`                          |           | `string`            |                | BCP47 locale tag (e.g. `de-DE`). Defaults to `DomHandler.getLocale(this)`. |
| `maxDate`                         | `maxDate`                         |           | `string`            |                | Maximum allowed date as ISO `YYYY-MM-DD`.        |
| `maxDateObject`                   |                                   | readonly  | `Date \| undefined` |                | Read-only local-time `Date` for `maxDate`.       |
| `minDate`                         | `minDate`                         |           | `string`            |                | Minimum allowed date as ISO `YYYY-MM-DD`.        |
| `minDateObject`                   |                                   | readonly  | `Date \| undefined` |                | Read-only local-time `Date` for `minDate`.       |
| `monthNames`                      | `monthNames`                      |           | `array`             |                | Long-form month names. Auto-derived from the resolved locale unless the<br />consumer assigns a 12-element array override. |
| `noFlip`                          | `noFlip`                          |           | `boolean`           | false          |                                                  |
| `noValidate`                      | `noValidate`                      |           | `boolean`           | false          |                                                  |
| `offset`                          | `offset`                          |           | `number`            | 0              |                                                  |
| `onDark`                          | `onDark`                          |           | `boolean`           | false          |                                                  |
| `placeholder`                     | `placeholder`                     |           | `string`            |                |                                                  |
| `placeholderEndDate`              | `placeholderEndDate`              |           | `string`            |                |                                                  |
| `placement`                       | `placement`                       |           | `string`            | "bottom-start" |                                                  |
| `range`                           | `range`                           |           | `boolean`           | false          |                                                  |
| `referenceDates`                  | `referenceDates`                  |           | `array`             |                | Decorated reference dates (ISO `YYYY-MM-DD` or legacy `MM/DD/YYYY`). |
| `required`                        | `required`                        |           | `boolean`           | false          |                                                  |
| `setCustomValidity`               | `setCustomValidity`               |           | `string`            |                |                                                  |
| `setCustomValidityCustomError`    | `setCustomValidityCustomError`    |           | `string`            |                |                                                  |
| `setCustomValidityRangeOverflow`  | `setCustomValidityRangeOverflow`  |           | `string`            |                |                                                  |
| `setCustomValidityRangeUnderflow` | `setCustomValidityRangeUnderflow` |           | `string`            |                |                                                  |
| `setCustomValidityValueMissing`   | `setCustomValidityValueMissing`   |           | `string`            |                |                                                  |
| `shape`                           |                                   |           | `string`            | "classic"      |                                                  |
| `shift`                           | `shift`                           |           | `boolean`           | false          |                                                  |
| `size`                            |                                   |           | `string`            | "lg"           |                                                  |
| `stacked`                         | `stacked`                         |           | `boolean`           | false          |                                                  |
| `validity`                        | `validity`                        |           | `string`            | "undefined"    |                                                  |
| `value`                           | `value`                           |           | `string`            |                | Selected start date as ISO `YYYY-MM-DD`.         |
| `valueEnd`                        | `valueEnd`                        |           | `string`            |                | Selected end date as ISO `YYYY-MM-DD` (range mode). |
| `valueEndObject`                  |                                   | readonly  | `Date \| undefined` |                | Read-only local-time `Date` for `valueEnd`.      |
| `valueObject`                     |                                   | readonly  | `Date \| undefined` |                | Read-only local-time `Date` for `value`.         |
| `values`                          |                                   | readonly  | `string[]`          |                | Convenience accessor returning `[value]` or `[value, valueEnd]` for range. |

## Methods

| Method                        | Type                          | Description                                      |
|-------------------------------|-------------------------------|--------------------------------------------------|
| `blur`                        | `(): void`                    |                                                  |
| `clear`                       | `(): void`                    |                                                  |
| `focus`                       | `(focusInput?: string): void` | Focus the datepicker trigger input.<br /><br />**focusInput**: Pass `endDate` to focus the end input (range mode). |
| `focusCalendar`               | `(): void`                    | Move focus into the calendar grid. Used by keyboard strategy after ArrowDown. |
| `hideBib`                     | `(): void`                    |                                                  |
| `reset`                       | `(): void`                    |                                                  |
| `resetInputs`                 | `(): void`                    |                                                  |
| `resetLayoutClasses`          | `(): void`                    |                                                  |
| `resetShapeClasses`           | `(): void`                    |                                                  |
| `showBib`                     | `(): void`                    |                                                  |
| `updateComponentArchitecture` | `(): void`                    |                                                  |
| `validate`                    | `(force?: boolean): void`     |                                                  |

## Events

| Event                         | Type                                             |
|-------------------------------|--------------------------------------------------|
| `auroDatePicker-monthChanged` | `CustomEvent<{ month: number; year: number; numCalendars: number; }>` |
| `auroDatePicker-toggled`      | `CustomEvent<{ expanded: any; }>`                |
| `auroDatePicker-valueSet`     |                                                  |
| `auroFormElement-validated`   |                                                  |
| `input`                       | `CustomEvent<{ value: any; valueEnd: any; }>`    |

## Slots

| Name                       |
|----------------------------|
| `ariaLabel.bib.close`      |
| `ariaLabel.input.clear`    |
| `bib.fullscreen.fromLabel` |
| `bib.fullscreen.headline`  |
| `bib.fullscreen.toLabel`   |
| `displayValue`             |
| `fromLabel`                |
| `helpText`                 |
| `label`                    |
| `toLabel`                  |

## CSS Shadow Parts

| Part              |
|-------------------|
| `calendar`        |
| `calendarWrapper` |
| `dropdown`        |
| `helpText`        |
| `helpTextSpan`    |
| `input`           |
| `trigger`         |
