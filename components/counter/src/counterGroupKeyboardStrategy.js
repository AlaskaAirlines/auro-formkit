// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { doubleRaf } from '@aurodesignsystem/utils';
import { getFocusableElements } from '@aurodesignsystem/auro-library/scripts/runtime/Focusables/index.mjs';

/**
 * Whether `el` is currently visible enough to receive focus. Prefers the
 * browser's `checkVisibility()`; otherwise combines a display/visibility check
 * with an ancestor-hidden probe that keeps position:fixed elements visible.
 * @param {Element} el - The element to test.
 * @returns {boolean}
 */
function isVisibleForFocus(el) {
  if (typeof el.checkVisibility === 'function') {
    return el.checkVisibility();
  }
  const style = el.ownerDocument.defaultView.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }
  return el.offsetParent !== null || style.position === 'fixed';
}

/**
 * Return the tab stop that comes before the counter-group in page tab order,
 * skipping any hidden entries the walker doesn't filter itself. The group host
 * itself is not a tab stop; its focusables (the internal dropdown and the
 * counters) are, so anchor the search on the group's earliest focusable.
 * @param {Element} component - The auro-counter-group host element.
 * @returns {Element|null}
 */
function getPreviousTabStop(component) {
  const tabStops = getFocusableElements(component.ownerDocument.body);
  const counters = component.counters || [];
  const owned = [
    component,
    component.dropdown,
    ...counters
  ].filter(Boolean);
  let groupStart = tabStops.length;
  owned.forEach((node) => {
    const index = tabStops.indexOf(node);
    if (index >= 0 && index < groupStart) {
      groupStart = index;
    }
  });
  for (let index = groupStart - 1; index >= 0; index -= 1) {
    if (isVisibleForFocus(tabStops[index])) {
      return tabStops[index];
    }
  }
  return null;
}

export const counterGroupKeyboardStrategy = {
  Escape(component, evt) {
    if (!component.dropdown || !component.dropdown.isPopoverVisible) {
      return;
    }

    // Prevent the Escape key from bubbling up and closing any parent dialogs / drawers / popups.
    // Because stopPropagation prevents the document-level floatingUI keydown handler from
    // seeing this event, we must also close the dropdown explicitly.
    evt.stopPropagation();

    component.dropdown.hide();
  },

  Tab(component, evt, ctx) {
    // Forward Tab already exits past the bib content and the focusout handler
    // closes the bib. Fullscreen relies on the dialog's native focus trapping.
    if (!ctx.isExpanded || ctx.isModal || !evt.shiftKey) {
      return;
    }

    // The trigger precedes the bib content in the flattened tab order, so a
    // native Shift+Tab off the first counter lands back on the trigger and
    // leaves the bib open. Only intercept when focus is on the first focusable
    // in the bib; otherwise let the browser move to the previous counter.
    // `composedPath()` reports the real event origin through every shadow
    // boundary, unlike `document.activeElement`, which retargets to the first
    // slotted counter and cannot tell the counters apart.
    const focusables = getFocusableElements(component.dropdown.bibContent);
    if (!focusables.length) {
      return;
    }

    const path = evt.composedPath();
    const activeIndex = focusables.findIndex((el) => path.includes(el));
    if (activeIndex !== 0) {
      return;
    }

    const previousTabStop = getPreviousTabStop(component);

    // Always suppress the native Shift+Tab. Otherwise it fires against the bib
    // as it is torn down and lands focus on the trigger (which precedes the
    // first counter), re-opening the exact loop this handler prevents. When
    // nothing precedes the group, focus falls to the body instead of the
    // trigger, which reads as exiting the group backward.
    evt.preventDefault();
    component.hideBib();

    if (!previousTabStop) {
      return;
    }

    doubleRaf(() => previousTabStop.focus());
  },
};
