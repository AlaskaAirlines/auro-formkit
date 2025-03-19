import { Meta, StoryObj } from '@storybook/web-components';
import { action } from "@storybook/addon-actions";

import { html } from 'lit-html';

import { AuroMenu } from '../src/auro-menu';

import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-input';
import '@aurodesignsystem/auro-loader';

AuroMenu.register(); // registering to `auro-menu`

AuroMenu.register('custom-menu');

const meta: Meta = {
  component: "auro-menu",
  title: 'Menu',
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
<auro-menu>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `
};

export const NoCheckmark: Story = {
  render: () => html`
<auro-menu nocheckmark>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu>
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `
};

export const DisabledMenu: Story = {
  render: () => html`
<auro-menu disabled>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `
};

// TODO: This does not function
export const MatchWord: Story = {
  render: () => {
    function handleKeyup() {
      const menu: AuroMenu | null = document.querySelector('#matchWordMenu');
      if (menu) menu.matchWord = this.value;
    }
    
    return html`
<auro-input id="matchWordInput" @keyup="${handleKeyup}" required>
  <span slot="label">Enter a value to match in the menu</span>
</auro-input>
<br />
<auro-menu id="matchWordMenu">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="peaches">Peaches</auro-menuoption>
  </auro-menu>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const MultiSelect: Story = {
  render: () => html`
<auro-menu multiselect>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `
};

export const Loading: Story = {
  render: () => {
    function handleClick() {
      const menus: NodeListOf<AuroMenu> | null = document.querySelectorAll('#loadingExampleTable auro-menu');
      menus?.forEach(menu => menu.toggleAttribute('loading'));
    }

    return html`
<auro-button common id="loadingExampleToggleButton" @click="${handleClick}">Toggle Loading</auro-button>
<table id="loadingExampleTable">
  <thead>
    <tr>
      <td width="25%">Spinner + Text</td>
      <td width="25%">Text Only</td>
      <td width="25%">Spinner Only</td>
      <td width="25%">None</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
</tr>
</table>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Scroll: Story = {
  render: () => html`
<auro-menu id="alpha" style="max-height: 200px">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `
};

export const HR: Story = {
  render: () => html`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `
};

export const NestedMenu: Story = {
  render: () => html`
<auro-menu id="alpha">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `
};

export const Disabled: Story = {
  render: () => html`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `
};

export const Preselect: Story = {
  render: () => html`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window" selected>New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>

  `
};

export const RestrictedWidth: Story = {
  render: () => html`
<auro-menu style="width: 300px">
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as 'option_10_redevelopment_hover_scenario.png'</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `
};

export const Hidden: Story = {
  render: () => html`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" hidden>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `
};

export const Reset: Story = {
  render: () => {
    function handleClick() {
      const menu: AuroMenu | null = document.querySelector('#resetExample');
      menu?.reset();
    };

    return html`
<auro-menu id="resetExample">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration" selected>Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br/><br/>
<auro-button id="resetExampleBtn" @click="${handleClick}">RESET</auro-button>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: This seems broken
export const Custom: Story = {
  render: () => html`
<custom-menu>
  <custom-menuoption value="stops">Stops</custom-menuoption>
  <custom-menuoption value="price">Price</custom-menuoption>
  <custom-menuoption value="duration">Duration</custom-menuoption>
  <custom-menuoption value="departure">Departure</custom-menuoption>
  <custom-menuoption value="arrival">Arrival</custom-menuoption>
</custom-menu>
  `
};

// TODO: Is the use of `action` instead of `alert` OK?
export const CustomEvent: Story = {
  render: () => {
    function handleCustomEvent(event) {
      console.warn('My Custom Event Fired', event);
      action(`My Custom Event Fired, ${JSON.stringify(event, null, 2)}`)();
    }

    return html`
<auro-menu id="customEvent" @mycustomevent="${handleCustomEvent}">
  <auro-menuoption value="stops">555 Address Way Seattle, WA 99999</auro-menuoption>
  <auro-menuoption value="price">333 Some Street Seattle, WA 99999</auro-menuoption>
  <auro-menuoption event="mycustomevent">Add new address</auro-menuoption>
</auro-menu>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};