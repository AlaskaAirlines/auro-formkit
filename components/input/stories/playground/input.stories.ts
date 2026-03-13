import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroInput } from '../../src/index';

AuroInput.register(); // registering to `auro-input`

AuroInput.register('custom-input');

const { args, argTypes, template } =
  getStorybookHelpers<AuroInput>('auro-input');

const meta: Meta<AuroInput> = {
  component: 'auro-input',
  title: 'Input/Playground',
  args,
  argTypes: argTypes,
  render: (args) => template(args),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroInput & typeof args>;

export const Input: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
