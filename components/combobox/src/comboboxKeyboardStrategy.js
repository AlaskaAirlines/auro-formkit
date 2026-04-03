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

        if (evt.altKey || evt.metaKey) {
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
        if (evt.altKey || evt.metaKey) {
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
    if (isClearBtnFocused(ctx)) {
      // If the clear button has focus, let the browser activate it normally.
      // stopPropagation prevents parent containers (e.g., forms) from treating
      // Enter as a submit, but we must NOT call preventDefault — that would
      // block the browser's built-in "Enter activates focused button" behavior.
      evt.stopPropagation();
    } else if (ctx.isExpanded && component.menu.optionActive) {
      component.menu.makeSelection();

      if (ctx.isModal) {
        component.setTriggerInputFocus();
      }

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

  Escape(component, _evt, ctx) {
    if (ctx.isExpanded && ctx.isModal) {
      component.setTriggerInputFocus();
    }
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
      // ClearBtn will not bubble up tab key events when it's focused, so need to manage it here when focused
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
};
