# Manual Testing — auro-counter / auro-counter-group

Automated tests (`auro-counter.test.js`, `auro-counter-group.test.js`) already cover rendering, property/attribute reflection and defaults, min/max clamping, disabled and error states, increment/decrement via click and keyboard, event firing, validation logic, public methods, slot content presence, dropdown open/close, and focus management (Escape/Tab/Shift+Tab, focus fallback when a control disables itself). The manual cases below deliberately avoid re-verifying that logic and instead focus on what automation cannot confirm: real rendering and appearance, theming, screen-reader announcements, touch input, and real-device fullscreen behavior.

## Smoke Test

Run these first for a quick confidence check that the components work in a real browser.

### auro-counter

[ ] Load a counter with slotted label text — verify it renders with the label and current value visible
[ ] Click the increment (+) button, then the decrement (−) button — verify the displayed value visibly rises and falls by 1
[ ] Increment to max — verify the value stops and the increment button becomes visibly disabled
[ ] Tab to the counter and press Arrow Up / Arrow Down — verify the focus indicator is visible and the value changes

### auro-counter-group

[ ] Load a group of counters — verify each counter renders and the group total/summary is shown
[ ] Increment one counter — verify that counter and the group total visibly update
[ ] With `isDropdown`, click the trigger — verify the bib opens; click outside — verify it closes
[ ] Tab to the dropdown trigger and press Enter — verify the focus indicator is visible and the bib opens

## Depth

### auro-counter — Appearance & Theming

[ ] Verify the error visual state renders correctly (border / coloring / message placement)
[ ] Verify the disabled counter is visibly greyed / non-interactive in appearance
[ ] Verify `inverse` / `onDark` appearance renders correctly on a dark background (label, value, help text, buttons)
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify the focus indicator on the control and on each button is clearly visible

### auro-counter — Touch (device)

[ ] Tap the increment and decrement buttons on a real touchscreen — verify each tap registers and the value updates
[ ] Tap increment at max and decrement at min — verify no change and the disabled button gives no misleading feedback

### auro-counter — Screen Reader

[ ] Verify the counter label (default slot) is announced
[ ] Verify the increment and decrement buttons announce their accessible labels (ariaLabel.plus / ariaLabel.minus)
[ ] Verify the current value is announced when it changes
[ ] Verify the disabled state is announced
[ ] Verify the help text and description content are announced

### auro-counter-group — Appearance & Theming

[ ] Verify the group error visual state renders correctly (coloring, message, error icon)
[ ] Verify the dropdown trigger, label, and value text render correctly, including in `inverse` / `onDark` appearance
[ ] Verify color contrast meets WCAG 2.1 AA
[ ] Verify the focus indicator is clearly visible on the trigger and on controls inside the bib

### auro-counter-group — Touch (device)

[ ] Tap the dropdown trigger — verify the bib opens
[ ] Tap counter buttons inside the bib — verify values and total update
[ ] Tap outside the bib — verify it closes

### auro-counter-group — Fullscreen / Mobile (real device)

[ ] Open the dropdown at a viewport below `fullscreenBreakpoint` on a real device — verify it opens as a fullscreen dialog
[ ] Verify the fullscreen headline and footer slot content render correctly
[ ] Verify the close button is reachable and focused, and closing returns focus to the trigger
[ ] Set `fullscreenBreakpoint="disabled"` — verify the dropdown never enters fullscreen even on a small viewport
[ ] Verify layout, scrolling, and touch interactions inside the fullscreen dialog behave correctly

### auro-counter-group — Cross-browser & Integration

[ ] Verify dropdown positioning and bib rendering across Chrome, Safari, and Firefox
[ ] Verify a counter-group dropdown nested inside an auro-dialog or auro-drawer opens/closes without disrupting the parent overlay

### auro-counter-group — Screen Reader

[ ] Verify the group and its dropdown label are announced as a coherent unit
[ ] Verify the fullscreen dialog headline is announced when the dialog opens
[ ] Verify the close button announces its accessible label (ariaLabel.bib.close)
[ ] Verify each child counter's label, value, and value changes are announced inside the bib
