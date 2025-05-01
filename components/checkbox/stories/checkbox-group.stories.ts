import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { AuroCheckbox } from '../src/auro-checkbox';
import { AuroCheckboxGroup } from '../src/auro-checkbox-group';

AuroCheckbox.register(); // registering to `auro-checkbox`
AuroCheckboxGroup.register(); // registering to `auro-checkbox-group`

AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-checkbox-group");

const meta: Meta<AuroCheckboxGroup> = {
  component: "auro-checkbox-group",
  title: 'Checkbox & Checkbox Group/Checkbox Group',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCheckboxGroup & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': `
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
    `,
  },
};
