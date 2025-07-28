/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
import { expect } from '@open-wc/testing';
import '../src/registered.js';

describe('auro-layover', () => {
  it('auro-layover custom element is defined', async () => {
    const el = await !!customElements.get("auro-layover");

    await expect(el).to.be.true;
  });

  it('auro-layover is accessible', async () => {
    const el = await nestedMenuFixture();

    await expect(el).to.be.accessible();
  });

});
