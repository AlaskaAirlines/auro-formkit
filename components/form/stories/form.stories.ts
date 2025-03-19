import { Meta, StoryObj } from '@storybook/web-components';

import { html } from 'lit-html';

import { AuroForm } from '../src/auro-form';

import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-input';

AuroForm.register(); // registering to `auro-form`

AuroForm.register('custom-form');

const meta: Meta = {
  component: "auro-form",
  title: 'Form',
};
export default meta;

type Story = StoryObj;

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

