// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/**
 * Converts value to an array.
 * If the value is a JSON string representing an array, it will be parsed.
 * If the value is already an array, it is returned.
 * If the value is undefined, it returns undefined.
 * @private
 * @param {any} value - The value to be converted. Can be a string, array, or undefined.
 * @returns {Array|undefined} - The converted array or undefined.
 * @throws {Error} - Throws an error if the value is not an array, undefined,
 * or if the value cannot be parsed into an array from a JSON string.
 */
export function arrayConverter(value) {
  // Allow undefined
  if (value === undefined) {
    return undefined;
  }

  // Return the value if it is already an array
  if (Array.isArray(value)) {
    return value;
  }

  try {
    // If value is a JSON string, parse it
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;

    // Check if the parsed value is an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // If JSON parsing fails, continue to throw an error below
    /* eslint-disable no-console */
    console.error('JSON parsing failed:', error);
  }

  // Throw error if the input is not an array or undefined
  throw new Error('Invalid value: Input must be an array or undefined');
}

/**
 * Compare two arrays for equality.
 * @private
 * @param {Array} arr1 - First array to compare.
 * @param {Array} arr2 - Second array to compare.
 * @returns {boolean} True if arrays are equal.
 */
export function arraysAreEqual(arr1, arr2) {
  // If both arrays undefined, they are equal (true)
  if (arr1 === undefined || arr2 === undefined) {
    return arr1 === arr2;
  }

  // If arrays have different lengths, they are not equal
  if (arr1.length !== arr2.length) {
    return false;
  }

  // If every item at each index is the same, return true
  for (let index = 0; index < arr1.length; index += 1) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }
  return true;
}

/**
 * Compares array for changes.
 * @private
 * @param {Array|any} newVal - New value to compare.
 * @param {Array|any} oldVal - Old value to compare.
 * @returns {boolean} True if arrays have changed.
 */
export function arrayOrUndefinedHasChanged(newVal, oldVal) {
  try {
    // Check if values are undefined or arrays
    const isArrayOrUndefined = (val) => val === undefined || Array.isArray(val);

    // If non-array or non-undefined, throw error
    if (!isArrayOrUndefined(newVal) || !isArrayOrUndefined(oldVal)) {
      const invalidValue = !isArrayOrUndefined(newVal) ? newVal : oldVal;
      throw new Error(`Value must be an array or undefined, received ${typeof invalidValue}`);
    }

    // Return true if arrays have changed, false if they are the same
    return !arraysAreEqual(newVal, oldVal);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    // If validation fails, it has changed
    return true;
  }
}

/**
 * Validates if an option can be interacted with.
 * @private
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if option is interactive.
 */
export function isOptionInteractive(option) {
  return !option.hasAttribute('hidden') &&
         !option.hasAttribute('disabled') &&
         !option.hasAttribute('static');
}

/**
 * Helper method to dispatch custom events.
 * @param {HTMLElement} element - Element to dispatch event from.
 * @param {string} eventName - Name of the event to dispatch.
 * @param {Object} [detail] - Optional detail object to include with the event.
 */
export function dispatchMenuEvent(element, eventName, detail = null) {
  const eventConfig = {
    bubbles: true,
    cancelable: false,
    composed: true
  };

  if (detail !== null) {
    eventConfig.detail = detail;
  }

  element.dispatchEvent(new CustomEvent(eventName, eventConfig));
}
