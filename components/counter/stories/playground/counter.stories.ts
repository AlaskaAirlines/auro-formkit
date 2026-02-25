import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { AuroCounter } from '../../src/auro-counter';

AuroCounter.register(); // registering to `auro-counter`

AuroCounter.register('custom-counter');

const { args, argTypes, template } =
  getStorybookHelpers<AuroCounter>('auro-counter');

const meta: Meta<AuroCounter> = {
  component: 'auro-counter',
  title: 'Counter & Counter Group/Playground',
  args,
  argTypes: {
    ...argTypes,
    min: { ...argTypes.min, control: { type: 'text' } },
    max: { ...argTypes.max, control: { type: 'text' } },
    value: { ...argTypes.value, control: { type: 'text' } },
  },
  render: (args) => template(args),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCounter & typeof args>;

export const Counter: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Label',
  },
};
