<auro-header level="1" id="overview">Select - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
The `auro-select` component follows the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" target="_blank">W3C APG Select-Only Combobox</a> pattern. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <a href="./keyboardBehavior.html">Keyboard Behavior</a> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA Roles and Attributes</auro-header>
<auro-header level="3" id="trigger">Trigger</auro-header>
The trigger element exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `role` | `combobox` | Identifies the trigger as a combobox control. |
| `aria-expanded` | `true` / `false` | Reflects whether the bib (listbox) is currently open. |
| `aria-controls` | `{bib-id}` | References the bib element that the trigger controls. |
| `aria-labelledby` | `{label-id}` | Associates the trigger with its visible label text. |
| `aria-activedescendant` | `{option-id}` | Points to the currently highlighted option when the bib is open. Cleared when the bib closes. |

<auro-header level="3" id="menuOptions">Menu Options</auro-header>
Each menu option exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `role` | `option` | Identifies each item as a selectable option. |
| `aria-selected` | `true` / `false` | Indicates whether the option is currently selected. |
| `aria-setsize` | `{count}` | Total number of options available, so screen readers can announce "option X of Y." |
| `aria-posinset` | `{index}` | The 1-based position of the option within the set. |

<auro-header level="3" id="helpTextAndErrors">Help Text and Errors</auro-header>
- Help text is associated with the component so screen readers can announce contextual guidance.
- When validation fails, the error message is rendered with `role="alert"` and `aria-live="assertive"` to ensure it is announced immediately.

<auro-header level="2" id="activeDescendant">Active Descendant</auro-header>
Focus management in `auro-select` follows the **active descendant** pattern rather than moving DOM focus between options:

1. When the bib opens, focus remains on the **trigger** element.
2. Arrow keys update `aria-activedescendant` on the trigger to reference the currently highlighted option.
3. This allows screen readers to announce each option as the user navigates without moving focus away from the trigger.

When the bib closes, `aria-activedescendant` is cleared so stale references are not announced.

<auro-header level="2" id="screenReaderAnnouncements">Screen Reader Announcements</auro-header>
The component uses a visually hidden live region (`aria-live="polite"`) to announce state changes:

- **Option highlighted** — When an option becomes active (via arrow keys or type-ahead), the live region announces the option text along with its selected state (e.g. "Apples, not selected").
- **Option selected** — After an option is selected, the live region announces the selected value (e.g. "Apples, selected"). This announcement is slightly delayed to avoid being overridden by the bib's collapse announcement.

<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
- The `label` slot content is used as the accessible name for both the trigger (via `aria-labelledby`) and the menu (via `aria-label`).
- A label is required. Without it, assistive technology users will not have context for what the select controls.
- The `(optional)` label is automatically appended when the `required` attribute is not set.

<auro-header level="2" id="fullscreenBehavior">Fullscreen (Modal) Behavior</auro-header>
On smaller viewports, the bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping** — only elements inside the dialog are reachable via Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- The dialog receives an accessible label derived from the component's `label` slot text via `aria-labelledby`.
- A close button inside the dialog is focused when the modal opens, giving screen reader users an immediate action to dismiss it.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

<auro-header level="2" id="reducedMotion">Reduced Motion</auro-header>
The component respects the `prefers-reduced-motion` media query. When the user has requested reduced motion, scroll animations (e.g. scrolling the selected or active option into view) use instant scrolling instead of smooth scrolling.

<auro-header level="2" id="formParticipation">Form Participation</auro-header>
A hidden native `<select>` element is rendered alongside the custom component with `aria-hidden="true"`. This element:

- Participates in HTML form submissions, ensuring the selected value is included in form data.
- Supports the `required` and `disabled` attributes.
- Is invisible and unreachable by assistive technology — all user interaction goes through the custom component.

</div>
</div>
</div>
