/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { userEvent } from 'storybook/test';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes, template } = getStorybookHelpers("auro-checkbox-group");

import { html } from 'lit-html';

import '../src/registered';
import '@aurodesignsystem/auro-button';

const meta: Meta = {
  component: 'auro-checkbox-group',
  subcomponents: { AuroCheckbox: 'auro-checkbox' },
  title: 'Checkbox & Checkbox Group',
  tags: ['autodocs'],
  args,
  argTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VpUz89Ov6ImBpY5YvzYbZW/Auro-toolkit?node-id=0-1066&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj;


export const HorizontalLimit: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontalLimit" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontalLimit" id="checkbox-horizontalLimit2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontalLimit" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
  <auro-checkbox value="not sure" name="horizontalLimit" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
</auro-checkbox-group>
  `
};

export const requiredCheckboxGroup: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  play: async ({ canvas }: { canvas: any }) => {
    const checkboxes = await canvas.findAllByShadowRole('checkbox');
    const focusButton = await canvas.findByShadowText('Focus here');
    const firstCheckbox = checkboxes[0];
    await userEvent.click(firstCheckbox);
    await userEvent.click(firstCheckbox);
    await focusButton.focus();
  },
  render: () => html`
<auro-checkbox-group required>
  <span slot="legend">Required checkbox</span>
  <auro-checkbox value="yes" name="required-checkbox-grp" id="checkbox-required-checkbox-grp1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="required-checkbox-grp" id="checkbox-required-checkbox-grp2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="required-checkbox-grp" id="checkbox-required-checkbox-grp3">Maybe</auro-checkbox>
  <auro-checkbox value="not sure" name="required-checkbox-grp" id="checkbox-required-checkbox-grp4">Not Sure</auro-checkbox>
</auro-checkbox-group>
<button role="button" id="focus-button">Focus here</button>
  `
};

// ─── Hover pseudo-state on a checkbox ────────────────────────────────────────
export const CheckboxHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="hoverDemo" id="checkbox-hover1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="hoverDemo" id="checkbox-hover2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="hoverDemo" id="checkbox-hover3">Maybe</auro-checkbox>
</auro-checkbox-group>
  `,
};
CheckboxHover.parameters = {
  pseudo: {
    hover: true,
  },
};

// ─── Focus-within pseudo-state on a checkbox ─────────────────────────────────
export const CheckboxFocusWithin: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="focusDemo" id="checkbox-focus1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="focusDemo" id="checkbox-focus2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="focusDemo" id="checkbox-focus3">Maybe</auro-checkbox>
</auro-checkbox-group>
  `,
};
CheckboxFocusWithin.parameters = {
  pseudo: {
    focusWithin: true,
  },
};

// ─── Checked (value selected) state ──────────────────────────────────────────
export const CheckboxChecked: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="checkedDemo" id="checkbox-checked1" checked>Yes</auro-checkbox>
  <auro-checkbox value="no" name="checkedDemo" id="checkbox-checked2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="checkedDemo" id="checkbox-checked3" checked>Maybe</auro-checkbox>
</auro-checkbox-group>
  `,
};

// ─── Disabled individual options ─────────────────────────────────────────────
export const CheckboxDisabledOptions: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="disabledOpt" id="checkbox-disOpt1">Checkbox option</auro-checkbox>
  <auro-checkbox value="no" name="disabledOpt" id="checkbox-disOpt2" checked disabled>Disabled checked</auro-checkbox>
  <auro-checkbox value="maybe" name="disabledOpt" id="checkbox-disOpt3" disabled>Disabled unchecked</auro-checkbox>
  <auro-checkbox value="sure" name="disabledOpt" id="checkbox-disOpt4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `,
};

// ─── Entire group disabled ───────────────────────────────────────────────────
export const CheckboxGroupDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="disabledGrp" id="checkbox-disGrp1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="disabledGrp" id="checkbox-disGrp2" checked>No</auro-checkbox>
  <auro-checkbox value="maybe" name="disabledGrp" id="checkbox-disGrp3">Maybe</auro-checkbox>
</auro-checkbox-group>
  `,
};

// ─── Error state on group ────────────────────────────────────────────────────
export const CheckboxGroupError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="errorGrp" id="checkbox-errGrp1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="no" name="errorGrp" id="checkbox-errGrp2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="maybe" name="errorGrp" id="checkbox-errGrp3" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
  `,
};

// ─── Inverse appearance ──────────────────────────────────────────────────────
export const CheckboxInverse: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-checkbox-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="yes" name="inverseGrp" id="checkbox-inv1">Checkbox option</auro-checkbox>
    <auro-checkbox value="no" name="inverseGrp" id="checkbox-inv2" checked>Checkbox option</auro-checkbox>
    <auro-checkbox value="maybe" name="inverseGrp" id="checkbox-inv3">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
</div>
  `,
};

// ─── Inverse disabled ────────────────────────────────────────────────────────
export const CheckboxInverseDisabled: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-checkbox-group appearance="inverse" disabled>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="yes" name="invDisGrp" id="checkbox-invDis1">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="no" name="invDisGrp" id="checkbox-invDis2" checked>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="maybe" name="invDisGrp" id="checkbox-invDis3">Disabled checkbox option</auro-checkbox>
  </auro-checkbox-group>
</div>
  `,
};

// ─── Inverse error ───────────────────────────────────────────────────────────
export const CheckboxInverseError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-checkbox-group appearance="inverse" error="custom error">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="yes" name="invErrGrp" id="checkbox-invErr1">Error checkbox option</auro-checkbox>
    <auro-checkbox value="no" name="invErrGrp" id="checkbox-invErr2">Error checkbox option</auro-checkbox>
    <auro-checkbox value="maybe" name="invErrGrp" id="checkbox-invErr3" checked>Error checkbox option</auro-checkbox>
  </auro-checkbox-group>
</div>
  `,
};
