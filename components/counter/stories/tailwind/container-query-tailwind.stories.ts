/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../../src/registered';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';

// ─── Tailwind Play CDN container-query + dialog/drawer regression stories ─────
// These stories verify that auro-counter-group correctly opens its bib when
// placed inside an auro-dialog or auro-drawer that is itself wrapped in a
// Tailwind container-query ancestor.  The Play CDN script is injected by the
// `withTailwindCdn` global decorator in .storybook/preview.ts.

const meta: Meta = {
  component: 'auro-counter-group',
  subcomponents: { AuroCounter: 'auro-counter' },
  title: 'Tailwind/Counter & Counter Group/Container Queries',
  tags: ['!autodocs', 'tailwind-cdn'],
  parameters: {
    requiresTailwindCdn: true,
    rootSelector: 'auro-counter-button[part="controlPlus"]',
  }
};
export default meta;

type Story = StoryObj;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Counter-group in dialog inside Tailwind @container — bib open ──────────
export const InDialogContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-dialog open>
    <span slot="header">Counter in Dialog (@container)</span>
    <div slot="content">
      <auro-counter-group isDropdown>
        <span slot="ariaLabel.bib.close">Close Popup</span>
        <div slot="bib.fullscreen.headline">Group fullscreen label</div>
        <div slot="label">Counter Group</div>
        <auro-counter>Counter 1</auro-counter>
        <auro-counter>Counter 2</auro-counter>
      </auro-counter-group>
    </div>
  </auro-dialog>
</div>
  `,
  async play({ canvas }: { canvas: any }) {
    const trigger = await canvas.findByShadowText(/Counter Group/i);
    await userEvent.click(trigger);
    await wait(100);
  },
};

// ─── Counter-group in drawer inside Tailwind @container — bib open ──────────
export const InDrawerContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-drawer open aria-label="Counter in Drawer">
    <span slot="header">Counter in Drawer (@container)</span>
    <div slot="content">
      <auro-counter-group isDropdown>
        <span slot="ariaLabel.bib.close">Close Popup</span>
        <div slot="bib.fullscreen.headline">Group fullscreen label</div>
        <div slot="label">Counter Group</div>
        <auro-counter>Counter 1</auro-counter>
        <auro-counter>Counter 2</auro-counter>
      </auro-counter-group>
    </div>
  </auro-drawer>
</div>
  `,
  async play({ canvas }: { canvas: any }) {
    const trigger = await canvas.findByShadowText(/Counter Group/i);
    await userEvent.click(trigger);
    await wait(100);
  },
};
