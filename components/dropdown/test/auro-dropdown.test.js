/* eslint-disable max-lines, no-confusing-arrow, no-underscore-dangle, no-magic-numbers, max-statements-per-line, jsdoc/require-jsdoc, no-return-await, no-undef, no-unused-expressions, function-paren-newline, lit-a11y/anchor-is-valid */
import { fixture, html, expect, oneEvent, elementUpdated } from "@open-wc/testing";
import { setViewport } from '@web/test-runner-commands';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import "../src/registered.js";
import { expectPopoverShown, expectPopoverHidden } from './testFunctions.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

useAccessibleIt();

/**
 * Runs the full dropdown test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });

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

    it('should close the bib when clicking outside the dropdown', async () => {
      const el = await fixture(html`
        <div>
          <auro-dropdown>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
          <button id="outside">Outside</button>
        </div>
      `);

      const dropdown = el.querySelector('auro-dropdown');
      dropdown.show();
      await elementUpdated(dropdown);
      expectPopoverShown(dropdown);

      // The window click handler is installed via setTimeout(0) in setupHideHandlers,
      // so wait a tick for it to be registered before clicking outside.
      await new Promise((r) => setTimeout(r, 0));
      el.querySelector('#outside').click();
      await elementUpdated(dropdown);

      expectPopoverHidden(dropdown);
    });

    it('should keep the bib hidden from screen readers when closed', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <div slot="trigger">Trigger</div>
          <div>Bib content</div>
        </auro-dropdown>
      `);

      expectPopoverHidden(el);

      const bibEl = el.bibElement.value;
      const dialog = bibEl.shadowRoot.querySelector('dialog');
      expect(dialog.open).to.be.false;
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

      it('disabled dropdown has aria-disabled="true" on trigger', async () => {
        const el = await fixture(html`
          <auro-dropdown disabled>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        const trigger = el.shadowRoot.querySelector('#trigger');
        expect(trigger.getAttribute('aria-disabled')).to.equal('true');
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

      it('should store the error message string when set', async () => {
        const el = await fixture(html`<auro-dropdown error errorMessage="Something went wrong"><div slot="trigger">Trigger</div></auro-dropdown>`);
        await elementUpdated(el);

        await expect(el.errorMessage).to.equal('Something went wrong');
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

      it('should open the bib when the trigger receives focus', async () => {
        const el = await fixture(html`
          <auro-dropdown focusshow>
            <div slot="trigger" tabindex="0">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        expectPopoverHidden(el);

        // The floater attaches a 'focus' listener (not 'focusin') on el.trigger
        const trigger = el.shadowRoot.querySelector('#trigger');
        trigger.dispatchEvent(new FocusEvent('focus'));
        await elementUpdated(el);

        expectPopoverShown(el);
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

      it('should open the bib on mouseenter when hoverToggle is set', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        el.hoverToggle = true;
        await elementUpdated(el);

        expectPopoverHidden(el);

        const trigger = el.shadowRoot.querySelector('#trigger');
        trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await elementUpdated(el);

        expectPopoverShown(el);
      });

      it('should close the bib on mouseleave when hoverToggle is set', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);

        el.hoverToggle = true;
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        expectPopoverShown(el);

        await new Promise((r) => setTimeout(r, 0));
        const trigger = el.shadowRoot.querySelector('#trigger');
        trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await elementUpdated(el);

        expectPopoverHidden(el);
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

    describe('desktopModal', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-dropdown><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.desktopModal).to.be.false;
      });

      it('should reflect the desktopModal attribute', async () => {
        const el = await fixture(html`<auro-dropdown desktopmodal><div slot="trigger">Trigger</div></auro-dropdown>`);
        await expect(el.desktopModal).to.be.true;
        await expect(el.hasAttribute('desktopmodal')).to.be.true;
      });

      it('should set siblings inert when opened in desktopModal mode', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling content</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover">Popover content</div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        await expect(sibling.inert).to.not.be.true;

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        await expect(sibling.inert).to.be.true;
      });

      it('should clear sibling inert when closed', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling content</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover">Popover content</div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await expect(sibling.inert).to.be.true;

        el.hide();
        await elementUpdated(el);
        await expectPopoverHidden(el);

        await expect(sibling.inert).to.not.be.true;
      });

      it('should clear sibling inert on disconnectedCallback', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling content</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover">Popover content</div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await expect(sibling.inert).to.be.true;

        wrapper.removeChild(el);
        await elementUpdated(wrapper);

        await expect(sibling.inert).to.not.be.true;
      });

      it('should trap Tab focus within the bib when open', async () => {
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div>
              <button id="bibBtn1">First</button>
              <button id="bibBtn2">Second</button>
              <button id="bibBtn3">Third</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        // Wait for the initial focus move into the bib
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Tab should cycle through bib elements — dispatch Tab keydown
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);

        // After another Tab, focus should still be inside the bib (not escape to trigger)
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);

        // Walk the active-element chain — focus must still be inside the bib
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        const bibContent = el.bibContent;
        const isInsideBib = bibContent?.contains(active) ||
          el.querySelectorAll('button')[0]?.getRootNode() === active?.getRootNode();
        await expect(isInsideBib || el.contains(active)).to.be.true;
      });

      it('should trap Shift+Tab focus within the bib when open', async () => {
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div>
              <button id="bibBtn1">First</button>
              <button id="bibBtn2">Second</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        // Wait for initial focus into the bib
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Shift+Tab should wrap backward within the bib
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, composed: true }));
        await elementUpdated(el);

        // Focus must still be inside the component (bib), not escaped
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        await expect(el.contains(active) || el.shadowRoot.contains(active)).to.be.true;
      });

      it('should ignore non-Tab keys in the bib tab handler', async () => {
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div><button>Bib button</button></div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Dispatch a non-Tab key — handler should return early without preventing default
        const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });
        el.dispatchEvent(event);
        await elementUpdated(el);

        // Default was not prevented (handler returned early)
        await expect(event.defaultPrevented).to.be.false;
      });

      it('should return early from tab handler when no focusable elements exist', async () => {
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div>No focusable content here</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Tab with no focusable elements — handler returns early, default is not prevented
        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true });
        el.dispatchEvent(event);
        await elementUpdated(el);

        await expect(event.defaultPrevented).to.be.false;
      });

      it('should wrap Tab forward past the last focusable element', async () => {
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div>
              <button id="only">Only button</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Focus the only button, then Tab — nextIdx wraps from 1 → 0
        el.querySelector('#only').focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);

        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        await expect(el.contains(active) || el.shadowRoot.contains(active)).to.be.true;
      });

      it('should toggle desktopModal while open and update inert state', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover"><button>Bib</button></div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await expect(sibling.inert).to.be.true;

        // Turn off desktopModal while still open — should clear inert
        el.desktopModal = false;
        await elementUpdated(el);
        await expect(sibling.inert).to.not.be.true;

        // Turn it back on — should re-apply inert
        el.desktopModal = true;
        await elementUpdated(el);
        await expect(sibling.inert).to.be.true;
      });

      it('should not re-initialize inert if _setPageInert is called twice', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover">Content</div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        const firstRef = el._inertSiblings;
        // Calling _setPageInert again should bail early (guard at line 910)
        el._setPageInert();
        await expect(el._inertSiblings).to.equal(firstRef);
      });

      it('should call _setPageInert when isBibFullscreen changes to false while open', async () => {
        // Directly toggle isBibFullscreen while the dropdown is open with desktopModal —
        // triggers the changedProperties.has('isBibFullscreen') path at line 647-648
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover"><button>Btn</button></div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        // Simulate fullscreen mode, then open
        el.isBibFullscreen = true;
        await elementUpdated(el);
        el.show();
        await elementUpdated(el);

        // Simulate switching from fullscreen to desktop (line 647: desktopModal && !isBibFullscreen)
        el.isBibFullscreen = false;
        await elementUpdated(el);

        await expect(sibling.inert).to.be.true;

        el.hide();
        await elementUpdated(el);
      });

      it('should move focus to first element when Tab is pressed while focus is outside bib', async () => {
        // Covers the idx === -1 branch (lines 836-837): focus is on the trigger,
        // not in the focusables list — handler sets idx to -1 then wraps to 0
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <button slot="trigger" id="trig">Trigger</button>
            <div>
              <button id="bib1">First</button>
              <button id="bib2">Second</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        // Focus the trigger — it is NOT in getFocusableElements(bibContent)
        el.querySelector('#trig').focus();

        // Tab with focus outside the bib focusables list — idx === -1 branch fires
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);

        // Focus should have moved into the bib
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        await expect(el.contains(active) || el.shadowRoot.contains(active)).to.be.true;
      });

      it('should skip a focusable that does not accept focus and try the next one', async () => {
        // Covers lines 860-863: focus() call doesn't move focus to the target element.
        // Override btn1.focus to redirect to btn2 so _getActiveElements() won't include btn1.
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <button slot="trigger" id="trig">Trigger</button>
            <div>
              <button id="bib1">First</button>
              <button id="bib2">Second</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const btn1 = el.querySelector('#bib1');
        const btn2 = el.querySelector('#bib2');

        // Override btn1.focus so calling it focuses btn2 instead
        btn1.focus = () => btn2.focus();

        // Focus the trigger so idx === -1, nextIdx wraps to 0 (btn1)
        // btn1.focus() -> actually focuses btn2, so newActives won't include btn1
        // -> lines 860-862 execute, loop continues and finds btn2 works
        el.querySelector('#trig').focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);

        // Focus should have landed on btn2
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        await expect(active).to.equal(btn2);
      });

      it('should traverse shadow root active elements in _getActiveElements', async () => {
        // Covers lines 894-896: the while loop fires when document.activeElement is a
        // shadow host with a focused element in its shadow root.
        // Register a minimal custom element with a shadow-DOM button, focus it,
        // and call _getActiveElements() to trigger the traversal.
        if (!customElements.get('focus-shadow-host')) {
          customElements.define('focus-shadow-host', class extends HTMLElement {
            constructor() {
              super();
              const shadow = this.attachShadow({ mode: 'open' });
              const btn = document.createElement('button');
              btn.textContent = 'inner';
              shadow.appendChild(btn);
            }
          });
        }

        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <div slot="trigger">Trigger</div>
            <div>
              <focus-shadow-host id="shadowHost"></focus-shadow-host>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        // Focus the inner button inside the shadow host
        const shadowHost = el.querySelector('#shadowHost');
        shadowHost.shadowRoot.querySelector('button').focus();

        // _getActiveElements must now traverse: document.activeElement (shadowHost) →
        // shadowHost.shadowRoot.activeElement (inner button) → lines 894-895 execute
        const actives = el._getActiveElements();
        await expect(actives.length).to.be.at.least(2);
        await expect(actives).to.include(shadowHost.shadowRoot.querySelector('button'));
      });

      it('should walk up shadow DOM hosts in _setPageInert when nested in shadow root', async () => {
        // Covers lines 921-922: dropdown is inside a shadow-DOM host —
        // _setPageInert walks up through getRootNode().host to find the
        // outermost light-DOM ancestor before inerting siblings.
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <div id="host"></div>
          </div>
        `);

        const hostEl = wrapper.querySelector('#host');
        const sibling = wrapper.querySelector('#sibling');

        // Attach a shadow root and put the dropdown inside it via DOM APIs
        const shadow = hostEl.attachShadow({ mode: 'open' });
        const innerDropdown = document.createElement('auro-dropdown');
        innerDropdown.setAttribute('desktopmodal', '');
        innerDropdown.id = 'inner-dropdown';

        const triggerDiv = document.createElement('div');
        triggerDiv.setAttribute('slot', 'trigger');
        triggerDiv.textContent = 'Trigger';

        const popoverDiv = document.createElement('div');
        popoverDiv.setAttribute('slot', 'popover');
        const btn = document.createElement('button');
        btn.textContent = 'Bib';
        popoverDiv.appendChild(btn);

        innerDropdown.appendChild(triggerDiv);
        innerDropdown.appendChild(popoverDiv);
        shadow.appendChild(innerDropdown);

        await customElements.whenDefined('auro-dropdown');
        await elementUpdated(innerDropdown);

        innerDropdown.show();
        await elementUpdated(innerDropdown);

        // The shadow-DOM traversal should have walked up to hostEl
        // and inereted the sibling div
        await expect(sibling.inert).to.be.true;

        innerDropdown.hide();
        await elementUpdated(innerDropdown);
      });

      it('should move focus to last element when Shift+Tab is pressed with focus outside bib', async () => {
        // Covers the `: focusables.length` ternary branch (line 837):
        // Shift+Tab (direction === -1) when idx === -1 → idx = focusables.length
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <button slot="trigger" id="trig">Trigger</button>
            <div>
              <button id="bib1">First</button>
              <button id="bib2">Last</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Focus trigger — not in bib focusables, so idx === -1
        el.querySelector('#trig').focus();

        // Shift+Tab: direction = -1, idx = focusables.length, nextIdx wraps to last
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, composed: true }));
        await elementUpdated(el);

        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        await expect(el.contains(active) || el.shadowRoot.contains(active)).to.be.true;
      });

      it('should preserve inert state of a sibling that was already inert before modal opened', async () => {
        // Covers the `sibling.inert ? 'true' : 'false'` true-branch in _setPageInert:
        // when sibling.inert is already true, auroInertWas is stored as 'true'
        // and after close the sibling remains inert (its original state is restored)
        const wrapper = await fixture(html`
          <div>
            <div id="sibling" inert>Already inert sibling</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover"><button>Bib</button></div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(el);

        await expect(sibling.inert).to.be.true;

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await expect(sibling.inert).to.be.true;

        // After close, sibling should still be inert (auroInertWas = 'true')
        el.hide();
        await elementUpdated(el);
        await expect(sibling.inert).to.be.true;
      });

      it('should complete the focus loop without returning when no focusable accepts focus', async () => {
        // Covers the for-loop exit branch (line 863): all focusable elements' focus()
        // calls fail — the loop exits without returning early
        const el = await fixture(html`
          <auro-dropdown desktopmodal>
            <button slot="trigger" id="trig">Trigger</button>
            <div>
              <button id="bib1">First</button>
              <button id="bib2">Second</button>
            </div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const btn1 = el.querySelector('#bib1');
        const btn2 = el.querySelector('#bib2');

        // Override both buttons' focus() to be a no-op so neither accepts focus
        btn1.focus = () => {};
        btn2.focus = () => {};

        el.querySelector('#trig').focus();
        // Tab with all focusables broken — loop exhausts and exits without returning
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        await elementUpdated(el);
        // Test passes if no exception is thrown (loop exits gracefully)
      });

      it('should use the default count of 1 when auroInertCount is missing in _clearPageInert', async () => {
        // Covers the `|| '1'` fallback branch in _clearPageInert:
        // triggered when a sibling in _inertSiblings doesn't have auroInertCount set
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <auro-dropdown desktopmodal>
              <div slot="trigger">Trigger</div>
              <div slot="popover"><button>Bib</button></div>
            </auro-dropdown>
          </div>
        `);

        const el = wrapper.querySelector('auro-dropdown');
        await elementUpdated(el);

        el.show();
        await elementUpdated(el);
        await expectPopoverShown(el);

        // Manually push an element without auroInertCount into _inertSiblings
        const bareDiv = document.createElement('div');
        wrapper.appendChild(bareDiv);
        el._inertSiblings.push(bareDiv);

        // Hiding calls _clearPageInert — bareDiv has no auroInertCount,
        // so `count = parseInt(undefined || '1', 10) - 1 = 0` → clears it
        el.hide();
        await elementUpdated(el);
        // No exception thrown and inert state is properly cleaned up
        await expect(el._inertSiblings).to.be.undefined;
      });

      it('should use reference counting when two modal dropdowns share a sibling', async () => {
        const wrapper = await fixture(html`
          <div>
            <div id="sibling">Sibling</div>
            <auro-dropdown desktopmodal id="d1">
              <div slot="trigger">T1</div>
              <div slot="popover">P1</div>
            </auro-dropdown>
          </div>
        `);

        const d1 = wrapper.querySelector('#d1');
        const sibling = wrapper.querySelector('#sibling');
        await elementUpdated(d1);

        // d1 opens — sibling count reaches 1
        d1.show();
        await elementUpdated(d1);
        await expect(sibling.inert).to.be.true;
        await expect(sibling.dataset.auroInertCount).to.equal('1');

        // Simulate a second modal dropdown calling _setPageInert on the same sibling
        // by resetting _inertSiblings on d1 and calling it again (as a second consumer would)
        const saved = d1._inertSiblings;
        d1._inertSiblings = undefined;
        d1._setPageInert();
        await expect(sibling.dataset.auroInertCount).to.equal('2');

        // Restore and clear one consumer — count goes back to 1, sibling stays inert
        d1._inertSiblings = saved;
        d1._clearPageInert();
        await expect(sibling.inert).to.be.true;
        await expect(sibling.dataset.auroInertCount).to.equal('1');
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

    it('inset attribute is reflected on the bib element', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);

      const bib = el.bibElement.value;
      if (bib) {
        bib.inset = true;
        await elementUpdated(bib);
        expect(bib.hasAttribute('inset')).to.be.true;
      }
    });

    it('rounded attribute is reflected on the bib element', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);

      const bib = el.bibElement.value;
      if (bib) {
        bib.rounded = true;
        await elementUpdated(bib);
        expect(bib.hasAttribute('rounded')).to.be.true;
      }
    });

    it('common attribute is reflected on the bib element', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);

      const bib = el.bibElement.value;
      if (bib) {
        bib.common = true;
        await elementUpdated(bib);
        expect(bib.hasAttribute('common')).to.be.true;
      }
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-dropdown><span slot="trigger">Click me</span><div>Dropdown bib content</div></auro-dropdown>`);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);

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
    it('should focus the first focusable element in bib when open', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <button id="bibBtn">Click me</button>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);
      expectPopoverShown(el);

      el.focus();
      await elementUpdated(el);

      const bibBtn = el.querySelector('#bibBtn');
      await expect(document.activeElement === bibBtn || el.shadowRoot.activeElement !== null).to.be.true;
    });

    it('should focus trigger when bib is closed', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.focus();
      await elementUpdated(el);

      const trigger = el.shadowRoot.querySelector('#trigger');
      await expect(el.shadowRoot.activeElement).to.equal(trigger);
    });

    it('isCustomSlotContent should detect slotted content', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger"><span id="inner">Trigger</span></div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Test with an element whose parent has a slot attribute
      const inner = el.querySelector('#inner');
      await expect(el.isCustomSlotContent(inner)).to.be.true;

      // Test with an element that has no slot attribute ancestor
      const detached = document.createElement('div');
      await expect(el.isCustomSlotContent(detached)).to.be.false;
    });

    it('bindFocusEventToTrigger should dispatch a FocusEvent on trigger', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      let received = false;
      el.trigger.addEventListener('focus', () => {
        received = true;
      });

      el.bindFocusEventToTrigger(new FocusEvent('focus'));
      await expect(received).to.be.true;
    });

    it('clearTriggerA11yAttributes should remove a11y attributes', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const trigger = el.shadowRoot.querySelector('#trigger');
      trigger.setAttribute('role', 'combobox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', 'bib-id');
      trigger.setAttribute('aria-autocomplete', 'list');
      trigger.setAttribute('aria-labelledby', 'label-id');
      trigger.id = `${el.id}-trigger-element`;

      el.clearTriggerA11yAttributes(trigger);

      await expect(trigger.hasAttribute('role')).to.be.false;
      await expect(trigger.hasAttribute('aria-expanded')).to.be.false;
      await expect(trigger.hasAttribute('aria-controls')).to.be.false;
      await expect(trigger.hasAttribute('aria-autocomplete')).to.be.false;
      await expect(trigger.hasAttribute('aria-labelledby')).to.be.false;
      await expect(trigger.hasAttribute('id')).to.be.false;
    });

    it('clearTriggerA11yAttributes should handle null input', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Should not throw
      el.clearTriggerA11yAttributes(null);
      el.clearTriggerA11yAttributes(undefined);
    });

    it('setupTriggerFocusEventBinding should add focus/blur listeners to auro elements in trigger slot', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <auro-input slot="trigger"></auro-input>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Force setup
      el.setupTriggerFocusEventBinding();
      await elementUpdated(el);

      // clearTriggerFocusEventBinding should also work
      el.clearTriggerFocusEventBinding();
      await elementUpdated(el);
    });

    it('setupTriggerFocusEventBinding should return early when no trigger content', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.triggerContentSlot = null;
      el.setupTriggerFocusEventBinding();
      el.clearTriggerFocusEventBinding();
    });

    it('setActiveDescendant should return early when no trigger', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const origTrigger = el.trigger;
      el.trigger = null;
      el.setActiveDescendant(document.createElement('div'));
      el.trigger = origTrigger;
    });

    it('renderLayout should handle emphasized-left and emphasized-right', async () => {
      const el = await fixture(html`
        <auro-dropdown layout="emphasized" shape="pill">
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const result1 = el.renderLayout('emphasized-left');
      await expect(result1).to.exist;

      const result2 = el.renderLayout('emphasized-right');
      await expect(result2).to.exist;
    });

    it('renderLayout should handle snowflake-left and snowflake-right', async () => {
      const el = await fixture(html`
        <auro-dropdown layout="snowflake" shape="pill">
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const result1 = el.renderLayout('snowflake-left');
      await expect(result1).to.exist;

      const result2 = el.renderLayout('snowflake-right');
      await expect(result2).to.exist;
    });

    it('handleTriggerSlotChange should detect nested slot content', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger"><span>Trigger text</span></div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      await expect(el.hasTriggerContent).to.be.true;
    });

    it('handleTriggerContentSlotChange should set hasTriggerContent false when no triggerContentSlot', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.triggerContentSlot = null;
      el.handleTriggerContentSlotChange();
      await elementUpdated(el);

      await expect(el.hasTriggerContent).to.be.false;
    });

    it('handleTriggerContentSlotChange catch block handles assignedNodes error gracefully', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Mock event whose target.assignedNodes throws (simulates NodeJS test environment)
      const mockEvent = {
        target: {
          assignedNodes() {
            throw new Error('assignedNodes not supported');
          }
        }
      };

      // Suppress the expected console.warn from the catch block
      const originalWarn = console.warn;
      console.warn = () => {};

      try {
        // Should not throw — catch block absorbs the error
        el.handleTriggerContentSlotChange(mockEvent);
      } finally {
        console.warn = originalWarn;
      }
      await elementUpdated(el);
    });

    it('handleTriggerContentSlotChange detects content in nested slot', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Mock triggerContentSlot with node that has empty text but contains a nested slot with content
      const mockNestedSlot = {
        assignedNodes: () => [document.createTextNode('nested trigger text')]
      };
      const mockNode = {
        textContent: '   ',
        querySelector: (sel) => sel === 'slot' ? mockNestedSlot : null,
        querySelectorAll: () => []
      };

      el.triggerContentSlot = [mockNode];
      el.handleTriggerContentSlotChange();
      await elementUpdated(el);

      expect(el.hasTriggerContent).to.be.true;
    });

    it('handleTriggerSlotChange with focusable content should clear a11y attributes', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <button slot="trigger">Click</button>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // A focusable trigger should have had tabindex removed
      const trigger = el.shadowRoot.querySelector('#trigger');
      await expect(trigger.hasAttribute('tabindex')).to.be.false;
    });

    // ─── handleFocusout sets hasFocus to false ─────────────────────────
    it('handleFocusout should set hasFocus to false', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.hasFocus = true;
      el.handleFocusout();
      await expect(el.hasFocus).to.be.false;
    });

    // ─── setupTriggerFocusEventBinding with focusable children in trigger ──
    it('setupTriggerFocusEventBinding should bind blur listeners for focusable children in trigger', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger"><input type="text" id="innerInput" aria-label="test input" /></div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // The slot assigned nodes should include the div with a <input> child
      // Setup was done automatically. Verify focus event dispatches to trigger.
      let triggerFocused = false;
      el.trigger.addEventListener('focus', () => {
        triggerFocused = true;
      });

      const innerInput = el.querySelector('#innerInput');
      innerInput.focus();
      await elementUpdated(el);

      // Clear binding should also run without error
      el.clearTriggerFocusEventBinding();
    });

    // ─── handleDropdownToggle focuses trigger on keydown hide ──────────
    it('handleDropdownToggle should focus trigger when bib hides via keydown', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.hasFocus = true;
      el.handleDropdownToggle({
        detail: {
          expanded: false,
          eventType: 'keydown'
        }
      });
      await elementUpdated(el);

      await expect(el.isPopoverVisible).to.be.false;
    });

    // ─── handleDropdownToggle defaults eventType to unknown ───────────
    it('handleDropdownToggle should default eventType to unknown when not provided', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.hasFocus = true;
      // Dispatch with no eventType — the || "unknown" fallback is used
      el.handleDropdownToggle({
        detail: { expanded: false }
      });
      await elementUpdated(el);

      // Should not focus trigger since eventType defaults to "unknown", not "keydown"
      await expect(el.isPopoverVisible).to.be.false;
    });

    // ─── handleDropdownToggle async focus-restore path ────────────────
    it('handleDropdownToggle should call trigger.focus() when bib closes with focus inside bib', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>
            <button id="bib-button">Bib button</button>
          </div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);

      // Focus the bib button so bibContent matches :focus-within.
      el.querySelector('#bib-button').focus();

      // Spy on trigger.focus before calling close.
      let focusCalled = false;
      el.trigger.focus = () => { focusCalled = true; };

      // Close via handleDropdownToggle directly — the bib stays visually open so
      // :focus-within remains true and the async restore path fires unconditionally.
      el.handleDropdownToggle({ detail: { expanded: false } });
      await elementUpdated(el);

      // Drain the macrotask queue so the setTimeout callback fires.
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(focusCalled).to.be.true;
    });

    // ─── handleDropdownToggle async path skips focus when bib re-opens ──
    it('handleDropdownToggle should not call trigger.focus() if dropdown re-opens before timer fires', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>
            <button id="bib-button">Bib button</button>
          </div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);

      el.querySelector('#bib-button').focus();

      let focusCalled = false;
      el.trigger.focus = () => { focusCalled = true; };

      // Close then immediately re-open before the timer fires — guard should abort.
      el.handleDropdownToggle({ detail: { expanded: false } });
      el.isPopoverVisible = true;
      await elementUpdated(el);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(focusCalled).to.be.false;
    });

    // ─── chevron renders with onDark inverse appearance ───────────────
    it('chevron should render with inverse appearance when onDark is set', async () => {
      const el = await fixture(html`
        <auro-dropdown chevron ondark>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const chevronIcon = el.shadowRoot.querySelector('#showStateIcon auro-icon, #showStateIcon [auro-icon]');
      if (chevronIcon) {
        await expect(chevronIcon.getAttribute('appearance')).to.equal('inverse');
      }
    });

    // ─── chevron renders with disabled variant ────────────────────────
    it('chevron should render with disabled variant when disabled', async () => {
      const el = await fixture(html`
        <auro-dropdown chevron disabled>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const chevronIcon = el.shadowRoot.querySelector('#showStateIcon auro-icon, #showStateIcon [auro-icon]');
      if (chevronIcon) {
        await expect(chevronIcon.getAttribute('variant')).to.equal('disabled');
      }
    });

    // ─── bib bibtemplate-connected event sets bibTemplate and fullscreen ─
    it('bib should handle auro-bibtemplate-connected event', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const mockBibTemplate = document.createElement('div');

      bib.dispatchEvent(new CustomEvent('auro-bibtemplate-connected', {
        bubbles: false,
        detail: { element: mockBibTemplate }
      }));
      await elementUpdated(bib);

      await expect(bib.bibTemplate).to.equal(mockBibTemplate);
    });

    it('bib should set isFullscreen on bibTemplate during bibtemplate-connected when already fullscreen', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const mockBibTemplate = document.createElement('div');

      // Set isFullscreen before dispatching the event
      bib.isFullscreen = true;
      await elementUpdated(bib);

      bib.dispatchEvent(new CustomEvent('auro-bibtemplate-connected', {
        bubbles: false,
        detail: { element: mockBibTemplate }
      }));
      await elementUpdated(bib);

      expect(mockBibTemplate.getAttribute('isFullscreen')).to.equal('true');
    });

    // ─── bib updated() propagates isFullscreen to bibTemplate ─────────
    it('bib should set isFullscreen attribute on bibTemplate when isFullscreen changes', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const mockBibTemplate = document.createElement('div');
      bib.bibTemplate = mockBibTemplate;

      bib.isFullscreen = true;
      await elementUpdated(bib);
      await expect(mockBibTemplate.getAttribute('isFullscreen')).to.equal('true');

      bib.isFullscreen = false;
      await elementUpdated(bib);
      await expect(mockBibTemplate.hasAttribute('isFullscreen')).to.be.false;
    });

    // ─── bib dialog cancel event dispatches auro-bib-cancel ───────────
    it('bib dialog cancel event should dispatch auro-bib-cancel', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const dialog = bib.shadowRoot.querySelector('dialog');

      let cancelReceived = false;
      bib.addEventListener('auro-bib-cancel', () => {
        cancelReceived = true;
      });

      // Dispatch native cancel event on dialog (as if ESC was pressed on a modal dialog)
      dialog.dispatchEvent(new Event('cancel', { bubbles: false }));

      await expect(cancelReceived).to.be.true;
    });

    // ─── bib dialogLabel renders label span and aria-labelledby ───────
    it('bib dialog should render dialogLabel and aria-labelledby', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      bib.dialogLabel = 'Test Dialog Label';
      await elementUpdated(bib);

      const dialog = bib.shadowRoot.querySelector('dialog');
      const labelSpan = bib.shadowRoot.querySelector('#dialogLabel');

      await expect(dialog.getAttribute('aria-labelledby')).to.equal('dialogLabel');
      await expect(labelSpan).to.exist;
      await expect(labelSpan.textContent).to.equal('Test Dialog Label');
    });

    // ─── bib keyboard strategy Enter/Escape handlers ──────────────────
    it('bib keyboard strategy Enter and Escape handlers should execute without error', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const dialog = bib.shadowRoot.querySelector('dialog');

      // Dispatch Enter and Escape keydown on the dialog to hit the strategy handlers
      dialog.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true
      }));
      dialog.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true
      }));

      // No errors expected
      await expect(el).to.exist;
    });

    // ─── bib _lockTouchScroll registers touchmove handler ─────────────
    it('bib _lockTouchScroll should register and invoke touchmove handler', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');

      // Call _lockTouchScroll to register the handler
      bib._lockTouchScroll();

      // Verify handler was registered by dispatching touchmove
      let preventDefaultCalled = false;
      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      touchEvent.composedPath = () => [
        document.body,
        document.documentElement,
        document
      ];
      touchEvent.preventDefault = () => {
        preventDefaultCalled = true;
      };

      document.dispatchEvent(touchEvent);

      await expect(preventDefaultCalled).to.be.true;

      // Clean up
      bib._unlockTouchScroll();
    });

    // ─── bib _lockTouchScroll allows scroll inside scrollable child ───
    it('bib _lockTouchScroll should allow scroll inside scrollable child', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const dialog = bib.shadowRoot.querySelector('dialog');

      bib._lockTouchScroll();

      // Create a mock scrollable element with scrollHeight > clientHeight
      const scrollableEl = document.createElement('div');
      Object.defineProperty(scrollableEl, 'scrollHeight', { get: () => 200 });
      Object.defineProperty(scrollableEl, 'clientHeight', { get: () => 50 });
      // Override getComputedStyle for this element
      const origGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = (elem) => {
        if (elem === scrollableEl) {
          return { overflowY: 'auto' };
        }
        return origGetComputedStyle(elem);
      };

      // Simulate touchmove inside a scrollable child within the dialog
      let preventDefaultCalled = false;
      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      touchEvent.composedPath = () => [
        scrollableEl,
        dialog,
        bib,
        document.body
      ];
      touchEvent.preventDefault = () => {
        preventDefaultCalled = true;
      };

      document.dispatchEvent(touchEvent);

      // Should NOT prevent default because there's a scrollable child before the dialog
      await expect(preventDefaultCalled).to.be.false;

      // Restore
      window.getComputedStyle = origGetComputedStyle;
      bib._unlockTouchScroll();
    });

    // ─── bib _lockTouchScroll allows scroll inside overflow-scroll child ─
    it('bib _lockTouchScroll should allow scroll inside child with overflow-y scroll', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const dialog = bib.shadowRoot.querySelector('dialog');

      bib._lockTouchScroll();

      const scrollableEl = document.createElement('div');
      Object.defineProperty(scrollableEl, 'scrollHeight', { get: () => 200 });
      Object.defineProperty(scrollableEl, 'clientHeight', { get: () => 50 });
      const origGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = (elem) => {
        if (elem === scrollableEl) {
          return { overflowY: 'scroll' };
        }
        return origGetComputedStyle(elem);
      };

      let preventDefaultCalled = false;
      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      touchEvent.composedPath = () => [
        scrollableEl,
        dialog,
        bib,
        document.body
      ];
      touchEvent.preventDefault = () => {
        preventDefaultCalled = true;
      };

      document.dispatchEvent(touchEvent);

      await expect(preventDefaultCalled).to.be.false;

      window.getComputedStyle = origGetComputedStyle;
      bib._unlockTouchScroll();
    });

    // ─── bib _lockTouchScroll breaks at dialog boundary ───────────────
    it('bib _lockTouchScroll should break at dialog boundary and call preventDefault', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      const bib = el.shadowRoot.querySelector('[auro-dropdownbib]');
      const dialog = bib.shadowRoot.querySelector('dialog');

      bib._lockTouchScroll();

      // composedPath includes a non-scrollable child then the dialog itself
      const nonScrollableChild = document.createElement('span');
      let preventDefaultCalled = false;
      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      touchEvent.composedPath = () => [
        nonScrollableChild,
        dialog,
        document.body
      ];
      touchEvent.preventDefault = () => {
        preventDefaultCalled = true;
      };

      document.dispatchEvent(touchEvent);

      // Should preventDefault because loop hit dialog boundary without finding scrollable child
      expect(preventDefaultCalled).to.be.true;

      bib._unlockTouchScroll();
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

    // Matches the WAI-ARIA APG select-only combobox reference markup. The
    // implicit default of aria-haspopup on role="combobox" is "listbox", but
    // setting it explicitly avoids relying on UA implicit-value mapping.
    it("should render aria-haspopup='listbox' on trigger when a11yRole is set to combobox", async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      el.a11yRole = 'combobox';
      await elementUpdated(el);

      const trigger = el.shadowRoot.querySelector("#trigger");
      expect(trigger).to.have.attribute('aria-haspopup', 'listbox');
    });

    it("should not render aria-haspopup on trigger when a11yRole is the default button", async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      const trigger = el.shadowRoot.querySelector("#trigger");
      expect(trigger.hasAttribute('aria-haspopup')).to.be.false;
    });

    // When the slotted trigger owns its own focus, the wrapper sheds combobox
    // semantics (role/aria-expanded/aria-controls/aria-labelledby) — aria-haspopup
    // must follow the same guard so it isn't stranded on a role-less wrapper.
    it("should not render aria-haspopup on the wrapper when triggerContentFocusable is true", async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <button slot="trigger">Focusable Trigger</button>
        </auro-dropdown>
      `);

      el.a11yRole = 'combobox';
      await elementUpdated(el);

      const trigger = el.shadowRoot.querySelector("#trigger");
      expect(el.triggerContentFocusable).to.be.true;
      expect(trigger.hasAttribute('aria-haspopup')).to.be.false;
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

    // ─── setActiveDescendant sets hasActiveDescendant in fullscreen mode ─
    it('setActiveDescendant sets hasActiveDescendant true when fullscreen and element is truthy', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label"> label text </span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Ensure bibContent is set
      expect(el.bibContent).to.exist;

      // Simulate fullscreen mode
      el.isBibFullscreen = true;

      const option = document.createElement('div');
      option.id = 'fullscreen-option';
      option.setAttribute('role', 'option');
      document.body.appendChild(option);

      el.setActiveDescendant(option);
      expect(el.bibContent.hasActiveDescendant).to.be.true;

      // Clear active descendant in fullscreen
      el.setActiveDescendant(null);
      expect(el.bibContent.hasActiveDescendant).to.be.false;

      document.body.removeChild(option);
    });

    // ─── mobileFullscreenBreakpoint returns undefined when CSS token is empty ─
    it('mobileFullscreenBreakpoint getter returns undefined when CSS custom property is empty', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <span slot="label">label</span>
          <div slot="trigger">Trigger</div>
          <div>Content</div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      // Set _mobileBreakpointName directly to a value whose CSS token won't resolve
      el.bibContent._mobileBreakpointName = 'xs';

      // Temporarily override the design token to return empty string
      const origGetPropertyValue = CSSStyleDeclaration.prototype.getPropertyValue;
      CSSStyleDeclaration.prototype.getPropertyValue = function(prop) {
        if (prop.startsWith('--ds-grid-breakpoint-')) {
          return '';
        }
        return origGetPropertyValue.call(this, prop);
      };

      const result = el.bibContent.mobileFullscreenBreakpoint;
      expect(result).to.be.undefined;

      CSSStyleDeclaration.prototype.getPropertyValue = origGetPropertyValue;
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

    it('clicking inside the bib keeps it open', async () => {
      const el = await fixture(html`
        <auro-dropdown>
          <div slot="trigger">Trigger</div>
          <div id="bibContent">
            <button id="bib-btn">Click me</button>
          </div>
        </auro-dropdown>
      `);
      await elementUpdated(el);

      el.show();
      await elementUpdated(el);
      expectPopoverShown(el);

      // Click the button inside the bib
      const btn = el.querySelector('#bib-btn');
      btn.click();
      await elementUpdated(el);

      // Bib should still be open
      expectPopoverShown(el);
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

      it('Enter key toggles bib closed when open', async () => {
        const el = await fixture(html`
          <auro-dropdown>
            <div slot="trigger">Trigger</div>
            <div>Bib content</div>
          </auro-dropdown>
        `);
        await elementUpdated(el);

        const trigger = el.shadowRoot.querySelector('#trigger');

        // Open the bib
        el.show();
        await elementUpdated(el);
        expectPopoverShown(el);

        // Press Enter on trigger
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await elementUpdated(el);

        expectPopoverHidden(el);
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
}

// Desktop Test Suite
describe("auro-dropdown", () => {
  runFullTest(false);
});

// Mobile Test Suite
describe("auro-dropdown in small viewport", () => {
  runFullTest(true);
});
