import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";

import { AuroRadio } from '../../src/index';

const { args, argTypes, template } =
  getStorybookHelpers<AuroRadio>("auro-radio");

const meta: Meta<AuroRadio> = {
  component: "auro-radio",
  title: "Radio & Radio Group/Playground",
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroRadio & typeof args>;

export const Checkbox: Story = {
  render: (args) => template(args)
};
