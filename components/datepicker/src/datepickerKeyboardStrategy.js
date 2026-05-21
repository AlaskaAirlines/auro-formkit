// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// Keyboard strategy for auro-datepicker after the Cally rewrite.
//
// Cally owns calendar-grid keyboard navigation when focus is inside the
// <calendar-range>/<calendar-date> element (Arrow keys, Home/End, PageUp/PageDown,
// Enter/Space). This strategy handles:
//   - Escape: close the bib and restore focus to the originating input
//   - ArrowDown on the trigger input: open the bib and move focus into the calendar
//   - Enter/Space on the trigger input: open the bib
//
// Focus return is the responsibility of `configureDropdown` (via `hasFocus` check),
// so we just close the bib here and let the auro-dropdown lifecycle settle focus.
export const datepickerKeyboardStrategy = {
  Escape(component, evt) {
    if (!component.dropdown || !component.dropdown.isPopoverVisible) {
      return;
    }
    evt.stopPropagation();
    component.dropdown.hide();
  },

  ArrowDown(component, evt) {
    if (!component.dropdown) {
      return;
    }
    const [target] = evt.composedPath();
    if (component.inputList && component.inputList.some((input) => input === target || input.contains(target))) {
      if (!component.dropdown.isPopoverVisible) {
        component.dropdown.show();
      }
      evt.preventDefault();
      requestAnimationFrame(() => component.focusCalendar());
    }
  },

  Enter(component, evt) {
    if (!component.dropdown) {
      return;
    }
    const [target] = evt.composedPath();
    if (component.inputList && component.inputList.some((input) => input === target || input.contains(target))) {
      if (!component.dropdown.isPopoverVisible) {
        component.dropdown.show();
        evt.preventDefault();
      }
    }
  }
};
