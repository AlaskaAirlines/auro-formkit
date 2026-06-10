<auro-header level="1" id="overview">Datepicker - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-datepicker` component is built on top of `auro-dropdown` and `auro-input`, combining their accessibility features with a calendar interface. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <a href="./keyboard-behavior.html">Keyboard Behavior</a> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>
<auro-header level="3" id="trigger">Trigger Input</auro-header>
The trigger contains one or two `<auro-input>` elements (depending on whether `range` is set). Each input exposes standard ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `aria-label` | slot text | The input receives its accessible name from the `fromLabel` or `toLabel` slot content. |
| `aria-invalid` | `true` / `false` | Reflects whether the current value fails validation. |

<auro-header level="3" id="clearButton">Clear Button</auro-header>
The clear button (shown when the input has a value) exposes:

| Attribute | Value | Description |
|---|---|---|
| `aria-label` | slot text or i18n default | Receives its accessible name from the `ariaLabel.input.clear` slot, falling back to a localized default. |

<auro-header level="3" id="helpTextAndErrors">Help Text and Errors</auro-header>
- Help text is associated with the component so screen readers can announce contextual guidance.
- When validation fails, the error message is rendered with `role="alert"` and `aria-live="assertive"` to ensure it is announced immediately.

<auro-header level="3" id="calendarGrid">Calendar Grid</auro-header>
The calendar uses the WAI-ARIA grid pattern for screen reader navigation:

| Attribute | Applied to | Description |
|---|---|---|
| `role="grid"` | Calendar table | Identifies the calendar as a grid. The month heading is rendered as visible text adjacent to the grid but is excluded from the accessibility tree (announcements are handled via the live region described below). |
| `role="rowgroup"` | Body group | Groups the week rows. The day-of-week header row is `aria-hidden="true"` (see below). |
| `role="row"` | Week row | Groups each week of date cells. |
| Day-of-week header | Day-of-week row | Rendered as visible `<abbr>` elements with the full day name in the `title` attribute, but the row is `aria-hidden="true"` since the per-cell accessible name already includes the weekday name. |
| `role="gridcell"` | In-range date cell, active-descendant proxy | Each selectable date cell. Includes `aria-selected`, `aria-current="date"` (for today), and a visually-hidden text label. A proxy `<span>` inside the calendar grid wrapper mirrors the active cell's ARIA attributes for `aria-activedescendant`. |
| `role="presentation"` | Out-of-range date cell | Cells outside the valid min/max range. Also receive `aria-hidden="true"` and `tabindex="-1"` to remove them from both the accessibility tree and the tab order. |
| `aria-disabled="true"` | Blackout date cell | Cells matching the `blackout` dates list. Unlike out-of-range cells, blackout cells **remain focusable** via arrow-key navigation so screen reader users can discover them. The cell's label includes ", unavailable" to communicate that the date cannot be selected. |
| `aria-selected` | Date cell button | `"true"` for the selected date(s), `"false"` for all other in-range cells. |
| Accessible name | Date cell button | Provided via visually-hidden text content (not an `aria-label` attribute). Localized label built from `Intl.DateTimeFormat` (weekday, month, day, year), plus any date slot content (e.g. prices), the range position label (e.g., "range start"), and availability status (", unavailable" for blackout dates). |

<auro-header level="2" id="focusManagement">Focus Management</auro-header>
The component uses `delegatesFocus: true` on its shadow root, meaning focus is automatically delegated to the first focusable element inside the component (the date input).

<auro-header level="3" id="ariaActivedescendant">aria-activedescendant</auro-header>
The calendar grid uses an **`aria-activedescendant`** pattern for keyboard navigation. DOM focus remains on a wrapper element (`#calendarGrid`) while `aria-activedescendant` points to a proxy `<span>` that mirrors the active cell's ARIA attributes (`aria-label`, `aria-selected`, `aria-current`, `aria-disabled`). This approach keeps the screen reader in sync with the visually active cell without moving DOM focus on every keystroke, which prevents duplicate announcements during rapid arrow-key navigation.

The active cell receives an `.activeCell` CSS class to display a visible focus ring, since the native `:focus-visible` pseudo-class applies to the grid wrapper (which holds actual DOM focus), not to individual cells.

The initial active cell is determined in priority order:

1. The currently selected date (if within the valid range).
2. Today's date (if enabled).
3. The first future enabled date.
4. The first past enabled date.

<auro-header level="3" id="focusOnOpen">Focus on Open</auro-header>
When the calendar bib opens, focus moves to the calendar grid wrapper (`#calendarGrid`). The `aria-activedescendant` attribute points to a proxy element that carries the active date cell's label, so screen readers announce the active date. This applies to both desktop and fullscreen modes.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
- **Date selection** — When a date is selected, the calendar's live region (`aria-live="assertive"`) announces the formatted date (e.g., "Wednesday, January 15, 2025"). For range datepickers, both the start and end date selections are announced.
- **Debounced navigation announcement** — During arrow-key navigation, a debounced live region (150 ms) announces the full date context (date, slot content, range position, availability) after the user pauses. This prevents overlapping announcements during rapid navigation.
- **Date cell labels** — Each date cell has an `aria-label` on the host element with the full localized label, including any date slot content (e.g. prices). VoiceOver reads this content instead of `aria-label`, which iOS VoiceOver does not reliably announce on buttons.
- **Validation errors** — When a validation error occurs, the error message is rendered with `role="alert"` and `aria-live="assertive"`, causing it to be announced immediately without requiring focus.
- **Help text** — The help text content is associated with the input so that screen readers announce it as part of the element description when focused.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- The `fromLabel` slot content is used as the accessible name for the first date input. It is also forwarded to the dropdown bib as the dialog's accessible name (`aria-labelledby`).
- When `range` is set, the `toLabel` slot content provides the accessible name for the second date input.
- The `label` slot is used as the main label when `layout="snowflake"`.
- The `ariaLabel.bib.close` slot customizes the close button label in fullscreen mode (defaults to "Close").
- The `ariaLabel.input.clear` slot customizes the clear button label (falls back to a localized default).
- A label is required. Without it, assistive technology users will not have context for what the datepicker controls.

<auro-header level="3" id="rangeLabels">Configurable Range Labels</auro-header>
When `range` is set, each date cell's label includes its position relative to the selected range. These labels are configurable via attributes for localization:

| Attribute | Default | Description |
|---|---|---|
| `rangeLabelStart` | "range start" | Announced for the range start date. |
| `rangeLabelEnd` | "range end" | Announced for the range end date. |
| `rangeLabelBeforeRange` | "before range" | Announced for dates before the range start. |
| `rangeLabelInRange` | "in range" | Announced for dates within the selected range. |
| `rangeLabelAfterRange` | "after range" | Announced for dates after the range (or after start when no end is selected). |

<auro-header level="2" id="fullscreenBehavior">Fullscreen (Modal) Behavior</auro-header>
On smaller viewports, the calendar bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping** — only elements inside the dialog are reachable via Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- The trigger input is set to `inert` while the fullscreen dialog is open, preventing VoiceOver from reaching it behind the dialog.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

<auro-header level="2" id="desktopModalBehavior">Desktop Modal Behavior</auro-header>
On larger viewports, the datepicker opens as a popover with modal-like focus management:

- Sibling elements of the dropdown host are set to `inert`, preventing interaction with the rest of the page while the calendar is open.
- Tab and Shift+Tab are trapped within the bib content, wrapping focus between the first and last focusable elements.
- Inertness and focus trapping are cleaned up when the bib closes or the component is disconnected.

<auro-header level="2" id="reducedMotion">Reduced Motion</auro-header>
The component respects the `prefers-reduced-motion` media query. When the user has requested reduced motion, scroll animations use instant scrolling instead of smooth scrolling.

<auro-header level="2" id="formParticipation">Form Participation</auro-header>
The datepicker integrates with HTML forms through its internal `<auro-input>` elements, which render hidden native `<input>` elements with `aria-hidden="true"`. These elements:

- Participate in HTML form submissions, ensuring the selected date value(s) are included in form data.
- Support the `required` and `disabled` attributes.
- Are invisible and unreachable by assistive technology — all user interaction goes through the custom component.

</div>
</div>
</div>
