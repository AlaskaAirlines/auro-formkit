import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit';

import { AuroCounter } from '../../src/auro-counter';
import { AuroCounterGroup } from '../../src/auro-counter-group';

AuroCounter.register(); // registering to `auro-counter`
AuroCounterGroup.register(); // registering to `auro-counter-group`

AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');

const { args, events, argTypes, template } = getStorybookHelpers('auro-counter-group');

const meta: Meta<AuroCounterGroup> = {
  title: 'Counter & Counter Group/Playground',
  component: 'auro-counter-group',
  args,
  argTypes: {
    ...argTypes,
    min: { ...argTypes.min, control: { type: 'text' } },
    max: { ...argTypes.max, control: { type: 'text' } },
  },
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

type Story = StoryObj<AuroCounterGroup & typeof args>;

export const CounterGroup: Story = {
  args: {},
  render: (args) =>
    template(
      args,
      html`
        <auro-counter> Counter 1 </auro-counter>
        <auro-counter> Counter 2 </auro-counter>
      `,
    ),
};
