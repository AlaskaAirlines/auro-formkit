/**
 * Framework-free ARIA/DOM prop-builders for the listbox pattern.
 * Pure functions over a base id + per-option render state — no component state,
 * no closures. Any owning machine (select today, combobox later) calls these.
 */

/** Props the render layer spreads onto the popup listbox element. */
export interface ListboxProps {
  role: "listbox";
  id: string;
  "aria-activedescendant": string | undefined;
  tabIndex: -1;
}

/** Props the render layer spreads onto each option element. */
export interface OptionProps {
  id: string;
  role: "option";
  "aria-selected": boolean;
  "aria-disabled": boolean | undefined;
  "data-active": "" | undefined;
  "data-disabled": "" | undefined;
  "data-state": "selected" | "unselected";
}

/** Per-option flags the owning machine resolves from its own state. */
export interface OptionRenderState {
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

/** Deterministic ids derived from a base id — SSR-safe, no id storage in state. */
export const listboxIds = {
  listbox: (baseId: string): string => `${baseId}-listbox`,
  option: (baseId: string, index: number): string => `${baseId}-option-${index}`,
};

/** Build the listbox element's props. */
export function listboxProps(baseId: string, activeDescendant: string | undefined): ListboxProps {
  return {
    role: "listbox",
    id: listboxIds.listbox(baseId),
    "aria-activedescendant": activeDescendant,
    tabIndex: -1,
  };
}

/** Build a single option element's props from resolved render state. */
export function optionProps(baseId: string, index: number, s: OptionRenderState): OptionProps {
  return {
    id: listboxIds.option(baseId, index),
    role: "option",
    "aria-selected": s.selected,
    "aria-disabled": s.disabled || undefined,
    "data-active": s.active ? "" : undefined,
    "data-disabled": s.disabled ? "" : undefined,
    "data-state": s.selected ? "selected" : "unselected",
  };
}
