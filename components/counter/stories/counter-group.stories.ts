import { Meta, StoryObj } from "@storybook/web-components";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { AuroCounter } from "../src/auro-counter";
import { AuroCounterGroup } from "../src/auro-counter-group";

AuroCounter.register(); // registering to `auro-counter`
AuroCounterGroup.register(); // registering to `auro-counter-group`

AuroCounter.register("custom-counter");
AuroCounterGroup.register("custom-counter-group");

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-counter-group");

const meta: Meta<AuroCounterGroup> = {
  component: "auro-counter-group",
  title: "Counter & Counter Group/Counter Group",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCounterGroup & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {},
};