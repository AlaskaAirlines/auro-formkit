/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { userEvent } from 'storybook/test';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes, template } = getStorybookHelpers("auro-input");

import { html } from 'lit-html';

import '../src/registered';
import '@aurodesignsystem/auro-button';

const meta: Meta = {
  component: 'auro-input',
  title: 'Input',
  tags: ['autodocs'],
  args,
  argTypes,
  parameters: {
  },
};
export default meta;

type Story = StoryObj;


export const FocusStateNoValue: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  play: async ({ canvas }: { canvas: any }) => {
    const input = await canvas.getByTestId('input-element')
    const focusButton = await canvas.findByShadowText('Focus here');
    const firstInput = input;
    await userEvent.click(firstInput);
    await userEvent.click(firstInput);
    await focusButton.focus();
  },
  render: () => html`
<auro-button>Focus here</auro-button>
<auro-input data-testid="input-element">
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
</auro-input>
  `
};

export const ValueMissing: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  play: async ({ canvas }: { canvas: any }) => {
    const input = await canvas.getByTestId('input-element');
    const shadowInput = canvas.getByShadowRole('input');
    await input.focus();
    await input.blur();
    await userEvent.click(shadowInput);
    await userEvent.type(shadowInput, 'Some text');
  },
  render: () => html`
<auro-button>Focus here</auro-button>
<auro-input data-testid="input-element" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
</auro-input>
  `
};
