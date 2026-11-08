// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/**
 * Holds the counter's keyboard handlers: `ArrowUp` raises the value by 1, and `ArrowDown` lowers it by 1. Neither key does anything while the counter is disabled.
 */
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
