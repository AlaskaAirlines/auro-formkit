// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// Authoritative datepicker keyboard behavior spec:
//   components/datepicker/docs/partials/keyboardBehavior.md
//
// Current behavior (transitional — full bib keyboard navigation is planned for a future iteration):
//   - Escape closes the bib and prevents the event from reaching parent containers.
//   - Enter opens the bib when it is closed (trigger input only, not clear button).
//   - Space opens the bib when it is closed (trigger input only, not clear button).
//   - Tab uses the browser's default tabindex sequence across trigger controls.
//
// This file is an intentional placeholder for most keys. When datepicker bib keyboard navigation is
// added, handlers should go here following the same strategy pattern used by
// auro-select (selectKeyboardStrategy.js) and auro-combobox (comboboxKeyboardStrategy.js).
export const datepickerKeyboardStrategy = {
  Escape(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }

    // Stop propagation so parent containers (auro-dialog, auro-drawer)
    // don't also react to Escape.
    evt.stopPropagation();
    evt.preventDefault();

    component.hideBib();
  },

  Enter(component, evt, ctx) {
    if (ctx.isExpanded) {
      return;
    }

    // Only open from the trigger input, not the clear button or other internal elements.
    // evt.target is retargeted to the host in shadow DOM, so use composedPath()
    // to find the real origin. The clear button is rendered with class "clearBtn".
    const path = evt.composedPath();
    if (path.some(el => el.classList?.contains('clearBtn'))) {
      return;
    }

    evt.preventDefault();

    component.dropdown.show();
  },

  ' '(component, evt, ctx) {
    if (ctx.isExpanded) {
      return;
    }

    // Only open from the trigger input, not the clear button or other internal elements.
    // evt.target is retargeted to the host in shadow DOM, so use composedPath()
    // to find the real origin. The clear button is rendered with class "clearBtn".
    const path = evt.composedPath();
    if (path.some(el => el.classList?.contains('clearBtn'))) {
      return;
    }

    evt.preventDefault();

    component.dropdown.show();
  },
};
