// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// Authoritative datepicker keyboard behavior spec:
//   components/datepicker/docs/partials/keyboardBehavior.md
//
// Current behavior (transitional — full bib keyboard navigation is planned for a future iteration):
//   - The bib opens and closes via pointer/touch interaction only.
//   - Escape closes the bib and prevents the event from reaching parent containers.
//   - Tab uses the browser's default tabindex sequence across trigger controls.
//   - Enter and Space do not open or close the bib.
//
// This file is an intentional placeholder for most keys. When datepicker bib keyboard navigation is
// added, handlers should go here following the same strategy pattern used by
// auro-select (selectKeyboardStrategy.js) and auro-combobox (comboboxKeyboardStrategy.js).
export const datepickerKeyboardStrategy = {
  Escape(component, evt) {
    if (!component.dropdown || !component.dropdown.isPopoverVisible) {
      return;
    }

    // Prevent the Escape key from bubbling up and closing any parent dialogs / drawers / popups.
    // Because stopPropagation prevents the document-level floatingUI keydown handler from
    // seeing this event, we must also close the dropdown explicitly.
    evt.stopPropagation();

    component.dropdown.hide();
  },
};
