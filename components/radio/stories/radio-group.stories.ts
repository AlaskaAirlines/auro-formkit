import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";

import { AuroRadio } from '../src/auro-radio';
import { AuroRadioGroup } from '../src/auro-radio-group';

import '@aurodesignsystem/auro-button';

AuroRadio.register(); // registering to `auro-radio`
AuroRadioGroup.register(); // registering to `auro-radio-group`

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

const { events, args, argTypes, template } =
  getStorybookHelpers("auro-radio-group");

const meta: Meta<AuroRadioGroup> = {
  component: "auro-radio",
  title: 'Radio & Radio Group/Radio Group',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroRadioGroup & typeof args>;

export const Playground: Story = {
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
