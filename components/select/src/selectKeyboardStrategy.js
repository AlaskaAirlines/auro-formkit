import { navigateArrow } from '@aurodesignsystem/utils';

export const selectKeyboardStrategy = {
  ArrowUp(component, evt, ctx) {
    // Navigate menu only if the bib is open, otherwise open the bib
    evt.preventDefault();
    if (evt.altKey || evt.metaKey) {
      // navigate to first enabled option
    } else if (component.dropdown.isPopoverVisible) {
      navigateArrow(component, 'up', {
        ctx,
        showFn: () => component.dropdown.show(),
      });
    } else {
      component.dropdown.show();
    }
  },

  ArrowDown(component, evt, ctx) {
    // Navigate menu only if the bib is open, otherwise open the bib
    evt.preventDefault();
    if (evt.altKey || evt.metaKey) {
      // navigate to last enabled option
    } else if (component.dropdown.isPopoverVisible) {
      navigateArrow(component, 'down', {
        ctx,
        showFn: () => component.dropdown.show(),
      });
    } else {
      component.dropdown.show();
    }
  },

  Enter(component, evt, ctx) {
    if (!ctx.isExpanded && ctx.isPopover) {
      component.menu.makeSelection();
    } else if (ctx.isModal && !evt.defaultPrevented) {
      // for modal, isExpanded is always true
      // defaultPrevented will be true if Floating UI has already handled the event to open the dropdown
      component.menu.makeSelection();
    }
  },

  Tab(component, evt, ctx) {
    if (!ctx.isExpanded) {
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
