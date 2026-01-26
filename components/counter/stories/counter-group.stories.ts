import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";

import { AuroCounter } from "../src/auro-counter";
import { AuroCounterGroup } from "../src/auro-counter-group";

AuroCounter.register(); // registering to `auro-counter`
AuroCounterGroup.register(); // registering to `auro-counter-group`

AuroCounter.register("custom-counter");
AuroCounterGroup.register("custom-counter-group");

const { events, args, argTypes, template } =
  getStorybookHelpers("auro-counter-group");

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
  args: {
    'default-slot': `
<auro-counter> Counter 1 </auro-counter>
<auro-counter> Counter 2 </auro-counter>    
    `,
  },
};