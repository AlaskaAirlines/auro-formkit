import { Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';

import { html } from 'lit-html';

import { AuroSelect } from '../src/auro-select';

import '@aurodesignsystem/auro-button';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-menu';

AuroSelect.register(); // registering to `auro-select`

AuroSelect.register('custom-select');

const meta: Meta = {
  component: "auro-select",
  title: 'Select',
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const Value: Story = {
  render: () => {
    function handleSetValidValueClick() {
      const select: AuroSelect | null = document.querySelector('#valueExample');
      if (select) select.value = ['price'];
    }

    function handleSetInvalidValueClick() {
      const select: AuroSelect | null = document.querySelector('#valueExample');
      if (select) select.value = ['flight course'];
    }
    
    return html`
<auro-button id="validValueExampleBtn" @click="${handleSetValidValueClick}">Set Value to Valid Option</auro-button>
<auro-button id="invalidValueExampleBtn" @click="${handleSetInvalidValueClick}">Set Value to Invalid Option</auro-button>
<br/><br/>
<auro-select id="valueExample" value='["price"]'>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
    <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
    <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
    <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
    <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
    <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Required: Story = {
  render: () => html`
<auro-select required setCustomValidityValueMissing="Custom required validation error message.">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

// TODO: Can only set the new message after removing the starting one
export const ErrorAPI: Story = {
  render: () => {
    function handleSetErrorClick() {
      const select: AuroSelect | null = document.querySelector('#errorExample');
      select?.setAttribute('error', 'New custom error message');
    }

    function handleRemoveErrorClick() {
      const select: AuroSelect | null = document.querySelector('#errorExample');
      select?.removeAttribute('error');
    }
    
    return html`
<auro-button id="undefinedValueExampleBtnAddError" @click="${handleSetErrorClick}">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError" @click="${handleRemoveErrorClick}">Remove Error</auro-button>
<br /><br />
<auro-select id="errorExample" error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Disabled: Story = {
  render: () => html`
<auro-select disabled>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const MultiSelect: Story = {
  render: () => html`
<auro-select multiselect>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Select one or more options</label>
  <auro-menu>
    <auro-menuoption value="1">Option 1</auro-menuoption>
    <auro-menuoption value="2">Option 2</auro-menuoption>
    <auro-menuoption value="3">Option 3</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const FlexMenuWidth: Story = {
  render: () => html`
<auro-select flexMenuWidth id="flexMenuWidthExample">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
    <auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
    <auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
    <auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
    <auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
  </auro-menu>
</auro-select>

<style>
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
</style>
  `
};

export const Label: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Please select a preference</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const HelpText: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <span slot="helpText">Custom help text message.</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const select: AuroSelect | null = document.querySelector('#resetStateExample');
      select?.reset();
    }
    
    return html`
<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
<br/><br/>

<auro-select id="resetStateExample" value='["price"]'>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const ValueExtraction: Story = {
  render: () => {
    function handleClick() {
      const select: AuroSelect | null = document.querySelector('#valueExtraction');
      console.warn('Value selected:', select?.value);
      console.warn('Option selected:', select?.optionSelected);
      action(`Value selected: ${select?.value}`)();
    }
    
    return html`
<auro-select id="valueExtraction">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>

<auro-button id="valueExtractionBtn" @click="${handleClick}">Get current value</auro-button>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const CustomErrorValidity: Story = {
  render: () => {
    function handleValueSet() {
      if (+this.value > 2) {
        this.setAttribute('error', 'Quantity Exceeded');
      } else if (this.hasAttribute('error')) {
        this.removeAttribute('error');
      }
    }
    
    return html`
<auro-select id="primaryError" @auroSelect-valueSet="${handleValueSet}">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="1">1</auro-menuoption>
    <auro-menuoption value="2">2</auro-menuoption>
    <auro-menuoption value="3">3</auro-menuoption>
    <auro-menuoption value="4">4</auro-menuoption>
    <auro-menuoption value="5">5</auro-menuoption>
    <auro-menuoption value="6">6</auro-menuoption>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: This does not function
export const Loading: Story = {
  render: () => {
    function emptyMenu(menu: AuroMenu) {
      const menuoptions: NodeListOf<AuroMenuOption> | null = menu.querySelectorAll('auro-menuoption');
      menuoptions.forEach(mo => menu.removeChild(mo));
    }
  
    function fillMenu(menu: AuroMenu) {
      menu.innerHTML += `
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      `;
    }

    function handleClick() {
      const menu: AuroMenu | null = document.querySelector("#loadingExampleSelectMenu");
      if (menu && !menu.hasAttribute('loading') && !this.value) {
        emptyMenu(menu);
        menu.setAttribute('loading', 'loading');
        setTimeout(() => {
          menu.removeAttribute('loading');
          fillMenu(menu);
        }, 1000);
      }
    };
    
    return html`
<auro-select id="loadingExample">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleSelectMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const FullscreenBreakpoint: Story = {
  render: () => html`
<auro-select fullscreenBreakpoint="lg">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

// TODO: How to register auro-dialog?
export const InDialog: Story = {
  render: () => {
    function handleClick() {
      const dialog = document.querySelector("#select-dialog");
      dialog?.setAttribute('open', 'true');
    }
    
    return html`

<div>
  <auro-button id="select-dialog-opener" @click="${handleClick}">Select in Dialog</auro-button>

  <auro-dialog id="select-dialog">
    <span slot="header">Select in Dialog</span>
    <div slot="content">
      <auro-select id="valueExample" value='["price"]'>
        <span slot="bib.fullscreen.headline">Bib Headline</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
          <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
          <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
          <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
          <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
          <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </auro-dialog>
</div>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const LogValue: Story = {
  render: () => {
    function handleSelectedOption() {
      const select: AuroSelect | null = document.querySelector('#valueAlert');
      console.warn('Select value changed to:', select?.value);
      action('Select value changed to:', select?.value)();
      console.warn('Select optionSelected changed to:', select?.optionSelected);
      action('Select optionSelected changed to:', select?.optionSelected)();
    }

    return html`
<auro-select id="valueAlert">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu id="valueAlertMenu" @auroMenu-selectedOption="${handleSelectedOption}">
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Custom: Story = {
  render: () => html`
<custom-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</custom-select>
  `
};

export const CustomBibHeight: Story = {
  render: () => html`
<auro-select id="customBibHeightExample">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>

<style>
  #customBibHeightExample::part(dropdownSize) {
    max-height: 100px;
  }
</style>
  `
};

export const CustomPlaceholder: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Please select your preferred option</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const Error: Story = {
  render: () => html`
<auro-select error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

// TODO: How to register auro-dialog?
export const NestedSelect: Story = {
  render: () => {
    function handleVisibleOverflowOpenClick() {
      const visOverflowDialog = document.querySelector('#visibleOverflowDialog');
      visOverflowDialog?.setAttribute('open', 'true');
    }

    function handleVisibleOverflowCloseClick() {
      const visOverflowDialog = document.querySelector('#visibleOverflowDialog');
      visOverflowDialog?.removeAttribute('open');
    }

    function handleHiddenOverflowOpenClick() {
      const visOverflowDialog = document.querySelector('#hiddenOverflowDialog');
      visOverflowDialog?.setAttribute('open', 'true');
    }

    function handleHiddenOverflowCloseClick() {
      const visOverflowDialog = document.querySelector('#hiddenOverflowDialog');
      visOverflowDialog?.removeAttribute('open');
    }

    return html`
<auro-button id="overflowVisibleButton" @click="${handleVisibleOverflowOpenClick}">Open Visible Overflow Dialog</auro-button>
<auro-button id="overflowHiddenButton" @click="${handleHiddenOverflowOpenClick}">Open Hidden Overflow Dialog</auro-button>

<!-- Example showing the overflow of auro-select's popover bib with overflow: visible -->
<auro-dialog id="visibleOverflowDialog">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="header">Visible Overflow Dialog</span>
  <div slot="content">
    <auro-select id="nestedSelect">
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
  </div> 
  <div slot="footer" className="auro_containedButtons">
    <auro-button secondary id="closeVisButton" @click="${handleVisibleOverflowCloseClick}">Close</auro-button>
  </div>
</auro-dialog>

<!-- Example showing the overflow of auro-select's popover bib with the default behavior, overflow: hidden -->
<auro-dialog id="hiddenOverflowDialog">
  <span slot="header">Hidden Overflow Dialog</span>
  <div slot="content">
    <auro-select id="nestedSelect">
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
  </div> 
  <div slot="footer" className="auro_containedButtons">
    <auro-button secondary id="closeHidButton" @click="${handleHiddenOverflowCloseClick}">Close</auro-button>
  </div>
</auro-dialog>

<!-- Style to allow the dropdown menu to overflow -->
<style>
  #visibleOverflowDialog::part(dialog) { 
    overflow: visible;
    max-height: 400px;
  }
</style>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const NoCheckmark: Story = {
  render: () => html`
<auro-select nocheckmark>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const PresetOption: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="Please select an option" selected>Please select an option</auro-menuoption>
    <hr>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const Slots: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <span slot="label">Please choose a preference</span>
  <span slot="helpText">Preferences are maintained for future use</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const WithIcons: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="air">
      <auro-icon label customColor category="health" name="air">Air</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="covidtest">
      <auro-icon label customColor category="health" name="covid-test">Covid Test</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="health">
      <auro-icon label customColor category="health" name="health">Health</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="mask">
      <auro-icon label customColor category="health" name="mask">Mask</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="spraybottle">
      <auro-icon label customColor category="health" name="spraybottle">Spray Bottle</auro-icon>
    </auro-menuoption>
  </auro-menu>
</auro-select>
  `
};

export const WithSubmenus: Story = {
  render: () => html`
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
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
</auro-select>
  `
};