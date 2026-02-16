/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { userEvent } from 'storybook/test';
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
