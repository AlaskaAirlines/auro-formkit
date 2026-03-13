import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroDropdown } from '../../src/index';

AuroDropdown.register(); // registering to `auro-dropdown`

AuroDropdown.register('custom-dropdown');

const { args, argTypes, template } =
  getStorybookHelpers<AuroDropdown>('auro-dropdown');

const meta: Meta<AuroDropdown> = {
  component: 'auro-dropdown',
  title: 'Dropdown/Playground',
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

type Story = StoryObj<AuroDropdown & typeof args>;

export const Combobox: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
