import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";

import { AuroCheckbox } from "../src/auro-checkbox";

AuroCheckbox.register(); // registering to `auro-checkbox`

AuroCheckbox.register("custom-checkbox");

const { args, argTypes, template } =
  getStorybookHelpers<AuroCheckbox>("auro-checkbox");

const meta: Meta<AuroCheckbox> = {
  component: "auro-checkbox",
  title: "Checkbox & Checkbox Group/Playground",
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

type Story = StoryObj<AuroCheckbox & typeof args>;

export const Checkbox: Story = {
  render: (args) => template(args),
  args: {
    "default-slot": "Label",
    checked: null,
  },
};
