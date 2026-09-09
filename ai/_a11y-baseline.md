# Auro accessibility baseline

Rules that apply to **every** Auro FormKit component reimplemented in plain
HTML/CSS/JS. A component spec's `behavior.a11y` section adds to these; it never
overrides them.

## Labels
- Every control has a programmatically associated `<label>` (via `for`/`id` or by
  wrapping the control). A `placeholder` is NOT a label.
- To hide a label visually, keep it in the DOM with a visually-hidden class — never
  remove it.
- When a field is optional, indicate it in the accessible label (Auro appends
  "(optional)" to non-`required` fields).

## Help text and errors
- Associate help text with the control via `aria-describedby`.
- Reflect validity with `aria-invalid="true|false"` on the control.
- Announce validation errors immediately with `role="alert"` and
  `aria-live="assertive"`; do not require the user to move focus to hear them.

## Keyboard and focus
- Every interactive affordance (clear button, toggle, stepper) is a real,
  focusable element in DOM order and operable with Enter/Space as appropriate.
- Use `:focus-visible` for the focus ring, styled with Auro border/active tokens.

## Motion
- Respect `prefers-reduced-motion` for any label animation or transition.
