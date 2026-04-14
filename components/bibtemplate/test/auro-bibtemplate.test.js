/* eslint-disable max-lines, no-undef */

import { fixture, html, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('Rendering', () => {
  it('should be defined as a custom element', async () => {
    const el = await Boolean(customElements.get('auro-bibtemplate'));
    await expect(el).to.be.true;
  });

  it('should be successfully created in the document', async () => {
    const el = document.createElement('auro-bibtemplate');
    await expect(el.localName).to.equal('auro-bibtemplate');
  });

  it('should render the body container', async () => {
    const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
    const bodyContainer = el.shadowRoot.querySelector('#bodyContainer');
    await expect(bodyContainer).to.exist;
  });

  it('should not render header or footer when isFullscreen is false', async () => {
    const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
    const headerContainer = el.shadowRoot.querySelector('#headerContainer');
    const footerContainer = el.shadowRoot.querySelector('#footerContainer');
    await expect(headerContainer).to.not.exist;
    await expect(footerContainer).to.not.exist;
  });

  it('should render header and footer when isFullscreen is true', async () => {
    const el = await fixture(html`
      <auro-bibtemplate isFullscreen>
        <span slot="header">Header</span>
        Content
        <span slot="footer">Footer</span>
      </auro-bibtemplate>
    `);
    const headerContainer = el.shadowRoot.querySelector('#headerContainer');
    const footerContainer = el.shadowRoot.querySelector('#footerContainer');
    await expect(headerContainer).to.exist;
    await expect(footerContainer).to.exist;
  });

  it('should render the close button when isFullscreen is true', async () => {
    const el = await fixture(html`
      <auro-bibtemplate isFullscreen>
        <span slot="header">Header</span>
        Content
      </auro-bibtemplate>
    `);
    const closeButton = el.shadowRoot.querySelector('#closeButton');
    await expect(closeButton).to.exist;
  });
});

describe('User Stories', () => {
  it('should expose CSS parts for parent component styling', async () => {
    const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
    el.exposeCssParts();
    await expect(el.getAttribute('exportparts')).to.equal('bibtemplate:dropdownBibTemplate');
  });
});

describe('Properties', () => {
  describe('isFullscreen', () => {
    it('should default to falsy', async () => {
      const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
      await expect(el.isFullscreen).to.not.be.true;
    });

    it('should reflect the isFullscreen attribute', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      await expect(el.isFullscreen).to.be.true;
      await expect(el.hasAttribute('isfullscreen')).to.be.true;
    });

    it('should toggle header/footer rendering when toggled', async () => {
      const el = await fixture(html`
        <auro-bibtemplate>
          <span slot="header">Header</span>
          Content
          <span slot="footer">Footer</span>
        </auro-bibtemplate>
      `);

      await expect(el.shadowRoot.querySelector('#headerContainer')).to.not.exist;

      el.isFullscreen = true;
      await elementUpdated(el);

      await expect(el.shadowRoot.querySelector('#headerContainer')).to.exist;
      await expect(el.shadowRoot.querySelector('#footerContainer')).to.exist;
    });
  });

  describe('large', () => {
    it('should default to false', async () => {
      const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
      await expect(el.large).to.be.false;
    });

    it('should reflect the large attribute', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen large>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      await expect(el.large).to.be.true;
      await expect(el.hasAttribute('large')).to.be.true;
    });

    it('should set header display to display when large is true', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen large>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const header = el.shadowRoot.querySelector('#header');
      await expect(header.getAttribute('display')).to.equal('display');
    });

    it('should set header display to 600 when large is false', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const header = el.shadowRoot.querySelector('#header');
      await expect(header.getAttribute('display')).to.equal('600');
    });
  });
});

describe('Slots', () => {
  describe('default', () => {
    it('should render content in the default slot', async () => {
      const el = await fixture(html`<auro-bibtemplate>Main Content</auro-bibtemplate>`);
      const slot = el.shadowRoot.querySelector('#bodyContainer slot:not([name])');
      await expect(slot).to.exist;
      const assigned = slot.assignedNodes().filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      await expect(assigned.length).to.be.greaterThan(0);
    });
  });

  describe('header', () => {
    it('should render content in the header slot when fullscreen', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">My Header</span>
          Content
        </auro-bibtemplate>
      `);
      const slotContent = el.querySelector('[slot="header"]');
      await expect(slotContent).to.exist;
      await expect(slotContent.textContent).to.equal('My Header');
    });
  });

  describe('subheader', () => {
    it('should render content in the subheader slot when fullscreen', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          <span slot="subheader">Sub Header</span>
          Content
        </auro-bibtemplate>
      `);
      const slotContent = el.querySelector('[slot="subheader"]');
      await expect(slotContent).to.exist;
      await expect(slotContent.textContent).to.equal('Sub Header');
    });
  });

  describe('footer', () => {
    it('should render content in the footer slot when fullscreen', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
          <span slot="footer">Footer Content</span>
        </auro-bibtemplate>
      `);
      const slotContent = el.querySelector('[slot="footer"]');
      await expect(slotContent).to.exist;
      await expect(slotContent.textContent).to.equal('Footer Content');
    });
  });

  describe('ariaLabel.close', () => {
    it('should render content in the ariaLabel.close slot', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          <span slot="ariaLabel.close">Dismiss</span>
          Content
        </auro-bibtemplate>
      `);
      const slotContent = el.querySelector('[slot="ariaLabel.close"]');
      await expect(slotContent).to.exist;
      await expect(slotContent.textContent).to.equal('Dismiss');
    });

    it('should default to Close text when no slot content provided', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const closeButton = el.shadowRoot.querySelector('#closeButton');
      const span = closeButton.querySelector('span');
      const slot = span.querySelector('slot[name="ariaLabel.close"]');
      await expect(slot.textContent).to.equal('Close');
    });
  });
});

describe('Public Functions', () => {
  describe('register', () => {
    it('should register the element as a custom element', async () => {
      const el = await Boolean(customElements.get('auro-bibtemplate'));
      await expect(el).to.be.true;
    });
  });

  describe('focusCloseButton', () => {
    it('should focus the close button', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      el.focusCloseButton();
      const closeButton = el.shadowRoot.querySelector('#closeButton');
      await expect(el.shadowRoot.activeElement).to.equal(closeButton);
    });

    it('should not throw when close button does not exist', async () => {
      const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
      // Should not throw
      el.focusCloseButton();
    });
  });

  describe('onCloseButtonClick', () => {
    it('should dispatch close-click event', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const listener = oneEvent(el, 'close-click');
      el.onCloseButtonClick();
      const event = await listener;
      await expect(event).to.exist;
    });
  });

  describe('exposeCssParts', () => {
    it('should set exportparts attribute', async () => {
      const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
      el.exposeCssParts();
      await expect(el.getAttribute('exportparts')).to.equal('bibtemplate:dropdownBibTemplate');
    });
  });
});

describe('Events', () => {
  describe('close-click', () => {
    it('should fire close-click when close button is clicked', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const closeButton = el.shadowRoot.querySelector('#closeButton');
      const listener = oneEvent(el, 'close-click');
      closeButton.click();
      const event = await listener;
      await expect(event).to.exist;
    });
  });

  describe('auro-bibtemplate-connected', () => {
    it('should fire auro-bibtemplate-connected on first render', async () => {
      const wrapper = await fixture(html`<div></div>`);
      const listener = oneEvent(wrapper, 'auro-bibtemplate-connected');

      const el = document.createElement('auro-bibtemplate');
      el.textContent = 'Content';
      wrapper.appendChild(el);

      const event = await listener;
      await expect(event).to.exist;
      await expect(event.detail.element).to.equal(el);
    });
  });
});

describe('Private Functions', () => {
  // No private function tests
});

describe('A11Y', () => {
  it('should have a close button with accessible label in fullscreen mode', async () => {
    const el = await fixture(html`
      <auro-bibtemplate isFullscreen>
        <span slot="header">Header</span>
        Content
      </auro-bibtemplate>
    `);
    const closeButton = el.shadowRoot.querySelector('#closeButton');
    await expect(closeButton).to.exist;
    // Close button contains a span with slot for aria label
    const span = closeButton.querySelector('span');
    await expect(span).to.exist;
  });

  it('should have a part attribute on the main container', async () => {
    const el = await fixture(html`<auro-bibtemplate>Content</auro-bibtemplate>`);
    const container = el.shadowRoot.querySelector('#bibTemplate');
    await expect(container.getAttribute('part')).to.equal('bibtemplate');
  });
});

describe('Mouse Behavior', () => {
  describe('Click', () => {
    it('should dispatch close-click when close button is clicked', async () => {
      const el = await fixture(html`
        <auro-bibtemplate isFullscreen>
          <span slot="header">Header</span>
          Content
        </auro-bibtemplate>
      `);
      const closeButton = el.shadowRoot.querySelector('#closeButton');
      const listener = oneEvent(el, 'close-click');
      closeButton.click();
      const event = await listener;
      await expect(event).to.exist;
    });
  });
});

describe('Keyboard Behavior', () => {
  // No keyboard-specific behavior in this component
});
