/* eslint-disable new-cap */
import { navigateArrow } from '@aurodesignsystem/utils';
import { getActiveOptions } from './selectUtils.js';

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
    // Always clear the type-ahead buffer — Escape is a universal cancel.
    // Safe to call when the buffer is empty.
    // eslint-disable-next-line no-underscore-dangle
    if (typeof component._clearTypeaheadBuffer === 'function') {
      // eslint-disable-next-line no-underscore-dangle
      component._clearTypeaheadBuffer();
    }

    if (!ctx.isExpanded) {
      return;
    }

    // Prevent the Escape key from bubbling up and closing any parent dialogs / drawers / popups
    evt.stopPropagation();

    component.dropdown.hide();
  },

  End(component, evt, ctx) {
    evt.preventDefault();
    evt.stopPropagation();
    // `pop()` is safe here: getActiveOptions returns a fresh filtered array.
    // Uses "active" (not "enabled") so hidden and static rows — which a screen
    // reader must not announce as focused — are skipped.
    const lastOption = getActiveOptions(component.menu).pop();
    if (!lastOption) {
      return;
    }
    // Pre-stash before show() so the auroDropdown-toggled handler's
    // `!optionActive` guard short-circuits the firstActive/selected fallback —
    // otherwise show() synchronously fires the handler and writes
    // aria-activedescendant once before we overwrite it.
    component.menu.updateActiveOption(lastOption);
    if (!ctx.isExpanded) {
      component.dropdown.show();
    }
  },

  Enter(component, evt, ctx) {
    // Prevent the keypress from bubbling to parent containers (e.g., forms)
    // which could interpret Enter as a submit. Matches APG select-only combobox
    // and native <select> behavior: Enter opens the listbox when closed, selects
    // the active option when open — it does not submit a parent form.
    evt.preventDefault();
    evt.stopPropagation();
    if (!ctx.isExpanded) {
      component.dropdown.show();
      return;
    }
    component.menu.makeSelection();
  },

  Home(component, evt, ctx) {
    evt.preventDefault();
    evt.stopPropagation();
    const [firstOption] = getActiveOptions(component.menu);
    if (!firstOption) {
      return;
    }
    // See End() for why this must run before show().
    component.menu.updateActiveOption(firstOption);
    if (!ctx.isExpanded) {
      component.dropdown.show();
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
