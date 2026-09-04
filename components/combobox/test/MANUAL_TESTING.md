# Manual Testing — auro-combobox

Automated tests (`auro-combobox.test.js`) already cover rendering, property/attribute reflection and defaults, filter/suggestion/persistInput logic, static and nomatch options, state changes from simulated typing/keyboard/click, event firing, ARIA attribute presence, validation outcomes, and public methods across both desktop and small-viewport suites. The manual cases below focus on what automation cannot confirm: real rendering and theming, focus-indicator visibility, actual screen-reader announcements, real touch and virtual-keyboard behavior, and true fullscreen-dialog behavior on devices and across browsers.

## Smoke Test

[ ] Load the component — verify it renders with the label and placeholder visible
[ ] Type a few characters — verify matching suggestions appear in the bib as you type
[ ] Click a suggestion — verify the bib closes and the trigger input shows the selected value
[ ] Tab to the trigger, Arrow Down to open the bib, Arrow Down again to highlight the first option, then Enter — verify the option is selected
[ ] On a required combobox, focus and blur while empty — verify a visible validation error appears
[ ] Tab to the trigger — verify a clearly visible focus indicator on the input, and that arrowing through options visibly highlights the active option
[ ] Click the clear (X) button after selecting — verify the value clears in the UI

## Depth

### Desktop Mouse & Keyboard Flows

[ ] Real typing across suggestion mode (default) — verify the typed free-text feel: characters appear immediately, the list narrows smoothly, and unmatched text is retained as you keep typing without jarring reflow
[ ] Real typing across filter mode (`persistInput`) — verify that selecting an option leaves your typed text in place as perceived, and that the overall interaction reads as "must pick from the list"
[ ] Continue typing while an option is highlighted — verify the highlight and filtered list update fluidly without flicker or lost caret position
[ ] Tab out of an open bib with an option highlighted — verify the perceived focus lands where expected (clear button, then onward) and that a single Shift+Tab moves focus back one step without skipping or trapping (intended behavior tracked in [AB#1590650](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1590650)); confirm no focus is visually lost
[ ] Click outside an open bib — verify it closes cleanly with no visual artifacts

### Appearance & Theming

[ ] Verify color contrast meets WCAG 2.1 AA for the input text, placeholder, label, help text, and highlighted/selected options in default and inverse appearances
[ ] Verify the dark / inverse appearance renders correctly — bib background, borders, option hover/active highlight, and the bold match-highlight (`<strong>`) are all legible
[ ] Verify the focus ring is clearly visible on the trigger input and the clear button against every supported background
[ ] Verify the layout variants (classic, emphasized, snowflake) render as designed and options/checkmarks align correctly
[ ] Verify rendering is consistent across supported browsers (Chrome, Safari, Firefox, Edge) — bib positioning, fonts, and highlight styles
[ ] Set `triggerIcon` with `type="credit-card"` — verify a credit-card icon actually renders inside the input trigger. Note: `triggerIcon` forwards the `icon` attribute to the inner `auro-input`, but icon rendering is currently limited to `type="credit-card"`. Without a credit-card type, no icon renders even though the attribute propagates. (Automation covers `triggerIcon`/`type` attribute reflection only — not that the icon SVG renders — so this visual check must stay manual.)

### Touch / Tap

[ ] Tap the trigger on a real device — verify the combobox opens (popover on tablet, fullscreen on phone) with no double-tap or delayed-tap issues
[ ] Tap a menu option — verify it selects and dismisses cleanly under touch
[ ] Tap the clear button and tap outside the bib — verify each behaves correctly with touch targets large enough to hit comfortably

### Fullscreen / Mobile Dialog

[ ] Open at a phone breakpoint — verify the fullscreen dialog presents correctly and the search input inside it receives focus with the virtual keyboard opening
[ ] Verify the fullscreen headline slot content displays in the dialog header
[ ] Type in the fullscreen input on a device — verify options filter and the list scrolls under touch
[ ] Dismiss via the close button, Escape, tap-outside, and selecting an option — verify focus returns to the trigger on each path. NOTE: the close-button path currently drops focus (known issue [AB#1592304](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592304)); confirm whether it still reproduces
[ ] Verify Shift+Tab focus management inside the fullscreen dialog behaves consistently across browsers (historically inconsistent and may need custom handling)

### Screen Reader

[ ] With a screen reader running, focus the combobox — verify the role, label, and required/optional state are announced with the actual expected wording
[ ] Type and arrow through options — verify the currently highlighted option and its position are announced as you move
[ ] Select an option — verify the selection is actually announced. NOTE: known issue ([AB#1593691](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1593691)) — the "${value}, selected" live-region announcement gets clobbered because focus jumps to the clear button, so SR users may hear no confirmation; confirm current behavior
[ ] Trigger a validation error and verify the error message is announced
[ ] Verify the clear button and the fullscreen close button announce their accessible labels
[ ] Verify focus is trapped within the fullscreen dialog while it is open

### Known Issue — Exact-value-match auto-select ([AB#1592401](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592401))

[ ] Type text that exactly matches a menu option's `value` attribute (e.g. `foo` when an option has `value="foo"`) — currently the combobox auto-commits the selection and closes the bib on the last keystroke, even in suggestion mode where typed text should be preserved as free text. This is undocumented behavior. Easiest to spot on a combobox with the `checkmark` attribute set: reopen the bib after typing and the auto-selected row shows a checkmark the user never asked for. When fixed, typing should only filter/highlight; committing should require an explicit click, Enter, or Tab.

### Known Issue — `reset()` leaves error visuals ([AB#1592423](https://dev.azure.com/itsals/E_Retain_Content/_boards/board/t/Auro%20Design%20System/Stories?workitem=1592423))

[ ] Trigger a `valueMissing` error first (blur a required empty combobox so the error border, error icon, and help text appear), then call `reset()` — verify the combobox returns to its initial state. **Known issue:** after `reset()`, the inner input's error border and error icon persist even though the help text clears, and `input.validity`, `input.errorMessage`, and `combobox.errorMessage` are not cleared. Automation (`auro-combobox.test.js` reset test) only asserts the host `validity`/`value` clear — not the inner input's error visuals or `errorMessage` — so this reproduction must stay manual until fixed.
