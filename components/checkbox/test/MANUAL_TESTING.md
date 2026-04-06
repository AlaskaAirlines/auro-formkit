# Manual Testing — auro-checkbox / auro-checkbox-group

## auro-checkbox

### Mouse Interactions

[ ] Click an unchecked checkbox — verify it becomes checked (checkmark appears)
[ ] Click a checked checkbox — verify it becomes unchecked (checkmark removed)
[ ] Click a disabled checkbox — verify no state change occurs
[ ] Click the checkbox label text — verify the checkbox toggles (label click acts as checkbox click)

### Keyboard Interactions

[ ] Tab to the checkbox — verify it receives visible focus
[ ] Press Space on a focused checkbox — verify it toggles checked/unchecked
[ ] Press Enter on a focused checkbox — verify it toggles checked/unchecked
[ ] Tab away from the checkbox — verify focus moves to the next focusable element

### Touch / Tap Interactions

[ ] Tap an unchecked checkbox — verify it becomes checked
[ ] Tap a checked checkbox — verify it becomes unchecked
[ ] Tap a disabled checkbox — verify no state change
[ ] Tap the label text — verify the checkbox toggles

### Property States

#### `checked`
[ ] Set checked attribute — verify the checkbox renders as checked on load
[ ] Remove checked attribute programmatically — verify the checkbox renders as unchecked

#### `disabled`
[ ] Set disabled — verify the checkbox is visually grayed out and non-interactive
[ ] Remove disabled — verify the checkbox becomes interactive

#### `error`
[ ] Set error to true — verify the checkbox displays in an error visual state

#### `value`
[ ] Set a unique value — verify the value is included in the group's submitted data when checked

### Slots

[ ] Set custom label content in the default slot — verify it renders as the checkbox label

---

## auro-checkbox-group

### Mouse Interactions

[ ] Click different checkboxes in a group — verify multiple can be checked simultaneously
[ ] Click a checked checkbox in a group — verify only that checkbox unchecks (others remain)

### Keyboard Interactions

[ ] Tab into a checkbox group — verify focus lands on the first checkbox
[ ] Tab through checkboxes in the group — verify each checkbox receives focus in order
[ ] Space/Enter on each checkbox — verify each toggles independently
[ ] Tab out of the group — verify focus moves to the next element outside the group

### Touch / Tap Interactions

[ ] Tap multiple checkboxes — verify each toggles independently

### Property States

#### `disabled`
[ ] Set disabled on the group — verify all child checkboxes are disabled
[ ] Remove disabled from the group — verify all child checkboxes become interactive

#### `required`
[ ] Set required with no checkboxes checked, then blur — verify `valueMissing` validation error appears
[ ] Check at least one checkbox — verify the error clears

#### `horizontal`
[ ] Set horizontal — verify checkboxes lay out in a row instead of a column

#### `error`
[ ] Set error with a message string — verify the group displays a persistent error state with the custom message

#### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

### Validation

[ ] Leave a required group empty and blur — verify `valueMissing` error appears
[ ] Check a checkbox in a required group — verify the error clears
[ ] Set setCustomValidity with a message — verify custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
[ ] Call `validate(true)` — verify validation fires immediately
[ ] Call `reset()` — verify the group returns to its initial state (all checkboxes reset, validation cleared)

### Accessibility

[ ] Verify the group has a fieldset/legend structure announced by screen readers
[ ] Verify the legend slot content is read as the group label
[ ] Verify required state is announced for the group
[ ] Verify error messages are announced when they appear
[ ] Verify each checkbox is announced with its label and checked/unchecked state
[ ] Verify disabled checkboxes are announced as disabled
[ ] Verify the optional label text is announced when the group is not required
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible on each checkbox

### Slots

[ ] Set custom content in the `legend` slot — verify it renders as the group label
[ ] Set custom content in the `helpText` slot — verify it renders below the group
[ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text
[ ] Place multiple auro-checkbox elements in the default slot — verify they all render as group members

### Public Methods

[ ] Call `reset()` — verify all checkboxes return to their initial checked/unchecked state and validation clears
[ ] Call `validate()` — verify validation runs and the validity state updates
[ ] Call `validate(true)` — verify forced validation runs even if the group has not been interacted with
