/* eslint-disable */
import { createContext } from "@lit/context";
import { AuroMenuOption } from "./auro-menuoption";

export class MenuService {

  /**
   * PROPERTIES AND GETTERS
   */

  /**
   * Gets the list of registered menu options.
   * @returns {AuroMenuOption[]}
   */
  get menuOptions() {
    return this._menuOptions;
  }

  /**
   * Gets the currently highlighted option.
   * @returns {AuroMenuOption|null}
   */
  get highlightedOption() {
    return this._menuOptions[this.highlightedIndex] || null;
  }

  /**
   * Gets the current value(s) of the selected option(s).
   * @returns {string|string[]|undefined}
   */
  get currentValue() {
    const values = (this.selectedOptions || []).map(option => option.value);
    return this.multiSelect ? values : values[0];
  }

  /**
   * Gets the string representation of the current value(s).
   * For multi-select, this is a JSON stringified array.
   * @returns {string|undefined}
   */
  get stringValue() {
    const { currentValue } = this;

    if (Array.isArray(currentValue)) {
      if (currentValue.length > 0) {
        return JSON.stringify(currentValue);
      }
      return undefined;
    }

    if (typeof currentValue === 'string') {
      if (currentValue.length > 0) {
        return currentValue;
      }
      return undefined;
    }

    // Future: handle other types here (e.g., number, object, etc.)
    return undefined;
  }

  /**
   * Gets the key(s) of the currently selected option(s).
   * @returns {string|string[]|undefined}
   */
  get currentKeys() {
    const keys = (this.selectedOptions || []).map(option => option.key);
    return this.multiSelect ? keys : keys[0];
  }

  /**
   * CONSTRUCTOR
   */

  /**
   * Creates a new MenuService instance.
   * @param {Object} options - The options object.
   *   @param {AuroMenu} options.host - The host element that this service will control. Required.
   * @throws {Error} If the host is not provided.
   */
  constructor({ host } = {}) {

    // Ensure a host was passed
    if (!host) {
      throw new Error("MenuService requires a host element.");
    }

    // Attach the service to the host
    this.host = host;
    this.host.addController(this);

    // Set default properties
    this.size = undefined;
    this.shape = undefined;
    this.noCheckmark = undefined;
    this.disabled = undefined;
    this.matchWord = undefined;
    this.multiSelect = undefined;
    this.allowDeselect = undefined;
    this.selectAllMatchingOptions = undefined;

    this.highlightedIndex = -1;

    this._menuOptions = [];
    this._subscribers = [];
    this.internalUpdateInProgress = false;
    this.selectedOptions = [];
  }

  /**
   * PROPERTY SYNCING
   */

  /**
   * Handles host updates.
   * This is a lit reactive lifecycle method.
   * This comes from the Lit controller interface provided by adding this service as a controller to the host.
   * See constructor for `this.host.addController(this)`
   * You can read more about Lit reactive controllers here: https://lit.dev/docs/composition/controllers/
   */
  hostUpdated() {

    // Reset selection if multiSelect mode changes
    if (this.host.multiSelect !== this.multiSelect) {
      this.selectedOptions = [];
    }

    // Update properties on host update
    this.setProperties({
      size: this.host.size,
      shape: this.host.shape,
      noCheckmark: this.host.noCheckmark,
      disabled: this.host.disabled,
      matchWord: this.host.matchWord,
      multiSelect: this.host.multiSelect,
      allowDeselect: this.host.allowDeselect,
      selectAllMatchingOptions: this.host.selectAllMatchingOptions
    });
  }

  /**
   * Handles host disconnection and memory cleanup.
   */
  hostDisconnected() {
    this._subscribers = [];
    this._menuOptions = [];
  }

  /**
   * Sets a property value if it exists on the instance and the value has changed.
   * @param {string} property
   * @param {any} value
   */
  setProperty(property, value) {

    // Only update if we are tracking the property in this service
    if (this.hasOwnProperty(property)) {

      // Check if the value has changed
      const valueChanged = this[property] !== value;

      // Update and notify if changed
      if (valueChanged) {
        this[property] = value;
        this.notify({ property, value });
      }
    }
  }

  /**
   * Sets multiple properties on the instance.
   * @param {Object} properties - Key-value pairs of properties to set.
   */
  setProperties(properties) {
    for (const [key, value] of Object.entries(properties)) {
      this.setProperty(key, value);
    }
  }

  /**
   * MENU OPTION HIGHLIGHTING
   */

  /**
   * Highlights the next active option in the menu.
   */
  highlightNext() {
    this.moveHighlightedOption("next");
  }

  /**
   * Highlights the previous active option in the menu.
   */
  highlightPrevious() {
    this.moveHighlightedOption("previous");
  }

  /**
   * Moves the highlighted option in the specified direction.
   * @param {string} direction - The direction to move the highlight ("next" or "previous").
   */
  moveHighlightedOption(direction) {

    // Get the active options
    const activeOptions = this._menuOptions.filter(option => option.isActive);

    // Get the currently active option
    const currentActiveOption = activeOptions[activeOptions.indexOf(this.highlightedOption)];

    // Determine the new index based on the currently active option and direction
    let newIndex = currentActiveOption
      ? direction === "previous"
        ? activeOptions.indexOf(currentActiveOption) - 1
        : activeOptions.indexOf(currentActiveOption) + 1
      : direction === "previous"
        ? activeOptions.length - 1
        : 0;

    // Wrap around the index if needed
    newIndex = newIndex < 0 ? activeOptions.length - 1 : newIndex >= activeOptions.length ? 0 : newIndex;

    // Get the new active option and set it as highlighted
    const newActiveOption = activeOptions[newIndex];
    this.setHighlightedOption(newActiveOption);
  }

  /**
   * Sets the highlighted index to the specified option.
   * @param {AuroMenuOption} option - The option to highlight.
   */
  setHighlightedOption(option) {

    if (!option) return;

    // Get the index of the option to highlight
    const index = this._menuOptions.indexOf(option);

    // Update highlighted index
    this.highlightedIndex = index;

    // Notify subscribers of highlight change
    this.notify({ type: 'highlightChange', option, index: this.highlightedIndex });

    // Dispatch the change event
    this.dispatchChangeEvent('auroMenu-activatedOption', option);
  }

  /**
   * Sets the highlighted option to the option at the specified index if it exists.
   * @param {number} index 
   */
  setHighlightedIndex(index) {
    const option = this._menuOptions[index] || null;
    this.setHighlightedOption(option);
  }

  /**
   * Selects the currently highlighted option.
   */
  selectHighlightedOption() {
    if (this.highlightedOption) {
      this.toggleOption(this.highlightedOption);
    }
  }

  /**
   * SELECTION AND DESELECTION METHODS
   */

  /**
   * Selects one or more options in a batch operation
   * @param {AuroMenuOption|AuroMenuOption[]} options - Single option or array of options to select
   */
  selectOptions(options) {
    let optionsToSelect = Array.isArray(options) ? options : [options];

    // Filter out options that are inactive
    optionsToSelect = optionsToSelect.filter(option => option.isActive);

    if (!optionsToSelect.length) return;

    if (this.multiSelect) {
      this.selectedOptions = [...(this.selectedOptions || []), ...optionsToSelect];
    } else {
      // In single select mode, only take the last option
      this.selectedOptions = [optionsToSelect[optionsToSelect.length - 1]];
    }

    this.stageUpdate();
  }

  /**
   * Deselects one or more options in a batch operation
   * @param {AuroMenuOption|AuroMenuOption[]} options - Single option or array of options to deselect
   */
  deselectOptions(options) {
    const optionsToDeselect = Array.isArray(options) ? options : [options];

    if (!optionsToDeselect.length) return;

    // Check if deselection should be prevented
    const shouldPreventDeselect = !this.allowDeselect && !this.multiSelect;
    const isOnlySelectedOption = this.selectedOptions.length === 1 && optionsToDeselect.includes(this.selectedOptions[0]);

    // Prevent deselecting the only selected option if not allowed
    if ( shouldPreventDeselect && isOnlySelectedOption ) return;

    const optionsSet = new Set(optionsToDeselect);
    this.selectedOptions = (this.selectedOptions || [])
      .filter(opt => !optionsSet.has(opt));

    this.stageUpdate();
  }

  /**
   * Selects a single option.
   * @param {AuroMenuOption} option 
   */
  selectOption(option) {
    this.selectOptions(option);
  }

  /**
   * Deselects a single option.
   * @param {AuroMenuOption} option 
   */
  deselectOption(option) {
    this.deselectOptions(option);
  }

  /**
   * Toggles the selection state of a single option.
   * @param {AuroMenuOption} option 
   */
  toggleOption(option) {
    if (option.selected) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }
  }

  /**
   * Selects options based on their value(s) when compared to a passed value or values.
   * Value or values are normalized to an array of strings that can be matched to option keys.
   * @param {string|number|Array<string|number>} value - The value(s) to select.
   */
  selectByValue(value) {

    // Guard Clause: Prevent recursive updates due to internal updates
    if (this.internalUpdateInProgress || this.host.internalUpdateInProgress) {
      return;
    }

    // Reset current selection since a new value is being set
    this.reset();

    // Guard Clause: If the value is empty, exit early
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0) || typeof value === 'string' && value.trim() === '') {
      return;
    }

    // Begin operations to normalize value(s) to an array

    // Establish working values variable
    let values = value;

    // Handle JSON string and single value string input
    if (!Array.isArray(values) && typeof values === 'string') {

      // Attempt to parse as JSON array
      try {

        // Normalize single quotes to double quotes for JSON parsing
        const parseValue = values.replace(/'/g, '"');

        // Attempt parse
        const parsed = JSON.parse(parseValue);

        // Ensure parsed value is an array
        if (!Array.isArray(parsed)) throw new Error('Not an array');

        // Set values to parsed array
        values = parsed;
      } catch (err) {

        // If parsing fails, treat as single value
        values = [value];
      }
    }

    // Handle a single number being passed
    if (typeof values === 'number') {
      values = [String(values)];
    }

    // Coerce each value to string and validate types
    values.forEach((val, index) => {

      // Throw an error for invalid value types
      if (typeof val !== 'string' && typeof val !== 'number') {
        throw new Error('Value contains invalid value type. Supported types are string and number.');
      }

      // Convert numbers to strings for consistency
      if (typeof val === 'number') {
        values[index] = String(val);
      }
    });

    // Flag for single-select menus when multiple values are provided
    if (values.length > 1 && !this.multiSelect) {

      // Throw a warning in the console to inform developers
      console.warn("MenuService - Multiple values provided for single-select menu. Only the first value will be selected.");

      // Take the first option
      values = [values[0]];
    }

    // Establish array to track processed keys
    const trackedKeys = new Set();

    // Get the options to be selected based on the provided values and matched on key
    const optionsToSelect = this._menuOptions.filter(option => {

      // Check if option key matches any of the provided values and hasn't already been tracked
      const passesFilter = values.includes(option.key);
      const alreadyTracked = trackedKeys.has(option.key);

      // Track the key
      trackedKeys.add(option.key);

      // Include the option if it passes the filter and either hasn't been tracked yet, or has been tracked but selectAllMatchingOptions is true
      return passesFilter && (!alreadyTracked || alreadyTracked && this.selectAllMatchingOptions);
    });

    // If we got options to select, select them
    if (optionsToSelect.length && !this.optionsArraysMatch(optionsToSelect, this.selectedOptions)) {

      this.selectOptions(optionsToSelect)

      // Otherwise stage an immediate update since no changes will occur
    } else {

      this.stageUpdate();
    }

    // If no options were found to select, dispatch a failure event
    // FUTURE: This should be deprecated in favor of the valueChange event handling no selection
    if (!optionsToSelect.length && values.length) {
      this.dispatchChangeEvent('auroMenu-selectValueFailure', {
        message: 'No matching options found for the provided value(s).',
        values
      });
    }
  }

  /**
   * Resets the selected options to an empty array.
   */
  reset() {
    const previousOptions = [...this.selectedOptions];
    this.selectedOptions = [];

    // Single update after clearing all
    if (previousOptions.length) {
      this.stageUpdate();
    }
  }

  /**
   * SUBSCRIPTION, NOTIFICATION AND EVENT DISPATCH METHODS
   */

  /**
   * Subscribes a callback to menu service events.
   * @param {Function} callback - The callback to invoke on events.
   */
  subscribe(callback) {
    this._subscribers.push(callback);
  }

  /**
   * Remove a previously subscribed callback from menu service events.
   * @param {Function} callback 
   */
  unsubscribe(callback) {
    this._subscribers = this._subscribers.filter(cb => cb !== callback);
  }

  /**
   * Stages an update to notify subscribers of state and value changes.
   */
  stageUpdate() {
    this.notifyStateChange();
    this.notifyValueChange();
  }

  /**
   * Notifies subscribers of a menu service event.
   * All notifications are sent to all subscribers.
   * @param {string} event - The event to send to subscribers.
   */
  notify(event) {
    this._subscribers.forEach(callback => callback(event));
  }

  /**
   * Notifies subscribers of a state change (selected options has changed).
   */
  notifyStateChange() {
    this.notify({ type: 'stateChange', selectedOptions: this.selectedOptions });
  }

  /**
   * Notifies subscribers of a value change (current value has changed).
   */
  notifyValueChange() {

    // Prepare details for the event
    const details = {
      value: this.currentValue,
      stringValue: this.stringValue,
      keys: this.currentKeys,
      options: this.selectedOptions
    }

    // If only one option is selected, include its index
    if (this.selectedOptions.length === 1) details.index = this._menuOptions.indexOf(this.selectedOptions[0]);

    this.notify({
      type: 'valueChange',
      ...details
    });

    this.dispatchChangeEvent('auroMenu-selectedOption', details);
  }

  /**
   * Dispatches a custom event from the host element.
   * @param {string} eventName 
   * @param {any} detail 
   */
  dispatchChangeEvent(eventName, detail) {
    this.host.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail
    }));
  }

  /**
   * MENU OPTION MANAGEMENT METHODS
   */

  /**
   * Adds a menu option to the service's list.
   * @param {AuroMenuOption} option - the option to track
   */
  addMenuOption(option) {
    this._menuOptions.push(option);
    this.notify({ type: 'optionsChange', options: this._menuOptions });
  }

  /**
   * Removes a menu option from the service's list.
   * @param {AuroMenuOption} option - the option to remove
   */
  removeMenuOption(option) {
    this._menuOptions = this._menuOptions.filter(opt => opt !== option);
    this.notify({ type: 'optionsChange', options: this._menuOptions });
  }

  /**
   * UTILITIES
   */

  /**
   * Utility to compare two arrays of options for equality.
   * @param {AuroMenuOption[]} arr1 
   * @param {AuroMenuOption[]} arr2 
   * @returns 
   */
  optionsArraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    for (let item of set1) {
      if (!set2.has(item)) {
        return false;
      }
    }

    return true;
  }
}

export const MenuContext = createContext('menu-context');