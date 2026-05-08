// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

export const keyboardStrategy = {
  ArrowUp(component, _evt) {
    if (component.disabled) {
      return;
    }

    _evt.preventDefault();
    component.increment();
  },

  ArrowDown(component, _evt) {
    if (component.disabled) {
      return;
    }

    _evt.preventDefault();
    component.decrement();
  }
};
