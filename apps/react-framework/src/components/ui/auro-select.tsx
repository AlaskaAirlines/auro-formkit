import { type ReactNode } from "react";
import { type SelectOption } from "@auro/headless/select";
import { useSelect } from "../../lib/auro/use-machine.ts";
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

/**
 * Auro Select — a typed, accessible single-select listbox (select-only combobox).
 * Logic lives in the framework-free `@auro/headless` core; this file is the
 * React render layer and is yours to edit once copied in.
 */
export function Select(props: SelectProps): ReactNode {
  const { options, placeholder = "Select…", id } = props;
  const select = useSelect({
    options,
    value: props.value,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    id,
    onValueChange: props.onValueChange,
  });

  return (
    <div
      ref={select.containerRef}
      className="auro-select"
      data-disabled={select.api.isDisabled ? "" : undefined}
    >
      <button
        ref={select.triggerRef}
        id={id}
        type="button"
        className="auro-select__trigger"
        {...select.api.triggerProps}
        {...select.triggerHandlers}
      >
        <span
          className="auro-select__value"
          data-placeholder={select.selectedLabel === undefined ? "" : undefined}
        >
          {select.selectedLabel ?? placeholder}
        </span>
        <svg className="auro-select__caret" viewBox="0 0 16 16" aria-hidden="true">
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </button>

      {select.isOpen && (
        <ul ref={select.listboxRef} className="auro-select__listbox" {...select.api.listboxProps}>
          {options.map((option, index) => {
            const optionProps = select.getOptionProps(option, index);
            return (
              <li key={option.value} className="auro-select__option" {...optionProps}>
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
