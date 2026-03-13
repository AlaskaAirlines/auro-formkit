/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';
import '../../menu/src/registered';

import '../src/registered';

const meta: Meta = {
  component: 'auro-select',
  title: 'Select/Interaction Tests',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-select'
  }
};
export default meta;

type Story = StoryObj;

// ─── §2.1.1  Open dropdown and select an option (P0) ────────────────────────
export const SelectOpenAndSelectOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    // Select "Price" option
    const option = el.querySelector('auro-menuoption[value="price"]');
    await userEvent.click(option);

    await expect(el.value).toBe('price');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.2  Arrow keys navigate options; Enter confirms selection (P0) ─────
export const SelectKeyboardNavAndEnter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    // ArrowDown twice → "Price" is active
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    // Wait for menu to reflect active state
    await new Promise((r) => setTimeout(r, 50));
    const priceOption = el.querySelector('auro-menuoption[value="price"]');
    await expect(priceOption.classList.contains('active')).toBe(true);

    // Enter confirms selection
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.value).toBe('price');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.3  Tab highlights then selects active option and closes (P0) ──────
export const SelectTabSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);

    // Arrow down once → first option active
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    // Tab → selects the active option and closes
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.value).toBe('stops');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.5  Escape closes bib without making a selection (P0) ──────────────
export const SelectEscapeClosesWithoutSelect: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    // Escape via document-level dispatch (matches how auroFloatingUI listens)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.isPopoverVisible).toBe(false);
    await expect(el.value).toBeUndefined();
  },
};

// ─── §2.1.6  Type-ahead activates the first option matching the key (P1) ────
export const SelectTypeAhead: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;

    // Press "p" without opening first — type-ahead should activate Price
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    const priceOption = el.querySelector('auro-menuoption[value="price"]');
    await expect(priceOption.classList.contains('active')).toBe(true);
  },
};

// ─── §2.3.1  Trigger combobox role and aria-expanded reflect open state (P0) ─
export const SelectAriaComboboxAttributes: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    // Closed state assertions
    await expect(trigger.getAttribute('role')).toBe('combobox');
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await expect(trigger.hasAttribute('aria-controls')).toBe(true);

    // Open and re-check aria-expanded
    await userEvent.click(trigger);
    await expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Close via Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 50));
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
  },
};

// ─── §2.4.1  Emphasized layout: dropdown opens correctly (P2) ───────────────
export const SelectEmphasizedOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select layout="emphasized" shape="pill" size="xl">
  <span slot="ariaLabel.bib.close">Close</span>
  <span slot="label">Travel type</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">Flights</auro-menuoption>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="hotels">Hotels</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);
  },
};

// ─── §2.4.2  Snowflake layout: dropdown opens correctly (P2) ────────────────
export const SelectSnowflakeOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select layout="snowflake" shape="snowflake" placeholder="Choose one">
  <span slot="ariaLabel.bib.close">Close</span>
  <span slot="label">Travel type</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">Flights</auro-menuoption>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="hotels">Hotels</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);
  },
};

