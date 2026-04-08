/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';

import '../../src/registered';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';

// ─── Tailwind Play CDN container-query + dialog/drawer regression stories ─────
// These stories verify that auro-datepicker correctly opens its bib when placed
// inside an auro-dialog or auro-drawer that is itself wrapped in a Tailwind
// container-query ancestor.  The Play CDN script is injected by the
// `withTailwindCdn` global decorator in .storybook/preview.ts.

const meta: Meta = {
  component: 'auro-datepicker',
  title: 'Tailwind/DatePicker/Container Queries',
  tags: ['!autodocs', 'tailwind-cdn'],
  parameters: {
    requiresTailwindCdn: true,
    rootSelector: 'auro-datepicker',
  }
};
export default meta;

type Story = StoryObj;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Datepicker in dialog inside Tailwind @container — bib open ─────────────
export const InDialogContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-dialog open>
    <span slot="header">Datepicker in Dialog (@container)</span>
    <div slot="content">
      <auro-datepicker centralDate="03/01/2025">
        <span slot="ariaLabel.bib.close">Close Calendar</span>
        <span slot="bib.fullscreen.headline">Datepicker Headline</span>
        <span slot="fromLabel">Departure</span>
        <span slot="bib.fullscreen.fromLabel">Departure</span>
      </auro-datepicker>
    </div>
  </auro-dialog>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;
    el.inputList[0].click();
    await el.updateComplete;
    await wait(200);
  },
};

// ─── Datepicker in drawer inside Tailwind @container — bib open ─────────────
export const InDrawerContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-drawer open aria-label="Datepicker in Drawer">
    <span slot="header">Datepicker in Drawer (@container)</span>
    <div slot="content">
      <auro-datepicker centralDate="03/01/2025">
        <span slot="ariaLabel.bib.close">Close Calendar</span>
        <span slot="bib.fullscreen.headline">Datepicker Headline</span>
        <span slot="fromLabel">Departure</span>
        <span slot="bib.fullscreen.fromLabel">Departure</span>
      </auro-datepicker>
    </div>
  </auro-drawer>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;
    el.inputList[0].click();
    await el.updateComplete;
    await wait(200);
  },
};
