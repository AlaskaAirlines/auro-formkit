<auro-header level="1" id="overview">Input - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-input` component renders a native HTML `<input>` element inside its shadow DOM and augments it with custom label, help text, and validation UI. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <auro-hyperlink href="./keyboard-behavior.html">Keyboard Behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>
<auro-header level="3" id="inputElement">Input Element</auro-header>
The native <code>&lt;input&gt;</code> element exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `aria-describedby` | `{helptext-id}` | Associates the input with its help text or error message for screen reader context. |
| `aria-invalid` | `true` / `false` | Reflects whether the input is currently in an invalid state. |
| `aria-readonly` | `true` | Applied when the `readonly` attribute is set. |

When `auro-input` is used inside a parent component (e.g. `auro-combobox`, `auro-select`), additional ARIA attributes are passed through:

| Attribute | Value | Description |
|---|---|---|
| `role` | `textbox` | Set by the parent component via the `a11yRole` property. |

<auro-header level="3" id="labelElement">Label</auro-header>
- The `<label>` element uses a `for` attribute pointing to the native input's `id`, establishing a programmatic association.
- When the input is not `required`, the label appends an `(optional)` indicator via the `optionalLabel` slot. This text is read by screen readers as part of the label.

<auro-header level="3" id="helpTextAndErrors">Help Text and Errors</auro-header>
- Help text is linked to the input via `aria-describedby`, so screen readers announce it after the label when the input receives focus.
- When validation fails, the error message replaces the help text and is rendered with `role="alert"` and `aria-live="assertive"`, causing screen readers to immediately announce the error without requiring the user to move focus.

<auro-header level="2" id="clearButton">Clear Button</auro-header>
The clear button appears when the input has a value and the component has focus or is hovered (unless `disabled` or `readonly`):

- It is a focusable `<button>` element in the tab order.
- Its accessible name is set via the `ariaLabel.clear` slot (defaults to "Reset").
- When the clear button has focus, it intercepts `keydown` events with `stopPropagation()` to prevent parent components from handling key events intended for the button.

<auro-header level="2" id="passwordToggle">Password Toggle Button</auro-header>
When `type="password"` is set and the input has a value:

- A show/hide toggle button appears.
- Its accessible name is set via the `ariaLabel.password.show` and `ariaLabel.password.hide` slots.
- When toggled, the input type switches between `password` and `text`, and the button label updates to reflect the new state.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
- **Focus** — Screen readers announce the label, current value, input type/role, state hints (required, invalid, disabled, readonly), and help text.
- **Validation errors** — Errors are announced immediately via `aria-live="assertive"` when they occur, without requiring focus changes.
- **Clear button** — Announced as a button with the `ariaLabel.clear` slot content.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- A `label` slot is required. Without it, assistive technology users will not have context for the input's purpose.
- The `<label>` element's `for` attribute creates a native association with the input, allowing users to click the label to focus the input.
- The `(optional)` label is automatically appended when the `required` attribute is not set. This can be customized or removed via the `optionalLabel` slot.

<auro-header level="2" id="reducedMotion">Reduced Motion</auro-header>
The component respects the `prefers-reduced-motion` media query. When the user has requested reduced motion, any animations (e.g. label transitions) are adjusted accordingly.

<auro-header level="2" id="formParticipation">Form Participation</auro-header>
The `auro-input` component renders a native `<input>` element inside its shadow DOM. This element:

- Participates in HTML form submissions when a `name` attribute is set, ensuring the value is included in form data.
- Supports native `required` and `disabled` attributes for form validation.
- Retains its value and validity state when the component is used inside `<auro-formkit-form>` or a native `<form>`.

</div>
</div>
</div>
