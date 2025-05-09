# auro-datepicker

## Properties

| Property                          | Attribute                         | Modifiers | Type       | Default                                          | Description                                      |
|-----------------------------------|-----------------------------------|-----------|------------|--------------------------------------------------|--------------------------------------------------|
| `autoPlacement`                   | `autoPlacement`                   |           | `boolean`  | "false"                                          | If declared, bib's position will be automatically calculated where to appear. |
| `calendarEndDate`                 | `calendarEndDate`                 |           | `string`   | "undefined"                                      | The last date that may be displayed in the calendar. |
| `calendarFocusDate`               | `calendarFocusDate`               |           | `string`   | "value"                                          | The date that will first be visually rendered to the user in the calendar. |
| `calendarStartDate`               | `calendarStartDate`               |           | `string`   | "undefined"                                      | The first date that may be displayed in the calendar. |
| `centralDate`                     | `centralDate`                     |           | `string`   |                                                  | The date that determines the currently visible month. |
| `disabled`                        | `disabled`                        |           | `boolean`  | false                                            | If set, disables the datepicker.                 |
| `error`                           | `error`                           |           | `string`   |                                                  | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `format`                          | `format`                          |           | `string`   | "mm/dd/yyyy"                                     | Specifies the date format. The default is `mm/dd/yyyy`. |
| `fullscreenBreakpoint`            | `fullscreenBreakpoint`            |           | `string`   | "sm"                                             | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `largeFullscreenHeadline`         | `largeFullscreenHeadline`         |           | `boolean`  | false                                            | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| `maxDate`                         | `maxDate`                         |           | `string`   |                                                  | Maximum date. All dates after will be disabled.  |
| `minDate`                         | `minDate`                         |           | `string`   |                                                  | Minimum date. All dates before will be disabled. |
| `monthNames`                      | `monthNames`                      |           | `array`    | ["January","February","March","April","May","June","July","August","September","October","November","December"] | Names of all 12 months to render in the calendar, used for localization of date string in mobile layout. |
| `noFlip`                          | `noFlip`                          |           | `boolean`  | "false"                                          | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                      | `noValidate`                      |           | `boolean`  | false                                            | If set, disables auto-validation on blur.        |
| `offset`                          | `offset`                          |           | `number`   | "0"                                              | Gap between the trigger element and bib.         |
| `onDark`                          | `onDark`                          |           | `boolean`  | false                                            | If declared, onDark styles will be applied to the trigger. |
| `placement`                       | `placement`                       |           | `string`   | "bottom-start"                                   | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \| "right" \| "bottom" \| "left" \|<br />"bottom-start" \| "top-start" \| "top-end" \|<br />"right-start" \| "right-end" \| "bottom-end" \|<br />"left-start" \| "left-end" |
| `range`                           | `range`                           |           | `boolean`  | false                                            | If set, turns on date range functionality in auro-calendar. |
| `required`                        | `required`                        |           | `boolean`  | false                                            | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`               | `setCustomValidity`               |           | `string`   |                                                  | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`    | `setCustomValidityCustomError`    |           | `string`   |                                                  | Custom help text message to display when validity = `customError`. |
| `setCustomValidityRangeOverflow`  | `setCustomValidityRangeOverflow`  |           | `string`   |                                                  | Custom help text message to display when validity = `rangeOverflow`. |
| `setCustomValidityRangeUnderflow` | `setCustomValidityRangeUnderflow` |           | `string`   |                                                  | Custom help text message to display when validity = `rangeUnderflow`. |
| `setCustomValidityValueMissing`   | `setCustomValidityValueMissing`   |           | `string`   |                                                  | Custom help text message to display when validity = `valueMissing`. |
| `stacked`                         | `stacked`                         |           | `boolean`  | false                                            | Set true to make datepicker stacked style.       |
| `validity`                        | `validity`                        |           | `string`   | "undefined"                                      | Specifies the `validityState` this element is in. |
| `value`                           | `value`                           |           | `string`   | "undefined"                                      | Value selected for the datepicker.               |
| `valueEnd`                        | `valueEnd`                        |           | `string`   | "undefined"                                      | Value selected for the second datepicker when using date range. |
| `values`                          |                                   | readonly  | `string[]` |                                                  | A convenience wrapper for `value` and `valueEnd`, uses the new Auro "array value pattern". |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `focus`    | `(focusInput: string): void`           | Focuses the datepicker trigger input.<br /><br />**focusInput**: Pass in `endDate` to focus on the return input. No parameter is needed to focus on the depart input. |
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                           | Type                                             | Description                                      |
|---------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroDatePicker-monthChanged`   | `CustomEvent<{ month: any; year: any; numCalendars: any; }>` | Notifies that the visible calendar month(s) have changed. |
| `auroDatePicker-newSlotContent` | `CustomEvent<any>`                               | Notifies that new slot content has been added to the datepicker. |
| `auroDatePicker-toggled`        | `CustomEvent<{ expanded: any; }>`                | Notifies that the calendar dropdown has been opened/closed. |
| `auroDatePicker-valueSet`       |                                                  | Notifies that the component has a new value set. |
| `auroFormElement-validated`     |                                                  | Notifies that the component value(s) have been validated. |

## Slots

| Name                       | Description                                      |
|----------------------------|--------------------------------------------------|
| `bib.fullscreen.dateLabel` | Defines the content to display above selected dates in the mobile layout. |
| `bib.fullscreen.headline`  | Defines the headline to display above bib.fullscreen.dateLabels in the mobile layout. |
| `date_MM_DD_YYYY`          | Defines the content to display in the auro-calendar-cell for the specified date. The content text is colored using the success state token when the `highlight` attribute is applied to the slot. |
| `fromLabel`                | Defines the label content for the first input.   |
| `helpText`                 | Defines the content of the helpText.             |
| `popover_MM_DD_YYYY`       | Defines the content to display in the auro-calendar-cell popover for the specified date. |
| `toLabel`                  | Defines the label content for the second input when the `range` attribute is used. |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| `calendar`        | Use for customizing the style of the calendar.   |
| `calendarWrapper` | Use for customizing the style of the calendar container. |
| `dropdown`        | Use for customizing the style of the dropdown.   |
| `helpText`        | Use for customizing the style of the datepicker help text. |
| `helpTextSpan`    | Use for customizing the style of the datepicker help text span. |
| `input`           | Use for customizing the style of the datepicker inputs. |
| `trigger`         | Use for customizing the style of the datepicker trigger. |
