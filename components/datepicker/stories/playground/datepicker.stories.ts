import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroDatePicker } from '../../src/index';

AuroDatePicker.register(); // registering to `auro-datepicker`

const { args, argTypes, template } =
  getStorybookHelpers<AuroDatePicker>('auro-datepicker');

const meta: Meta<AuroDatePicker> = {
  component: 'auro-datepicker',
  title: 'DatePicker/Playground',
  args,
  argTypes: argTypes,
  render: (args) => template(args),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroDatePicker & typeof args>;

export const DatePicker: Story = {
  render: (args) => template(args),
  // args: {
  //   'default-slot': 'Label',
  // },
};
