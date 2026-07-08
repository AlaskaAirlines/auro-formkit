# Manual Testing — auro-combobox

## Mouse Interactions

[ ] Click the trigger input — verify the input receives focus. Typing a character opens the bib when at least one option matches; if no options match, the bib is hidden unless a `nomatch` option is defined (in which case it displays the nomatch option instead).
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
[ ] Enter — verify the bib opens when the list options have been populated
[ ] Space — verify a space character is entered into the input; like any typed character it opens the bib when at least one option matches (or displays the `nomatch` option when defined)
[ ] Type characters — verify the bib opens (if matching options exist) and options filter

## Keyboard Interactions — Desktop (Popup Open)

[ ] Arrow Down — verify visual focus moves to the next option
[ ] Arrow Up — verify visual focus moves to the previous option
[ ] Arrow Down at the last option — verify it wraps to the first option
[ ] Arrow Up at the first option — verify it wraps to the last option
[ ] Home — verify visual focus moves to the first option
[ ] End — verify visual focus moves to the last option
[ ] Enter on a highlighted option — verify it selects the option, closes the bib, and focus returns to the trigger input
[ ] Escape — verify the bib closes without selecting, focus returns to the trigger input
[x] Space - verify it does NOT select the highlighted option but does type a space character into the input
[ ] Tab (option highlighted) — verify the highlighted option is selected, the bib closes, and focus moves to the clear button
[ ] Tab (no matching option) - verify the focus moves to the next element without selecting an option and the bib closes
[ ] Shift+Tab (options highlighted) — verify the highlighted option is selected, the bib closes, and focus lands on the clear button. Pressing Shift+Tab a second time moves focus to the input, and a third time moves focus to the previous element on the page.

> **Intended behavior (tracked in [AB#1590650](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1590650)):** a single Shift+Tab should select the highlighted option, close the bib, and move focus directly to the previous focusable element on the page — symmetric with Tab. When that change lands, this row should be updated to verify the single-keypress exit.
[ ] Shift+Tab (no matching option) - verify the focus moves to the previous element without selecting an option and the bib closes
[ ] Continue typing while options are highlighted — verify the filter updates and option highlight adjusts

## Keyboard Interactions — Fullscreen (Mobile Dialog)

[ ] Verify the search input inside the dialog receives initial focus when the dialog opens
[ ] Type in the fullscreen input — verify options filter
[ ] Arrow Down — verify visual focus moves to the next option
[ ] Arrow Up — verify visual focus moves to the previous option
[ ] Enter on a highlighted option — verify it selects, closes the dialog, and returns focus to the trigger
[ ] Escape — verify the dialog closes without selecting. Focus is currently dropped after the dialog closes on this path (known issue, [AB#1592304](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592304) — should return focus to the trigger).
[ ] Tab (focus on input, clear button visible) — verify focus moves to the clear button
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
[ ] Tap the close button — verify the dialog closes. Focus is currently dropped after the dialog closes on this path (see intended behavior below).
[ ] Verify focus returns to the trigger when the dialog closes (currently only works for Escape, Enter on a highlighted option, and tap-outside — the close-button path drops focus)

> **Intended behavior (tracked in [AB#1592304](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592304)):** tapping the close button should return focus to the trigger input, matching Escape and Enter dismissal. This applies whether or not a selection was committed before closing. When that change lands, the two rows above should be updated to verify a single close-button tap returns focus to the trigger.

## Property States

### `value`
[ ] Set value programmatically — verify the matching option becomes selected and the trigger displays it
[ ] Read value after user selects an option — verify it matches the selected option's value

### `typedValue` / `inputValue`
[ ] Set `typedValue` — verify the value pre-populates the input
[ ] Type text into the input — verify `inputValue` (readonly getter) returns the current value of the input element

### `placeholder`
[ ] Set placeholder — verify it displays in the input when empty
[ ] Type a value — verify the placeholder disappears

### `behavior`
[ ] Set behavior="filter" — verify the combobox requires the user to select an option from the menu
[ ] Set behavior="suggestion" (default) — verify the combobox allows the user to enter a value not present in the menu options

### `checkmark`
[ ] Set checkmark — verify selected options show checkmark indicators (in the demo helper, use options whose `value` differs from typing prefixes — e.g. `value="Apple"`, not `value="a"` — so typing does not trigger the exact-value-match auto-select bug below)

### Exact-value-match auto-select (known issue — [AB#1592401](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592401))
[ ] Type text that exactly matches a menu option's `value` attribute (e.g. `foo` when an option has `value="foo"`) — currently the combobox auto-commits the selection and closes the bib on the last keystroke, even in suggestion mode where typed text should be preserved as free text. This is undocumented behavior. Easiest to spot on a combobox with the `checkmark` attribute set: reopen the bib after typing and the auto-selected row shows a checkmark the user never asked for. When fixed, typing should only filter/highlight; committing should require an explicit click, Enter, or Tab.

### `disabled`
[ ] Set disabled — verify the input and trigger are non-interactive
[ ] Remove disabled — verify the combobox becomes interactive

### `required`
[ ] Set required with no selection and blur — verify `valueMissing` validation error appears
[ ] Select an option and blur — verify the error clears (validation runs on blur per the docs; the error will not clear on selection alone)

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

### `layout`
[ ] Set layout="classic" (default) — verify the classic visual style
[ ] Set layout="emphasized" — verify the emphasized visual style
[ ] Set layout="snowflake" — verify the snowflake visual style

### `triggerIcon`
[ ] Set triggerIcon with `type="credit-card"` — verify a credit-card icon renders inside the input trigger. Note: `triggerIcon` forwards the `icon` attribute to the inner `auro-input`, but icon rendering is currently limited to `type="credit-card"`. Without a credit-card type, no icon renders even though the attribute propagates.

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
[ ] Call `reset()` — verify the combobox returns to its initial state. **Known issue ([AB#1592423](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592423)):** after `reset()`, the inner input's error border and error icon persist even though the help text clears. `input.validity`, `input.errorMessage`, and `combobox.errorMessage` are not cleared. Trigger a `valueMissing` error first (blur a required empty combobox), then call `reset()` to reproduce.
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
