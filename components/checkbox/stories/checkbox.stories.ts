import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { AuroCheckbox } from '../src/auro-checkbox';

AuroCheckbox.register(); // registering to `auro-checkbox`

AuroCheckbox.register('custom-checkbox');

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-checkbox");

const meta: Meta<AuroCheckbox> = {
  component: "auro-checkbox",
  title: 'Checkbox & Checkbox Group/Checkbox',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCheckbox & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {},
};
