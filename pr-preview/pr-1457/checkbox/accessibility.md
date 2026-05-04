<auro-header level="1" id="overview">Checkbox - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-checkbox` component follows native HTML checkbox semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <a href="./keyboard-behavior.html">Keyboard Behavior</a> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>
<auro-header level="3" id="checkboxGroup">Checkbox Group</auro-header>
The `<auro-checkbox-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics:

| Attribute | Value | Description |
|---|---|---|
| `role` | `group` (implicit via `fieldset`) | Groups related checkboxes together. |
| `aria-invalid` | `true` / `false` | Reflects whether the group is currently in an invalid state. |

<auro-header level="3" id="checkboxElement">Checkbox</auro-header>
Each `<auro-checkbox>` renders a native `<input type="checkbox">` inside its shadow DOM:

| Attribute | Value | Description |
|---|---|---|
| `type` | `checkbox` | Native checkbox input type. |
| `aria-checked` | `true` / `false` | Reflects the checked state of the checkbox. |
| `aria-disabled` | `true` / `false` | Indicates whether the checkbox is disabled. |

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
- **Focus** — When focus moves to a checkbox, the screen reader announces the checkbox label, its checked/unchecked state, and role ("checkbox").
- **State change** — Toggling the checkbox announces the new state ("checked" or "unchecked").
- **Group context** — The legend text provides group context when navigating between groups.
- **Error** — When validation fails, the error message is announced to screen reader users.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- The `legend` slot content provides the accessible group label via the native `<legend>` element.
- Each checkbox's default slot content provides its individual accessible label.
- A label is required for each checkbox. Without it, assistive technology users will not have context for what the checkbox controls.
- The `(optional)` label is automatically appended when the `required` attribute is not set.

<auro-header level="2" id="formParticipation">Form Participation</auro-header>
The `<auro-checkbox-group>` participates in form validation and submission. When used inside a `<form>` or `<auro-form>`, checked checkbox values are included in the form data.

</div>
</div>
</div>
