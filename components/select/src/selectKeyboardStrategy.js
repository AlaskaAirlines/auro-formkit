/* eslint-disable new-cap */
import { navigateArrow } from '@aurodesignsystem/utils';
import { getEnabledOptions } from './selectUtils.js';

export const selectKeyboardStrategy = {
  ArrowDown(component, evt, ctx) {
    evt.preventDefault();
    if (ctx.isExpanded) {
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        // navigate to last enabled option
        selectKeyboardStrategy.End(component, evt, ctx);
      } else {
        navigateArrow(component, 'down', { ctx });
      }
    } else {
      component.dropdown.show();
    }
  },

  ArrowUp(component, evt, ctx) {
    evt.preventDefault();
    if (ctx.isExpanded) {
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        // navigate to first enabled option
        selectKeyboardStrategy.Home(component, evt, ctx);
      } else {
        navigateArrow(component, 'up', { ctx });
      }
    } else {
      component.dropdown.show();
    }
  },

  Escape(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }

    // Prevent the Escape key from bubbling up and closing any parent dialogs / drawers / popups
    evt.stopPropagation();

    component.dropdown.hide();
  },

  End(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    // `pop()` is safe here: getEnabledOptions returns a fresh filtered array.
    const lastOption = getEnabledOptions(component.menu).pop();
    if (lastOption) {
      component.menu.updateActiveOption(lastOption);
    }
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

  Home(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const [firstOption] = getEnabledOptions(component.menu);
    if (firstOption) {
      component.menu.updateActiveOption(firstOption);
    }
  },

  Tab(component, evt, ctx) {
    if (!ctx.isExpanded) {
      return;
    }

    // Tab selects the focused option and closes the popup per the
    // WAI-ARIA APG select-only combobox / listbox pattern.
    if (component.optionActive) {
      component.menu.makeSelection();
    }
    component.dropdown.hide();
  },

  default(component, evt, ctx) {
    // Space resolves to either typeahead-buffer extension or bib toggle
    // depending on whether a type-ahead buffer is active. Mirrors native
    // <select> and the WAI-ARIA APG Listbox guidance: mid-typeahead space
    // is a search character (e.g. "San Francisco"); otherwise it toggles.
    if (evt.key === ' ') {
      evt.preventDefault();
      evt.stopPropagation();
      if (component.typeaheadBuffer && component.typeaheadBuffer.length > 0) {
        component.updateActiveOptionBasedOnKey(evt.key);
        return;
      }
      if (ctx.isExpanded) {
        component.dropdown.hide();
      } else {
        component.dropdown.show();
      }
      return;
    }
    component.updateActiveOptionBasedOnKey(evt.key);
  },
};
