# Fullscreen Dialog Keyboard Interactions

## Context: A Hybrid Pattern

In fullscreen (mobile) mode, `auro-select` and `auro-combobox` use a `<dialog>` element (via `showModal()`) containing a `role="listbox"` menu with `role="option"` items. This combination is **not covered by any single WAI-ARIA APG pattern**:

- The [select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) assumes a listbox popup (a `<div>` with `role="listbox"`), not a `<dialog>`.
- The [dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) defines focus trapping and Escape behavior but says nothing about listbox navigation inside a dialog.
- The combobox spec's "dialog popup" type refers to launching a full dialog (e.g., a date picker) where the combobox is just a trigger — not a dialog that _contains_ a listbox.

The `<dialog>` provides **containment and isolation** — inert background content, VoiceOver focus trapping, top layer promotion, and native Escape handling. The `role="listbox"` inside defines the **keyboard interaction model** — arrow key navigation via `aria-activedescendant`, with options not in the Tab order. These roles are complementary: the dialog isolates, the listbox dictates navigation.

Because no single spec covers this exact combination, the keyboard interactions are a deliberate design choice that draws from both patterns.

---

## Keyboard Interactions

### Desktop — Popup Closed

| Key | Behavior | Source |
|---|---|---|
| **Enter** | Opens the listbox | APG select-only combobox |
| **Space** | Opens the listbox | APG select-only combobox |
| **Down Arrow** | Opens the listbox, moves visual focus to first option | APG select-only combobox |
| **Up Arrow** | Opens the listbox, moves visual focus to last option | APG select-only combobox |
| **Tab** | Moves focus to next focusable element on the page (standard browser behavior) | APG select-only combobox |

### Desktop — Popup Open

| Key | Behavior | Source |
|---|---|---|
| **Down Arrow** | Moves visual focus to next option (wraps to first at end) | APG select-only combobox |
| **Up Arrow** | Moves visual focus to previous option (wraps to last at start) | APG select-only combobox |
| **Enter** | Selects the highlighted option, closes the popup, returns focus to trigger | APG select-only combobox |
| **Space** | Selects the highlighted option, closes the popup, returns focus to trigger | APG select-only combobox |
| **Escape** | Closes the popup without selecting, returns focus to trigger | APG select-only combobox |
| **Tab** (no option highlighted) | Closes the popup, moves focus to next focusable element on the page | APG select-only combobox |
| **Tab** (option highlighted) | Selects the highlighted option, closes the popup, moves focus to next focusable element | APG select-only combobox |
| **Home** | Moves visual focus to first option | APG select-only combobox |
| **End** | Moves visual focus to last option | APG select-only combobox |
| **Type-ahead** | Moves visual focus to next option starting with typed character | APG select-only combobox |

### Fullscreen (Mobile) — Dialog Open

Menu options are **not in the Tab order**. They use `aria-activedescendant` for virtual focus (per the listbox pattern), so arrow keys navigate options, not Tab.

| Key | Behavior | Spec Basis | Notes |
|---|---|---|---|
| **Down Arrow** | Moves visual focus to next option (wraps to first at end) | APG listbox | Same as desktop |
| **Up Arrow** | Moves visual focus to previous option (wraps to last at start) | APG listbox | Same as desktop |
| **Enter** | Selects the highlighted option, closes the dialog, returns focus to trigger | APG listbox + dialog close convention | Same as desktop |
| **Escape** | Closes the dialog without selecting, returns focus to trigger | Native `<dialog>` `cancel` event | Browsers handle this natively for `<dialog>` |
| **Tab** (no option highlighted) | Closes the dialog, returns focus to trigger | Design decision (see below) | |
| **Tab** (option highlighted) | Selects the highlighted option, closes the dialog, returns focus to trigger | Design decision (see below) | |
| **Shift+Tab** | No defined behavior | — | Native dialog trap is overridden |

---

## Deviations from Spec and Rationale

### Tab: Select + Close Instead of Native Focus Trap

**What the specs say:**
- **Listbox/combobox pattern:** Tab selects the focused option, closes the popup, and moves focus to the **next focusable element on the page**.
- **Dialog pattern:** Tab cycles focus between focusable elements **inside** the dialog (native focus trap from `showModal()`).

**What we do:** Tab selects the active option (if any), closes the dialog, and returns focus to the **trigger** (not the next focusable element).

**Why:**
1. The dialog's native focus trap only cycles between the close button and browser chrome. Menu options are not focusable (they use `aria-activedescendant`), so Tab provides no useful navigation inside the dialog.
2. Returning focus to the trigger (instead of the next focusable element) follows standard dialog convention — when a dialog closes, focus returns to the element that invoked it.
3. This makes Tab consistent with Enter and Escape, which all close the dialog and return focus to the trigger.

### Implementation

Tab is intercepted inside the dialog's keydown handler in `auro-dropdownBib.js`:
1. `event.preventDefault()` stops the native Tab focus cycling
2. `event.stopPropagation()` prevents duplicate handling
3. A synthetic `KeyboardEvent` with `key: 'Tab'` is dispatched on the bib element
4. The event bubbles (via `composed: true`) through shadow DOM boundaries
5. The parent component's (select/combobox) keydown handler receives it and runs the select-and-close logic
6. Focus restoration to the trigger is handled by the existing `auroDropdown-toggled` listener via `requestAnimationFrame`

### Space: Not Yet Implemented in Fullscreen

The APG combobox pattern defines Space as equivalent to Enter (select + close) when the popup is open. This is not currently re-dispatched from the dialog because Space may have other uses (e.g., scrolling). Evaluate whether to add it.

### Home/End and Type-ahead: Not Yet Implemented in Fullscreen

These are defined in the APG combobox pattern for popup-open state. They are not currently re-dispatched from the dialog. Arrow keys + wrapping provide equivalent reach for Home/End. Type-ahead may be useful for long option lists.

---

## Components Affected

| Component | Tab Handler | Effect |
|---|---|---|
| `auro-select` | Yes — `auro-select.js` keydown listener | Selects active option + closes |
| `auro-combobox` | Yes — `auro-combobox.js` keydown listener | Accepts active option + closes |
| `auro-datepicker` | No Tab handler | Re-dispatched Tab bubbles up harmlessly |
| `auro-counter-group` | No keydown handling | Re-dispatched Tab bubbles up harmlessly |

---

## Key Files

- `components/dropdown/src/auro-dropdownBib.js` — `navKeys` set and dialog keydown handler (re-dispatches Tab, Arrow, Enter, Escape)
- `components/select/src/auro-select.js` — Tab keydown handler (selects + closes)
- `components/combobox/src/auro-combobox.js` — Tab keydown handler (accepts + closes)
