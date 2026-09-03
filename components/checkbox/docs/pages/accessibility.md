<auro-header level="1" id="overview">Checkbox - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-checkbox` component follows native HTML checkbox semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard Behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>

<auro-header level="3" id="checkboxGroup">Checkbox Group</auro-header>

The `<auro-checkbox-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics. These attributes are applied to that shadow-DOM `<fieldset>`, **not** to the `<auro-checkbox-group>` host element:

| Attribute | Value | Description |
|---|---|---|
| `role` | `group` (implicit via `fieldset`) | Groups related checkboxes together. There is no ARIA `checkboxgroup` role, so the `<fieldset>`'s implicit `group` role is used as-is. |
| `aria-invalid` | `true` | Present only while the group is in an invalid state. The attribute is **omitted entirely** when the group is valid — it is never set to `false`. |
| `aria-describedby` | id reference | Points at the `id` of the group's help-text/error element, so assistive technology can associate the message with the group on demand rather than relying only on the one-time live-region announcement. |

<auro-header level="3" id="checkboxElement">Checkbox</auro-header>

Each `<auro-checkbox>` renders a native `<input type="checkbox">` inside its shadow DOM:

| Attribute | Value | Description |
|---|---|---|
| `type` | `checkbox` | Native checkbox input type. |
| `aria-checked` | `true` / `false` | Reflects the checked state of the checkbox. |
| `aria-disabled` | `true` / `false` | Indicates whether the checkbox is disabled. |
| `aria-invalid` | `true` | Mirrored onto each checkbox from the group while the group is invalid, and removed when it becomes valid. Omitted rather than set to `false`. |

<auro-header level="4" id="invalidStatePlacement">Why the invalid state appears twice</auro-header>

While the group is invalid, `aria-invalid` is set on both the `<fieldset>` and every individual `<auro-checkbox>`. This is intentional: some assistive-technology and browser combinations announce a container's invalid state only when focus first enters the group, so mirroring the state onto each checkbox keeps it conveyed as focus moves through the options.

The `checkbox` role is in `aria-invalid`'s supported-role list in every ARIA version, so the per-checkbox placement is unambiguous. The group-level placement is worth one note: `aria-invalid` is a global attribute in ARIA 1.1, applicable to any role including `group`, but ARIA 1.2 deprecates that global use in favor of a supported-role list that does not include `group`. Keeping it on the `<fieldset>` is a deliberate choice — it is not a *prohibited* attribute for `group`, current axe-core resolves it as global and reports no violation, and it gives the group a real invalid signal that would otherwise be lost. This is covered by an automated axe assertion in the component's test suite so that a future change in tooling surfaces here rather than in a consumer's audit.

<auro-header level="4" id="attributePlacementNote">Attribute placement</auro-header>

`aria-invalid` is applied to the internal `<fieldset>`, not to the `<auro-checkbox-group>` host element. Do not write CSS selectors or test assertions against `auro-checkbox-group[aria-invalid]`; target the `part="checkbox-group"` fieldset or read the `validity` property instead.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>

- **Focus** — When focus moves to a checkbox, the screen reader announces the checkbox label, its checked/unchecked state, and role ("checkbox").
- **State change** — Toggling the checkbox announces the new state ("checked" or "unchecked").
- **Group context** — The legend text provides group context when navigating between groups.
- **Error** — When validation fails, the error message is announced immediately via the help text's `role="alert"` live region, and stays discoverable afterward through the group's `aria-describedby` association.
- **Invalid state** — While the group is invalid, entering it or moving between its checkboxes conveys the invalid state.

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
