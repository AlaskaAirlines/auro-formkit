import { describe, expect, it } from "vitest";
import {
  type Collection,
  firstEnabledIndex,
  fromOptions,
  indexOfValue,
  lastEnabledIndex,
  nextEnabledIndex,
  prevEnabledIndex,
} from "./nav.ts";

/** Build a Collection from a boolean disabled-mask, e.g. [false, true, false]. */
function mask(disabled: boolean[]): Collection {
  return { length: disabled.length, isDisabled: (i) => disabled[i] };
}

const EMPTY: Collection = { length: 0, isDisabled: () => false };
const ALL_DISABLED = mask([true, true, true]);

describe("firstEnabledIndex / lastEnabledIndex", () => {
  it("returns -1 for an empty collection", () => {
    expect(firstEnabledIndex(EMPTY)).toBe(-1);
    expect(lastEnabledIndex(EMPTY)).toBe(-1);
  });

  it("returns -1 when every index is disabled", () => {
    expect(firstEnabledIndex(ALL_DISABLED)).toBe(-1);
    expect(lastEnabledIndex(ALL_DISABLED)).toBe(-1);
  });

  it("skips leading / trailing disabled indices", () => {
    const c = mask([true, false, false, true]);
    expect(firstEnabledIndex(c)).toBe(1);
    expect(lastEnabledIndex(c)).toBe(2);
  });
});

describe("nextEnabledIndex", () => {
  it("skips interior disabled indices (no wrap)", () => {
    const c = mask([false, true, true, false]);
    expect(nextEnabledIndex(c, 0)).toBe(3);
  });

  it("clamps to `from` when nothing enabled follows", () => {
    const c = mask([false, false]);
    expect(nextEnabledIndex(c, 1)).toBe(1);
  });

  it("falls back to first enabled from a -1 start", () => {
    const c = mask([true, false, false]);
    expect(nextEnabledIndex(c, -1)).toBe(1);
  });
});

describe("prevEnabledIndex", () => {
  it("skips interior disabled indices (no wrap)", () => {
    const c = mask([false, true, true, false]);
    expect(prevEnabledIndex(c, 3)).toBe(0);
  });

  it("clamps to `from` when nothing enabled precedes", () => {
    const c = mask([false, false]);
    expect(prevEnabledIndex(c, 0)).toBe(0);
  });
});

describe("fromOptions", () => {
  it("maps the `disabled` flag into the Collection", () => {
    const c = fromOptions([{ disabled: false }, { disabled: true }, {}]);
    expect(c.length).toBe(3);
    expect(c.isDisabled(0)).toBe(false);
    expect(c.isDisabled(1)).toBe(true);
    expect(c.isDisabled(2)).toBe(false);
  });
});

describe("indexOfValue", () => {
  it("returns -1 for a null value", () => {
    expect(indexOfValue([{ value: "a" }], null, (o, v) => o.value === v)).toBe(-1);
  });

  it("matches with a custom eq across differing item/value types", () => {
    const options = [{ value: "sea" }, { value: "pdx" }, { value: "anc" }];
    expect(indexOfValue(options, "pdx", (o, v) => o.value === v)).toBe(1);
    expect(indexOfValue(options, "nope", (o, v) => o.value === v)).toBe(-1);
  });

  it("uses referential equality by default", () => {
    const items = ["a", "b", "c"];
    expect(indexOfValue(items, "b")).toBe(1);
  });
});
