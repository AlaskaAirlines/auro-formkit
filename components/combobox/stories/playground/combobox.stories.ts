import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroCombobox } from '../../src/index';

AuroCombobox.register(); // registering to `auro-combobox`

AuroCombobox.register('custom-combobox');

const { args, argTypes, template } =
  getStorybookHelpers<AuroCombobox>('auro-combobox');

const meta: Meta<AuroCombobox> = {
  component: 'auro-combobox',
  title: 'Combobox/Playground',
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

type Story = StoryObj<AuroCombobox & typeof args>;

export const Combobox: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
