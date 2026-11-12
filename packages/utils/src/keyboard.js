/**
 * Creates a snapshot of the dropdown's display state for one `keydown` event.
 * Handles a missing dropdown without throwing, so callers don't need their own checks.
 *
 * @param {HTMLElement} component - The component with a dropdown reference.
 * @param {Object} [options] - The optional settings.
 * @param {HTMLElement} [options.dropdown] - The dropdown to use instead of `component.dropdown`.
 * @param {Function} [options.inputResolver] - A function, called with `component` and the context, that returns the active input element. Any value that isn't an `HTMLElement` becomes null.
 * @returns {{isExpanded: boolean, isModal: boolean, isPopover: boolean, activeInput: HTMLElement|null}}
 *   The display state. `isModal` and `isPopover` reflect the display mode (fullscreen or not), whether or not the bib is open.
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
 * Adds a `keydown` listener that calls `strategy[evt.key]`, or `strategy.default` when the key has no handler.
 * Handles both sync and async handlers.
 * @param {HTMLElement} component - The component to attach the listener to.
 * @param {Object} strategy - A map of key names to handler functions.
 * @param {Object} [options] - The optional settings passed to `createDisplayContext`.
 */
export function applyKeyboardStrategy(component, strategy, options = {}) {
  component.addEventListener('keydown', async (evt) => {
    const handler = strategy[evt.key] || strategy.default;
    if (typeof handler === 'function') {
      const ctx = createDisplayContext(component, options);
      await handler(component, evt, ctx);
    }
  });
}

/**
 * Moves the active menu option up or down when the dropdown is open.
 * When the dropdown is closed, calls `options.showFn` instead, if it's set.
 * @param {HTMLElement} component - The component with dropdown and menu references.
 * @param {string} direction - The direction to move, `up` or `down`.
 * @param {Object} [options] - The optional settings.
 * @param {Function} [options.showFn] - A function that opens the dropdown, called when the dropdown is closed.
 * @param {Object} [options.ctx] - The display context from `createDisplayContext`, used instead of checking the dropdown again.
 */
export function navigateArrow(component, direction, options = {}) {
  const visible = options.ctx ? options.ctx.isExpanded : component.dropdown.isPopoverVisible;
  if (visible) {
    component.menu.navigateOptions(direction);
  } else if (options.showFn) {
    options.showFn();
  }
}
