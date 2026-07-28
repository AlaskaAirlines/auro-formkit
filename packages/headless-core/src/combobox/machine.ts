/**
 * Framework-free editable combobox logic (WAI-ARIA APG "Combobox with List
 * Autocomplete"). No React, no DOM access at module load. Shares the exact same
 * `listbox/*` navigation + ARIA modules as the select machine — the only thing
 * that differs is the text input and the filtered view it drives. `activeIndex`
 * and every option prop are indexed against the *filtered* list, so the render
 * layer renders `filtered` and spreads `getOptionProps(i)` in lockstep.
 */

import {
  type Collection,
  firstEnabledIndex as firstEnabled,
  fromOptions,
  lastEnabledIndex as lastEnabled,
  nextEnabledIndex as nextEnabled,
  prevEnabledIndex as prevEnabled,
} from "../listbox/nav.ts";
import {
  type ListboxProps,
  type OptionProps,
  listboxIds,
  listboxProps as buildListboxProps,
  optionProps as buildOptionProps,
} from "../listbox/aria.ts";

/** One selectable option. `value` is the stable identity; `label` is display + filter text. */
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * The externally-controlled state of a combobox. `inputValue` is the text in the
 * field (drives filtering); `value` is the committed selection. `activeIndex` is
 * the roving highlight *within the filtered list*; -1 = none.
 */
export interface ComboboxState {
  open: boolean;
  value: string | null;
  inputValue: string;
  activeIndex: number;
  disabled: boolean;
}

/** Props the render layer spreads onto the text input (the combobox element). */
export interface ComboboxInputProps {
  role: "combobox";
  "aria-autocomplete": "list";
  "aria-haspopup": "listbox";
  "aria-expanded": boolean;
  "aria-controls": string;
  "aria-activedescendant": string | undefined;
  "aria-disabled": boolean | undefined;
  disabled: boolean;
  "data-state": "open" | "closed";
}

/** The resolved, ready-to-render view of a combobox. All indices are into `filtered`. */
export interface ComboboxApi {
  isOpen: boolean;
  isDisabled: boolean;
  activeIndex: number;
  /** The committed option (matched by `value`), or undefined. */
  selectedOption: ComboboxOption | undefined;
  /** True when the query matched no options — render an empty state. */
  isEmpty: boolean;
  inputProps: ComboboxInputProps;
  listboxProps: ListboxProps;
  getOptionProps: (index: number) => OptionProps;
}

/**
 * Synchronous substring filter on `label` (case-insensitive, trimmed). An empty
 * query returns every option. Pure — the render layer memoizes the result and
 * feeds it back into `handleKey`/`connect` so navigation and ARIA stay in sync.
 */
export function filterOptions(options: ComboboxOption[], query: string): ComboboxOption[] {
  const q = query.trim().toLowerCase();
  if (q === "") return options;
  return options.filter((o) => o.label.toLowerCase().includes(q));
}

/** Index of the option in `filtered` whose value matches, else -1. */
export function indexOfValue(filtered: ComboboxOption[], value: string | null): number {
  if (value === null) return -1;
  return filtered.findIndex((o) => o.value === value);
}

/** The index the highlight should seed to when opening: the selection if visible, else first enabled. */
function seedIndex(state: ComboboxState, filtered: ComboboxOption[]): number {
  const selected = indexOfValue(filtered, state.value);
  if (selected >= 0 && !filtered[selected].disabled) return selected;
  return firstEnabled(fromOptions(filtered));
}

/** Pure transition: open the listbox, seeding the roving highlight. No-op if disabled. */
export function open(state: ComboboxState, filtered: ComboboxOption[]): ComboboxState {
  if (state.disabled) return state;
  return { ...state, open: true, activeIndex: seedIndex(state, filtered) };
}

/** Pure transition: close the listbox, keeping the committed value and input text. */
export function close(state: ComboboxState): ComboboxState {
  return { ...state, open: false };
}

/**
 * Pure transition: the user typed. Updates `inputValue`, opens the list, and
 * reseeds the highlight to the first enabled match of the *new* filtered view.
 */
export function setInputValue(
  state: ComboboxState,
  filtered: ComboboxOption[],
  inputValue: string,
): ComboboxState {
  if (state.disabled) return state;
  return {
    ...state,
    inputValue,
    open: true,
    activeIndex: firstEnabled(fromOptions(filtered)),
  };
}

/** Pure transition: move the roving highlight to an enabled option in the filtered list. */
export function setActive(state: ComboboxState, index: number): ComboboxState {
  if (index < 0) return state;
  return { ...state, activeIndex: index };
}

/**
 * Pure transition: commit a filtered option as the value, sync the input text to
 * its label, and close. No-op if the index is invalid or the option is disabled.
 */
export function selectIndex(
  state: ComboboxState,
  filtered: ComboboxOption[],
  index: number,
): ComboboxState {
  if (index < 0 || index >= filtered.length) return state;
  if (filtered[index].disabled) return state;
  const option = filtered[index];
  return { ...state, value: option.value, inputValue: option.label, open: false, activeIndex: index };
}

/**
 * Pure keyboard reducer over the *filtered* collection. Never mutates, never
 * touches the DOM.
 * Closed: ArrowDown/ArrowUp/Home/End open + seed the highlight.
 * Open: arrows/Home/End move the highlight (skipping disabled); Enter commits +
 * closes; Escape closes keeping the value. Printable typing is handled by the
 * adapter via `setInputValue`, not here.
 */
export function handleKey(
  state: ComboboxState,
  filtered: ComboboxOption[],
  key: string,
): ComboboxState {
  if (state.disabled) return state;
  const c: Collection = fromOptions(filtered);

  if (!state.open) {
    switch (key) {
      case "ArrowDown":
      case "Home":
        return { ...state, open: true, activeIndex: firstEnabled(c) };
      case "ArrowUp":
      case "End":
        return { ...state, open: true, activeIndex: lastEnabled(c) };
      default:
        return state;
    }
  }

  switch (key) {
    case "ArrowDown":
      return { ...state, activeIndex: nextEnabled(c, state.activeIndex) };
    case "ArrowUp":
      return { ...state, activeIndex: prevEnabled(c, state.activeIndex) };
    case "Home":
      return { ...state, activeIndex: firstEnabled(c) };
    case "End":
      return { ...state, activeIndex: lastEnabled(c) };
    case "Enter":
      return selectIndex(state, filtered, state.activeIndex);
    case "Escape":
      return { ...state, open: false };
    default:
      return state;
  }
}

/** Keys the adapter should intercept (preventDefault) so the browser doesn't scroll/submit. */
export function isComboboxKey(key: string): boolean {
  return (
    key === "ArrowDown" ||
    key === "ArrowUp" ||
    key === "Home" ||
    key === "End" ||
    key === "Enter" ||
    key === "Escape"
  );
}

/**
 * Resolve raw state + the filtered view into everything the render layer needs.
 * Framework-agnostic: prop construction is delegated to the shared `listbox/aria.ts`
 * builders — identical to select, proving the modules generalize.
 */
export function connect(
  state: ComboboxState,
  filtered: ComboboxOption[],
  baseId: string,
): ComboboxApi {
  const { open: isOpen, activeIndex, disabled } = state;
  const selectedIdx = indexOfValue(filtered, state.value);
  const selectedOption = selectedIdx >= 0 ? filtered[selectedIdx] : undefined;
  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < filtered.length
      ? listboxIds.option(baseId, activeIndex)
      : undefined;

  return {
    isOpen,
    isDisabled: disabled,
    activeIndex,
    selectedOption,
    isEmpty: filtered.length === 0,
    inputProps: {
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      "aria-controls": listboxIds.listbox(baseId),
      "aria-activedescendant": activeDescendant,
      "aria-disabled": disabled || undefined,
      disabled,
      "data-state": isOpen ? "open" : "closed",
    },
    listboxProps: buildListboxProps(baseId, activeDescendant),
    getOptionProps: (index: number): OptionProps =>
      buildOptionProps(baseId, index, {
        selected: selectedIdx === index,
        active: isOpen && activeIndex === index,
        disabled: Boolean(filtered[index]?.disabled),
      }),
  };
}
