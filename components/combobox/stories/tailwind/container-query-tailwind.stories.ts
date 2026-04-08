/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';
import '../../../menu/src/registered';

import '../../src/registered';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';

// ─── Tailwind Play CDN container-query + dialog/drawer regression stories ─────
// These stories verify that auro-combobox correctly opens its bib when placed
// inside an auro-dialog or auro-drawer that is itself wrapped in a Tailwind
// container-query ancestor.  The Play CDN script is injected by the
// `withTailwindCdn` global decorator in .storybook/preview.ts.

const meta: Meta = {
  component: 'auro-combobox',
  title: 'Tailwind/Combobox/Container Queries',
  tags: ['!autodocs', 'tailwind-cdn'],
  parameters: {
    requiresTailwindCdn: true,
    rootSelector: 'auro-combobox',
  }
};
export default meta;

type Story = StoryObj;

/**
 * Replicates the setInputValue helper from unit tests.
 */
function setInputValue(el: any, value: string) {
  const auroInput = el.input;
  const input = auroInput.shadowRoot.querySelector('input') as HTMLInputElement;
  input.focus();
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
  auroInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  el.dispatchEvent(new KeyboardEvent('keyup', { key: value.slice(value.length - 1), repeat: false }));
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

// ─── Combobox in dialog inside Tailwind @container — bib open ───────────────
export const InDialogContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-dialog open>
    <span slot="header">Combobox in Dialog (@container)</span>
    <div slot="content">
      <auro-combobox>
        <span slot="ariaLabel.bib.close">Close combobox</span>
        <span slot="ariaLabel.input.clear">Clear All</span>
        <span slot="bib.fullscreen.headline">Bib Header</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-dialog>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    await el.updateComplete;
    await waitUntil(() => el.dropdown.isPopoverVisible);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Combobox in drawer inside Tailwind @container — bib open ───────────────
export const InDrawerContainerQuery: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-2">
  <auro-drawer open aria-label="Combobox in Drawer">
    <span slot="header">Combobox in Drawer (@container)</span>
    <div slot="content">
      <auro-combobox>
        <span slot="ariaLabel.bib.close">Close combobox</span>
        <span slot="ariaLabel.input.clear">Clear All</span>
        <span slot="bib.fullscreen.headline">Bib Header</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-drawer>
</div>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    await el.updateComplete;
    await waitUntil(() => el.dropdown.isPopoverVisible);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};
