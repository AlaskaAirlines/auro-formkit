import { Meta, StoryObj } from '@storybook/web-components';

import { html } from 'lit-html';

import { AuroInput } from '../src/auro-input';

import '@aurodesignsystem/auro-button';

AuroInput.register(); // registering to `auro-input`

AuroInput.register('custom-input');

const meta: Meta = {
  component: "auro-input",
  title: 'Input',
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
<auro-input bordered></auro-input>
  `
};

export const Disabled: Story = {
  render: () => html`
<auro-input disabled bordered type="date">
  <span slot="label">Arrival date</span>
</auro-input>
  `
};

export const Placeholder: Story = {
  render: () => html`
<auro-input placeholder="John Doe" bordered required>
  <span slot="label">Full name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `
};

export const ProgrammaticValue: Story = {
  render: () => html`
<auro-input value="Alaska Airlines is the best!" bordered>
  <span slot="label">Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `
};

export const Value: Story = {
  render: () => {
    function handleSetValueClick() {
      const input: AuroInput | null = document.querySelector('#setProgrammaticValueExample');
      if (input) input.value = "Alaska Airlines is the best";
    }

    function handleSetResetValueClick() {
      const input: AuroInput | null = document.querySelector('#setProgrammaticValueExample');
      if (input) input.value = undefined;
    }
    
    return html`
<auro-button id="setValidValueBtn" @click="${handleSetValueClick}">Set Value to Alaska</auro-button>
<auro-button id="setUndefinedValueBtn" @click="${handleSetResetValueClick}">Set Value to Undefined</auro-button>
<br /><br />
<auro-input id="setProgrammaticValueExample" value="Press one of the buttons above!" bordered>
  <span slot="label">Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const MaxDate: Story = {
  render: () => html`
<auro-input type="date" max="03/25/2023" setCustomValidityRangeOverflow="The selected date is past the defined maximum date." bordered>
  <span slot="label">Choose a date</span>
</auro-input>
  `
};

export const MaxNumber: Story = {
  render: () => html`
<auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum." bordered>
  <span slot="label">Choose a number</span>
</auro-input>
  `
};

export const MinDate: Story = {
  render: () => html`
<auro-input type="date" min="03/25/2023" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date." bordered>
  <span slot="label">Choose a date</span>
</auro-input>
  `
};

export const MinNumber: Story = {
  render: () => html`
<auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum." bordered>
  <span slot="label">Choose a number</span>
</auro-input>
  `
};

export const MaxLength: Story = {
  render: () => html`
<auro-input maxlength="12" setCustomValidityTooLong="Oops! There were too many characters entered." bordered required>
  <span slot="label">Voucher Code</span>
  <span slot="helptext">Please enter your 12 character voucher code.</span>
</auro-input>
  `
};

export const MinLength: Story = {
  render: () => html`
<auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." bordered required>
  <span slot="label">Voucher Code</span>
  <span slot="helptext">Please enter your 4 character voucher code.</span>
</auro-input>
  `
};

export const Pattern: Story = {
  render: () => html`
<auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Only contain lowercase letters w/no spaces" bordered>
  <span slot="label">Username</span>
  <span slot="helptext">Please enter a username.</span>
</auro-input>
  `
};

export const Readonly: Story = {
  render: () => {
    function handleSetValueClick() {
      const input: AuroInput | null = document.querySelector('#readonlyExample');
      if (input) input.value = "Auro Alaska";
    }

    function handleSetResetValueClick() {
      const input: AuroInput | null = document.querySelector('#readonlyExample');
      if (input) input.value = undefined;
    }
    
    return html`
<auro-button id="setReadonlyValueBtn" @click="${handleSetValueClick}">Set Value to Auro Alaska</auro-button>
<auro-button id="resetReadonlyValueBtn" @click="${handleSetResetValueClick}">Reset</auro-button>
<br /><br />
<auro-input readonly bordered id="readonlyExample">
  <span slot="label">Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const ActiveLabel: Story = {
  render: () => html`
<auro-input activeLabel bordered>
  <span slot="label">Address</span>
  <span slot="helptext">Please enter your home address.</span>
</auro-input>
  `
};

export const NoValidate: Story = {
  render: () => html`
<auro-input noValidate required bordered>
  <span slot="label">Address</span>
  <span slot="helptext">Please enter your home address.</span>
</auro-input>
  `
};

export const Format: Story = {
  render: () => html`
<auro-input bordered format="47440000"></auro-input>
  `
};

export const Required: Story = {
  render: () => html`
<auro-input required bordered placeholder="John Doe">
  <span slot="label">Full name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `
};

export const ValidateOnInput: Story = {
  render: () => html`
<auro-input validateOnInput bordered required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
  <span slot="label">Full Name</span>
  <span slot="helptext">Please enter your full name as it appears on the card.</span>
</auro-input>
  `
};

export const SetCustomValidity: Story = {
  render: () => html`
<auro-input bordered required minlength="3" setCustomValidity="Sorry, please enter your first and last name (one space required).">
  <span slot="label">Full Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `
};

export const Error: Story = {
  render: () => {
    function handleSetErrorClick() {
      const input: AuroInput | null = document.querySelector('#setCustomErrorExample');
      input?.removeAttribute('error');
      input?.setAttribute('error', 'Custom Error Message');
    }

    function handleClearErrorClick() {
      const input: AuroInput | null = document.querySelector('#setCustomErrorExample');
      input?.removeAttribute('error');
    }
    
    return html`
<auro-button id="setCustomErrorBtn" @click="${handleSetErrorClick}">Set Custom Error</auro-button>
<auro-button id="setCustomErrorClearBtn" @click="${handleClearErrorClick}">Clear Custom Error</auro-button>
<br /><br />
<auro-input id="setCustomErrorExample" error="Initial error attribute value" bordered>
  <span slot="label">Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Password: Story = {
  render: () => html`
<auro-input type="password" required bordered>
  <span slot="label">Password</span>
  <span slot="helptext">Please enter a secure password.</span>
</auro-input>
  `
};

export const Email: Story = {
  render: () => html`
<auro-input type="email" bordered required>
  <span slot="label">Email address</span>
  <span slot="helptext">Please enter your email address.</span>
</auro-input>
  `
};

export const Number: Story = {
  render: () => html`
<auro-input type="number" bordered required>
  <span slot="label">Number of Passengers</span>
  <span slot="helptext">Please enter the number of passengers.</span>
</auro-input>
  `
};

export const CreditCard: Story = {
  render: () => html`
<auro-input type="credit-card" bordered required>
  <span slot="label">Card number</span>
  <span slot="helptext">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
  `
};

export const CreditCardIcon: Story = {
  render: () => html`
<auro-input icon type="credit-card" bordered required>
  <span slot="label">Card number</span>
  <span slot="helptext">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
  `
};

export const Tel: Story = {
  render: () => html`
<auro-input type="tel" bordered></auro-input>
  `
};

export const TelFormat: Story = {
  render: () => html`
<auro-input type="tel" format="+22 999 99 9999" bordered></auro-input>
  `
};

export const MonthDayYear: Story = {
  render: () => html`
<auro-input type="date" bordered>
  <span slot="label">Arrival date</span>
</auro-input>
  `
};

export const YearMonthDay: Story = {
  render: () => html`
<auro-input type="date" format="yyyy/mm/dd" bordered>
  <span slot="label">Arrival date</span>
</auro-input>
  `
};

export const MonthYear: Story = {
  render: () => html`
<auro-input type="date" format="mm/yy" bordered>
  <span slot="label">Expiration date</span>
</auro-input>
  `
};

export const Day: Story = {
  render: () => html`
<auro-input type="date" format="dd" bordered>
  <span slot="label">Day</span>
</auro-input>
  `
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const input: AuroInput | null = document.querySelector('#resetStateExample');
        input?.reset();
    };

    return html`
<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
<br /><br />
<auro-input id="resetStateExample" bordered minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!">
  <span slot="label">Full Name</span>
  <span slot="helptext">Please enter your full name.</span>
</auro-input>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const SwapValue: Story = {
  render: () => {
    function handleClick() {
      const inputOne: AuroInput | null = document.querySelector('#swapExampleLeft');
      const inputTwo: AuroInput | null = document.querySelector('#swapExampleRight');

      if (inputOne && inputTwo) {
        const valueOne = inputOne.value;
        const valueTwo = inputTwo.value;
    
        inputOne.value = valueTwo;
        inputTwo.value = valueOne;
      }
    }

    return html`
<div id="swapExampleWrapper">
  <auro-input id="swapExampleLeft" bordered>
    <span slot="label">Left Input</span>
  </auro-input>
  <auro-button id="swapExampleBtn" @click="${handleClick}">Swap Values</auro-button>
  <auro-input id="swapExampleRight" bordered>
    <span slot="label">Right Input</span>
  </auro-input>
</div>

<style>
  #swapExampleWrapper {
    align-items: center;
    display: flex;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    width: unset;
    margin: 0 var(--auro-size-xs);
  }
</style>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Custom: Story = {
  render: () => html`
<custom-input bordered></custom-input>
  `
}