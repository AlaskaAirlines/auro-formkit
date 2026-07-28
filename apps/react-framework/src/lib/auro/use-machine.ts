import { type KeyboardEvent, type MouseEvent, useCallback, useState } from "react";
import {
  type CheckboxApi,
  type CheckedState,
  connect,
  isToggleKey,
  toggle,
} from "@auro/headless/checkbox";

export interface UseCheckboxProps {
  /** Controlled checked value. Omit for uncontrolled usage. */
  checked?: CheckedState;
  /** Initial value when uncontrolled. */
  defaultChecked?: CheckedState;
  disabled?: boolean;
  /** Fired with the resolved boolean after a user toggles the box. */
  onCheckedChange?: (checked: boolean) => void;
}

export interface UseCheckboxReturn {
  api: CheckboxApi;
  handlers: {
    onClick: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
  };
}

/**
 * React binding for the framework-free checkbox core in `@auro/headless`.
 * Supports both controlled (`checked`) and uncontrolled (`defaultChecked`) use.
 */
export function useCheckbox(props: UseCheckboxProps): UseCheckboxReturn {
  const { checked: controlled, defaultChecked = false, disabled = false, onCheckedChange } = props;

  const isControlled = controlled !== undefined;
  const [uncontrolled, setUncontrolled] = useState<CheckedState>(defaultChecked);
  const checked = isControlled ? controlled : uncontrolled;

  const commit = useCallback(() => {
    if (disabled) return;
    const next = toggle(checked);
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  }, [checked, disabled, isControlled, onCheckedChange]);

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      commit();
    },
    [commit],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isToggleKey(event.key)) return;
      event.preventDefault();
      commit();
    },
    [commit],
  );

  return {
    api: connect({ checked, disabled }),
    handlers: { onClick, onKeyDown },
  };
}
