/**
 * Wires up a keydown listener that dispatches to strategy[evt.key] or strategy.default.
 * Handles both sync and async handlers.
 * @param {HTMLElement} component - The component to attach the listener to.
 * @param {Object} strategy - Map of key names to handler functions.
 */
export function applyKeyboardStrategy(component, strategy) {
  component.addEventListener('keydown', async (evt) => {
    const handler = strategy[evt.key] || strategy.default;
    if (handler) {
      await handler(component, evt);
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
 */
export function navigateArrow(component, direction, options = {}) {
  if (component.dropdown.isPopoverVisible) {
    component.menu.navigateOptions(direction);
  } else if (options.showFn) {
    options.showFn();
  }
}
