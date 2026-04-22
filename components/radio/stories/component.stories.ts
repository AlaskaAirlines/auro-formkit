/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes, template } = getStorybookHelpers("auro-radio-group");

import { html } from 'lit-html';

import '../src/registered';
import { AuroRadio, AuroRadioGroup } from '../src/index';
import '@aurodesignsystem/auro-button';

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

const meta: Meta = {
  component: 'auro-radio-group',
  subcomponents: { AuroRadio: 'auro-radio' },
  title: 'Radio & Radio Group',
  tags: ['autodocs'],
  args,
  argTypes
};
export default meta;

type Story = StoryObj;

export const resetState: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  play: async ({ canvas }: { canvas: any }) => {
    const radioGroup = await canvas.getByTestId('radio-group-reset');
    const radios = await canvas.findAllByShadowRole('radio');
    const firstRadio = radios[0];
    await userEvent.click(firstRadio);
    radioGroup.reset();
  },
  render: () => html`
    <auro-radio-group data-testid="radio-group-reset">
      <span slot="legend">Form label goes here</span>
      <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
      <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
      <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
    </auro-radio-group>
  `
};

// ─── Click selects the clicked radio and sets group value ────────────────────
export const RadioClickSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-radio-group') as any;
    const radio1 = canvasElement.querySelector('#radio1') as any;
    radio1.shadowRoot.querySelector('input').click();
    await el.updateComplete;
    await expect(radio1.hasAttribute('checked')).toBe(true);
    await expect(el.value).toBe('yes');
  },
};

// ─── Selecting a second radio deselects the first ────────────────────────────
export const RadioChangeSelectionDeselectionsPrevious: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-radio-group') as any;
    const radio1 = canvasElement.querySelector('#radio1') as any;
    const radio2 = canvasElement.querySelector('#radio2') as any;
    radio1.shadowRoot.querySelector('input').click();
    await el.updateComplete;
    radio2.shadowRoot.querySelector('input').click();
    await el.updateComplete;
    await expect(radio1.hasAttribute('checked')).toBe(false);
    await expect(radio2.hasAttribute('checked')).toBe(true);
    await expect(el.value).toBe('no');
  },
};

// ─── Space keydown on a focused radio selects it ─────────────────────────────
export const RadioKeyboardSelectsWithSpace: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-radio-group') as any;
    const radio1 = canvasElement.querySelector('#radio1') as any;
    // Focus the first radio's shadow input so the group tracks it at index 0
    radio1.shadowRoot.querySelector('input').focus();
    await el.updateComplete;
    // Dispatch Space on the group — group.handleKeyDown calls selectItem(this.index)
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
    await el.updateComplete;
    await expect(radio1.hasAttribute('checked')).toBe(true);
  },
};

// ─── Required group shows validation error after focus then blur ─────────────
export const RadioRequiredValidationError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group required>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-radio-group') as any;
    const radio1 = canvasElement.querySelector('#radio1') as any;
    const shadowInput = radio1.shadowRoot.querySelector('input') as HTMLInputElement;
    shadowInput.focus();
    await el.updateComplete;
    // shadowInput.blur() fires blur with composed:false, which does NOT propagate
    // across the shadow boundary to the auro-radio host's blur listener.
    // Dispatching blur directly on the host triggers handleBlur → auroRadio-blur
    // → handleRadioBlur on group → validation.validate().
    radio1.dispatchEvent(new Event('blur'));
    await new Promise((r) => setTimeout(r, 100));
    await el.updateComplete;
    await expect(el.validity).toBe('valueMissing');
  },
};

// ─── Hover pseudo-state on a radio option ────────────────────────────────────
export const RadioOptionHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};
RadioOptionHover.parameters = {
  pseudo: {
    hover: true,
  },
};

// ─── Focus-within pseudo-state on a radio group ──────────────────────────────
export const RadioFocusWithin: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio-focus1" label="Yes" name="focusDemo" value="yes"></auro-radio>
  <auro-radio id="radio-focus2" label="No" name="focusDemo" value="no"></auro-radio>
  <auro-radio id="radio-focus3" label="Maybe" name="focusDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};
RadioFocusWithin.parameters = {
  pseudo: {
    focusWithin: true,
  },
};

// ─── Pre-selected (value entered) state ─────────────────────────────────────
export const RadioPreSelected: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio-pre1" label="Yes" name="preDemo" value="yes"></auro-radio>
  <auro-radio id="radio-pre2" label="No" name="preDemo" value="no" checked></auro-radio>
  <auro-radio id="radio-pre3" label="Maybe" name="preDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};

// ─── Disabled individual option ──────────────────────────────────────────────
export const RadioDisabledOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio-disOpt1" label="Yes" name="disOptDemo" value="yes"></auro-radio>
  <auro-radio id="radio-disOpt2" label="No" name="disOptDemo" value="no" disabled></auro-radio>
  <auro-radio id="radio-disOpt3" label="Maybe" name="disOptDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};

// ─── Entire group disabled ───────────────────────────────────────────────────
export const RadioGroupDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio-disGrp1" label="Yes" name="disGrpDemo" value="yes"></auro-radio>
  <auro-radio id="radio-disGrp2" label="No" name="disGrpDemo" value="no" checked></auro-radio>
  <auro-radio id="radio-disGrp3" label="Maybe" name="disGrpDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};

// ─── Error state on group ────────────────────────────────────────────────────
export const RadioGroupError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-radio-group error="There is an error with this form entry">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio-err1" label="Yes" name="errDemo" value="yes"></auro-radio>
  <auro-radio id="radio-err2" label="No" name="errDemo" value="no"></auro-radio>
  <auro-radio id="radio-err3" label="Maybe" name="errDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `,
};

// ─── Inverse appearance ──────────────────────────────────────────────────────
export const RadioInverse: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio-inv1" label="Yes" name="invDemo" value="yes"></auro-radio>
    <auro-radio id="radio-inv2" label="No" name="invDemo" value="no"></auro-radio>
    <auro-radio id="radio-inv3" label="Maybe" name="invDemo" value="maybe"></auro-radio>
  </auro-radio-group>
</div>
  `,
};

// ─── Inverse with pre-selected ───────────────────────────────────────────────
export const RadioInverseChecked: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio-invChk1" label="Yes" name="invChkDemo" value="yes"></auro-radio>
    <auro-radio id="radio-invChk2" label="No" name="invChkDemo" value="no" checked></auro-radio>
    <auro-radio id="radio-invChk3" label="Maybe" name="invChkDemo" value="maybe"></auro-radio>
  </auro-radio-group>
</div>
  `,
};

// ─── Inverse disabled ────────────────────────────────────────────────────────
export const RadioInverseDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-radio-group appearance="inverse" disabled>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio-invDis1" label="Yes" name="invDisDemo" value="yes"></auro-radio>
    <auro-radio id="radio-invDis2" label="No" name="invDisDemo" value="no" checked></auro-radio>
    <auro-radio id="radio-invDis3" label="Maybe" name="invDisDemo" value="maybe"></auro-radio>
  </auro-radio-group>
</div>
  `,
};

// ─── Inverse error ───────────────────────────────────────────────────────────
export const RadioInverseError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-radio-group appearance="inverse" error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio-invErr1" label="Yes" name="invErrDemo" value="yes"></auro-radio>
    <auro-radio id="radio-invErr2" label="No" name="invErrDemo" value="no"></auro-radio>
    <auro-radio id="radio-invErr3" label="Maybe" name="invErrDemo" value="maybe"></auro-radio>
  </auro-radio-group>
</div>
  `,
};
