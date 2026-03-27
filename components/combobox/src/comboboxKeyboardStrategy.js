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
  return Boolean(clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null);
}

export const comboboxKeyboardStrategy = {
  async Enter(component, evt, ctx) {
    // If the clear button has focus, let the browser activate it normally.
    // stopPropagation prevents parent containers (e.g., forms) from treating
    // Enter as a submit, but we must NOT call preventDefault — that would
    // block the browser's built-in "Enter activates focused button" behavior.
    if (isClearBtnFocused(ctx)) {
      evt.stopPropagation();
      return;
    }

    if (ctx.isExpanded && component.optionActive) {
      component.menu.makeSelection();
      await component.updateComplete;
      evt.preventDefault();
      evt.stopPropagation();
      component.setClearBtnFocus();
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

  Tab(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }

    // Shift+Tab moves the highlight to the first non-disabled option
    // without making a selection or closing the bib.
    if (evt.shiftKey) {
      evt.preventDefault();
      const firstActive = component.menu.menuService.menuOptions.find((option) => option.isActive);
      if (firstActive) {
        component.menu.updateActiveOption(firstActive);
      }
      return;
    }

    if (ctx.isModal) {
      if (!ctx.activeInput) {
        return;
      }

      // Active option → select immediately and close the dialog.
      // Flag the component so the close handler focuses the trigger's
      // clear button instead of the input. Set flags before makeSelection
      // because the value change triggers showBib via Lit's updated().
      if (component.optionActive) {
        evt.preventDefault();
        component._focusClearBtnAfterClose = true;
        component._clearBtnFocusPending = true;
        component.menu.makeSelection();
        component.hideBib();
        return;
      }

      const clearBtn = getClearBtn(ctx);
      const clearBtnHasFocus = isClearBtnFocused(ctx, clearBtn);

      // No active option, input has a value, clear button not focused →
      // move focus to the dialog's clear button.
      if (clearBtn && !clearBtnHasFocus && ctx.activeInput.value) {

        // Force clear button container visible to work around Safari not
        // propagating :focus-within through shadow DOM boundaries, which
        // causes .wrapper:not(:focus-within) to hide .notification.clear.
        const clearContainer = clearBtn.closest('.clear');

        if (clearContainer) {
          clearContainer.style.display = 'flex';
          clearBtn.addEventListener('focusout', () => {
            // Delay cleanup so :focus-within settles when focus moves
            // to a sibling (e.g., Shift+Tab back to the input).
            requestAnimationFrame(() => {
              clearContainer.style.display = '';
            });
          }, { once: true });
        }

        // Focus the native button inside auro-button so the browser
        // treats it as a real focusable element inside the dialog.
        const nativeBtn = clearBtn.shadowRoot && clearBtn.shadowRoot.querySelector('button');
        if (nativeBtn) {
          nativeBtn.focus();
        } else {
          clearBtn.focus();
        }
        return;
      }

      // No active option, no clear button (or already focused) → just close.
      component.hideBib();
      return;
    }

    // Non-fullscreen: select + close
    if (component.optionActive) {
      evt.preventDefault();
      component._focusClearBtnAfterClose = true;
      component._clearBtnFocusPending = true;
      component.menu.makeSelection();
    }
    component.hideBib();
  },

  ArrowUp(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowUp normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    // Read live visibility — ctx.isExpanded was computed before showBib() above,
    // so it wouldn't reflect the state change.
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'up');
    }
  },

  ArrowDown(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowDown normally.
    if (isClearBtnFocused(ctx)) {
      return;
    }

    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    // Read live visibility — ctx.isExpanded was computed before showBib() above,
    // so it wouldn't reflect the state change.
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'down');
    }
  },
};
