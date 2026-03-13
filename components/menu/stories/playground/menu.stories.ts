import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroMenu, AuroMenuOption } from '../../src/index';

AuroMenu.register(); // registering to `auro-menu`
AuroMenuOption.register(); // registering to `auro-menu-option`

AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menuoption');

const { args, argTypes, template } =
  getStorybookHelpers<AuroMenu>('auro-menu');

const meta: Meta<AuroMenu> = {
  component: 'auro-menu',
  subcomponents: {
    'auro-menuoption': 'AuroMenuOption',
  },
  title: 'Menu/Playground',
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

type Story = StoryObj<AuroMenu & typeof args>;

export const Menu: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
