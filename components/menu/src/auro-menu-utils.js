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
 * Serializes a multi-select value array back into the String `value` property.
 * An empty (or missing) array collapses to `undefined` so an emptied selection
 * clears `value` rather than reflecting a `"[]"` attribute.
 * @private
 * @param {Array<string>|undefined} values - The selected values.
 * @returns {string|undefined} JSON string of the values, or undefined when empty.
 */
export function serializeMultiSelectValue(values) {
  return values && values.length > 0 ? JSON.stringify(values) : undefined;
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
 * Validates if an option may be selected by matching a programmatic value.
 * Unlike `isOptionInteractive`, `hidden` is allowed: the combobox toggles
 * `hidden` as its type-ahead filter, so a filtered-out option is still a
 * valid programmatic selection. Only disabled and static options — which are
 * never selectable — are rejected.
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if option can be selected by value.
 */
export function isSelectableByValue(option) {
  return !option.hasAttribute('disabled') &&
         !option.hasAttribute('static');
}

/* eslint-disable no-underscore-dangle */
/**
 * Resolves the single selected option for a given `value`, preferring the
 * option tracked by `selectedKey` (a user-initiated selection) over a
 * first-by-value match. When multiple options share the same `value`, matching
 * by `value` alone cannot distinguish which one the user picked; the key
 * disambiguates it.
 *
 * The key is trusted only when it still resolves to an option whose `value`
 * matches the requested `value`. If the key is stale (option removed) or the
 * value was changed programmatically, resolution falls back to value matching —
 * preserving backward-compatible behavior for preselection and `selectByValue`.
 * @private
 * @param {Array<HTMLElement>} items - The menu's flat option list.
 * @param {string} value - The value to resolve.
 * @param {string|undefined} selectedKey - The `_optionKey` of the user-selected option, if any.
 * @returns {HTMLElement|undefined} The resolved option, or undefined when none match.
 */
export function resolveSelectedOption(items, value, selectedKey) {
  if (!items) {
    return undefined;
  }

  if (selectedKey !== undefined) {
    const keyed = items.find((item) => item._optionKey === selectedKey);
    if (keyed && isSelectableByValue(keyed) && keyed.value === value) {
      return keyed;
    }
    // Key exists but the option is gone or its value no longer matches — fall
    // through to value-based matching.
  }

  return items.find((item) => isSelectableByValue(item) && item.value === value);
}

/**
 * Resolves the selected options for a multi-select `value` array, preferring
 * options tracked by `selectedKeys` (user-initiated selections) and falling
 * back to value matching for any values not resolved by key. The result is
 * always sorted into DOM order regardless of selection sequence.
 * @private
 * @param {Array<HTMLElement>} items - The menu's flat option list.
 * @param {Array<string>} valueArray - The selected values.
 * @param {Array<string>|undefined} selectedKeys - The `_optionKey`s of the user-selected options, if any.
 * @returns {Array<HTMLElement>} The resolved options in DOM order.
 */
export function resolveSelectedOptions(items, valueArray, selectedKeys) {
  if (!items) {
    return [];
  }

  const resolved = [];

  // Track how many of each value are still available to resolve. A value that
  // appears N times in `valueArray` may be satisfied at most N times total across
  // the key pass and the value fallback below — matching by count, not presence,
  // on BOTH passes. This stops a duplicate value from being over-resolved: e.g.
  // two keyed options that both carry `SEA` cannot both match a single requested
  // `SEA` (which happens when `value` is set directly without clearing
  // `_selectedKey`, so more keys survive than the value set now asks for).
  const remaining = new Map();
  valueArray.forEach((val) => remaining.set(val, (remaining.get(val) || 0) + 1));

  // Resolve by key first: trust a key only when its option is still selectable
  // and there is still an unmatched occurrence of its value in the request set.
  if (Array.isArray(selectedKeys)) {
    selectedKeys.forEach((key) => {
      const keyed = items.find((item) => item._optionKey === key);
      if (keyed && isSelectableByValue(keyed) && (remaining.get(keyed.value) || 0) > 0 && !resolved.includes(keyed)) {
        resolved.push(keyed);
        remaining.set(keyed.value, remaining.get(keyed.value) - 1);
      }
    });
  }

  // Fall back to value matching for the occurrences not resolved by key. Iterate
  // the leftover per-value counts so a value that appears twice but was only
  // resolved once by key still matches its remaining occurrence(s).
  remaining.forEach((count, val) => {
    for (let occurrence = 0; occurrence < count; occurrence += 1) {
      const option = items.find((item) => isSelectableByValue(item) && item.value === val && !resolved.includes(item));
      if (option) {
        resolved.push(option);
      }
    }
  });

  // Always return in DOM order so display is consistent regardless of the order
  // keys/values were selected. Every resolved option came from `items`, so an
  // O(1) index lookup mirrors `_sortSelectedByDomOrder` and avoids the O(n)
  // `items.indexOf` per comparison for large combobox option sets.
  const indexMap = new Map(items.map((item, index) => [
    item,
    index
  ]));
  resolved.sort((optionA, optionB) => indexMap.get(optionA) - indexMap.get(optionB));

  return resolved;
}
/* eslint-enable no-underscore-dangle */

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
