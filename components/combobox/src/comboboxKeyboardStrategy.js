/* eslint-disable no-underscore-dangle */
import { doubleRaf, navigateArrow } from '@aurodesignsystem/utils';
import { getFocusableElements } from '@aurodesignsystem/auro-library/scripts/runtime/Focusables/index.mjs';

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

/**
 * Commit the highlighted option and close the bib.
 * @param {Element} component - The auro-combobox host element.
 */
function selectAndClose(component) {
  reconcileMenuIndex(component.menu);
  component.menu.makeSelection();
  component.hideBib();
}

/**
 * Return the tab stop that comes before `component` in page tab order,
 * skipping any hidden entries the walker doesn't filter itself.
 * @param {Element} component - The auro-combobox host element.
 * @returns {Element|null}
 */
function getPreviousTabStop(component) {
  const tabStops = getFocusableElements(component.ownerDocument.body);
  const componentIndex = tabStops.indexOf(component);
  for (let index = componentIndex - 1; index >= 0; index -= 1) {
    if (tabStops[index].checkVisibility()) {
      return tabStops[index];
    }
  }
  return null;
}

/**
 * Commit the highlighted option, close the bib, and move focus to the tab
 * stop before the combobox — the Shift+Tab exit path (AB#1592239).
 * Returns true when this function moved focus and the caller should
 * preventDefault; false when no previous tab stop was found and the browser's
 * native traversal should run.
 * @param {Element} component - The auro-combobox host element.
 * @returns {boolean}
 */
function selectAndExitBackward(component) {
  const previousTabStop = getPreviousTabStop(component);

  // Opts this selection out of setClearBtnFocus so the focus move below
  // isn't clobbered. Consumed by auro-combobox's selection listener.
  component._suppressClearBtnFocusOnSelection = true;
  selectAndClose(component);

  if (!previousTabStop) {
    return false;
  }
  doubleRaf(() => previousTabStop.focus());
  return true;
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
        navigateArrow(component, 'down');
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
        navigateArrow(component, 'up');
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
      if (evt.shiftKey) {
        if (selectAndExitBackward(component)) {
          evt.preventDefault();
        }
        return;
      }

      selectAndClose(component);

      if (ctx.isModal) {
        // Fullscreen close does not automatically restore focus to the input.
        component.setClearBtnFocus();
      }
    }
  }
};
