/**
 * Framework-free single-select (select-only combobox) logic.
 * No React, no DOM access at module load. Follows the WAI-ARIA APG
 * "Select-Only Combobox" pattern. A Svelte/Vue adapter — or the sibling
 * combobox machine — reuses this identical core and the shared `listbox/*`
 * navigation + ARIA modules.
 */

import {
  firstEnabledIndex as firstEnabled,
  fromOptions,
  indexOfValue as indexOf,
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

// Re-export the shared listbox prop types under select's historical public names
// so the barrel and any consumer importing `SelectListboxProps`/`SelectOptionProps`
// keep working unchanged.
export type { ListboxProps as SelectListboxProps, OptionProps as SelectOptionProps };

/** One selectable option. `value` is the stable identity; `label` is display text. */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/** The externally-controlled state of a select. `activeIndex` is the roving highlight; -1 = none. */
export interface SelectState {
  open: boolean;
  value: string | null;
  activeIndex: number;
  disabled: boolean;
}

/** Props the render layer spreads onto the trigger (the combobox element). */
export interface SelectTriggerProps {
  role: "combobox";
  "aria-haspopup": "listbox";
  "aria-expanded": boolean;
  "aria-controls": string;
  "aria-activedescendant": string | undefined;
  "aria-disabled": boolean | undefined;
  tabIndex: number;
  "data-state": "open" | "closed";
  "data-disabled": "" | undefined;
}

/** The resolved, ready-to-render view of a select. */
export interface SelectApi {
  isOpen: boolean;
  isDisabled: boolean;
  activeIndex: number;
  selectedOption: SelectOption | undefined;
  /** Display text for the trigger; empty string when nothing is selected. */
  selectedLabel: string;
  triggerProps: SelectTriggerProps;
  listboxProps: ListboxProps;
  getOptionProps: (index: number) => OptionProps;
}

// The 5 navigation helpers now live in `listbox/nav.ts`, generalized over a
// `Collection`. These thin wrappers preserve select's original `SelectOption[]`
// signatures so the public API — and every internal caller below — is unchanged.

/** Index of the option whose value matches, else -1. */
export function indexOfValue(options: SelectOption[], value: string | null): number {
  return indexOf(options, value, (o, v) => o.value === v);
}

/** First enabled option index, or -1 if none. */
export function firstEnabledIndex(options: SelectOption[]): number {
  return firstEnabled(fromOptions(options));
}

/** Last enabled option index, or -1 if none. */
export function lastEnabledIndex(options: SelectOption[]): number {
  return lastEnabled(fromOptions(options));
}

/** Next enabled index after `from` (no wrap; clamps by keeping `from` if none follows). */
export function nextEnabledIndex(options: SelectOption[], from: number): number {
  return nextEnabled(fromOptions(options), from);
}

/** Previous enabled index before `from` (no wrap; clamps by keeping `from` if none precedes). */
export function prevEnabledIndex(options: SelectOption[], from: number): number {
  return prevEnabled(fromOptions(options), from);
}

/** The index the highlight should seed to when opening. */
function seedIndex(state: SelectState, options: SelectOption[]): number {
  const selected = indexOfValue(options, state.value);
  return selected >= 0 && !options[selected].disabled ? selected : firstEnabledIndex(options);
}

/** Pure transition: open the listbox, seeding the roving highlight. No-op if disabled. */
export function open(state: SelectState, options: SelectOption[]): SelectState {
  if (state.disabled) return state;
  return { ...state, open: true, activeIndex: seedIndex(state, options) };
}

/** Pure transition: close the listbox, keeping the committed value. */
export function close(state: SelectState): SelectState {
  return { ...state, open: false };
}

/** Pure transition: move the roving highlight to an enabled option. */
export function setActive(state: SelectState, index: number): SelectState {
  if (index < 0) return state;
  return { ...state, activeIndex: index };
}

/** Pure transition: commit an option as the value and close. No-op if invalid or disabled. */
export function selectIndex(state: SelectState, options: SelectOption[], index: number): SelectState {
  if (index < 0 || index >= options.length) return state;
  if (options[index].disabled) return state;
  return { ...state, value: options[index].value, open: false, activeIndex: index };
}

/**
 * Pure keyboard reducer. Returns the next state; never mutates, never touches the DOM.
 * Closed: ArrowDown/ArrowUp/Enter/Space/Home/End open the listbox and seed the highlight.
 * Open: arrows/Home/End move the highlight (skipping disabled); Enter/Space commit + close;
 * Escape closes keeping the value. Tab is intentionally not handled (the adapter commits on blur).
 */
export function handleKey(state: SelectState, options: SelectOption[], key: string): SelectState {
  if (state.disabled) return state;

  if (!state.open) {
    switch (key) {
      case "ArrowDown":
      case "Enter":
      case " ":
      case "Spacebar":
        return { ...state, open: true, activeIndex: seedIndex(state, options) };
      case "ArrowUp":
        return { ...state, open: true, activeIndex: lastEnabledIndex(options) };
      case "Home":
        return { ...state, open: true, activeIndex: firstEnabledIndex(options) };
      case "End":
        return { ...state, open: true, activeIndex: lastEnabledIndex(options) };
      default:
        return state;
    }
  }

  switch (key) {
    case "ArrowDown":
      return { ...state, activeIndex: nextEnabledIndex(options, state.activeIndex) };
    case "ArrowUp":
      return { ...state, activeIndex: prevEnabledIndex(options, state.activeIndex) };
    case "Home":
      return { ...state, activeIndex: firstEnabledIndex(options) };
    case "End":
      return { ...state, activeIndex: lastEnabledIndex(options) };
    case "Enter":
    case " ":
    case "Spacebar":
      return selectIndex(state, options, state.activeIndex);
    case "Escape":
      return { ...state, open: false };
    default:
      return state;
  }
}

/** Keys that should trigger a select interaction (used by adapters to preventDefault). */
export function isSelectKey(key: string): boolean {
  return (
    key === "ArrowDown" ||
    key === "ArrowUp" ||
    key === "Home" ||
    key === "End" ||
    key === "Enter" ||
    key === " " ||
    key === "Spacebar" ||
    key === "Escape"
  );
}

/**
 * Resolve raw state into everything the render layer needs. Framework-agnostic:
 * the returned prop bags are plain data a React/Svelte adapter can spread.
 * Prop construction is delegated to the shared `listbox/aria.ts` builders.
 */
export function connect(state: SelectState, options: SelectOption[], baseId: string): SelectApi {
  const { open: isOpen, activeIndex, disabled } = state;
  const selectedIdx = indexOfValue(options, state.value);
  const selectedOption = selectedIdx >= 0 ? options[selectedIdx] : undefined;
  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < options.length
      ? listboxIds.option(baseId, activeIndex)
      : undefined;

  return {
    isOpen,
    isDisabled: disabled,
    activeIndex,
    selectedOption,
    selectedLabel: selectedOption ? selectedOption.label : "",
    triggerProps: {
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      "aria-controls": listboxIds.listbox(baseId),
      "aria-activedescendant": activeDescendant,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : 0,
      "data-state": isOpen ? "open" : "closed",
      "data-disabled": disabled ? "" : undefined,
    },
    listboxProps: buildListboxProps(baseId, activeDescendant),
    getOptionProps: (index: number): OptionProps =>
      buildOptionProps(baseId, index, {
        selected: selectedIdx === index,
        active: isOpen && activeIndex === index,
        disabled: Boolean(options[index]?.disabled),
      }),
  };
}
