# Manual Testing — auro-datepicker

## Mouse Interactions

### Single Date
[ ] Click the date input trigger — verify the calendar bib opens
[ ] Click a date in the calendar — verify the date is selected, the bib closes, and the input shows the formatted date
[ ] Click the clear button — verify the date value is cleared
[ ] Click outside the bib when open — verify the bib closes
[ ] Click a disabled date (outside min/max range) — verify no selection occurs
[ ] Click the month navigation arrows — verify the calendar navigates to the previous/next month
[ ] Click the trigger when disabled — verify nothing happens

### Date Range (`range`)
[ ] Click the first date — verify it is highlighted as the start date
[ ] Click a second date — verify it is highlighted as the end date and the range is visually shown
[ ] Click the clear button on the start input — verify the start date clears
[ ] Click the clear button on the end input — verify the end date clears
[ ] Click a new first date after a range is set — verify the range resets with the new start date

### Direct Input
[ ] Type a date directly in MM/DD/YYYY format — verify the value is accepted
[ ] Type an incomplete date and blur — verify validation fires
[ ] Type an out-of-range date and blur — verify range validation fires

## Keyboard Interactions

Note: Calendar keyboard navigation is NOT YET FULLY SUPPORTED. The following tests cover the trigger and input level behavior.

[ ] Tab to the datepicker trigger — verify the input receives focus
[ ] Tab out of the input — verify focus moves to the next focusable element
[ ] Type a date directly into the input — verify the format mask guides input (MM/DD/YYYY)
[ ] Escape when the calendar is open — verify the calendar closes
[ ] Tab through the clear button (when value is present) — verify it receives focus
[ ] Enter/Space on the clear button — verify the value clears

### Fullscreen (Mobile) Mode — Keyboard
[ ] Tab does NOT close the datepicker fullscreen dialog (exception from select/combobox behavior)
[ ] Tab cycles through focusable elements inside the dialog (browser native dialog focus containment)
[ ] Escape — verify the dialog closes

## Touch / Tap Interactions

[ ] Tap the date input — verify the calendar opens (popover on desktop, fullscreen on mobile)
[ ] Tap a date in the calendar — verify it is selected
[ ] Tap the clear button — verify the value clears
[ ] Tap outside the bib — verify the bib closes
[ ] Tap on month navigation — verify the calendar navigates

## Fullscreen (Mobile) Mode

[ ] Open the datepicker at mobile breakpoint — verify the fullscreen dialog opens
[ ] Verify the close button receives initial focus when the dialog opens
[ ] Verify the fullscreen headline, fromLabel, and toLabel slot content display
[ ] Tap a date — verify it is selected
[ ] Tap the close button — verify the dialog closes
[ ] Verify focus returns to the trigger when the dialog closes
[ ] Scroll through months in the fullscreen calendar — verify smooth navigation

## Property States

### `value`
[ ] Set value programmatically (e.g., "01/15/2025") — verify the date displays in the input and the calendar highlights that date
[ ] Read value after user selects a date — verify it matches the selected date
[ ] Set value to empty string — verify the input clears

### `valueEnd` (range mode)
[ ] Set valueEnd programmatically — verify the end date input displays the value
[ ] Read valueEnd after selecting a range — verify it matches the selected end date

### `range`
[ ] Set range — verify two input fields appear (from and to) and the calendar supports range selection
[ ] Remove range — verify only one input field appears

### `minDate` / `maxDate`
[ ] Set minDate — verify all dates before minDate are visually disabled and non-selectable
[ ] Set maxDate — verify all dates after maxDate are visually disabled and non-selectable
[ ] Set both — verify only dates within the range are selectable

### `calendarStartDate` / `calendarEndDate`
[ ] Set calendarStartDate — verify the calendar does not display months before this date
[ ] Set calendarEndDate — verify the calendar does not display months after this date

### `calendarFocusDate`
[ ] Set calendarFocusDate — verify the calendar initially shows the month containing this date

### `centralDate`
[ ] Set centralDate — verify the currently visible month is determined by this date

### `format`
[ ] Set format to a custom date format — verify the input mask uses the specified format

### `placeholder`
[ ] Set placeholder — verify it displays when the input is empty
[ ] Set placeholderEndDate (range mode) — verify it displays on the end date input

### `disabled`
[ ] Set disabled — verify the input is non-interactive and the calendar cannot be opened
[ ] Remove disabled — verify the datepicker becomes interactive

### `required`
[ ] Set required with no date selected and blur — verify `valueMissing` validation error appears
[ ] Select a date — verify the error clears

### `stacked`
[ ] Set stacked — verify the datepicker renders in stacked layout

### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

### `error`
[ ] Set error with a message — verify persistent error state with the custom message

### `fullscreenBreakpoint`
[ ] Set fullscreenBreakpoint="sm" — verify fullscreen at the small breakpoint
[ ] Set fullscreenBreakpoint="disabled" — verify the datepicker never enters fullscreen

### `monthNames`
[ ] Set monthNames with localized month names — verify the calendar renders with the custom month names

### `referenceDates`
[ ] Set referenceDates — verify the specified dates are visually indicated in the calendar

### `layout` / `shape` / `size`
[ ] Set layout="snowflake" — verify the snowflake visual style applies
[ ] Verify shape and size properties change the visual rendering

## Validation

[ ] Leave a required datepicker empty and blur — verify `valueMissing` error appears
[ ] Select a date before minDate (via programmatic value) — verify `rangeUnderflow` error appears
[ ] Select a date after maxDate (via programmatic value) — verify `rangeOverflow` error appears
[ ] Set setCustomValidity with a message — verify the custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
[ ] Set setCustomValidityRangeOverflow — verify custom message for range overflow
[ ] Set setCustomValidityRangeUnderflow — verify custom message for range underflow
[ ] Call `validate(true)` — verify forced validation fires immediately
[ ] Call `reset()` — verify the datepicker returns to its initial state
[ ] Call `clear()` — verify the date value(s) are emptied

## Events

[ ] Open/close the calendar — verify `auroDatePicker-toggled` event fires
[ ] Navigate months — verify `auroDatePicker-monthChanged` event fires
[ ] Select a date — verify `auroDatePicker-valueSet` event fires
[ ] Trigger validation — verify `auroFormElement-validated` event fires

## Accessibility

[ ] Verify the trigger input has appropriate ARIA attributes
[ ] Verify screen reader announces the label
[ ] Verify required state is announced
[ ] Verify error messages are announced
[ ] Verify disabled state is announced
[ ] Verify the clear button has an accessible label (ariaLabel.input.clear slot)
[ ] Verify the fullscreen close button has an accessible label (ariaLabel.bib.close slot)
[ ] Verify focus management when opening/closing the calendar
[ ] Verify focus trapping in fullscreen dialog mode
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible

## Slots

[ ] Set custom content in the `fromLabel` slot — verify it renders as the first input label
[ ] Set custom content in the `toLabel` slot (range mode) — verify it renders as the second input label
[ ] Set custom content in the `label` slot — verify it renders as the datepicker label (snowflake layout)
[ ] Set custom content in the `helpText` slot — verify it renders below the datepicker
[ ] Set custom content in the `bib.fullscreen.headline` slot — verify it renders in the fullscreen dialog header
[ ] Set custom content in the `bib.fullscreen.fromLabel` slot — verify it renders above the first input in fullscreen
[ ] Set custom content in the `bib.fullscreen.toLabel` slot — verify it renders above the second input in fullscreen
[ ] Set custom content in the `ariaLabel.bib.close` slot — verify screen reader announces it for the close button
[ ] Set custom content in the `ariaLabel.input.clear` slot — verify screen reader announces it for the clear button
[ ] Set custom content in a `date_MM_DD_YYYY` slot — verify it renders inside the calendar cell for that date
[ ] Set custom content in a `popover_MM_DD_YYYY` slot — verify it renders in the cell popover for that date

## Public Methods

[ ] Call `focus()` — verify the datepicker input receives focus
[ ] Call `focus('end')` — verify the end date input receives focus (range mode)
[ ] Call `showBib()` — verify the calendar bib opens
[ ] Call `hideBib()` — verify the calendar bib closes
[ ] Call `reset()` — verify the datepicker returns to its initial state
[ ] Call `resetInputs()` — verify input values reset without resetting validation state
[ ] Call `clear()` — verify the date value(s) are emptied
[ ] Call `validate()` — verify validation runs and validity state updates
[ ] Call `validate(true)` — verify forced validation runs
