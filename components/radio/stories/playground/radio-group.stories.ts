import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit";

import '../../src/registered';
import { AuroRadioGroup } from '../../src/index';

const { args, events, argTypes, template } = getStorybookHelpers("auro-radio-group");

const meta: Meta<AuroRadioGroup> = {
  title: "Radio & Radio Group/Playground",
  component: "auro-radio-group",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroRadioGroup & typeof args>;

export const RadioGroup: Story = {
  args: {},
  render: (args) =>
    template(
      args,
      html`
        <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
        <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
        <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
      `,
    )
};
