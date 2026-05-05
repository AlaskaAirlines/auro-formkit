<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-datepicker

The `auro-datepicker` component provides users with a way to select a date or date range from a calendar popup or fullscreen calendar on mobile.

## Properties

| Property                          | Attribute                         | Modifiers | Type                                             | Default                                          | Description                                      |
|-----------------------------------|-----------------------------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| [appearance](#appearance)                      | `appearance`                      |           | `string`                                         | "'default'"                                      | Defines whether the component will be on lighter or darker backgrounds. |
| [autoPlacement](#autoPlacement)                   | `autoPlacement`                   |           | `boolean`                                        | "false"                                          | If declared, bib's position will be automatically calculated where to appear. |
| [calendarEndDate](#calendarEndDate)                 | `calendarEndDate`                 |           | `string`                                         | "undefined"                                      | The last date that may be displayed in the calendar. |
| [calendarFocusDate](#calendarFocusDate)               | `calendarFocusDate`               |           | `string`                                         | "value"                                          | The date that will first be visually rendered to the user in the calendar. |
| [calendarStartDate](#calendarStartDate)               | `calendarStartDate`               |           | `string`                                         | "undefined"                                      | The first date that may be displayed in the calendar. |
| [centralDate](#centralDate)                     | `centralDate`                     |           | `string`                                         |                                                  | The date that determines the currently visible month. |
| [disabled](#disabled)                        | `disabled`                        |           | `boolean`                                        | false                                            | If set, disables the datepicker.                 |
| [dvInputOnly](#dvInputOnly)                     | `dvInputOnly`                     |           | `boolean`                                        | false                                            | If defined, the display value slot content will only mask the HTML5 input element. The input's label will not be masked. |
| [error](#error)                           | `error`                           |           | `string`                                         |                                                  | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| [format](#format)                          | `format`                          |           | `string`                                         | "mm/dd/yyyy"                                     | Specifies the date format. The default is `mm/dd/yyyy`. |
| [fullscreenBreakpoint](#fullscreenBreakpoint)            | `fullscreenBreakpoint`            |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"                                           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| [hasError](#hasError)                        |                                   | readonly  | `boolean`                                        |                                                  |                                                  |
| [inputmode](#inputmode)                       | `inputmode`                       |           | `string`                                         |                                                  | Exposes inputmode attribute for input.           |
| [largeFullscreenHeadline](#largeFullscreenHeadline)         | `largeFullscreenHeadline`         |           | `boolean`                                        | false                                            | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| [layout](#layout)                          | `layout`                          |           | `'classic' \| 'snowflake'`                       | "'classic'"                                      | Sets the layout of the datepicker.               |
| [maxDate](#maxDate)                         | `maxDate`                         |           | `string`                                         |                                                  | Maximum date. All dates after will be disabled.  |
| [minDate](#minDate)                         | `minDate`                         |           | `string`                                         |                                                  | Minimum date. All dates before will be disabled. |
| [monthNames](#monthNames)                      | `monthNames`                      |           | `array`                                          | ["January","February","March","April","May","June","July","August","September","October","November","December"] | Names of all 12 months to render in the calendar, used for localization of date string in mobile layout. |
| [noFlip](#noFlip)                          | `noFlip`                          |           | `boolean`                                        | false                                            | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| [noValidate](#noValidate)                      | `noValidate`                      |           | `boolean`                                        | false                                            | If set, disables auto-validation on blur.        |
| [offset](#offset)                          | `offset`                          |           | `number`                                         | "0"                                              | Gap between the trigger element and bib.         |
| [onDark](#onDark)                          | `onDark`                          |           | `boolean`                                        | false                                            | DEPRECATED - use `appearance="inverse"` instead. |
| [placeholder](#placeholder)                     | `placeholder`                     |           | `string`                                         |                                                  | Placeholder text to display in the input(s) when no value is set. |
| [placeholderEndDate](#placeholderEndDate)              | `placeholderEndDate`              |           | `string`                                         |                                                  | Optional placeholder text to display in the second input when using date range.<br />By default, datepicker will use `placeholder` for both inputs if placeholder is<br />specified, but placeholderEndDate is not. |
| [placement](#placement)                       | `placement`                       |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'"                                 | Position where the bib should appear relative to the trigger. |
| [range](#range)                           | `range`                           |           | `boolean`                                        | false                                            | If set, turns on date range functionality in auro-calendar. |
| [referenceDates](#referenceDates)                  | `referenceDates`                  |           | `array`                                          |                                                  | Dates that the user should have for reference as part of their decision making when selecting a date.<br />This should be a JSON string array of dates in the format of `MM/DD/YYYY`. |
| [required](#required)                        | `required`                        |           | `boolean`                                        | false                                            | Populates the `required` attribute on the input. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)               | `setCustomValidity`               |           | `string`                                         |                                                  | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)    | `setCustomValidityCustomError`    |           | `string`                                         |                                                  | Custom help text message to display when validity = `customError`. |
| [setCustomValidityRangeOverflow](#setCustomValidityRangeOverflow)  | `setCustomValidityRangeOverflow`  |           | `string`                                         |                                                  | Custom help text message to display when validity = `rangeOverflow`. |
| [setCustomValidityRangeUnderflow](#setCustomValidityRangeUnderflow) | `setCustomValidityRangeUnderflow` |           | `string`                                         |                                                  | Custom help text message to display when validity = `rangeUnderflow`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing)   | `setCustomValidityValueMissing`   |           | `string`                                         |                                                  | Custom help text message to display when validity = `valueMissing`. |
| [shape](#shape)                           |                                   |           | `string`                                         | "classic"                                        |                                                  |
| [shift](#shift)                           | `shift`                           |           | `boolean`                                        | false                                            | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| [size](#size)                            |                                   |           | `string`                                         | "lg"                                             |                                                  |
| [stacked](#stacked)                         | `stacked`                         |           | `boolean`                                        | false                                            | Set true to make datepicker stacked style.       |
| [validity](#validity)                        | `validity`                        |           | `string`                                         | "undefined"                                      | Specifies the `validityState` this element is in. |
| [value](#value)                           | `value`                           |           | `string`                                         | "undefined"                                      | Value selected for the datepicker.               |
| [valueEnd](#valueEnd)                        | `valueEnd`                        |           | `string`                                         | "undefined"                                      | Value selected for the second datepicker when using date range. |
| [values](#values)                          |                                   | readonly  | `string[]`                                       |                                                  | A convenience wrapper for `value` and `valueEnd`, uses the new Auro "array value pattern". |

## Methods

| Method                        | Type                                   | Description                                      |
|-------------------------------|----------------------------------------|--------------------------------------------------|
| [clear](#clear)                       | `(): void`                             | Clears the current value(s) of the datepicker.   |
| [focus](#focus)                       | `(focusInput?: string): void`          | Focuses the datepicker trigger input.<br /><br />**focusInput**: Pass in `endDate` to focus on the return input. No parameter is needed to focus on the depart input. |
| [hideBib](#hideBib)                     | `(): void`                             | Hides the dropdown bib if its open.              |
| [reset](#reset)                       | `(): void`                             | Resets component to initial state.               |
| [resetInputs](#resetInputs)                 | `(): void`                             | Resets values without resetting validation.      |
| [resetLayoutClasses](#resetLayoutClasses)          | `(): void`                             |                                                  |
| [resetShapeClasses](#resetShapeClasses)           | `(): void`                             |                                                  |
| [showBib](#showBib)                     | `(): void`                             | Shows the dropdown bib if there are options to show. |
| [updateComponentArchitecture](#updateComponentArchitecture) | `(): void`                             |                                                  |
| [validate](#validate)                    | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                           | Type                                             | Description                                      |
|---------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroDatePicker-monthChanged`   | `CustomEvent<{ month: any; year: any; numCalendars: any; }>` | Notifies that the visible calendar month(s) have changed. |
| `auroDatePicker-newSlotContent` | `CustomEvent<any>`                               | Notifies that new slot content has been added to the datepicker. |
| `auroDatePicker-toggled`        | `CustomEvent<{ expanded: any; }>`                | Notifies that the calendar dropdown has been opened/closed. |
| `auroDatePicker-valueSet`       |                                                  | Notifies that the component has a new value set. |
| `auroFormElement-validated`     |                                                  | Notifies that the component value(s) have been validated. |
| [input](#input)                         |                                                  |                                                  |

## Slots

| Name                       | Description                                      |
|----------------------------|--------------------------------------------------|
| `ariaLabel.bib.close`      | Sets aria-label on close button in fullscreen bib |
| `ariaLabel.input.clear`    | Sets aria-label on clear button                  |
| `bib.fullscreen.dateLabel` | **DEPRECATED** - Use `bib.fullscreen.fromLabel` instead. |
| `bib.fullscreen.fromLabel` | Defines the content to display above the first input in the mobile layout. |
| `bib.fullscreen.headline`  | Defines the headline to display above bib.fullscreen.dateLabels in the mobile layout. |
| `bib.fullscreen.toLabel`   | Defines the content to display above the second input in the mobile layout when `range` is true. |
| `date_MM_DD_YYYY`          | Defines the content to display in the auro-calendar-cell for the specified date. The content text is colored using the success state token when the `highlight` attribute is applied to the slot. |
| [fromLabel](#fromLabel)                | Defines the label content for the first input.   |
| [helpText](#helpText)                 | Defines the content of the helpText.             |
| [label](#label)                    | Defines the label content for the entire datepicker when `layout="snowflake"`. |
| `popover_MM_DD_YYYY`       | Defines the content to display in the auro-calendar-cell popover for the specified date. |
| [toLabel](#toLabel)                  | Defines the label content for the second input when the `range` attribute is used. |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| [calendar](#calendar)        | Use for customizing the style of the calendar.   |
| [calendarWrapper](#calendarWrapper) | Use for customizing the style of the calendar container. |
| [dropdown](#dropdown)        | Use for customizing the style of the dropdown.   |
| [helpText](#helpText)        | Use for customizing the style of the datepicker help text. |
| [helpTextSpan](#helpTextSpan)    | Use for customizing the style of the datepicker help text span. |
| [input](#input)           | Use for customizing the style of the datepicker inputs. |
| [trigger](#trigger)         | Use for customizing the style of the datepicker trigger. |
<!-- AURO-GENERATED-CONTENT:END -->
