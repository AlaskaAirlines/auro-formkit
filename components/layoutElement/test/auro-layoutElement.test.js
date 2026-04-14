/* eslint-disable max-lines, no-undef, no-unused-expressions */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { TestAuroElement } from './testFixtures.js';

// Register test element
if (!customElements.get('test-auro-element')) {
  customElements.define('test-auro-element', TestAuroElement);
}

describe('AuroElement', () => {

  describe('Rendering', () => {
    it('should be successfully created in the document', async () => {
      const el = document.createElement('test-auro-element');
      await expect(el.localName).to.equal('test-auro-element');
    });

    it('should render the default layout', async () => {
      const el = await fixture(html`<test-auro-element></test-auro-element>`);
      const wrapper = el.shadowRoot.querySelector('.wrapper');
      await expect(wrapper).to.exist;
    });

    it('should fall back to default layout when renderLayout throws', async () => {
      const el = await fixture(html`<test-auro-element></test-auro-element>`);
      // Force renderLayout to throw on next render
      el.forceRenderError = true;
      el.requestUpdate();
      await elementUpdated(el);

      // Should still render (via getLayout fallback)
      const wrapper = el.shadowRoot.querySelector('.wrapper');
      await expect(wrapper).to.exist;
    });
  });

  describe('Properties', () => {
    describe('layout', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        await expect(el.layout).to.be.undefined;
      });

      it('should reflect the layout attribute', async () => {
        const el = await fixture(html`<test-auro-element layout="classic"></test-auro-element>`);
        await expect(el.layout).to.equal('classic');
        await expect(el.getAttribute('layout')).to.equal('classic');
      });
    });

    describe('shape', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        await expect(el.shape).to.be.undefined;
      });

      it('should reflect the shape attribute', async () => {
        const el = await fixture(html`<test-auro-element shape="pill"></test-auro-element>`);
        await expect(el.shape).to.equal('pill');
        await expect(el.getAttribute('shape')).to.equal('pill');
      });
    });

    describe('size', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        await expect(el.size).to.be.undefined;
      });

      it('should reflect the size attribute', async () => {
        const el = await fixture(html`<test-auro-element size="lg"></test-auro-element>`);
        await expect(el.size).to.equal('lg');
        await expect(el.getAttribute('size')).to.equal('lg');
      });
    });

    describe('onDark', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        await expect(el.onDark).to.not.be.true;
      });

      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`<test-auro-element ondark></test-auro-element>`);
        await expect(el.onDark).to.be.true;
        await expect(el.hasAttribute('ondark')).to.be.true;
      });
    });

    describe('componentHasFocus', () => {
      it('should return false when the element does not have focus', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        await expect(el.componentHasFocus).to.be.false;
      });

      it('should return true when the element has focus', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        el.setAttribute('tabindex', '0');
        el.focus();
        await expect(el.componentHasFocus).to.be.true;
      });
    });
  });

  describe('Public Functions', () => {
    describe('resetShapeClasses', () => {
      it('should add shape class when shape and size are set', async () => {
        const el = await fixture(html`<test-auro-element shape="pill" size="lg"></test-auro-element>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('shape-pill-lg')).to.be.true;
      });

      it('should add shape-none class when shape is not set', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        el.resetShapeClasses();
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('shape-none')).to.be.true;
      });

      it('should remove old shape classes and add new ones', async () => {
        const el = await fixture(html`<test-auro-element shape="pill" size="lg"></test-auro-element>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('shape-pill-lg')).to.be.true;

        el.shape = 'pill-left';
        el.resetShapeClasses();
        await elementUpdated(el);

        await expect(wrapper.classList.contains('shape-pill-lg')).to.be.false;
        await expect(wrapper.classList.contains('shape-pill-left-lg')).to.be.true;
      });

      it('should add shape-none when size is set but shape is not', async () => {
        const el = await fixture(html`<test-auro-element size="lg"></test-auro-element>`);
        el.resetShapeClasses();
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('shape-none')).to.be.true;
      });
    });

    describe('resetLayoutClasses', () => {
      it('should add layout class when layout is set', async () => {
        const el = await fixture(html`<test-auro-element layout="classic"></test-auro-element>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('layout-classic')).to.be.true;
      });

      it('should not add layout class when layout is not set', async () => {
        const el = await fixture(html`<test-auro-element></test-auro-element>`);
        el.resetLayoutClasses();
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        const hasLayoutClass = [...wrapper.classList].some((c) => c.startsWith('layout-'));
        await expect(hasLayoutClass).to.be.false;
      });

      it('should remove old layout classes and add new ones', async () => {
        const el = await fixture(html`<test-auro-element layout="classic"></test-auro-element>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('layout-classic')).to.be.true;

        el.layout = 'snowflake';
        el.resetLayoutClasses();
        await elementUpdated(el);

        await expect(wrapper.classList.contains('layout-classic')).to.be.false;
        await expect(wrapper.classList.contains('layout-snowflake')).to.be.true;
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should apply both layout and shape classes', async () => {
        const el = await fixture(html`<test-auro-element layout="classic" shape="pill" size="lg"></test-auro-element>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('layout-classic')).to.be.true;
        await expect(wrapper.classList.contains('shape-pill-lg')).to.be.true;
      });

      it('should update classes when called after property changes', async () => {
        const el = await fixture(html`<test-auro-element layout="classic" shape="pill" size="lg"></test-auro-element>`);
        await elementUpdated(el);

        el.layout = 'snowflake';
        el.shape = 'snowflake';
        el.updateComponentArchitecture();
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        await expect(wrapper.classList.contains('layout-snowflake')).to.be.true;
        await expect(wrapper.classList.contains('shape-snowflake-lg')).to.be.true;
      });
    });
  });

  describe('Lifecycle', () => {
    it('should call updateComponentArchitecture when layout changes', async () => {
      const el = await fixture(html`<test-auro-element></test-auro-element>`);
      await elementUpdated(el);

      el.layout = 'classic';
      await elementUpdated(el);

      const wrapper = el.shadowRoot.querySelector('.wrapper');
      await expect(wrapper.classList.contains('layout-classic')).to.be.true;
    });

    it('should call updateComponentArchitecture when shape changes', async () => {
      const el = await fixture(html`<test-auro-element shape="pill" size="lg"></test-auro-element>`);
      await elementUpdated(el);

      el.shape = 'pill-left';
      await elementUpdated(el);

      const wrapper = el.shadowRoot.querySelector('.wrapper');
      await expect(wrapper.classList.contains('shape-pill-left-lg')).to.be.true;
    });

    it('should call updateComponentArchitecture when size changes', async () => {
      const el = await fixture(html`<test-auro-element shape="pill" size="lg"></test-auro-element>`);
      await elementUpdated(el);

      el.size = 'xl';
      await elementUpdated(el);

      const wrapper = el.shadowRoot.querySelector('.wrapper');
      await expect(wrapper.classList.contains('shape-pill-xl')).to.be.true;
    });
  });
});
