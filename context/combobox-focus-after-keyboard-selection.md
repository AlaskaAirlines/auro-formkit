# Combobox Tab/Enter Clear-Button Focus Bug

## Expected Behavior (Desktop & Mobile)

1. Give combobox focus
2. Type a letter to get bib to open (first option auto-highlighted)
3. Use arrow keys to highlight a menu option
4. Hit Tab (or Enter)
5. Option is selected
6. Focus moves to `auro-input`'s clear button

## Actual Behavior

- **Tab (desktop)**: Option is partially selected but via the wrong API; focus stays on input, not clear button
- **Tab (fullscreen/mobile)**: Requires two Tab presses — first Tab focuses clear button without selecting, second Tab selects + closes bib
- **Enter**: Briefly focuses clear button, then focus is stolen back to the native `<input>` inside `auro-input`

---

## Investigative Findings

### Component Architecture

```
auro-combobox (main orchestrator)
  ├── input (auro-input) — trigger, visible on desktop; hidden/inert in fullscreen
  │     └── shadow DOM: native <input>, .clearBtn (auro-button)
  │           └── auro-button shadow DOM: <button>
  ├── dropdown (auro-dropdown)
  │     ├── trigger = auro-input (desktop)
  │     └── bibElement (auro-dropdownBib / <dialog>)
  │           └── inputInBib (auro-input) — used in fullscreen mode only
  └── menu (auro-menu — slotted)
        └── auro-menuoption elements
```

**Key property**: `auro-input` uses `delegatesFocus: true` (`components/input/src/base-input.js` L32–36) and overrides `focus()` to call `this.inputElement.focus()` (the native `<input>`, L837–839). This means **any call to `input.focus()` lands on the text field, not the clear button**.

### Keyboard Routing

`applyKeyboardStrategy` (`packages/utils/src/keyboard.js` L42–48) attaches a single `keydown` listener to the component and dispatches to `comboboxKeyboardStrategy[evt.key]`. In fullscreen mode, a `_setupKeyboardBridge` in `auro-dropdownBib.js` (L145–200) re-dispatches Tab/Arrow/Enter/Escape from inside the `<dialog>` with `composed: true` so they reach the combobox listener.

### Focus Restoration on Dropdown Close

`restoreTriggerAfterClose` (`packages/utils/src/a11y.js` L101–107):

```js
export function restoreTriggerAfterClose(dropdown, focusTarget) {
  dropdown.trigger.inert = false;
  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible) {
      focusTarget.focus();   // focusTarget = this.input (auro-input)
    }
  });
}
```

This is called from the `auroDropdown-toggled` handler in `auro-combobox.js` (~L770) every time the dropdown closes. Because `auro-input.focus()` delegates to the native `<input>`, this call always moves focus to the text field.

---

## Root Cause Analysis

### Issue 1 — Desktop Tab: wrong selection API (no clear-button focus)

**File**: `components/combobox/src/comboboxKeyboardStrategy.js` L108–112

```js
// Current — bypasses the selection event flow
if (component.menu.optionActive && component.menu.optionActive.value) {
  component.menu.value = component.menu.optionActive.value;
}
component.hideBib();
```

`component.menu.value = ...` is a direct property assignment that bypasses `makeSelection()` and the `auroMenu-selectedOption` event. Additionally, there is no attempt to focus the clear button at all.

### Issue 2 — Fullscreen Tab: requires two Tab presses

**File**: `components/combobox/src/comboboxKeyboardStrategy.js` L65–106

The fullscreen branch implements a two-step flow:
1. **First Tab**: detects clear button exists + input has a value → focuses the clear button *without selecting any option*
2. **Second Tab**: clear button now has focus → selects highlighted option + closes bib

The user expects a single Tab to both select and move focus to the clear button.

### Issue 3 — Enter: focus stolen by `restoreTriggerAfterClose`

**File**: `components/combobox/src/comboboxKeyboardStrategy.js` L44–50

```js
if (ctx.isExpanded && component.optionActive) {
  component.menu.makeSelection();
  await component.updateComplete;
  evt.preventDefault();
  evt.stopPropagation();
  component.setClearBtnFocus();   // ← focuses clear button ✓ ... briefly
}
```

`makeSelection()` fires the `auroMenu-selectedOption` event synchronously. That event listener in `auro-combobox.js` (~L988) schedules `hideBib()` in a `setTimeout(0)`. The sequence then is:

```
makeSelection()
  → auroMenu-selectedOption listener queues: setTimeout(hideBib, 0)
await updateComplete
setClearBtnFocus()        ← clear button receives focus ✓
--- microtask/task boundary ---
setTimeout fires: hideBib()
  → dropdown.hide()
  → auroDropdown-toggled fires (dropdownOpen = false)
    → restoreTriggerAfterClose(dropdown, this.input)
      → rAF: this.input.focus()   ← focus stolen back to <input> ✗
```

Because `auro-input` has `delegatesFocus: true`, `this.input.focus()` routes to the native text field, overriding the clear button focus set moments earlier.

---

## Fix Plan

### Strategy: `_pendingClearBtnFocus` flag

Introduce a `_pendingClearBtnFocus` boolean on the combobox. When set before `makeSelection()` / `hideBib()`, the `auroDropdown-toggled` close handler focuses the clear button instead of calling `restoreTriggerAfterClose`.

This decouples the focus decision from the keyboard handler and puts it in the one place that always runs on close, ensuring `restoreTriggerAfterClose`'s `rAF` never runs when a clear-button focus is pending.

### Change 1 — Fix Enter handler (`comboboxKeyboardStrategy.js`)

**Before**:
```js
if (ctx.isExpanded && component.optionActive) {
  component.menu.makeSelection();
  await component.updateComplete;
  evt.preventDefault();
  evt.stopPropagation();
  component.setClearBtnFocus();
}
```

**After**:
```js
if (ctx.isExpanded && component.optionActive) {
  evt.preventDefault();
  evt.stopPropagation();
  component._pendingClearBtnFocus = true;
  component.menu.makeSelection();
}
```

- Removes `await updateComplete` + `setClearBtnFocus()` — the toggled handler (Change 3) takes responsibility for focus.
- Sets flag *before* `makeSelection()` so it is in place when the deferred `hideBib()` fires.
- Moves `preventDefault`/`stopPropagation` before the flag so they always run (previously they only ran after `await`, which could theoretically be bypassed in odd timing).

### Change 2 — Simplify Tab handler (`comboboxKeyboardStrategy.js`)

**Before**: Two branches (fullscreen / desktop) with different logic; fullscreen requires two Tab presses; desktop uses wrong API.

**After** — unified single-Tab behavior:
```js
Tab(component, _evt, ctx) {
  if (!ctx.isExpanded) {
    return;
  }
  if (component.optionActive) {
    component._pendingClearBtnFocus = true;
    component.menu.makeSelection();
  }
  component.hideBib();
},
```

- Removes the `ctx.isModal` branching entirely.
- Uses `makeSelection()` (correct API) instead of `menu.value =`.
- Sets the flag before `makeSelection()` so the toggled handler focuses the clear button after close.
- `hideBib()` is synchronous and will fire `auroDropdown-toggled` before the `setTimeout(hideBib,0)` from the selection listener — making the deferred call a no-op.
- `getClearBtn` / `isClearBtnFocused` helpers are kept — still needed by Enter to detect clear-button-focused state.

### Change 3 — `_pendingClearBtnFocus` in `auroDropdown-toggled` handler (`auro-combobox.js`)

In the `!this.dropdownOpen` branch, replace:
```js
restoreTriggerAfterClose(this.dropdown, this.input);
```
with:
```js
if (this._pendingClearBtnFocus) {
  this._pendingClearBtnFocus = false;
  this.dropdown.trigger.inert = false;
  this.updateComplete.then(() => this.setClearBtnFocus());
} else {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

- `trigger.inert = false` must still be called (mirrors what `restoreTriggerAfterClose` does) so the trigger is reachable after the dialog closes.
- `updateComplete.then(setClearBtnFocus)` defers focus until Lit has re-rendered the selected value and the clear button is visible/enabled.

### Change 4 — Harden `setClearBtnFocus()` (`auro-combobox.js`)

**Before**:
```js
setClearBtnFocus() {
  const clearBtn = this.input.shadowRoot.querySelector('.clearBtn');
  if (clearBtn) {
    clearBtn.focus();
  }
}
```

**After**:
```js
setClearBtnFocus() {
  const clearBtn = this.input.shadowRoot.querySelector('.clearBtn');
  if (clearBtn) {
    const nativeBtn = clearBtn.shadowRoot && clearBtn.shadowRoot.querySelector('button');
    if (nativeBtn) {
      nativeBtn.focus();
    } else {
      clearBtn.focus();
    }
  }
}
```

Drills into the native `<button>` inside `auro-button`'s shadow root for cross-browser reliability. This mirrors the pattern already used in the old fullscreen Tab code and in the `hitting Enter on clear button` test.

---

## Files Changed

| File | Changes |
|------|---------|
| `components/combobox/src/comboboxKeyboardStrategy.js` | Fix Enter handler (remove `await`/`setClearBtnFocus`, add flag); simplify Tab handler (unify modes, fix API) |
| `components/combobox/src/auro-combobox.js` | Add `_pendingClearBtnFocus` branch in toggled handler; harden `setClearBtnFocus()` |

## Files Referenced (not changed)

| File | Relevance |
|------|-----------|
| `packages/utils/src/a11y.js` L101–107 | `restoreTriggerAfterClose` — the focus-stealing mechanism |
| `packages/utils/src/keyboard.js` L12–48 | `createDisplayContext`, `applyKeyboardStrategy` — event routing |
| `components/input/src/base-input.js` L32–36, L837–839 | `delegatesFocus: true`, `focus()` override — why `input.focus()` goes to native `<input>` |
| `components/input/src/auro-input.js` L415–442 | Clear button template — `.clearBtn` is an `auro-button` web component |
| `components/dropdown/src/auro-dropdownBib.js` L145–200 | `_setupKeyboardBridge` — re-dispatches keys from inside `<dialog>` |
| `components/menu/src/auro-menu.js` L608, L656–682 | `makeSelection()`, `handleKeyDown()`, `navigateOptions()` |

---

## Tests to Update / Add

| Test | File | Action |
|------|------|--------|
| `selects the current active option when hitting Tab key` | `test/auro-combobox.test.js` L223 | Update to assert clear button is focused after Tab |
| `Tab key closes fullscreen dialog` | `test/auro-combobox.test.js` L273 | Update to reflect single-Tab (select + close + clear btn focus) |
| `makes a selection using the keyboard` | `test/auro-combobox.test.js` L674 | Update Enter test to assert clear button focus |
| `Tab selects option and focuses clear button (desktop)` | `test/auro-combobox.test.js` | Add new test |
| `Tab selects option and focuses clear button (fullscreen)` | `test/auro-combobox.test.js` | Add new test |
| `Enter selects option and focuses clear button` | `test/auro-combobox.test.js` | Add new test |

---

## Verification Checklist

- [ ] Desktop: type → arrow → Tab → option selected, clear button focused
- [ ] Mobile/fullscreen: type → arrow → Tab → option selected, clear button focused (single Tab)
- [ ] Desktop: type → arrow → Enter → option selected, clear button focused
- [ ] Mobile/fullscreen: type → arrow → Enter → option selected, clear button focused
- [ ] Tab with no highlighted option just closes the bib (no error)
- [ ] Tab from clear button still closes the bib
- [ ] Enter on clear button clears the input (existing behavior unchanged)
- [ ] Arrow keys still navigate options correctly
- [ ] `restores trigger inert and focus after fullscreen dialog closes` test still passes
- [ ] Full combobox test suite passes

---

## Post-Fix Investigation (March 25, 2026)

### Current State After Changes 1–4

The Tab handler unification (Change 2) is working:
- **Desktop**: single Tab selects the highlighted option and closes the bib ✓
- **Mobile/fullscreen**: single Tab selects the highlighted option and closes the bib ✓ (no longer requires two Tab presses)

**Remaining issue**: focus still does not land on the clear button after the bib closes — on both desktop and mobile.

### Root Cause: Clear Button Hidden by CSS When Input Lacks Focus

**File**: `components/input/src/styles/style-css.js`

The relevant CSS rule:
```css
.wrapper:not(:focus-within):not(:hover) .notification.clear { display: none }
```

`.clearBtn` (`auro-button`) lives inside `.notification.clear`. When the bib closes, the `auro-input` trigger does not have focus (it was made `inert` during fullscreen; on desktop, focus was inside the bib). Therefore `:focus-within` on `.wrapper` is `false`, and `.notification.clear` has `display: none`.

Calling `nativeBtn.focus()` on a button that is inside a `display: none` ancestor is a **no-op** in all browsers — the element is not focusable. `setClearBtnFocus()` finds the element in the DOM but its `focus()` call silently fails.

### Why `updateComplete.then(setClearBtnFocus)` Does Not Help

Deferring via `updateComplete` gives Lit time to render the selected value, but it does not change the `:focus-within` state of the input's `.wrapper`. The clear container remains `display: none` regardless of when `focus()` is called.

### Why Focusing `auro-input` First Would Cause a Regression

Focusing the native `<input>` inside `auro-input` to establish `:focus-within` is unsafe: the combobox's input focus handler calls `showBib()`, and because a value is now set (`this.input.value.length > 0`), this would **re-open the bib** immediately after closing it.

### Fix: Force `.notification.clear` Visible Before Focusing

The correct fix is to temporarily force the clear container visible with an inline style, focus the native button, then clean up the inline style on `focusout`. This is the same pattern the old fullscreen Tab code already used successfully:

```js
const clearContainer = clearBtn.closest('.clear');
if (clearContainer) {
  clearContainer.style.display = 'flex';
  clearBtn.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      clearContainer.style.display = '';
    });
  }, { once: true });
}
```

**Updated Change 4** — `setClearBtnFocus()` in `auro-combobox.js`:

```js
setClearBtnFocus() {
  const clearBtn = this.input.shadowRoot.querySelector('.clearBtn');
  if (!clearBtn) {
    return;
  }
  // .notification.clear is hidden by CSS when the wrapper lacks :focus-within.
  // Force it visible so the native button is focusable, clean up on blur.
  const clearContainer = clearBtn.closest('.clear');
  if (clearContainer) {
    clearContainer.style.display = 'flex';
    clearBtn.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        clearContainer.style.display = '';
      });
    }, { once: true });
  }
  const nativeBtn = clearBtn.shadowRoot && clearBtn.shadowRoot.querySelector('button');
  if (nativeBtn) {
    nativeBtn.focus();
  } else {
    clearBtn.focus();
  }
}
```

---

### Why `updateComplete.then()` Failed — and Why `setTimeout(0)` Is Required

Even after the CSS display fix, using `this.updateComplete.then(() => this.setClearBtnFocus())` still failed to land focus on the clear button. Root cause: listener registration order governs microtask scheduling.

`auroDropdown-toggled` is dispatched synchronously from `floater.hideBib()`. Two listeners are registered on the dropdown element:

1. **Dropdown's own `handleDropdownToggle`** — registered first (in dropdown's `firstUpdated`). Sets `isPopoverVisible = false` → schedules **dropdown Lit update microtask**.
2. **Combobox's listener** — registered second. Sets `dropdownOpen = false` → schedules **combobox Lit update microtask** + `updateComplete.then(setClearBtnFocus)`.

Microtask execution order:
```
[1] Dropdown Lit update  → updated() → bibElement.value.close()
                                      → dialog.close()
                                      → browser synchronously restores focus to trigger ✗
[2] Combobox Lit update  → updateComplete resolves
[3] setClearBtnFocus()   → focuses clear button ... but only if it ran last
```

On **mobile/fullscreen**: `dialog.showModal()` sets a "previously focused element" on the native `<dialog>`. When `dialog.close()` is called in step [1], the browser **synchronously** returns focus to that element (the trigger input). Step [3] runs after and should win — but the exact microtask vs. task interleaving proved unreliable in practice.

On **desktop**: the bib's `<dialog>` is opened via `dialog.setAttribute('open', '')` (not `showModal()`/`show()`), so native `dialog.close()` focus restoration does NOT apply. However, the browser's default Tab action (not `preventDefault()`'d) moves focus away before microtasks drain.

**Fix**: Replace `updateComplete.then()` with `setTimeout(() => this.setClearBtnFocus(), 0)`. A `setTimeout(0)` callback is a new **macrotask** — it only begins executing after the current task AND all microtasks (Lit updates, `dialog.close()`, native Tab behavior) have fully settled. `setClearBtnFocus()` therefore unconditionally has the last word on focus.

```js
if (this._pendingClearBtnFocus) {
  this._pendingClearBtnFocus = false;
  this.dropdown.trigger.inert = false;
  // setTimeout(0): runs as a new task after all Lit update microtasks,
  // dialog.close() focus restoration, and native Tab movement settle.
  setTimeout(() => this.setClearBtnFocus(), 0);
} else {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

---

### Why Mobile Focus Still Failed — `handleInputValueChange` Re-opens the Bib

Even with all the changes above, focus still didn't reach the clear button on mobile. The remaining bug was in the Tab handler's synchronous `hideBib()` call.

**The culprit**: `handleInputValueChange` in `auro-combobox.js` contains an iOS keyboard-retention guard:

```js
if (this.dropdown.isBibFullscreen && this.input.value && this.input.value.length > 0) {
  if (!this.dropdown.isPopoverVisible) {
    this.showBib();  // ← re-opens the bib!
  }
  if (this.dropdown.isPopoverVisible) {
    this.setInputFocus();
  }
}
```

**The trigger chain**:
1. Tab handler: `_pendingClearBtnFocus = true`, `makeSelection()`, then `hideBib()` (synchronous)
2. `hideBib()` sets `isPopoverVisible = false` synchronously (via `floater.hideBib()`)
3. `makeSelection()` fired `auroMenu-selectedOption` which called `updateTriggerTextDisplay()` → `this.input.value = selectedLabel`
4. Setting `this.input.value` schedules a **Lit microtask** on `auro-input` → `updated()` → `notifyValueChanged()` → dispatches 'input' event → `handleInputValueChange` runs
5. `handleInputValueChange` sees `isBibFullscreen=true`, `input.value.length > 0`, and **`isPopoverVisible=false`** (closed in step 2)
6. `showBib()` is called → fullscreen dialog re-opens, focus is trapped inside
7. `setTimeout(0, setClearBtnFocus)` fires → tries to focus the clear button in the trigger input, but the dialog's native focus trap prevents any focus outside the dialog → **no-op**

**On desktop**: `isBibFullscreen = false`, so the iOS block is skipped entirely. But the browser's default Tab action (the Tab handler never called `evt.preventDefault()`) moved focus to the next element outside the combobox. `setClearBtnFocus()` in `setTimeout(0)` correctly wins that race on desktop.

**The fix** (`comboboxKeyboardStrategy.js` Tab handler):
1. Add `evt.preventDefault()` — prevents the browser from natively tabbing away on desktop (redundant but harmless on mobile where the bridge already prevents it)
2. **Remove the synchronous `hideBib()` call** in the `optionActive` branch — rely on the `setTimeout(hideBib, 0)` already deferred by `auroMenu-selectedOption`. When `handleInputValueChange` fires in its Lit microtask, `isPopoverVisible` is still `true`, so `showBib()` is NOT called. When the deferred `hideBib()` timer finally fires, the toggle handler reads `_pendingClearBtnFocus = true` and queues `setClearBtnFocus()`. All is well.

```js
Tab(component, evt, ctx) {
  if (!ctx.isExpanded) {
    return;
  }
  if (component.optionActive) {
    evt.preventDefault();
    component._pendingClearBtnFocus = true;
    component.menu.makeSelection();
    // Do NOT call hideBib() here — makeSelection() defers it via
    // auroMenu-selectedOption's setTimeout(hideBib). Calling hideBib()
    // synchronously sets isPopoverVisible=false, causing
    // handleInputValueChange's Lit microtask to call showBib() (iOS guard),
    // re-opening the dialog and trapping focus before setClearBtnFocus fires.
    return;
  }
  component.hideBib();
},
```

---

## Refactor: Eliminate Duplicated `restoreTriggerAfterClose` Responsibilities (March 26, 2026)

### Issue

The `_pendingClearBtnFocus` branch in the `auroDropdown-toggled` handler manually called `this.dropdown.trigger.inert = false` — a direct copy of the first line of `restoreTriggerAfterClose`. If `restoreTriggerAfterClose` ever gains additional cleanup (ARIA attribute resets, tabindex restoration, etc.), the combobox branch would silently miss it and diverge. The branch was partially reimplementing a shared utility's responsibilities.

### Fix: Optional Callback on `restoreTriggerAfterClose`

**File**: `packages/utils/src/a11y.js`

Added an optional third parameter `onAfterRestore`. When provided, it is invoked **instead of** `focusTarget.focus()` inside the existing `requestAnimationFrame` guard. All trigger-restoration cleanup (clearing `inert`, and any future additions) still runs unconditionally. Call sites that omit the third argument are unaffected.

```js
export function restoreTriggerAfterClose(dropdown, focusTarget, onAfterRestore) {
  dropdown.trigger.inert = false;

  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible) {
      if (typeof onAfterRestore === 'function') {
        onAfterRestore();
      } else {
        focusTarget.focus();
      }
    }
  });
}
```

**Why `onAfterRestore` replaces rather than supplements `focusTarget.focus()`**: if both ran, the input would briefly receive focus before the `setTimeout(0)` inside the callback stole it back — a visible focus flicker. The if/else ensures only one focus action occurs.

**File**: `components/combobox/src/auro-combobox.js`

The `_pendingClearBtnFocus` branch no longer manually sets `trigger.inert = false`. It delegates to `restoreTriggerAfterClose` with a callback:

**Before**:
```js
if (this._pendingClearBtnFocus) {
  this._pendingClearBtnFocus = false;
  this.dropdown.trigger.inert = false;
  setTimeout(() => this.setClearBtnFocus(), 0);
} else {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

**After**:
```js
if (this._pendingClearBtnFocus) {
  this._pendingClearBtnFocus = false;
  restoreTriggerAfterClose(this.dropdown, this.input, () => {
    setTimeout(() => this.setClearBtnFocus(), 0);
  });
} else {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

### Timing Analysis

Previously `setTimeout(0, setClearBtnFocus)` was scheduled directly from the synchronous `auroDropdown-toggled` event handler. Now it is scheduled from inside a `requestAnimationFrame` callback. The new sequence is `rAF + setTimeout(0)` — at least as late as before. All microtasks (`dialog.close()`, Lit updates, native focus restoration) have fully settled long before the `rAF` fires, so `setClearBtnFocus()` still unconditionally has the last word on focus.

---

## Hardening `setClearBtnFocus()` Against Orphaned Inline Styles (March 26, 2026)

### Issue

The previous implementation registered the `focusout` cleanup listener *before* calling `focus()`. If `focus()` silently failed for any reason — element inert, disabled, inside a `display: none` ancestor that the force-show missed, or any future browser quirk — `focusout` would never fire. The result: `clearContainer.style.display = 'flex'` would remain set permanently, leaving the clear button unconditionally visible regardless of hover/focus state.

### Fix: Verify Focus Landed Before Attaching the Cleanup Listener

**File**: `components/combobox/src/auro-combobox.js`

**Before**:
```js
if (clearContainer) {
  clearContainer.style.display = 'flex';
  clearBtn.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      clearContainer.style.display = '';
    });
  }, { once: true });
}
const nativeBtn = clearBtn.shadowRoot && clearBtn.shadowRoot.querySelector('button');
if (nativeBtn) {
  nativeBtn.focus();
} else {
  clearBtn.focus();
}
```

**After**:
```js
if (clearContainer) {
  clearContainer.style.display = 'flex';
}
const nativeBtn = clearBtn.shadowRoot && clearBtn.shadowRoot.querySelector('button');
if (nativeBtn) {
  nativeBtn.focus();
} else {
  clearBtn.focus();
}

// If focus failed, clean up the inline style immediately.
const focusLanded = clearBtn.shadowRoot
  ? clearBtn.shadowRoot.activeElement !== null
  : document.activeElement === clearBtn;

if (clearContainer) {
  if (focusLanded) {
    clearBtn.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        clearContainer.style.display = '';
      });
    }, { once: true });
  } else {
    clearContainer.style.display = '';
  }
}
```

**Why check `shadowRoot.activeElement` rather than `document.activeElement`**: `auro-button` has a shadow root. After `nativeBtn.focus()`, the browser sets `clearBtn.shadowRoot.activeElement = nativeBtn` and sets `document.activeElement` to `clearBtn` (the host). Checking `shadowRoot.activeElement !== null` is the most direct signal that focus actually entered the shadow tree; `document.activeElement === clearBtn` would be the fallback for the non-shadow case.

**Why `{ once: true }` on the `focusout` listener is still safe**: Once focus is confirmed landed, the listener is guaranteed to fire exactly once when the user tabs or clicks away, and the `{ once: true }` option removes it automatically. No leak path remains.

---

## Test Added: Tab Selects Option and Focuses Clear Button (March 26, 2026)

**File**: `components/combobox/test/auro-combobox.test.js`

Added `'Tab selects highlighted option and focuses trigger clear button'` inside `runFulltest` — runs for both desktop (`mobileview = false`) and mobile (`mobileview = true`).

**What it asserts**:
1. Type `'a'` to open the bib; on mobile explicitly focus `inputInBib`
2. `ArrowDown` highlights the first option
3. Dispatch `Tab` with `bubbles: true, cancelable: true`
4. `await oneEvent(el, 'auroDropdown-toggled')` — waits for the bib to close
5. Drain `rAF + setTimeout(0)` to let `setClearBtnFocus()` complete (matches the `rAF` inside `restoreTriggerAfterClose` callback + `setTimeout(0)` inside `setClearBtnFocus`)
6. Assert `el.value === 'Apples'`
7. Assert `clearBtn.shadowRoot.activeElement === nativeBtn`

**Why `oneEvent` before draining timers**: The bib closes asynchronously — `makeSelection()` defers `hideBib` via `auroMenu-selectedOption`'s `setTimeout`. Registering the `oneEvent` listener before dispatching Tab avoids the race where the event fires before the `await` is reached.

---

## Fix: Deferred `trigger.inert` Removal to Prevent Double VoiceOver Announcement (March 26, 2026)

### Issue

After the `restoreTriggerAfterClose` callback refactor, `trigger.inert = false` was still called **synchronously** at the top of the function — before the `rAF`. This created the following sequence when `_pendingClearBtnFocus` was set:

```
restoreTriggerAfterClose() called
  → trigger.inert = false   ← trigger immediately accessible
Lit microtask fires
  → dialog.close()
  → browser restores focus to trigger (trigger is no longer inert)
  → VoiceOver announces trigger input   ✗ (spurious announcement)
rAF fires
  → callback → setTimeout(0) → setClearBtnFocus()
  → VoiceOver announces clear button   ✓
```

Result: VoiceOver makes two consecutive announcements — first the trigger input, then the clear button.

### Fix: `packages/utils/src/a11y.js`

When a callback is provided, defer `trigger.inert = false` to *inside* the `rAF`, immediately before invoking the callback. The default (no-callback) path is unchanged — `inert` is still cleared immediately so the trigger is focusable when the `rAF` fires.

**Before**:
```js
export function restoreTriggerAfterClose(dropdown, focusTarget, onAfterRestore) {
  dropdown.trigger.inert = false;

  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible) {
      if (typeof onAfterRestore === 'function') {
        onAfterRestore();
      } else {
        focusTarget.focus();
      }
    }
  });
}
```

**After**:
```js
export function restoreTriggerAfterClose(dropdown, focusTarget, onAfterRestore) {
  // Default path: clear inert immediately so the trigger is focusable when
  // the rAF fires. With no callback, dialog.close() restoring focus to the
  // trigger is fine.
  if (!onAfterRestore) {
    dropdown.trigger.inert = false;
  }

  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible) {
      if (typeof onAfterRestore === 'function') {
        // Defer inert removal to here so dialog.close() (microtask) cannot
        // restore focus to the trigger before the callback's target takes over.
        dropdown.trigger.inert = false;
        onAfterRestore();
      } else {
        focusTarget.focus();
      }
    }
  });
}
```

### Corrected Sequence

```
restoreTriggerAfterClose() called
  → trigger stays inert (callback path)
Lit microtask fires
  → dialog.close()
  → browser tries to restore focus to trigger — blocked (still inert)   ✓
rAF fires
  → trigger.inert = false
  → callback → setTimeout(0) → setClearBtnFocus()
  → VoiceOver announces clear button only   ✓
```

### Why the Combobox Side Doesn't Change

The `_pendingClearBtnFocus` branch in `auro-combobox.js` passes its callback through `restoreTriggerAfterClose` and doesn't interact with `inert` directly. All the timing logic remains encapsulated in the utility.

### Call Sites Unaffected

`auro-select.js` and `auro-datepicker.js` both call `restoreTriggerAfterClose` without a callback — they take the `if (!onAfterRestore)` early-clear path and behave identically to before.

---

## Rebase Regression (March 26, 2026)

After rebasing off the latest `dev` branch, the Tab handler in `components/combobox/src/comboboxKeyboardStrategy.js` reverted to the old two-step `ctx.isModal` flow that was removed in Change 2:

- **Desktop** path called `hideBib()` with no `_pendingClearBtnFocus` set and no `makeSelection()` call — option was not selected and focus was not moved to the clear button.
- **Fullscreen/mobile** path restored the two-Tab requirement — first Tab focused the clear button without selecting; second Tab selected + closed.

All other changes were intact after the rebase: the Enter handler, `_pendingClearBtnFocus` check in the `auroDropdown-toggled` handler, `setClearBtnFocus()`, and the `restoreTriggerAfterClose` callback extension in `packages/utils/src/a11y.js`.

**Re-applied fix**: Replaced the `ctx.isModal` branch (and trailing `component.hideBib()`) with the unified logic from Change 2, preserving the Shift+Tab block added by the `dev` branch:

```js
if (component.optionActive) {
  evt.preventDefault();
  component._pendingClearBtnFocus = true;
  component.menu.makeSelection();
  // Do NOT call hideBib() synchronously — see mobile iOS guard explanation above.
  return;
}
component.hideBib();
```

---

## Note: Select Component Parity

The select component's Tab handler (`components/select/src/selectKeyboardStrategy.js`) also does not focus the clear button after selection. It calls `component.dropdown.hide()` without setting any focus flag. Recommend applying the same `_pendingClearBtnFocus` pattern to `auro-select` as a follow-up task.

---

## Approach Comparison: Before vs. After `fceb934` (March 26, 2026)

Both approaches solved the same bug (Tab/Enter selection not landing focus on the clear button). The key difference is whether `packages/utils/src/a11y.js` is modified.

### Approach A — `_pendingClearBtnFocus` + `a11y.js` callback (commits `b92fd733`–`26d6ce10`)

**Mechanism:** Extended `restoreTriggerAfterClose` with an optional third `onAfterRestore` callback. When provided, `trigger.inert = false` is deferred to *inside* the `rAF` so that `dialog.close()`'s native focus restoration (a microtask before the `rAF`) cannot move focus to the trigger first and produce a spurious VoiceOver announcement.

Combobox close handler:
```js
if (this._pendingClearBtnFocus) {
  this._pendingClearBtnFocus = false;
  restoreTriggerAfterClose(this.dropdown, this.input, () => {
    setTimeout(() => this.setClearBtnFocus(), 0);
  });
} else {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

Tab handler — unified, no `ctx.isModal` branching:
```js
Tab(component, evt, ctx) {
  if (!ctx.isExpanded) { return; }
  if (component.optionActive) {
    evt.preventDefault();
    component._pendingClearBtnFocus = true;
    component.menu.makeSelection();
    // Do NOT call hideBib() synchronously — iOS guard in handleInputValueChange
    // would see isPopoverVisible=false and re-open the bib.
    return;
  }
  component.hideBib();
},
```

Enter handler — synchronous, no `await`:
```js
if (ctx.isExpanded && component.optionActive) {
  evt.preventDefault();
  evt.stopPropagation();
  component._pendingClearBtnFocus = true;
  component.menu.makeSelection();
}
```

| Property | Value |
|---|---|
| `a11y.js` modified | Yes — adds optional callback parameter |
| Flags on combobox | `_pendingClearBtnFocus` (1 flag) |
| `showBib()` guard | Not needed |
| Tab handler | Unified (no `ctx.isModal` branch) |
| Enter handler | Synchronous |
| VoiceOver double-announce | Prevented by deferred `inert` removal inside `rAF` |

---

### Approach B — `_focusClearBtnAfterClose` + `_clearBtnFocusPending` + `focusin` intercept (commit `fceb934`)

**Mechanism:** Does not touch `a11y.js`. Calls `restoreTriggerAfterClose` with 2 args as normal, then intercepts the browser's own `dialog.close()` focus restoration via a `focusin` listener on the input, and redirects focus from the `rAF` inside that listener.

Combobox close handler:
```js
const shouldFocusClearBtn = this._focusClearBtnAfterClose;
this._focusClearBtnAfterClose = false;

if (shouldFocusClearBtn) {
  this._clearBtnFocusPending = true;
  restoreTriggerAfterClose(this.dropdown, this.input);

  if (this.input.componentHasFocus) {
    // Desktop: already has focus, redirect after rAF
    requestAnimationFrame(() => {
      this.setClearBtnFocus();
      this._clearBtnFocusPending = false;
    });
  } else {
    // Fullscreen: wait for dialog.close() to restore focus to input, then redirect
    const onFocus = () => {
      this.input.removeEventListener('focusin', onFocus);
      requestAnimationFrame(() => {
        this.setClearBtnFocus();
        this._clearBtnFocusPending = false;
      });
    };
    this.input.addEventListener('focusin', onFocus);
  }
} else if (!this._clearBtnFocusPending) {
  restoreTriggerAfterClose(this.dropdown, this.input);
}
```

Tab handler — re-introduces `ctx.isModal` branching; calls `hideBib()` synchronously in modal path:
```js
if (ctx.isModal) {
  if (component.optionActive) {
    evt.preventDefault();
    component._focusClearBtnAfterClose = true;
    component._clearBtnFocusPending = true;
    component.menu.makeSelection();
    component.hideBib();   // ← synchronous close in modal path
    return;
  }
  // ... clear button tab stop logic ...
}
// Non-fullscreen path
if (component.optionActive) {
  evt.preventDefault();
  component._focusClearBtnAfterClose = true;
  component._clearBtnFocusPending = true;
  component.menu.makeSelection();
}
component.hideBib();
```

Enter handler — `async/await` with direct `setClearBtnFocus()` call:
```js
async Enter(component, evt, ctx) {
  if (ctx.isExpanded && component.optionActive) {
    component.menu.makeSelection();
    await component.updateComplete;
    evt.preventDefault();
    evt.stopPropagation();
    component.setClearBtnFocus();
  }
}
```

`showBib()` guard added at the top of `showBib()`:
```js
showBib() {
  if (this._clearBtnFocusPending) { return; }
  // ...
}
```

| Property | Value |
|---|---|
| `a11y.js` modified | No |
| Flags on combobox | `_focusClearBtnAfterClose` + `_clearBtnFocusPending` (2 flags) |
| `showBib()` guard | Yes — required to suppress iOS re-open when `hideBib()` is called synchronously in modal path |
| Tab handler | Re-introduces `ctx.isModal` branching |
| Enter handler | `async/await` |
| VoiceOver double-announce | Mitigated by `focusin` interception (browser restores focus to trigger, listener immediately redirects) |

---

### Why Approach A Modified `a11y.js`

The `_pendingClearBtnFocus` flag in Approach A handled `trigger.inert = false` manually at first:

```js
this.dropdown.trigger.inert = false;
setTimeout(() => this.setClearBtnFocus(), 0);
```

This was a copy of `restoreTriggerAfterClose`'s first line. If that utility ever gained additional cleanup (ARIA resets, tabindex, etc.), the combobox branch would silently diverge. The callback extension was a refactor to keep all trigger-restoration logic inside the utility — the combobox branch delegates fully rather than partially reimplementing it.

The deferred `inert` removal (moving `trigger.inert = false` inside the `rAF` when a callback is provided) was a subsequent fix for a VoiceOver double-announcement: with `inert` cleared synchronously, `dialog.close()` could restore focus to the (now accessible) trigger before the callback ran, causing VoiceOver to announce the trigger input first and the clear button second.

### Summary

Both approaches work. Approach A keeps the keyboard strategy simple (no modal branching, synchronous Enter) at the cost of a small, backward-compatible extension to a shared utility. Approach B keeps all changes inside the combobox files at the cost of two flags, a `showBib()` guard, re-introduced modal branching in the Tab handler, and an `async` Enter handler.
