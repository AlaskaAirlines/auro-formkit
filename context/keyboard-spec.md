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

In addition to initial focus, select, combobox, and datepicker close the fullscreen dialog when Tab is pressed. Select and combobox handle this in their keyboard strategy files. Datepicker uses a direct `keydown` listener that checks `evt.key === 'Tab' && dropdown.isPopoverVisible && dropdown.isBibFullscreen` before calling `dropdown.hide()`. The dialog event bridge re-dispatches Tab from inside the modal so it reaches these listeners.

Counter-group is the exception — see [Native Focusable Content](#native-focusable-content-nativefocusablecontent) below.

---

## Keyboard Strategy Architecture

Select and combobox share `auro-dropdown` infrastructure but need different keyboard interactions. To prevent changes to one component from breaking the other, keyboard handling is extracted into **per-component strategy maps** with shared utilities.

### How It Works

`applyKeyboardStrategy(component, strategy, options)` in `@aurodesignsystem/utils` attaches a single `keydown` listener to the component. On each keydown, it calls `createDisplayContext(component, options)` to compute a `ctx` object, then looks up `strategy[evt.key]` — if a handler exists, it's called with `(component, evt, ctx)`. If no specific key handler matches, `strategy.default` is called (if defined). Handlers can be sync or async.

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

#### `createDisplayContext(component, options)`

Computes display state once per keydown event and returns a context object (`ctx`). Called automatically by `applyKeyboardStrategy` before every handler invocation — strategy handlers receive `ctx` as their third argument and never need to call this function directly.

**Why it exists:** Without a centralized context, every handler would independently read `component.dropdown.isPopoverVisible` and `component.dropdown.isBibFullscreen`, repeating null-safety checks and risking inconsistent reads if state changes between checks. `createDisplayContext` computes all derived booleans once and guards against null `dropdown` references, so handlers share a single view of the display state at the moment the key was pressed.

**Properties:**

| Property | Type | Meaning |
|---|---|---|
| `isExpanded` | Boolean | Dropdown is open (`dd.isPopoverVisible`) |
| `isModal` | Boolean | Fullscreen — the dialog path via `showModal()` |
| `isPopover` | Boolean | Not fullscreen — the popover/desktop path |
| `activeInput` | HTMLElement \| null | The input element for the current mode, resolved via `inputResolver` |

**Options:**

| Option | Type | Purpose |
|---|---|---|
| `dropdown` | HTMLElement | Explicit dropdown reference. Falls back to `component.dropdown`. |
| `inputResolver` | Function | Callback `(component, ctx) => HTMLElement`. Resolves which input element is active for the current display mode. |

The `inputResolver` callback receives the partially-built `ctx` (with `isExpanded`, `isModal`, and `isPopover` already set but `activeInput` still null) so it can branch on display mode. Combobox uses this to return `comp.inputInBib` in modal mode and `comp.input` in popover mode. Select does not pass an `inputResolver` because it has no input element, so `ctx.activeInput` is always `null`.

**Staleness caveat:** `ctx` is computed once before the handler runs, so it reflects entry conditions, not post-mutation state. If a handler calls `showBib()` or `hide()`, the visibility flags in `ctx` are stale. Use `ctx` for branching on what was true when the user pressed the key; read `component.dropdown.isPopoverVisible` directly when you need to check state after a mutation the handler itself caused.

#### `applyKeyboardStrategy(component, strategy, options)`

Wires up a single `keydown` listener on the component that dispatches to the strategy map. Called once during component initialization (in `configureSelect()` or `configureCombobox()`).

**Why it exists:** This function is the glue between DOM events and the strategy pattern. It ensures every keydown event goes through the same pipeline — compute context, look up handler, invoke — without each component reimplementing that dispatch loop. It also handles async handlers (awaiting the result) so strategies can use `await component.updateComplete` or other async operations without special plumbing.

**How dispatch works:**

1. A `keydown` event fires on the component.
2. `applyKeyboardStrategy` calls `createDisplayContext(component, options)` to build a fresh `ctx`.
3. It looks up `strategy[evt.key]` — if found, calls `handler(component, evt, ctx)`.
4. If no specific key matches, it falls back to `strategy.default` (if defined).
5. If neither exists, the event passes through unhandled.

**The `options` object** is captured once at registration time and forwarded to `createDisplayContext` on every keydown. This is how per-component configuration like `inputResolver` works — set once, applied on every keystroke:

```js
// In configureCombobox():
applyKeyboardStrategy(this, comboboxKeyboardStrategy, {
  inputResolver: (comp, ctx) =>
    ctx.isModal && comp.inputInBib ? comp.inputInBib : comp.input,
});

// In configureSelect():
applyKeyboardStrategy(this, selectKeyboardStrategy);
// No options — select has no input, so ctx.activeInput will be null.
```

#### `navigateArrow(component, direction, options)`

Shared arrow-key navigation logic used by both select and combobox strategy handlers. Moves the active option highlight up or down when the dropdown is open, or opens the dropdown when it is closed.

**Why it exists:** Arrow key behavior is identical across select and combobox when the dropdown is visible — both call `component.menu.navigateOptions(direction)` to move `aria-activedescendant` to the next or previous option. Extracting this into a shared function prevents duplication and ensures both components navigate identically.

**How it works:**

1. Checks visibility — uses `options.ctx.isExpanded` if a pre-computed context was passed, otherwise reads `component.dropdown.isPopoverVisible` directly.
2. If visible: calls `component.menu.navigateOptions(direction)` where `direction` is `'up'` or `'down'`.
3. If not visible and `options.showFn` is provided: calls `showFn()` to open the dropdown. This lets select open on ArrowUp/ArrowDown while combobox can choose whether to open (combobox calls `showBib()` directly before `navigateArrow` and omits `showFn`).

**Options:**

| Option | Type | Purpose |
|---|---|---|
| `ctx` | Object | Pre-computed display context. When provided, uses `ctx.isExpanded` for the visibility check instead of reading `component.dropdown.isPopoverVisible`. Avoids a redundant property access when the caller already has a context. |
| `showFn` | Function | Called to open the dropdown when closed. Select passes `() => component.dropdown.show()`. Combobox does not use this — it opens the dropdown itself before calling `navigateArrow` because it needs to check `availableOptions.length` and read live visibility after the open. |

**Select vs. combobox usage:** Select passes both `ctx` and `showFn`, letting `navigateArrow` handle the full open-or-navigate decision. Combobox manages opening separately because it must (1) guard on `availableOptions.length > 0` before opening, and (2) read live visibility after `showBib()` rather than relying on `ctx`, since `showBib()` mutates visibility after `ctx` was computed.

#### Display Context Pattern

Every strategy handler receives `(component, evt, ctx)`. The `ctx` object centralizes null-safety checks and eliminates repeated property access into `component.dropdown`:

```
ctx.isVisible   — Boolean: dropdown is open
ctx.isModal     — Boolean: fullscreen (dialog mode)
ctx.isPopover   — Boolean: not fullscreen (popover mode)
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

**Staleness caveat:** `ctx` is computed once before the handler runs, so it reflects entry conditions — the state at the moment the key was pressed. If a handler mutates state (e.g. calling `showBib()`), the values in `ctx` are stale. Use `ctx` for branching on entry conditions; read `component.dropdown.isPopoverVisible` directly when reacting to mutations the handler itself caused.

### Why Strategy Maps

1. **Isolation** — Select's Tab handler can select-on-tab for multi-select without touching combobox. Combobox can handle fullscreen-specific logic without affecting select.
2. **Readability** — Each key's behavior is a named method in a flat object, not buried in a chain of `if (evt.key === ...)` blocks.
3. **Extensibility** — Adding a new key (e.g., Space, Home, End) means adding one method to the relevant strategy. No risk of breaking other keys.

### Dialog Event Bridge (`auro-dropdownBib.js`)

`showModal()` creates a closed focus scope — keyboard events inside the dialog's shadow DOM do NOT bubble out to the component keydown handlers. The bib's keydown listener bridges this gap by re-dispatching navigation keys (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`, `Tab`) with modifier keys (`shiftKey`, `altKey`, `ctrlKey`, `metaKey`) preserved, so they cross the shadow boundary and reach the strategy handlers in the parent component.

The trade-off: intercepted keys must have their native behaviors manually re-implemented:

- **Enter on buttons:** Custom elements (auro-button) don't get native Enter→click, so the handler calls `.click()` directly when Enter is pressed on a button-like element.
- **Tab:** `preventDefault()` stops native Tab cycling inside the dialog. The re-dispatched Tab reaches the component strategy, which runs select-and-close logic. The dialog's native Tab trap only cycles between the close button and browser chrome — not useful for listbox navigation.
- **Escape:** The native `<dialog>` fires a `cancel` event on `Escape` key (handled separately). The re-dispatched `Escape` is a secondary path for parent components that also listen for `Escape` keydown.

#### Native Focusable Content (`nativeFocusableContent`)

The bridge's blanket `preventDefault()` + `stopPropagation()` on Tab assumed all bib consumers use a listbox navigated via `aria-activedescendant`, where nothing inside is directly focusable and Tab means "select + close." This assumption is incorrect for `auro-counter-group`, whose bib contains real focusable elements (increment/decrement buttons on each counter) that need native Tab navigation.

The `nativeFocusableContent` boolean property on `AuroDropdownBib` solves this. When `true`, the bridge skips Tab interception entirely — `preventDefault()` and `stopPropagation()` are not called, and the native Tab event proceeds normally. This allows:

- **Desktop:** The `FocusTrap` (created by `auro-dropdown`) manages Tab wrap-around between the focusable counter elements inside the bib.
- **Fullscreen:** The `<dialog>`'s native focus trap (from `showModal()`) keeps Tab cycling within the dialog's focusable content.

**How it's set:** The consumer component sets the property on the bib element during configuration. Counter-group sets it in `configureBibtemplate()`:

```js
if (this.dropdown.bibContent) {
  this.dropdown.bibContent.nativeFocusableContent = true;
}
```

**Effect on other keys:** Only Tab is affected. Arrow keys, Enter, and Escape continue to be intercepted and re-dispatched as before, regardless of `nativeFocusableContent`. Counter doesn't need these keys bridged — its buttons handle clicks natively and there is no listbox or `aria-activedescendant` navigation.

**When to use:** Set `nativeFocusableContent = true` on any bib consumer whose content contains real focusable elements that need native Tab navigation. Do not set it for listbox-based consumers (select, combobox) where Tab means "select + close."

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
| **Shift+Tab** | Moves visual focus to first non-disabled option, keeps popup open, no selection | Design decision |
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
| **Shift+Tab** | Moves visual focus to first non-disabled option, keeps dialog open, no selection | Design decision | Bridge re-dispatches Shift+Tab so behavior is identical in fullscreen and desktop |

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
| **Shift+Tab** | Moves visual focus to first non-disabled option, keeps dialog open, no selection | Design decision | Available regardless of clear button state; bridge re-dispatches Shift+Tab with `shiftKey` preserved |

### Fullscreen (Mobile) — Counter Dialog Open

Unlike select and combobox, the counter dialog contains **real focusable elements** — increment and decrement buttons on each counter. There is no listbox or `aria-activedescendant` navigation. The `nativeFocusableContent` flag on the bib tells the keyboard bridge to skip Tab interception, so native Tab behavior is preserved.

| Key | Behavior | Spec Basis | Notes |
|---|---|---|---|
| **Tab** | Moves focus to next focusable element in the dialog (close button, counter buttons) | Native `<dialog>` focus trap | Bridge does not intercept Tab due to `nativeFocusableContent` |
| **Shift+Tab** | Moves focus to previous focusable element in the dialog | Native `<dialog>` focus trap | Same as above |
| **Escape** | Closes the dialog, returns focus to trigger | Native `<dialog>` `cancel` event | Handled by `_setupCancelHandler` |
| **Enter** | Clicks the focused button (close, increment, or decrement) | Bridge Enter→click on buttons | Bridge still intercepts Enter for custom element click behavior |

### Desktop — Counter Popup Open

| Key | Behavior | Notes |
|---|---|---|
| **Tab** | Moves focus to next focusable counter element; wraps around at ends | `FocusTrap` manages wrap-around |
| **Shift+Tab** | Moves focus to previous focusable counter element; wraps around at ends | `FocusTrap` manages wrap-around |
| **Escape** | Closes the popup, returns focus to trigger | Re-dispatched by bridge |

---

## Key Combinations (Modifier Keys)

Modifier keys like Shift, Alt, Ctrl, and Meta are not separate entries in the strategy map. They arrive as boolean flags on the same `KeyboardEvent` as the base key — so `Shift+Tab` and `Tab` both route to `strategy['Tab']`, and the handler reads `evt.shiftKey` to distinguish them.

The dialog event bridge preserves all four modifier flags when re-dispatching events from inside the modal, so modifier-aware handlers work identically in fullscreen and desktop modes.

### Example: Shift+Tab

```js
Tab(component, evt, ctx) {
  if (!ctx.isExpanded) {
    return;
  }

  // Shift+Tab moves the highlight to the first non-disabled option
  // without making a selection or closing the bib.
  if (evt.shiftKey) {
    const firstActive = component.menu.menuService.menuOptions.find(o => o.isActive);
    if (firstActive) {
      component.menu.updateActiveOption(firstActive);
    }
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

| Component | Strategy File | Tab Handler | `nativeFocusableContent` | Effect |
|---|---|---|---|---|
| `auro-select` | `selectKeyboardStrategy.js` | Yes (strategy) | `false` (default) | Selects active option + closes |
| `auro-combobox` | `comboboxKeyboardStrategy.js` | Yes (strategy) | `false` (default) | Input → clear button → closes |
| `auro-datepicker` | None | Yes (direct listener) | `false` (default) | Closes fullscreen dialog |
| `auro-counter-group` | None | Native Tab | `true` | Tab moves focus between counters in bib |

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
