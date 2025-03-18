import { Meta, StoryObj } from '@storybook/web-components';

import { html } from 'lit-html';

import { AuroRadio } from '../src/auro-radio';
import { AuroRadioGroup } from '../src/auro-radio-group';

import '@aurodesignsystem/auro-button';

AuroRadio.register(); // registering to `auro-radio`
AuroRadioGroup.register(); // registering to `auro-radio-group`

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

const meta: Meta = {
  component: "auro-radio-group",
  title: 'Radio & Radio Group',
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  `
};

export const BasicGroup: Story = {
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const Checked: Story = {
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
  <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
  <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
</auro-radio-group>
  `
};

export const Disabled: Story = {
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
  <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>

<auro-radio-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const Error: Story = {
  render: () => html`
<auro-radio-group error="There is an error with this form entry">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const Horizontal: Story = {
  render: () => html`
<auro-radio-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const Required: Story = {
  render: () => html`
<auro-radio-group required setCustomValidityValueMissing="value missing">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const OptionalLabel: Story = {
  render: () => html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <span slot="optionalLabel">(add custom label here)</span>
  <auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const radioGroup: AuroRadioGroup | null = document.querySelector('#resetStateExample');
      radioGroup?.reset();
    };

    return html`
<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
<br/><br/>

<auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
    `
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: How to translate this to template expressions
//       (https://lit.dev/docs/templates/expressions/#event-listener-expressions),
//       as in checkboxStories.ResetState?
export const Dynamic: Story = {
  render: () => `
<auro-radio-group required id="dynamicExample">
  <span slot="legend">Form label goes here</span>
</auro-radio-group>

<script>
  (function() {
    const values = ['Yes', 'No', 'Maybe'];
    const radioGroup = document.getElementById('dynamicExample');

    for (let i = 0; i < values.length; i++) {
      const radio = document.createElement('auro-radio');
      
      radio.id = \`dynamicRadio\${i}\`;
      radio.label = values[i];
      radio.name = 'radioDemo';
      radio.value = values[i];
      radio.textContent = values[i];

      radioGroup.appendChild(radio);
    }
  })();
</script>
  `
};

export const CustomRadio: Story = {
  render: () => html`
<custom-radio-group>
  <span slot="legend">Form label goes here</span>
  <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
  <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
  <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
</custom-radio-group>
  `
};