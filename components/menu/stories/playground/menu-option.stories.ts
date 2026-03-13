import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroMenuOption } from '../../src/index';

AuroMenuOption.register(); // registering to `auro-menuoption`

AuroMenuOption.register('custom-menuoption');

const { args, argTypes, template } =
  getStorybookHelpers<AuroMenuOption>('auro-menuoption');

const meta: Meta<AuroMenuOption> = {
  component: 'auro-menuoption',
  title: 'Menu Option/Playground',
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

type Story = StoryObj<AuroMenuOption & typeof args>;

export const MenuOption: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
