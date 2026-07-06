# Manual Testing — auro-select

**Key symbols:** ↓ = ArrowDown · ↑ = ArrowUp · ↵ = Enter · ⇥ = Tab · ␣ = Space · ⎋ = Escape

## Mouse Interactions

- [ ] Click the trigger — verify the dropdown bib opens showing the menu options
- [ ] Click a menu option — verify it becomes selected, the bib closes, and the trigger displays the selected value
- [ ] Click the trigger again after selecting — verify the bib opens with the previously selected option marked
- [ ] Click outside the bib when open — verify the bib closes without changing the selection
- [ ] Click a disabled option — verify no selection change occurs
- [ ] Click the trigger on a disabled select — verify the bib does not open

### Multi-Select

- [ ] Click an option in multi-select mode — verify it becomes selected (checkmark appears) and the bib stays open
- [ ] Click another option — verify both options are now selected
- [ ] Click a selected option — verify it deselects (checkmark removed)
- [ ] Click outside the bib — verify the bib closes and all selections persist

## Keyboard Interactions — Desktop (Popup Closed)

- [ ] ⇥ to the select trigger — verify it receives visible focus
- [ ] ↵ on the focused trigger — verify the bib opens; the event does not bubble to a parent form
- [ ] ␣ on the focused trigger (empty type-ahead buffer) — verify the bib opens
- [ ] ↓ — verify the bib opens; on open the selected option (if any) becomes active, otherwise the first active option (not `disabled`, `hidden`, or `static`) becomes active
- [ ] ↑ — verify the bib opens; on open the selected option (if any) becomes active, otherwise the first active option (not `disabled`, `hidden`, or `static`) becomes active
- [ ] `Home` — verify the bib opens and the active option moves to the first active option
- [ ] `End` — verify the bib opens and the active option moves to the last active option
- [ ] ⎋ on the focused trigger — verify no visible change occurs; any pending type-ahead buffer clears (bubbling is allowed so an ancestor dialog can still handle it)
- [ ] ⇥ away from the trigger — verify focus moves to the next focusable element (standard browser behavior)

## Keyboard Interactions — Desktop (Popup Open)

- [ ] ↓ — verify the active option moves to the next active option (not `disabled`, `hidden`, or `static`)
- [ ] ↑ — verify the active option moves to the previous active option
- [ ] ↓ at the last active option — verify it wraps to the first active option
- [ ] ↑ at the first active option — verify it wraps to the last active option
- [ ] `Alt`/`Ctrl`/`Meta` + ↓ — verify the active option jumps to the last active option
- [ ] `Alt`/`Ctrl`/`Meta` + ↑ — verify the active option jumps to the first active option
- [ ] `Home` — verify the active option moves to the first active option
- [ ] `End` — verify the active option moves to the last active option
- [ ] ↵ on an active option (single-select) — verify it selects the option, closes the bib, and returns focus to the trigger
- [ ] ↵ on an active option (multi-select) — verify the option toggles selected and the bib stays open
- [ ] ⎋ — verify the bib closes without selecting, the type-ahead buffer clears, focus returns to the trigger, and the event does not bubble to ancestor dialogs
- [ ] ␣ with empty type-ahead buffer — verify the bib closes without selecting the active option
- [ ] ⇥ with an active option — verify the option is selected in single-select or toggled in multi-select, the bib closes, and focus moves to the next tabbable element
- [ ] ⇥ with no active option — verify the bib closes with no selection change and focus moves to the next tabbable element
- [ ] Shift + ⇥ with an active option — verify the option is selected in single-select or toggled in multi-select, the bib closes, and focus moves to the previous tabbable element (the strategy does not read `shiftKey`; direction is native browser behavior)

## Keyboard Interactions — Fullscreen (Mobile Dialog)

- [ ] Verify the close button receives initial focus when the dialog opens (after a two-frame delay so the button has rendered)
- [ ] ↓ / ↑ — verify the active option changes just like desktop; the trigger is marked `inert` so screen readers reach only the dialog contents
- [ ] ↵ on an active option — verify it selects, the dialog closes, and focus returns to the trigger
- [ ] ⎋ — verify the dialog closes (the select's keyboard strategy handles Escape, closing the bib and clearing the type-ahead buffer; the native `<dialog>` cancel path is a fallback) and focus returns to the trigger
- [ ] ␣ (empty buffer) — verify the dialog closes
- [ ] ⇥ with no active option — verify the dialog closes and focus moves to the next focusable element after the select
- [ ] ⇥ with an active option — verify the option is selected in single-select or toggled in multi-select, the dialog closes, and focus moves to the next focusable element after the select
- [ ] Shift + ⇥ with an active option — verify the option is selected in single-select or toggled in multi-select, the dialog closes, and focus moves to the previous focusable element before the select
- [ ] `Home` / `End` — verify the active option moves to the first / last active option

## Type-ahead / Type-to-search

- [ ] With bib closed, type letters that match an option prefix (e.g., "ba") — verify the bib opens and the first matching active option becomes active
- [ ] With bib closed, type letters that match no option (e.g., "zzz") — verify the bib stays closed
- [ ] With bib open, type the same letter repeatedly (e.g., "a", "a", "a") — verify the active option cycles through options starting with that letter
- [ ] With bib open, type a multi-letter prefix (e.g., "app") — verify the first option whose text starts with the buffer becomes active (prefix match, not cycle)
- [ ] Type letters, then wait past `typeaheadTimeoutMs` (default 500 ms) without typing — verify the next keystroke starts a fresh buffer
- [ ] With bib open and type-ahead buffer active, press ␣ — verify the space extends the buffer (does not close the bib)
- [ ] With bib open and buffer empty, press ␣ — verify the bib closes without selecting the active option
- [ ] Type letters to build a buffer, then press ⎋ — verify the buffer clears (next keystroke starts fresh) even if the bib was already closed
- [ ] Type letters to build a buffer, then blur the trigger (⇥ away) — verify the buffer clears
- [ ] Set `value` programmatically or call `reset()` while a buffer is pending — verify the buffer clears
- [ ] Chorded keys (`Ctrl`/`Meta`/`Alt` + printable character) — verify they are ignored and never enter the buffer

## Touch / Tap Interactions

- [ ] Tap the trigger — verify the bib opens (popover on desktop, fullscreen on mobile)
- [ ] Tap a menu option — verify it selects and the bib closes
- [ ] Tap outside the bib — verify the bib closes
- [ ] Tap a disabled option — verify no change

## Fullscreen (Mobile) Mode

- [ ] Open the select at mobile breakpoint — verify the fullscreen dialog opens
- [ ] Verify the close button receives initial focus when the dialog opens
- [ ] Verify the trigger is marked `inert` while the fullscreen dialog is open
- [ ] Verify the `bib.fullscreen.headline` slot content is displayed
- [ ] Tap an option — verify it selects and the dialog closes
- [ ] Tap the close button — verify the dialog closes without selecting
- [ ] Verify focus returns to the trigger when the dialog closes
- [ ] Resize past the `fullscreenBreakpoint` while the bib is open — verify the mode switches and focus lands on the close button (fullscreen) or the trigger (popover)

## Property States

### `value`

- [ ] Set value programmatically — verify the matching option becomes selected and the trigger displays it
- [ ] Read value after user selects an option — verify it matches the selected option's value

### `placeholder`

- [ ] Set placeholder — verify it displays in the trigger when no option is selected
- [ ] Select an option — verify the placeholder is replaced by the selected value

### `multiSelect`

- [ ] Set multiSelect — verify multiple options can be selected
- [ ] Verify selected values are displayed in the trigger (comma-separated or custom display)

### `disabled`

- [ ] Set disabled — verify the trigger is non-interactive and visually disabled
- [ ] Remove disabled — verify the select becomes interactive

### `required`

- [ ] Set required with no selection and blur — verify `valueMissing` validation error appears
- [ ] Select an option — verify the error clears

### `noCheckmark`

- [ ] Set noCheckmark — verify selected options do not show checkmark indicators

### `flexMenuWidth`

- [ ] Set flexMenuWidth — verify the bib width matches the content width rather than the trigger width

### `fluid`

- [ ] Set fluid — verify the select takes 100% width of its container

### `forceDisplayValue`

- [ ] Set forceDisplayValue with `displayValue` slot content — verify the custom display always renders (the label and value are visually hidden)
- [ ] Set forceDisplayValue without providing `displayValue` slot content — verify the trigger still renders the selected option's text (no crash, no empty state)

### `noValidate`

- [ ] Set noValidate — verify no auto-validation fires on blur
- [ ] Remove noValidate — verify auto-validation resumes

### `error`

- [ ] Set error with a message — verify persistent error state with the custom message displayed

### `fullscreenBreakpoint`

- [ ] Set `fullscreenBreakpoint="sm"` — verify fullscreen at the small breakpoint (default is `sm`)
- [ ] Set `fullscreenBreakpoint="xs"` — verify fullscreen at the extra-small breakpoint
- [ ] Set `fullscreenBreakpoint="md"` — verify fullscreen at the medium breakpoint (tablet-sized viewports)
- [ ] Set `fullscreenBreakpoint="lg"` — verify fullscreen at the large breakpoint
- [ ] Set `fullscreenBreakpoint="xl"` — verify fullscreen at the extra-large breakpoint
- [ ] Set `fullscreenBreakpoint="disabled"` — verify the select never enters fullscreen mode

### `largeFullscreenHeadline`

- [ ] Set largeFullscreenHeadline — verify the `bib.fullscreen.headline` renders in the larger HeadingDisplay style
- [ ] Remove largeFullscreenHeadline — verify the headline renders as Heading 600

### `appearance`

- [ ] Set `appearance="default"` — verify the light-background visual treatment applies to trigger, help text, and menu
- [ ] Set `appearance="inverse"` — verify the dark-background visual treatment applies to trigger AND to the bib menu interior (options, checkmarks, hover states) in both popover and fullscreen modes

### `layout` / `shape` / `size`

- [ ] Set `layout="classic"`, `"emphasized"`, or `"snowflake"` — verify each visual style applies
- [ ] Verify `shape` (`classic`, `pill`, `pill-left`, `pill-right`, `snowflake`) changes the trigger shape
- [ ] Verify `size="lg"` renders correctly for all layouts and `size="xl"` renders only for `emphasized`

### `shift`

- [ ] Set shift — verify the bib shifts position to remain within the viewport when placed near an edge
- [ ] Remove shift — verify the bib does not shift and may be clipped by the viewport

### `typeaheadTimeoutMs`

- [ ] Set typeaheadTimeoutMs to a higher value (e.g. 1000) — verify keystrokes can be spaced further apart without resetting the buffer
- [ ] Set typeaheadTimeoutMs to a lower value (e.g. 100) — verify the buffer resets quickly between keystrokes

### `placement`

- [ ] Set `placement="top"` — verify the bib appears above the trigger
- [ ] Set `placement="bottom-end"` — verify the bib aligns to the trigger's end edge

### `autoPlacement`

- [ ] Set autoPlacement with the trigger near the top of the viewport — verify the bib flips to `bottom`
- [ ] Set autoPlacement with the trigger near the bottom of the viewport — verify the bib flips to `top`

### `noFlip`

- [ ] Set noFlip with the trigger near a viewport edge — verify the bib does NOT flip and may be clipped
- [ ] Remove noFlip — verify the bib flips to remain fully visible

### `offset`

- [ ] Set offset to a positive value (e.g. `16`) — verify the gap between trigger and bib increases
- [ ] Set offset to `0` (default) — verify the bib sits flush against the trigger

### `matchWidth`

- [ ] Set matchWidth — verify the bib width matches the trigger width exactly
- [ ] Remove matchWidth — verify the bib sizes to its content or minimum popover width

### `name`

- [ ] Set `name="mySelect"` and place the select in a `<form>` — submit the form and verify the submitted payload includes `mySelect=<value>`

### `autocomplete`

- [ ] Set `autocomplete="off"` — verify the attribute is reflected onto the underlying native `<select>` element
- [ ] Set `autocomplete="country"` — verify browsers offer country-specific autofill suggestions

### `onDark` (deprecated)

- [ ] Set `onDark` — verify it applies the same inverse styling as `appearance="inverse"` (kept for legacy support)

### `optionSelected`

- [ ] After user selection, read `optionSelected` — verify it returns the selected `<auro-menuoption>` element
- [ ] In multi-select mode, read `optionSelected` — verify it returns an array of selected `<auro-menuoption>` elements

### `optionActive`

- [ ] Open the bib and navigate with ↓/↑ — read `optionActive` after each key press and verify it references the currently highlighted `<auro-menuoption>` element
- [ ] Close the bib — verify `optionActive` becomes `null`

### `validity`

- [ ] Read `validity` on a valid select — verify it returns `"valid"`
- [ ] Leave a required select empty and blur — verify `validity` returns `"valueMissing"`
- [ ] Set an `error` message — verify `validity` returns `"customError"`

### `touched`

- [ ] Load a pristine select — verify `touched` is `false`
- [ ] Interact with the trigger (focus + blur, or open + close) — verify `touched` becomes `true`
- [ ] Call `reset()` — verify `touched` returns to `false`

### `setCustomValidity`

- [ ] Set `setCustomValidity="Choose a valid option"` — verify the custom message displays in every invalid state
- [ ] Clear the value to trigger `valueMissing` — verify the custom message is shown instead of the default

### `setCustomValidityCustomError`

- [ ] Set `setCustomValidityCustomError="Server rejected this option"` and set `error` — verify the custom message displays specifically for the `customError` state
- [ ] Enter a `valueMissing` state — verify the `customError` message does NOT display (only applies to `customError`)

### `setCustomValidityValueMissing`

- [ ] Set `setCustomValidityValueMissing="Please make a selection"` on a required select, leave empty and blur — verify the custom message overrides the default `valueMissing` error
- [ ] Clear the `setCustomValidityValueMissing` — verify the default required error returns

## Behavioral Edge Cases

- [ ] Enable `prefers-reduced-motion: reduce` in the OS/browser, then navigate options with ↓/↑ — verify options scroll into view instantly (no smooth animation)
- [ ] Open the bib, type a multi-character prefix ending with a no-match (e.g., "ap" then "z" — no option starts with "apz") — verify the last character starts a new match instead of failing outright
- [ ] Remove all options from the menu while the bib is open — verify ␣ toggles the bib and no option remains active
- [ ] Open the bib, make an option active, then remove that option via slot mutation — verify next keyboard navigation lands on a valid remaining option
- [ ] Set `value` programmatically while the bib is open — verify the selected option updates and the bib closes (single-select) or stays open (multi-select)
- [ ] Set `disabled=true` while the bib is open — verify the bib closes and the trigger becomes non-interactive
- [ ] Open the bib at a popover-sized viewport, resize past `fullscreenBreakpoint` while open, then resize back — verify the trigger's `inert` attribute is added when entering fullscreen and removed when returning to popover mode
- [ ] Mutate the `label` slot content at runtime (e.g., i18n locale swap) — verify the menu's `aria-label` attribute and the fullscreen dialog's accessible name both update to match
- [ ] Mutate the `ariaLabel.bib.close` slot content at runtime — verify screen readers announce the updated accessible name on next focus of the close button
- [ ] In multi-select mode, deselect the last selected option — verify the placeholder returns to the trigger

## Visual / Content Edge Cases

- [ ] Select an option with very long text (50+ characters) — verify the trigger truncates with ellipsis (classic layout) or handles wrapping (emphasized/snowflake) without breaking layout
- [ ] Add options with very long text (100+ characters) — verify options render in the menu without breaking layout in either popover or fullscreen mode
- [ ] Add 50+ options — verify the menu scrolls bounded within the popover on desktop and within the dialog in fullscreen mode
- [ ] Render a select with no `<auro-menuoption>` children — verify the trigger displays the placeholder and the bib does not open (or opens to an empty menu without errors)
- [ ] Focus the trigger in each layout (`classic`, `emphasized`, `snowflake`) with each appearance (`default`, `inverse`) — verify a clearly visible focus indicator in all six combinations

## Form Integration

- [ ] Place the select in a `<form>` with a `<button type="reset">`, select an option, and click the reset button — verify the selection clears and validation state resets
- [ ] Place a required select in a `<form>` with a submit button, leave empty and submit — verify submission is blocked and the error is announced
- [ ] Place the select in a `<form>` with the bib collapsed, press ↵ on the trigger — verify the bib opens and the form does NOT submit

## Validation

- [ ] Leave a required select empty and blur — verify `valueMissing` error appears
- [ ] Select an option in a required select — verify the error clears
- [ ] Set setCustomValidity with a message — verify the custom error displays
- [ ] Set setCustomValidityValueMissing — verify custom message overrides default required error
- [ ] Call `validate(true)` — verify forced validation fires immediately
- [ ] Call `reset()` — verify the select returns to its initial state (selection cleared, validation cleared)

## Events

- [ ] Select an option — verify `input` event fires with `{ value, optionSelected }` in `detail`
- [ ] Select an option — verify `auroSelect-valueSet` event fires
- [ ] Trigger validation — verify `auroFormElement-validated` event fires with the updated `validity` and `errorMessage`
- [ ] Open the bib — verify the underlying `auroDropdown-toggled` event fires with the current expanded state
- [ ] Change `value` programmatically — verify `input` and `auroSelect-valueSet` still fire

## Accessibility

- [ ] Verify the trigger has `role="combobox"` and appropriate ARIA attributes
- [ ] Verify the menu has `role="listbox"`
- [ ] Verify options have `role="option"`
- [ ] Toggle the bib open and closed — verify `aria-expanded` on the trigger updates from `false` → `true` → `false`
- [ ] Inspect the trigger — verify `aria-controls` is set and points to the bib element's `id`
- [ ] Inspect the trigger — verify `aria-labelledby` (when set by the dropdown) points to the label element's id
- [ ] Inspect the trigger — verify `aria-disabled="true"` is present when `disabled` is set and absent otherwise
- [ ] Verify `aria-activedescendant` tracks the currently active option (including across the shadow-root boundary in fullscreen mode)
- [ ] Inspect the trigger in DevTools — verify `ariaActiveDescendantElement` is set to a direct element reference (property form, not string attribute) so it works across shadow roots
- [ ] Set an `error` message while the bib is open or the trigger is focused — verify the help text region announces the error immediately via `role="alert"` / `aria-live="assertive"` (not only on next focus)
- [ ] Verify screen reader announces the selected value
- [ ] Verify screen reader announces required state
- [ ] Verify error messages are announced
- [ ] Verify disabled state is announced
- [ ] Verify focus management when opening/closing the bib/dialog
- [ ] Verify focus trapping in fullscreen dialog mode
- [ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
- [ ] Verify focus indicators are clearly visible

### Multi-Select Announcements

- [ ] In multi-select mode, select an option — verify screen reader announces `"<label>, selected"` (only the toggled option, not the full list)
- [ ] In multi-select mode, deselect a previously selected option — verify screen reader announces `"<label>, not selected"`
- [ ] Rapidly toggle multiple options — verify each add/remove announcement is delayed briefly so the `aria-expanded` collapse announcement does not override it

### aria-setsize / aria-posinset

- [ ] Inspect any option in the DOM — verify `aria-setsize` equals the total count of `<auro-menuoption>` elements in the menu
- [ ] Inspect any option — verify `aria-posinset` equals its 1-based position in that list
- [ ] Dynamically add or remove options via slot change (or via async/lazy load) — verify `aria-setsize` and `aria-posinset` re-stamp on all remaining options
- [ ] Change `value` programmatically to trigger a menu re-init — verify positional ARIA attributes remain correct

### Mobile Announcement Routing

- [ ] At the fullscreen breakpoint, open the dialog and select/deselect an option in multi-select — verify the screen reader hears the announcement (the live region is routed into the bib's shadow root because everything outside the `<dialog>` is inert)
- [ ] At desktop (popover) sizes, verify the same announcements come from the host component's shadow root live region

## Slots

- [ ] Set custom content in the `label` slot — verify it renders as the select label
- [ ] Set custom content in the `helpText` slot — verify it renders below the select
- [ ] Set custom content in the `optionalLabel` slot — verify it overrides the default "(optional)" text
- [ ] Set custom content in the default slot (auro-menu with options) — verify options render in the bib
- [ ] Set custom content in the `bib.fullscreen.headline` slot — verify it renders in the fullscreen dialog header
- [ ] Set custom content in the `ariaLabel.bib.close` slot — verify screen reader announces it for the close button
- [ ] Set custom content in the `typeIcon` slot — verify the icon renders inside the trigger
- [ ] Set custom content in the `displayValue` slot — verify it renders as the custom selected value display when the trigger is not focused (or always, when `forceDisplayValue` is set)

## Public Methods

- [ ] Call `showBib()` — verify the bib opens
- [ ] Call `hideBib()` — verify the bib closes
- [ ] Call `reset()` — verify the select returns to its initial state (selection cleared, validation cleared)
- [ ] Call `validate()` — verify validation runs and validity state updates
- [ ] Call `validate(true)` — verify forced validation runs
- [ ] Call `setMenuValue(value)` — verify the matching option becomes selected
- [ ] Call `updateActiveOption(index)` — verify the option at the given index becomes active
