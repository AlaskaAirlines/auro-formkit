/* eslint-disable */
import { createContext } from "@lit/context";

export class MenuService {

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

  get currentValue() {
    const values = (this.selectedOptions || []).map(option => option.value);
    return this.multiSelect ? values : values[0];
  }

  get stringValue() {
    return Array.isArray(this.currentValue) ? JSON.stringify(this.currentValue) : this.currentValue;  
  }

  get currentKeys() {
    const keys = (this.selectedOptions || []).map(option => option.key);
    return this.multiSelect ? keys : keys[0];
  }

  constructor({host} = {}) {

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
  }

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

    // Get the index of the option to highlight
    const index = this._menuOptions.indexOf(option);

    // Update highlighted index
    this.highlightedIndex = index;

    // Notify subscribers of highlight change
    this.notify({type: 'highlightChange', highlightedOption: option});

    // Dispatch the change event
    this.dispatchChangeEvent('auroMenu-activatedOption', option);
  }



  dispatchChangeEvent(eventName, detail) {
    this.host.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail
    }));
  }

  selectHighlightedOption() {
    if (this.highlightedOption) {
      this.toggleOption(this.highlightedOption);
    }
  }

  /**
   * Selects one or more options in a batch operation
   * @param {AuroMenuOption|AuroMenuOption[]} options - Single option or array of options to select
   */
  selectOptions(options) {
    const optionsToSelect = Array.isArray(options) ? options : [options];
    
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

    if (!this.allowDeselect && !this.multiSelect) {
      // Loop over the options to deselect and ignore if it's the only selected option
      optionsToDeselect.forEach(option => {
        if (this.selectedOptions.length === 1 && this.selectedOptions[0] === option) {
          // Remove from options to deselect
          const index = optionsToDeselect.indexOf(option);
          if (index > -1) {
            optionsToDeselect.splice(index, 1);
          }
        }
      });
    }

    const optionsSet = new Set(optionsToDeselect);
    this.selectedOptions = (this.selectedOptions || [])
      .filter(opt => !optionsSet.has(opt));

    this.stageUpdate();
  }

  // Update existing methods to use new batch operations
  selectOption(option) {
    this.selectOptions(option);
  }

  deselectOption(option) {
    this.deselectOptions(option);
  }

  toggleOption(option) {
    if (option.selected) {
      this.deselectOptions(option);
    } else {
      this.selectOptions(option);
    }
  }

  selectByValue(value) {

    if (this.internalUpdateInProgress || this.host.internalUpdateInProgress) {
      return;
    }
    
    // Reset current selection since a new value is being set
    this.reset();

    // Guard Clause: If the value is empty, exit early
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0) || typeof value === 'string' && value.trim() === '') {
      return;
    }

    // Normalize value to an array
    let values = value;

    // Handle JSON string input
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

    // Handle case where a number is passed
    if (typeof values === 'number') {
      values = [String(values)];
    }

    // Handle each value in the values array
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
      console.warn("MenuService - Multiple values provided for single-select menu. Only the first value will be selected.");
      values = [values[0]];
    }

    const trackedKeys = [];

    // Get the options to be selected based on the provided values and matched on key
    const optionsToSelect = this._menuOptions.filter(option => {
      const passesFilter = values.includes(option.key);
      const alreadyTracked = trackedKeys.includes(option.key);
      trackedKeys.push(option.key);
      return passesFilter && (!alreadyTracked || alreadyTracked && this.selectAllMatchingOptions);
    });

    // If we got options to select, select them
    if (optionsToSelect.length && !this.optionsArraysMatch(optionsToSelect, this.selectedOptions)) {
      this.selectOptions(optionsToSelect)
      
    // Otherwise stage an immediate update since no changes will occur
    } else {
      this.stageUpdate();
    }

    if (!optionsToSelect.length && values.length) {
      this.dispatchChangeEvent('auroMenu-selectValueFailure', {
        message: 'No matching options found for the provided value(s).',
        values
      });
    }
  }

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

  reset() {
    if (this.selectedOptions && this.selectedOptions.length) {
      this.selectedOptions = [];
      this.stageUpdate();
    }
  }

  stageUpdate() {

    this.notifyStateChange();
    this.notifyValueChange();
    this.updateFrame = null;
  }

  reset() {
    const previousOptions = [...this.selectedOptions];
    this.selectedOptions = [];
    
    // Single update after clearing all
    if (previousOptions.length) {
      this.stageUpdate();
    }
  }

  notifyStateChange() {
    this.notify({type: 'stateChange', selectedOptions: this.selectedOptions});
  }

  notifyValueChange() {
    const details = {
      value: this.currentValue,
      stringValue: this.stringValue,
      keys: this.currentKeys,
      options: this.selectedOptions
    }
    this.notify({
      type: 'valueChange',
      ...details
    });
    this.dispatchChangeEvent('auroMenu-selectedOptionChange', details);
    this.dispatchChangeEvent('auroMenu-selectedOption', details);
  }

  /**
   * Subscribes a callback to menu service events.
   * @param {Function} callback - The callback to invoke on events.
   */
  subscribe(callback) {
    this._subscribers.push(callback);
  }

  /**
   * Notifies subscribers of a menu service event.
   * @param {string} eventType - The type of event to notify subscribers about.
   */
  notify(event) {
    this._subscribers.forEach(callback => callback(event));
  }
  
  /**
   * Adds a menu option to the service's list.
   * @param {AuroMenuOption} option - the option to track
   */
  addMenuOption(option) {
    this._menuOptions.push(option);
    this.notify({type: 'optionsChange', options: this._menuOptions});
  }

  /**
   * Removes a menu option from the service's list.
   * @param {AuroMenuOption} option - the option to remove
   */
  removeMenuOption(option) {
    this._menuOptions = this._menuOptions.filter(opt => opt !== option);
    this.notify({type: 'optionsChange', options: this._menuOptions});
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
        this.notify({property, value});
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
}

export const MenuContext = createContext('menu-context');