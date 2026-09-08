# Manual Testing — auro-datepicker

Automated tests (`auro-datepicker.test.js`) already cover attribute reflection (value/valueEnd/values, range/layout/shape/size/appearance), date-constraint logic (minDate/maxDate/blackout/reference/central/calendarStart-End), localization and format derivation, placeholder/label wiring, behavior flags (disabled/required/noValidate), validation outcomes and message overrides, events, public methods, slot rendering, and open/close/navigation/parse logic. The manual cases below focus only on what automation cannot confirm: real visual rendering and theming, format display as perceived, focus-indicator visibility, actual touch and mobile/fullscreen behavior on device, real floating-position behavior against viewport edges, screen-reader announcements, and cross-browser rendering.

## Smoke Test

[ ] Load the component — verify it renders with the trigger input and placeholder text visible
[ ] Click the trigger — verify the calendar bib opens
[ ] Click a day cell — verify the date is selected, the input shows the formatted value, and the bib closes (desktop)
[ ] Type a valid date in the configured format into the input — verify it is accepted
[ ] In `range` mode, pick a start date then an end date — verify a highlighted range renders across the intervening cells and both inputs populate
[ ] With `required` set, blur the empty input — verify a visible error message appears
[ ] Tab to the trigger — verify a clearly visible focus indicator appears on the trigger input
[ ] Press Enter/Space to open, then arrow-navigate the grid — verify a visible focus ring tracks the active cell

## Depth

### Floating / positioning (desktop bib)

[ ] Open near each viewport edge — verify the bib flips to an alternate placement when there is insufficient space (default) and does NOT flip with `noFlip`
[ ] Open near a horizontal edge with `shift` — verify the bib slides along its axis to stay fully in the viewport
[ ] Set `offset` — verify a real visible gap appears between the trigger and the bib
[ ] With `autoPlacement`, open in various positions — verify the bib settles into a sensible, unobstructed position
[ ] Click outside the open bib — verify it closes and does not leave visual artifacts

### Appearance & Theming

[ ] Render each `layout` (`classic`, `snowflake`) — verify `classic` renders the standard bordered trigger and `snowflake` renders its label/display-value/accent styling correctly
[ ] Render each `shape` (`box`, `classic`, `pill`, `pill-left`, `pill-right`, `rounded`, `snowflake`) — verify corner radii render correctly and the pill left/right indents apply to the correct side, including in `range` mode where the trigger holds two inputs
[ ] Render each `size` (`xs`, `sm`, `md`, `lg`, `xl` — default `lg`) — verify the trigger scales proportionally without clipping the label or icon, and the calendar bib stays correctly positioned against it
[ ] Verify the focus indicator is clearly visible on the trigger input, clear button, month-nav buttons, active calendar cell (focus ring), and Done/close buttons
[ ] Verify blackout cells render with their distinct disabled-but-in-range styling
[ ] Verify reference-date cells are visually indicated, and `popover_YYYY_MM_DD` content renders in the cell popover on hover/focus
[ ] Verify `date_YYYY_MM_DD` slot content renders inside the cell, and the `highlight` attribute applies the success-state token color
[ ] Arrow-navigate the calendar with `prefers-reduced-motion: reduce` on, then off — verify cells scroll into view instantly in **both** states. Unlike select and combobox, the calendar does not branch on the setting: `scrollToActiveCell` always uses `behavior: 'auto'` (see the rationale comment at `src/auro-calendar.js:1611`), so any smooth or animated scroll here is a regression regardless of the OS setting

### Localization & Format display

[ ] Set non-English locales (e.g. `fr-FR`, `de-DE`, `ko-KR`) — verify localized month names and calendar strings display correctly (accents, non-Latin scripts)
[ ] Verify the perceived date grouping/separators match the active format (e.g. `dd/mm/yyyy` vs `yyyy-mm-dd`) in the input and the fullscreen header mask
[ ] Verify the input mask visibly guides typed input in the configured format
[ ] Set `inputmode="numeric"` — on a real mobile device, verify a numeric keypad appears when the input is focused

### Touch / Tap (device)

[ ] Tap the trigger — verify the bib opens (fullscreen at mobile breakpoint, popover at desktop)
[ ] Tap a date cell — verify the date is selected with no accidental double-selection
[ ] Tap month-nav buttons and the clear/close/Done buttons — verify each responds cleanly to touch
[ ] Scroll through months in the fullscreen calendar — verify smooth vertical scrolling with no scroll-blocking or accidental cell selection near touch targets
[ ] In range mode, tap start then end — verify the range highlights as expected under touch

### Fullscreen / Mobile (device)

[ ] Open at a mobile breakpoint — verify the fullscreen dialog opens as a true modal in the top layer with the background visually and interactively inert
[ ] Verify the fullscreen headline, from/to labels, and formatted placeholder strings display correctly in the header
[ ] Verify initial focus lands on the calendar grid with the active cell, not the close button
[ ] Resize the viewport across the `fullscreenBreakpoint` while open — verify a clean transition between fullscreen and floating layouts with focus preserved
[ ] Close via the close button, Escape, or selecting a date — verify focus returns to the trigger and the dialog dismisses cleanly
[ ] Place inside `auro-dialog`/`auro-drawer` — verify Escape closes only the calendar and does not leak to the parent

### Cross-browser

[ ] Repeat the smoke test and spot-check theming, floating position, and fullscreen behavior across supported browsers (Chrome, Safari, Firefox, Edge) and on at least one iOS and one Android device

### Screen Reader

[ ] Focus the trigger — verify the label, required/optional state, and any error message are announced
[ ] Open the bib — verify the calendar grid is announced (calendar roledescription and `calendarGridLabel`)
[ ] Arrow-navigate cells — verify the live region announces the full date context (localized date, range position, popover text, blackout label) after each move without dropping or overlapping announcements
[ ] Verify selected/today/blackout/disabled states are conveyed (aria-selected, aria-current, aria-disabled)
[ ] In range mode, verify start/end and in-preview cells announce the correct configured range labels (`rangeLabelStart`/`End`/`EndPreview`/`InRange`/etc.)
[ ] Verify nav-button, clear-button, and fullscreen close-button labels are announced from their configured strings
[ ] Verify validation error text is announced via aria-live when validity fails
[ ] In fullscreen mode, verify the virtual cursor cannot reach content behind the inert dialog
[ ] Verify a `disabled` datepicker is reachable by the virtual cursor but skipped by Tab
