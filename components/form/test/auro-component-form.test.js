import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-component-form';

describe('auro-form', () => {
  it('sets the CSS class on auro-component-form > div element', async () => {
    const el = await fixture(html`
      <auro-component-form cssclass="testClass"></auro-component-form>
    `);

    const div = el.shadowRoot?.querySelector('div');
    expect(div?.className).to.equal('testClass');
  });

  it('auro-component-form is accessible', async () => {
    const el = await fixture(html`
      <auro-component-form cssclass="testClass"></auro-component-form>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-component-form custom element is defined', async () => {
    const el = await !!customElements.get("auro-component-form");

    await expect(el).to.be.true;
  });
});
