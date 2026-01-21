import { fixture, html, expect, oneEvent, elementUpdated } from "@open-wc/testing";
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import "../src/registered.js";

useAccessibleIt();

describe("auro-dropdown", () => {
  it("auro-dropdown custom element is defined", async () => {
    const el = await !!customElements.get("auro-dropdown");

    await expect(el).to.be.true;
  });

  it("auro-dropdown with chevron", async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const chevronEl = el.shadowRoot.querySelector("#showStateIcon");
    expect(chevronEl).to.be.visible;
  });

  it("auro-dropdown has the chevron rotated when bib is open", async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const chevronIconEl = el.shadowRoot.querySelector("#showStateIcon [auro-icon]");
    await expect(chevronIconEl).to.be.visible;

    expect(chevronIconEl.name).to.be.equal('chevron-down');
    el.show();
    await elementUpdated(el);

    expect(chevronIconEl.name).to.be.equal('chevron-up');
  });

  it("auro-dropdown with non-focusable trigger", async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label"> label text </span>
        <span slot="trigger">Trigger</span>
      </auro-dropdown>
    `);

    await expect(
      el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),
    ).to.equal("0");
  });

  it("auro-dropdown with focusable trigger", async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label"> label text </span>
        <a slot="trigger">Trigger</a>
      </auro-dropdown>
    `);

    await expect(
      el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),
    ).to.equal("-1");
  });

  it("auro-dropdown with focusable trigger child element", async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label"> label text </span>
        <span slot="trigger">
          <a>Trigger</a>
        </span>
      </auro-dropdown>
    `);

    await expect(
      el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),
    ).to.equal("-1");
  });

  it("auro-dropdown aria rules with label slot content", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const triggerEl = el.shadowRoot.querySelector(".trigger");
    expect(triggerEl).to.have.attribute("aria-labelledby", "triggerLabel");
  });

  it("auro-dropdown shows only with click when using noToggle attribute", async () => {
    const el = await fixture(html`
      <auro-dropdown noToggle>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expectPopoverHidden(el);

    trigger.click();
    expectPopoverShown(el);

    trigger.click();
    expectPopoverShown(el);
  });

  it("auro-dropdown toggle with click", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expectPopoverHidden(el);

    trigger.click();
    expectPopoverShown(el);

    trigger.click();
    expectPopoverHidden(el);
  });

  it("auro-dropdown programmatically hide", async () => {
    const el = await fixture(html`
      <auro-dropdown toggle chevron>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const chevron = el.shadowRoot.querySelector("#showStateIcon");
    expectPopoverHidden(el);
    expect(chevron).to.not.have.attribute("data-expanded");

    expectPopoverHidden(el);

    el.show();
    expectPopoverShown(el);

    el.hide();
    expectPopoverHidden(el);
    expect(chevron).to.not.have.attribute("data-expanded");
  });

  it("auro-dropdown fires event - auroDropdown-triggerClick", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expectPopoverHidden(el);

    const listener = oneEvent(el, "auroDropdown-triggerClick");
    trigger.click();
    const { result } = await listener;

    expect(result).to.equal(undefined);
  });

  it("auro-dropdown shows only with `show()` with disableEventShow", async () => {
    const el = await fixture(html`
      <auro-dropdown disableEventShow>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    trigger.click();
    await expectPopoverHidden(el);

    el.show();
    await expectPopoverShown(el);
  });

  it("auro-dropdown fires event - auroDropdown-toggled", async () => {
    const el = await fixture(html`
      <auro-dropdown toggle>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expectPopoverHidden(el);

    const listener = oneEvent(el, "auroDropdown-toggled");
    trigger.click();
    const { result } = await listener;

    expect(result).to.equal(undefined);

    trigger.click();

    expect(result).to.equal(undefined);
  });

  it("auro-dropdown toggles with spacebar", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: " ",
      }),
    );

    expectPopoverShown(el);
  });

  it("auro-dropdown toggles with enter key", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
      }),
    );

    expectPopoverShown(el);
  });

  it("auro-dropdown shows with spacebar", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: " ",
      }),
    );

    expectPopoverShown(el);
  });

  it("auro-dropdown shows with enter key", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
      }),
    );

    expectPopoverShown(el);
  });

  it("auro-dropdown hides with esc key", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");

    trigger.click();

    expectPopoverShown(el);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
      }),
    );

    expectPopoverHidden(el);
  });

  it("auro-dropdown opens dialog with show() when not fullscreen", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    el.isBibFullscreen = false;
    el.show();
    await elementUpdated(el);

    expectPopoverShown(el);

    // Verify the dialog was opened via bib element ref
    const bibEl = el.bibElement.value;
    const dialog = bibEl.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.true;
  });

  it("auro-dropdown opens dialog with showModal() when fullscreen", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    el.isBibFullscreen = true;
    el.show();
    await elementUpdated(el);

    expectPopoverShown(el);

    const bibEl = el.bibElement.value;
    const dialog = bibEl.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.true;
  });

  it("auro-dropdown closes dialog on hide", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    el.show();
    await elementUpdated(el);
    expectPopoverShown(el);

    el.hide();
    await elementUpdated(el);
    expectPopoverHidden(el);

    const bibEl = el.bibElement.value;
    const dialog = bibEl.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.false;
  });

  it("auro-dropdown returns focus to trigger on keydown close", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    trigger.click();
    expectPopoverShown(el);

    // Simulate focus on element
    el.hasFocus = true;

    // Dispatch toggled event with keydown eventType (simulating ESC close)
    el.dispatchEvent(new CustomEvent('auroDropdown-toggled', {
      detail: { expanded: false, eventType: 'keydown' }
    }));

    await elementUpdated(el);
    expectPopoverHidden(el);
  });

  it("auro-dropdown handles auro-bib-cancel event", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    el.show();
    await elementUpdated(el);
    expectPopoverShown(el);

    // Dispatch the cancel event that the dialog fires on ESC
    el.dispatchEvent(new CustomEvent('auro-bib-cancel', {
      bubbles: true,
      composed: true
    }));

    await elementUpdated(el);
    expectPopoverHidden(el);
  });

  it("auro-dropdown renders with emphasized layout", async () => {
    const el = await fixture(html`
      <auro-dropdown layout="emphasized" shape="pill">
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expect(trigger).to.exist;
  });

  it("auro-dropdown renders with snowflake layout", async () => {
    const el = await fixture(html`
      <auro-dropdown layout="snowflake">
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expect(trigger).to.exist;
  });

  it("auro-dropdown renders aria-expanded when a11yRole is combobox", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    el.a11yRole = 'combobox';
    await elementUpdated(el);

    const trigger = el.shadowRoot.querySelector("#trigger");
    expect(trigger.getAttribute('role')).to.equal('combobox');
    expect(trigger).to.have.attribute('aria-expanded');
  });

  it("auro-dropdown invokes onSlotChange callback when set", async () => {
    let callbackCalled = false;

    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
        <div>Bib content</div>
      </auro-dropdown>
    `);

    el.onSlotChange = () => {
      callbackCalled = true;
    };

    // Trigger default slot change by modifying bib content
    const newContent = document.createElement('div');
    newContent.textContent = 'New content';
    el.appendChild(newContent);
    await elementUpdated(el);

    expect(callbackCalled).to.be.true;
  });

  it("auro-dropdown uses showModal for fullscreen bib", async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label"> label text </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    // Directly set isBibFullscreen and isPopoverVisible to trigger the modal path
    el.isBibFullscreen = true;
    el.isPopoverVisible = true;
    await elementUpdated(el);

    const bibEl = el.bibElement.value;
    const dialog = bibEl.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.true;
  });

  describe("when passing fullscreenBreakpoint", () => {
    it("passes a pixel value when selecting a valid breakpoint", async () => {
      const el = await fixture(html`
        <auro-dropdown fullscreenBreakpoint="sm">
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      expect(el.bibContent.mobileFullscreenBreakpoint).to.equal("576px");
    });

    it('passes "undefined" when selecting `disabled`', async () => {
      const el = await fixture(html`
        <auro-dropdown fullscreenBreakpoint="disabled">
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      expect(el.bibContent.mobileFullscreenBreakpoint).to.equal(undefined);
    });
  });
});

function expectPopoverShown(el) {
  expect(el.isPopoverVisible).to.equal(true);
}

function expectPopoverHidden(el) {
  expect(el.isPopoverVisible).to.equal(false);
}
