/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-input',
  title: 'Input',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-input'
  }
};
export default meta;

type Story = StoryObj;

// ─── Focused state — active label floats up ──────────────────────────────────
export const InputFocused: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input>
  <span slot="label">First name</span>
  <span slot="helpText">Please enter your first name.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    await new Promise((r) => setTimeout(r, 50));
  },
};

// ─── Value typed — active label + clear button visible ───────────────────────
export const InputWithValue: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input>
  <span slot="label">First name</span>
  <span slot="helpText">Please enter your first name.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    // Set value on the native input directly so the patched setter fires handleInput
    // synchronously and sets el.value before the assertion runs.
    input.value = 'foo';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await el.updateComplete;
    input.focus();
    await el.updateComplete;
    await expect(el.value).toBe('foo');
  },
};

// ─── Clear button — value cleared and clear button hidden ────────────────────
export const InputValueCleared: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input>
  <span slot="label">First name</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    // Patched setter fires the input event automatically; no manual dispatch needed.
    input.value = 'foo';
    // First updateComplete: value → 'foo', hasValue set to true in updated().
    // Second updateComplete: re-render with clearBtn now in the DOM.
    await el.updateComplete;
    await el.updateComplete;

    const clearBtn = el.shadowRoot.querySelector('.clearBtn');
    clearBtn.click();
    await el.updateComplete;
    await el.updateComplete;
    await expect(el.value).toBe('');
  },
};

// ─── Password — value visible after show-password toggle ─────────────────────
export const InputPasswordRevealed: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input type="password" value="foo" required>
  <span slot="label">Password</span>
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="ariaLabel.password.show">Show</span>
  <span slot="ariaLabel.password.hide">Hide</span>
  <span slot="helpText">Please enter a secure password.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    await el.updateComplete;

    const toggle = el.shadowRoot.querySelector('.passwordBtn');
    toggle.click();
    await el.updateComplete;
    await expect(input.type).toBe('text');
  },
};

// ─── Required field — valueMissing error shown after blur ────────────────────
export const InputRequiredValidationError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input required>
  <span slot="label">Full name</span>
  <span slot="helpText">This field is required.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    input.blur();
    await new Promise((r) => setTimeout(r, 100));
    await expect(el.getAttribute('validity')).toBe('valueMissing');
  },
};

// ─── validateOnInput — pattern mismatch error shown while typing ─────────────
export const InputValidateOnInputPatternMismatch: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input
  validateOnInput
  required
  pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+"
  setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
  <span slot="label">Full Name</span>
  <span slot="helpText">Please enter your full name as it appears on the card.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    input.value = 'foo';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 100));
    await expect(el.getAttribute('validity')).toBe('patternMismatch');
  },
};

// ─── validateOnInput — error clears after valid pattern entered ──────────────
export const InputValidateOnInputValid: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input
  validateOnInput
  required
  pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+"
  setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
  <span slot="label">Full Name</span>
  <span slot="helpText">Please enter your full name as it appears on the card.</span>
</auro-input>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-input') as any;
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    // Type invalid first, then correct
    input.value = 'foo';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));
    input.value = 'foo bar';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 100));
    await expect(el.getAttribute('validity')).toBe('valid');
  },
};

// ─── Default hover pseudo-state ──────────────────────────────────────────────
export const InputHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input>
  <span slot="label">First name</span>
  <span slot="helpText">Please enter your first name.</span>
</auro-input>
  `,
};
InputHover.parameters = {
  pseudo: {
    hover: true,
  }
};

// ─── Focus-within pseudo-state on an input ───────────────────────────────────
export const InputFocusWithin: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input>
  <span slot="label">First name</span>
  <span slot="helpText">Please enter your first name.</span>
</auro-input>
  `,
};
InputFocusWithin.parameters = {
  pseudo: {
    focusWithin: true,
  },
};

// ─── Disabled state ─────────────────────────────────────────────────────────
export const InputDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input disabled>
  <span slot="label">First name</span>
  <span slot="helpText">Help text</span>
</auro-input>
  `,
};

// ─── Error state with message ────────────────────────────────────────────────
export const InputError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input error="Please enter a valid name">
  <span slot="label">First name</span>
  <span slot="helpText">Please enter your first name.</span>
</auro-input>
  `,
};

// ─── Readonly state ──────────────────────────────────────────────────────────
export const InputReadonly: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-input readonly value="Read-only value">
  <span slot="label">First name</span>
  <span slot="helpText">This field is read-only.</span>
</auro-input>
  `,
};

// ─── Inverse appearance ──────────────────────────────────────────────────────
export const InputInverse: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-input appearance="inverse">
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
</div>
  `,
};

// ─── Inverse disabled ────────────────────────────────────────────────────────
export const InputInverseDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-input appearance="inverse" disabled>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
</div>
  `,
};

// ─── Inverse error ───────────────────────────────────────────────────────────
export const InputInverseError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-input appearance="inverse" error="Custom error message">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
</div>
  `,
};
