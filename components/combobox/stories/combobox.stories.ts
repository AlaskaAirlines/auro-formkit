import { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { expect, userEvent } from '@storybook/test';
import { screen } from "shadow-dom-testing-library";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { html } from "lit-html";

import { AuroMenu, AuroMenuOption } from "@aurodesignsystem/auro-menu";

import "../../menu/src/registered";
import { AuroCombobox } from "../src/auro-combobox";
import { DynamicData } from './dynamicMenuDataApi';

import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-icon';

AuroCombobox.register(); // registering to `auro-combobox`
AuroCombobox.register("custom-combobox");

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-combobox");

const meta: Meta<AuroCombobox> = {
  component: "auro-combobox",
  title: "Combobox",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroCombobox & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {},
};

export const Basic: Story = {
  render: () => html`
<auro-combobox>
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
</auro-combobox>
  `,
};

export const BasicOpen: Story = {
  ...Basic,
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'a');
  }
};

// TODO: This is not functioning
export const DynamicMenu: Story = {
  render: () => {
    function setup() {
      const combobox: AuroCombobox | null = document.querySelector('#dynamicMenuExample');
      const dropdownEl = combobox?.shadowRoot?.querySelector(combobox.dropdownTag._$litStatic$);
      const inputEl = dropdownEl?.querySelector(combobox?.inputTag._$litStatic$);

      const dynamicData = new DynamicData();

      // Resets the root menu
      function resetMenu(root) {
        while (root.firstChild) {
          root.removeChild(root.firstChild);
        }
      }

      // Helper function that generates HTML for menuoptions
      function generateMenuOptionHtml(menu, label, value) {
        let option = document.createElement('auro-menuoption') as AuroMenuOption;
        
        // @ts-expect-error - TODO: `AuroMenuOption`['value'] is not typed
        option.value = value;
        option.innerHTML = label;

        menu.appendChild(option);
      }

      // Generates HTML for menu and submenus using country & city data from an external API
      function generateHtml(data) {
        const initialMenu: AuroMenu | null = document.querySelector('#initMenu');

        resetMenu(initialMenu);

        for (let index = 0; index < data.length; index++) {
          let country = data[index]['country'];
          let cities = data[index]['cities'];

          generateMenuOptionHtml(initialMenu, country, country);

          for (let indexB = 0; indexB < cities.length; indexB++) {
            let subMenu = document.createElement('auro-menu') as AuroMenu;

            generateMenuOptionHtml(subMenu, cities[indexB], cities[indexB]);

            initialMenu?.appendChild(subMenu);
          }
        };
      }

      inputEl.addEventListener('input', () => {
        let data = dynamicData.getData();
        data = dynamicData.filterData(data, inputEl.value);

        generateHtml(data);
      });
    }
    
    const template = html`
<auro-combobox id="dynamicMenuExample" noFilter>
  <span slot="bib.fullscreen.headline">Dynamic Combobox Header</span>
  <span slot="label">Name</span>
  <!--
The auro-combobox element requires an empty auro-menu element
due to the requirements of auro-dropdown and auro-input
-->
  <auro-menu id="initMenu"></auro-menu>
</auro-combobox>
    `;

    setTimeout(setup, 0);

    return template;
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Disabled: Story = {
  render: () => html`
<auro-combobox disabled>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

export const NoFilter: Story = {
  render: () => html`
<auro-combobox noFilter>
  <span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'x');

    const noMatchOption = await screen.findByShadowRole('option', { name: /No matching option/i });
    expect(noMatchOption).toBeInTheDocument();
  }
};

export const Error: Story = {
  render: () => html`
<auro-combobox error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

export const NoValidate: Story = {
  render: () => html`
<auro-combobox required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

export const Required: Story = {
  render: () => html`
<auro-combobox required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(comboboxInput);
    await userEvent.click(document.body);

    const errorText = await screen.findAllByShadowText(/Please fill out this field/i);
    expect(errorText.length).toBeGreaterThan(0);
  }
};

export const ProgrammaticValue: Story = {
  render: () => html`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

export const Value: Story = {
  render: () => {
    function handleSetValidValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = ['Oranges'];
      }
    }

    function handleSetInvalidValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = ['Dragon Fruit'];
      }
    }

    function handleResetValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = undefined;
      }
    }
    
    return html`
<auro-button id="valueValidExampleBtn" @click="${handleSetValidValueClick}">Set to an existing option</auro-button>
<auro-button id="valueInvalidExampleBtn" @click="${handleSetInvalidValueClick}">Set to custom value</auro-button>
<auro-button id="valueUndefinedExampleBtn" @click="${handleResetValueClick}">Reset</auro-button>
<br/><br/>
<auro-combobox id="valueExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');

    const setValidValueBtn = await canvas.findByShadowRole('button', { name: /Set to an existing option/i });
    await userEvent.click(setValidValueBtn);
    expect(comboboxInput).toHaveValue('Oranges');
    
    const setInvalidValueBtn = await canvas.findByShadowRole('button', { name: /Set to custom value/i });
    await userEvent.click(setInvalidValueBtn);
    expect(comboboxInput).toHaveValue('Dragon Fruit');
    
    const resetValueBtn = await canvas.findByShadowRole('button', { name: /Reset/i });
    await userEvent.click(resetValueBtn);
    expect(comboboxInput).toHaveValue('');
  }
};

export const TypeMonthDayYear: Story = {
  render: () => html`
<auro-combobox type="date" triggerIcon>
  <span slot="bib.fullscreen.headline">Date Combobox Header</span>
  <span slot="label">Date</span>
  <auro-menu>
    <auro-menuoption value="01/02/2020" id="option-date-0">
      01/02/2020
    </auro-menuoption>
    <auro-menuoption value="05/16/2022" id="option-date-1">
      05/16/2022
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(comboboxInput);
  }
};

export const TypeMonthDayYearOpen: Story = {
  ...TypeMonthDayYear,
  async play({ canvas }) {
    const combobox = await canvas.findByShadowRole('textbox');
    await userEvent.type(combobox, '0');
  }
};

export const Focus: Story = {
  render: () => {
    function handleClick() {
      const combobox: AuroCombobox | null = document.querySelector('#focusExample');
      combobox?.focus();
    }
    
    return html`
<auro-button id="focusExampleBtn" @click="${handleClick}">Apply focus to combobox</auro-button>
<br /><br />
<auro-combobox id="focusExample">
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
</auro-combobox>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  async play({ canvas }) {
    const btn = await canvas.findByShadowRole('button', { name: /Apply focus to combobox/i });
    await userEvent.click(btn);
  }
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const combobox: AuroCombobox | null = document.querySelector('#resetStateExample');
      combobox?.reset();
    }
    
    return html`
<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
<br /><br />

<auro-combobox id="resetStateExample" required>
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
</auro-combobox>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'a');
    const option = await screen.findByShadowRole('option', { name: /Apples/i });
    await userEvent.click(option);
    expect(comboboxInput).toHaveValue('Apples');
    
    const resetValueBtn = await canvas.findByShadowRole('button', { name: /Reset/i });
    await userEvent.click(resetValueBtn);
    expect(comboboxInput).toHaveValue('');
  }
};

export const HelpText: Story = {
  render: () => html`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <span slot="helpText">Custom help text</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

// TODO: This is not functioning
export const Loading: Story = {
  render: () => {
    function setup() {
      const combobox: AuroCombobox | null = document.querySelector("#loadingExample");
      const menu: AuroMenu | null = document.querySelector("#loadingExampleComboboxMenu");

      function emptyMenu() {
        const menuoptions = menu?.querySelectorAll('auro-menuoption') as NodeListOf<AuroMenuOption>;
        menuoptions.forEach(mo => menu?.removeChild(mo));
      }

      function fillMenu() {
        if (menu) {
          menu.innerHTML += `
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          `;
        }
      }

      type Load = { (): void; id?: NodeJS.Timeout; };
      const load: Load = () => {
        clearTimeout(load.id);
        emptyMenu();
        menu?.setAttribute('loading', 'loading');
        load.id = setTimeout(() => {
          menu?.removeAttribute('loading');
          fillMenu();
        }, 1000);
      }

      combobox?.addEventListener("input", (e) => {
        // @ts-expect-error - TODO: Type event properly
        if (e.target.value && e.target.value !== e.target.optionSelected?.textContent) {
          load();
        }
      });
    }
    
    const template = html`
<auro-combobox id="loadingExample">
  <span slot="bib.fullscreen.headline">Loading Combobox Header</span>
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleComboboxMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-combobox>
    `;

    setTimeout(setup, 0);

    return template;
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: Apply useful viewport dimensions
export const FullscreenBreakpoint: Story = {
  render: () => html`
<auro-combobox fullscreenBreakpoint="lg">
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
</auro-combobox>
  `,
};

// TODO: How to register auro-dialog?
export const InDialog: Story = {
  render: () => {
    function handleClick() {
      const dialog = document.querySelector('#combobox-dialog');
      dialog?.setAttribute('open', 'true');
    }

    return html`
<div>
  <auro-button id="combobox-dialog-opener" @click="${handleClick}">Combobox in Dialog</auro-button>

  <auro-dialog id="combobox-dialog">
    <span slot="header">Combobox in Dialog</span>
    <div slot="content">
      <auro-combobox id="focusExample">
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
      </auro-combobox>
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

export const Airports: Story = {
  render: () => html`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Airports</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell">glacier park international</auro-menuoption>
    <auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco">san francisco international</auro-menuoption>
    <auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise">gowen field</auro-menuoption>
    <auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis">lambert st louis international</auro-menuoption>
    <auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna">kelowna international</auro-menuoption>
    <auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima">yakima air terminal</auro-menuoption>
    <auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman">pullman moscow regional</auro-menuoption>
    <auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton">edmonton international</auro-menuoption>
    <auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa">tampa international</auro-menuoption>
    <auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis">minneapolis st paul international</auro-menuoption>
    <auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls">idaho falls regional airport</auro-menuoption>
    <auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford">rogue valley international</auro-menuoption>
    <auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs">palm springs international</auro-menuoption>
    <auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia">guanacaste airport</auro-menuoption>
    <auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland">oakland international</auro-menuoption>
    <auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston">logan international</auro-menuoption>
    <auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore">thurgood marshall international</auro-menuoption>
    <auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas">dallas love field</auro-menuoption>
    <auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara">santa barbara municipal</auro-menuoption>
    <auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city">kansas city international</auro-menuoption>
    <auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona">kona international</auro-menuoption>
    <auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta">licenciado gustavo diaz ordaz international</auro-menuoption>
    <auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell">wrangell</auro-menuoption>
    <auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay">deadhorse</auro-menuoption>
    <auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto">loreto international</auro-menuoption>
    <auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome">nome</auro-menuoption>
    <auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita">dwight d eisenhower national</auro-menuoption>
    <auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia">philadelphia international</auro-menuoption>
    <auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas">dallas fort worth international</auro-menuoption>
    <auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis">indianapolis international</auro-menuoption>
    <auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento">sacramento international</auro-menuoption>
    <auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka">rocky gutierrez</auro-menuoption>
    <auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor">unalaska</auro-menuoption>
    <auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova">merle mudhole smith</auro-menuoption>
    <auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg">james a johnson</auro-menuoption>
    <auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville">nashville international</auro-menuoption>
    <auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane">spokane international</auro-menuoption>
    <auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan">ketchikan international</auro-menuoption>
    <auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh">pittsburgh international</auro-menuoption>
    <auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo">san luis obispo regional</auro-menuoption>
    <auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank">hollywood burbank</auro-menuoption>
    <auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans">louis armstrong international</auro-menuoption>
    <auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett">paine field</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat">yakutat</auro-menuoption>
    <auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland">portland international</auro-menuoption>
    <auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage">ted stevens</auro-menuoption>
    <auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle">seattle tacoma international</auro-menuoption>
    <auro-menuoption value="san" id="airport-san" suggest="san california san diego">san diego international</auro-menuoption>
    <auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio">san antonio international</auro-menuoption>
    <auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno">fresno yosemite international</auro-menuoption>
    <auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin">austin bergstrom international</auro-menuoption>
    <auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago">ohare international</auro-menuoption>
    <auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara">guadalajara international</auro-menuoption>
    <auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose">san jose international</auro-menuoption>
    <auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau">juneau international</auro-menuoption>
    <auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond">roberts field</auro-menuoption>
    <auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma">charles m schulz</auro-menuoption>
    <auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks">fairbanks international</auro-menuoption>
    <auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh">raleigh durham international</auro-menuoption>
    <auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha">eppley airfield</auro-menuoption>
    <auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman">bozeman yellowstone international</auro-menuoption>
    <auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario">ontario international</auro-menuoption>
    <auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui">kahului international</auro-menuoption>
    <auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley">friedman memorial</auro-menuoption>
    <auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan">general rafael buelna international</auro-menuoption>
    <auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham">dillingham</auro-menuoption>
    <auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak">kodiak</auro-menuoption>
    <auro-menuoption value="den" id="airport-den" suggest="den colorado denver">denver international</auro-menuoption>
    <auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo">manzanillo international</auro-menuoption>
    <auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos">los cabos international</auro-menuoption>
    <auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso">el paso international airport</auro-menuoption>
    <auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta">hartsfield jackson international</auro-menuoption>
    <auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles">los angeles international</auro-menuoption>
    <auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers">southwest florida international</auro-menuoption>
    <auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland">cleveland hopkins international airport</auro-menuoption>
    <auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue">ralph wien memorial</auro-menuoption>
    <auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city">philip sw goldson international airport</auro-menuoption>
    <auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee">pangborn memorial</auro-menuoption>
    <auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit">detroit metropolitan</auro-menuoption>
    <auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel">bethel</auro-menuoption>
    <auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington">ronald reagan national</auro-menuoption>
    <auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno">reno tahoe international</auro-menuoption>
    <auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow">wiley post will rogers</auro-menuoption>
    <auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey">monterey regional</auro-menuoption>
    <auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu">honolulu international</auro-menuoption>
    <auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city">will rogers world</auro-menuoption>
    <auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles">washington dulles international</auro-menuoption>
    <auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami">miami international</auro-menuoption>
    <auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham">bellingham international</auro-menuoption>
    <auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena">helena regional</auro-menuoption>
    <auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls">great falls international</auro-menuoption>
    <auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo">ixtapa zihuatanejo international</auro-menuoption>
    <auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary">calgary international</auro-menuoption>
    <auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana">john wayne</auro-menuoption>
    <auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale">fort lauderdale hollywood international</auro-menuoption>
    <auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark">newark liberty international</auro-menuoption>
    <auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs">yampa valley regional</auro-menuoption>
    <auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco">tri cities</auro-menuoption>
    <auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson">tucson international</auro-menuoption>
    <auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque">albuquerque international sunport</auro-menuoption>
    <auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york">john f kennedy international</auro-menuoption>
    <auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver">vancouver international</auro-menuoption>
    <auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province">juan santamaria international</auro-menuoption>
    <auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas">harry reid international airport</auro-menuoption>
    <auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai">lihue international</auro-menuoption>
    <auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula">missoula international</auro-menuoption>
    <auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla">walla walla regional</auro-menuoption>
    <auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee">milwaukee mitchell international</auro-menuoption>
    <auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene">mahlon sweet field</auro-menuoption>
    <auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon">king salmon</auro-menuoption>
    <auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun">cancun international</auro-menuoption>
    <auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding">redding municipal airport</auro-menuoption>
    <auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando">orlando international</auro-menuoption>
    <auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city">salt lake city international</auro-menuoption>
    <auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix">sky harbor international</auro-menuoption>
    <auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings">billings logan international</auro-menuoption>
    <auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus">gustavus</auro-menuoption>
    <auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak">adak</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson">jackson hole airport</auro-menuoption>
    <auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus">john glenn columbus international</auro-menuoption>
    <auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria">victoria international</auro-menuoption>
    <auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston">charleston international</auro-menuoption>
    <auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston">george bush intercontinental</auro-menuoption>
    <auro-menuoption static nomatch>Unknown airport... </auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Custom: Story = {
  ...Basic,
  render: () => html`
<custom-combobox>
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
</custom-combobox>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const TypeCreditCard: Story = {
  render: () => html`
<auro-combobox type="credit-card" triggerIcon>
  <span slot="bib.fullscreen.headline">Credit Card</span>
  <span slot="label">Credit Card Number</span>
  <auro-menu>
    <auro-menuoption value="4500000000000000" id="option-cc-0">
      <auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
      4000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="340000000000000" id="option-cc-1">
      <auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
      3400 000000 00000
    </auro-menuoption>
    <auro-menuoption value="30000000000000" id="option-cc-2">
      <auro-icon category="payment" customcolor name="credit-card"></auro-icon>
      3000 000000 0000
    </auro-menuoption>
    <auro-menuoption value="5100000000000000" id="option-cc-4">
      <auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
      5000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="6011000000000000" id="option-cc-5">
      <auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
      6000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvas }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, '0');
  }
};

// TODO: No checkmark?
export const WithCheckmark: Story = {
  render: () => html`
<auro-combobox checkmark>
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
</auro-combobox>
  `
};

// TODO: This is not functioning
// TODO: Is the use of `action` instead of `alert` OK?
export const Persistent: Story = {
  render: () => {
    function handleAddNewAddress() {
      console.warn('addNewAddress event fired');
      action(`addNewAddress event fired`);
    }

    return html`
<auro-combobox id="persistent" @addNewAddress="${handleAddNewAddress}">
  <span slot="bib.fullscreen.headline">Address Combobox</span>
  <span slot="label">Address</span>
  <auro-menu id="customEvent">
    <auro-menuoption value="555 Address Way Seattle, WA 99999">555 Address Way Seattle, WA 99999</auro-menuoption>
    <auro-menuoption value="333 Some Street Seattle, WA 99999">333 Some Street Seattle, WA 99999</auro-menuoption>
    <auro-menuoption event="addNewAddress" persistent>Add new address</auro-menuoption>
  </auro-menu>
</auro-combobox>
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
      const comboboxOne: AuroCombobox | null = document.querySelector('#swapExampleLeft');
      const comboboxTwo: AuroCombobox | null = document.querySelector('#swapExampleRight');

      if (comboboxOne && comboboxTwo) {
        const valueOne = comboboxOne.value;
        const valueTwo = comboboxTwo.value;
    
        comboboxOne.value = valueTwo;
        comboboxTwo.value = valueOne;
      }
    }

    return html`
<div id="swapExample">
  <auro-combobox id="swapExampleLeft">
    <span slot="bib.fullscreen.headline">Left Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-button id="swapExampleBtn" @click="${handleClick}" iconOnly>
    <auro-icon
      customColor
      category="terminal" 
      name="round-trip-arrows"
      slot="icon">
    </auro-icon>
  </auro-button>
  <auro-combobox id="swapExampleRight">
    <span slot="bib.fullscreen.headline">Right Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
</div>

<style>
  #swapExample {
    display: flex;
    flex-direction: row;

    align-items: center;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    margin: 0 5px;
  }
</style>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};