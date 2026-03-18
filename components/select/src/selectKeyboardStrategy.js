import { navigateArrow } from '@aurodesignsystem/utils';

export const selectKeyboardStrategy = {
  ArrowUp(component, evt, ctx) {
    evt.preventDefault();
    navigateArrow(component, 'up', {
      ctx,
      showFn: () => component.dropdown.show(),
    });
  },

  ArrowDown(component, evt, ctx) {
    evt.preventDefault();
    navigateArrow(component, 'down', {
      ctx,
      showFn: () => component.dropdown.show(),
    });
  },

  Enter(component, evt) {
    evt.preventDefault();
    component.menu.makeSelection();
  },

  Tab(component, _evt, ctx) {
    if (!ctx.isVisible) {
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
