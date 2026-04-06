# Manual Testing — auro-form

## Mouse Interactions

[ ] Click on individual form fields (input, select, checkbox, radio, etc.) — verify each receives focus and functions independently
[ ] Click the submit button — verify the form validates all fields and submits if all are valid
[ ] Click the submit button with invalid fields — verify errors display on invalid fields and the form does not submit
[ ] Click the reset button — verify all fields return to their initial state

## Keyboard Interactions

[ ] Tab through all form fields — verify focus moves in logical order through all interactive elements
[ ] Shift+Tab — verify focus moves backward through form fields
[ ] Enter in a text input — verify the form submits (if applicable)
[ ] Enter/Space on the submit button — verify the form submits
[ ] Enter/Space on the reset button — verify the form resets
[ ] Fill out an entire form using only keyboard — verify all fields are accessible and interactive

## Touch / Tap Interactions

[ ] Tap on form fields — verify each receives focus and the virtual keyboard opens where appropriate
[ ] Tap the submit button — verify form submission behavior
[ ] Tap the reset button — verify form reset behavior

## Form Submission Workflow

[ ] Fill all required fields with valid data and submit — verify `submit` event fires with `detail.value` containing all field values as key-value pairs
[ ] Leave a required field empty and submit — verify the invalid field shows its error and the `submit` event does NOT fire
[ ] Fill multiple fields with mixed valid/invalid data and submit — verify all invalid fields show errors simultaneously
[ ] Verify the form `value` getter returns a key-value object keyed by each element's `name` attribute

## Form Reset Workflow

[ ] Fill in several fields, then call `reset()` — verify all fields return to their initial values
[ ] Verify the `reset` event fires with `detail.previousValue` containing the values before reset
[ ] Verify validation errors are cleared after reset
[ ] Verify `isInitialState` returns true after reset

## Form Value Collection

[ ] Add fields with `name` attributes — verify `value` getter returns keys matching the `name` attributes
[ ] Add a field without a `name` attribute — verify it is not included in the form value
[ ] Use an auro-input — verify its value is collected correctly
[ ] Use an auro-select — verify the selected option value is collected
[ ] Use an auro-checkbox-group — verify the checked values are collected
[ ] Use an auro-radio-group — verify the selected radio value is collected
[ ] Use an auro-combobox — verify the selected value is collected
[ ] Use an auro-datepicker — verify the selected date(s) are collected
[ ] Use an auro-datepicker with range — verify both values (start/end) are collected
[ ] Use an auro-counter — verify the counter value is collected

## Form Validity

[ ] Check `validity` when no fields have been interacted with — verify it returns `null`
[ ] Check `validity` after interacting with fields and all are valid — verify it returns `'valid'`
[ ] Check `validity` when any required field is invalid — verify it returns `'invalid'`
[ ] Check `isInitialState` before any interaction — verify it returns `true`
[ ] Check `isInitialState` after modifying a field — verify it returns `false`

## Property States

### `value`
[ ] Read value after populating fields — verify it returns a key-value object of all named field values
[ ] Verify nested component values (select, combobox, datepicker range) are properly structured

### `validity`
[ ] Read validity in initial state — verify `null`
[ ] Read validity after valid interaction — verify `'valid'`
[ ] Read validity with invalid fields — verify `'invalid'`

### `isInitialState`
[ ] Read in initial state — verify `true`
[ ] Read after changing a field — verify `false`
[ ] Read after reset — verify `true`

## Events

[ ] Change a field value — verify `change` event fires on the form
[ ] Type in a field — verify `input` event fires on the form
[ ] Submit the form — verify `submit` event fires with `detail.value`
[ ] Reset the form — verify `reset` event fires with `detail.previousValue`

## Accessibility

[ ] Verify form fields are navigable via keyboard
[ ] Verify screen reader announces field labels, required state, and errors
[ ] Verify submit and reset buttons are announced correctly
[ ] Verify focus order is logical

## Slots

[ ] Place multiple auro form elements in the default slot — verify they are all collected and managed by the form

## Public Methods

[ ] Call `submit()` — verify it validates all fields, fires `submit` event if all valid, or surfaces errors if any invalid
[ ] Call `reset()` — verify all fields return to initial state and `reset` event fires
