# Manual Testing — auro-radio / auro-radio-group

## auro-radio

### Mouse Interactions

[ ] Click an unselected radio button — verify it becomes selected (filled indicator appears)
[ ] Click an already-selected radio button — verify it remains selected (radio buttons don't deselect on click)
[ ] Click a disabled radio button — verify no state change occurs
[ ] Click the radio label text — verify the radio button toggles selection

### Keyboard Interactions

[ ] Tab into a radio group — verify focus lands on the currently selected radio, or the first radio if none selected
[ ] Arrow Down / Arrow Right on a focused radio — verify focus and selection move to the next radio in the group
[ ] Arrow Up / Arrow Left on a focused radio — verify focus and selection move to the previous radio in the group
[ ] Arrow keys wrap at boundaries — verify pressing Down on the last radio moves to the first, and Up on the first moves to the last
[ ] Space on a focused radio — verify it selects the focused radio
[ ] Tab out of the radio group — verify focus moves to the next focusable element outside the group (not the next radio)

### Touch / Tap Interactions

[ ] Tap an unselected radio button — verify it becomes selected
[ ] Tap an already-selected radio button — verify it remains selected
[ ] Tap a disabled radio button — verify no state change
[ ] Tap the label text — verify the radio button becomes selected

### Property States

#### `checked`
[ ] Set checked on a radio — verify it renders as selected on load
[ ] Verify only one radio in a group can be checked at a time

#### `disabled`
[ ] Set disabled on a radio — verify it is visually grayed out and non-interactive
[ ] Remove disabled — verify it becomes interactive

#### `error`
[ ] Set error to true — verify the radio displays in an error visual state

#### `value`
[ ] Set a unique value on each radio — verify the group's value reflects the selected radio's value

#### `label`
[ ] Set label attribute — verify it renders as the radio button's label text

---

## auro-radio-group

### Mouse Interactions

[ ] Click different radios in a group — verify only one is selected at a time (previous selection deselects)

### Keyboard Interactions

[ ] Tab into a radio group — verify focus lands on the selected radio (or first if none selected)
[ ] Arrow keys within the group — verify selection moves with focus (roving tabindex pattern)
[ ] Tab out of the group — verify only one Tab press exits the entire group

### Touch / Tap Interactions

[ ] Tap different radios — verify only one is selected at a time

### Property States

#### `disabled`
[ ] Set disabled on the group — verify all child radio buttons are disabled
[ ] Remove disabled from the group — verify all child radios become interactive

#### `required`
[ ] Set required with no radio selected, then blur — verify `valueMissing` validation error appears
[ ] Select a radio — verify the error clears

#### `horizontal`
[ ] Set horizontal — verify radio buttons lay out in a row instead of a column

#### `error`
[ ] Set error with a message string — verify the group displays a persistent error state with the custom message

#### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

#### `value`
[ ] Set value programmatically on the group — verify the matching radio becomes selected
[ ] Read value after user selects a radio — verify it matches the selected radio's value

### Validation

[ ] Leave a required group without a selection and blur — verify `valueMissing` error appears
[ ] Select a radio in a required group — verify the error clears
[ ] Set setCustomValidity with a message — verify custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
[ ] Call `validate(true)` — verify validation fires immediately
[ ] Call `reset()` — verify the group returns to its initial state (selection and validation cleared)

### Accessibility

[ ] Verify the group has a fieldset/legend structure announced by screen readers
[ ] Verify the legend slot content is read as the group label
[ ] Verify required state is announced for the group
[ ] Verify error messages are announced when they appear
[ ] Verify each radio is announced with its label and selected/unselected state
[ ] Verify disabled radios are announced as disabled
[ ] Verify the optional label text is announced when the group is not required
[ ] Verify arrow key navigation is announced (screen reader indicates new selection)
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible on each radio button

### Slots

[ ] Set custom content in the `legend` slot — verify it renders as the group label
[ ] Set custom content in the `helpText` slot — verify it renders below the group
[ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text

### Public Methods

[ ] Call `reset()` — verify the group returns to its initial state (selected radio cleared, validation cleared)
[ ] Call `validate()` — verify validation runs and the validity state updates
[ ] Call `validate(true)` — verify forced validation runs even if the group has not been interacted with
