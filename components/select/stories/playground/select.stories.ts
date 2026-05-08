import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { AuroSelect } from '../../src/index';
import '../../../menu/src/registered';
import { html } from 'lit-html';

AuroSelect.register(); // registering to `auro-select`

AuroSelect.register('custom-select');

const { args, argTypes, template } =
  getStorybookHelpers<AuroSelect>('auro-select');

const meta: Meta<AuroSelect> = {
  component: 'auro-select',
  title: 'Select/Playground',
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

type Story = StoryObj<AuroSelect & typeof args>;

export const Select: Story = {
  render: (args) =>
      template(
        args,
          html`
            <span slot="ariaLabel.bib.close">Close Popup</span>
            <span slot="bib.fullscreen.headline">Bib Headline</span>
            <span slot="label">Select Example</span>
            <auro-menu>
              <auro-menuoption value="stops">Stops</auro-menuoption>
              <auro-menuoption value="price">Price</auro-menuoption>
              <auro-menuoption value="duration">Duration</auro-menuoption>
              <auro-menuoption value="departure">Departure</auro-menuoption>
              <auro-menuoption value="arrival">Arrival</auro-menuoption>
              <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
            </auro-menu>
        `,
      )
};
