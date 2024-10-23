import { fixture, html, expect } from '@open-wc/testing';
import '../index';

describe('auro-form', () => {
  it('sets the CSS class on auro-form > div element', async () => {
    const el = await fixture(html`
      <auro-form cssclass="testClass"></auro-form>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-form is accessible', async () => {
    const el = await fixture(html`
      <auro-form cssclass="testClass"></auro-form>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-form custom element is defined', async () => {
    const el = await !!customElements.get("auro-form");

    await expect(el).to.be.true;
  });
});
