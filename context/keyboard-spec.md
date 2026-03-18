# Keyboard Interactions

## Context: A Hybrid Pattern

In fullscreen (mobile) mode, `auro-select` and `auro-combobox` use a `<dialog>` element (via `showModal()`) containing a `role="listbox"` menu with `role="option"` items. This combination is **not covered by any single WAI-ARIA APG pattern**:

- The [select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) assumes a listbox popup (a `<div>` with `role="listbox"`), not a `<dialog>`.
- The [dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) defines focus trapping and Escape behavior but says nothing about listbox navigation inside a dialog.
- The combobox spec's "dialog popup" type refers to launching a full dialog (e.g., a date picker) where the combobox is just a trigger — not a dialog that _contains_ a listbox.

The `<dialog>` provides **containment and isolation** — inert background content, VoiceOver focus trapping, top layer promotion, and native Escape handling. The `role="listbox"` inside defines the **keyboard interaction model** — arrow key navigation via `aria-activedescendant`, with options not in the Tab order. These roles are complementary: the dialog isolates, the listbox dictates navigation.

Because no single spec covers this exact combination, the keyboard interactions are a deliberate design choice that draws from both patterns.

---

## Initial Focus on Dialog Open

The [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) requires that opening a modal dialog moves focus to an element inside it. Which element receives focus depends on the component:

| Component | Focus Target | Rationale |
|---|---|---|
| **auro-select** | Close button (`bibtemplate.focusCloseButton()`) | No text input in the dialog. The close button is the first interactive element, per the APG recommendation to focus the first focusable element. |
| **auro-combobox** | Search input (`inputInBib.focus()`) | The user is typing a search query. Focusing the input lets them continue typing without interruption — critical on mobile where `showModal()` must fire within the user activation window to keep the virtual keyboard open. |
| **auro-datepicker** | Close button (`calendar.focusCloseButton()`) | The calendar is a visual, touch-oriented interface with no text input. The close button is the first interactive element. |
| **auro-counter-group** | Close button (`bibtemplate.focusCloseButton()`) | Counters are adjusted via increment/decrement buttons, not text input. The close button is the first interactive element. |

### Implementation

All four components listen for the `auroDropdown-toggled` event (or equivalent visibility change) and focus the target element after the dialog has rendered. Because `showModal()` promotes the dialog to the top layer asynchronously relative to Lit's render cycle, focus is deferred via a double `requestAnimationFrame` to ensure the close button (or input) is present in the DOM.

`focusCloseButton()` is a public method on `auro-bibtemplate` that focuses `this.shadowRoot.querySelector('#closeButton')`. The `#closeButton` only renders when `isFullscreen` is true. For datepicker, the calendar wraps this call: `calendar.focusCloseButton()` delegates to its internal bibtemplate.

### Tab Closes Fullscreen Dialog

In addition to initial focus, all four components close the fullscreen dialog when Tab is pressed. Select and combobox handle this in their keyboard strategy files. Datepicker and counter-group use a direct `keydown` listener that checks `evt.key === 'Tab' && dropdown.isPopoverVisible && dropdown.isBibFullscreen` before calling `dropdown.hide()`. The dialog event bridge re-dispatches Tab from inside the modal so it reaches these listeners.

---

## Keyboard Strategy Architecture

Select and combobox share `auro-dropdown` infrastructure but need different keyboard interactions. To prevent changes to one component from breaking the other, keyboard handling is extracted into **per-component strategy maps** with shared utilities.

### How It Works

`applyKeyboardStrategy(component, strategy, options)` in `@aurodesignsystem/utils` attaches a single `keydown` listener to the component. On each keydown, it calls `createDisplayContext(component, options)` to compute a frozen `ctx` snapshot, then looks up `strategy[evt.key]` — if a handler exists, it's called with `(component, evt, ctx)`. If no specific key handler matches, `strategy.default` is called (if defined). Handlers can be sync or async.

```
keydown event
  → createDisplayContext(component, options) → ctx
  → strategy[evt.key] found?  → call handler(component, evt, ctx)
  → no match, strategy.default?  → call default(component, evt, ctx)
  → neither?  → event passes through unhandled
```

### Strategy Files

| File | Component | Keys Handled | Default |
|---|---|---|---|
| `selectKeyboardStrategy.js` | `auro-select` | ArrowUp, ArrowDown, Enter, Tab | Type-ahead via `updateActiveOptionBasedOnKey()` |
| `comboboxKeyboardStrategy.js` | `auro-combobox` | ArrowUp, ArrowDown, Enter, Tab | None — character keys go to the input naturally |

### Shared Utilities (`packages/utils/src/keyboard.js`)

- **`createDisplayContext(component, options)`** — Computes display state once per keydown event and returns a frozen context object (`ctx`). Properties: `isVisible` (dropdown is open), `isModal` (visible + fullscreen), `isPopover` (visible + not fullscreen), `activeInput` (resolved via `inputResolver` callback, or `null`). Called automatically by `applyKeyboardStrategy` — handlers receive `ctx` as their third argument.
- **`applyKeyboardStrategy(component, strategy, options)`** — Wires up the keydown listener. Called once in each component's `configure*()` method. The optional `options` object is forwarded to `createDisplayContext` on every keydown, so per-component configuration (like `inputResolver`) is set once at registration time.
- **`navigateArrow(component, direction, options)`** — Shared arrow-key logic: calls `menu.navigateOptions(direction)` when the dropdown is visible, or calls `options.showFn()` to open it when closed. Accepts an optional `options.ctx` to use the pre-computed visibility state instead of re-reading `dropdown.isPopoverVisible`.

#### Display Context Pattern

Every strategy handler receives `(component, evt, ctx)`. The `ctx` object centralizes null-safety checks and eliminates repeated property access into `component.dropdown`:

```
ctx.isVisible   — Boolean: dropdown is open
ctx.isModal     — Boolean: open AND fullscreen (dialog mode)
ctx.isPopover   — Boolean: open AND not fullscreen (popover mode)
ctx.activeInput — HTMLElement|null: resolved by inputResolver callback
```

The `inputResolver` callback is component-specific. Combobox uses it to resolve the correct input element depending on mode:

```js
applyKeyboardStrategy(this, comboboxKeyboardStrategy, {
  inputResolver: (comp, ctx) =>
    ctx.isModal && comp.inputInBib ? comp.inputInBib : comp.input,
});
```

Select does not pass an `inputResolver` (it has no input element), so `ctx.activeInput` is `null`.

The three-layer branching convention for handlers: shared logic first (using `ctx.isVisible`), then `ctx.isModal` branch for fullscreen/dialog-specific behavior, then `ctx.isPopover` branch (or fall-through) for desktop popover behavior.

**Snapshot caveat:** `ctx` is an immutable snapshot of entry conditions — the state at the moment the key was pressed. This is intentional: every handler gets a consistent, frozen view of what was true when the user acted. Use `ctx` for branching on entry conditions; read `component.dropdown.isPopoverVisible` directly when reacting to mutations the handler itself caused (e.g. after calling `showBib()`).

### Why Strategy Maps

1. **Isolation** — Select's Tab handler can select-on-tab for multi-select without touching combobox. Combobox can handle fullscreen-specific logic without affecting select.
2. **Readability** — Each key's behavior is a named method in a flat object, not buried in a chain of `if (evt.key === ...)` blocks.
3. **Extensibility** — Adding a new key (e.g., Space, Home, End) means adding one method to the relevant strategy. No risk of breaking other keys.

### Dialog Event Bridge (`auro-dropdownBib.js`)

`showModal()` creates a closed focus scope — keyboard events inside the dialog's shadow DOM do NOT bubble out to the component keydown handlers. The bib's keydown listener bridges this gap by re-dispatching navigation keys (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`, `Tab`) with modifier keys (`shiftKey`, `altKey`, `ctrlKey`, `metaKey`) preserved, so they cross the shadow boundary and reach the strategy handlers in the parent component.

The trade-off: intercepted keys must have their native behaviors manually re-implemented:

- **Enter on buttons:** Custom elements (auro-button) don't get native Enter→click, so the handler calls `.click()` directly when Enter is pressed on a button-like element.
- **Tab:** `preventDefault()` stops native Tab cycling inside the dialog. The re-dispatched Tab reaches the component strategy, which runs select-and-close logic. The dialog's native Tab trap only cycles between the close button and browser chrome — not useful for listbox navigation.
- **Escape:** The native `<dialog>` fires a `cancel` event on ESC (handled separately). The re-dispatched Escape is a secondary path for parent components that also listen for Escape keydown.

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

### Fullscreen (Mobile) — Select Dialog Open

Menu options are **not in the Tab order**. They use `aria-activedescendant` for virtual focus (per the listbox pattern), so arrow keys navigate options, not Tab.

| Key | Behavior | Spec Basis | Notes |
|---|---|---|---|
| **Down Arrow** | Moves visual focus to next option (wraps to first at end) | APG listbox | Same as desktop |
| **Up Arrow** | Moves visual focus to previous option (wraps to last at start) | APG listbox | Same as desktop |
| **Enter** | Selects the highlighted option, closes the dialog, returns focus to trigger | APG listbox + dialog close convention | Same as desktop |
| **Escape** | Closes the dialog without selecting, returns focus to trigger | Native `<dialog>` `cancel` event | Browsers handle this natively for `<dialog>` |
| **Tab** (no option highlighted) | Closes the dialog, returns focus to trigger | Design decision (see below) | |
| **Tab** (option highlighted) | Selects the highlighted option, closes the dialog, returns focus to trigger | Design decision (see below) | |

### Fullscreen (Mobile) — Combobox Dialog Open

Same arrow key, Enter, and Escape behavior as select. Tab behavior differs because the combobox has an input with a clear button inside the dialog.

| Key | Behavior | Spec Basis | Notes |
|---|---|---|---|
| **Down Arrow** | Moves visual focus to next option (wraps to first at end) | APG listbox | Same as desktop |
| **Up Arrow** | Moves visual focus to previous option (wraps to last at start) | APG listbox | Same as desktop |
| **Enter** | Selects the highlighted option, closes the dialog, returns focus to trigger | APG listbox + dialog close convention | Same as desktop |
| **Escape** | Closes the dialog without selecting, returns focus to trigger | Native `<dialog>` `cancel` event | Browsers handle this natively for `<dialog>` |
| **Tab** (focus on input, clear button visible) | Moves focus to the clear button | Design decision | Clear button is the only focusable element besides the input |
| **Tab** (focus on clear button, option highlighted) | Selects the highlighted option, closes the dialog, returns focus to trigger | Design decision | Consistent with select's Tab behavior |
| **Tab** (focus on clear button, no option highlighted) | Closes the dialog, returns focus to trigger | Design decision | Tabbing past the last focusable element closes the dialog |
| **Tab** (no clear button / no value) | Closes the dialog, returns focus to trigger | Design decision | Same as select behavior |

---

## Key Combinations (Modifier Keys)

Modifier keys like Shift, Alt, Ctrl, and Meta are not separate entries in the strategy map. They arrive as boolean flags on the same `KeyboardEvent` as the base key — so `Shift+Tab` and `Tab` both route to `strategy['Tab']`, and the handler reads `evt.shiftKey` to distinguish them.

The dialog event bridge preserves all four modifier flags when re-dispatching events from inside the modal, so modifier-aware handlers work identically in fullscreen and desktop modes.

### Example: Shift+Tab

```js
Tab(component, evt, ctx) {
  if (evt.shiftKey) {
    component.dropdown.hide();
    return;
  }

  if (component.optionActive) {
    component.menu.makeSelection();
  }
  component.dropdown.hide();
},
```

No additional `navKeys` entry or bridge change is needed — `'Tab'` already covers both directions.

### Available Modifier Flags

| Flag | Key |
|---|---|
| `evt.shiftKey` | Shift |
| `evt.altKey` | Alt / Option |
| `evt.ctrlKey` | Control |
| `evt.metaKey` | Cmd (Mac) / Win (Windows) |

---

## Deviations from Spec and Rationale

### Tab: Select + Close Instead of Native Focus Trap (Select)

**What the specs say:**
- **Listbox/combobox pattern:** Tab selects the focused option, closes the popup, and moves focus to the **next focusable element on the page**.
- **Dialog pattern:** Tab cycles focus between focusable elements **inside** the dialog (native focus trap from `showModal()`).

**What we do:** Tab selects the active option (if any), closes the dialog, and returns focus to the **trigger** (not the next focusable element).

**Why:**
1. The dialog's native focus trap only cycles between the close button and browser chrome. Menu options are not focusable (they use `aria-activedescendant`), so Tab provides no useful navigation inside the dialog.
2. Returning focus to the trigger (instead of the next focusable element) follows standard dialog convention — when a dialog closes, focus returns to the element that invoked it.
3. This makes Tab consistent with Enter and Escape, which all close the dialog and return focus to the trigger.

### Tab: Input → Clear Button → Close (Combobox)

**What we do:** In fullscreen, Tab cycles through the interactive elements in the dialog before closing: input → clear button → close dialog. Clicking the clear button clears the input without closing the dialog so the user can continue searching.

**Why:**
1. The combobox dialog has an input with a clear button — a genuinely focusable interactive element beyond the input itself, unlike select which has no input.
2. Tabbing to the clear button before closing gives keyboard users the same clearing ability that touch/mouse users get by tapping/clicking it.
3. Tabbing past the last focusable element (the clear button) closes the dialog and returns focus to the trigger, consistent with select's Tab-to-close behavior.

**Safari workaround:** Safari does not propagate `:focus-within` through shadow DOM boundaries. When focus moves from the native `<input>` to the `auro-button` (clear button), `.wrapper:not(:focus-within)` applies and hides the clear button container. The strategy handler forces `display: flex` on the container via inline style and cleans it up on `focusout`.

### Space: Not Yet Implemented in Fullscreen

The APG combobox pattern defines Space as equivalent to Enter (select + close) when the popup is open. This is not currently re-dispatched from the dialog because Space may have other uses (e.g., scrolling). Evaluate whether to add it.

### Home/End and Type-ahead: Not Yet Implemented in Fullscreen

These are defined in the APG combobox pattern for popup-open state. They are not currently re-dispatched from the dialog. Arrow keys + wrapping provide equivalent reach for Home/End. Type-ahead may be useful for long option lists.

---

## Components Affected

| Component | Strategy File | Tab Handler | Effect |
|---|---|---|---|
| `auro-select` | `selectKeyboardStrategy.js` | Yes (strategy) | Selects active option + closes |
| `auro-combobox` | `comboboxKeyboardStrategy.js` | Yes (strategy) | Input → clear button → closes |
| `auro-datepicker` | None | Yes (direct listener) | Closes fullscreen dialog |
| `auro-counter-group` | None | Yes (direct listener) | Closes fullscreen dialog |

---

## Key Files

- `packages/utils/src/keyboard.js` — `applyKeyboardStrategy()`, `navigateArrow()`, and `createDisplayContext()` shared utilities (exported from `@aurodesignsystem/utils`)
- `components/dropdown/src/auro-dropdownBib.js` — `navKeys` set and dialog keydown handler (re-dispatches Tab, Arrow, Enter, Escape with modifier keys)
- `components/select/src/selectKeyboardStrategy.js` — Select keyboard strategy map
- `components/select/src/auro-select.js` — Calls `applyKeyboardStrategy(this, selectKeyboardStrategy)` in `configureSelect()`
- `components/combobox/src/comboboxKeyboardStrategy.js` — Combobox keyboard strategy map
- `components/combobox/src/auro-combobox.js` — Calls `applyKeyboardStrategy(this, comboboxKeyboardStrategy)` in `configureCombobox()`
- `components/datepicker/src/auro-datepicker.js` — Direct Tab keydown listener + `calendar.focusCloseButton()` on dialog open
- `components/datepicker/src/auro-calendar.js` — `focusCloseButton()` delegates to internal bibtemplate
- `components/counter/src/auro-counter-group.js` — Direct Tab keydown listener + `bibtemplate.focusCloseButton()` on dialog open
- `components/bibtemplate/src/auro-bibtemplate.js` — `focusCloseButton()` focuses `#closeButton` in shadow DOM
