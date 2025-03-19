import { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent } from "@storybook/test";

import { html } from "lit-html";

import { AuroCounter } from "../src/auro-counter";
import { AuroCounterGroup } from "../src/auro-counter-group";

AuroCounter.register(); // registering to `auro-counter`
AuroCounterGroup.register(); // registering to `auro-counter-group`

AuroCounter.register("custom-counter");
AuroCounterGroup.register("custom-counter-group");

const meta: Meta = {
  component: "auro-counter-group",
  title: "Counter & Counter Group",
};
export default meta;

type Story = StoryObj;

export const MinMax: Story = {
  render: () => html`
<auro-counter min="1" max="5" value="2">
  Adults
  <span slot="description">Min: 1, Max: 5</span>
</auro-counter>
  `,
};

export const Disabled: Story = {
  render: () => html`
<auro-counter-group>
  <auro-counter disabled> Short label </auro-counter>
  <auro-counter disabled>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
</auro-counter-group>
  `,
};

export const GroupProperties: Story = {
  render: () => html`
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="label">Group with all properties</div>
  <div slot="helpText">Total must be between 2-10</div>
  <div slot="valueText">Custom total display</div>

  <auro-counter> Counter 1 </auro-counter>
  <auro-counter> Counter 2 </auro-counter>
</auro-counter-group>
  `,
  async play({ canvas }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom total display/i);
    await userEvent.click(counterGroupTrigger);
  }
};

export const Slots: Story = {
  render: () => html`
<!-- Example of all available slots -->
<auro-counter-group isDropdown>
  <!-- Group slots -->
  <div slot="label">Group with all slots</div>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="helpText">Help text appears below the group</div>
  <div slot="valueText">Custom value display</div>

  <!-- Counter with all slots -->
  <auro-counter>
    Default slot content
    <span slot="description">Description slot content</span>
  </auro-counter>
</auro-counter-group>
  `,
};

export const SlotsOpen: Story = {
  ...Slots,
  async play({ canvas }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom value display/i);
    await userEvent.click(counterGroupTrigger);
  }
}

// TODO: This should be able to use `action` from `@storybook/addon-actions`
export const Events: Story = {
  render: () => {
    function setup() {
      const counter = document.querySelector('#eventExample');
      const output = document.querySelector('#eventOutput');

      counter?.addEventListener('input', (event) => {
        if (output) {
          // @ts-expect-error - TODO: Type event properly
          output.textContent = `Values updated: ${JSON.stringify(event.detail)}`;
        }
      });
    }

    const template = html`
<code id="eventOutput"> Event values will appear here </code><br /><br />
<auro-counter-group id="eventExample">
  <auro-counter> Adults </auro-counter>
  <auro-counter> Children </auro-counter>
</auro-counter-group>
    `;

    setTimeout(setup, 0);

    return template;
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas }) {
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const adultsPlusButton = buttons[1];
    const childrenPlusButton = buttons[3];
    const output = await canvas.findByText(/Event values will appear here/i);
    
    await userEvent.click(adultsPlusButton);
    expect(output).toHaveTextContent('Values updated: {"total":1,"value":{"counter-0":1,"counter-1":0}}');

    await userEvent.click(childrenPlusButton);
    expect(output).toHaveTextContent('Values updated: {"total":2,"value":{"counter-0":1,"counter-1":1}}');
  }
};

export const DropdownValueText: Story = {
  render: () => html`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="valueText">Custom value text</div>
    <div slot="label"></div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,
  async play({ canvas }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom value text/i);
    await userEvent.click(counterGroupTrigger);
  }
};

export const GroupMax: Story = {
  render: () => html`
<auro-counter-group max="12" min="0">
  <auro-counter> Short label </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas, step }) {
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const firstMinusButton = buttons[0];
    const firstPlusButton = buttons[1];
    const secondPlusButton = buttons[3];

    await step('Increment both counters to 6', async () => {
      for (let i = 0; i < 6; i++) {
        await userEvent.click(firstPlusButton);
      }
  
      for (let i = 0; i < 6; i++) {
        await userEvent.click(secondPlusButton);
      }
  
      expect(firstPlusButton).toBeDisabled();
      expect(secondPlusButton).toBeDisabled();
    });

    await step('Decrement first counter by one', async () => {
      await userEvent.click(firstMinusButton);
      expect(firstPlusButton).toBeEnabled();
      expect(secondPlusButton).toBeEnabled();
    });
    
    await step('Increment second counter by one', async () => {
      await userEvent.click(secondPlusButton);
      expect(firstPlusButton).toBeDisabled();
      expect(secondPlusButton).toBeDisabled();
    });
  }
};

export const GroupCounterMax: Story = {
  render: () => html`
<auro-counter-group max="12" min="0">
  <auro-counter max="5"> This counter has a max value of 5 </auro-counter>
  <auro-counter max="8"> This counter has a max value of 8 </auro-counter>
</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas, step }) {
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const firstMinusButton = buttons[0];
    const firstPlusButton = buttons[1];
    const secondMinusButton = buttons[2];
    const secondPlusButton = buttons[3];
    
    await step('Increment first counter to max value', async () => {
      for (let i = 0; i < 5; i++) {
        await userEvent.click(firstPlusButton);
      }
      expect(firstPlusButton).toBeDisabled();
    });

    await step('Decrement first counter by one', async () => {
      await userEvent.click(firstMinusButton);
      expect(firstPlusButton).toBeEnabled();
    });

    await step('Increment second counter to max value', async () => {
      for (let i = 0; i < 8; i++) {
        await userEvent.click(secondPlusButton);
      }
      expect(secondPlusButton).toBeDisabled();
    });

    await step('Decrement second counter by one', async () => {
      await userEvent.click(secondMinusButton);
      expect(secondPlusButton).toBeEnabled();
    });
  }
};

// TODO: Apply useful viewport dimensions
export const DropdownMobileProperties: Story = {
  render: () => {
    function handleResetClick() {
      const counterGroup: AuroCounterGroup | null = document.querySelector('#dropdownCounterExample');
      // @ts-expect-error - TODO: Private access to `AuroCounterGroup['counters']`
      counterGroup?.counters?.forEach(counter => {
        (counter as AuroCounter).value = 0;
      });
    }

    function handleSaveClick() {
      const counterGroup: AuroCounterGroup | null = document.querySelector('#dropdownCounterExample');
      // @ts-expect-error - TODO: Private access to `AuroCounterGroup['dropdown']`
      counterGroup?.dropdown?.hide();
    }

    return html`
<div style="max-width: 350px;">
  <auro-counter-group
    id="dropdownCounterExample"
    isDropdown
    fullscreenBreakpoint="lg"
  >
    <span slot="label">Passengers</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>

    <div
      slot="bib.fullscreen.footer"
      style="display:flex; justify-content: stretch; gap: 1.5rem"
    >
      <auro-button
        id="dropdownCounterExampleResetbutton"
        @click="${handleResetClick}"
        fluid
        variant="secondary"
        style="flex: 1 50%"
        >Reset</auro-button
      >
      <auro-button
        id="dropdownCounterExampleSavebutton"
        @click="${handleSaveClick}"
        fluid
        style="flex: 1 50%"
        >Save</auro-button
      >
    </div>
  </auro-counter-group>
</div>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Properties: Story = {
  render: () => html`
<!-- Example of all counter properties -->
<auro-counter-group>
  <!-- Basic counter with min/max -->
  <auro-counter min="1" max="5" value="2">
    Min 1, Max 5
  </auro-counter>

  <!-- Disabled counter -->
  <auro-counter disabled value="0">
    Disabled counter
  </auro-counter>

</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const BasicDescription: Story = {
  render: () => html`
<auro-counter>
  Adults
  <span slot="description">18 years or older</span>
</auro-counter>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const BasicStandalone: Story = {
  render: () => html`
<auro-counter>
  Adults
</auro-counter>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Basic: Story = {
  render: () => html`
<auro-counter-group>
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const CounterDisabled: Story = {
  render: () => html`
<auro-counter disabled value="0">
  Disabled counter
  <span slot="description">This counter cannot be modified</span>
</auro-counter>
  `
};

// TODO: Apply useful viewport dimensions
export const Description: Story = {
  render: () => html`
<auro-counter-group>
  <auro-counter>
    Short label
    <span slot="description"
      >This is an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description"
      >Combined with an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
</auro-counter-group>
  `
};

export const DropdownBasic: Story = {
  render: () => html`
<auro-counter-group isDropdown>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const DropdownHelpText: Story = {
  render: () => html`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Dropdown: Story = {
  render: () => html`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="label">Passengers</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Validation: Story = {
  render: () => html`
<auro-counter-group max="4" min="1">
  <div slot="label">Room Occupants</div>
  <div slot="helpText">Total occupants must be between 1-4 people</div>
  <auro-counter>
    Adults
    <span slot="description">At least 1 adult required</span>
  </auro-counter>
  <auro-counter max="2">
    Children
    <span slot="description">Maximum 2 children per room</span>
  </auro-counter>
</auro-counter-group>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
