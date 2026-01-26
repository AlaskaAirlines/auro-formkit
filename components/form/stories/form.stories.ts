import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";

import { html } from 'lit-html';

import { AuroForm } from '../src/auro-form';

import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-input';

AuroForm.register(); // registering to `auro-form`

AuroForm.register('custom-form');

const { events, args, argTypes, template } =
  getStorybookHelpers("auro-form");

const meta: Meta<AuroForm> = {
  component: "auro-form",
  title: 'Form',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
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

// TODO: Confirm functionality
export const Basic: Story = {
  render: () => html`
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>

  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `
};

