# Manual Testing — auro-input

Automated tests (`auro-input.test.js`, `auro-input-util.test.js`) already cover rendering, property/attribute reflection, type/format/locale value handling, credit-card and phone/date masking logic, validation outcomes, event firing, ARIA attribute presence, and public methods. The manual cases below focus on what automation cannot confirm: real rendering and theming, focus-indicator visibility, on-device touch and the correct on-screen keyboard, masking as perceived while typing, and real screen-reader announcements.

## Smoke Test

Run these first for a quick confidence check that the component works in a real browser.

[ ] Load the component — verify it renders with its label (and placeholder, when set) visible
[ ] Type text into the field — verify characters appear as typed
[ ] Blur a required, empty field — verify a validation error message displays
[ ] Enter a valid value in that field — verify the error message clears
[ ] View a `disabled` input — verify it looks grayed out and does not accept focus or input
[ ] Tab into the field — verify a clear focus indicator is visible

## Depth

### Desktop mouse & clipboard

[ ] Copy a formatted value (e.g. credit-card or phone) and paste it in — verify the mask reflows the pasted text into the correct grouping
[ ] Click the clear button (X) with a value present — verify the value visibly clears and the button disappears
[ ] With `type="password"` and a value present, click the visibility toggle — verify the text visibly toggles between masked dots and readable characters
[ ] Set custom content in the `displayValue` slot — verify it visibly renders in place of the value when the field is unfocused. (Automation covers that the slot renders content and sets `hasDisplayValueContent`; the manual check here confirms the real unfocused visual presentation.)

### Keyboard

[ ] Tab through a form containing the input — verify focus order is logical and the field is reachable and exitable without a trap
[ ] With the field focused, submit the form via Enter — verify the expected form behavior occurs

### Appearance & Theming

[ ] Compare `appearance="default"` and `appearance="inverse"` on their intended light/dark backgrounds — verify text, label, icons, and borders are legible in each
[ ] Verify color contrast meets WCAG 2.1 AA for label, input text, placeholder, and error text in both default and inverse appearances
[ ] Verify the focus indicator is clearly visible (sufficient contrast and thickness) in both appearances
[ ] Verify the error state is visually distinguishable by more than color alone (icon/text), not color-only
[ ] Render the same input across Chrome, Safari, and Firefox — verify label animation, masking, and icon rendering are visually consistent

### Formatting & masking (perceived while typing)

[ ] Type into a `type="credit-card"` field — verify digits group live as you type and the brand icon updates to match the detected card
[ ] Type into a `type="tel"` field — verify the phone number formats live (grouping/parentheses/spaces) as expected
[ ] Type into a `type="date"` field — verify the locale-derived mask (e.g. MM/DD/YYYY) guides entry and the placeholder shows the expected format
[ ] With a non-US `locale` (or ancestor `data-locale`), type a date — verify the displayed grouping/order and any decimal/number display match that locale

### Touch / Mobile keyboard (real device)

[ ] Tap into `type="text"` — verify the standard alphanumeric on-screen keyboard appears
[ ] Tap into `type="number"` (or `inputmode="numeric"`) — verify the numeric keypad appears
[ ] Tap into `type="email"` — verify the email keyboard variant (with @ and .) appears
[ ] Tap into `type="tel"` — verify the telephone keypad appears
[ ] On a real device, verify the clear button and password toggle are large enough to tap accurately and respond to touch
[ ] Verify the field, label, and error text remain legible and unclipped at mobile widths and larger OS text sizes

### Screen Reader

[ ] Focus the input — verify the label is announced
[ ] Focus a required input — verify it is announced as "required"; focus an optional input — verify the optional label is announced
[ ] Trigger a validation error — verify the error message is announced when it appears (live region)
[ ] Verify the clear button and password show/hide toggles announce meaningful accessible labels
[ ] Verify a `disabled` or `readonly` input is announced with its state
