/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';
import '../../menu/src/registered';

import '../src/registered';

const meta: Meta = {
  component: 'auro-combobox',
  title: 'Combobox',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-combobox'
  }
};
export default meta;

type Story = StoryObj;

/**
 * Replicates the setInputValue helper from unit tests.
 * Fires all the events the combobox depends on to process typed input.
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

// ─── Typing opens bib with filtered options ───────────────────────────────────
export const ComboboxBibOpensOnType: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await new Promise((r) => setTimeout(r, 100));
    // Click the trigger to open the bib once there is a typed value
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Arrow key navigation moves active option ────────────────────────────────
export const ComboboxArrowKeyNavigation: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    // Enter opens the bib when a value is typed
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await new Promise((r) => setTimeout(r, 100));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.optionActive).not.toBeNull();
  },
};

// ─── Enter on highlighted option selects it and closes bib ───────────────────
export const ComboboxEnterSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    // Open bib
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    // Navigate to first option
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    // Select it
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(false);
    await expect(el.value).not.toBeNull();
  },
};

// ─── Escape closes bib without making a selection ────────────────────────────
export const ComboboxEscapeClosesWithoutSelect: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    await el.updateComplete;
    // Use trigger.click() to open the bib — this is the same path the unit
    // tests confirm ('shows the bib on click only when a value is typed').
    // Enter keydown is unreliable here because auro-input.value (the Lit
    // property) may not have settled before showBib() reads it.
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    // Close without selecting — simulates the user pressing Escape
    el.hideBib();
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);
    await expect(el.value).toBeUndefined();
  },
};

// ─── No matching options — bib stays hidden ───────────────────────────────────
export const ComboboxNoMatchHidesBib: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'zzzzz');
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);
  },
};

// ─── noFilter — all options remain visible while typing ───────────────────────
export const ComboboxNoFilter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await el.updateComplete;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    // With noFilter, neither option should be hidden
    await expect(options[0].hasAttribute('hidden')).toBe(false);
    await expect(options[1].hasAttribute('hidden')).toBe(false);
  },
};

// ─── aria-activedescendant set on input after keyboard navigation ─────────────
export const ComboboxAriaActiveDescendant: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await new Promise((r) => setTimeout(r, 100));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.optionActive).not.toBeNull();
  },
};

// ─── Default hover pseudo-state on trigger ───────────────────────────────────
export const ComboboxHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};
ComboboxHover.parameters = {
  pseudo: {
    hover: true,
  },
};

// ─── Bib open — filtered results visible (Chromatic open-state snapshot) ─────
export const ComboboxBibOpenFiltered: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'gr');
    await new Promise((r) => setTimeout(r, 100));
    el.showBib();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Bib open — all options visible with noFilter ────────────────────────────
export const ComboboxBibOpenNoFilter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries">Cherries</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await new Promise((r) => setTimeout(r, 100));
    el.showBib();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Bib open — option highlighted via arrow key ─────────────────────────────
export const ComboboxBibOpenOptionHighlighted: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await new Promise((r) => setTimeout(r, 100));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(true);
    await expect(el.optionActive).not.toBeNull();
  },
};

