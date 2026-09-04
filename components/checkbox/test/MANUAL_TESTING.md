# Manual Testing — auro-checkbox / auro-checkbox-group

Automated tests (`auro-checkbox.test.js`, `auro-checkbox-group.test.js`) already cover
rendering, `checked` / `disabled` / `error` / `value` state reflection, click and
Space toggling (and that Enter does not), event firing, ARIA attribute presence, validation logic
(`valueMissing`, custom validity), and public methods (`reset`, `validate`). The manual
cases below deliberately avoid re-verifying that logic and instead focus on what
automation cannot confirm: real rendering and appearance, screen-reader announcements,
touch input, and layout.

## Smoke Test

Run these first for a quick confidence check that the component works in a real browser.

### auro-checkbox

[ ] Load a checkbox with slotted label text — verify it renders with the label visible
[ ] Click the checkbox, then click it again — verify the checkmark appears, then clears
[ ] Tab to the checkbox and press Space — verify the focus indicator is visible and the state toggles
[ ] View a disabled checkbox — verify it looks grayed out and does not respond to a click

### auro-checkbox-group

[ ] Load a group of checkboxes — verify they all render beneath the group legend
[ ] Check two different checkboxes — verify both stay checked independently
[ ] Blur a required group with nothing checked — verify the error message displays

## Depth

### auro-checkbox — Appearance & Theming

[ ] Verify the error visual state renders correctly (border / coloring)
[ ] Verify the inverse / onDark appearance renders correctly against a dark background
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify the focus indicator is clearly visible when the checkbox is tabbed to

### auro-checkbox — Touch

[ ] On a touch device, tap to check and tap again to uncheck — verify it toggles
[ ] On a touch device, tap the label text — verify the checkbox toggles

### auro-checkbox — Screen Reader

[ ] Verify the checkbox is announced with its label and its checked / unchecked state
[ ] Verify a disabled checkbox is announced as disabled

### auro-checkbox-group — Appearance & Layout

[ ] Set `horizontal` — verify the checkboxes lay out in a row instead of a column
[ ] Verify the persistent error state (with a custom message) renders correctly
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances
[ ] Verify focus indicators are clearly visible on each checkbox in the group

### auro-checkbox-group — Screen Reader

[ ] Verify the fieldset / legend structure is announced as the group label
[ ] Verify the required state is announced for the group
[ ] Verify error messages are announced when they appear (aria-live region)
[ ] Verify the optional label is announced when the group is not required
