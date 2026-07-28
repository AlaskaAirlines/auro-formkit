import { describe, expect, it } from "vitest";
import {
  type ComboboxOption,
  type ComboboxState,
  close,
  connect,
  filterOptions,
  handleKey,
  open,
  selectIndex,
  setInputValue,
} from "./machine.ts";

const OPTIONS: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "apricot", label: "Apricot", disabled: true },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function state(overrides: Partial<ComboboxState> = {}): ComboboxState {
  return { open: false, value: null, inputValue: "", activeIndex: -1, disabled: false, ...overrides };
}

describe("filterOptions", () => {
  it("returns every option for an empty query", () => {
    expect(filterOptions(OPTIONS, "")).toHaveLength(4);
    expect(filterOptions(OPTIONS, "   ")).toHaveLength(4);
  });

  it("matches case-insensitively on label substring", () => {
    expect(filterOptions(OPTIONS, "ap").map((o) => o.value)).toEqual(["apple", "apricot"]);
    expect(filterOptions(OPTIONS, "RR").map((o) => o.value)).toEqual(["cherry"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterOptions(OPTIONS, "zzz")).toEqual([]);
  });
});

describe("open", () => {
  it("seeds the highlight to the first enabled filtered option", () => {
    const next = open(state(), OPTIONS);
    expect(next.open).toBe(true);
    expect(next.activeIndex).toBe(0);
  });

  it("skips a disabled first option in the filtered view", () => {
    const filtered = filterOptions(OPTIONS, "ap"); // [apple, apricot(disabled)]
    const next = open(state({ inputValue: "ap" }), filtered);
    expect(next.activeIndex).toBe(0); // apple, the first enabled
  });

  it("is a no-op when disabled", () => {
    const s = state({ disabled: true });
    expect(open(s, OPTIONS)).toBe(s);
  });
});

describe("setInputValue", () => {
  it("opens, records the text, and reseeds to the first match", () => {
    const filtered = filterOptions(OPTIONS, "ban");
    const next = setInputValue(state(), filtered, "ban");
    expect(next.open).toBe(true);
    expect(next.inputValue).toBe("ban");
    expect(next.activeIndex).toBe(0);
  });

  it("seeds -1 when the query matches nothing", () => {
    const filtered = filterOptions(OPTIONS, "zzz");
    const next = setInputValue(state(), filtered, "zzz");
    expect(next.activeIndex).toBe(-1);
  });
});

describe("handleKey navigation over the filtered list", () => {
  it("ArrowDown moves to the next enabled option, skipping disabled", () => {
    // full list, open, active on apple(0) -> should skip apricot(1,disabled) to banana(2)
    const s = state({ open: true, activeIndex: 0 });
    expect(handleKey(s, OPTIONS, "ArrowDown").activeIndex).toBe(2);
  });

  it("indices are relative to the filtered view", () => {
    const filtered = filterOptions(OPTIONS, "an"); // [banana, ... ] -> "an": banana only? Apricot has no 'an'
    // "an" matches Banana only
    expect(filtered.map((o) => o.value)).toEqual(["banana"]);
    const s = state({ open: true, inputValue: "an", activeIndex: 0 });
    // ArrowDown with a single filtered option keeps it highlighted (no wrap)
    expect(handleKey(s, filtered, "ArrowDown").activeIndex).toBe(0);
  });

  it("Enter commits the highlighted filtered option and closes", () => {
    const filtered = filterOptions(OPTIONS, "ch"); // [cherry]
    const s = state({ open: true, inputValue: "ch", activeIndex: 0 });
    const next = handleKey(s, filtered, "Enter");
    expect(next.value).toBe("cherry");
    expect(next.inputValue).toBe("Cherry");
    expect(next.open).toBe(false);
  });

  it("Escape closes but keeps the value and text", () => {
    const s = state({ open: true, value: "banana", inputValue: "Banana", activeIndex: 2 });
    const next = handleKey(s, OPTIONS, "Escape");
    expect(next.open).toBe(false);
    expect(next.value).toBe("banana");
  });
});

describe("selectIndex", () => {
  it("is a no-op on a disabled option", () => {
    const s = state({ open: true });
    expect(selectIndex(s, OPTIONS, 1)).toBe(s); // apricot is disabled
  });

  it("syncs inputValue to the committed option label", () => {
    const next = selectIndex(state({ open: true }), OPTIONS, 3);
    expect(next.value).toBe("cherry");
    expect(next.inputValue).toBe("Cherry");
    expect(next.open).toBe(false);
  });
});

describe("connect", () => {
  it("exposes isEmpty when the filtered view is empty", () => {
    const api = connect(state({ open: true, inputValue: "zzz" }), [], "cb");
    expect(api.isEmpty).toBe(true);
    expect(api.inputProps["aria-expanded"]).toBe(true);
  });

  it("builds aria-activedescendant against the filtered index", () => {
    const filtered = filterOptions(OPTIONS, "ap");
    const api = connect(state({ open: true, inputValue: "ap", activeIndex: 0 }), filtered, "cb");
    expect(api.inputProps["aria-activedescendant"]).toBe("cb-option-0");
    expect(api.getOptionProps(0)["data-active"]).toBe("");
  });

  it("marks the committed option selected when present in the filtered view", () => {
    const api = connect(state({ open: true, value: "banana" }), OPTIONS, "cb");
    expect(api.selectedOption?.value).toBe("banana");
    expect(api.getOptionProps(2)["data-state"]).toBe("selected");
  });

  it("drops aria-activedescendant when closed", () => {
    const api = connect(state({ open: false, activeIndex: 0 }), OPTIONS, "cb");
    expect(api.inputProps["aria-activedescendant"]).toBeUndefined();
    expect(close(state({ open: true })).open).toBe(false);
  });
});
