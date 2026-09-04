# Manual Testing — auro-dropdown

Automated tests (`auro-dropdown.test.js`) already cover — in both desktop and mobile viewports — property/attribute reflection, show/hide/toggle logic on click and keyboard, chevron rotation, disabled/hover/focusShow/disableEventShow/disableKeyboardHandling behavior, `desktopModal` inert + Tab-trap wiring, `fullscreenBreakpoint` mapping, Escape-to-close with focus return, touch-scroll-lock logic, events, public methods, slot rendering, and ARIA attribute presence. The manual cases below focus only on what automation cannot confirm: real rendering and theming, focus-indicator visibility, true floating position against live viewport edges, the felt behavior of hover/touch/fullscreen on real devices, and actual screen-reader announcements across browsers.

## Smoke Test

Run these first for a quick confidence check that the component works in a real browser.

[ ] Load the component — verify the trigger renders and is visible
[ ] Click the trigger — verify the bib opens with its content visible
[ ] Click outside the bib, then reopen and press Escape — verify each closes the bib
[ ] Tab to the trigger and press Enter (or Space) — verify the bib opens
[ ] With the bib open, Tab into the bib content, then press Escape — verify focus returns to the trigger with a visible focus ring
[ ] Set `disabled` and click/keyboard the trigger — verify the bib does not open

## Depth

### Hover

[ ] With `hoverToggle`, move the mouse onto the trigger and off again — verify the open/close timing feels right with no flicker as the pointer crosses the trigger/bib gap

### Keyboard & Focus Indicator

[ ] Tab through the trigger and into bib content — verify every focusable stop shows a clearly visible focus indicator (not just DOM focus)
[ ] With `desktopModal`, Tab past the last focusable and Shift+Tab past the first — verify focus visibly wraps inside the bib and never lands on background content
[ ] Slot focusable custom content (`auro-input`, `auro-button`) into the trigger — verify it takes tab focus naturally, the focus ring is visible on it, and opening/closing behaves as expected

### Appearance & Theming

[ ] Verify `appearance="default"` and `appearance="inverse"` (and deprecated `onDark`) render correct trigger, chevron, and bib colors against light and dark backgrounds
[ ] Verify `simple`, `chevron`, `error`/`errorMessage`, and `auro-dropdownbib` flags (`rounded`, `inset`, `common`) render as intended
[ ] Verify text/icon contrast meets WCAG 2.1 AA in every appearance and in disabled/error states

### Positioning / Floating

[ ] Open near each viewport edge — verify the bib flips and shifts to stay fully on screen, and that `placement`, `autoPlacement`, `noFlip`, `shift`, and `offset` produce the expected real position
[ ] With `matchWidth`, verify the bib visually matches the trigger width; resize and reopen to confirm it updates
[ ] Place the dropdown inside `auro-dialog`/`auro-drawer` — verify the bib escapes the container's clipping and is not visually cut off

### Touch

[ ] On a real touch device, tap to open and tap outside/inside to close — verify tap targets respond and there is no double-tap or ghost-click delay
[ ] In fullscreen mode, drag the page background — verify it does not scroll; drag inside a scrollable bib region — verify that region scrolls

### Fullscreen / Mobile & Modal

[ ] On a real device below `fullscreenBreakpoint`, open the dropdown — verify the fullscreen dialog presents correctly, background is visually inert, and closing returns focus to the trigger
[ ] With `desktopModal` on desktop, verify the surrounding page is visibly non-interactive while open and interactive again after close
[ ] Resize across the breakpoint while open — verify the transition between popover and fullscreen looks correct with no layout jump

### Screen Reader

[ ] With VoiceOver/NVDA/JAWS, verify the trigger announces its role (button, or combobox with popup) and label
[ ] Open and close the bib — verify expanded/collapsed state is announced and bib content is reachable only while open
[ ] With `desktopModal` and in fullscreen, verify the reader cannot swipe to background content behind the dropdown
