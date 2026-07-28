/**
 * Framework-free single-select (select-only combobox) logic.
 * No React, no DOM access at module load. Follows the WAI-ARIA APG
 * "Select-Only Combobox" pattern. A Svelte/Vue adapter — or a future
 * combobox machine — can reuse this identical core and its pure helpers.
 */

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

/** Props the render layer spreads onto the popup listbox element. */
export interface SelectListboxProps {
  role: "listbox";
  id: string;
  "aria-activedescendant": string | undefined;
  tabIndex: -1;
}

/** Props the render layer spreads onto each option element. */
export interface SelectOptionProps {
  id: string;
  role: "option";
  "aria-selected": boolean;
  "aria-disabled": boolean | undefined;
  "data-active": "" | undefined;
  "data-disabled": "" | undefined;
  "data-state": "selected" | "unselected";
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
  listboxProps: SelectListboxProps;
  getOptionProps: (index: number) => SelectOptionProps;
}

/** Deterministic ids derived from a base id — SSR-safe, no id storage in state. */
function listboxId(baseId: string): string {
  return `${baseId}-listbox`;
}
function optionId(baseId: string, index: number): string {
  return `${baseId}-option-${index}`;
}

/** Index of the option whose value matches, else -1. */
export function indexOfValue(options: SelectOption[], value: string | null): number {
  if (value === null) return -1;
  return options.findIndex((o) => o.value === value);
}

/** First enabled option index, or -1 if none. */
export function firstEnabledIndex(options: SelectOption[]): number {
  return options.findIndex((o) => !o.disabled);
}

/** Last enabled option index, or -1 if none. */
export function lastEnabledIndex(options: SelectOption[]): number {
  for (let i = options.length - 1; i >= 0; i--) {
    if (!options[i].disabled) return i;
  }
  return -1;
}

/** Next enabled index after `from` (no wrap; clamps by keeping `from` if none follows). */
export function nextEnabledIndex(options: SelectOption[], from: number): number {
  for (let i = from + 1; i < options.length; i++) {
    if (!options[i].disabled) return i;
  }
  return from >= 0 && from < options.length && !options[from].disabled ? from : firstEnabledIndex(options);
}

/** Previous enabled index before `from` (no wrap; clamps by keeping `from` if none precedes). */
export function prevEnabledIndex(options: SelectOption[], from: number): number {
  for (let i = from - 1; i >= 0; i--) {
    if (!options[i].disabled) return i;
  }
  return from >= 0 && from < options.length && !options[from].disabled ? from : lastEnabledIndex(options);
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
 */
export function connect(state: SelectState, options: SelectOption[], baseId: string): SelectApi {
  const { open: isOpen, activeIndex, disabled } = state;
  const selectedIdx = indexOfValue(options, state.value);
  const selectedOption = selectedIdx >= 0 ? options[selectedIdx] : undefined;
  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < options.length
      ? optionId(baseId, activeIndex)
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
      "aria-controls": listboxId(baseId),
      "aria-activedescendant": activeDescendant,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : 0,
      "data-state": isOpen ? "open" : "closed",
      "data-disabled": disabled ? "" : undefined,
    },
    listboxProps: {
      role: "listbox",
      id: listboxId(baseId),
      "aria-activedescendant": activeDescendant,
      tabIndex: -1,
    },
    getOptionProps: (index: number): SelectOptionProps => {
      const option = options[index];
      const isSelected = selectedIdx === index;
      const isActive = isOpen && activeIndex === index;
      const isDisabledOption = Boolean(option?.disabled);
      return {
        id: optionId(baseId, index),
        role: "option",
        "aria-selected": isSelected,
        "aria-disabled": isDisabledOption || undefined,
        "data-active": isActive ? "" : undefined,
        "data-disabled": isDisabledOption ? "" : undefined,
        "data-state": isSelected ? "selected" : "unselected",
      };
    },
  };
}
