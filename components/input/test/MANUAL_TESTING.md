# Manual Testing — auro-input

## Mouse Interactions

[ ] Click on the input field — verify it receives focus and the label animates to active position
[ ] Click on the input field and type text — verify characters appear as typed
[ ] Click the clear button (X) when a value is present — verify the value is cleared and the clear button disappears
[ ] Click outside the input after entering a value — verify the input loses focus and validation fires (if applicable)
[ ] With type="password" and a value present, click the password visibility toggle — verify the value toggles between masked and visible; verify the toggle is absent when the field is empty
[ ] Click on a read-only input — verify focus is received but the value cannot be changed
[ ] Click on a disabled input — verify no focus or interaction occurs

## Keyboard Interactions

[ ] Tab into the input — verify it receives visible focus
[ ] Tab out of the input — verify focus moves to the next focusable element and blur validation fires
[ ] Shift+Tab — verify focus moves to the previous focusable element
[ ] Type characters — verify they appear in the field and the `input` event fires
[ ] Backspace/Delete — verify characters are removed
[ ] Enter in a form context — verify the form submits (if applicable)
[ ] Ctrl+A / Cmd+A — verify all text is selected
[ ] Ctrl+C / Cmd+C / Ctrl+V / Cmd+V — verify copy and paste work correctly

## Touch / Tap Interactions

[ ] Tap on the input — verify focus is received and the virtual keyboard opens
[ ] Tap the clear button — verify the value is cleared
[ ] With a value present, tap the password toggle — verify password visibility changes; verify the toggle is absent when the field is empty
[ ] Tap outside the input — verify focus is lost and validation fires

## Property States

### `type`
[ ] Set type="text" — verify standard text input behavior
[ ] Set type="email" — verify email validation on blur (e.g., missing "@")
[ ] Set type="password" — verify input is masked; the show/hide toggle appears only once a value has been entered
[ ] Set type="tel" — verify telephone input behavior
[ ] Set type="number" — verify numeric inputmode is applied (browser-native numeric keyboard on mobile)
[ ] Set type="credit-card" — verify credit card formatting mask is applied and the card icon renders
[ ] Set type="date" — verify a locale-derived mask (e.g., MM/DD/YYYY for en-US) is applied and no auto-generated help text appears below the input when no `helpText` slot content is provided

### `format`
[ ] Set format for phone number — verify input mask applies correctly as the user types
[ ] Set format for credit card — verify groups of 4 digits are separated
[ ] Set format for date — verify MM/DD/YYYY mask applies

### `locale`

[ ] Set locale to a non-default value — verify the date mask updates to match the locale
[ ] Set an explicit format alongside locale — verify format overrides the locale-derived mask
[ ] Omit locale but set `data-locale` on an ancestor — verify the input inherits the ancestor locale
[ ] Set an invalid locale — verify it falls back to en-US without errors
[ ] Change locale programmatically after first render — verify the mask updates

### `value`
[ ] Set value programmatically — verify the displayed value updates
[ ] Read value after user input — verify the returned value matches what was typed
[ ] Set value to empty string — verify the input clears and the clear button disappears

### `placeholder`
[ ] Set placeholder text — verify it displays when the input is empty
[ ] Type a value — verify placeholder disappears
[ ] Clear the value — verify placeholder reappears
[ ] With type="date" and no explicit placeholder set — verify the format string is used as the placeholder automatically (e.g., `MM/DD/YYYY` for en-US)

### `disabled`
[ ] Set disabled attribute — verify the input is visually grayed out and non-interactive
[ ] Remove disabled attribute — verify the input becomes interactive again

### `required`
[ ] Set required on an empty input and blur — verify "value missing" validation error appears
[ ] Fill in a value and blur — verify the error clears

### `readonly`
[ ] Set readonly — verify the value is visible but cannot be edited
[ ] Verify the clear button does not appear when readonly is set

### `activeLabel`
[ ] Set activeLabel — verify the label remains in the active (raised) position even when the input is empty

### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

### `validateOnInput`
[ ] Set validateOnInput — verify validation fires on every keystroke rather than only on blur
[ ] Clear validateOnInput — verify validation reverts to blur-only behavior

### `appearance`
[ ] Set appearance="default" (or omit) — verify the standard styling renders
[ ] Set appearance="inverse" — verify the inverse/dark-background styling renders and icons update accordingly

### `error`
[ ] Set error attribute with a message — verify the input displays the error state and the custom message appears in help text
[ ] Remove error attribute — verify error state clears

### `maxLength` / `minLength`
[ ] Set maxLength — verify typing beyond the limit is prevented or triggers validation
[ ] Set minLength — verify blur with fewer characters triggers "too short" validation

### `min` / `max` (type="number" and type="date" with ISO values)
[ ] Set min on type="number" — verify entering a value below the minimum triggers "range underflow" validation
[ ] Set max on type="number" — verify entering a value above the maximum triggers "range overflow" validation
[ ] Set min/max on type="date" using ISO format (YYYY-MM-DD) — verify out-of-range dates trigger the appropriate validation error

### `pattern`
[ ] Set a regex pattern — verify values not matching the pattern trigger validation on blur

## Validation

[ ] Leave a required input empty and blur — verify `valueMissing` error displays
[ ] Enter an invalid email and blur — verify `typeMismatch` error displays
[ ] Enter text shorter than minLength and blur — verify `tooShort` error displays
[ ] Enter text longer than maxLength — verify `tooLong` behavior
[ ] Enter a number below min and blur — verify `rangeUnderflow` error displays
[ ] Enter a number above max and blur — verify `rangeOverflow` error displays
[ ] Enter a value that doesn't match pattern and blur — verify `patternMismatch` error displays
[ ] Set setCustomValidity with a message — verify the custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default for value-missing state
[ ] Call `validate(true)` programmatically — verify validation fires immediately
[ ] Call `reset()` — verify the input returns to its initial state including clearing validation errors

### Date (`type="date"`)

[ ] Enter a valid full date — verify no error appears
[ ] Enter an incomplete or out-of-range date — verify a validation error appears
[ ] Set a partial format (e.g. `format="mm/yyyy"`) and enter a valid value — verify no error appears
[ ] Enter an incomplete or out-of-range value for the partial format — verify a validation error appears

## Accessibility

[ ] Verify the label is associated with the input (screen reader announces the label on focus)
[ ] Verify required inputs are announced as "required" by screen readers
[ ] Verify error messages are announced when they appear (via aria-live or role="alert")
[ ] Verify disabled state is announced by screen readers
[ ] Verify the clear button has an accessible label (ariaLabel.clear slot)
[ ] Verify the password toggle buttons have accessible labels (ariaLabel.password.show / ariaLabel.password.hide)
[ ] Verify the optional label text is announced when the input is not required
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicator is clearly visible

## Slots

[ ] Set custom content in the `label` slot — verify it renders as the input label
[ ] Set custom content in the `helpText` slot — verify it renders below the input
[ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text
[ ] Set custom content in the `displayValue` slot — verify it renders in place of the value when unfocused
[ ] Set custom content in the `ariaLabel.clear` slot — verify screen reader announces the custom label on the clear button
[ ] Set custom content in the `ariaLabel.password.show` slot — verify screen reader announces it
[ ] Set custom content in the `ariaLabel.password.hide` slot — verify screen reader announces it

## Public Methods

[ ] Call `focus()` — verify the input receives focus
[ ] Call `validate()` — verify validation runs and the validity state updates
[ ] Call `validate(true)` — verify forced validation runs even if the input has not been interacted with
[ ] Call `reset()` — verify the input returns to its initial state (value, validity, touched state all reset)
[ ] Call `clear()` — verify the input value is emptied but any existing error message remains visible (unlike clicking the X button, validity is not reset)

