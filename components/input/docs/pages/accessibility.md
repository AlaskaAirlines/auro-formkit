<auro-header level="1" id="overview">Input - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-input` component renders a native HTML <code>&lt;input&gt;</code> element inside its shadow DOM and adds its own label, help text, and validation UI. This page documents the ARIA semantics, screen reader announcements, and other accessibility behavior built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>

<auro-header level="3" id="inputElement">Input element</auro-header>

The native <code>&lt;input&gt;</code> element exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `aria-describedby` | `{helptext-id}` | Points to the help text or error message, so screen readers read it as the input's description. |
| `aria-invalid` | `true` / `false` | `true` whenever `validity` isn't `valid`, including before the input is first validated. |
| `aria-readonly` | `true` | Set when the `readonly` attribute is set. |

When `auro-combobox` uses `auro-input`, it passes these additional ARIA attributes through:

| Attribute | Value | Description |
|---|---|---|
| `role` | `combobox` | Set through the `a11yRole` property. |
| `aria-controls` | `{list-id}` | Set through the `a11yControls` property. |
| `aria-expanded` | `true` / `false` | Set through the `a11yExpanded` property. |
| `aria-activedescendant` | `{option-id}` | Set through the `a11yActivedescendant` property. |

<auro-header level="3" id="labelElement">Label</auro-header>

- The `<label>` element uses a `for` attribute pointing to the native input's `id`, which ties the label to the input.
- When the input isn't `required`, the label shows " (optional)" text from the `optionalLabel` slot. Screen readers read this text as part of the label.

<auro-header level="3" id="helpTextAndErrors">Help text and errors</auro-header>

- Help text is linked to the input with `aria-describedby`, so screen readers announce it after the label when the input gets focus.
- When validation fails, the error message replaces the help text and is rendered with `role="alert"` and `aria-live="assertive"`, so screen readers announce the error right away, without the user moving focus.

<auro-header level="2" id="clearButton">Clear button</auro-header>

The clear button appears when the input has a value and the component has focus or is hovered, unless the input is `disabled` or `readonly`:

- It's a focusable button in the tab order.
- Its accessible name comes from the `ariaLabel.clear` slot, which defaults to "Clear Input".
- When the clear button has focus, it stops `keydown` events with `stopPropagation()`, so parent components don't handle keys meant for the button.

<auro-header level="2" id="passwordToggle">Password toggle button</auro-header>

When `type="password"` is set, the input has a value, and the layout is `classic`:

- A show/hide button appears while the component has focus or is hovered.
- Its accessible name comes from the `ariaLabel.password.show` and `ariaLabel.password.hide` slots.
- When pressed, the input type switches between `password` and `text`, and the button name changes to match the new state.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>

- **Focus**: Screen readers announce the label, current value, input type or role, state hints (required, invalid, disabled, read-only), and help text.
- **Validation errors**: Screen readers announce errors as soon as they occur, through `aria-live="assertive"`, without the user moving focus.
- **Clear button**: Announced as a button named with the `ariaLabel.clear` slot content.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>

- The `label` slot is required. Without it, screen reader users don't know what the input is for.
- The `<label>` element's `for` attribute ties it to the input, so users can click the label to move focus to the input.
- The " (optional)" text appears after the label when the `required` attribute isn't set. Change or remove it with the `optionalLabel` slot.

<auro-header level="2" id="reducedMotion">Reduced motion</auro-header>

The component doesn't currently respond to the `prefers-reduced-motion` media query. The classic layout's label and value transitions run even when the user has asked for reduced motion.

<auro-header level="2" id="formParticipation">Form participation</auro-header>

The `auro-input` component renders a native `<input>` element inside its shadow DOM. That means:

- A native `<form>` doesn't include the input's value when it's submitted, because the inner `<input>` is in the shadow DOM.
- Place the input inside `<auro-form>` and set `name` to include its value in the form's data and validity.
- The `required` and `disabled` attributes are passed to the inner `<input>`.

    </div>
  </div>
</div>
