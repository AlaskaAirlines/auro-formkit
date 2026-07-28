import { type ReactNode } from "react";
import { type CheckedState } from "@auro/headless/checkbox";
import { useCheckbox } from "../../lib/auro/use-machine.ts";
import "./auro-checkbox.css";

export interface CheckboxProps {
  /** Controlled checked value: `true`, `false`, or `"indeterminate"`. */
  checked?: CheckedState;
  /** Initial value when used uncontrolled. */
  defaultChecked?: CheckedState;
  disabled?: boolean;
  id?: string;
  children?: ReactNode;
  /** Fired with the resolved boolean when the user toggles the checkbox. */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Auro Checkbox — a typed, accessible tri-state checkbox.
 * Logic lives in the framework-free `@auro/headless` core; this file is the
 * React render layer and is yours to edit once copied in.
 */
export function Checkbox(props: CheckboxProps): ReactNode {
  const { children, id } = props;
  const { api, handlers } = useCheckbox({
    checked: props.checked,
    defaultChecked: props.defaultChecked,
    disabled: props.disabled,
    onCheckedChange: props.onCheckedChange,
  });

  return (
    <label className="auro-checkbox" data-disabled={api.isDisabled ? "" : undefined}>
      <span id={id} className="auro-checkbox__control" {...api.rootProps} {...handlers}>
        <svg className="auro-checkbox__indicator" viewBox="0 0 16 16" aria-hidden="true">
          {api.isIndeterminate ? (
            <line x1="3.5" y1="8" x2="12.5" y2="8" />
          ) : (
            <polyline points="3.5 8.5 6.75 11.5 12.5 4.5" />
          )}
        </svg>
      </span>
      {children != null && <span className="auro-checkbox__label">{children}</span>}
    </label>
  );
}
