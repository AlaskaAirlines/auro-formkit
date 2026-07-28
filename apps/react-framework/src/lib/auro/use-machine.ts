import {
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  type CheckboxApi,
  type CheckedState,
  connect,
  isToggleKey,
  toggle,
} from "@auro/headless/checkbox";
import {
  type SelectApi,
  type SelectOption,
  type SelectState,
  connect as connectSelect,
  handleKey,
  isSelectKey,
  open as openSelect,
  selectIndex,
} from "@auro/headless/select";

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

export interface UseSelectProps {
  options: SelectOption[];
  /** Controlled selected value. Omit for uncontrolled usage. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  /** Fired with the option's value when the user makes a selection. */
  onValueChange?: (value: string) => void;
}

export interface UseSelectOptionProps {
  id: string;
  role: "option";
  "aria-selected": boolean;
  "aria-disabled": boolean | undefined;
  "data-active": "" | undefined;
  "data-disabled": "" | undefined;
  "data-state": "selected" | "unselected";
  onClick: (event: MouseEvent) => void;
  onMouseEnter: () => void;
}

export interface UseSelectReturn {
  api: SelectApi;
  isOpen: boolean;
  /** Resolved label of the selected option, or undefined for the placeholder. */
  selectedLabel: string | undefined;
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  listboxRef: RefObject<HTMLUListElement | null>;
  triggerHandlers: {
    onClick: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
  };
  getOptionProps: (option: SelectOption, index: number) => UseSelectOptionProps;
}

/**
 * React binding for the framework-free select core in `@auro/headless`.
 * Supports both controlled (`value`) and uncontrolled (`defaultValue`) use.
 * Focus stays on the trigger; the active option is tracked via aria-activedescendant.
 */
export function useSelect(props: UseSelectProps): UseSelectReturn {
  const { options, value: controlled, defaultValue, disabled = false, onValueChange } = props;

  const generatedId = useId();
  const baseId = props.id ?? generatedId;

  const isControlled = controlled !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue ?? null);
  const value = isControlled ? controlled : uncontrolled;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);

  const state: SelectState = { open: isOpen, value, activeIndex, disabled };

  const reconcile = useCallback(
    (next: SelectState) => {
      const wasOpen = isOpen;
      if (next.open !== isOpen) setIsOpen(next.open);
      if (next.activeIndex !== activeIndex) setActiveIndex(next.activeIndex);
      if (next.value !== value) {
        if (!isControlled) setUncontrolled(next.value);
        if (next.value !== null) onValueChange?.(next.value);
      }
      if (wasOpen && !next.open) {
        triggerRef.current?.focus();
      }
    },
    [activeIndex, isControlled, isOpen, onValueChange, value],
  );

  const onTriggerClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (disabled) return;
      reconcile(isOpen ? { ...state, open: false } : openSelect(state, options));
    },
    [disabled, isOpen, options, reconcile, state],
  );

  const onTriggerKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isSelectKey(event.key)) return;
      event.preventDefault();
      reconcile(handleKey(state, options, event.key));
    },
    [options, reconcile, state],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const api = connectSelect(state, options, baseId);

  const getOptionProps = useCallback(
    (option: SelectOption, index: number): UseSelectOptionProps => {
      const base = api.getOptionProps(index);
      return {
        ...base,
        onClick: (event: MouseEvent) => {
          event.preventDefault();
          if (option.disabled) return;
          reconcile(selectIndex(state, options, index));
        },
        onMouseEnter: () => {
          if (option.disabled) return;
          setActiveIndex(index);
        },
      };
    },
    [api, options, reconcile, state],
  );

  return {
    api,
    isOpen,
    selectedLabel: api.selectedOption ? api.selectedOption.label : undefined,
    containerRef,
    triggerRef,
    listboxRef,
    triggerHandlers: { onClick: onTriggerClick, onKeyDown: onTriggerKeyDown },
    getOptionProps,
  };
}
