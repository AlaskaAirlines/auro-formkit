/**
 * Calls the matching handler in `strategy` when a key is pressed on `component`.
 * Uses `strategy.default` for keys without their own handler, and waits for handlers that return a promise.
 * @param {HTMLElement} component - The element to listen for key presses on.
 * @param {Object} strategy - The handler functions, keyed by `event.key`.
 */
export function applyKeyboardStrategy(component: HTMLElement, strategy: any): void;
/**
 * Moves the highlight to the next or previous menu option when the dropdown is open.
 * When the dropdown is closed, calls `options.showFn` to open it, if set.
 * @param {HTMLElement} component - The component that holds the dropdown and menu, as its `dropdown` and `menu` properties.
 * @param {string} direction - The direction to move, `up` or `down`.
 * @param {Object} [options] - The optional settings.
 * @param {Function} [options.showFn] - A function that opens the dropdown.
 */
export function navigateArrow(component: HTMLElement, direction: string, options?: {
    showFn?: Function;
}): void;
