# Manual Testing — auro-radio / auro-radio-group

Automated tests in `auro-radio.test.js` and `auro-radio-group.test.js` already cover rendering, property/attribute reflection and defaults, click and keyboard selection (including arrow-key group navigation and roving tabindex), single-selection behavior, events, ARIA attribute presence, validation outcomes (`valueMissing`, `customError`, `noValidate`), public methods (`reset`, `validate`), and slot rendering. The manual cases below focus on what automation cannot confirm: real rendering and theming, focus-indicator visibility, actual screen-reader announcements, touch interaction, and cross-browser layout.

## Smoke Test

Run these first for a quick confidence check that the component works in a real browser.

### auro-radio

[ ] Load a radio with a label — verify it renders with the filled/empty indicator and the label visible
[ ] Click an unselected radio — verify it becomes selected (filled indicator appears)
[ ] Tab to a radio and press Space — verify focus is visible and the radio selects

### auro-radio-group

[ ] Click different radios in a group — verify selecting one deselects the previous (single selection)
[ ] Tab into the group, then use arrow keys — verify selection moves with a visible focus indicator
[ ] Leave a required group with nothing selected and blur — verify a visible error message appears

## Depth

### auro-radio — Keyboard & Focus

[ ] Tab through a page containing a group — verify one Tab press enters the group and one exits it (focus does not stop on every radio)
[ ] Verify the focus indicator is clearly visible on each radio across default, inverse, and onDark appearances

### auro-radio — Appearance & Theming

[ ] Verify the selected/unselected indicators render correctly in default, inverse, and onDark appearances
[ ] Verify the error visual state (border/color) is clearly distinguishable from the default state
[ ] Verify a disabled radio is visibly grayed out and reads as non-interactive
[ ] Verify color contrast of label, indicator, and error text meets WCAG 2.1 AA in default and inverse appearances

### auro-radio — Touch

[ ] Tap an unselected radio on a touch device — verify it becomes selected and the tap target is comfortably sized
[ ] Tap a disabled radio — verify no state change and no visual press feedback

### auro-radio — Screen Reader

[ ] Verify each radio is announced with its label and its checked/unchecked state
[ ] Verify a disabled radio is announced as disabled
[ ] Verify moving selection with arrow keys announces the newly selected radio

### auro-radio-group — Appearance & Theming

[ ] Set `horizontal` — verify the radios visually lay out in a row and wrap sensibly at narrow widths
[ ] Verify the legend, help text, and "(optional)" label render with correct spacing in default, inverse, and onDark appearances
[ ] Verify the persistent error message renders legibly with sufficient contrast in each appearance
[ ] Render the group in Chrome, Safari, and Firefox — verify consistent layout, indicator alignment, and legend rendering

### auro-radio-group — Touch

[ ] On a touch device, tap through several options — verify only one stays selected and targets are easy to hit
[ ] Tap into a required group then dismiss the keyboard/blur without selecting — verify the error announcement and message appear

### auro-radio-group — Screen Reader

[ ] Verify the group is announced as a radio group with the legend text as its label
[ ] Verify the "(optional)" text is announced when the group is not required, and required state is conveyed when it is
[ ] Verify custom `helpText` slot content is announced in association with the group
[ ] Verify that when a required group is blurred empty, the error message is announced via the live region (aria-live) without moving focus
[ ] Verify a custom `setCustomValidity` / `setCustomValidityValueMissing` message is the text actually announced on error
