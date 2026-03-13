import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroSelect } from '../../src/index';

AuroSelect.register(); // registering to `auro-select`

AuroSelect.register('custom-select');

const { args, argTypes, template } =
  getStorybookHelpers<AuroSelect>('auro-select');

const meta: Meta<AuroSelect> = {
  component: 'auro-select',
  title: 'Select/Playground',
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

type Story = StoryObj<AuroSelect & typeof args>;

export const Select: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
