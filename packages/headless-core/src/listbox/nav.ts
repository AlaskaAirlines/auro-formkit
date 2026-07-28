/**
 * Framework-free listbox navigation over an abstract index collection.
 * A `Collection` is any ordered set that knows its length and which indices
 * are disabled — select passes its full options, combobox its *filtered* view.
 * No React, no DOM. Shared by every owning machine (select today, combobox next).
 */

/** Minimal shape the enabled-index helpers navigate over. */
export interface Collection {
  length: number;
  isDisabled(index: number): boolean;
}

/** Adapt any array of items with an optional `disabled` flag into a Collection. */
export function fromOptions(items: readonly { disabled?: boolean }[]): Collection {
  return {
    length: items.length,
    isDisabled: (i: number): boolean => Boolean(items[i]?.disabled),
  };
}

/**
 * Index of the first item whose value matches, else -1. Value-generic: the
 * lookup value type `V` may differ from the item type `T` (select matches a
 * `string` against each option's `value` field via a custom `eq`).
 */
export function indexOfValue<T, V = T>(
  items: readonly T[],
  value: V | null,
  eq: (item: T, value: V) => boolean = (a, b): boolean => (a as unknown) === b,
): number {
  if (value === null) return -1;
  return items.findIndex((item) => eq(item, value));
}

/** First enabled index, or -1 if none. */
export function firstEnabledIndex(c: Collection): number {
  for (let i = 0; i < c.length; i++) {
    if (!c.isDisabled(i)) return i;
  }
  return -1;
}

/** Last enabled index, or -1 if none. */
export function lastEnabledIndex(c: Collection): number {
  for (let i = c.length - 1; i >= 0; i--) {
    if (!c.isDisabled(i)) return i;
  }
  return -1;
}

/** Next enabled index after `from` (no wrap; keeps `from` if enabled and nothing follows). */
export function nextEnabledIndex(c: Collection, from: number): number {
  for (let i = from + 1; i < c.length; i++) {
    if (!c.isDisabled(i)) return i;
  }
  return from >= 0 && from < c.length && !c.isDisabled(from) ? from : firstEnabledIndex(c);
}

/** Previous enabled index before `from` (no wrap; keeps `from` if enabled and nothing precedes). */
export function prevEnabledIndex(c: Collection, from: number): number {
  for (let i = from - 1; i >= 0; i--) {
    if (!c.isDisabled(i)) return i;
  }
  return from >= 0 && from < c.length && !c.isDisabled(from) ? from : lastEnabledIndex(c);
}
