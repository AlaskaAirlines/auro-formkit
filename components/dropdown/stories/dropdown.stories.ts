import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { html } from 'lit-html';

import { AuroDropdown } from '../src/auro-dropdown';

import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-icon';
import '@aurodesignsystem/auro-input';

AuroDropdown.register(); // registering to `auro-dropdown`

AuroDropdown.register('custom-dropdown');

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-dropdown");

const meta: Meta<AuroDropdown> = {
  component: "auro-dropdown",
  title: 'Dropdown',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroDropdown & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Lorem ipsum solar',
    'trigger-slot': 'Trigger',
  },
};

export const Basic: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const BasicIcon: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  `
};

export const BasicButton: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  `
};

export const Bordered: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const Chevron: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const ChevronIcon: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  `
};

export const ChevronButton: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  `
};

export const ChevronInput: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  `
};

export const Disabled: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" disabled>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const DisabledAll: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  rounded
  inset
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Helper text
  </span>
  <span slot="label">
    Name
  </span>
</auro-dropdown>
  `
};

export const Error: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" error>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const ErrorBordered: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  inset
  error
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

// TODO: Confirm functionality
export const Fluid: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" fluid>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      borderless
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  `
};

export const Inset: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" inset>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const InsetBordered: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  inset
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const Rounded: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const NoToggle: Story = {
  render: () => html`
<auro-dropdown aria-label="custom label" noToggle>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const CustomDimensions300: Story = {
  render: () => html`
<div style="width: 300px;" aria-label="custom label">
  <auro-dropdown id="customDropdown300" inset bordered rounded chevron fullscreenBreakpoint="sm">
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown300::part(size) {
    width: 300px;
    max-height: 200px;
  }
</style>
  `
};

export const Label: Story = {
  render: () => html`
<auro-dropdown
  bordered
  rounded
  inset
  chevron>
  Lorem ipsum solar
  <span slot="label">Name</span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const HelpText: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const HelpTextError: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded
  error>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

// TODO: Confirm functionality
export const ProgramaticallyShow: Story = {
  render: () => {    
    function handleKeydown(event) {
      const dropdownElem: AuroDropdown | null = document.querySelector('#showMethodExample');
      dropdownElem?.show();
    }
    
    return html`
<auro-input id="showExampleTriggerInput" @keydown="${handleKeydown}" required>
  <span slot="label">Enter a value to show the dropdown</span>
</auro-input>

<auro-dropdown id="showMethodExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <span slot="trigger">Trigger Label</span>
</auro-dropdown>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const ProgramaticallyHide: Story = {
  render: () => {
    function handleClick() {
      const dropdown: AuroDropdown | null = document.querySelector('#hideExample');
      dropdown?.hide();
    }
    
    return html`
<auro-dropdown id="hideExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <auro-button id="hideExampleBtn" @click="${handleClick}">
    Dismiss Dropdown
  </auro-button>
  <auro-input
    slot="trigger"
    id="hideExampleTrigger">
  </auro-input>
</auro-dropdown>
  `}
};

export const CustomDimensions100: Story = {
  render: () => html`
<div style="width: 100px;" aria-label="custom label">
  <auro-dropdown id="customDropdown100" inset bordered rounded chevron>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown100::part(size) {
    width: 100px;
    max-height: 200px;
  }
</style>
  `
};

export const TruncatedText: Story = {
  render: () => html`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      I really prefer Alaska Airlines for my vacation travels
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      I really prefer Alaska Airlines for my vacation travels
    </div>
  </auro-dropdown>
</div>
  `
};

// TODO: How to register auro-dialog?
export const InDialog: Story = {
  render: () => {
    function handleClick() {
      const dialog = document.querySelector('#dropdown-dialog');
      dialog.open = true;
    }

    return html`
<div>
  <auro-button id="dropdown-dialog-opener" @click="${handleClick}">Dropdown in Dialog</auro-button>

  <auro-dialog id="dropdown-dialog">
    <span slot="header">Dropdown in Dialog</span>
    <div slot="content">
      <auro-dropdown id="commonSlot" common bordered rounded inset chevron>
        <div style="padding: var(--ds-size-150);">
          Lorem ipsum solar
          <br />
          <auro-button onclick="document.querySelector('#commonSlot').hide()">
            Dismiss Dropdown
          </auro-button>
        </div>
        <span slot="helpText">
          Help text
        </span>
        <span slot="label">
          Element label (default text will be read by screen reader)
        </span>
        <div slot="trigger">
          Dropdown Trigger in Dialog
        </div>
      </auro-dropdown>
    </div>
  </auro-dialog>
</div>  
  `}
};

export const Common: Story = {
  render: () => html`
<auro-dropdown id="common" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const CommonLabeledBy: Story = {
  render: () => html`
<p id="foo">The element is labelled by content external to the element.</p>

<auro-dropdown id="commonAdvanced" aria-labelledby="foo" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonAdvanced').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const CommonMatchWidth: Story = {
  render: () => html`
<auro-dropdown id="common" common fluid matchWidth aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const CommonSlot: Story = {
  render: () => html`
<auro-dropdown id="commonSlot" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonSlot').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <span slot="label">
    Element label (default text will be read by screen reader)
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const Custom: Story = {
  render: () => html`
<custom-dropdown id="customCommon" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#customCommon').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</custom-dropdown>
  `
};

export const DisabledChevron: Story = {
  render: () => html`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `
};

export const Inline: Story = {
  render: () => html`
<table style="text-align: center;">
  <thead>
    <tr>
      <td>Icon Only</td>
      <td>Text Only</td>
      <td>Text with Icon</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon Only Dropdown
        <div slot="trigger">
          <auro-icon category="interface" name="arrow-down"></auro-icon>
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Text Only Dropdown
        <div slot="trigger">
          Trigger Text
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon and Text Dropdown
        <div slot="trigger">
          <div style="white-space:nowrap">
            Trigger Text
            <auro-icon category="interface" name="arrow-down"></auro-icon>
          </div>
        </div>
      </auro-dropdown>
    </td>
  </tr>
</table>
  `
};

export const WiderPopover: Story = {
  render: () => html`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      This is special content.
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>
  `
};