import { navigateArrow } from '../../dropdown/src/keyboardUtils.js';

export const comboboxKeyboardStrategy = {
  async Enter(component, evt) {
    // If the clear button has focus, let the browser activate it normally.
    const clearBtn = component.input.shadowRoot.querySelector('.clearBtn');
    if (clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null) {
      return;
    }

    if (component.dropdown.isPopoverVisible && component.optionActive) {
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

  Tab(component) {
    if (!component.dropdown.isPopoverVisible) {
      return;
    }

    if (component.dropdown.isBibFullscreen) {
      const clearBtn = component.inputInBib.shadowRoot.querySelector('.clearBtn');

      // Use shadowRoot.activeElement to detect focus inside auro-button,
      // since Safari does not propagate :focus-within through shadow DOM.
      const clearBtnHasFocus = clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null;

      // Tab from input: if clear button exists and doesn't have focus, focus it
      if (clearBtn && !clearBtnHasFocus && component.inputInBib.value) {
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

      // Tab from clear button (or no clear button / no value) →
      // select the highlighted option if any, then close
      if (component.optionActive) {
        component.menu.makeSelection();
      }
      component.hideBib();
      return;
    }

    // Non-fullscreen: select + close
    if (component.menu.optionActive && component.menu.optionActive.value) {
      component.menu.value = component.menu.optionActive.value;
    }
    component.hideBib();
  },

  ArrowUp(component, evt) {
    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'up');
    }
  },

  ArrowDown(component, evt) {
    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'down');
    }
  },
};
