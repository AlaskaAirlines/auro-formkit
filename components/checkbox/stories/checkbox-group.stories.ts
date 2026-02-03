import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit";

import { AuroCheckbox, AuroCheckboxGroup } from "../src/index";

AuroCheckbox.register(); // registering to `auro-checkbox`
AuroCheckboxGroup.register(); // registering to `auro-checkbox-group`

AuroCheckbox.register("custom-checkbox");
AuroCheckboxGroup.register("custom-checkbox-group");

const { args, events, argTypes, template } = getStorybookHelpers("auro-checkbox-group");

const meta: Meta<AuroCheckboxGroup> = {
  title: "Checkbox & Checkbox Group/Playground",
  component: "auro-checkbox-group",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VpUz89Ov6ImBpY5YvzYbZW/Auro-toolkit?node-id=0-1066&m=dev',
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCheckboxGroup & typeof args>;

export const CheckboxGroup: Story = {
  args: {},
  render: (args) =>
    template(
      args,
      html`
        <auro-checkbox value="value1" name="basic" id="checkbox-basic1"
          >Checkbox option</auro-checkbox
        >
        <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked
          >Checkbox option</auro-checkbox
        >
        <auro-checkbox value="value3" name="basic" id="checkbox-basic3"
          >Checkbox option</auro-checkbox
        >
        <auro-checkbox value="value4" name="basic" id="checkbox-basic4"
          >Checkbox option</auro-checkbox
        >
      `,
    )
};
