# Dialog Implementation for Accessibility

## Problem Statement

The auro-dropdown component previously used the Popover API (`popover="manual"`) which does not make content outside the popover inert to screen readers. When the dropdown was open, voice-assisted technology (like VoiceOver) could still navigate to and interact with content behind the popover.

## Solution

Replaced the Popover API with `<dialog>` element using `showModal()` to provide proper accessibility support.

---

## Changes Made

### 1. `components/dropdown/src/auro-dropdownBib.js`

- Replaced `<div>` container with `<dialog>` element
- Added `open(modal)` method - uses `showModal()` by default for accessibility
- Added `close()` method
- Added `cancel` event handler for ESC key support

```javascript
open(modal = true) {
  const dialog = this.shadowRoot.querySelector('dialog');
  if (dialog && !dialog.open) {
    if (modal) {
      dialog.showModal();
    } else {
      dialog.show();
    }
  }
}

close() {
  const dialog = this.shadowRoot.querySelector('dialog');
  if (dialog && dialog.open) {
    dialog.close();
  }
}
```

### 2. `components/dropdown/src/auro-dropdown.js`

- Removed `FocusTrap` import (native dialog handles focus trapping)
- Updated `updated()` to call `bibElement.value.open()` / `close()` instead of `showPopover()` / `hidePopover()`
- Added listener for `auro-bib-cancel` event to handle ESC key
- Simplified `updateFocusTrap()` - now only focuses first element (dialog handles trapping)
- Updated `focus()` method to use `getFocusableElements` directly
- Removed `popover="manual"` from render template

### 3. `components/dropdown/src/styles/classic/bibStyles.scss`

Added dialog reset styles:

```scss
:host {
  dialog {
    border: none;
    padding: 0;
    background: transparent;
    max-width: none;
    max-height: none;
    margin: 0;

    &::backdrop {
      background: transparent;
    }
  }
}
```

---

## Test Results

| Component | Passed | Failed | Notes |
|-----------|--------|--------|-------|
| auro-dropdown | 20 | 0 | All tests pass |
| auro-combobox | 28 | 1 | Pre-existing failure, unrelated to changes |

The failing combobox test (`enforces menu selection when behavior is set to filter`) was failing before these changes - it's a pre-existing issue in the test suite.

---

## Accessibility Benefits

With `showModal()`, the dropdown now provides:

1. **Inert outside content** - Screen readers cannot navigate to content behind the dialog
2. **Native focus trapping** - Tab/Shift+Tab stays within the dialog
3. **Proper semantics** - Announced as a dialog to assistive technology
4. **ESC key handling** - Native dialog cancel event with proper delegation

---

## Backwards Compatibility

- All public methods (`show()`, `hide()`, `focus()`) continue to work
- All events (`auroDropdown-toggled`, etc.) continue to fire
- All attributes work unchanged
- Consumer components (combobox, datepicker, select) require no changes
- `disableFocusTrap` property honored via `show()` vs `showModal()`

---

## Files Modified

- `components/dropdown/src/auro-dropdownBib.js`
- `components/dropdown/src/auro-dropdown.js`
- `components/dropdown/src/styles/classic/bibStyles.scss`
