import { Meta, StoryObj } from "@storybook/web-components";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { AuroCounter } from "../src/auro-counter";

AuroCounter.register(); // registering to `auro-counter`

AuroCounter.register("custom-counter");

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-counter");

const meta: Meta<AuroCounter> = {
  component: "auro-counter",
  title: "Counter & Counter Group/Counter ",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCounter & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Label',
  },
};