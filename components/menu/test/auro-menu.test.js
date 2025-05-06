import {
  fixture,
  html,
  expect,
  oneEvent,
  elementUpdated,
} from "@open-wc/testing";
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";

import "../src/registered.js";
import { arrayConverter } from "../src/auro-menu-utils.js";

useAccessibleIt();

describe("auro-menu", () => {
  it("auro-menu custom element is defined", async () => {
    const el = await !!customElements.get("auro-menu");

    await expect(el).to.be.true;
  });

  it("Enter keyboardEvent marks option as selected", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);
    const index = 0;

    // Navigate to first option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Select with Enter
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Verify selection
    expect(options[index].hasAttribute("selected")).to.be.true;
    expect(options[index].getAttribute("aria-selected")).to.equal("true");
    expect(menuEl.optionSelected).to.be.an("array").with.lengthOf(1);
    expect(menuEl.optionSelected[0]).to.equal(options[index]);
  });

  it("Enter ArrowDown marks option as selected", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Navigate down
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Another down to get to second option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Select with Enter
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    expect(menuEl.optionSelected).to.be.an("array").with.lengthOf(1);
    expect(menuEl.optionSelected[0]).to.equal(options[1]);
  });

  it("ArrowDown loops to 1st option in slot", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Press down repeatedly to reach last option
    for (let i = 0; i < options.length + 1; i++) {
      menuEl.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          composed: true,
          key: "ArrowDown",
        }),
      );
      await elementUpdated(menuEl);
    }

    expect(menuEl.optionActive).to.equal(options[1]);
  });

  it("Enter ArrowUp marks option as active", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Initialize state by moving down first
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Move up
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowUp",
      }),
    );
    await elementUpdated(menuEl);

    const selectedOption = options.find((opt) =>
      opt.classList.contains("active"),
    );
    expect(selectedOption).to.not.be.undefined;
  });

  it("Arrow key navigation of menu skips hidden and disabled menuoptions", async () => {
    const el = await noninteractiveOptionsFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Navigate down - should skip disabled and hidden options
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Should have skipped to option 3 (index 2) since first two are non-interactive
    expect(menuEl.optionActive).to.equal(options[2]);
  });

  it("ArrowUp moves to last option in slot", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);
    const lastIndex = options.length - 1;

    // First move down to establish initial state
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Then move up to trigger wrapping behavior
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowUp",
      }),
    );
    await elementUpdated(menuEl);

    expect(menuEl.index).to.equal(lastIndex);
  });

  it("Sends custom events", async () => {
    const el = await customEventFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    const listener1 = oneEvent(el, "auroMenu-customEventFired");
    const listener2 = oneEvent(el, options[0].getAttribute("event"));

    // Navigate down
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Select with Enter
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    const { detail: result1 } = await listener1;
    const { detail: result2 } = await listener2;

    expect(result1).to.equal(null);
    expect(result2).to.equal(null);
  });

  it("test matchWord feature functionality", async () => {
    const el = await customEventFixture();
    const menuEl = el.querySelector("auro-menu");
    expect(menuEl.innerHTML.includes("<strong")).to.be.true;
  });

  it("test disabled handler", async () => {
    const el = await customEventFixture();
    const menuEl = el.querySelector("auro-menu");
    menuEl.setAttribute("disabled", "");

    expect(menuEl.disabled).to.be.true;
  });

  it("test empty items handler", async () => {
    const el = await emptyItemsFixture();
    const menuEl = el.querySelector("auro-menu");
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );

    const menuChild = menuEl.querySelector("[test-id=test-child]");
    menuChild.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );

    expect(menuEl.items.length).to.equal(0);
    expect(menuChild.items.length).to.equal(0);
  });

  it("test mouseover and mousedown on menu option", async () => {
    const el = await defaultFixture();
    const menuEl = el.querySelector("auro-menu");
    const optionEl = menuEl.querySelector("auro-menuoption");

    optionEl.dispatchEvent(
      new KeyboardEvent("mouseover", {
        bubbles: true,
        composed: true,
      }),
    );

    optionEl.dispatchEvent(
      new KeyboardEvent("mousedown", {
        bubbles: true,
        composed: true,
      }),
    );
  });

  it("handle noCheckmark property function handler", async () => {
    const el = await nestedMenuFixture();
    const menuEl = el.querySelector("auro-menu");

    const childMenu = document.createElement("auro-menu");
    menuEl.appendChild(childMenu);
    menuEl.setAttribute("noCheckmark", "");

    expect(menuEl.hasAttribute("noCheckmark")).to.be.true;
  });
});

describe("multiSelect", () => {
  it("should allow multiple options to be selected", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Select first option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Select second option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Verify both options are selected
    expect(menuEl.value).to.deep.equal(["option1", "option2"]);
    expect(Array.isArray(menuEl.value)).to.be.true;
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[1].hasAttribute("selected")).to.be.true;
    expect(options[2].hasAttribute("selected")).to.be.false;

    // Verify optionSelected is an array with two elements
    expect(menuEl.optionSelected).to.be.an("array").with.lengthOf(2);
    expect(menuEl.optionSelected[0]).to.equal(options[0]);
    expect(menuEl.optionSelected[1]).to.equal(options[1]);
  });

  it("should correctly handle deselection in multi-select mode", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Make selections
    menuEl.index = 0;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    menuEl.index = 1;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    menuEl.index = 2;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify initial selections
    expect(menuEl.value).to.deep.equal(["option1", "option2", "option3"]);
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[1].hasAttribute("selected")).to.be.true;
    expect(options[2].hasAttribute("selected")).to.be.true;

    // Deselect middle option
    menuEl.index = 1;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify state after deselection
    expect(menuEl.value).to.deep.equal(["option1", "option3"]);
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[1].hasAttribute("selected")).to.be.false;
    expect(options[2].hasAttribute("selected")).to.be.true;

    // Verify aria-selected states
    expect(options[0].getAttribute("aria-selected")).to.equal("true");
    expect(options[1].getAttribute("aria-selected")).to.equal("false");
    expect(options[2].getAttribute("aria-selected")).to.equal("true");

    // Deselect all remaining options
    menuEl.index = 0;
    menuEl.makeSelection();
    menuEl.index = 2;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify value is undefined when no options are selected
    expect(menuEl.value).to.equal(undefined);
    options.forEach((option) => {
      expect(option.hasAttribute("selected")).to.be.false;
      expect(option.getAttribute("aria-selected")).to.equal("false");
    });
  });

  it("should not allow selection of disabled options in multiSelect mode", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Select disabled option
    menuEl.index = 3;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify disabled option remains unselected
    expect(options[3].hasAttribute("selected")).to.be.false;
    expect(options[3].getAttribute("aria-selected")).to.equal("false");

    // Select valid options
    menuEl.index = 0;
    menuEl.makeSelection();
    menuEl.index = 1;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Select disabled option again
    menuEl.index = 3;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify previous selections remain intact
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[1].hasAttribute("selected")).to.be.true;
    expect(options[3].hasAttribute("selected")).to.be.false;

    // Verify excluded options are still excluded
    expect(menuEl.value).to.include("option1");
    expect(menuEl.value).to.include("option2");
    expect(menuEl.value).to.not.include("option4");
  });

  it("should maintain disabled state when toggling other options in multiSelect mode", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Select and deselect other options multiple times
    menuEl.index = 0;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    menuEl.index = 1;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    menuEl.index = 0;
    // Deselect first option
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify disabled option remained unselected
    expect(options[3].hasAttribute("selected")).to.be.false;
    expect(options[3].getAttribute("aria-selected")).to.equal("false");
    expect(options[3].hasAttribute("disabled")).to.be.true;

    // Verify other options can still be toggled
    expect(options[0].hasAttribute("selected")).to.be.false;
    expect(options[1].hasAttribute("selected")).to.be.true;
  });

  describe("multiSelect programmatic updates", () => {
    it("should update selections when making multiple programmatic selections", async () => {
      const el = await multiSelectFixture();
      const menuEl = el.querySelector("auro-menu");
      const options = getOptions(menuEl);

      // Make programmatic selections
      menuEl.index = 0;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      menuEl.index = 2;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      // Verify selections
      expect(options[0].hasAttribute("selected")).to.be.true;
      expect(options[1].hasAttribute("selected")).to.be.false;
      expect(options[2].hasAttribute("selected")).to.be.true;
      expect(options[3].hasAttribute("selected")).to.be.false;

      // Verify aria-selected states are updated
      expect(options[0].getAttribute("aria-selected")).to.equal("true");
      expect(options[1].getAttribute("aria-selected")).to.equal("false");
      expect(options[2].getAttribute("aria-selected")).to.equal("true");
      expect(options[3].getAttribute("aria-selected")).to.equal("false");
    });

    it("should handle deselection of all options", async () => {
      const el = await multiSelectFixture();
      const menuEl = el.querySelector("auro-menu");
      const options = getOptions(menuEl);

      // Make selections
      menuEl.index = 0;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      menuEl.index = 1;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      // Deselect
      menuEl.index = 0;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      menuEl.index = 1;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      options.forEach((option) => {
        expect(option.hasAttribute("selected")).to.be.false;
        expect(option.getAttribute("aria-selected")).to.equal("false");
      });

      // Verify value is undefined or empty after all deselections
      expect(
        menuEl.value === undefined ||
          (Array.isArray(menuEl.value) && menuEl.value.length === 0),
      ).to.be.true;
    });

    it("should respect disabled state when making selections", async () => {
      const el = await multiSelectFixture();
      const menuEl = el.querySelector("auro-menu");
      const options = getOptions(menuEl);

      // Select disabled option
      menuEl.index = 3;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      // Verify disabled option remains unselected
      expect(options[3].hasAttribute("selected")).to.be.false;
      expect(options[3].getAttribute("aria-selected")).to.equal("false");

      // Verify selectable options remain selectable
      menuEl.index = 0;
      menuEl.makeSelection();
      await elementUpdated(menuEl);

      expect(options[0].hasAttribute("selected")).to.be.true;
      expect(options[0].getAttribute("aria-selected")).to.equal("true");

      // Verify final selection state excludes disabled option
      const selectedOptions = Array.from(options).filter((opt) =>
        opt.hasAttribute("selected"),
      );
      expect(selectedOptions).to.have.lengthOf(1);
      expect(selectedOptions[0]).to.equal(options[0]);
    });
  });

  it("should allow deselection of individual options", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Select first option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Select second option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Deselect first option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowUp",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Verify only second option remains selected
    expect(menuEl.value).to.deep.equal(["option2"]);
    expect(options[0].hasAttribute("selected")).to.be.false;
    expect(options[1].hasAttribute("selected")).to.be.true;
  });

  it("should maintain correct aria-selected states", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Select first option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Select third option
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Verify aria-selected states
    expect(menuEl.value).to.deep.equal(["option1", "option3"]);
    expect(options[0].getAttribute("aria-selected")).to.equal("true");
    expect(options[1].getAttribute("aria-selected")).to.equal("false");
    expect(options[2].getAttribute("aria-selected")).to.equal("true");
  });

  it("should handle preset values when multiSelect is enabled", async () => {
    // Start with regular fixture
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Set initial selections
    menuEl.index = 0;
    menuEl.makeSelection();
    menuEl.index = 2;
    menuEl.makeSelection();

    await elementUpdated(menuEl);

    // Verify initial selections
    expect(Array.isArray(menuEl.value)).to.be.true;
    expect(menuEl.value).to.include("option1");
    expect(menuEl.value).to.include("option3");
    expect(menuEl.value).to.not.include("option2");

    // Verify options have correct selected state
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[1].hasAttribute("selected")).to.be.false;
    expect(options[2].hasAttribute("selected")).to.be.true;
    expect(options[3].hasAttribute("selected")).to.be.false;

    // Verify aria-selected states
    expect(options[0].getAttribute("aria-selected")).to.equal("true");
    expect(options[1].getAttribute("aria-selected")).to.equal("false");
    expect(options[2].getAttribute("aria-selected")).to.equal("true");
    expect(options[3].getAttribute("aria-selected")).to.equal("false");
  });
});

describe("value states", () => {
  it("should initialize with undefined value", async () => {
    const el = await defaultFixture();
    const menu = el.querySelector("auro-menu");

    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);
  });

  // Verify selection persists in single-select
  it("should maintain selection in single-select mode when clicking selected option", async () => {
    const el = await defaultFixture();
    const menu = el.querySelector("auro-menu");

    // Select first option
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menu);

    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // Verify selection results in array
    expect(menu.value).to.deep.equal(["option 1"]);

    // Try to deselect by clicking again
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // Selection should persist
    expect(menu.value).to.deep.equal(["option 1"]);
  });

  // Verify reset() returns to undefined
  it("should return to undefined only after reset()", async () => {
    const el = await defaultFixture();
    const menu = el.querySelector("auro-menu");

    // Initial state
    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);

    // Select an option
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menu);

    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // Verify selection
    expect(menu.value).to.deep.equal(["option 1"]);
    expect(menu.optionSelected).to.be.an("array").with.lengthOf(1);

    // Reset
    menu.reset();
    await elementUpdated(menu);

    // After reset, should be undefined
    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);
  });

  it("should maintain selection in single-select mode until reset()", async () => {
    const el = await defaultFixture();
    const menu = el.querySelector("auro-menu");

    // Initial state
    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);

    // Select and verify
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menu);

    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // Verify array after selection
    expect(menu.value).to.deep.equal(["option 1"]);
    expect(menu.optionSelected).to.be.an("array").with.lengthOf(1);

    // Try to deselect - should have no effect
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // Selection should persist
    expect(menu.value).to.deep.equal(["option 1"]);
    expect(menu.optionSelected).to.be.an("array").with.lengthOf(1);

    // Reset
    menu.reset();
    await elementUpdated(menu);

    // After reset, should be undefined
    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);
  });

  it("should handle undefined vs array state correctly in multiselect mode", async () => {
    const el = await multiSelectFixture();
    const menu = el.querySelector("auro-menu");

    // Initial state
    expect(menu.value).to.equal(undefined);

    // Select in multiselect
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menu);

    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // After selection, should be array
    expect(Array.isArray(menu.value)).to.be.true;
    expect(menu.value).to.deep.equal(["option1"]);

    // Deselect
    menu.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menu);

    // After deselection, should be undefined
    expect(menu.value).to.equal(undefined);
  });
});

describe("multiSelect initial state", () => {
  it("should handle no initial selection correctly", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");
    const options = getOptions(menuEl);

    // Verify initial state
    expect(menuEl.value).to.equal(undefined);
    expect(menuEl.optionSelected).to.equal(undefined);

    // Verify no options are selected
    options.forEach((option) => {
      expect(option.hasAttribute("selected")).to.be.false;
      expect(option.getAttribute("aria-selected")).to.equal("false");
      expect(option.classList.contains("active")).to.be.false;
    });

    // Make first selection
    menuEl.index = 0;
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    // Verify array is initialized correctly
    expect(Array.isArray(menuEl.value)).to.be.true;
    expect(menuEl.value).to.deep.equal(["option1"]);
    expect(options[0].hasAttribute("selected")).to.be.true;
    expect(options[0].getAttribute("aria-selected")).to.equal("true");

    // Verify other options remain unselected
    options.slice(1).forEach((option) => {
      expect(option.hasAttribute("selected")).to.be.false;
      expect(option.getAttribute("aria-selected")).to.equal("false");
    });
  });

  it("should maintain undefined value until first selection", async () => {
    const el = await multiSelectFixture();
    const menuEl = el.querySelector("auro-menu");

    // Navigate without selecting
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "ArrowDown",
      }),
    );
    await elementUpdated(menuEl);

    // Verify value remains undefined
    expect(menuEl.value).to.equal(undefined);
    expect(menuEl.optionSelected).to.equal(undefined);

    // Make first selection
    menuEl.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: "Enter",
      }),
    );
    await elementUpdated(menuEl);

    // Verify value is now an array
    expect(Array.isArray(menuEl.value)).to.be.true;
    expect(menuEl.value.length).to.equal(1);
  });
});

describe("arrayConverter", () => {
  let originalConsoleError;

  beforeEach(() => {
    // Store original console.error
    originalConsoleError = console.error;
    // Replace with no-op to suppress logs during tests
    console.error = () => {};
  });

  afterEach(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

  describe("valid inputs", () => {
    it("should handle actual arrays", () => {
      const input = [1, 2, 3];
      const result = arrayConverter(input);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it("should handle undefined", () => {
      const result = arrayConverter(undefined);
      expect(result).to.be.undefined;
    });

    it("should parse valid JSON array strings", () => {
      const input = "[1,2,3]";
      const result = arrayConverter(input);
      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe("invalid inputs", () => {
    it("should throw error for comma-separated string", () => {
      const input = "item1,item2";
      expect(() => arrayConverter(input)).to.throw(Error);
    });

    it("should throw error for single string", () => {
      const input = "item1";
      expect(() => arrayConverter(input)).to.throw(Error);
    });

    it("should throw error for JSON object string", () => {
      const input = '{"key":"value"}';
      expect(() => arrayConverter(input)).to.throw(Error);
    });

    it("should throw error for number", () => {
      const input = 123;
      expect(() => arrayConverter(input)).to.throw(Error);
    });
  });
});

function getOptions(menu) {
  let options = menu.shadowRoot.querySelector("slot").assignedNodes();

  for (let index = 0; index < options.length; index += 1) {
    if (JSON.stringify(options[index]) === "{}") {
      options.splice(index, 1);
    }
  }

  return options;
}

// Template fixtures used in tests
async function defaultFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menuoption value="option 1">option 1</auro-menuoption>
        <auro-menuoption value="option 2">option 2</auro-menuoption>
        <auro-menuoption disabled value="option 3">option 3</auro-menuoption>
        <auro-menuoption value="lorem ipsum lorem ipsum"
          >lorem ipsum lorem ipsum</auro-menuoption
        >
        <auro-menuoption value="departures">Departures</auro-menuoption>
        <auro-menuoption value="arrivals">Arrivals</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

async function noninteractiveOptionsFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menuoption disabled value="option 1">option 1</auro-menuoption>
        <auro-menuoption hidden value="option 2">option 2</auro-menuoption>
        <auro-menuoption value="option 3">option 3</auro-menuoption>
        <auro-menuoption value="lorem ipsum lorem ipsum"
          >lorem ipsum lorem ipsum</auro-menuoption
        >
        <auro-menuoption value="departures">Departures</auro-menuoption>
        <auro-menuoption value="arrivals">Arrivals</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

async function nestedMenuFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menuoption value="option 1">option 1</auro-menuoption>
        <auro-menu>
          <auro-menuoption value="option a">option a</auro-menuoption>
          <auro-menuoption value="option b">option b</auro-menuoption>
        </auro-menu>
        <auro-menuoption value="option 2">option 2</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

async function customEventFixture() {
  return await fixture(html`
    <div>
      <auro-menu matchword="o">
        <auro-menuoption value="option 1" event="uniqueEventName"
          >option 1</auro-menuoption
        >
      </auro-menu>
    </div>
  `);
}

async function emptyItemsFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menu aria-label="test-child" test-id="test-child"> </auro-menu>
      </auro-menu>
    </div>
  `);
}

async function multiSelectFixture() {
  return await fixture(html`
    <div>
      <auro-menu multiSelect aria-label="test">
        <auro-menuoption value="option1">Option 1</auro-menuoption>
        <auro-menuoption value="option2">Option 2</auro-menuoption>
        <auro-menuoption value="option3">Option 3</auro-menuoption>
        <auro-menuoption disabled value="option4">Option 4</auro-menuoption>
      </auro-menu>
    </div>
  `);
}
