<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-datepicker

The `auro-datepicker` component provides users with a way to select a date or date range from a calendar popup or fullscreen calendar on mobile.

## Properties

| Property                          | Attribute                         | Modifiers | Type                                             | Default                        | Description                                      |
|-----------------------------------|-----------------------------------|-----------|--------------------------------------------------|--------------------------------|--------------------------------------------------|
| `appearance`                      | `appearance`                      |           | `'default' \| 'inverse'`                         | "'default'"                    | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`                   | `autoplacement`                   |           | `boolean`                                        | "false"                        | If declared, bib's position will be automatically calculated where to appear. |
| `blackoutDates`                   | `blackoutdates`                   |           | `string[]`                                       | []                             | Array of dates that cannot be selected. Dates should be in ISO format (YYYY-MM-DD).<br /><br />**Immutable update required.** The datepicker treats this array as<br />immutable and memoizes a lookup Set keyed on the array's reference<br />identity — matching Lit's own reactivity semantics for array<br />properties. In-place mutations (`blackoutDates.push(...)`,<br />`blackoutDates[i] = ...`, `blackoutDates.splice(...)`) will not<br />invalidate the cache and the new entries will be silently ignored.<br />To update, reassign the property: `el.blackoutDates = [...el.blackoutDates, '2024-12-25']`. |
| `blackoutLabel`                   | `blackoutlabel`                   |           | `string`                                         | "'unavailable'"                | Label announced for blackout (disabled but in-range) date cells. |
| `calendarEndDate`                 | `calendarenddate`                 |           | `string`                                         | "undefined"                    | The last date that may be displayed in the calendar. |
| `calendarEndDateObject`           |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `calendarEndDate`. Returns `undefined` when `calendarEndDate` is empty or not a valid date. |
| `calendarFocusDate`               | `calendarfocusdate`               |           | `string`                                         | "value"                        | The date that will first be visually rendered to the user in the calendar. |
| `calendarFocusDateObject`         |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `calendarFocusDate`. Returns `undefined` when `calendarFocusDate` is empty or not a valid date. |
| `calendarGridLabel`               | `calendargridlabel`               |           | `string`                                         | "'Calendar days of the month'" | Accessible label for the calendar grid containing the days of the month. |
| `calendarStartDate`               | `calendarstartdate`               |           | `string`                                         | "undefined"                    | The first date that may be displayed in the calendar. |
| `calendarStartDateObject`         |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `calendarStartDate`. Returns `undefined` when `calendarStartDate` is empty or not a valid date. |
| `centralDate`                     | `centraldate`                     |           | `string`                                         |                                | The date that determines the currently visible month. |
| `centralDateObject`               |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `centralDate`. Returns `undefined` when `centralDate` is empty or not a valid date. |
| `disabled`                        | `disabled`                        |           | `boolean`                                        | false                          | If set, disables the datepicker.                 |
| `dvInputOnly`                     | `dvinputonly`                     |           | `boolean`                                        | false                          | If defined, the display value slot content will only mask the HTML5 input element. The input's label will not be masked. |
| `error`                           | `error`                           |           | `string`                                         |                                | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `format`                          | `format`                          |           | `string`                                         |                                | Specifies the date format. The default is `mm/dd/yyyy`. |
| `fullscreenBreakpoint`            | `fullscreenbreakpoint`            |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"                         | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `hasError`                        |                                   | readonly  | `boolean`                                        |                                | Returns `true` when the datepicker has an active validation error. |
| `inputmode`                       | `inputmode`                       |           | `'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'` |                                | Sets the `inputmode` attribute on the underlying input, hinting at the virtual keyboard to display. |
| `largeFullscreenHeadline`         | `largefullscreenheadline`         |           | `boolean`                                        | false                          | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| `layout`                          | `layout`                          |           | `'classic' \| 'snowflake'`                       | "'classic'"                    | Sets the layout of the datepicker.               |
| `locale`                          | `locale`                          |           | `string`                                         |                                | Defines the locale of the element. Used to derive the date format when `format` is not explicitly set. |
| `maxDate`                         | `maxdate`                         |           | `string`                                         |                                | Maximum date. All dates after will be disabled.  |
| `maxDateObject`                   |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `maxDate`. Returns `undefined` when `maxDate` is empty or not a valid date. |
| `minDate`                         | `mindate`                         |           | `string`                                         |                                | Minimum date. All dates before will be disabled. |
| `minDateObject`                   |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `minDate`. Returns `undefined` when `minDate` is empty or not a valid date. |
| `monthFirst`                      | `monthfirst`                      |           | `boolean`                                        |                                | When set, the calendar displays the month before the year in the header. |
| `monthNames`                      | `monthnames`                      |           | `string[]`                                       |                                | Names of all 12 months to render in the calendar.<br />When omitted, month names will be automatically populated from the active `locale` (falling back to `en-US`). |
| `navLabelNextMonth`               | `navlabelnextmonth`               |           | `string`                                         | "'Next month'"                 | Accessible label for the next month navigation button. |
| `navLabelPrevMonth`               | `navlabelprevmonth`               |           | `string`                                         | "'Previous month'"             | Accessible label for the previous month navigation button. |
| `noFlip`                          | `noflip`                          |           | `boolean`                                        | false                          | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                      | `novalidate`                      |           | `boolean`                                        | false                          | If set, disables auto-validation on blur.        |
| `offset`                          | `offset`                          |           | `number`                                         | "0"                            | Gap between the trigger element and bib.         |
| `onDark`                          | `ondark`                          |           | `boolean`                                        | false                          | DEPRECATED - use `appearance="inverse"` instead. |
| `placeholder`                     | `placeholder`                     |           | `string`                                         |                                | Placeholder text to display in the input(s) when no value is set. |
| `placeholderEndDate`              | `placeholderenddate`              |           | `string`                                         |                                | Optional placeholder text to display in the second input when using date range.<br />By default, datepicker will use `placeholder` for both inputs if placeholder is<br />specified, but placeholderEndDate is not. |
| `placement`                       | `placement`                       |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'"               | Position where the bib should appear relative to the trigger. |
| `range`                           | `range`                           |           | `boolean`                                        | false                          | If set, turns on date range functionality in auro-calendar. |
| `rangeLabelAfterRange`            | `rangelabelafterrange`            |           | `string`                                         | "'after range'"                | Label announced for cells after a fully selected range (both<br />`dateFrom` and `dateTo` are set). While a range is still being<br />picked (`dateFrom` set, `dateTo` unset), focused cells past the<br />start use `rangeLabelEndPreview` instead. |
| `rangeLabelBeforeRange`           | `rangelabelbeforerange`           |           | `string`                                         | "'before range'"               | Label announced for cells before the range start. |
| `rangeLabelEnd`                   | `rangelabelend`                   |           | `string`                                         | "'range end'"                  | Label announced for the range end date cell.     |
| `rangeLabelEndPreview`            | `rangelabelendpreview`            |           | `string`                                         | "'previewing range end'"       | Label announced for the focused cell while previewing a range end<br />(dateFrom set, dateTo not yet selected). Tells AT users that<br />pressing Enter would commit this cell as the range end. |
| `rangeLabelInRange`               | `rangelabelinrange`               |           | `string`                                         | "'in range'"                   | Label announced for cells within the selected range. |
| `rangeLabelStart`                 | `rangelabelstart`                 |           | `string`                                         | "'range start'"                | Label announced for the range start date cell.   |
| `referenceDates`                  | `referencedates`                  |           | `string[]`                                       |                                | Dates that the user should have for reference as part of their decision-making when selecting a date.<br />This should be a JSON string array of ISO date strings (`YYYY-MM-DD`). |
| `required`                        | `required`                        |           | `boolean`                                        | false                          | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`               | `setcustomvalidity`               |           | `string`                                         |                                | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`    | `setcustomvaliditycustomerror`    |           | `string`                                         |                                | Custom help text message to display when validity = `customError`.<br />Also used as the validation message when a blackout date is typed into the input. |
| `setCustomValidityRangeOverflow`  | `setcustomvalidityrangeoverflow`  |           | `string`                                         |                                | Custom help text message to display when validity = `rangeOverflow`. |
| `setCustomValidityRangeUnderflow` | `setcustomvalidityrangeunderflow` |           | `string`                                         |                                | Custom help text message to display when validity = `rangeUnderflow`. |
| `setCustomValidityValueMissing`   | `setcustomvalidityvaluemissing`   |           | `string`                                         |                                | Custom help text message to display when validity = `valueMissing`. |
| `shape`                           | `shape`                           |           | `'box' \| 'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'rounded' \| 'snowflake'` | "'classic'"                    | Sets the shape of the datepicker.                |
| `shift`                           | `shift`                           |           | `boolean`                                        | false                          | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| `size`                            | `size`                            |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | "'lg'"                         | Sets the size of the datepicker.                 |
| `stacked`                         | `stacked`                         |           | `boolean`                                        | false                          | Set true to make datepicker stacked style.       |
| `validity`                        | `validity`                        |           | `string`                                         | "undefined"                    | Specifies the `validityState` this element is in. |
| `value`                           | `value`                           |           | `string`                                         | "undefined"                    | Value selected for the datepicker.               |
| `valueEnd`                        | `valueend`                        |           | `string`                                         | "undefined"                    | Value selected for the second datepicker when using date range. |
| `valueEndObject`                  |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `valueEnd`. Returns `undefined` when `valueEnd` is empty or not a valid date. |
| `valueObject`                     |                                   | readonly  | `Date \| undefined`                              |                                | Read-only `Date` object derived from `value`. Returns `undefined` when `value` is empty or not a valid date. |
| `values`                          |                                   | readonly  | `string[]`                                       |                                | A convenience wrapper for `value` and `valueEnd`, uses the new Auro "array value pattern". |

## Methods

| Method                           | Type                                   | Description                                      |
|----------------------------------|----------------------------------------|--------------------------------------------------|
| `clear`                          | `(): void`                             | Clears the current value(s) of the datepicker.   |
| `focus`                          | `(focusInput?: string): void`          | Focuses the datepicker trigger input.<br /><br />**focusInput**: Pass in `endDate` to focus on the return input. No parameter is needed to focus on the depart input. |
| `hideBib`                        | `(): void`                             | Hides the dropdown bib if its open.              |
| `initializeArchitectureDefaults` | `(): void`                             |                                                  |
| `reset`                          | `(): void`                             | Resets component to initial state.               |
| `resetInputs`                    | `(): void`                             | Resets values without resetting validation.      |
| `resetLayoutClasses`             | `(): void`                             |                                                  |
| `resetShapeClasses`              | `(): void`                             |                                                  |
| `showBib`                        | `(): void`                             | Shows the dropdown bib if there are options to show. |
| `updateComponentArchitecture`    | `(): void`                             |                                                  |
| `validate`                       | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                           | Type                                             | Description                                      |
|---------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroDatePicker-monthChanged`   | `CustomEvent<{ month: any; year: any; numCalendars: any; }>` | Notifies that the visible calendar month(s) have changed. |
| `auroDatePicker-newSlotContent` | `CustomEvent<any>`                               | Notifies that new slot content has been added to the datepicker. |
| `auroDatePicker-toggled`        | `CustomEvent<{ expanded: any; }>`                | Notifies that the calendar dropdown has been opened/closed. |
| `auroFormElement-validated`     | `CustomEvent<{ validity: any; message: any; }>`  | Notifies that the component value(s) have been validated. |
| `input`                         | `CustomEvent<any>`                               | Notifies that the datepicker's value has changed. |

## Slots

| Name                       | Description                                      |
|----------------------------|--------------------------------------------------|
| `ariaLabel.bib.close`      | Sets aria-label on close button in fullscreen bib |
| `ariaLabel.input.clear`    | Sets aria-label on clear button                  |
| `bib.fullscreen.dateLabel` | **DEPRECATED** - Use `bib.fullscreen.fromLabel` instead. |
| `bib.fullscreen.fromLabel` | Defines the content to display above the first input in the mobile layout. |
| `bib.fullscreen.headline`  | Defines the headline to display above bib.fullscreen.dateLabels in the mobile layout. |
| `bib.fullscreen.toLabel`   | Defines the content to display above the second input in the mobile layout when `range` is true. |
| `date_YYYY_MM_DD`          | Defines the content to display in the auro-calendar-cell for the specified date. The content text is colored using the success state token when the `highlight` attribute is applied to the slot. |
| `fromLabel`                | Defines the label content for the first input.   |
| `helpText`                 | Defines the content of the helpText.             |
| `label`                    | Defines the label content for the entire datepicker when `layout="snowflake"`. |
| `optionalFromLabel`        | Overrides the "(optional)" text rendered next to the first input's label when the datepicker is not `required`. |
| `optionalToLabel`          | Overrides the "(optional)" text rendered next to the second input's label when `range` is set and the datepicker is not `required`. |
| `popover_YYYY_MM_DD`       | Defines the content to display in the auro-calendar-cell popover for the specified date. |
| `toLabel`                  | Defines the label content for the second input when the `range` attribute is used. |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| `accentIcon`      | Use for customizing the style of the leading calendar accent icon. |
| `calendar`        | Use for customizing the style of the calendar.   |
| `calendarWrapper` | Use for customizing the style of the calendar container. |
| `dropdown`        | Use for customizing the style of the dropdown.   |
| `helpText`        | Use for customizing the style of the datepicker help text. |
| `helpTextSpan`    | Use for customizing the style of the datepicker help text span. |
| `input`           | Use for customizing the style of the datepicker inputs. |
| `inputSection`    | Use for customizing the style of the input section within the trigger. |
| `mainLabel`       | Use for customizing the style of the main label in the snowflake layout. |
| `trigger`         | Use for customizing the style of the datepicker trigger. |
| `wrapper`         | Use for customizing the style of the trigger content wrapper. |
<!-- AURO-GENERATED-CONTENT:END -->
