/* eslint-disable max-lines, jsdoc/require-jsdoc, no-return-await, no-undef, no-unused-expressions, function-paren-newline, lit-a11y/anchor-is-valid */
import { fixture, html, expect, oneEvent, elementUpdated } from "@open-wc/testing";
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import "../src/registered.js";
import { expectPopoverShown, expectPopoverHidden } from './testFunctions.js';

useAccessibleIt();

describe("auro-dropdown", () => {

  describe('Rendering', () => {
    it("should be defined as a custom element", async () => {
      const el = await Boolean(customElements.get("auro-dropdown"));

      await expect(el).to.be.true;
    });

    // ─── §1.1.4 Container-type containment escape (P0) ──────────────────────────
    describe("container-type containment escape", () => {
      it("should open bib in desktop mode when wrapped in a container-type: inline-size ancestor", async () => {
        const wrapper = await fixture(html`
          <div style="container-type: inline-size; width: 400px; height: 300px; overflow: visible;">
            <auro-dropdown>
              <span slot="label"> label text </span>
              <div slot="trigger">Trigger</div>
              <div>Bib content</div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        el.isBibFullscreen = false;
        el.show();
        await elementUpdated(el);

        // The dropdown host's contain style should be cleared to escape containment
        expect(el.style.contain).to.equal('');

        // The bib should be in the top layer via the Popover API
        const bibEl = el.bibElement.value;
        expect(bibEl.matches(':popover-open')).to.be.true;

        const dialog = bibEl.shadowRoot.querySelector('dialog');
        expect(dialog.open).to.be.true;
      });
    });

    describe("popover desktop mode", () => {
      async function openDesktopDropdown() {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        el.isBibFullscreen = false;
        el.show();
        await elementUpdated(el);

        const bibEl = el.bibElement.value;
        const dialog = bibEl.shadowRoot.querySelector('dialog');

        return {
          el,
          bibEl,
          dialog
        };
      }

      it("should set popover attribute on bib host when opening", async () => {
        const { bibEl } = await openDesktopDropdown();

        expect(bibEl.getAttribute('popover')).to.equal('manual');
      });

      it("should open inner dialog via setAttribute when not in fullscreen mode", async () => {
        const { dialog } = await openDesktopDropdown();

        expect(dialog.open).to.be.true;
      });

      it("should match :popover-open pseudo-class on bib host when open", async () => {
        const { bibEl } = await openDesktopDropdown();

        expect(bibEl.matches(':popover-open')).to.be.true;
      });

      it("should remove popover attribute from bib host on close", async () => {
        const { el, bibEl } = await openDesktopDropdown();

        el.hide();
        await elementUpdated(el);

        expect(bibEl.hasAttribute('popover')).to.be.false;
      });

      it("should not match :popover-open pseudo-class on bib host after close", async () => {
        const { el, bibEl } = await openDesktopDropdown();

        el.hide();
        await elementUpdated(el);

        expect(bibEl.matches(':popover-open')).to.be.false;
      });

      it("should close the inner dialog when hide() is called", async () => {
        const { el, dialog } = await openDesktopDropdown();

        el.hide();
        await elementUpdated(el);

        expect(dialog.open).to.be.false;
      });

      it("should not have popover attribute on bib host before first open", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const bibEl = el.bibElement.value;
        expect(bibEl.hasAttribute('popover')).to.be.false;
      });

      it("should not set popover attribute when opening via showModal", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        // Call open(true) directly on the bib to test the modal path
        // (the floater overrides isBibFullscreen based on viewport width)
        const bibEl = el.bibElement.value;
        bibEl.open(true);

        expect(bibEl.hasAttribute('popover')).to.be.false;

        const dialog = bibEl.shadowRoot.querySelector('dialog');
        expect(dialog.open).to.be.true;
      });

      it("should set and remove popover attribute across multiple open/close cycles", async () => {
        const { el, bibEl } = await openDesktopDropdown();

        el.hide();
        await elementUpdated(el);
        expect(bibEl.hasAttribute('popover')).to.be.false;

        el.show();
        await elementUpdated(el);
        expect(bibEl.getAttribute('popover')).to.equal('manual');
        expect(bibEl.matches(':popover-open')).to.be.true;
      });
    });

    describe("when passing fullscreenBreakpoint", () => {
      it("should pass a pixel value to bib when a valid breakpoint is selected", async () => {
        const el = await fixture(html`
          <auro-dropdown fullscreenBreakpoint="sm">
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        expect(el.bibContent.mobileFullscreenBreakpoint).to.equal("576px");
      });

      it('should pass undefined to bib when breakpoint is set to disabled', async () => {
        const el = await fixture(html`
          <auro-dropdown fullscreenBreakpoint="disabled">
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        expect(el.bibContent.mobileFullscreenBreakpoint).to.equal(undefined);
      });
    });

    // ─── §1.2.4 Responsive mode switch while open (P1) ──────────────────────────
    describe("responsive mode switch while open", () => {
      it("should transition from desktop popover to fullscreen dialog mode while open", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        // Start in desktop mode
        el.isBibFullscreen = false;
        el.show();
        await elementUpdated(el);

        const bibEl = el.bibElement.value;
        expectPopoverShown(el);
        expect(bibEl.getAttribute('popover')).to.equal('manual');
        expect(bibEl.matches(':popover-open')).to.be.true;

        // Switch to fullscreen while open (simulates viewport crossing the breakpoint)
        el.isBibFullscreen = true;
        await elementUpdated(el);

        // Should still be visible, now in modal mode
        expectPopoverShown(el);
        expect(bibEl.hasAttribute('popover')).to.be.false;
        const dialog = bibEl.shadowRoot.querySelector('dialog');
        expect(dialog.open).to.be.true;
      });

      it("should transition from fullscreen dialog back to desktop popover mode while open", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        // Start in fullscreen mode
        el.isBibFullscreen = true;
        el.show();
        await elementUpdated(el);

        const bibEl = el.bibElement.value;
        expectPopoverShown(el);

        // Switch back to desktop while open
        el.isBibFullscreen = false;
        await elementUpdated(el);

        expectPopoverShown(el);
        expect(bibEl.getAttribute('popover')).to.equal('manual');
        expect(bibEl.matches(':popover-open')).to.be.true;
      });
    });
  });

  describe('User Stories', () => {
    it("should fire auroDropdown-toggled event when toggled", async () => {
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

    it("should close the bib when auro-bib-cancel event is dispatched", async () => {
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
  });

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('autoPlacement', () => {
      // add tests for this property
    });

    describe('chevron', () => {
      it("should display the chevron icon when chevron attribute is set", async () => {
        const el = await fixture(html`
          <auro-dropdown chevron>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const chevronEl = el.shadowRoot.querySelector("#showStateIcon");
        expect(chevronEl).to.be.visible;
      });

      it("should rotate the chevron icon when the bib is open", async () => {
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

      it("should hide the bib and reset chevron when hide() is called programmatically", async () => {
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
    });

    describe('disabled', () => {
      // add tests for this property
    });

    describe('disableEventShow', () => {
      it("should only open via show() method when disableEventShow attribute is set", async () => {
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
    });

    describe('disableKeyboardHandling', () => {
      // add tests for this property
    });

    describe('error', () => {
      // add tests for this property
    });

    describe('errorMessage', () => {
      // add tests for this property
    });

    describe('focusShow', () => {
      // add tests for this property
    });

    describe('fullscreenBreakpoint', () => {
      // add tests for this property
    });

    describe('hoverToggle', () => {
      // add tests for this property
    });

    describe('isBibFullscreen', () => {
      it("should open the dialog via show() when not in fullscreen mode", async () => {
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

        const bibEl = el.bibElement.value;
        const dialog = bibEl.shadowRoot.querySelector('dialog');
        expect(dialog.open).to.be.true;
      });

      it("should open the dialog via showModal() when in fullscreen mode", async () => {
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

      it("should use showModal to open the bib in fullscreen mode", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        el.isBibFullscreen = true;
        el.isPopoverVisible = true;
        await elementUpdated(el);

        const bibEl = el.bibElement.value;
        const dialog = bibEl.shadowRoot.querySelector('dialog');
        expect(dialog.open).to.be.true;
      });
    });

    describe('isPopoverVisible', () => {
      // add tests for this property
    });

    describe('layout', () => {
      it("should render the trigger element with emphasized layout", async () => {
        const el = await fixture(html`
          <auro-dropdown layout="emphasized" shape="pill">
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const trigger = el.shadowRoot.querySelector("#trigger");
        expect(trigger).to.exist;
      });

      it("should render the trigger element with snowflake layout", async () => {
        const el = await fixture(html`
          <auro-dropdown layout="snowflake">
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const trigger = el.shadowRoot.querySelector("#trigger");
        expect(trigger).to.exist;
      });
    });

    describe('matchWidth', () => {
      // add tests for this property
    });

    describe('noFlip', () => {
      // add tests for this property
    });

    describe('noHideOnThisFocusLoss', () => {
      // add tests for this property
    });

    describe('noToggle', () => {
      // add tests for this property
    });

    describe('offset', () => {
      // add tests for this property
    });

    describe('onDark', () => {
      // add tests for this property
    });

    describe('onSlotChange', () => {
      it("should invoke the onSlotChange callback when slot content changes", async () => {
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

        const newContent = document.createElement('div');
        newContent.textContent = 'New content';
        el.appendChild(newContent);
        await elementUpdated(el);

        expect(callbackCalled).to.be.true;
      });
    });

    describe('placement', () => {
      // add tests for this property
    });

    describe('shape', () => {
      // add tests for this property
    });

    describe('shift', () => {
      // add tests for this property
    });

    describe('simple', () => {
      // add tests for this property
    });

    describe('size', () => {
      // add tests for this property
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-dropdown><span slot="trigger">Click me</span><div>Dropdown bib content</div></auro-dropdown>`);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((n) => n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-dropdown><span slot="trigger">Click me</span><span slot="helpText">Help text content</span></auro-dropdown>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('trigger', () => {
      it('should render content in the trigger slot', async () => {
        const el = await fixture(html`<auro-dropdown><span slot="trigger">Click me</span><div>Content</div></auro-dropdown>`);

        const slotContent = el.querySelector('[slot="trigger"]');

        await expect(slotContent).to.exist;
      });
    });

  });

  describe('Public Functions', () => {
    describe('hide', () => {
      it("should close the dialog when hide() is called", async () => {
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
    });

    describe('show', () => {
      // TODO: test needs to be added
    });

    describe('focus', () => {
      // TODO: test needs to be added
    });

    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('exposeCssParts', () => {
      // TODO: test needs to be added
    });

    describe('clearTriggerA11yAttributes', () => {
      // TODO: test needs to be added
    });

    describe('resetShapeClasses', () => {
      // TODO: test needs to be added
    });

    describe('resetLayoutClasses', () => {
      // TODO: test needs to be added
    });

    describe('updateComponentArchitecture', () => {
      // TODO: test needs to be added
    });
  });


  describe('A11Y', () => {

    // ─── §6.4 Popover attribute adds no implicit ARIA role to bib host (P1) ─────
    it("should not add an implicit ARIA role to bib host when popover attribute is set", async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
          <div>Bib content</div>
        </auro-dropdown>
      `);

      el.isBibFullscreen = false;
      el.show();
      await elementUpdated(el);

      const bibEl = el.bibElement.value;
      expect(bibEl.getAttribute('popover')).to.equal('manual');

      // The bib host element should carry no explicit role introduced by the
      // popover mechanism — ARIA semantics live on the inner <dialog> only.
      expect(bibEl.getAttribute('role')).to.be.null;
    });

    it("should set tabindex 0 on trigger when trigger element is not natively focusable", async () => {
      const el = await fixture(html`
        <auro-dropdown chevron>
          <span slot="label"> label text </span>
          <span slot="trigger">Trigger</span>
        </auro-dropdown>
      `);

      await expect(el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),).to.equal("0");
    });

    it("should set tabindex -1 on trigger when trigger element is natively focusable", async () => {
      const el = await fixture(html`
        <auro-dropdown chevron>
          <span slot="label"> label text </span>
          <a slot="trigger">Trigger</a>
        </auro-dropdown>
      `);

      await expect(el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),).to.equal("-1");
    });

    it("should set tabindex -1 on trigger when trigger contains a focusable child element", async () => {
      const el = await fixture(html`
        <auro-dropdown chevron>
          <span slot="label"> label text </span>
          <span slot="trigger">
            <a>Trigger</a>
          </span>
        </auro-dropdown>
      `);

      await expect(el.shadowRoot.querySelector("#trigger").getAttribute("tabindex"),).to.equal("-1");
    });

    it("should set aria-labelledby on trigger when label slot content is present", async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      const triggerEl = el.shadowRoot.querySelector(".trigger");
      expect(triggerEl).to.have.attribute("aria-labelledby", "triggerLabel");
    });

    it("should render aria-expanded on trigger when a11yRole is set to combobox", async () => {
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

    describe("aria-activedescendant", () => {
      it("should set ariaActiveDescendantElement on the trigger when called with an element", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        // role="combobox" is required before setting ariaActiveDescendantElement;
        // aria-activedescendant is not a valid attribute on role="button".
        el.a11yRole = 'combobox';
        await elementUpdated(el);

        const trigger = el.shadowRoot.querySelector('#trigger');
        const option = document.createElement('div');
        option.id = 'test-option';
        option.setAttribute('role', 'option');
        document.body.appendChild(option);

        el.setActiveDescendant(option);
        expect(trigger.ariaActiveDescendantElement).to.equal(option);

        el.setActiveDescendant(null);
        document.body.removeChild(option);
      });

      it("should clear ariaActiveDescendantElement and remove aria-activedescendant when passed null", async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        el.a11yRole = 'combobox';
        await elementUpdated(el);

        const trigger = el.shadowRoot.querySelector('#trigger');
        const option = document.createElement('div');
        option.id = 'test-option';
        option.setAttribute('role', 'option');
        document.body.appendChild(option);

        el.setActiveDescendant(option);
        el.setActiveDescendant(null);

        expect(trigger.ariaActiveDescendantElement).to.be.null;
        expect(trigger.hasAttribute('aria-activedescendant')).to.be.false;

        document.body.removeChild(option);
      });
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it("should only open on click and not close on second click when noToggle is set", async () => {
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

      it("should toggle open and closed on consecutive trigger clicks", async () => {
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

      it("should not open when disabled and trigger is clicked", async () => {
        const el = await fixture(html`
          <auro-dropdown disabled>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const trigger = el.shadowRoot.querySelector("#trigger");
        expectPopoverHidden(el);

        trigger.click();
        expectPopoverHidden(el);
      });

      it("should fire auroDropdown-triggerClick event when trigger is clicked", async () => {
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
    });
  });

  describe('Keyboard Behavior', () => {

    describe('Enter', () => {
      it('should toggle the popover open when bib is closed', async () => {
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

      it('should show the popover when pressed on trigger', async () => {
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
    });

    describe('Space', () => {
      it('should toggle the popover open when bib is closed', async () => {
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

      it('should show the popover when pressed on trigger', async () => {
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
    });

    describe('Escape', () => {
      it('should hide the popover when pressed', async () => {
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

      it('should return focus to trigger when closed via keydown', async () => {
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

        // Dispatch toggled event with keydown eventType (simulating `Escape` key close)
        el.dispatchEvent(new CustomEvent('auroDropdown-toggled', {
          detail: {
            expanded: false,
            eventType: 'keydown'
          }
        }));

        await elementUpdated(el);
        expectPopoverHidden(el);
      });
    });

    it('should not open when disableKeyboardHandling attribute is set', async () => {
      const el = await fixture(html`
        <auro-dropdown disableKeyboardHandling>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      const trigger = el.shadowRoot.querySelector("#trigger");
      expectPopoverHidden(el);

      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      expectPopoverHidden(el);

      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      expectPopoverHidden(el);
    });
  });
});


