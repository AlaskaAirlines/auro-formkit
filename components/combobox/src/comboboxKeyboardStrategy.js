import { navigateArrow } from '@aurodesignsystem/utils';

export const comboboxKeyboardStrategy = {
  async Enter(component, evt, ctx) {
    // If the clear button has focus, let the browser activate it normally.
    // stopPropagation prevents parent containers (e.g., forms) from treating
    // Enter as a submit, but we must NOT call preventDefault — that would
    // block the browser's built-in "Enter activates focused button" behavior.
    const clearBtn =
      ctx.activeInput && ctx.activeInput.shadowRoot
        ? ctx.activeInput.shadowRoot.querySelector('.clearBtn')
        : null;
    if (clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null) {
      evt.stopPropagation();
      return;
    }

    if (ctx.isVisible && component.optionActive) {
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
    if (!ctx.isVisible) {
      return;
    }

    if (ctx.isModal) {
      if (!ctx.activeInput) {
        return;
      }
      const clearBtn = ctx.activeInput.shadowRoot.querySelector('.clearBtn');

      // Use shadowRoot.activeElement to detect focus inside auro-button,
      // since Safari does not propagate :focus-within through shadow DOM.
      const clearBtnHasFocus = clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null;

      if (evt.shiftKey) {
        // Shift+Tab from clear button: move focus back to the input
        if (clearBtnHasFocus) {
          ctx.activeInput.focus();
          return;
        }
        // Shift+Tab from input (or no clear button): close without selecting
        component.hideBib();
        return;
      }

      // Tab from input: if clear button exists and doesn't have focus, focus it
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

      // Tab from clear button (or no clear button / no value) →
      // select the highlighted option if any, then close
      if (component.optionActive) {
        component.menu.makeSelection();
      }
      component.hideBib();
      return;
    }

    // Non-fullscreen: select + close (Shift+Tab closes without selecting)
    if (!evt.shiftKey && component.menu.optionActive && component.menu.optionActive.value) {
      component.menu.value = component.menu.optionActive.value;
    }
    component.hideBib();
  },

  ArrowUp(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowUp normally.
    const clearBtn = ctx && ctx.activeInput && ctx.activeInput.shadowRoot
      ? ctx.activeInput.shadowRoot.querySelector('.clearBtn')
      : null;
    if (clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null) {
      return;
    }

    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    // Read live visibility directly — ctx.isVisible is a pre-handler snapshot and
    // wouldn't reflect the state change from showBib() called above.
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'up');
    }
  },

  ArrowDown(component, evt, ctx) {
    // If the clear button has focus, let the browser handle ArrowDown normally.
    const clearBtn = ctx && ctx.activeInput && ctx.activeInput.shadowRoot
      ? ctx.activeInput.shadowRoot.querySelector('.clearBtn')
      : null;
    if (clearBtn && clearBtn.shadowRoot && clearBtn.shadowRoot.activeElement !== null) {
      return;
    }

    if (component.availableOptions.length > 0) {
      component.showBib();
    }
    // Read live visibility directly — ctx.isVisible is a pre-handler snapshot and
    // wouldn't reflect the state change from showBib() called above.
    if (component.dropdown.isPopoverVisible) {
      evt.preventDefault();
      navigateArrow(component, 'down');
    }
  },
};
