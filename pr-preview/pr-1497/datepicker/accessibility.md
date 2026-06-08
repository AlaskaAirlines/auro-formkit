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

<auro-header level="2" id="focusManagement">Focus Management</auro-header>
The component uses `delegatesFocus: true` on its shadow root, meaning focus is automatically delegated to the first focusable element inside the component (the date input).

When the calendar bib opens on small viewports as a fullscreen modal dialog, focus is moved to the dialog's close button, giving screen reader users an immediate action to dismiss it.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
- **Validation errors** — When a validation error occurs, the error message is rendered with `role="alert"` and `aria-live="assertive"`, causing it to be announced immediately without requiring focus.
- **Help text** — The help text content is associated with the input so that screen readers announce it as part of the element description when focused.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- The `fromLabel` slot content is used as the accessible name for the first date input.
- When `range` is set, the `toLabel` slot content provides the accessible name for the second date input.
- The `label` slot is used as the main label when `layout="snowflake"`.
- A label is required. Without it, assistive technology users will not have context for what the datepicker controls.

<auro-header level="2" id="fullscreenBehavior">Fullscreen (Modal) Behavior</auro-header>
On smaller viewports, the calendar bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping** — only elements inside the dialog are reachable via Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- A close button inside the dialog is focused when the modal opens, giving screen reader users an immediate action to dismiss it.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

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
