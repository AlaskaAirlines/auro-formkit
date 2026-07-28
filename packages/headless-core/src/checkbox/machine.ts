/**
 * Framework-free checkbox logic. No React, no DOM access at module load.
 * A Svelte/Vue adapter can consume this identical core later.
 */

/** A checkbox is tri-state: on, off, or partially-selected. */
export type CheckedState = boolean | "indeterminate";

/** The externally-controlled state of a checkbox. */
export interface CheckboxState {
  checked: CheckedState;
  disabled: boolean;
}

/** ARIA value for `aria-checked`, per the WAI-ARIA checkbox pattern. */
export type AriaChecked = "true" | "false" | "mixed";

/** Props the render layer should spread onto the interactive root element. */
export interface CheckboxRootProps {
  role: "checkbox";
  "aria-checked": AriaChecked;
  "aria-disabled": boolean | undefined;
  tabIndex: number;
  "data-state": "checked" | "unchecked" | "indeterminate";
  "data-disabled": "" | undefined;
}

/** The resolved, ready-to-render view of a checkbox. */
export interface CheckboxApi {
  isChecked: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
  /** The value `checked` will become if the box is toggled now. */
  nextChecked: boolean;
  rootProps: CheckboxRootProps;
}

/**
 * Pure transition: what a checkbox becomes when toggled.
 * `indeterminate` resolves to `true` (matches the native + WAI-ARIA convention).
 */
export function toggle(checked: CheckedState): boolean {
  return checked === "indeterminate" ? true : !checked;
}

function ariaChecked(checked: CheckedState): AriaChecked {
  if (checked === "indeterminate") return "mixed";
  return checked ? "true" : "false";
}

/**
 * Resolve raw state into everything the render layer needs. Framework-agnostic:
 * the returned `rootProps` are plain data a React/Svelte adapter can spread.
 */
export function connect(state: CheckboxState): CheckboxApi {
  const { checked, disabled } = state;
  const isIndeterminate = checked === "indeterminate";
  const isChecked = checked === true;

  return {
    isChecked,
    isIndeterminate,
    isDisabled: disabled,
    nextChecked: toggle(checked),
    rootProps: {
      role: "checkbox",
      "aria-checked": ariaChecked(checked),
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : 0,
      "data-state": isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked",
      "data-disabled": disabled ? "" : undefined,
    },
  };
}

/** Keys that toggle a checkbox per the WAI-ARIA pattern. */
export function isToggleKey(key: string): boolean {
  return key === " " || key === "Spacebar";
}
