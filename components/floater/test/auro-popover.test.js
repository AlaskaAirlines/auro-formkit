/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
import { expect } from '@open-wc/testing';
import '../src/registered.js';

describe('auro-popover', () => {
  it('auro-popover custom element is defined', async () => {
    const el = await !!customElements.get("auro-popover");

    await expect(el).to.be.true;
  });

  it('auro-popover is accessible', async () => {
    const el = await nestedMenuFixture();

    await expect(el).to.be.accessible();
  });

});
