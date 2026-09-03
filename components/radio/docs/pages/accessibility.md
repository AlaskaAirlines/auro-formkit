<auro-header level="1" id="overview">Radio - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-radio` component follows native HTML radio button semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard Behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>

<auro-header level="3" id="radioGroup">Radio Group</auro-header>

The `<auro-radio-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics. These attributes are applied to that shadow-DOM `<fieldset>`, **not** to the `<auro-radio-group>` host element:

| Attribute | Value | Description |
|---|---|---|
| `role` | `radiogroup` | Groups related radio buttons together. Set explicitly on the `<fieldset>`; a bare `<fieldset>` would otherwise expose the implicit role `group`. |
| `aria-invalid` | `true` | Present only while the group is in an invalid state. The attribute is **omitted entirely** when the group is valid — it is never set to `false`. |
| `aria-describedby` | id reference | Points at the `id` of the group's help-text/error element, so assistive technology can associate the message with the group on demand rather than relying only on the one-time live-region announcement. |

<auro-header level="3" id="radioElement">Radio</auro-header>

Each `<auro-radio>` renders a native `<input type="radio">` inside its shadow DOM:

| Attribute | Value | Description |
|---|---|---|
| `type` | `radio` | Native radio input type. |
| `aria-checked` | `true` / `false` | Reflects the selected state of the radio button. |
| `aria-disabled` | `true` / `false` | Indicates whether the radio button is disabled. |
| `aria-invalid` | `true` | Mirrored onto each radio from the group while the group is invalid, and removed when it becomes valid. Omitted rather than set to `false`. |

<auro-header level="4" id="invalidStatePlacement">Why the invalid state appears twice</auro-header>

While the group is invalid, `aria-invalid` is set on both the `<fieldset>` and every individual `<auro-radio>`. This is intentional. Some assistive-technology and browser combinations announce a container's invalid state only when focus first enters the group, not on each subsequent arrow-key move between radios; mirroring the state onto each radio keeps it conveyed throughout. As a side effect, VoiceOver may say "invalid data" twice in a single utterance when you Tab into an invalid group.

The group-level placement is unambiguous: `aria-invalid` is a global attribute in ARIA 1.1, and although ARIA 1.2 deprecates that global use in favor of a supported-role list, `radiogroup` is on that list — so the `<fieldset>` is spec-clean under either version. The **per-radio** placement rests on the looser footing: `radio` is *not* on the ARIA 1.2 supported-role list, so it depends on the same deprecated-global allowance that the [Checkbox accessibility page](../../checkbox/demo/accessibility.html) documents for its `group` fieldset. It is not a *prohibited* attribute for `radio`, current axe-core resolves it as global and reports no violation, and the per-radio redundancy is what keeps the invalid state conveyed while arrowing through options — so it is kept deliberately. An automated axe assertion in the component's test suite pins this outcome, so a change in tooling surfaces there rather than in a consumer's audit.

<auro-header level="4" id="attributePlacementNote">Attribute placement</auro-header>

`aria-invalid` is applied to the internal `<fieldset>`, which is the element that carries `role="radiogroup"` — ARIA state has to live on the same element as the role it describes. It is **not** set on the `<auro-radio-group>` host element. Do not write CSS selectors or test assertions against `auro-radio-group[aria-invalid]`; query the `part="radio-group"` fieldset or read the `validity` property instead.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>

- **Focus** — When focus moves to a radio button, the screen reader announces the radio label, its selected/unselected state, its position in the group (e.g. "1 of 3"), and role ("radio button").
- **State change** — Selecting a radio button announces the new state ("selected").
- **Group context** — The legend text provides group context when navigating between groups.
- **Error** — When validation fails, the error message is announced immediately via the help text's `role="alert"` live region, and stays discoverable afterward through the group's `aria-describedby` association.
- **Invalid state** — While the group is invalid, entering it or moving between its radios conveys the invalid state.

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
