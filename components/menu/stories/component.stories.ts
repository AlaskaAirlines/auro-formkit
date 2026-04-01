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

// ─── navigateOptions('down') activates first option ────────────────────────────────────────
export const MenuNavigateDownActivatesOption: Story = {
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
    el.navigateOptions('down');
    await el.updateComplete;
    await expect(el.optionActive).toBe(options[0]);
    await expect(options[0].classList.contains('active')).toBe(true);
  },
};

// ─── navigateOptions('down') wraps from last back to first ──────────────────────────────────
export const MenuNavigateDownWraps: Story = {
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
      el.navigateOptions('down');
      await el.updateComplete;
    }
    await expect(el.optionActive).toBe(options[0]);
  },
};

// ─── navigateOptions('up') wraps from top to last option ────────────────────────────────────
export const MenuNavigateUpWraps: Story = {
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
    el.navigateOptions('up');
    await el.updateComplete;
    await expect(el.optionActive).toBe(options[options.length - 1]);
  },
};

// ─── makeSelection selects the highlighted option ────────────────────────────────────
export const MenuMakeSelectionSelectsOption: Story = {
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
    el.navigateOptions('down');
    await el.updateComplete;
    el.makeSelection();
    await el.updateComplete;
    await expect(options[0].hasAttribute('selected')).toBe(true);
    await expect(el.optionSelected).toBe(options[0]);
  },
};

// ─── navigateOptions('down') skips disabled and hidden options ──────────────────────────────
export const MenuNavigateDownSkipsDisabled: Story = {
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
    el.navigateOptions('down');
    await el.updateComplete;
    // disabled options[0] and hidden options[1] should be skipped; land on options[2]
    await expect(el.optionActive).toBe(options[2]);
  },
};

// ─── navigateOptions + makeSelection selects the option ────────────────────────────────────
export const MenuNavigateThenMakeSelection: Story = {
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
    el.navigateOptions('down');
    await el.updateComplete;
    el.navigateOptions('down');
    await el.updateComplete;
    el.makeSelection();
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

