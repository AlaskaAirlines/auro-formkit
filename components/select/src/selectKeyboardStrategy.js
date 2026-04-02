/* eslint-disable new-cap */
import { navigateArrow } from '@aurodesignsystem/utils';

export const selectKeyboardStrategy = {
  ArrowUp(component, evt, ctx) {
    evt.preventDefault();
    if (evt.altKey || evt.metaKey) {
      // navigate to first enabled option
      selectKeyboardStrategy.Home(component, evt, ctx);
      return;
    }
    navigateArrow(component, 'up', {
      ctx,
      showFn: () => component.dropdown.show(),
    });
  },

  ArrowDown(component, evt, ctx) {
    evt.preventDefault();
    if (evt.altKey || evt.metaKey) {
      // navigate to last enabled option
      selectKeyboardStrategy.End(component, evt, ctx);
      return;
    }
    navigateArrow(component, 'down', {
      ctx,
      showFn: () => component.dropdown.show(),
    });
  },

  Enter(component, evt, ctx) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!ctx.isExpanded) {
      component.dropdown.show();
      return;
    }
    component.menu.makeSelection();
  },

  Escape(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }
    component.dropdown.hide();
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
  Home(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const firstOption = component.menu.menuService.menuOptions.find((option) => !option.disabled);
    if (firstOption) {
      component.menu.updateActiveOption(firstOption);
    }
  },

  End(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const lastOption = [...component.menu.menuService.menuOptions].reverse().find((option) => !option.disabled);
    if (lastOption) {
      component.menu.updateActiveOption(lastOption);
    }
  },

  default(component, evt, ctx) {
    component.updateActiveOptionBasedOnKey(evt.key);
    if (evt.key === ' ') {
      evt.preventDefault();
      evt.stopPropagation();
      if (ctx.isExpanded) {
        component.dropdown.hide();
        return;
      }
      component.dropdown.show();
    }
  },
};
