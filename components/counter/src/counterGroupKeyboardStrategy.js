// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

export const counterGroupKeyboardStrategy = {
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
