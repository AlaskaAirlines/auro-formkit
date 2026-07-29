import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit-html';

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

export const Dropdown: Story = {
  render: (args) =>
    template(
      args,
      html`
        <div slot="trigger">Trigger</div>
        <div>Dropdown content</div>
      `,
    ),
};
