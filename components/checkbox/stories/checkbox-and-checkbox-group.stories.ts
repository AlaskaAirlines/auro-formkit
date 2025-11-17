import { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';

import { html } from 'lit-html';

import { AuroCheckbox } from '../src/auro-checkbox';
import { AuroCheckboxGroup } from '../src/auro-checkbox-group';

import '@aurodesignsystem/auro-button';

AuroCheckbox.register(); // registering to `auro-checkbox`
AuroCheckboxGroup.register(); // registering to `auro-checkbox-group`

AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');

const meta: Meta = {
  component: "auro-checkbox-group",
  title: 'Checkbox & Checkbox Group',
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `
};

export const DisabledGroup: Story = {
  render: () => html`
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
  `
};

export const DisabledCheckboxWithinGroup: Story = {
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `
};

export const Required: Story = {
  render: () => html`
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `,
  async play({ canvas }) {
    const checkboxes = await canvas.findAllByShadowRole('checkbox');
    const firstCheckbox = checkboxes[0];
    await userEvent.click(firstCheckbox);
    await userEvent.click(firstCheckbox);
  }
};

export const ErrorGroup: Story = {
  render: () => html`
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
  `
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const checkboxGroup: AuroCheckboxGroup | null = document.querySelector('#resetStateExample');
        checkboxGroup?.reset();
    };

    return html`
<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
<br/><br/>

<auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="resetState" id="checkbox-basic1" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
    `
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    const button = await canvas.findByShadowRole('button', { name: /Reset/i });
    await userEvent.click(button);

    const firstCheckbox = (await canvas.findAllByShadowRole('checkbox'))[0];
    expect(firstCheckbox).not.toBeChecked();
  }
};

export const Horizontal: Story = {
  render: () => html`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
  `
};

export const HorizontalLimit: Story = {
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

export const CustomCheckbox: Story = {
  render: () => html`
<custom-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
</custom-checkbox-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};