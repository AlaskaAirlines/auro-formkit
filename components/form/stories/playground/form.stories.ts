import { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit";

import { AuroForm } from "../../src/index";
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroDatePicker } from '@aurodesignsystem/auro-datepicker';
import '@aurodesignsystem/auro-button';

AuroForm.register(); // registering to `auro-form`
AuroForm.register("custom-form");

AuroInput.register(); // registering to `auro-input`
AuroInput.register("auro-input-two");

AuroDatePicker.register(); // registering to `auro-datepicker`

const { args, argTypes, template, events } = getStorybookHelpers("auro-form");

const meta: Meta<AuroForm> = {
  title: "Form/Playground",
  component: "auro-form",
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

type Story = StoryObj<AuroForm & typeof args>;

export const Playground: Story = {
  args: {},
  render: (args) =>
    template(
      args,
      html`
        <auro-input id="search-box" name="searchBox" required>
          <span slot="label">Search flights</span>
        </auro-input>
        <auro-button type="submit">Submit</auro-button>
      `,
    )
};
