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

  Enter(component, evt, ctx) {
    // select is not opened yet by Floating UI
    if (ctx.isExpanded) {
      return;
    }
    evt.preventDefault();
    component.menu.makeSelection();
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

    // Tab selects the focused option and closes the popup per the
    // WAI-ARIA APG select-only combobox / listbox pattern.
    if (component.optionActive && !component.multiSelect) {
      component.menu.makeSelection();
    }
    component.dropdown.hide();
  },
  Home(component, evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const firstOption = component.menu.menuService.menuOptions.find((option) => !option.disabled);
    if (firstOption) {
      component.menu.updateActiveOption(firstOption);
    }
  },

  End(component, evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const lastOption = [...component.menu.menuService.menuOptions].reverse().find((option) => !option.disabled);
    if (lastOption) {
      component.menu.updateActiveOption(lastOption);
    }
  },

  default(component, evt) {
    component.updateActiveOptionBasedOnKey(evt.key);
  },
};
