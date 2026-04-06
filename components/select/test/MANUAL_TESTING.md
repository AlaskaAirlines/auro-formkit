# Manual Testing — auro-select

## Mouse Interactions

[ ] Click the trigger — verify the dropdown bib opens showing the menu options
[ ] Click a menu option — verify it becomes selected, the bib closes, and the trigger displays the selected value
[ ] Click the trigger again after selecting — verify the bib opens with the previously selected option marked
[ ] Click outside the bib when open — verify the bib closes without changing the selection
[ ] Click a disabled option — verify no selection change occurs
[ ] Click the trigger on a disabled select — verify the bib does not open

### Multi-Select
[ ] Click an option in multi-select mode — verify it becomes selected (checkmark appears) and the bib stays open
[ ] Click another option — verify both options are now selected
[ ] Click a selected option — verify it deselects (checkmark removed)
[ ] Click outside the bib — verify the bib closes and all selections persist

## Keyboard Interactions — Desktop (Popup Closed)

[ ] Tab to the select trigger — verify it receives visible focus
[ ] Enter on the focused trigger — verify the bib opens
[ ] Space on the focused trigger — verify the bib opens
[ ] Arrow Down — verify the bib opens and visual focus moves to the first option
[ ] Arrow Up — verify the bib opens and visual focus moves to the last option
[ ] Tab away from the trigger — verify focus moves to the next focusable element (standard browser behavior)

## Keyboard Interactions — Desktop (Popup Open)

[ ] Arrow Down — verify visual focus moves to the next option
[ ] Arrow Up — verify visual focus moves to the previous option
[ ] Arrow Down at the last option — verify it wraps to the first option
[ ] Arrow Up at the first option — verify it wraps to the last option
[ ] Enter on a highlighted option — verify it selects the option, closes the bib, and returns focus to the trigger
[ ] Space on a highlighted option — verify same behavior as Enter
[ ] Escape — verify the bib closes without selecting, focus returns to the trigger
[ ] Tab (no option highlighted) — verify the bib closes and focus moves to the next element on the page
[ ] Tab (option highlighted) — verify the highlighted option is selected, the bib closes, and focus moves to the next element
[ ] Shift+Tab — verify visual focus moves to the first non-disabled option and the bib stays open (no selection)
[ ] Home — verify visual focus moves to the first option
[ ] End — verify visual focus moves to the last option
[ ] Type-ahead (type a character) — verify visual focus moves to the next option starting with that character

## Keyboard Interactions — Fullscreen (Mobile Dialog)

[ ] Arrow Down — verify visual focus moves to the next option (same as desktop)
[ ] Arrow Up — verify visual focus moves to the previous option (same as desktop)
[ ] Enter on a highlighted option — verify it selects the option, closes the dialog, and returns focus to the trigger
[ ] Escape — verify the dialog closes without selecting and focus returns to the trigger
[ ] Tab (no option highlighted) — verify the dialog closes and focus returns to the trigger
[ ] Tab (option highlighted) — verify the highlighted option is selected, the dialog closes, and focus returns to the trigger
[ ] Shift+Tab — verify visual focus moves to the first non-disabled option and the dialog stays open (no selection)

## Touch / Tap Interactions

[ ] Tap the trigger — verify the bib opens (popover on desktop, fullscreen on mobile)
[ ] Tap a menu option — verify it selects and the bib closes
[ ] Tap outside the bib — verify the bib closes
[ ] Tap a disabled option — verify no change

## Fullscreen (Mobile) Mode

[ ] Open the select at mobile breakpoint — verify the fullscreen dialog opens
[ ] Verify the close button receives initial focus when the dialog opens
[ ] Verify the fullscreen headline slot content is displayed
[ ] Tap an option — verify it selects and the dialog closes
[ ] Tap the close button — verify the dialog closes without selecting
[ ] Verify focus returns to the trigger when the dialog closes

## Property States

### `value`
[ ] Set value programmatically — verify the matching option becomes selected and the trigger displays it
[ ] Read value after user selects an option — verify it matches the selected option's value

### `placeholder`
[ ] Set placeholder — verify it displays in the trigger when no option is selected
[ ] Select an option — verify the placeholder is replaced by the selected value

### `multiSelect`
[ ] Set multiSelect — verify multiple options can be selected
[ ] Verify selected values are displayed in the trigger (comma-separated or custom display)

### `disabled`
[ ] Set disabled — verify the trigger is non-interactive and visually disabled
[ ] Remove disabled — verify the select becomes interactive

### `required`
[ ] Set required with no selection and blur — verify `valueMissing` validation error appears
[ ] Select an option — verify the error clears

### `noCheckmark`
[ ] Set noCheckmark — verify selected options do not show checkmark indicators

### `flexMenuWidth`
[ ] Set flexMenuWidth — verify the bib width matches the content width rather than the trigger width

### `fluid`
[ ] Set fluid — verify the select takes 100% width of its container

### `forceDisplayValue`
[ ] Set forceDisplayValue with displayValue slot content — verify the custom display always renders

### `noValidate`
[ ] Set noValidate — verify no auto-validation fires on blur
[ ] Remove noValidate — verify auto-validation resumes

### `error`
[ ] Set error with a message — verify persistent error state with the custom message displayed

### `fullscreenBreakpoint`
[ ] Set fullscreenBreakpoint="sm" — verify fullscreen at the small breakpoint
[ ] Set fullscreenBreakpoint="disabled" — verify the select never enters fullscreen mode

### `layout` / `shape` / `size`
[ ] Set layout="emphasized" — verify the emphasized visual style applies
[ ] Set layout="snowflake" — verify the snowflake visual style applies
[ ] Verify shape and size properties change the visual rendering

## Validation

[ ] Leave a required select empty and blur — verify `valueMissing` error appears
[ ] Select an option in a required select — verify the error clears
[ ] Set setCustomValidity with a message — verify the custom error displays
[ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
[ ] Call `validate(true)` — verify forced validation fires immediately
[ ] Call `reset()` — verify the select returns to its initial state (selection cleared, validation cleared)

## Events

[ ] Select an option — verify `input` event fires with value and optionSelected in detail
[ ] Select an option — verify `auroSelect-valueSet` event fires
[ ] Trigger validation — verify `auroFormElement-validated` event fires

## Accessibility

[ ] Verify the trigger has role="combobox" and appropriate ARIA attributes
[ ] Verify the menu has role="listbox"
[ ] Verify options have role="option"
[ ] Verify aria-expanded reflects bib open/closed state
[ ] Verify aria-activedescendant tracks the currently highlighted option
[ ] Verify screen reader announces the selected value
[ ] Verify screen reader announces required state
[ ] Verify error messages are announced
[ ] Verify disabled state is announced
[ ] Verify focus management when opening/closing the bib/dialog
[ ] Verify focus trapping in fullscreen dialog mode
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible

## Slots

[ ] Set custom content in the `label` slot — verify it renders as the select label
[ ] Set custom content in the `helpText` slot — verify it renders below the select
[ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text
[ ] Set custom content in the default slot (auro-menu with options) — verify options render in the bib
[ ] Set custom content in the `bib.fullscreen.headline` slot — verify it renders in the fullscreen dialog header
[ ] Set custom content in the `ariaLabel.bib.close` slot — verify screen reader announces it for the close button
[ ] Set custom content in the `valueText` slot — verify it renders as the trigger value display
[ ] Set custom content in the `displayValue` slot — verify it renders as the custom selected value display

## Public Methods

[ ] Call `showBib()` — verify the bib opens
[ ] Call `hideBib()` — verify the bib closes
[ ] Call `reset()` — verify the select returns to its initial state
[ ] Call `validate()` — verify validation runs and validity state updates
[ ] Call `validate(true)` — verify forced validation runs
[ ] Call `setMenuValue(value)` — verify the matching option becomes selected
[ ] Call `updateActiveOption(index)` — verify the option at the given index becomes active
