// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/**
 * Converts a value to an array.
 * Parses a JSON string of an array, returns an array as-is, and returns
 * `undefined` for `undefined`.
 * @private
 * @param {any} value - The value to convert: a JSON string of an array, an array, or undefined.
 * @returns {Array|undefined} The array, or undefined when the value is undefined.
 * @throws {Error} If the value isn't an array, undefined, or a JSON string of an array.
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
 * @returns {string|undefined} The JSON string of the values, or undefined when the array is empty or missing.
 */
export function serializeMultiSelectValue(values) {
  return values && values.length > 0 ? JSON.stringify(values) : undefined;
}

/**
 * Checks whether two arrays hold the same items in the same order.
 * @private
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {boolean} True if both arrays hold the same items in the same order, or both are undefined; false otherwise.
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
 * Checks whether any `auro-menu` that contains the option, including nested menus, is disabled.
 * Use it to decide whether an option can be used, because a menu's `disabled`
 * setting isn't copied onto its options.
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if any menu containing the option is disabled; false otherwise.
 */
export function hasDisabledAncestorMenu(option) {
  let ancestor = option.closest('auro-menu, [auro-menu]');

  while (ancestor) {
    if (ancestor.disabled) {
      return true;
    }
    ancestor = ancestor.parentElement ? ancestor.parentElement.closest('auro-menu, [auro-menu]') : null;
  }

  return false;
}

/**
 * Checks whether an option can be highlighted and selected: it isn't `hidden`,
 * `disabled`, or `static`, and no menu containing it is disabled.
 * @private
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if the option can be highlighted and selected; false otherwise.
 */
export function isOptionInteractive(option) {
  return !option.hasAttribute('hidden') &&
         !option.hasAttribute('disabled') &&
         !option.hasAttribute('static') &&
         !hasDisabledAncestorMenu(option);
}

/**
 * Checks whether an option can be selected by setting the menu's `value` or calling `selectByValue()`.
 * Options marked `disabled` or `static`, or inside a disabled menu, can't be.
 * `hidden` options can, because `auro-combobox` hides options that don't match
 * what someone typed and they're still valid selections.
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if the option can be selected by value; false otherwise.
 */
export function isSelectableByValue(option) {
  return !option.hasAttribute('disabled') &&
         !option.hasAttribute('static') &&
         !hasDisabledAncestorMenu(option);
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
  // Mirror `resolved` as a Set for O(1) membership checks below, matching the
  // indexMap optimization used for the sort rather than scanning `resolved`
  // on every candidate.
  const resolvedSet = new Set();

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
      if (keyed && isSelectableByValue(keyed) && (remaining.get(keyed.value) || 0) > 0 && !resolvedSet.has(keyed)) {
        resolved.push(keyed);
        resolvedSet.add(keyed);
        remaining.set(keyed.value, remaining.get(keyed.value) - 1);
      }
    });
  }

  // Fall back to value matching for the occurrences not resolved by key. Iterate
  // the leftover per-value counts so a value that appears twice but was only
  // resolved once by key still matches its remaining occurrence(s).
  remaining.forEach((count, val) => {
    for (let occurrence = 0; occurrence < count; occurrence += 1) {
      const option = items.find((item) => isSelectableByValue(item) && item.value === val && !resolvedSet.has(item));
      if (option) {
        resolved.push(option);
        resolvedSet.add(option);
      }
    }
  });

  // Always return in DOM order so display is consistent regardless of the order
  // keys/values were selected. Every resolved option came from `items`, so an
  // O(1) index lookup mirrors `_sortSelectedByDomOrder` and avoids the O(n)
  // `items.indexOf` per comparison for large combobox option sets. Any element
  // not in `items` (a stale snapshot from a future caller) sorts to the END via
  // `?? items.length`, matching `_sortSelectedByDomOrder` and avoiding NaN
  // comparisons.
  const indexMap = new Map(items.map((item, index) => [
    item,
    index
  ]));
  resolved.sort((optionA, optionB) => (indexMap.get(optionA) ?? items.length) - (indexMap.get(optionB) ?? items.length));

  return resolved;
}
/* eslint-enable no-underscore-dangle */

/**
 * Dispatches a custom event from an element.
 * The event bubbles, crosses shadow DOM boundaries, and can't be canceled.
 * @param {HTMLElement} element - The element to dispatch the event from.
 * @param {string} eventName - The name of the event to dispatch.
 * @param {Object} [detail] - The value for the event's `detail`, if any.
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
