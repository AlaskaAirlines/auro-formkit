import { type ReactNode, createContext, useContext } from "react";
import { type ComboboxOption } from "@auro/headless/combobox";
import { type UseComboboxReturn, useCombobox } from "../../lib/auro/use-machine.ts";
import { Popover } from "./auro-popover.tsx";
import "./auro-combobox.css";

export interface ComboboxProps {
  /** The selectable options. */
  options: ComboboxOption[];
  /** Controlled selected value. Omit for uncontrolled usage. */
  value?: string;
  /** Initial value when used uncontrolled. */
  defaultValue?: string;
  disabled?: boolean;
  /** Placeholder shown in the empty input. */
  placeholder?: string;
  id?: string;
  /** Fired with the option's value when the user commits a selection. */
  onValueChange?: (value: string) => void;
}

interface ComboboxContextValue {
  combobox: UseComboboxReturn;
  placeholder: string;
  id: string | undefined;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext(): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (!ctx) {
    throw new Error("Combobox.* parts must be rendered inside <Combobox.Root>.");
  }
  return ctx;
}

export interface ComboboxRootProps extends ComboboxProps {
  children: ReactNode;
}

/**
 * Provides combobox state (via the framework-free `@auro/headless` core) to the
 * compound parts and renders the outer container the outside-dismiss anchors to.
 */
function ComboboxRoot(props: ComboboxRootProps): ReactNode {
  const { placeholder = "Search…", id, children } = props;
  const combobox = useCombobox({
    options: props.options,
    value: props.value,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    id,
    onValueChange: props.onValueChange,
  });

  return (
    <ComboboxContext.Provider value={{ combobox, placeholder, id }}>
      <div
        ref={combobox.containerRef}
        className="auro-combobox"
        data-disabled={combobox.api.isDisabled ? "" : undefined}
      >
        {children}
      </div>
    </ComboboxContext.Provider>
  );
}

/** The text input (the combobox element). Filters the list as the user types. */
function ComboboxInput(): ReactNode {
  const { combobox, placeholder, id } = useComboboxContext();
  return (
    <input
      ref={combobox.inputRef}
      id={id}
      type="text"
      className="auro-combobox__input"
      placeholder={placeholder}
      value={combobox.inputValue}
      autoComplete="off"
      {...combobox.api.inputProps}
      {...combobox.inputHandlers}
    />
  );
}

/** Optional clear button — resets the value and refocuses the input. Renders nothing when empty. */
function ComboboxClear({ children }: { children?: ReactNode }): ReactNode {
  const { combobox } = useComboboxContext();
  if (combobox.inputValue === "") return null;
  return (
    <button
      type="button"
      className="auro-combobox__clear"
      aria-label="Clear"
      tabIndex={-1}
      onClick={combobox.clear}
    >
      {children ?? "×"}
    </button>
  );
}

/** Positions + portals the popup (via the shared Popover primitive) when open. */
function ComboboxPositioner({ children }: { children: ReactNode }): ReactNode {
  const { combobox } = useComboboxContext();
  return (
    <Popover anchorRef={combobox.inputRef} open={combobox.isOpen}>
      {children}
    </Popover>
  );
}

/** The `role="listbox"` element. Contains `<Combobox.Item />`s or `<Combobox.Empty />`. */
function ComboboxList({ children }: { children: ReactNode }): ReactNode {
  const { combobox } = useComboboxContext();
  return (
    <ul ref={combobox.listboxRef} className="auro-combobox__listbox" {...combobox.api.listboxProps}>
      {children}
    </ul>
  );
}

/** A single `role="option"`. Pass the option and its index within the *filtered* collection. */
function ComboboxItem({ option, index }: { option: ComboboxOption; index: number }): ReactNode {
  const { combobox } = useComboboxContext();
  const optionProps = combobox.getOptionProps(option, index);
  return (
    <li className="auro-combobox__option" {...optionProps}>
      {option.label}
    </li>
  );
}

/** Rendered inside the list when the query matched no options. */
function ComboboxEmpty({ children }: { children?: ReactNode }): ReactNode {
  const { combobox } = useComboboxContext();
  if (!combobox.api.isEmpty) return null;
  return (
    <li className="auro-combobox__empty" role="presentation">
      {children ?? "No results"}
    </li>
  );
}

/**
 * Auro Combobox — a typed, accessible editable combobox with list autocomplete.
 * Logic lives in the framework-free `@auro/headless` core; this file is the React
 * render layer and is yours to edit once copied in. Built on the same shared
 * primitives as Select (`useListbox`, `Popover`, and the `listbox/*` core modules).
 *
 * This preset covers the common case in one line: `<Combobox options={…} />`. For
 * custom rendering, compose the parts directly:
 * `<Combobox.Root>…<Combobox.Input/><Combobox.Positioner><Combobox.List>…</Combobox.List></Combobox.Positioner></Combobox.Root>`.
 */
function ComboboxPreset(props: ComboboxProps): ReactNode {
  return (
    <ComboboxRoot {...props}>
      <div className="auro-combobox__field">
        <ComboboxInput />
        <ComboboxClear />
      </div>
      <ComboboxPositioner>
        <ComboboxList>
          <ComboboxContent />
        </ComboboxList>
      </ComboboxPositioner>
    </ComboboxRoot>
  );
}

/** Preset body: renders the filtered items, or the empty state. Reads context for `filtered`. */
function ComboboxContent(): ReactNode {
  const { combobox } = useComboboxContext();
  return (
    <>
      {combobox.filtered.map((option, index) => (
        <ComboboxItem key={option.value} option={option} index={index} />
      ))}
      <ComboboxEmpty />
    </>
  );
}

export const Combobox = Object.assign(ComboboxPreset, {
  Root: ComboboxRoot,
  Input: ComboboxInput,
  Clear: ComboboxClear,
  Positioner: ComboboxPositioner,
  List: ComboboxList,
  Item: ComboboxItem,
  Empty: ComboboxEmpty,
});
