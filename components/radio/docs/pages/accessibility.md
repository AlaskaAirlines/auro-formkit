<auro-header level="1" id="overview">Radio - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-radio` component follows native HTML radio button semantics. This page documents the ARIA attributes, screen reader behavior, and other accessibility features built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>

<auro-header level="3" id="radioGroup">Radio group</auro-header>

The `<auro-radio-group>` element uses a `<fieldset>` with a `<legend>` internally, providing native grouping semantics. The group sets these attributes on that shadow DOM `<fieldset>`, **not** on the `<auro-radio-group>` host element:

| Attribute | Value | Description |
|---|---|---|
| `role` | `radiogroup` | Groups related radio buttons together. Set explicitly on the `<fieldset>`; a bare `<fieldset>` would otherwise expose the implicit role `group`. |
| `aria-invalid` | `true` | Present only while the group is in an invalid state. The attribute is **omitted entirely** when the group is valid. It's never set to `false`. |
| `aria-describedby` | id reference | Points at the `id` of the group's help-text/error element, so screen readers can associate the message with the group on demand rather than relying only on the one-time live-region announcement. |

<auro-header level="3" id="radioElement">Radio</auro-header>

Each `<auro-radio>` host element carries the radio button semantics itself. The native `<input type="radio">` inside its shadow DOM is hidden from screen readers (`aria-hidden="true"`) and skipped by the keyboard (`tabindex="-1"`). These attributes are set on the `<auro-radio>` host:

| Attribute | Value | Description |
|---|---|---|
| `role` | `radio` | Identifies the element as a radio button to screen readers. |
| `aria-checked` | `true` / `false` | Reflects the selected state of the radio button. |
| `aria-required` | `true` / `false` | Set from the group's `required` attribute. |
| `aria-disabled` | empty | Present, with an empty value, only while the radio button is disabled. |
| `tabindex` | `0` / `-1` | `0` on the radio button that Tab reaches, `-1` on the others. |
| `aria-invalid` | `true` | Mirrored onto each radio from the group while the group is invalid, and removed when it becomes valid. Omitted rather than set to `false`. |

<auro-header level="4" id="invalidStatePlacement">Why the invalid state appears twice</auro-header>

While the group is invalid, `aria-invalid` is set on both the `<fieldset>` and every individual `<auro-radio>`. This is intentional. Some screen reader and browser combinations announce a container's invalid state only when focus first enters the group, not on each subsequent arrow-key move between radios; mirroring the state onto each radio keeps it conveyed throughout. As a side effect, VoiceOver may say "invalid data" twice in a single utterance when you Tab into an invalid group.

The group-level placement is unambiguous: `aria-invalid` is a global attribute in ARIA 1.1, and although ARIA 1.2 deprecates that global use in favor of a supported-role list, `radiogroup` is on that list, so the `<fieldset>` is spec-clean under either version. The **per-radio** placement rests on the looser footing: `radio` is *not* on the ARIA 1.2 supported-role list, so it depends on the same deprecated-global allowance that the [Checkbox accessibility page](../../checkbox/demo/accessibility.html) documents for its `group` fieldset. It isn't a *prohibited* attribute for `radio`, current axe-core resolves it as global and reports no violation, and the per-radio redundancy is what keeps the invalid state conveyed while arrowing through options, so it's kept deliberately. An automated axe assertion in the component's test suite pins this outcome, so a change in tooling surfaces there rather than in a consumer's audit.

<auro-header level="4" id="attributePlacementNote">Attribute placement</auro-header>

`aria-invalid` is applied to the internal `<fieldset>`, which is the element that carries `role="radiogroup"`, because ARIA state has to live on the same element as the role it describes. It's **not** set on the `<auro-radio-group>` host element. Don't write CSS selectors or test assertions against `auro-radio-group[aria-invalid]`; query the `part="radio-group"` fieldset or read the `validity` property instead.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>

- **Focus**: When focus moves to a radio button, the screen reader announces the radio label, its selected/unselected state, its position in the group (for example, "1 of 3"), and role ("radio button").
- **State change**: Selecting a radio button announces the new state ("selected").
- **Group context**: The legend text provides group context when navigating between groups.
- **Error**: When validation fails, the error message is announced immediately via the help text's `role="alert"` live region, and stays discoverable afterward through the group's `aria-describedby` association.
- **Invalid state**: While the group is invalid, entering it or moving between its radios conveys the invalid state.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>

- The `legend` slot content provides the accessible group label via the native `<legend>` element.
- Each radio button's default slot content, or its `label` attribute when the slot is empty, provides its individual accessible label.
- A label is required for each radio button. Without it, screen reader users can't tell what the radio button controls.
- When the `required` attribute isn't set, the group adds "(optional)" after the legend.

<auro-header level="2" id="formParticipation">Form participation</auro-header>

Inside an `<auro-form>`, give the `<auro-radio-group>` a `name` attribute so the form tracks it: the form then includes the selected radio button's value under that name and takes the group's validation into account. A native `<form>` doesn't include the value, because each radio button's `<input>` is inside its shadow DOM.

    </div>
  </div>
</div>
