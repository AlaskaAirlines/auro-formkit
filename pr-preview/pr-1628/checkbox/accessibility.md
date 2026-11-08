<auro-header level="1" id="overview">Checkbox: Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-checkbox` component follows native HTML checkbox semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>
<auro-header level="3" id="checkboxGroup">Checkbox group</auro-header>
The `<auro-checkbox-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics. The group sets these attributes on that shadow DOM `<fieldset>`, **not** on the `<auro-checkbox-group>` host element:

| Attribute | Value | Description |
|---|---|---|
| `role` | `group` (implicit via `fieldset`) | Groups related checkboxes together. There's no ARIA `checkboxgroup` role, so the group uses the `<fieldset>`'s implicit `group` role as-is. |
| `aria-invalid` | `true` | Present only while the group is in an invalid state. The attribute is **omitted entirely** when the group is valid. It's never set to `false`. |
| `aria-describedby` | id reference | Points at the `id` of the group's help-text/error element, so screen readers can associate the message with the group on demand rather than relying only on the one-time live-region announcement. |

<auro-header level="3" id="checkboxElement">Checkbox</auro-header>
Each `<auro-checkbox>` host element carries the checkbox semantics itself. The native `<input type="checkbox">` inside its shadow DOM is hidden from screen readers (`aria-hidden="true"`) and skipped by the keyboard (`tabindex="-1"`). These attributes are set on the `<auro-checkbox>` host:

| Attribute | Value | Description |
|---|---|---|
| `role` | `checkbox` | Identifies the element as a checkbox to screen readers. |
| `aria-label` | Label text | Copied from the default slot text, so screen readers announce the label as the checkbox's name. |
| `aria-checked` | `true` / `false` | Reflects the checked state of the checkbox. |
| `aria-disabled` | `true` | Present only while the checkbox is disabled. Omitted rather than set to `false`. |
| `aria-invalid` | `true` | Mirrored onto each checkbox from the group while the group is invalid, and removed when it becomes valid. Omitted rather than set to `false`. |

<auro-header level="4" id="invalidStatePlacement">Why the invalid state appears twice</auro-header>
While the group is invalid, `aria-invalid` is set on both the `<fieldset>` and every individual `<auro-checkbox>`. This is intentional: some screen reader and browser combinations announce a container's invalid state only when focus first enters the group, so mirroring the state onto each checkbox keeps it conveyed as focus moves through the options.

The `checkbox` role is in `aria-invalid`'s supported-role list in every ARIA version, so the per-checkbox placement is unambiguous. The group-level placement is worth one note: `aria-invalid` is a global attribute in ARIA 1.1, applicable to any role including `group`, but ARIA 1.2 deprecates that global use in favor of a supported-role list that doesn't include `group`. Keeping it on the `<fieldset>` is a deliberate choice: it isn't a *prohibited* attribute for `group`, current axe-core resolves it as global and reports no violation, and it gives the group a real invalid signal that would otherwise be lost. An automated axe assertion in the component's test suite covers this, so a future change in tooling surfaces here rather than in a consumer's audit.

<auro-header level="4" id="attributePlacementNote">Attribute placement</auro-header>
`aria-invalid` is applied to the internal `<fieldset>`, not to the `<auro-checkbox-group>` host element. Don't write CSS selectors or test assertions against `auro-checkbox-group[aria-invalid]`; target the `part="checkbox-group"` fieldset or read the `validity` property instead.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>
- **Focus**: When focus moves to a checkbox, the screen reader announces the checkbox label, its checked/unchecked state, and role ("checkbox").
- **State change**: Toggling the checkbox announces the new state ("checked" or "unchecked").
- **Group context**: The legend text provides group context when navigating between groups.
- **Error**: When validation fails, the error message is announced immediately via the help text's `role="alert"` live region, and stays discoverable afterward through the group's `aria-describedby` association.
- **Invalid state**: While the group is invalid, entering it or moving between its checkboxes conveys the invalid state.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>
- The `legend` slot content provides the accessible group label via the native `<legend>` element.
- Each checkbox's default slot content provides its individual accessible label.
- A label is required for each checkbox. Without it, screen reader users can't tell what the checkbox controls.
- When the `required` attribute isn't set, the group adds "(optional)" after the legend.

<auro-header level="2" id="formParticipation">Form participation</auro-header>
Inside an `<auro-form>`, give the `<auro-checkbox-group>` a `name` attribute so the form tracks it: the form then includes the group's checked values under that name and takes the group's validation into account. A native `<form>` doesn't include the checked values, because each checkbox's `<input>` is inside its shadow DOM.

</div>
</div>
</div>
