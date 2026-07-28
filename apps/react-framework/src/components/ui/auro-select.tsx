import { type ReactNode, createContext, useContext } from "react";
import { type SelectOption } from "@auro/headless/select";
import { type UseSelectReturn, useSelect } from "../../lib/auro/use-machine.ts";
import { Popover } from "./auro-popover.tsx";
import "./auro-select.css";

export interface SelectProps {
  /** The selectable options. */
  options: SelectOption[];
  /** Controlled selected value. Omit for uncontrolled usage. */
  value?: string;
  /** Initial value when used uncontrolled. */
  defaultValue?: string;
  disabled?: boolean;
  /** Text shown when no option is selected. */
  placeholder?: string;
  id?: string;
  /** Fired with the option's value when the user makes a selection. */
  onValueChange?: (value: string) => void;
}

interface SelectContextValue {
  select: UseSelectReturn;
  placeholder: string;
  id: string | undefined;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext(): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select.* parts must be rendered inside <Select.Root>.");
  }
  return ctx;
}

export interface SelectRootProps extends SelectProps {
  children: ReactNode;
}

/**
 * Provides select state (via the framework-free `@auro/headless` core) to the
 * compound parts and renders the outer container the outside-dismiss anchors to.
 */
function SelectRoot(props: SelectRootProps): ReactNode {
  const { placeholder = "Select…", id, children } = props;
  const select = useSelect({
    options: props.options,
    value: props.value,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    id,
    onValueChange: props.onValueChange,
  });

  return (
    <SelectContext.Provider value={{ select, placeholder, id }}>
      <div
        ref={select.containerRef}
        className="auro-select"
        data-disabled={select.api.isDisabled ? "" : undefined}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/** The combobox trigger button. Pass `<Select.Value />` (and any adornments) as children. */
function SelectTrigger({ children }: { children?: ReactNode }): ReactNode {
  const { select, id } = useSelectContext();
  return (
    <button
      ref={select.triggerRef}
      id={id}
      type="button"
      className="auro-select__trigger"
      {...select.api.triggerProps}
      {...select.triggerHandlers}
    >
      {children}
      <svg className="auro-select__caret" viewBox="0 0 16 16" aria-hidden="true">
        <polyline points="4 6 8 10 12 6" />
      </svg>
    </button>
  );
}

/** Renders the selected option's label, or the placeholder when nothing is selected. */
function SelectValue(): ReactNode {
  const { select, placeholder } = useSelectContext();
  return (
    <span
      className="auro-select__value"
      data-placeholder={select.selectedLabel === undefined ? "" : undefined}
    >
      {select.selectedLabel ?? placeholder}
    </span>
  );
}

/** Positions + portals the popup (via the shared Popover primitive) when open. */
function SelectPositioner({ children }: { children: ReactNode }): ReactNode {
  const { select } = useSelectContext();
  return (
    <Popover anchorRef={select.triggerRef} open={select.isOpen}>
      {children}
    </Popover>
  );
}

/** The `role="listbox"` element. Contains `<Select.Item />`s. */
function SelectList({ children }: { children: ReactNode }): ReactNode {
  const { select } = useSelectContext();
  return (
    <ul ref={select.listboxRef} className="auro-select__listbox" {...select.api.listboxProps}>
      {children}
    </ul>
  );
}

/** A single `role="option"`. Pass the option and its index within the collection. */
function SelectItem({ option, index }: { option: SelectOption; index: number }): ReactNode {
  const { select } = useSelectContext();
  const optionProps = select.getOptionProps(option, index);
  return (
    <li className="auro-select__option" {...optionProps}>
      {option.label}
    </li>
  );
}

/**
 * Auro Select — a typed, accessible single-select listbox (select-only combobox).
 * Logic lives in the framework-free `@auro/headless` core; this file is the React
 * render layer and is yours to edit once copied in.
 *
 * This preset covers the common case in one line: `<Select options={…} />`. For
 * custom option rendering, compose the parts directly:
 * `<Select.Root>…<Select.Trigger><Select.Value/></Select.Trigger>…<Select.Item/>…</Select.Root>`.
 */
function SelectPreset(props: SelectProps): ReactNode {
  return (
    <SelectRoot {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPositioner>
        <SelectList>
          {props.options.map((option, index) => (
            <SelectItem key={option.value} option={option} index={index} />
          ))}
        </SelectList>
      </SelectPositioner>
    </SelectRoot>
  );
}

export const Select = Object.assign(SelectPreset, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Positioner: SelectPositioner,
  List: SelectList,
  Item: SelectItem,
});
