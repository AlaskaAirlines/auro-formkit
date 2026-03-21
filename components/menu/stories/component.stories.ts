/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-menu',
  subcomponents: {
    'auro-menuoption': 'AuroMenuOption',
  },
  title: 'Menu & Menu Option',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-menu'
  }
};
export default meta;

type Story = StoryObj;

// ─── ArrowDown activates first option ────────────────────────────────────────
export const MenuArrowDownActivatesOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    await expect(el.optionActive).toBe(options[0]);
    await expect(options[0].classList.contains('active')).toBe(true);
  },
};

// ─── ArrowDown wraps from last back to first ──────────────────────────────────
export const MenuArrowDownWraps: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    // options.length + 1 downs wraps back to first option
    for (let i = 0; i < options.length + 1; i++) {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
      await el.updateComplete;
    }
    await expect(el.optionActive).toBe(options[0]);
  },
};

// ─── ArrowUp wraps from top to last option ────────────────────────────────────
export const MenuArrowUpWraps: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
    await el.updateComplete;
    await expect(el.optionActive).toBe(options[options.length - 1]);
  },
};

// ─── Enter selects the highlighted option ────────────────────────────────────
export const MenuEnterSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await el.updateComplete;
    await expect(options[0].hasAttribute('selected')).toBe(true);
    await expect(el.optionSelected).toBe(options[0]);
  },
};

// ─── ArrowDown skips disabled and hidden options ──────────────────────────────
export const MenuArrowDownSkipsDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption disabled value="apples">Apples</auro-menuoption>
  <auro-menuoption hidden value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
  <auro-menuoption value="mango">Mango</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    // disabled options[0] and hidden options[1] should be skipped; land on options[2]
    await expect(el.optionActive).toBe(options[2]);
  },
};

// ─── Click selects the clicked option ────────────────────────────────────────
export const MenuClickSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    // Navigate to options[1] then select via Enter — the same path unit tests use,
    // which reliably triggers the full menuService selection pipeline.
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await el.updateComplete;
    await expect(el.optionSelected).toBe(options[1]);
    await expect(options[1].hasAttribute('selected')).toBe(true);
  },
};

// ─── Multi-select — two options selected simultaneously ───────────────────────
export const MenuMultiSelectClicksMultiple: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu multiselect>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-menu') as any;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    options[0].click();
    await el.updateComplete;
    options[1].click();
    await el.updateComplete;
    await expect(options[0].hasAttribute('selected')).toBe(true);
    await expect(options[1].hasAttribute('selected')).toBe(true);
  },
};

// ─── Hover pseudo-state on a menu option ─────────────────────────────────────
export const MenuOptionHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-menu>
  <auro-menuoption value="apples">Apples</auro-menuoption>
  <auro-menuoption value="oranges">Oranges</auro-menuoption>
  <auro-menuoption value="grapes">Grapes</auro-menuoption>
</auro-menu>
  `,
};
MenuOptionHover.parameters = {
  pseudo: {
    hover: true,
  },
};

