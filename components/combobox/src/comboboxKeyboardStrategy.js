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

export const comboboxKeyboardStrategy = {
  Enter(component, evt, ctx) {
    if (isClearBtnFocused(ctx)) {
      // If the clear button has focus, let the browser activate it normally.
      // stopPropagation prevents parent containers (e.g., forms) from treating
      // Enter as a submit, but we must NOT call preventDefault — that would
      // block the browser's built-in "Enter activates focused button" behavior.
      evt.stopPropagation();
    } else if (ctx.isExpanded && component.menu.optionActive) {
      component.menu.makeSelection();
      component.setClearBtnFocus();
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // Prevent the keypress from bubbling to parent containers (e.g., forms)
      // which could interpret Enter as a submit or trigger other unintended behavior.
      // This is safe because showBib() opens the dialog programmatically,
      // not via event propagation.
      evt.preventDefault();
      evt.stopPropagation();
      component.showBib();
    }
  },

  Tab(component, _evt, ctx) {
    if (ctx.isExpanded && !isClearBtnFocused(ctx)) {
      // ClearBtn will not bubble up tab key events when it's focused, so need to manage it here when focused
      component.menu.makeSelection();
      component.hideBib();
    }
  },

  Home(component, evt, ctx) {
    if (ctx.isExpanded) {
      evt.preventDefault();
      evt.stopPropagation();
      component.activateFirstEnabledAvailableOption();
    }
  },

  End(component, evt, ctx) {
    if (ctx.isExpanded) {
      evt.preventDefault();
      evt.stopPropagation();
      component.activateLastEnabledAvailableOption();
    }
  },

  ArrowUp(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowUp normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    // option display and navigation are prevented if there are no available options
    if (component.availableOptions.length > 0) {
      // navigate if bib is open otherwise open it
      if (component.dropdown.isPopoverVisible) {
        evt.preventDefault();
        navigateArrow(component, 'up');
      } else {
        component.showBib();
      }
    }
  },

  ArrowDown(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowDown normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    // option display and navigation are prevented if there are no available options
    if (component.availableOptions.length > 0) {
      // navigate if bib is open otherwise open it
      if (component.dropdown.isPopoverVisible) {
        evt.preventDefault();
        navigateArrow(component, 'down');
      } else {
        component.showBib();
      }
    }
  }
};
