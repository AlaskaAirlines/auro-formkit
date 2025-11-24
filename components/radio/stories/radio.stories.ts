import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { AuroRadio } from '../src/auro-radio';

import '@aurodesignsystem/auro-button';

AuroRadio.register(); // registering to `auro-radio`

AuroRadio.register('custom-radio');

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-radio");

const meta: Meta<AuroRadio> = {
  component: "auro-radio",
  title: 'Radio & Radio Group/Radio',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroRadio & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Label',
  },
};
