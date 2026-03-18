/**
 * Computes display state once per keydown event.
 * Centralizes null-safety checks and makes the shared/modal/popover branching explicit.
 *
 * @param {HTMLElement} component - The component with a dropdown reference.
 * @param {Object} [options] - Optional config.
 * @param {HTMLElement} [options.dropdown] - Explicit dropdown reference. Falls back to component.dropdown.
 * @param {Function} [options.inputResolver] - Called with (component, ctx) to resolve the active input element.
 * @returns {{isExpanded: boolean, isModal: boolean, isPopover: boolean, activeInput: HTMLElement|null}}
 *   isModal and isPopover reflect the display mode (fullscreen vs not) regardless of expanded state.
 */
export function createDisplayContext(component, options = {}) {
  const dd = options.dropdown || component.dropdown;
  // isPopoverVisible reflects as the `open` attribute.
  // It reports whether the bib is open in any mode (popover or modal).
  const isExpanded = Boolean(dd && dd.isPopoverVisible);
  const isFullscreen = Boolean(dd && dd.isBibFullscreen);

  const ctx = {
    isExpanded,
    isModal: isFullscreen,
    isPopover: !isFullscreen,
    activeInput: null,
  };

  if (options.inputResolver) {
    const resolvedInput = options.inputResolver(component, ctx);
    // Guard against resolvers returning undefined or non-HTMLElement values.
    ctx.activeInput = resolvedInput instanceof HTMLElement ? resolvedInput : null;
  }

  return ctx;
}

/**
 * Wires up a keydown listener that dispatches to strategy[evt.key] or strategy.default.
 * Handles both sync and async handlers.
 * @param {HTMLElement} component - The component to attach the listener to.
 * @param {Object} strategy - Map of key names to handler functions.
 * @param {Object} [options] - Optional config passed to createDisplayContext.
 */
export function applyKeyboardStrategy(component, strategy, options = {}) {
  component.addEventListener('keydown', async (evt) => {
    const handler = strategy[evt.key] || strategy.default;
    if (handler) {
      const ctx = createDisplayContext(component, options);
      await handler(component, evt, ctx);
    }
  });
}

/**
 * Shared arrow navigation. Calls menu.navigateOptions(direction) if visible.
 * Optionally opens dropdown via showFn when closed.
 * @param {HTMLElement} component - The component with dropdown and menu references.
 * @param {string} direction - 'up' or 'down'.
 * @param {Object} [options] - Optional config.
 * @param {Function} [options.showFn] - Called to open the dropdown when closed.
 * @param {Object} [options.ctx] - Display context to avoid re-checking visibility.
 */
export function navigateArrow(component, direction, options = {}) {
  const visible = options.ctx ? options.ctx.isExpanded : component.dropdown.isPopoverVisible;
  if (visible) {
    component.menu.navigateOptions(direction);
  } else if (options.showFn) {
    options.showFn();
  }
}
