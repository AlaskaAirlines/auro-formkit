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
| [placeholderEndDate](#placeholderEndDate)              | `placeholderEndDate`              |           | `string`                                         |                                                  | Optional placeholder text to display in the second input when using date range.<br />By default, datepicker will use `placeholder` for both inputs if placeholder is<br />specified, but placeholderendDate is not. |
| [placement](#placement)                       | `placement`                       |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'"                                 | Position where the bib should appear relative to the trigger. |
| [range](#range)                           | `range`                           |           | `boolean`                                        | false                                            | If set, turns on date range functionality in auro-calendar. |
| [referenceDates](#referenceDates)                  | `referenceDates`                  |           | `array`                                          |                                                  | Dates that the user should have for reference as part of their decision making when selecting a date.<br />This should be a JSON string array of dates in the format of `MM-DD-YYYY`. |
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

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-datepicker>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-datepicker>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Range

The datepicker can also be used to select a range between two dates by adding the `range` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/range.html) -->
  <!-- The below content is automatically added from ./../apiExamples/range.html -->
  <auro-datepicker range>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/range.html -->

```html
<auro-datepicker range>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use `appearance="inverse"` to display the datepicker on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-datepicker appearance="inverse">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-datepicker appearance="inverse">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-range.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-range.html -->
  <auro-datepicker appearance="inverse" range>
    <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-range.html -->

```html
<auro-datepicker appearance="inverse" range>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Customized Bib Position

The bib position can be customized with `placement`, `offset`, `flip`, `autoPlacement`, and `shift` attributes.

- `placement` specifies the preferred position where the bib should appear relative to the trigger.
- `offset` sets the distance between the trigger and the bib.
- When `autoPlacement` is enabled, smart positioning logic is applied to determine the best placement for the bib. If all sides have sufficient space, the bib will appear in the position specified by `placement`.
- Unless `noFlip` is enabled, if there isn't enough space for the preferred `placement`, the bib will automatically flip to an alternative position.
- `shift` when enabled, adjusts the bib position when it would overflow the viewport boundaries, ensuring it remains visible.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
  <!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
  <div style="width: 400px">
    <auro-datepicker offset="20" placement="bottom-start" noFlip>
      <span slot="bib.fullscreen.headline">Datepicker Headline</span>
      <span slot="fromLabel">bottom-start with 20px offset and noFlip</span>
      <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    </auro-datepicker>
    <br/>
    <auro-datepicker offset="20" placement="bottom-start">
      <span slot="bib.fullscreen.headline">Datepicker Headline</span>
      <span slot="fromLabel">bottom-start with 20px offset and flip</span>
      <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    </auro-datepicker>
    <br/>
    <auro-datepicker offset="20" placement="right" autoPlacement noFlip>
      <span slot="bib.fullscreen.headline">Datepicker Headline</span>
      <span slot="fromLabel">right with 20px offset, noFlip and autoPlacement</span>
      <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    </auro-datepicker>
  </div>
  <div style="width: 600px; padding-top: 1em;">
    <p>Range bottom-start with 20px offset, noFlip and shift enabled</p>
    <auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="07/08/2025">
      <span slot="ariaLabel.bib.close">Close Calendar</span>
      <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
      <span slot="fromLabel">Departure</span>
      <span slot="toLabel">Return</span>
      <span slot="bib.fullscreen.fromLabel">Departure</span>
      <span slot="bib.fullscreen.toLabel">Return</span>
    </auro-datepicker>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

```html
<div style="width: 400px">
  <auro-datepicker offset="20" placement="bottom-start" noFlip>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">bottom-start with 20px offset and noFlip</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <br/>
  <auro-datepicker offset="20" placement="bottom-start">
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">bottom-start with 20px offset and flip</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <br/>
  <auro-datepicker offset="20" placement="right" autoPlacement noFlip>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">right with 20px offset, noFlip and autoPlacement</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
</div>
<div style="width: 600px; padding-top: 1em;">
  <p>Range bottom-start with 20px offset, noFlip and shift enabled</p>
  <auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="07/08/2025">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Start & End Date

The `calendarStartDate` and `calendarEndDate` properties may be used to explicitly control which calendar months _may_ be rendered in the calendar.

In <strong>desktop</strong>, the calendar month navigation will be restricted by these dates. In <strong>mobile</strong>, the following logic is used:

- if both `calendarStartDate` and `calendarEndDate` are defined: all months between, including these dates, will be rendered.
- If only `calendarStartDate` is defined: 12 months will be rendered starting with this value.
- if only `calendarEndDate` is defined: The current date month through the value of this attribute will be rendered.

Note: This does not restrict setting a value outside of those date constraints. These properties _only_ define which months can be rendered in the calendar. A user may still type any date into the input field. If actual value selection restrictions are needed, see the `minDate` and `maxDate` properties which may be used standalone, or in conjunction with `calendarStartDate` and `calendarEndDate`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/calendar-start-and-end-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/calendar-start-and-end-date.html -->
  <auro-datepicker calendarStartDate="01/01/2022" calendarEndDate="06/01/2022">
    <span slot="bib.fullscreen.headline">calendarStartDate & calendarEndDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/calendar-start-and-end-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/calendar-start-and-end-date.html -->

```html
<auro-datepicker calendarStartDate="01/01/2022" calendarEndDate="06/01/2022">
  <span slot="bib.fullscreen.headline">calendarStartDate & calendarEndDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Focus Date

The `calendarFocusDate` controls which calendar month is first presented to the user when they open the dropdown bib.

In <strong>desktop</strong> layout, the first month actually rendered will be the `calendarFocusDate` if defined. Once the user manually navigates the calendar to a different month, the calendar view will remain where the user left off when they close and reopen the bib. If the `calendarFocusDate` attribute is changed, this will re-render the calendar starting at the new date. If `calendarFocusDate` is undefined, the first rendered month will be the current date or the first renderable date defined by `calendarStartDate`.

In <strong>mobile</strong> layout, upon first opening the bib, the vertical list of months will scroll (with no animation) to the month defined by the `calendarFocusDate`. If the user scrolls the list to a different position, the scroll position will remain where the user left off when they close and reopen the bib. If the `calendarFocusDate` is changed, the list will scroll to the new dates month. If `calendarFocusDate` is undefined, the list will start at the top most scroll position.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/calendar-focus-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/calendar-focus-date.html -->
  <auro-datepicker calendarStartDate="01/01/2022" calendarEndDate="12/01/2023" calendarFocusDate="11/01/2022">
    <span slot="bib.fullscreen.headline">calendarFocusDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/calendar-focus-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/calendar-focus-date.html -->

```html
<auro-datepicker calendarStartDate="01/01/2022" calendarEndDate="12/01/2023" calendarFocusDate="11/01/2022">
  <span slot="bib.fullscreen.headline">calendarFocusDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Central Date

The `centralDate` attribute can be used to force the calendar to navigate to a specific month. WARNING: Do not set the `centralDate` attribute on blur.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/central-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/central-date.html -->
  <auro-datepicker centralDate="06/16/1980">
    <span slot="bib.fullscreen.headline">centralDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/central-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/central-date.html -->

```html
<auro-datepicker centralDate="06/16/1980">
  <span slot="bib.fullscreen.headline">centralDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled

Set the `disabled` attribute to disable all interaction with the datepicker.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-datepicker disabled>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-datepicker disabled>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Error

Use the `error` attribute to apply a persistent custom error that supersedes the HTML5 validation logic.

A custom error message can be set using the `error` attribute, or it can be used in conjuction with the `setCustomValidityCustomError` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
  <auro-button id="undefinedValueExampleBtnAddError">Set Error</auro-button>
  <auro-button id="undefinedValueExampleBtnRemoveError">Remove Error</auro-button>
  <br />
  <auro-datepicker error="Custom error message" id="errorExample">
    <span slot="bib.fullscreen.headline">Error Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

```html
<auro-button id="undefinedValueExampleBtnAddError">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError">Remove Error</auro-button>
<br />
<auro-datepicker error="Custom error message" id="errorExample">
  <span slot="bib.fullscreen.headline">Error Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.js -->

```js
export function errorExample() {
  const errorExample = document.querySelector('#errorExample');

  document.querySelector('#undefinedValueExampleBtnAddError').addEventListener('click', () => {
    errorExample.error = 'Custom New Error';
  })

  document.querySelector('#undefinedValueExampleBtnRemoveError').addEventListener('click', () => {
    errorExample.removeAttribute('error');
  })
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Format

The `format` attribute is used to define the date format used by the datepicker. The default value is `mm/dd/yyyy`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/format.html) -->
  <!-- The below content is automatically added from ./../apiExamples/format.html -->
  <auro-datepicker format="yyyy/mm/dd">
    <span slot="bib.fullscreen.headline">Format Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/format.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/format.html -->

```html
<auro-datepicker format="yyyy/mm/dd">
  <span slot="bib.fullscreen.headline">Format Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens).

To support fullcreen bib, setting `bib.fullscreen.headline` is **STRONGLY RECOMMENDED**.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
  <!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
  <auro-datepicker fullscreenBreakpoint="lg">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

```html
<auro-datepicker fullscreenBreakpoint="lg">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Input Mode

You can manually set the input mode for the input with the `inputmode` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
  <auro-datepicker inputmode="numeric">
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

```html
<auro-datepicker inputmode="numeric">
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Max Date

To give a higher limit you can bind a date to the `maxDate` attribute. It is recommended to use the `setCustomValidityRangeOverflow` attribute to define an error message to display when validation fails the maximum date restriction.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/max-date.html -->
  <auro-datepicker maxDate="03/25/2023" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
    <span slot="bib.fullscreen.headline">maxDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/max-date.html -->

```html
<auro-datepicker maxDate="03/25/2023" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Update Max Date

Setting the `maxDate` attribute to a date earlier than the auro-datepicker `value` will result in the following changes to the component state:

* `value` will to reset to `undefined`.
* If the currently viewed calendar month is later than the new `maxDate`, the calendar view will move to the new `maxDate` month.

This example demonstrates that behavior.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/update-max-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/update-max-date.html -->
  <auro-button id="maxDateChange">Change maxDate to Today's Date</auro-button>
  <auro-button id="resetMaxDate">Reset Datepicker to Initial Example</auro-button>
  <br />
  <auro-datepicker id="maxDateExample" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
    <span slot="bib.fullscreen.headline">maxDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-max-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-max-date.html -->

```html
<auro-button id="maxDateChange">Change maxDate to Today's Date</auro-button>
<auro-button id="resetMaxDate">Reset Datepicker to Initial Example</auro-button>
<br />
<auro-datepicker id="maxDateExample" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-max-date.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-max-date.js -->

```js
function formatDateString(date) {
  /* eslint-disable prefer-template, no-magic-numbers */
  const dd = String("0" + date.getDate()).slice(-2);
  const mm = String("0" + (date.getMonth() + 1)).slice(-2);
  /* eslint-enable prefer-template, no-magic-numbers */
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

export function updateMaxDateExample() {
  const maxDateExample = document.getElementById('maxDateExample');
  const changeMaxDateButton = document.getElementById('maxDateChange');
  const resetButton = document.getElementById('resetMaxDate');

  const today = formatDateString(new Date());

  let nextWeek = new Date();
  let addOneWeek = nextWeek.getDate() + 7;

  nextWeek.setDate(addOneWeek);
  nextWeek = formatDateString(nextWeek);

  maxDateExample.setAttribute('value', nextWeek);
  maxDateExample.setAttribute('maxDate', nextWeek);

  changeMaxDateButton.addEventListener('click', () => {
    maxDateExample.setAttribute('maxDate', today);
  });

  resetButton.addEventListener('click', () => {
    maxDateExample.setAttribute('value', nextWeek);
    maxDateExample.setAttribute('maxDate', nextWeek);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Min Date

To give a lower limit you can bind a date to the `minDate` attribute. It is recommended to use the `setCustomValidityRangeUnderflow` attribute to define an error message to display when validation fails the minimum date restriction.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/min-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/min-date.html -->
  <auro-datepicker minDate="03/25/2028" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
    <span slot="bib.fullscreen.headline">minDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/min-date.html -->

```html
<auro-datepicker minDate="03/25/2028" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Update Min Date

Setting the `minDate` attribute to a date later than the auro-datepicker `value` will result in the following changes to the component state:

* `value` will to reset to `undefined`.
* If the currently viewed calendar month is earlier than the new `minDate`, the calendar view will move to the new `minDate` month.

This example demonstrates that behavior.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/update-min-date.html) -->
  <!-- The below content is automatically added from ./../apiExamples/update-min-date.html -->
  <auro-button id="minDateChange">Change minDate to a week from Today</auro-button>
  <auro-button id="resetMinDate">Reset Datepicker to Initial Example</auro-button>
  <br />
  <auro-datepicker id="minDateExample" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
    <span slot="bib.fullscreen.headline">minDate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-min-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-min-date.html -->

```html
<auro-button id="minDateChange">Change minDate to a week from Today</auro-button>
<auro-button id="resetMinDate">Reset Datepicker to Initial Example</auro-button>
<br />
<auro-datepicker id="minDateExample" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-min-date.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-min-date.js -->

```js
function formatDateString(date) {
  /* eslint-disable prefer-template, no-magic-numbers */
  const dd = String("0" + date.getDate()).slice(-2);
  const mm = String("0" + (date.getMonth() + 1)).slice(-2);
  /* eslint-enable prefer-template, no-magic-numbers */
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

export function updateMinDateExample() {
  const minDateExample = document.getElementById('minDateExample');
  const changeMinDateButton = document.getElementById('minDateChange');
  const resetButton = document.getElementById('resetMinDate');

  const today = formatDateString(new Date());

  let nextWeek = new Date();
  let addOneWeek = nextWeek.getDate() + 7;

  nextWeek.setDate(addOneWeek);
  nextWeek = formatDateString(nextWeek);

  minDateExample.setAttribute('value', today);
  minDateExample.setAttribute('minDate', today);

  changeMinDateButton.addEventListener('click', () => {
    minDateExample.setAttribute('minDate', nextWeek);
  });

  resetButton.addEventListener('click', () => {
    minDateExample.setAttribute('value', today);
    minDateExample.setAttribute('minDate', today);
  });

}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Month Names Localization

The datepicker supports localized month names through the `monthNames` property. 

This example demonstrates how to set the `monthNames` property to Korean month names, with a Korean date format.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization.html) -->
  <!-- The below content is automatically added from ./../apiExamples/localization.html -->
  <auro-datepicker format="yyyy/mm/dd" id="localizationExample">
    <span slot="bib.fullscreen.headline">Localization Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/localization.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/localization.html -->

```html
<auro-datepicker format="yyyy/mm/dd" id="localizationExample">
  <span slot="bib.fullscreen.headline">Localization Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/localization.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/localization.js -->

```js
export function localizationExample() {
  const localizedDatepicker = document.querySelector("#localizationExample");

  localizedDatepicker.monthNames = ['일월', '이월', '삼월', '사월', '오월', '유월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'];
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### No Validate

Set `noValidate` to force the datepicker not to validate when navigating away from the component.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
  <!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
  <auro-datepicker required noValidate>
    <span slot="bib.fullscreen.headline">noValidate Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->

```html
<auro-datepicker required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Reference Dates

You can choose to outline dates for the user to reference by passing a string containing an array of values to the component to tell it which dates are your reference dates.

Example:
```html
<auro-datepicker referenceDates='["10-05-2025", "10-15-2025", "10-20-2025", "10-22-2025"]'></auro-datepicker>
```

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reference-dates.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reference-dates.html -->
  <auro-datepicker referenceDates='["10-05-2025", "10-15-2025", "10-20-2025", "10-22-2025"]' minDate="10-12-2025">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reference-dates.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reference-dates.html -->

```html
<auro-datepicker referenceDates='["10-05-2025", "10-15-2025", "10-20-2025", "10-22-2025"]' minDate="10-12-2025">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Required

Populates the `required` attribute on the input. Used for client-side validation.

When the validity check fails the validityState, equals `valueMissing`. The error message for the `valueMissing` validityState can be set to a custom string using the `setCustomValidityValueMissing`. There is no default error message defined.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-datepicker required setCustomValidityValueMissing="Custom value missing message.">
    <span slot="bib.fullscreen.headline">Required Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <br />
  <auro-datepicker required range setCustomValidityValueMissing="Custom value missing message.">
    <span slot="bib.fullscreen.headline">Required Example</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-datepicker required setCustomValidityValueMissing="Custom value missing message.">
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br />
<auro-datepicker required range setCustomValidityValueMissing="Custom value missing message.">
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Stacked

Set the `stacked` attribute to make range datepicker stacked style.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/stacked.html) -->
  <!-- The below content is automatically added from ./../apiExamples/stacked.html -->
  <auro-datepicker range stacked>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/stacked.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/stacked.html -->

```html
<auro-datepicker range stacked>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Validity

Specifies the `validityState` the element is in. Upon first interaction, or presetting the `error` attribute, the component will validate on `focusout`. After validation, `validityState` can be queried from the component by using the following JavaScript.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/validity.html) -->
  <!-- The below content is automatically added from ./../apiExamples/validity.html -->
  <auro-button id="validityExampleBtn">Get validity</auro-button>
  <br />
  <auro-datepicker required id="validityExample">
    <span slot="bib.fullscreen.headline">validity Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/validity.html -->

```html
<auro-button id="validityExampleBtn">Get validity</auro-button>
<br />
<auro-datepicker required id="validityExample">
  <span slot="bib.fullscreen.headline">validity Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/validity.js -->

```js
export function validityExample() {
  const validityExampleExample = document.querySelector('#validityExample');
  const validityExampleExampleBtn = document.querySelector('#validityExampleBtn');

  validityExampleExampleBtn.addEventListener('click', () => {
    console.warn('Validity set to:', validityExampleExample.validity);
    alert(`Validity set to: ${validityExampleExample.validity}`);
  })
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Value

The `value` attribute represents the value selected for the datepicker. Can be used to pre-set the value of the datepicker. When the `range` attribute is used, `value` is for the first input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value.html -->
  <auro-datepicker id="valueExample" value="02/02/2022">
    <span slot="bib.fullscreen.headline">value Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->

```html
<auro-datepicker id="valueExample" value="02/02/2022">
  <span slot="bib.fullscreen.headline">value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Value of Second Input in Range Mode

The `valueEnd` attribute represents the value of the second input (end date), selected for the datepicker. Can be used to pre-set the value of the datepicker. Only applicable for a datepicker with the `range` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value-end.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value-end.html -->
  <auro-datepicker id="valueEndExample" range valueEnd="03/03/2023">
    <span slot="bib.fullscreen.headline">valueEnd Example</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-end.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-end.html -->

```html
<auro-datepicker id="valueEndExample" range valueEnd="03/03/2023">
  <span slot="bib.fullscreen.headline">valueEnd Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Method Examples

### Focus

The `focus()` method will apply focus state to the datepicker's input field.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/focus.html) -->
  <!-- The below content is automatically added from ./../apiExamples/focus.html -->
  <auro-button id="focusExampleBtn">Apply focus to datepicker</auro-button>
  <auro-button id="focusExampleBtnTwo">Apply focus to the second input in datepicker</auro-button>
  <br />
  <auro-datepicker id="focusExampleElem" range>
    <span slot="bib.fullscreen.headline">Focus Example</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.toLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.html -->

```html
<auro-button id="focusExampleBtn">Apply focus to datepicker</auro-button>
<auro-button id="focusExampleBtnTwo">Apply focus to the second input in datepicker</auro-button>
<br />
<auro-datepicker id="focusExampleElem" range>
  <span slot="bib.fullscreen.headline">Focus Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.toLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.js -->

```js
export function focusExample() {
  const focusExampleElem = document.querySelector('#focusExampleElem');
  const focusExampleBtn = document.querySelector('#focusExampleBtn');
  const focusExampleBtnTwo = document.querySelector('#focusExampleBtnTwo');

  focusExampleBtn.addEventListener('click', () => {
    focusExampleElem.focus();
  });

  focusExampleBtnTwo.addEventListener('click', () => {
    focusExampleElem.focus('endDate');
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Reset State

Use the `reset()` method to reset the `<auro-datepicker>`'s `value`, `valueEnd` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br />
  <auro-datepicker id="resetStateExample" range minDate="06/30/2025" calendarStartDate="06/30/2025" calendarFocusDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025" setCustomValidityRangeUnderflow="The date you entered is too early.">
    <span slot="bib.fullscreen.headline">Reset Example</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br />
<auro-datepicker id="resetStateExample" range minDate="06/30/2025" calendarStartDate="06/30/2025" calendarFocusDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025" setCustomValidityRangeUnderflow="The date you entered is too early.">
  <span slot="bib.fullscreen.headline">Reset Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->

```js
export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');

  document.querySelector('#resetStateBtn').addEventListener('click', () => {
    elem.reset();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Event Examples

### Watch for Value Changes

The following example listens for the `auroDatePicker-valueSet` event. Once triggered, `element.value` may be queried for the new value **and** in successful scenarios, an alert will appear. Open the JavaScript console in the browser's developer tools to see the `console.warn` message that appears after the `auroDatePicker-valueSet` event has been triggered.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/alert-value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/alert-value.html -->
  <auro-datepicker id="datePickerValueAlert">
    <span slot="bib.fullscreen.headline">Alert Value Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/alert-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/alert-value.html -->

```html
<auro-datepicker id="datePickerValueAlert">
  <span slot="bib.fullscreen.headline">Alert Value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/alert-value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/alert-value.js -->

```js
export function alertValueExample() {
  const valueAlertExample = document.querySelector('#datePickerValueAlert');

  valueAlertExample.addEventListener('auroDatePicker-valueSet', () => {
    console.warn('Select value changed to:', valueAlertExample.value);
    alert(`Select value changed to: ${valueAlertExample.value}`);
  })
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Slot Examples

### Aria Label for Clear Button

Use the `ariaLabel.input.clear` slot to set the `aria-label` for the clear button in the trigger input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/aria-label-input-clear.html) -->
  <!-- The below content is automatically added from ./../apiExamples/aria-label-input-clear.html -->
  <auro-datepicker>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="ariaLabel.input.clear">Custom Clear Input Button</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/aria-label-input-clear.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/aria-label-input-clear.html -->
  <auro-datepicker layout="snowflake" shape="snowflake" ondark placeholder="MM/DD/YYYY">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="label">Date</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="ariaLabel.input.clear">Snowflake Clear Input Button</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/aria-label-input-clear.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/aria-label-input-clear.html -->

```html
<auro-datepicker>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="ariaLabel.input.clear">Custom Clear Input Button</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/aria-label-input-clear.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/aria-label-input-clear.html -->

```html
<auro-datepicker layout="snowflake" shape="snowflake" ondark placeholder="MM/DD/YYYY">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="label">Date</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="ariaLabel.input.clear">Snowflake Clear Input Button</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Fullscreen Bib Date Label and Headline

Use the `bib.fullscreen.dateLabel` and `bib.fullscreen.headline` slots to set the the label at the top of the bib and headline when viewed in the mobile layout.
To view this demo, set your window to a mobile screen size.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-datepicker>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-datepicker>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### From Label

The `fromLabel` slot sets the label used for the input. When the `range` attribute is used this is the first of two inputs.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-datepicker>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-datepicker>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### To Label

The `toLabel` slot sets the label for the second input. Only for use with the `range` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/range.html) -->
  <!-- The below content is automatically added from ./../apiExamples/range.html -->
  <auro-datepicker range>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/range.html -->

```html
<auro-datepicker range>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Help Text

Sets the help text displayed below the trigger. The `helpText` slot can be used to provide additional context for the combobox. When using the `error` attribute, the `helpText` slot can be used to describe the error.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
  <!-- The below content is automatically added from ./../apiExamples/help-text.html -->
  <auro-datepicker>
    <span slot="bib.fullscreen.headline">helpText Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="helpText">Choose a date must be today or earlier.</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/help-text.html -->

```html
<auro-datepicker>
  <span slot="bib.fullscreen.headline">helpText Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="helpText">Choose a date must be today or earlier.</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Date Slot

Custom content can be added to any day in the calendar using a `slot` named following the pattern `date_{MM}_{DD}_{YYYY}` (e.g. `date_01_08_2024`).

Adding the `highlight` attribute to the slot will change the slot content's color to `var(--ds-color-text-success-default)`.

Slot content support is limited to text only and a maximum of five (5) characters.

Slot content can be styled using [inline styles](https://www.codecademy.com/article/html-inline-styles) or [CSS Parts](https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/) (`part="dateSlot"`).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/date-slot.html) -->
  <!-- The below content is automatically added from ./../apiExamples/date-slot.html -->
  <auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
    <span slot="bib.fullscreen.headline">dateSlot Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="date_12_03_2023">Sold</span>
    <span highlight slot="date_12_04_2023">$89</span>
    <span slot="date_12_05_2023">$100</span>
    <span slot="date_12_06_2023">$2345</span>
    <span highlight slot="date_12_07_2023">$149</span>
    <span highlight slot="date_12_08_2023">$382</span>
    <span slot="date_12_09_2023">$560</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/date-slot.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/date-slot.html -->

```html
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">dateSlot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="date_12_03_2023">Sold</span>
  <span highlight slot="date_12_04_2023">$89</span>
  <span slot="date_12_05_2023">$100</span>
  <span slot="date_12_06_2023">$2345</span>
  <span highlight slot="date_12_07_2023">$149</span>
  <span highlight slot="date_12_08_2023">$382</span>
  <span slot="date_12_09_2023">$560</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Popover Slot

Custom content can be added to any day's `auro-popover` in the calendar using a `slot` named following the pattern `popover_{MM}_{DD}_{YYYY}` (e.g. `popover_01_08_2024`).

The popover slot is intended for use with calendar dates that are `disabled` (e.g. before minimum date or after maximum date).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/popover-slot.html) -->
  <!-- The below content is automatically added from ./../apiExamples/popover-slot.html -->
  <auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
    <span slot="bib.fullscreen.headline">Popover Slot Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
    <span slot="popover_12_03_2023">Tickets for this day are sold out</span>
    <span slot="popover_12_04_2023">Tickets for this day are $89</span>
    <span slot="popover_12_05_2023">Tickets for this day are $100</span>
    <span slot="popover_12_06_2023">Tickets for this day are $2345</span>
    <span slot="popover_12_07_2023">Tickets for this day are $149</span>
    <span slot="popover_12_08_2023">Tickets for this day are $382</span>
    <span slot="popover_12_09_2023">Tickets for this day are $560</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/popover-slot.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/popover-slot.html -->

```html
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">Popover Slot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  <span slot="popover_12_03_2023">Tickets for this day are sold out</span>
  <span slot="popover_12_04_2023">Tickets for this day are $89</span>
  <span slot="popover_12_05_2023">Tickets for this day are $100</span>
  <span slot="popover_12_06_2023">Tickets for this day are $2345</span>
  <span slot="popover_12_07_2023">Tickets for this day are $149</span>
  <span slot="popover_12_08_2023">Tickets for this day are $382</span>
  <span slot="popover_12_09_2023">Tickets for this day are $560</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Dynamic Slot Content

This example demonstrates data driven slot content for days in the calendar. In this example, the slot content is inserted into each `auro-calendar-cell` after the bib of the `auro-datepicker` is opened, simulating an API call on a dynamic data source.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamic-slot.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dynamic-slot.html -->
  <auro-datepicker id="slotContentExample" centralDate="12/13/2023" minDate="12/13/2023" maxDate="01/18/2024" range>
    <span slot="bib.fullscreen.headline">dynamic slot Example</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic-slot.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamic-slot.html -->

```html
<auro-datepicker id="slotContentExample" centralDate="12/13/2023" minDate="12/13/2023" maxDate="01/18/2024" range>
  <span slot="bib.fullscreen.headline">dynamic slot Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic-slot.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamic-slot.js -->

```js
export function populateSlotContentExample() {
  const populateSlotContentExample = document.querySelector('#slotContentExample');

  // Insert slot content when the datepicker has been opened
  populateSlotContentExample.addEventListener('auroDatePicker-toggled', (event) => {
    if (event.detail.expanded) {
      // Array of object(s) containing key, value pairs defining what slot content to render
      const data = [
        {slot: 'date', month: 12, day: 1, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 2, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 3, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 4, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 5, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 6, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 7, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 8, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 9, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 10, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 11, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 12, year: 2023, content: 'Sold'},
        {slot: 'date', month: 12, day: 13, year: 2023, content: '$560'},
        {slot: 'date', month: 12, day: 14, year: 2023, content: '$89', highlight: true},
        {slot: 'date', month: 12, day: 15, year: 2023, content: '$100'},
        {slot: 'date', month: 12, day: 16, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 17, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 18, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 19, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 20, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 21, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 22, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 23, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 24, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 25, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 26, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 27, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 28, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 29, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 30, year: 2023, content: '$2345'},
        {slot: 'date', month: 12, day: 31, year: 2023, content: '$2345'},
        {slot: 'date', month: 1, day: 14, year: 2024, content: '$83', highlight: true},
        {slot: 'date', month: 1, day: 15, year: 2024, content: '$203'},
        {slot: 'date', month: 1, day: 16, year: 2024, content: '$4444'},
        {slot: 'date', month: 1, day: 17, year: 2024, content: '$83', highlight: true},
        {slot: 'date', month: 1, day: 18, year: 2024, content: '$96', highlight: true},
        {slot: 'date', month: 1, day: 19, year: 2024, content: 'Sold'},
        {slot: 'date', month: 1, day: 20, year: 2024, content: 'Sold'},
        {slot: 'popover', month: 12, day: 1, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 2, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 3, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 4, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 5, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 6, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 7, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 8, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 9, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 10, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 11, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 12, year: 2023, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 12, day: 13, year: 2023, content: 'Tickets for this date are $560'},
        {slot: 'popover', month: 12, day: 14, year: 2023, content: 'Tickets for this date are $89'},
        {slot: 'popover', month: 12, day: 15, year: 2023, content: 'Tickets for this date are $100'},
        {slot: 'popover', month: 12, day: 16, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 17, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 18, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 19, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 20, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 21, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 22, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 23, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 24, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 25, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 26, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 27, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 28, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 29, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 30, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 12, day: 31, year: 2023, content: 'Tickets for this date are $2345'},
        {slot: 'popover', month: 1, day: 14, year: 2024, content: 'Tickets for this date are $83'},
        {slot: 'popover', month: 1, day: 15, year: 2024, content: 'Tickets for this date are $203'},
        {slot: 'popover', month: 1, day: 16, year: 2024, content: 'Tickets for this date are $4444'},
        {slot: 'popover', month: 1, day: 17, year: 2024, content: 'Tickets for this date are $83'},
        {slot: 'popover', month: 1, day: 18, year: 2024, content: 'Tickets for this date are $96'},
        {slot: 'popover', month: 1, day: 19, year: 2024, content: 'Tickets for this date are sold out'},
        {slot: 'popover', month: 1, day: 20, year: 2024, content: 'Tickets for this date are sold out'}
      ];

      // For each item in the array, parse the keys into an HTML element and insert it into the DOM
      data.forEach((item) => {
        // Create the new element for the slot content
        const slotElement = document.createElement('span');

        if (item.month.toString().length === 1) {
          item.month = `0` + item.month;
        }

        if (item.day.toString().length === 1) {
          item.day = `0` + item.day;
        }

        // Create the slot name from the item's keys
        const slotName = `${item.slot}_${item.month}_${item.day}_${item.year}`;

        // Set the slot name and content
        slotElement.setAttribute('slot', slotName);
        slotElement.textContent = item.content;

        // Set the 'highlight' attribute on date slot content
        if (item.slot === 'date' && item.highlight) {
          slotElement.setAttribute('highlight', item.highlight);
        }

        // Append the new element to the DOM
        populateSlotContentExample.appendChild(slotElement);
      });
    }

    populateSlotContentExample.pushSlotContent();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Datepicker in Dialog

The following example demonstrates the use of `<auro-datepicker>` within an `<auro-dialog>` component.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-dialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/in-dialog.html -->
  <div>
    <auro-button id="datepicker-dialog-opener">Datepicker in Dialog</auro-button>
    <auro-dialog id="datepicker-dialog">
      <span slot="bib.fullscreen.headline">inDialog Example</span>
      <span slot="header">Datepicker in Dialog</span>
      <div slot="content">
        <auro-datepicker />
      </div>
    </auro-dialog>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.html -->

```html
<div>
  <auro-button id="datepicker-dialog-opener">Datepicker in Dialog</auro-button>
  <auro-dialog id="datepicker-dialog">
    <span slot="bib.fullscreen.headline">inDialog Example</span>
    <span slot="header">Datepicker in Dialog</span>
    <div slot="content">
      <auro-datepicker />
    </div>
  </auro-dialog>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#datepicker-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#datepicker-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
/* stylelint-disable color-function-notation */

@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-datepicker-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-datepicker-outline-color: transparent;

  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}

:host([ondark]),
:host([appearance="inverse"]) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-outline-color: transparent;

  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
```
<!-- AURO-GENERATED-CONTENT:END -->
