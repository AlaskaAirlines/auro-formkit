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