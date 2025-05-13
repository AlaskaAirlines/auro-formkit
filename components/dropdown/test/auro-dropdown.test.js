import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../src/registered.js';

describe('auro-dropdown', () => {
  it('auro-dropdown is accessible', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <div slot="trigger">Trigger</div>
        <div slot="label">Label</div>
      </auro-dropdown>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-dropdown custom element is defined', async () => {
    const el = await !!customElements.get("auro-dropdown");

    await expect(el).to.be.true;
  });

  it('auro-dropdown with chevron', async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const chevronEl = el.shadowRoot.querySelector('#showStateIcon');
    expect(chevronEl).to.be.visible;
  });

  it('auro-dropdown with non-focusable trigger', async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label">
          label text
        </span>
        <span slot="trigger">Trigger</span>
      </auro-dropdown>
    `);

    await expect (el.shadowRoot.querySelector('#trigger').getAttribute('tabindex')).to.equal('0');
  });

  it('auro-dropdown with focusable trigger', async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label">
          label text
        </span>
        <a slot="trigger">Trigger</a>
      </auro-dropdown>
    `);

    await expect (el.shadowRoot.querySelector('#trigger').getAttribute('tabindex')).to.equal('-1');
  });

  it('auro-dropdown with focusable trigger child element', async () => {
    const el = await fixture(html`
      <auro-dropdown chevron>
        <span slot="label">
          label text
        </span>
        <span slot="trigger">
          <a>Trigger</a>
        </span>
      </auro-dropdown>
    `);

    await expect (el.shadowRoot.querySelector('#trigger').getAttribute('tabindex')).to.equal('-1');
  });

  it('auro-dropdown aria rules with label slot content', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const triggerEl = el.shadowRoot.querySelector('.trigger');
    expect(triggerEl).to.have.attribute('aria-labelledby', 'triggerLabel');
  });

  it('auro-dropdown shows only with click when using noToggle attribute', async () => {
    const el = await fixture(html`
      <auro-dropdown noToggle>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');
    expectPopoverHidden(el);

    trigger.click();
    expectPopoverShown(el);

    trigger.click();
    expectPopoverShown(el);
  });

  it('auro-dropdown toggle with click', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');
    expectPopoverHidden(el);

    trigger.click();
    expectPopoverShown(el);

    trigger.click();
    expectPopoverHidden(el);
  });

  it('auro-dropdown programmatically hide', async () => {
    const el = await fixture(html`
      <auro-dropdown toggle chevron>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const chevron = el.shadowRoot.querySelector('#showStateIcon');
    expectPopoverHidden(el);
    expect(chevron).to.not.have.attribute('data-expanded');

    expectPopoverHidden(el);

    el.show();
    expectPopoverShown(el);

    el.hide();
    expectPopoverHidden(el);
    expect(chevron).to.not.have.attribute('data-expanded');
  });

  it('auro-dropdown fires event - auroDropdown-triggerClick', async () => {
    const el = await fixture(html`
      <auro-dropdown disableEventShow>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    await expect(el).to.be.accessible();

    const trigger = el.shadowRoot.querySelector('#trigger');
    expectPopoverHidden(el);

    const listener = oneEvent(el, 'auroDropdown-triggerClick');
    trigger.click();
    const { result } = await listener;

    expect(result).to.equal(undefined);
  });

  it('auro-dropdown fires event - auroDropdown-toggled', async () => {
    const el = await fixture(html`
      <auro-dropdown toggle>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');
    expectPopoverHidden(el);

    const listener = oneEvent(el, 'auroDropdown-toggled');
    trigger.click();
    const { result } = await listener;

    expect(result).to.equal(undefined);

    trigger.click();

    expect(result).to.equal(undefined);
  });

  it('auro-dropdown toggles with spacebar', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');

    trigger.dispatchEvent(new KeyboardEvent('keydown', {
      'key': ' '
    }));

    expectPopoverShown(el);
  });

  it('auro-dropdown toggles with enter key', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');

    trigger.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Enter'
    }));

    expectPopoverShown(el);
  });

  it('auro-dropdown shows with spacebar', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');

    trigger.dispatchEvent(new KeyboardEvent('keydown', {
      'key': ' '
    }));

    expectPopoverShown(el);
  });

  it('auro-dropdown shows with enter key', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');

    trigger.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Enter'
    }));

    expectPopoverShown(el);
  });

  it('auro-dropdown hides with esc key', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <span slot="label">
          label text
        </span>
        <div slot="trigger">Trigger</div>
      </auro-dropdown>
    `);

    const trigger = el.shadowRoot.querySelector('#trigger');

    trigger.click();

    expectPopoverShown(el);

    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Escape'
    }));

    expectPopoverHidden(el);
  });

  describe('when passing fullscreenBreakpoint', () => {
    it('passes a pixel value when selecting a valid breakpoint', async () => {
      const el = await fixture(html`
        <auro-dropdown fullscreenBreakpoint="sm">
          <span slot="label">
            label text
          </span>
          <div slot="trigger">Trigger</div>
        </auro-dropdown>
      `);

      expect(el.bibContent.mobileFullscreenBreakpoint).to.equal('576px');
    });

    it('passes "undefined" when selecting `disabled`', async () => {
      const el = await fixture(html`
        <auro-dropdown fullscreenBreakpoint="disabled">
          <span slot="label">
            label text
          </span>
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
