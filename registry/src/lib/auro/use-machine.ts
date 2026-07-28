import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useId,
  useMemo,
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
import {
  type ComboboxApi,
  type ComboboxOption,
  type ComboboxState,
  connect as connectCombobox,
  filterOptions,
  handleKey as handleComboboxKey,
  isComboboxKey,
  open as openCombobox,
  selectIndex as selectComboboxIndex,
  setInputValue,
} from "@auro/headless/combobox";
import { useListbox } from "@/lib/auro/use-listbox.ts";

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

  const { isOpen, activeIndex, setOpen, setActiveIndex, containerRef, triggerRef, listboxRef } =
    useListbox<HTMLButtonElement>();

  const state: SelectState = { open: isOpen, value, activeIndex, disabled };

  const reconcile = useCallback(
    (next: SelectState) => {
      const wasOpen = isOpen;
      if (next.open !== isOpen) setOpen(next.open);
      if (next.activeIndex !== activeIndex) setActiveIndex(next.activeIndex);
      if (next.value !== value) {
        if (!isControlled) setUncontrolled(next.value);
        if (next.value !== null) onValueChange?.(next.value);
      }
      if (wasOpen && !next.open) {
        triggerRef.current?.focus();
      }
    },
    [activeIndex, isControlled, isOpen, onValueChange, setActiveIndex, setOpen, triggerRef, value],
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
    [api, options, reconcile, setActiveIndex, state],
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

export interface UseComboboxProps {
  options: ComboboxOption[];
  /** Controlled selected value. Omit for uncontrolled usage. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  /** Fired with the option's value when the user commits a selection. */
  onValueChange?: (value: string) => void;
}

export interface UseComboboxOptionProps {
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

export interface UseComboboxReturn {
  api: ComboboxApi;
  isOpen: boolean;
  /** The current text in the input field. */
  inputValue: string;
  /** The options matching the current query — render these, in this order. */
  filtered: ComboboxOption[];
  containerRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  listboxRef: RefObject<HTMLUListElement | null>;
  inputHandlers: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onClick: (event: MouseEvent) => void;
  };
  getOptionProps: (option: ComboboxOption, index: number) => UseComboboxOptionProps;
  /** Reset the value and input text, then refocus the input. */
  clear: () => void;
}

/**
 * React binding for the framework-free combobox core in `@auro/headless`.
 * Reuses the same `useListbox` mechanics and `Popover` primitive as `useSelect`;
 * the only additions are the text input and the filtered view it drives.
 * Supports controlled (`value`) and uncontrolled (`defaultValue`) selection.
 */
export function useCombobox(props: UseComboboxProps): UseComboboxReturn {
  const { options, value: controlled, defaultValue, disabled = false, onValueChange } = props;

  const generatedId = useId();
  const baseId = props.id ?? generatedId;

  const isControlled = controlled !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue ?? null);
  const value = isControlled ? controlled : uncontrolled;

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  const [inputValue, setInputValueState] = useState<string>(selectedLabel);

  const { isOpen, activeIndex, setOpen, setActiveIndex, containerRef, triggerRef, listboxRef } =
    useListbox<HTMLInputElement>();

  // When the field text still mirrors the committed selection (i.e. the user
  // hasn't typed to refine), treat the query as empty so reopening shows every
  // option instead of narrowing to the single selected label.
  const query = value !== null && inputValue === selectedLabel ? "" : inputValue;
  const filtered = useMemo(() => filterOptions(options, query), [options, query]);

  const state: ComboboxState = { open: isOpen, value, inputValue, activeIndex, disabled };

  const reconcile = useCallback(
    (next: ComboboxState) => {
      const wasOpen = isOpen;
      if (next.open !== isOpen) setOpen(next.open);
      if (next.activeIndex !== activeIndex) setActiveIndex(next.activeIndex);
      if (next.inputValue !== inputValue) setInputValueState(next.inputValue);
      if (next.value !== value) {
        if (!isControlled) setUncontrolled(next.value);
        if (next.value !== null) onValueChange?.(next.value);
      }
      if (wasOpen && !next.open) {
        triggerRef.current?.focus();
      }
    },
    [activeIndex, inputValue, isControlled, isOpen, onValueChange, setActiveIndex, setOpen, triggerRef, value],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextText = event.target.value;
      const nextFiltered = filterOptions(options, nextText.trim());
      reconcile(setInputValue(state, nextFiltered, nextText));
    },
    [options, reconcile, state],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isComboboxKey(event.key)) return;
      event.preventDefault();
      reconcile(handleComboboxKey(state, filtered, event.key));
    },
    [filtered, reconcile, state],
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (disabled || isOpen) return;
      reconcile(openCombobox(state, filtered));
    },
    [disabled, filtered, isOpen, reconcile, state],
  );

  const api = connectCombobox(state, filtered, baseId);

  const getOptionProps = useCallback(
    (option: ComboboxOption, index: number): UseComboboxOptionProps => {
      const base = api.getOptionProps(index);
      return {
        ...base,
        onClick: (event: MouseEvent) => {
          event.preventDefault();
          if (option.disabled) return;
          reconcile(selectComboboxIndex(state, filtered, index));
        },
        onMouseEnter: () => {
          if (option.disabled) return;
          setActiveIndex(index);
        },
      };
    },
    [api, filtered, reconcile, setActiveIndex, state],
  );

  const clear = useCallback(() => {
    if (!isControlled) setUncontrolled(null);
    setInputValueState("");
    onValueChange?.("");
    triggerRef.current?.focus();
  }, [isControlled, onValueChange, triggerRef]);

  return {
    api,
    isOpen,
    inputValue,
    filtered,
    containerRef,
    inputRef: triggerRef,
    listboxRef,
    inputHandlers: { onChange, onKeyDown, onClick },
    getOptionProps,
    clear,
  };
}
