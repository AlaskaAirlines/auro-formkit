# Manual Testing — auro-dropdown

## Mouse Interactions

[ ] Click the trigger element — verify the bib (dropdown content) opens
[ ] Click the trigger again — verify the bib closes (toggle behavior)
[ ] Click outside the bib when it is open — verify the bib closes
[ ] Click inside the bib content — verify the bib stays open
[ ] Hover over the trigger with `hoverToggle` set — verify the bib opens on mouseover
[ ] Move the mouse away from the trigger and bib with `hoverToggle` — verify the bib closes on mouseout
[ ] Click a disabled dropdown trigger — verify nothing happens

## Keyboard Interactions

[ ] Tab to the trigger element — verify it receives focus
[ ] Enter on the focused trigger — verify the bib opens
[ ] Space on the focused trigger — verify the bib opens
[ ] Escape when the bib is open — verify the bib closes and focus returns to the trigger
[ ] Tab through focusable elements inside the bib — verify focus moves through bib content
[ ] Tab past the last focusable element in the bib — verify appropriate behavior (bib closes or focus exits)
[ ] Shift+Tab — verify focus moves backward through bib content
[ ] Tab away from the dropdown — verify the bib closes (unless `noHideOnThisFocusLoss` is set)

## Touch / Tap Interactions

[ ] Tap the trigger — verify the bib opens
[ ] Tap the trigger again — verify the bib closes
[ ] Tap outside the bib — verify the bib closes
[ ] Tap inside the bib — verify it stays open

## Fullscreen (Mobile) Mode

[ ] Open the dropdown at mobile breakpoint — verify the fullscreen dialog appears
[ ] Verify the close button is present in the fullscreen dialog
[ ] Tap the close button — verify the dialog closes
[ ] Press Escape — verify the dialog closes
[ ] Verify focus is trapped inside the fullscreen dialog
[ ] Verify focus returns to the trigger when the dialog closes

## Property States

### `isPopoverVisible`
[ ] Read isPopoverVisible when bib is open — verify it returns true
[ ] Read isPopoverVisible when bib is closed — verify it returns false

### `disabled`
[ ] Set disabled — verify the trigger is non-interactive and the bib cannot be opened
[ ] Remove disabled — verify the dropdown becomes interactive

### `placement`
[ ] Set placement="bottom" — verify the bib appears below the trigger
[ ] Set placement="top" — verify the bib appears above the trigger
[ ] Set placement="left" — verify the bib appears to the left of the trigger
[ ] Set placement="right" — verify the bib appears to the right of the trigger
[ ] Set placement="bottom-start" — verify the bib aligns to the start edge

### `autoPlacement`
[ ] Set autoPlacement — verify the bib automatically positions itself based on available space

### `noFlip`
[ ] Set noFlip — verify the bib does not flip to the opposite side when there is no room

### `shift`
[ ] Set shift — verify the bib shifts along the axis to stay in the viewport

### `offset`
[ ] Set offset to a number (e.g., 16) — verify there is a gap between the trigger and bib

### `matchWidth`
[ ] Set matchWidth — verify the bib width matches the trigger width

### `chevron`
[ ] Set chevron — verify a chevron icon appears on the right side of the trigger

### `simple`
[ ] Set simple — verify a border appears around the trigger

### `error`
[ ] Set error — verify the dropdown displays an error visual state

### `focusShow`
[ ] Set focusShow — verify the bib opens when the trigger receives focus

### `noToggle`
[ ] Set noToggle — verify clicking the trigger only shows the bib (clicking again does not close it)

### `noHideOnThisFocusLoss`
[ ] Set noHideOnThisFocusLoss — verify the bib stays open when focus moves outside the dropdown

### `disableEventShow`
[ ] Set disableEventShow — verify the bib does not open from click/focus events (only via `show()` API)

### `disableKeyboardHandling`
[ ] Set disableKeyboardHandling — verify the dropdown does not respond to keyboard events (consumer manages keyboard behavior)

### `fullscreenBreakpoint`
[ ] Set fullscreenBreakpoint="sm" — verify the dropdown switches to fullscreen at the small breakpoint
[ ] Set fullscreenBreakpoint="disabled" — verify the dropdown never enters fullscreen mode

## Events

[ ] Open the bib — verify `auroDropdown-toggled` event fires
[ ] Close the bib — verify `auroDropdown-toggled` event fires again
[ ] Click the trigger — verify `auroDropdown-triggerClick` event fires

## Accessibility

[ ] Verify the trigger has an appropriate aria-label or a11yRole
[ ] Verify the bib content is accessible when open
[ ] Verify the bib is hidden from screen readers when closed
[ ] Verify focus management when opening/closing the bib
[ ] Verify focus trapping in fullscreen mode
[ ] Verify Escape closes the bib in both popover and fullscreen modes
[ ] Verify color contrast meets WCAG 2.1 AA

## Slots

[ ] Set custom content in the `trigger` slot — verify it renders as the dropdown trigger
[ ] Set custom content in the default slot — verify it renders as the bib content
[ ] Set custom content in the `helpText` slot — verify it renders below the dropdown

## Public Methods

[ ] Call `show()` — verify the bib opens
[ ] Call `hide()` — verify the bib closes
[ ] Call `focus()` — verify focus moves to the first element inside the bib when it is open
