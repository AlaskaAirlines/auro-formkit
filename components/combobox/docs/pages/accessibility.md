<auro-header level="1" id="overview">Combobox: Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-combobox` component follows the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" target="_blank">W3C APG Combobox</a> pattern. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>

<auro-header level="3" id="trigger">Trigger</auro-header>

The trigger input exposes the following ARIA attributes. It gets its accessible name from the `label` slot through a native `<label>` element.

| Attribute | Value | Description |
|---|---|---|
| `role` | `combobox` | Identifies the trigger as a combobox control. |
| `aria-expanded` | `true` / `false` | Reflects whether the bib (listbox) is currently open. |
| `aria-controls` | `{bib-id}` | References the bib element that the trigger controls. |
| `aria-activedescendant` | `{option-id}` | Points to the currently highlighted option when the bib is open. Cleared when the bib closes. |

<auro-header level="3" id="menuOptions">Menu options</auro-header>

Each menu option exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `role` | `option` | Identifies each item as a selectable option. |
| `aria-selected` | `true` / `false` | Indicates whether the option is currently selected. |
| `aria-setsize` | `{count}` | Total number of options available, so screen readers can announce "option X of Y." |
| `aria-posinset` | `{index}` | The 1-based position of the option within the set. |

<auro-header level="3" id="helpTextAndErrors">Help text and errors</auro-header>

- Help text is associated with the component so screen readers can announce contextual guidance.
- When validation fails, the error message is rendered with `role="alert"` and `aria-live="assertive"` so screen readers announce it immediately.

<auro-header level="2" id="activeDescendant">Active descendant</auro-header>

Focus management in `auro-combobox` follows the **active descendant** pattern rather than moving DOM focus between options:

1. When the bib opens, focus remains on the **input** element.
2. Arrow keys update `aria-activedescendant` on the input to reference the currently highlighted option.
3. This allows screen readers to announce each option as the user navigates without moving focus away from the input.

When the bib closes, `aria-activedescendant` is cleared so stale references aren't announced.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>

The component uses a visually hidden live region (`aria-live="polite"`) to announce state changes:

- **Option highlighted**: In the fullscreen bib, when an option becomes active, the live region announces the option text, its selected state, and its position, for example "Apples, not selected, 1 of 5". In the dropdown bib, screen readers read the active option through `aria-activedescendant` instead.
- **Option selected**: After an option is selected, the live region announces the selected value, for example "Apples, selected". This announcement is slightly delayed so the bib's collapse announcement doesn't override it.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>

- The `label` slot content is the accessible name for the input, through a native `<label>` element, and for the fullscreen dialog.
- A label is required. Without it, screen reader users don't know what the combobox is for.
- When the `required` attribute isn't set, the combobox adds "(optional)" after the label. Change that text with the `optionalLabel` slot.

<auro-header level="2" id="fullscreenBehavior">Fullscreen (modal) behavior</auro-header>

On smaller viewports, the bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping**: only elements inside the dialog are reachable with Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- The dialog receives an accessible label derived from the component's `label` slot text through `aria-labelledby`.
- When the dialog opens, focus moves to the input inside it, so the user can keep typing.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

<auro-header level="2" id="reducedMotion">Reduced motion</auro-header>

The component respects the `prefers-reduced-motion` media query. When the user has requested reduced motion, scrolling the active option into view is instant instead of smooth.

<auro-header level="2" id="formParticipation">Form participation</auro-header>

A native `<form>` doesn't include the combobox's value, because its input is inside shadow DOM. Inside an `auro-form`, the form reads the combobox's `value` and `validity` using its `name` attribute, and skips the combobox while it's `disabled`.

    </div>
  </div>
</div>
