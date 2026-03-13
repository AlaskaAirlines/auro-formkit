import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import '../../../menu/src/registered';
import { AuroCombobox } from '../../src/index';
import { html } from 'lit-html';

AuroCombobox.register(); // registering to `auro-combobox`

AuroCombobox.register('custom-combobox');

const { args, argTypes, template } =
  getStorybookHelpers<AuroCombobox>('auro-combobox');

const meta: Meta<AuroCombobox> = {
  component: 'auro-combobox',
  title: 'Combobox/Playground',
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

type Story = StoryObj<AuroCombobox & typeof args>;

export const Combobox: Story = {
  render: (args) =>
    template(
      args,
        html`
          <span slot="ariaLabel.bib.close">Close combobox</span>
          <span slot="ariaLabel.input.clear">Clear All</span>
          <span slot="bib.fullscreen.headline">Bib Header</span>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          </auro-menu>
      `,
    )
};
