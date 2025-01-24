import { fixture, html, expect } from '@open-wc/testing';
import '../src/index.js';

describe('auro-form', () => {
  it.skip('sets the CSS class on auro-form > div element', async () => {
    const el = await fixture(html`
      <auro-form cssclass="testClass"></auro-form>
    `);

    const div = el.shadowRoot?.querySelector('div');
    expect(div?.className).to.equal('testClass');
  });

  it('auro-form is accessible', async () => {
    const el = await fixture(html`
      <auro-form cssclass="testClass"></auro-form>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-form custom element is defined', async () => {
    await customElements.whenDefined("auro-form");
    const el = !!customElements.get("auro-form");
    expect(el).to.be.true;
  });
});
