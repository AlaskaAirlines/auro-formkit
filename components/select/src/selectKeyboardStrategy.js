import { navigateArrow } from '../../dropdown/src/keyboardUtils.js';

export const selectKeyboardStrategy = {
  ArrowUp(component, evt) {
    evt.preventDefault();
    navigateArrow(component, 'up', { showFn: () => component.dropdown.show() });
  },

  ArrowDown(component, evt) {
    evt.preventDefault();
    navigateArrow(component, 'down', { showFn: () => component.dropdown.show() });
  },

  Enter(component, evt) {
    evt.preventDefault();
    component.menu.makeSelection();
  },

  Tab(component) {
    if (!component.dropdown.isPopoverVisible) {
      return;
    }

    // Tab selects the focused option and closes the popup per the
    // WAI-ARIA APG select-only combobox / listbox pattern.
    if (component.optionActive && !component.multiSelect) {
      component.menu.makeSelection();
    }
    component.dropdown.hide();
  },

  default(component, evt) {
    component.updateActiveOptionBasedOnKey(evt.key);
  },
};
