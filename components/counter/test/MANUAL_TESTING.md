# Manual Testing — auro-counter / auro-counter-group

## auro-counter

### Mouse Interactions

[ ] Click the increment (+) button — verify the value increases by 1
[ ] Click the decrement (−) button — verify the value decreases by 1
[ ] Click increment when value equals max — verify the value does not exceed max and the increment button becomes disabled
[ ] Click decrement when value equals min — verify the value does not go below min and the decrement button becomes disabled
[ ] Click increment or decrement on a disabled counter — verify no change occurs
[ ] Rapidly click increment — verify each click registers and the value increments correctly

### Keyboard Interactions

[ ] Tab to the counter — verify focus lands on the counter component
[ ] Tab through the counter — verify focus visits the decrement button, value display, and increment button
[ ] Arrow Up on a focused counter — verify the value increments by 1
[ ] Arrow Down on a focused counter — verify the value decrements by 1
[ ] Enter/Space on the focused increment button — verify the value increments
[ ] Enter/Space on the focused decrement button — verify the value decrements
[ ] Tab away from the counter — verify focus moves to the next element

### Touch / Tap Interactions

[ ] Tap the increment button — verify the value increases by 1
[ ] Tap the decrement button — verify the value decreases by 1
[ ] Tap increment at max — verify no change
[ ] Tap decrement at min — verify no change

### Property States

#### `value`
[ ] Set value programmatically — verify the displayed value updates
[ ] Read value after clicking increment — verify it matches the displayed value

#### `min` / `max`
[ ] Set min=0 and max=5 — verify the counter cannot go below 0 or above 5
[ ] Set min=2 with initial value=0 — verify behavior when value is below min
[ ] Set max=3 with initial value=5 — verify behavior when value exceeds max

#### `disabled`
[ ] Set disabled — verify both buttons are visually disabled and non-interactive
[ ] Remove disabled — verify both buttons become interactive

#### `error`
[ ] Set error with a message — verify the counter displays an error state with the custom message

### Validation

[ ] Call `validate()` — verify validation runs
[ ] Call `validate(true)` — verify forced validation

### Accessibility

[ ] Verify the counter label (default slot content) is announced by screen readers
[ ] Verify increment and decrement buttons have accessible labels (ariaLabel.plus / ariaLabel.minus slots)
[ ] Verify the current value is announced on change
[ ] Verify disabled state is announced
[ ] Verify the help text is announced (helpText slot)
[ ] Verify the description is announced (description slot)
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible on both buttons

### Slots

[ ] Set custom content in the default slot — verify it renders as the counter label
[ ] Set custom content in the `ariaLabel.minus` slot — verify screen reader announces it for the decrement button
[ ] Set custom content in the `ariaLabel.plus` slot — verify screen reader announces it for the increment button
[ ] Set custom content in the `helpText` slot — verify it renders below the counter
[ ] Set custom content in the `description` slot — verify it renders as descriptive text

### Public Methods

[ ] Call `increment()` — verify the value increases by 1
[ ] Call `increment(3)` — verify the value increases by 3
[ ] Call `decrement()` — verify the value decreases by 1
[ ] Call `decrement(2)` — verify the value decreases by 2
[ ] Call `validate()` — verify validation runs and validity state updates

---

## auro-counter-group

### Mouse Interactions

#### Standalone (non-dropdown) Mode
[ ] Click increment/decrement on individual counters in the group — verify each counter operates independently
[ ] Verify the group total updates when any individual counter changes

#### Dropdown Mode (`isDropdown`)
[ ] Click the dropdown trigger — verify the counter group bib opens
[ ] Click increment/decrement on counters inside the bib — verify values change
[ ] Click outside the bib — verify the bib closes
[ ] Verify the trigger displays the current total / summary

### Keyboard Interactions

#### Standalone Mode
[ ] Tab through counters in the group — verify each counter receives focus in order
[ ] Arrow Up/Down on individual counters — verify increment/decrement behavior

#### Dropdown Mode
[ ] Tab to the dropdown trigger — verify focus
[ ] Enter/Space on the trigger — verify the bib opens
[ ] Tab through controls inside the bib — verify focus moves through counter controls
[ ] Escape — verify the bib closes
[ ] Tab past the last focusable element in the bib — verify the bib closes (fullscreen mode)

### Touch / Tap Interactions

[ ] Tap the dropdown trigger — verify the bib opens
[ ] Tap counter buttons inside the bib — verify values change
[ ] Tap outside the bib — verify the bib closes

### Fullscreen (Mobile) Mode

[ ] Open the counter-group dropdown at mobile breakpoint — verify the fullscreen dialog opens
[ ] Verify the close button receives initial focus when the dialog opens
[ ] Tap increment/decrement buttons inside the dialog — verify they work
[ ] Press Escape — verify the dialog closes
[ ] Press Tab — verify the dialog closes
[ ] Verify focus returns to the trigger when the dialog closes

### Property States

#### `min` / `max` (group-level)
[ ] Set min on the group — verify the group total cannot go below the group min
[ ] Set max on the group — verify the group total cannot exceed the group max
[ ] Verify individual counters are constrained when the group total reaches its limit

#### `total`
[ ] Verify total reflects the sum of all child counter values
[ ] Verify total updates in real time as counters change

#### `value`
[ ] Read value — verify it returns an object with individual counter values

#### `error`
[ ] Set error with a message — verify the group displays an error state

#### `isDropdown`
[ ] Set isDropdown — verify the group renders as a dropdown with a trigger
[ ] Remove isDropdown — verify counters render inline

#### `fullscreenBreakpoint`
[ ] Set fullscreenBreakpoint="sm" — verify the dropdown switches to fullscreen at the small breakpoint
[ ] Set fullscreenBreakpoint="disabled" — verify the dropdown never enters fullscreen

### Validation

[ ] Call `validate()` — verify group-level validation runs
[ ] Call `validate(true)` — verify forced validation

### Accessibility

[ ] Verify the group is announced as a coherent unit by screen readers
[ ] Verify the fullscreen dialog headline is announced (bib.fullscreen.headline slot)
[ ] Verify the close button has an accessible label (ariaLabel.bib.close slot)
[ ] Verify the dropdown label is announced (label slot)
[ ] Verify focus trapping works in fullscreen dialog mode
[ ] Verify color contrast meets WCAG 2.1 AA

### Slots

[ ] Set custom content in the default slot — verify child counters render
[ ] Set custom content in the `ariaLabel.bib.close` slot — verify screen reader announces it for the close button
[ ] Set custom content in the `bib.fullscreen.headline` slot — verify it renders as the fullscreen dialog headline
[ ] Set custom content in the `bib.fullscreen.footer` slot — verify it renders at the bottom of the fullscreen dialog
[ ] Set custom content in the `label` slot — verify it renders as the dropdown label
[ ] Set custom content in the `valueText` slot — verify it renders as the dropdown value display
[ ] Set custom content in the `helpText` slot — verify it renders below the dropdown trigger

### Public Methods

[ ] Call `showBib()` — verify the dropdown bib opens
[ ] Call `hideBib()` — verify the dropdown bib closes
[ ] Call `validate()` — verify group-level validation runs and validity state updates
