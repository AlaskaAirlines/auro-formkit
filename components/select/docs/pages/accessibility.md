<auro-header level="1" id="overview">Select - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

The `auro-select` component follows the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" target="_blank">W3C APG Select-Only Combobox</a> pattern. This page documents the ARIA semantics, screen reader announcements, and other accessibility behaviors built into the component.

For keyboard interaction details, see the <auro-hyperlink href="keyboard-behavior">Keyboard behavior</auro-hyperlink> page.

<auro-header level="2" id="ariaRolesAndAttributes">ARIA roles and attributes</auro-header>

<auro-header level="3" id="trigger">Trigger</auro-header>

The trigger element exposes the following ARIA attributes:

| Attribute | Value | Description |
|---|---|---|
| `role` | `combobox` | Identifies the trigger as a combobox control. |
| `aria-expanded` | `true` / `false` | Reflects whether the bib (listbox) is currently open. |
| `aria-controls` | `{bib-id}` | References the bib element that the trigger controls. |
| `aria-labelledby` | `{label-id}` | Names the trigger with its visible content, including the label and the current value. |
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

- Help text isn't currently tied to the trigger, such as with `aria-describedby`, so screen readers don't announce it when the trigger has focus.
- When validation fails, the error message is rendered with `role="alert"` and `aria-live="assertive"` so it's announced immediately.

<auro-header level="2" id="activeDescendant">Active descendant</auro-header>

Focus management in `auro-select` follows the **active descendant** pattern rather than moving DOM focus between options:

1. When the bib opens, focus remains on the **trigger** element.
2. Arrow keys update `aria-activedescendant` on the trigger to reference the currently highlighted option.
3. This allows screen readers to announce each option as the user navigates without moving focus away from the trigger.

When the bib closes, `aria-activedescendant` is cleared so stale references aren't announced.

<auro-header level="2" id="screenReaderAnnouncements">Screen reader announcements</auro-header>

The component uses a visually hidden live region (`aria-live="polite"`) to announce state changes:

- **Option highlighted:** When an option that isn't selected becomes active (through the arrow keys or type-ahead), the live region announces its text followed by "not selected", for example "Apples, not selected". For an option that's already selected, screen readers rely on its `aria-selected` state instead.
- **Option selected:** After an option is selected, the live region announces it, for example "Apples, selected". In `multiSelect` mode, deselecting an option announces "not selected" instead. This announcement is slightly delayed to avoid being overridden by the bib's collapse announcement.

<auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>

- The `label` slot content names both the trigger, together with the current value (through `aria-labelledby`), and the menu (through `aria-label`).
- A label is required. Without it, screen reader users don't know what the select is for.
- When `required` isn't set, the select adds "(optional)" after the label. To change that text, use the `optionalLabel` slot.

<auro-header level="2" id="fullscreenBehavior">Fullscreen (modal) behavior</auro-header>

At or below the `fullscreenBreakpoint` screen size, the bib opens as a fullscreen modal dialog:

- The dialog is opened with `showModal()`, which provides **native focus trapping**: only elements inside the dialog are reachable with Tab.
- Content outside the dialog is automatically made **inert** by the browser, preventing interaction with the page behind it.
- The dialog receives an accessible label derived from the component's `label` slot text via `aria-labelledby`.
- A close button inside the dialog is focused when the modal opens, giving screen reader users an immediate action to dismiss it.
- Touch scrolling on the page behind the dialog is blocked to prevent the background from scrolling into view.

<auro-header level="2" id="modifierKeys">Modifier keys</auro-header>

The **Meta** key (Command on macOS, Windows/Super elsewhere) is intentionally not used as a modifier for select keyboard shortcuts. On Windows, Linux, and ChromeOS, the operating system intercepts `Meta` + Arrow combinations for window management, such as window snapping, before the browser receives the event, so any shortcut bound to `Meta` + Arrow would work only on macOS and silently fail on other platforms.

To jump to the first or last option in a way that works uniformly across platforms, use **Home** and **End**, which follow the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" target="_blank">WAI-ARIA Select-Only Combobox pattern</a>.

<auro-header level="2" id="reducedMotion">Reduced motion</auro-header>

The component respects the `prefers-reduced-motion` media query. When the user has requested reduced motion, scroll animations, such as scrolling the selected or active option into view, use instant scrolling instead of smooth scrolling.

<auro-header level="2" id="formParticipation">Form participation</auro-header>

In the `classic` and `snowflake` layouts, a hidden native `<select>` element is rendered alongside the custom component with `aria-hidden="true"`. The `emphasized` layout doesn't currently render it. This element:

- Mirrors the selected value (the first one in `multiSelect` mode) and the `name`, `autocomplete`, `required`, and `disabled` attributes.
- Isn't included when a native `<form>` submits, because it's inside the component's shadow DOM. To collect the select's value, use `auro-form` or read `value`.
- Is invisible and unreachable by screen readers. All user interaction goes through the custom component.

    </div>
  </div>
</div>
