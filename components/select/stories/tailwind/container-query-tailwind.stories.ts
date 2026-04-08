/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';
import '../../../menu/src/registered';

import '../../src/registered';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';

// ─── Tailwind Play CDN container-query + dialog/drawer regression stories ─────
// These stories verify that auro-select correctly opens its bib when placed
// inside an auro-dialog or auro-drawer that is itself wrapped in a Tailwind
// container-query ancestor.  The Play CDN script is injected by the
// `withTailwindCdn` global decorator in .storybook/preview.ts.

const meta: Meta = {
  component: 'auro-select',
  title: 'Tailwind/Select/Container Queries',
  tags: ['!autodocs', 'tailwind-cdn'],
  parameters: {
    requiresTailwindCdn: true,
    rootSelector: 'auro-select',
  }
};
export default meta;

type Story = StoryObj;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(predicate: () => boolean, timeout = 2000, interval = 20) {
  const deadline = Date.now() + timeout;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval));
  }
  if (!predicate()) {
    throw new Error(`waitUntil timed out after ${timeout}ms`);
  }
}

// ─── Select in dialog inside Tailwind @container — bib open ─────────────────
export const InDialogContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-dialog open>
    <span slot="header">Select in Dialog (@container)</span>
    <div slot="content">
      <auro-select>
        <span slot="ariaLabel.bib.close">Close Popup</span>
        <span slot="bib.fullscreen.headline">Bib Headline</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          <auro-menuoption value="Bananas">Bananas</auro-menuoption>
          <auro-menuoption value="Grapes">Grapes</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </auro-dialog>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;
    el.showBib();
    await wait(100);
    await waitUntil(() => el.dropdown.isPopoverVisible);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Select in drawer inside Tailwind @container — bib open ─────────────────
export const InDrawerContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-drawer open aria-label="Select in Drawer">
    <span slot="header">Select in Drawer (@container)</span>
    <div slot="content">
      <auro-select>
        <span slot="ariaLabel.bib.close">Close Popup</span>
        <span slot="bib.fullscreen.headline">Bib Headline</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          <auro-menuoption value="Bananas">Bananas</auro-menuoption>
          <auro-menuoption value="Grapes">Grapes</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </auro-drawer>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;
    el.showBib();
    await wait(100);
    await waitUntil(() => el.dropdown.isPopoverVisible);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};
