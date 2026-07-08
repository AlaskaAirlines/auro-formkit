# Manual Testing — auro-datepicker

This test plan covers every way a consuming engineer can configure `auro-datepicker` and every way a user can interact with it.

Unless otherwise noted, each configuration test should be run in both **single date** (`range` unset) and **date range** (`range` set) modes, and each interaction test should be verified at both **desktop** (popover bib) and **mobile** (fullscreen dialog) breakpoints.

---

## 1. Consumer Configuration

### 1.1 Value & Preset State

#### `value` (single date and range start)
- [ ] Preset `value="2026-07-15"` — verify the input renders the formatted date and the calendar highlights that date on open
- [ ] Preset `value=""` — verify the input renders empty
- [ ] Programmatically update `value` after render — verify the input, calendar highlight, and `centralDate` all update
- [ ] Set `value` to an invalid string — verify `valueObject` becomes `undefined`, the calendar does not highlight/select a date, and the component does not throw (the input may reflect the raw string)

#### `valueEnd` (range mode)
- [ ] Preset `valueEnd="2026-07-20"` with `value="2026-07-15"` and `range` — verify both inputs render and the calendar shows the range highlighted
- [ ] Preset `valueEnd` without `value` in range mode — verify no range is highlighted until `value` is also set
- [ ] Preset `valueEnd` earlier than `value` — verify `valueEnd` is cleared (component enforces `value <= valueEnd`)
- [ ] Read `valueEnd` after user range selection — verify it matches the end date
- [ ] Verify `valueEndObject` getter behaves like `valueObject`

#### `values` (readonly convenience getter)
- [ ] With no value set — verify `values` returns `[]`
- [ ] With only `value` set in range mode — verify `values` returns `[value]`
- [ ] With `value` and `valueEnd` set in range mode — verify `values` returns `[value, valueEnd]`

### 1.2 Mode & Layout

#### `range`
- [ ] Set `range` — verify two inputs (from/to) render, with a divider between them
- [ ] Unset `range` — verify only the single from input renders
- [ ] Toggle `range` at runtime — verify inputs re-render and existing `value`/`valueEnd` behave correctly. **Known issue:** currently fails (does not block v6). Tracking: [1592215](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1592215)

#### `layout`
- [ ] `layout="classic"` (default) — verify the standard input rendering
- [ ] `layout="snowflake"` — verify the snowflake visual style (label slot, display value, accents)
- [ ] Verify the `label` slot renders as the datepicker label only when `layout="snowflake"`

#### `shape` / `size`
- [ ] Set `shape` — verify the input trigger updates its shape
- [ ] Set `size` — verify the input trigger updates its size (default `"lg"`)

#### `appearance` / `onDark` (deprecated)
- [ ] `appearance="default"` — verify default appearance
- [ ] `appearance="inverse"` — verify inverse (dark background) appearance
- [ ] `onDark` (deprecated) — verify it still applies inverse appearance and does not break

#### `dvInputOnly`
- [ ] With `dvInputOnly` and custom `displayValue` slot content — verify only the HTML input is masked; the label is not
- [ ] Without `dvInputOnly` and custom `displayValue` slot content — verify both label and input are masked when a value is present

### 1.3 Date Constraints

#### `minDate` / `maxDate`
- [ ] Set `minDate="2026-07-01"` — verify dates before are visually disabled and non-selectable via mouse, touch, and keyboard
- [ ] Set `maxDate="2026-07-31"` — verify dates after are visually disabled and non-selectable
- [ ] Set both — verify only dates inside the window are selectable
- [ ] Set `minDate` later than existing `value` at runtime — verify `value` (and `valueEnd`) get cleared and `calendarFocusDate` moves to `minDate`
- [ ] Set `maxDate` earlier than existing `value` at runtime — verify `value` (and `valueEnd`) get cleared and central date moves to `maxDate`
- [ ] Type a date outside min/max into the input and blur — verify `rangeUnderflow` / `rangeOverflow` validation fires

#### `calendarStartDate` / `calendarEndDate`
- [ ] Set `calendarStartDate` — verify the calendar cannot navigate to months before this date (prev-month button hidden at boundary)
- [ ] Set `calendarEndDate` — verify the calendar cannot navigate to months after this date (next-month button hidden at boundary)
- [ ] Verify constructor uses `calendarStartDate` as the initial central date when set
- [ ] Verify `calendarStartDateObject` / `calendarEndDateObject` getters

#### `centralDate`
- [ ] Set `centralDate="2026-07-15"` and open — verify July 2026 is the initial visible month
- [ ] Change `centralDate` at runtime — verify the visible month(s) update
- [ ] Verify `centralDateObject` getter

#### `calendarFocusDate`
- [ ] Set `calendarFocusDate` different from `value` — verify the calendar opens focused on that month on first open
- [ ] Change `calendarFocusDate` at runtime — verify the central date and mobile scroll position update
- [ ] Verify `calendarFocusDateObject` getter

#### `blackoutDates`
- [ ] Set `blackoutDates='["2026-07-04","2026-07-05"]'` — verify those cells render disabled-but-in-range (blackout style) and are non-selectable
- [ ] Verify a screen reader announces the `blackoutLabel` (default `"unavailable"`) on a blackout cell
- [ ] Change `blackoutDates` at runtime — verify cells re-render with updated state and any existing selected date is re-validated (custom error if selected date is now blackout)
- [ ] Type a blackout date into the input and blur — verify `customError` validation fires with the `setCustomValidityCustomError` (or default `"Selected date is unavailable"`) message
- [ ] Verify keyboard arrow keys still land on a blackout cell (focusable) but Enter/Space does not select it

#### `referenceDates`
- [ ] Set `referenceDates='["2026-07-10","2026-07-20"]'` — verify those cells are visually indicated as reference dates
- [ ] Combine with `popover_YYYY_MM_DD` slot content — verify the popover renders for reference date cells on focus/hover
- [ ] Update `referenceDates` at runtime — verify calendar cells re-render

### 1.4 Localization & Format

#### `locale`
- [ ] Set `locale="fr-FR"` — verify the date format defaults to DD/MM/YYYY based on locale and month names are French
- [ ] Set `locale="ko-KR"` — verify appropriate calendar strings
- [ ] Set `locale="de-DE"` — verify German month names
- [ ] Omit `locale` — verify component inherits from ancestor `data-locale` if present, else defaults to `en-US`
- [ ] Set `locale` to an invalid string (e.g. `"xx-XX"`) — verify a one-time `console.debug` warning is logged and the component falls back to `en-US`
- [ ] Change `locale` at runtime — verify `format`, month names, and screen-reader strings update

#### `format`
- [ ] Set `format="mm/dd/yyyy"` — verify the input mask uses MM/DD/YYYY
- [ ] Set `format="dd/mm/yyyy"` — verify the input mask uses DD/MM/YYYY
- [ ] Set `format="yyyy-mm-dd"` — verify the input mask uses YYYY-MM-DD
- [ ] Override `format` while `locale` is set — verify explicit `format` wins over locale default

#### `monthNames`
- [ ] Set `monthNames='["Jan","Feb",...12 names]'` — verify the calendar renders with those custom names
- [ ] Omit `monthNames` — verify names come from the active `locale`

#### `inputmode`
- [ ] Set `inputmode="numeric"` — verify mobile devices show a numeric keypad when the input is focused

### 1.5 Placeholder & Labels

#### `placeholder` / `placeholderEndDate`
- [ ] Set `placeholder="Depart"` — verify it displays in the empty input (`value`)
- [ ] Set `placeholderEndDate="Return"` with `range` — verify it displays in the second input (`valueEnd`) only while empty
- [ ] Set `placeholder` only with `range` — verify both inputs use `placeholder`
- [ ] Type a value — verify the placeholder disappears

#### Range labels (screen-reader strings)
- Execute the steps in this section for both scenarios:
- [ ] `value` is set, `valueEnd` is not set
    - [ ] Set `rangeLabelStart` — verify screen reader announces these on start cells
    - [ ] Set `rangeLabelEnd` — verify screen reader announces these on end cells
    - [ ] Set `rangeLabelEndPreview` — verify this announces on focused cells past `value` while `valueEnd` is not yet selected (previewing the range end)
    - [ ] Set `rangeLabelBeforeRange` — verify this announces for cells relative to start cells
- [ ] `value` and `valueEnd` are both set
    - [ ] Set `rangeLabelStart` — verify screen reader announces these on start cells
    - [ ] Set `rangeLabelEnd` — verify screen reader announces these on end cells
    - [ ] Set `rangeLabelBeforeRange` / `rangeLabelInRange` / `rangeLabelAfterRange` — verify these announce for cells relative to a fully selected range

#### Nav & grid labels
- [ ] Set `navLabelPrevMonth` / `navLabelNextMonth` — verify screen reader announces these on the month-nav buttons
- [ ] Set `calendarGridLabel` — verify the calendar grid wrapper's `aria-label` uses this value
- [ ] Set `blackoutLabel="sold out"` — verify blackout cell announcements use this string

### 1.6 Behavior Flags

#### `disabled`
- [ ] Set `disabled` — verify the input is non-interactive, the trigger cannot be opened, and the component is removed from `tabindex` sequence
- [ ] Verify VoiceOver's virtual cursor can still reach a disabled datepicker (but Tab skips it)
- [ ] Remove `disabled` at runtime — verify the component becomes interactive again and prior tabindex is restored

#### `required`
- [ ] Set `required` — verify the input renders without the "(optional)" text
- [ ] Blur with no value and `required` set — verify `valueMissing` validation fires
- [ ] Select a date after `valueMissing` — verify the error clears

#### `noValidate`
- [ ] Set `noValidate` — verify no auto-validation fires on blur
- [ ] Unset `noValidate` — verify auto-validation resumes
- [ ] With `noValidate`, call `validate(true)` — verify validation still runs when forced

#### `error` (persistent custom error)
- [ ] Set `error="Something is wrong"` — verify persistent `customError` validity state with that message
- [ ] Remove `error` — verify the custom error clears

### 1.7 Validation Message Overrides

- [ ] `setCustomValidity="General msg"` — verify the message displays for all validity states
- [ ] `setCustomValidityValueMissing="Pick a date"` — verify it overrides the default `valueMissing` message
- [ ] `setCustomValidityRangeOverflow="Too late"` — verify it displays when the date is past `maxDate`
- [ ] `setCustomValidityRangeUnderflow="Too early"` — verify it displays when the date is before `minDate`
- [ ] `setCustomValidityCustomError="Blackout!"` — verify it displays when a blackout date is typed into the input

### 1.8 Fullscreen / Mobile

#### `fullscreenBreakpoint`
- [ ] `fullscreenBreakpoint="xs"` — verify fullscreen only at xs breakpoint
- [ ] `fullscreenBreakpoint="sm"` (default) — verify fullscreen at ≤sm
- [ ] `fullscreenBreakpoint="md"` / `"lg"` / `"xl"` — verify fullscreen up to specified breakpoint
- [ ] `fullscreenBreakpoint="disabled"` — verify the bib never enters fullscreen at any viewport size
- [ ] Resize viewport across the breakpoint while the bib is open — verify the layout transitions between fullscreen and floating, focus is restored to the active calendar cell, and the trigger's `inert` state is managed correctly

#### `largeFullscreenHeadline`
- [ ] Without flag — verify fullscreen headline renders as Heading 600
- [ ] With flag — verify fullscreen headline renders as HeadingDisplay (larger)

### 1.9 Floating (Desktop Bib) Position

- [ ] `placement="bottom-start"` (default) — verify bib appears below and left-aligned with the trigger
- [ ] Set `placement` to each of top, right, bottom, left, and their `-start`/`-end` variants — verify placement matches
- [ ] `autoPlacement` — verify placement auto-computes best position
- [ ] `noFlip` — verify the bib does NOT flip when there is insufficient space
- [ ] Without `noFlip` — verify the bib flips to alternate placement when space is insufficient
- [ ] `shift` — verify the bib shifts along its axis to stay in the viewport
- [ ] `offset="20"` — verify a 20px gap appears between the trigger and the bib

### 1.10 Slots

- [ ] `fromLabel` — verify it renders as the first input's label
- [ ] `toLabel` (range mode) — verify it renders as the second input's label
- [ ] `label` (snowflake layout) — verify it renders as the datepicker label
- [ ] `optionalFromLabel` — verify it overrides the default "(optional)" text on the first input when not `required`
- [ ] `optionalToLabel` — verify it overrides the default "(optional)" text on the second input when not `required`
- [ ] `helpText` — verify it renders below the datepicker in the default (non-error) state
- [ ] `ariaLabel.input.clear` — verify screen reader announces this on the clear button
- [ ] `ariaLabel.bib.close` — verify screen reader announces this on the fullscreen close button
- [ ] `bib.fullscreen.headline` — verify it renders in the fullscreen dialog header
- [ ] `bib.fullscreen.fromLabel` — verify it renders above the from-date in fullscreen
- [ ] `bib.fullscreen.toLabel` (range mode) — verify it renders above the to-date in fullscreen
- [ ] `bib.fullscreen.dateLabel` (deprecated) — verify it still renders but confirm consumer is warned to migrate to `fromLabel`
- [ ] `date_YYYY_MM_DD` slot (e.g. `date_2026_07_15`) — verify the content renders inside that calendar cell
- [ ] `date_YYYY_MM_DD` slot with `highlight` attribute — verify the text uses the success-state token color
- [ ] `popover_YYYY_MM_DD` slot — verify the content renders in the cell popover on hover/focus and is announced by screen reader after the date
- [ ] `displayValue` slot (snowflake) — verify it masks the input value display

### 1.11 Container Composition

- [ ] Place `<auro-datepicker>` inside an `<auro-dialog>` — verify open/close, focus management, and Escape work without leaking to the parent dialog
- [ ] Place inside an `<auro-drawer>` — verify the same, and that reparenting (drawer teardown) does not break listeners
- [ ] Verify that closing the calendar with Escape does NOT also close the parent dialog/drawer

---

## 2. User Interactions

### 2.1 Mouse

#### Opening / closing
- [ ] Click the trigger input — verify the calendar bib opens
- [ ] Click the trigger while the bib is open — verify it stays open (does not toggle closed via trigger)
- [ ] Click outside the bib when open — verify the bib closes
- [ ] Click the "Done" button in the desktop-modal footer — verify the bib closes
- [ ] Click the close button in fullscreen — verify the dialog closes and focus returns to the trigger
- [ ] Click the trigger when `disabled` — verify nothing happens

#### Selecting dates (single mode)
- [ ] Click a date in the calendar — verify the date is selected, the input displays the formatted value, and the bib closes (desktop) / stays open (mobile fullscreen)
- [ ] Click a different date after selection — verify the new date replaces the previous one
- [ ] Click a disabled date (outside min/max) — verify no selection occurs
- [ ] Click a blackout date — verify no selection occurs

#### Selecting dates (range mode)
- [ ] Click a first date — verify it is highlighted as range start
- [ ] Move mouse across other dates — verify a range preview highlights cells between start and hovered cell
- [ ] Move mouse away from the calendar — verify the range preview clears
- [ ] Click a second date after the start — verify the range is fully selected and both inputs populate
- [ ] Click a date before the current start — verify the start is reset to the new date (or valueEnd is cleared per component logic)
- [ ] Click a new first date after a full range is set — verify the range resets with the new start date
- [ ] Click clear button on the start input — verify only the start clears
- [ ] Click clear button on the end input — verify only the end clears

#### Month navigation
- [ ] Click the previous-month button — verify the calendar navigates one month back
- [ ] Click the next-month button — verify the calendar navigates one month forward
- [ ] Verify the previous-month button is hidden when at `minDate` / `calendarStartDate` boundary
- [ ] Verify the next-month button is hidden when at `maxDate` / `calendarEndDate` boundary
- [ ] Verify `auroDatePicker-monthChanged` event fires on each nav

#### Clear button
- [ ] With a value set, click the X clear button — verify value(s) clear and focus returns to the input
- [ ] With no value, verify the clear button is hidden

### 2.2 Keyboard

#### Trigger input
- [ ] Tab to the trigger input — verify it receives focus
- [ ] Tab out of the trigger when no value — verify focus moves to the next focusable element (clear button is hidden)
- [ ] Tab through when a value is present — verify the clear button receives focus after the input
- [ ] Enter/Space on the trigger (not the clear button) — verify the bib opens and focus moves into the calendar grid with `aria-activedescendant` pointing at the active cell
- [ ] Enter/Space on the clear button — verify the value clears and focus returns to the input (does NOT open the bib)
- [ ] Enter/Space with Ctrl/Meta/Alt modifier — verify it opens the bib (modifiers are not currently special-cased)
- [ ] Escape on the trigger — verify nothing happens if the bib is closed

#### Direct typing
- [ ] Type a date in the configured format — verify the value is accepted and the calendar reflects it on next open
- [ ] Type an incomplete date and blur — verify validation fires (or does not, per `noValidate`)
- [ ] Type an out-of-range date (past `min`/`max`) and blur — verify `rangeUnderflow` / `rangeOverflow` fires
- [ ] Type a blackout date and blur — verify `customError` fires with the blackout message
- [ ] Verify the input mask (from `format`) guides typed input

#### Calendar grid
- [ ] Open the bib with keyboard — verify the calendar grid receives focus and the active cell is announced via the live region
- [ ] ArrowRight — verify the active cell moves to the next day; at end of month, navigates to first focusable day of next month
- [ ] ArrowLeft — verify the active cell moves to the previous day; at start of month, navigates to last focusable day of previous month
- [ ] ArrowDown — verify the active cell moves +7 days (same day of week next week); crosses month boundary as needed
- [ ] ArrowUp — verify the active cell moves −7 days; crosses month boundary as needed
- [ ] Verify arrow keys do NOT move past `minDate` / `maxDate` / `calendarStartDate` / `calendarEndDate`
- [ ] Verify arrow keys move through blackout cells (blackout is focusable but not selectable)
- [ ] Enter or Space on an active enabled cell — verify the date is selected
- [ ] Enter or Space on a blackout cell — verify no selection occurs
- [ ] After each arrow key movement, verify the debounced live region announces the full date context (date, range position, popover text, blackout status) after a short pause
- [ ] Escape — verify the bib closes and focus returns to the trigger input, and that Escape does NOT propagate to any parent auro-dialog/auro-drawer
- [ ] Tab — verify focus moves to the next focusable element outside the calendar grid (e.g. month-nav buttons or fullscreen close button)

#### Range mode (keyboard)
- [ ] Select a start date via Enter — verify start is set and subsequent arrow-key movement previews the range end
- [ ] Verify the focused-cell announcement uses `rangeLabelEndPreview` while previewing
- [ ] Select a second date via Enter — verify the range completes and appropriate range-end announcement fires
- [ ] Attempt to select a date before the start via Enter — verify component logic (resets start or ignores per implementation)

### 2.3 Touch / Tap

- [ ] Tap the trigger — verify the bib opens (fullscreen at mobile breakpoint, popover at desktop)
- [ ] Tap a date cell — verify the date is selected
- [ ] Tap outside the bib (desktop only) — verify the bib closes
- [ ] Tap the fullscreen close button — verify the dialog closes and focus returns to the trigger
- [ ] Tap the Done button in the desktop-modal footer — verify the bib closes
- [ ] Tap month nav buttons — verify calendar navigates
- [ ] Tap the clear button — verify value(s) clear
- [ ] Scroll through months in fullscreen — verify smooth vertical scrolling of all rendered months
- [ ] Tap-and-hold or scroll near cells — verify no accidental selection or scroll-blocking (touch passthrough guard)

### 2.4 Fullscreen (Mobile) Mode

- [ ] Open at mobile breakpoint — verify the fullscreen `<dialog>` opens as modal (top-layer, background inert to VoiceOver)
- [ ] Verify the trigger is `inert` while fullscreen is open
- [ ] Verify initial focus lands on the calendar grid with the active cell announced (not on the close button, unless the calendar grid cannot receive focus)
- [ ] Verify the `bib.fullscreen.headline`, `bib.fullscreen.fromLabel`, and (if range) `bib.fullscreen.toLabel` slot content displays
- [ ] Verify the from-date and to-date placeholder strings display in the header (formatted from `format`, uppercase mask)
- [ ] Tab through — verify focus cycles inside the dialog (browser-native focus containment) and does NOT leak to the page behind
- [ ] Escape — verify the dialog closes
- [ ] Close via close button — verify the dialog closes
- [ ] Verify focus returns to the trigger input when the dialog closes

### 2.5 Screen Reader

- [ ] Focus the trigger — verify the label, required state, and any error message are announced
- [ ] Open the bib — verify the calendar grid is announced (`aria-roledescription="calendar"`, `aria-label=calendarGridLabel`)
- [ ] Navigate cells with arrow keys — verify the debounced live region announces the full date context (localized date + range position + popover text + blackout label)
- [ ] Verify `aria-selected` reflects selected state, `aria-current="date"` reflects today, `aria-disabled="true"` reflects blackout
- [ ] Verify the clear button announces the `ariaLabel.input.clear` slot content
- [ ] Verify the fullscreen close button announces the `ariaLabel.bib.close` slot content
- [ ] In fullscreen mode, verify VoiceOver cannot swipe to content behind the dialog (background is inert)
- [ ] Verify error messages announce when validity fails

---

## 3. Validation

- [ ] `required` + empty + blur — verify `valueMissing`
- [ ] `minDate` set + earlier value programmatically or typed — verify `rangeUnderflow`
- [ ] `maxDate` set + later value programmatically or typed — verify `rangeOverflow`
- [ ] `blackoutDates` includes the value (typed or programmatically) — verify `customError` with the blackout message
- [ ] `error` attribute set — verify persistent `customError` with that message
- [ ] `noValidate` + blur — verify no auto-validation
- [ ] Set each `setCustomValidity*` variant — verify the correct override message displays
- [ ] `validate()` — verify current validity state is computed
- [ ] `validate(true)` — verify forced validation runs immediately even without user interaction (fires `auroFormElement-validated`)
- [ ] `hasError` getter — verify it returns `true` for any non-valid validity, `false` otherwise
- [ ] After `reset()` — verify validity clears and inputs are empty
- [ ] After `resetInputs()` — verify input values clear; note: this calls `auro-input.reset()` internally, which also clears each input’s validity state
- [ ] After `clear()` — verify input values are emptied (via `resetInputs()`), and input-level validity state is cleared

---

## 4. Events

- [ ] Open/close the bib — verify `auroDatePicker-toggled` fires with `detail.expanded`
- [ ] Navigate months (button click or keyboard cross-month) — verify `auroDatePicker-monthChanged` fires with `{month, year, numCalendars}`
- [ ] Type or select a date — verify the native `input` event fires with the new value
- [ ] Validation runs — verify `auroFormElement-validated` fires with `{validity, message}`
- [ ] Slot content changes (`blackoutDates`, `referenceDates`, or explicit `pushSlotContent()`) — verify `auroDatePicker-newSlotContent` fires and cells re-render

---

## 5. Public Methods

- [ ] `focus()` — verify the from-date input receives focus
- [ ] `focus('endDate')` in range mode — verify the to-date input receives focus
- [ ] `showBib()` — verify the calendar bib opens (no-op if already open)
- [ ] `hideBib()` — verify the calendar bib closes (no-op if already closed)
- [ ] `blur()` — verify the datepicker blurs and the bib is hidden
- [ ] `reset()` — verify inputs clear AND validation state resets
- [ ] `resetInputs()` — verify inputs clear WITHOUT touching validation state
- [ ] `clear()` — verify inputs clear (equivalent to `resetInputs()`)
- [ ] `validate()` — verify validation runs

---

## 6. Accessibility (WCAG 2.1 AA)

- [ ] Trigger input has appropriate label wiring, required indicator, and error announcement
- [ ] Calendar grid has `role="group"`, `aria-roledescription="calendar"`, and `aria-label` from `calendarGridLabel`
- [ ] Active cell state is conveyed via `aria-activedescendant` on the grid wrapper (DOM focus stays on the grid)
- [ ] `aria-selected`, `aria-current="date"`, and `aria-disabled="true"` are set appropriately per cell
- [ ] Focus indicator is visible on the trigger input, clear button, month-nav buttons, calendar grid wrapper (with active-cell ring), Done/close buttons
- [ ] Focus trap: in fullscreen dialog mode, Tab cycles inside the dialog and does not leak to the page behind
- [ ] Focus restoration: closing the bib (via Escape, Done, close button, or date selection where applicable) returns focus to the trigger input when the datepicker still has focus, and does NOT pull focus back if the user Tabbed away
- [ ] Live region announcements (grid focus changes, month changes, selection commits) do not overlap or drop — a short delay is applied so VoiceOver does not drop the initial active-cell announcement
