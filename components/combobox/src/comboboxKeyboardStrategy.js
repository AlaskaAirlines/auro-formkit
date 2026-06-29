/* eslint-disable no-underscore-dangle */
import { navigateArrow } from '@aurodesignsystem/utils';

/**
 * Returns the clear button element from the active input's shadow
 * DOM, if available.
 * @param {Object} ctx - Display context with activeInput.
 * @returns {Element|null}
 */
function getClearBtn(ctx) {
  const root = ctx && ctx.activeInput && ctx.activeInput.shadowRoot;
  if (!root) {
    return null;
  }
  return root.querySelector('.clearBtn');
}

/**
 * Returns true when the clear button inside the active input's shadow DOM has focus.
 * Uses shadowRoot.activeElement to detect focus inside auro-button,
 * since Safari does not propagate :focus-within through shadow DOM.
 * @param {Object} ctx - Display context with activeInput.
 * @param {Element} [clearBtn=getClearBtn(ctx)] - Pre-fetched clear button element.
 * @returns {boolean}
 */
function isClearBtnFocused(ctx, clearBtn = getClearBtn(ctx)) {
  if (!clearBtn) {
    return false;
  }
  const isFocused = Boolean(clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null);
  return isFocused;
}

/**
 * Reconcile the menu `_index` from `optionActive` so subsequent `makeSelection` calls find the correct option after async clearSelection has reset it.
 * @param {Object} menu - The menu component.
 */
function reconcileMenuIndex(menu) {
  if (menu._index < 0 && menu.optionActive && menu.items) {
    const idx = menu.items.indexOf(menu.optionActive);
    if (idx >= 0) {
      menu._index = idx;
    }
  }
}

export const comboboxKeyboardStrategy = {
  ArrowDown(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowDown normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    // option display and navigation are prevented if there are no available options
    if (component.availableOptions.length > 0) {
      evt.preventDefault();

      // navigate if bib is open otherwise open it
      if (component.dropdown.isPopoverVisible) {
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          component.activateLastEnabledAvailableOption();
        } else {
          navigateArrow(component, 'down');
        }
      } else {
        component.showBib();
      }
    }
  },

  ArrowUp(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowUp normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    // option display and navigation are prevented if there are no available options
    if (component.availableOptions.length > 0) {
      evt.preventDefault();

      // navigate if bib is open otherwise open it
      if (component.dropdown.isPopoverVisible) {
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          component.activateFirstEnabledAvailableOption();
        } else {
          navigateArrow(component, 'up');
        }
      } else {
        component.showBib();
      }
    }
  },

  End(component, evt, ctx) {
    if (ctx.isExpanded) {
      evt.preventDefault();
      evt.stopPropagation();
      component.activateLastEnabledAvailableOption();
    }
  },

  Enter(component, evt, ctx) {
    // Forms should not submit on Enter from a combobox, regardless of which
    // child element (input, clear button, menu) is focused.
    evt.stopPropagation();

    if (isClearBtnFocused(ctx)) {
      // Let the browser dispatch Enter to the focused clear button so its
      // built-in activation fires and clears the selection. Do NOT call
      // preventDefault — that would block the activation.
      return;
    }

    if (ctx.isExpanded && component.menu.optionActive) {
      reconcileMenuIndex(component.menu);
      component.menu.makeSelection();

      if (ctx.isModal) {
        component.setTriggerInputFocus();
      }

      evt.preventDefault();
    } else {
      evt.preventDefault();
      component.showBib();
    }
  },

  Escape(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }

    // Prevent the Escape key from bubbling up and closing any parent dialogs / drawers / popups
    evt.stopPropagation();

    if (ctx.isModal) {
      component.setTriggerInputFocus();
    }

    component.hideBib();
  },

  Home(component, evt, ctx) {
    if (ctx.isExpanded) {
      evt.preventDefault();
      evt.stopPropagation();
      component.activateFirstEnabledAvailableOption();
    }
  },

  Tab(component, evt, ctx) {
    if (ctx.isExpanded && !isClearBtnFocused(ctx)) {
      // When the clear button is focused, Tab events do not bubble out of
      // its shadow DOM, so this handler only fires when the clear button
      // is NOT focused. In that case, select the active option and close.
      reconcileMenuIndex(component.menu);
      component.menu.makeSelection();
      component.hideBib();

      // In fullscreen modal mode, closing the dialog does not
      // automatically restores focus to the input. In the tab case,
      // Explicitly move focus to the trigger's clear button so the
      // user can continues tabbing through the page normally.
      if (ctx.isModal && !evt.shiftKey) {
        component.setClearBtnFocus();
      }
    }
  },

  default(component, evt) {
    if (evt.key.length === 1) {
      component._userTyped = true;
    }
  }
};
