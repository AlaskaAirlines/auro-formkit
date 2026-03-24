// Copyright (c) 2026 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

export const datepickerKeyboardStrategy = {
  Enter(component, evt, ctx) {
    if (!ctx.isExpanded) {
      evt.preventDefault();
      component.dropdown.show();
    }
  },

  Tab(component, _evt, ctx) {
    if (ctx.isExpanded && ctx.isModal) {
      component.dropdown.hide();
    }
  },
};
