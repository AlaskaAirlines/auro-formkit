# Manual Testing — auro-combobox

## Mouse Interactions

[ ] Click the trigger input — verify the input receives focus. Typing a character opens the bib when at least one option matches; if no options match, the bib opens showing the `nomatch` option (when provided) or remains closed if no `nomatch` option is slotted.
[ ] Type text in the input — verify options filter in real time based on input
[ ] Click a menu option — verify it becomes selected, the bib closes, and the trigger displays the selected value
[ ] Click the clear button (X) — verify the input value clears, options reset, and the clear button disappears
[ ] Click outside the bib when open — verify the bib closes
[ ] Click the trigger on a disabled combobox — verify nothing happens
[ ] Click the trigger when no options match the filter — verify the bib does not open (or shows empty state)

### Suggestion Mode (default)
[ ] Type a value that doesn't match any option — verify the typed value is kept as the combobox value
[ ] Select an option and then type additional text — verify the value updates

### Filter Mode (`persistInput`)
[ ] Type a value — verify options filter

## Keyboard Interactions — Desktop (Popup Closed)

[ ] Tab to the combobox trigger — verify the input receives visible focus
[ ] Arrow Down — verify the bib opens (visual focus does not yet move; a second Arrow Down moves visual focus to the first option)
[ ] Arrow Up — verify the bib opens (visual focus does not move to any option until a subsequent Arrow Up/Down or End is pressed)
[ ] Enter — verify the bib opens if the input has a matching value
[ ] Space — verify a space character is entered into the input; like any typed character it opens the bib (showing filtered options or the `nomatch` option)
[ ] Type characters — verify the bib opens (if matching options exist) and options filter

## Keyboard Interactions — Desktop (Popup Open)

[ ] Arrow Down — verify visual focus moves to the next option
[ ] Arrow Up — verify visual focus moves to the previous option
[ ] Arrow Down at the last option — verify it wraps to the first option
[ ] Arrow Up at the first option — verify it wraps to the last option
[ ] Home — verify visual focus moves to the first option
[ ] End — verify visual focus moves to the last option
[ ] Enter on a highlighted option — verify it selects the option, closes the bib, and returns focus to the trigger
[ ] Escape — verify the bib closes without selecting, focus returns to the trigger input
[ ] Space - verify it does NOT select the highlighted option but does type a space character into the input (note: this may require custom handling to prevent default spacebar behavior from selecting an option when the bib is open)
[ ] Tab (option highlighted) — verify the highlighted option is selected, the bib closes, and focus moves to the clear button
[ ] Tab (no matching option) - verify the focus moves to the next element without selecting an option and the bib closes
[ ] Shift+Tab (options highlighted) — verify the highlighted option is selected, the bib closes, and focus moves to the previous element on the page.
[ ] Shift+Tab (no matching option) - verify the focus moves to the previous element without selecting an option and the bib closes
[ ] Continue typing while options are highlighted — verify the filter updates and option highlight adjusts

## Keyboard Interactions — Fullscreen (Mobile Dialog)

[ ] Verify the search input inside the dialog receives initial focus when the dialog opens
[ ] Type in the fullscreen input — verify options filter
[ ] Arrow Down — verify visual focus moves to the next option
[ ] Arrow Up — verify visual focus moves to the previous option
[ ] Enter on a highlighted option — verify it selects, closes the dialog, and returns focus to the trigger
[ ] Escape — verify the dialog closes without selecting and focus returns to the trigger
[ ] Tab (focus on input, clear button visible) — verify focus moves to the clear button
[ ] Tab (focus on clear button, option highlighted) — verify the dialog does NOT auto-select the highlighted option; the browser handles Tab natively within the clear button's shadow DOM (no selection, no dialog close from this handler)
[ ] Shift+Tab (options highlighted) — verify the highlighted option is selected, the dialog closes, and focus moves to the previous element on the page (note: Shift+Tab behavior in fullscreen dialog may be inconsistent across browsers and may require custom handling for proper focus management)
[ ] Shift+Tab (no matching option) - verify the focus moves to the previous element without selecting an option and the dialog closes

## Touch / Tap Interactions

[ ] Tap the trigger — verify the combobox opens (popover on desktop, fullscreen on mobile)
[ ] Tap a menu option — verify it selects and the bib closes
[ ] Tap the clear button — verify the value clears
[ ] Tap outside the bib — verify the bib closes

## Fullscreen (Mobile) Mode

[ ] Open the combobox at mobile breakpoint — verify the fullscreen dialog opens
[ ] Verify the search input inside the dialog receives initial focus (virtual keyboard should open)
[ ] Type in the fullscreen input — verify options filter
[ ] Verify the fullscreen headline slot content is displayed
[ ] Tap an option — verify it selects and the dialog closes
[ ] Tap the clear button inside the dialog — verify the input clears
[ ] Tap the close button — verify the dialog closes without selecting
[ ] Verify focus returns to the trigger when the dialog closes

## Property States

### `value`
[ ] Set value programmatically — verify the matching option becomes selected and the trigger displays it
[ ] Read value after user selects an option — verify it matches the selected option's value

### `typedValue` / `inputValue`
[ ] Set `typedValue` at mount time — verify the value pre-populates the input on first render (note: `typedValue` is a mount-time initial-value only; it is not updated as the user types)
[ ] Type text into the input — verify `inputValue` (getter) reflects what was typed and an `inputValue` event fires with the new value in `event.detail.value`

### `placeholder`
[ ] Set placeholder — verify it displays in the input when empty
[ ] Type a value — verify the placeholder disappears

### `behavior`
[ ] Set behavior="filter" — verify the combobox only accepts values from the menu options
[ ] Set behavior="suggestion" (default) — verify the combobox accepts typed values that don't match options

### `checkmark`
[ ] Set checkmark — verify selected options show checkmark indicators

### `disabled`
[ ] Set disabled — verify the input and trigger are non-interactive
[ ] Remove disabled — verify the combobox becomes interactive

### `required`
[ ] Set required with no selection and blur — verify `valueMissing` validation error appears
[ ] Select an option — verify the error clears

### `noFilter`
[ ] Set noFilter — verify typing does not filter the options list

### `persistInput`
[ ] Set persistInput — verify selecting an option does not replace the typed input text

### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

### `error`
[ ] Set error with a message — verify persistent error state with the custom message

### `format`
[ ] Set an input format mask — verify the mask applies as the user types

### `fullscreenBreakpoint`
[ ] Set fullscreenBreakpoint="sm" — verify fullscreen at the small breakpoint
[ ] Set fullscreenBreakpoint="disabled" — verify the combobox never enters fullscreen

### `layout` / `shape` / `size`
[ ] Set layout="emphasized" — verify the emphasized visual style
[ ] Set layout="snowflake" — verify the snowflake visual style
[ ] Verify shape and size properties change the visual rendering

### `triggerIcon`
[ ] Set triggerIcon — verify an icon renders inside the input trigger

### `dvInputOnly`
[ ] Set dvInputOnly — verify the displayValue slot only masks the input (not the label)

## Validation

[ ] Leave a required combobox empty and blur — verify `valueMissing` error appears
[ ] In filter mode, type a value that doesn't match and blur — verify `valueMissing` (filter) error appears
[ ] Select an option in a required combobox — verify the error clears
[ ] Set setCustomValidity with a message — verify the custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
[ ] Set setCustomValidityValueMissingFilter — verify custom message for filter-mode value missing
[ ] Call `validate(true)` — verify forced validation fires immediately
[ ] Call `reset()` — verify the combobox returns to its initial state
[ ] Call `clear()` — verify the value and input are emptied

## Events

[ ] Select an option — verify `input` event fires with the new value
[ ] Type into the input — verify `inputValue` event fires
[ ] Trigger validation — verify `auroFormElement-validated` event fires

## Accessibility

[ ] Verify the trigger has role="combobox" and appropriate ARIA attributes
[ ] Verify aria-expanded reflects bib open/closed state
[ ] Verify aria-activedescendant tracks the currently highlighted option
[ ] Verify screen reader announces the selected value
[ ] Verify screen reader announces required state
[ ] Verify error messages are announced
[ ] Verify disabled state is announced
[ ] Verify the clear button has an accessible label (ariaLabel.input.clear slot)
[ ] Verify the fullscreen close button has an accessible label (ariaLabel.bib.close slot)
[ ] Verify focus management when opening/closing the bib/dialog
[ ] Verify focus trapping in fullscreen dialog mode
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible

## Slots

[ ] Set custom content in the `label` slot — verify it renders as the combobox label
[ ] Set custom content in the `helpText` slot — verify it renders below the combobox
[ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text
[ ] Set custom content in the default slot (auro-menu with options) — verify options render in the bib
[ ] Set custom content in the `bib.fullscreen.headline` slot — verify it renders in the fullscreen dialog header
[ ] Set custom content in the `ariaLabel.bib.close` slot — verify screen reader announces it for the fullscreen close button
[ ] Set custom content in the `ariaLabel.input.clear` slot — verify screen reader announces it for the clear button
[ ] Set custom content in the `displayValue` slot — verify it renders as the custom selected value display

## Public Methods

[ ] Call `focus()` — verify the combobox input receives focus
[ ] Call `showBib()` — verify the bib opens (if options available)
[ ] Call `hideBib()` — verify the bib closes
[ ] Call `reset()` — verify the combobox returns to its initial state
[ ] Call `clear()` — verify the value and input are emptied
[ ] Call `validate()` — verify validation runs and validity state updates
[ ] Call `validate(true)` — verify forced validation runs
[ ] Call `setMenuValue(value)` — verify the matching option becomes selected
[ ] Call `updateActiveOption(index)` — verify the option at the given index becomes active
