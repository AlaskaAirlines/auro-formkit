<auro-header level="1" id="overview">Datepicker: Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-datepicker` component is built on top of `auro-dropdown` and `auro-input`, combining their accessibility features with a calendar interface. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>
<auro-header level="3" id="trigger">Trigger input</auro-header>
The trigger contains one or two `<auro-input>` elements (depending on whether `range` is set). Each input exposes standard ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `<label for>` | slot text | The input gets its accessible name from a `<label>` that holds the `fromLabel` or `toLabel` slot content. |
| `aria-invalid` | `true` / `false` | Set to `true` when the value fails validation and `false` when it passes. It's also `true` before the datepicker is first validated, so screen readers can announce a new, empty datepicker as invalid. |

<auro-header level="3" id="clearButton">Clear button</auro-header>
The clear button (shown when the input has a value) exposes:

| Attribute | Value | Description |
|---|---|---|
| `aria-label` | slot text or i18n default | Receives its accessible name from the `ariaLabel.input.clear` slot, falling back to a localized default. |

<auro-header level="3" id="helpTextAndErrors">Help text and errors</auro-header>
- Help text shows below the datepicker. It isn't currently linked to the inputs with `aria-describedby`, so screen readers don't read it as part of an input's description.
- When validation fails, the datepicker renders the error message with `role="alert"` and `aria-live="assertive"`, so screen readers announce it immediately.

<auro-header level="3" id="calendarGrid">Calendar grid</auro-header>
The calendar uses the WAI-ARIA grid pattern for screen reader navigation:

| Attribute | Applied to | Description |
|---|---|---|
| `role="grid"` | Calendar table | Identifies each month's days as a grid. The month heading above the grid is visible text that screen readers can reach, but it isn't linked to the grid as its name. The live region described below announces month changes. |
| `role="rowgroup"` | Body group | Groups the week rows. |
| `role="row"` | Week row | Groups each week of date cells. |
| `role="columnheader"` | Day-of-week header | Each weekday cell in the header row exposes the abbreviated day name as visible text and the full localized day name via `aria-label`, for example `aria-label="Sunday"`. |
| `role="gridcell"` | In-range date cell | Each selectable date cell. Includes `aria-selected`, `aria-current="date"` (for today), and an `aria-label` on the host with the full localized date string. |
| Out-of-range date cell | Cells outside the valid min/max range | The button uses the native `disabled` attribute (spec-compliant way to express "not actionable" on a `<button>`) and is filtered out of keyboard navigation. The host cell drops its `role` and `aria-label` so screen readers don't browse into it. No `aria-hidden` or `role="presentation"` is applied. |
| `aria-disabled="true"` | Blackout date cell | Cells for the dates in `blackoutDates`. Unlike out-of-range cells, blackout cells **remain reachable** with the arrow keys, so screen reader users can discover them. The cell's label adds the `blackoutLabel` text, ", unavailable" by default, to say the date can't be selected. |
| `aria-selected` | Date cell host | `"true"` for the selected date(s), `"false"` for all other in-range cells. |
| Accessible name | Date cell host | Provided via `aria-label` on the cell host element, kept in sync as the date and selection change, with the button's inner content marked `aria-hidden="true"` so screen readers don't double-announce. Localized label built from `Intl.DateTimeFormat` (weekday, month, day, year), plus any date slot content, such as a price, any popover slot content, the range position label, such as "range start", and availability status (", unavailable" for blackout dates). |

<auro-header level="2" id="focusManagement">Focus management</auro-header>
The component uses `delegatesFocus: true` on its shadow root, meaning focus is automatically delegated to the first focusable element inside the component (the date input).

<auro-header level="3" id="activeCellTracking">Active cell tracking</auro-header>
The calendar tracks a single active cell across the rendered month(s). DOM focus stays on the `#calendarGrid` wrapper the entire time; arrow keys never move focus onto individual cell buttons. `setActiveCell()` imperatively marks the chosen cell (adds the `active` property on the cell host and an `.activeCell` class on its button) without a Lit re-render. Screen-reader awareness of the active cell is provided by an `aria-live` region rather than by `aria-activedescendant`, so the reader is never asked to shift its point of regard on every arrow keypress. A debounce coalesces bursts (see [Screen reader announcements](#screenReaderAnnouncements)).

The active cell receives an `.activeCell` CSS class to display a visible focus ring, since the native `:focus-visible` pseudo-class applies to the grid wrapper (which holds actual DOM focus), not to individual cells.

The initial active cell is determined in priority order:

1. The selected date, if it's within the `minDate` to `maxDate` range.
2. Today's date, if it's in the month shown and enabled.
3. The first enabled date in the months shown.
4. The nearest enabled date after today, then before today.

<auro-header level="3" id="focusOnOpen">Focus on open</auro-header>
When the calendar bib opens, focus moves to the calendar grid wrapper (`#calendarGrid`). The initial active cell is marked via `setActiveCell()`, and the `aria-live` region announces its full localized label so screen readers describe the starting position. This applies to both desktop and fullscreen modes.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>
- **Date selection**: When a date is selected, the calendar's live region (`aria-live="assertive"`) announces the formatted date followed by "selected", for example "Wednesday, January 15, 2025, selected". For range datepickers, both the start and end date selections are announced, with the `rangeLabelStart` or `rangeLabelEnd` text.
- **Debounced navigation announcement**: During arrow-key navigation, a debounced live region (150 ms) announces the full date context (date, slot content, range position, availability) after the user pauses. This prevents overlapping announcements during rapid navigation.
- **Date cell labels**: Each date cell has an `aria-label` on the host element with the full localized label, including any date slot content, such as a price. The cell's button content is hidden from screen readers, so the date isn't read twice.
- **Validation errors**: When a validation error occurs, the error message is rendered with `role="alert"` and `aria-live="assertive"`, causing it to be announced immediately without requiring focus.
- **Help text**: The help text isn't currently linked to the inputs with `aria-describedby`, so screen readers don't announce it when an input gets focus.

<auro-header level="3" id="ariaLiveDeviation">Documented deviation: `aria-live="assertive"` for arrow-key navigation</auro-header>
WCAG 2.1 SC 4.1.3 (Status Messages) generally recommends `aria-live="polite"` for non-critical status updates so screen readers don't interrupt the user. The calendar's navigation live region intentionally uses `aria-live="assertive"` instead. This is a knowing deviation, made for the following reasons:

- **VoiceOver behavior**: VoiceOver treats `polite` announcements as "wait until idle," and during active arrow-key traversal the screen reader is never idle. Polite announcements are silently dropped, leaving keyboard users with no feedback about which cell is now active. `assertive` is the only reliable way to communicate the newly focused date on macOS/iOS VoiceOver during navigation.
- **Interruption mitigation**: The calendar waits 150 ms after the last arrow key before it announces, so screen readers hear only the final cell after a burst of arrow keys. Rapid navigation produces one announcement per pause, not one per keystroke, which minimizes the interruption cost of `assertive`.
- **Scope**: The same live region is reused for date selection and month-change announcements, all of which are user-initiated and expected. It's never used for background/system-generated updates.

Consumers auditing against APG or WCAG 4.1.3 should treat this as an intentional, documented trade-off between spec-preferred politeness and reliable VoiceOver support.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>
- The `fromLabel` slot content is used as the accessible name for the first date input. It's also forwarded to the dropdown bib as the dialog's accessible name (`aria-labelledby`).
- When `range` is set, the `toLabel` slot content provides the accessible name for the second date input.
- The `label` slot is used as the main label when `layout="snowflake"`.
- The `ariaLabel.bib.close` slot sets the close button's accessible name in fullscreen mode. It has no default, so always provide it.
- The `ariaLabel.input.clear` slot customizes the clear button label (falls back to a localized default).
- A label is required. Without it, screen reader users don't have context for what the datepicker controls.

<auro-header level="3" id="rangeLabels">Configurable range labels</auro-header>
When `range` is set, each date cell's label includes its position relative to the selected range. These labels are configurable via attributes for localization:

| Attribute | Default | Description |
|---|---|---|
| `rangeLabelStart` | "range start" | Announced for the range start date. |
| `rangeLabelEnd` | "range end" | Announced for the range end date. |
| `rangeLabelBeforeRange` | "before range" | Announced for dates before the range start. |
| `rangeLabelInRange` | "in range" | Announced for dates within the selected range. |
| `rangeLabelAfterRange` | "after range" | Announced for dates after a fully selected range. |
| `rangeLabelEndPreview` | "previewing range end" | Announced for dates after the start date while someone is choosing the end date, so screen reader users know that pressing Enter makes that date the end of the range. |

<auro-header level="2" id="fullscreenBehavior">Fullscreen (modal) behavior</auro-header>
On smaller viewports, the calendar bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping**: only elements inside the dialog are reachable via Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- The trigger input is set to `inert` while the fullscreen dialog is open, preventing VoiceOver from reaching it behind the dialog.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

<auro-header level="2" id="desktopModalBehavior">Desktop modal behavior</auro-header>
On larger viewports, the datepicker opens as a popover with modal-like focus management:

- Sibling elements of the dropdown host are set to `inert`, preventing interaction with the rest of the page while the calendar is open.
- Tab and Shift+Tab are trapped within the bib content, wrapping focus between the first and last focusable elements.
- Inertness and focus trapping are cleaned up when the bib closes or the component is disconnected.

<auro-header level="2" id="reducedMotion">Reduced motion</auro-header>
The calendar always scrolls instantly, without smooth-scroll animation, so it doesn't add motion for people who set `prefers-reduced-motion`. It doesn't read the media query itself.

<auro-header level="2" id="formParticipation">Form participation</auro-header>
The datepicker's native `<input>` elements are the visible text fields people type in, and they sit inside shadow DOM, so a native `<form>` doesn't submit them. Place the datepicker in an `<auro-form>`, which collects its `value`, or its `values` array for a range, under the datepicker's `name` attribute.

</div>
</div>
</div>
