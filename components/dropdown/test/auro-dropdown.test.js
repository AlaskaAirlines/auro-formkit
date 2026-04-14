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
      it('should default to default appearance', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.appearance).to.equal('default');
      });

      it('should apply appearance="inverse" attribute', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222">
            <auro-dropdown appearance="inverse">
              <div slot="trigger">Trigger</div>
            </auro-dropdown>
          </div>
        `);
        const dropdown = el.querySelector('auro-dropdown');
        await expect(dropdown.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('autoPlacement', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.autoPlacement).to.be.false;
      });

      it('should reflect the autoPlacement attribute', async () => {
        const el = await fixture(html`<auro-dropdown autoplacement><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.autoPlacement).to.be.true;
        await expect(el.hasAttribute('autoplacement')).to.be.true;
      });
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
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.disabled).to.not.be.true;
      });

      it('should reflect the disabled attribute', async () => {
        const el = await fixture(html`<auro-dropdown disabled><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.disabled).to.be.true;
        await expect(el.hasAttribute('disabled')).to.be.true;
      });

      it('should not open when disabled', async () => {
        const el = await fixture(html`<auro-dropdown disabled><div slot="trigger">Trigger</div></auro-dropdown>`);
        el.show();
        await elementUpdated(el);
        expectPopoverHidden(el);
      });
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
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.disableKeyboardHandling).to.not.be.true;
      });

      it('should reflect the disableKeyboardHandling attribute', async () => {
        const el = await fixture(html`<auro-dropdown disablekeyboardhandling><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.disableKeyboardHandling).to.be.true;
        await expect(el.hasAttribute('disablekeyboardhandling')).to.be.true;
      });
    });

    describe('error', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.error).to.not.be.true;
      });

      it('should reflect the error attribute', async () => {
        const el = await fixture(html`<auro-dropdown error><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.error).to.be.true;
        await expect(el.hasAttribute('error')).to.be.true;
      });
    });

    describe('errorMessage', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.errorMessage).to.be.undefined;
      });
    });

    describe('focusShow', () => {
      it('should default to falsy', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.focusShow).to.not.be.true;
      });

      it('should reflect the focusShow attribute', async () => {
        const el = await fixture(html`<auro-dropdown focusshow><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.focusShow).to.be.true;
        await expect(el.hasAttribute('focusshow')).to.be.true;
      });
    });

    describe('fullscreenBreakpoint', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.fullscreenBreakpoint).to.be.undefined;
      });

      it('should reflect a custom fullscreenBreakpoint', async () => {
        const el = await fixture(html`<auro-dropdown fullscreenBreakpoint="disabled"><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.fullscreenBreakpoint).to.equal('disabled');
      });
    });

    describe('hoverToggle', () => {
      it('should default to falsy', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.hoverToggle).to.not.be.true;
      });

      it('should be true when set programmatically', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        el.hoverToggle = true;
        await elementUpdated(el);
        await expect(el.hoverToggle).to.be.true;
      });
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
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.isPopoverVisible).to.be.false;
      });

      it('should be true after show() is called', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        el.show();
        await elementUpdated(el);
        await expect(el.isPopoverVisible).to.be.true;
      });
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
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.matchWidth).to.be.false;
      });

      it('should reflect the matchWidth attribute', async () => {
        const el = await fixture(html`<auro-dropdown matchwidth><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.matchWidth).to.be.true;
        await expect(el.hasAttribute('matchwidth')).to.be.true;
      });
    });

    describe('noFlip', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noFlip).to.be.false;
      });

      it('should reflect the noFlip attribute', async () => {
        const el = await fixture(html`<auro-dropdown noflip><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noFlip).to.be.true;
        await expect(el.hasAttribute('noflip')).to.be.true;
      });
    });

    describe('noHideOnThisFocusLoss', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noHideOnThisFocusLoss).to.be.false;
      });

      it('should reflect the noHideOnThisFocusLoss attribute', async () => {
        const el = await fixture(html`<auro-dropdown nohideonthisfocusloss><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noHideOnThisFocusLoss).to.be.true;
        await expect(el.hasAttribute('nohideonthisfocusloss')).to.be.true;
      });
    });

    describe('noToggle', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noToggle).to.be.false;
      });

      it('should reflect the noToggle attribute', async () => {
        const el = await fixture(html`<auro-dropdown notoggle><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.noToggle).to.be.true;
        await expect(el.hasAttribute('notoggle')).to.be.true;
      });
    });

    describe('offset', () => {
      it('should default to 0', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.offset).to.equal(0);
      });

      it('should reflect the offset attribute', async () => {
        const el = await fixture(html`<auro-dropdown offset="10"><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.offset).to.equal(10);
      });
    });

    describe('onDark', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.onDark).to.not.be.true;
      });

      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222">
            <auro-dropdown ondark>
              <div slot="trigger">Trigger</div>
            </auro-dropdown>
          </div>
        `);
        const dropdown = el.querySelector('auro-dropdown');
        await expect(dropdown.onDark).to.be.true;
        await expect(dropdown.hasAttribute('ondark')).to.be.true;
      });
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
      it('should default to bottom-start', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.placement).to.equal('bottom-start');
      });

      it('should reflect custom placement', async () => {
        const el = await fixture(html`<auro-dropdown placement="top"><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.placement).to.equal('top');
        await expect(el.getAttribute('placement')).to.equal('top');
      });
    });

    describe('shape', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.shape).to.be.undefined;
      });

      it('should reflect a custom shape attribute', async () => {
        const el = await fixture(html`<auro-dropdown shape="pill"><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.getAttribute('shape')).to.equal('pill');
      });
    });

    describe('shift', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.shift).to.be.false;
      });

      it('should reflect the shift attribute', async () => {
        const el = await fixture(html`<auro-dropdown shift><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.shift).to.be.true;
        await expect(el.hasAttribute('shift')).to.be.true;
      });
    });

    describe('simple', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.simple).to.not.be.true;
      });

      it('should reflect the simple attribute', async () => {
        const el = await fixture(html`<auro-dropdown simple><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.simple).to.be.true;
        await expect(el.hasAttribute('simple')).to.be.true;
      });
    });

    describe('size', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.size).to.be.undefined;
      });
    });

    describe('a11yRole', () => {
      it('should default to button', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.a11yRole).to.equal('button');
      });

      it('should apply the role to the trigger element', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        el.a11yRole = 'combobox';
        await elementUpdated(el);
        const trigger = el.shadowRoot.querySelector('#trigger');
        await expect(trigger.getAttribute('role')).to.equal('combobox');
      });
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
      it('should open the bib when show() method is called', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        expectPopoverHidden(el);

        el.show();
        await elementUpdated(el);
        expectPopoverShown(el);
      });
    });

    describe('focus', () => {
      it('should focus the trigger element when bib is closed', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        el.focus();
        await elementUpdated(el);

        const trigger = el.shadowRoot.querySelector('#trigger');
        await expect(el.shadowRoot.activeElement).to.equal(trigger);
      });
    });

    describe('register', () => {
      it('should register the element as a custom element', async () => {
        const el = await Boolean(customElements.get('auro-dropdown'));
        await expect(el).to.be.true;
      });
    });

    describe('exposeCssParts', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        expect(() => el.exposeCssParts()).to.not.throw();
      });
    });

    describe('clearTriggerA11yAttributes', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        expect(() => el.clearTriggerA11yAttributes()).to.not.throw();
      });
    });

    describe('resetShapeClasses', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`
          <auro-dropdown shape="pill">
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.shape = 'pill-left';
        el.resetShapeClasses();
        await elementUpdated(el);

        await expect(el.shape).to.equal('pill-left');
      });
    });

    describe('resetLayoutClasses', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.resetLayoutClasses();
        await elementUpdated(el);

        await expect(el).to.exist;
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should be callable and update layout and shape', async () => {
        const el = await fixture(html`
          <auro-dropdown layout="emphasized" shape="pill">
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.layout = 'snowflake';
        el.shape = 'snowflake';
        el.updateComponentArchitecture();
        await elementUpdated(el);

        await expect(el.layout).to.equal('snowflake');
        await expect(el.shape).to.equal('snowflake');
      });
    });
  });

  describe('Events', () => {
    describe('auroDropdown-triggerClick', () => {
      it('should fire auroDropdown-triggerClick when trigger is clicked', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const trigger = el.shadowRoot.querySelector('#trigger');

        const listener = oneEvent(el, 'auroDropdown-triggerClick');
        trigger.click();
        const event = await listener;

        await expect(event).to.exist;
      });
    });

    describe('auroDropdown-toggled', () => {
      it('should fire auroDropdown-toggled when the bib visibility changes', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        const listener = oneEvent(el, 'auroDropdown-toggled');
        el.show();
        await elementUpdated(el);
        const event = await listener;

        await expect(event).to.exist;
      });
    });

    describe('auroDropdown-idAdded', () => {
      it('should have a dropdownId after rendering', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <span slot="label"> label text </span>
            <div slot="trigger">Trigger</div>
          </auro-dropdown>
        `);

        await expect(el.dropdownId).to.be.a('string');
        await expect(el.dropdownId.length).to.be.greaterThan(0);
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
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


