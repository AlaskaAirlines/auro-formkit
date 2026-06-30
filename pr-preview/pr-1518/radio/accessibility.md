<auro-header level="1" id="overview">Radio - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-radio` component follows native HTML radio button semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <a href="./keyboard-behavior.html">Keyboard Behavior</a> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>
<auro-header level="3" id="radioGroup">Radio Group</auro-header>
The `<auro-radio-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics:

| Attribute | Value | Description |
|---|---|---|
| `role` | `radiogroup` (implicit via `fieldset`) | Groups related radio buttons together. |
| `aria-invalid` | `true` / `false` | Reflects whether the group is currently in an invalid state. |

<auro-header level="3" id="radioElement">Radio</auro-header>
Each `<auro-radio>` renders a native `<input type="radio">` inside its shadow DOM:

| Attribute | Value | Description |
|---|---|---|
| `type` | `radio` | Native radio input type. |
| `aria-checked` | `true` / `false` | Reflects the selected state of the radio button. |
| `aria-disabled` | `true` / `false` | Indicates whether the radio button is disabled. |

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
- **Focus** — When focus moves to a radio button, the screen reader announces the radio label, its selected/unselected state, its position in the group (e.g. "1 of 3"), and role ("radio button").
- **State change** — Selecting a radio button announces the new state ("selected").
- **Group context** — The legend text provides group context when navigating between groups.
- **Error** — When validation fails, the error message is announced to screen reader users.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- The `legend` slot content provides the accessible group label via the native `<legend>` element.
- Each radio button's `label` attribute provides its individual accessible label.
- A label is required for each radio button. Without it, assistive technology users will not have context for what the radio controls.
- The `(optional)` label is automatically appended when the `required` attribute is not set.

<auro-header level="2" id="formParticipation">Form Participation</auro-header>
The `<auro-radio-group>` participates in form validation and submission. When used inside a `<form>` or `<auro-form>`, the selected radio button's value is included in the form data.

</div>
</div>
</div>
