import { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { expect, userEvent, waitFor } from "@storybook/test";
import MockDate from 'mockdate';
import { screen } from "shadow-dom-testing-library";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { html } from "lit-html";

import { AuroDatePicker } from "../src/auro-datepicker";

import '@aurodesignsystem/auro-button';

AuroDatePicker.register(); // registering to `auro-datepicker`

AuroDatePicker.register("custom-datepicker");

const { events, args, argTypes, template } =
  getWcStorybookHelpers("auro-datepicker");

function formatDateString(date) {
  const dd = String("0" + date.getDate()).slice(-2);
  const mm = String("0" + (date.getMonth() + 1)).slice(-2);
  return `${mm}/${dd}/${date.getFullYear()}`;
}

const meta: Meta<AuroDatePicker> = {
  component: "auro-datepicker",
  title: "Datepicker",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<AuroDatePicker & typeof args>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {},
};

export const Basic: Story = {
  render: () => html`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const BasicOpen: Story = {
  ...Basic,
  async play({ canvas }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);
  }
};

export const BasicRange: Story = {
  render: () => html`
<auro-datepicker range>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  `,
};

export const BasicRangeOpen: Story = {
  ...BasicRange,
  async play({ canvas }) {
    const datepickerInput = (await canvas.findAllByShadowRole('textbox'))[0];
    await userEvent.click(datepickerInput);
  }
};

export const Disabled: Story = {
  render: () => html`
<auro-datepicker disabled>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

// TODO: Have to click the set button twice (or remove the error first) to see effect?
export const Error: Story = {
  render: () => {
    function handleSetErrorClick() {
      const datePicker: AuroDatePicker | null = document.querySelector('#errorExample');
      datePicker?.removeAttribute('error');
      datePicker?.setAttribute('error', 'Custom New Error');
    }

    function handleRemoveErrorClick() {
      const datePicker: AuroDatePicker | null = document.querySelector('#errorExample');
      datePicker?.removeAttribute('error');
    }
    
    return html`
<auro-datepicker error="Custom error message" id="errorExample">
  <span slot="bib.fullscreen.headline">Error Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="undefinedValueExampleBtnAddError" @click="${handleSetErrorClick}">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError" @click="${handleRemoveErrorClick}">Remove Error</auro-button
>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  async play({ canvas }) {
    const removeErrorButton = await canvas.findByShadowRole('button', { name: 'Remove Error' });
    await userEvent.click(removeErrorButton);
    await waitFor(() => {
      expect(canvas.queryByShadowRole('alert')).not.toBeInTheDocument();
    });

    const setErrorButton = await canvas.findByShadowRole('button', { name: 'Set Error' });
    await userEvent.click(setErrorButton);
    expect(await canvas.findByShadowRole('alert')).toHaveTextContent('Custom New Error');    
  }
};

export const CalendarStartAndEndDate: Story = {
  render: () => html`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="06/01/2022"
>
  <span slot="bib.fullscreen.headline"
    >calendarStartDate & calendarEndDate Example</span
  >
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas, step }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // No role on the heading and the text is split into `div`s, so had to resort to this
    expect((await screen.findByShadowText(/January/i)).parentNode).toHaveTextContent(/January 2022/i);

    const nextMonthButton = await screen.findByShadowRole('button', { name: /Directional indicator; right/i });
    await step('Navigate to end date', async () => {
      for (let i = 0; i < 5; i++) {
        await userEvent.click(nextMonthButton);
      }
    });
    
    // No role on the heading and the text is split into `div`s, so had to resort to this
    expect((await screen.findByShadowText(/June/i)).parentNode).toHaveTextContent(/June 2022/i);
    await waitFor(() => {
      expect(nextMonthButton).not.toBeInTheDocument();
    });
  }
};

export const CalendarFocusDate: Story = {
  render: () => html`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="12/01/2023"
  calendarFocusDate="11/01/2022"
>
  <span slot="bib.fullscreen.headline">calendarFocusDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  async play({ canvas, step }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // No role on the heading and the text is split into `div`s, so had to resort to this
    expect((await screen.findByShadowText(/November/i)).parentNode).toHaveTextContent(/November 2022/i);
  },
};

export const MaxDate: Story = {
  render: () => html`
<auro-datepicker
  maxDate="03/25/2023"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
  async play({ canvas, step }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);
  },
};

export const UpdateMaxDate: Story = {
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector('#maxDateExample');
      const changeMaxDateButton = document.querySelector('#maxDateChange');
      const resetButton = document.querySelector('#resetMaxDate');
    
      const today = formatDateString(new Date());
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekStr = formatDateString(nextWeek);
    
      datepicker?.setAttribute('value', nextWeekStr);
      datepicker?.setAttribute('maxDate', nextWeekStr);
    
      changeMaxDateButton?.addEventListener('click', () => {
        datepicker?.setAttribute('maxDate', today);
      });

      resetButton?.addEventListener('click', () => {
        datepicker?.setAttribute('value', nextWeekStr);
        datepicker?.setAttribute('maxDate', nextWeekStr);
      });
    }

    const template = html`
<auro-datepicker
  id="maxDateExample"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="maxDateChange">Change maxDate to 03/18/25</auro-button>
<auro-button id="resetMaxDate"
  >Reset Datepicker to Initial Example</auro-button
>
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
  async beforeEach() {
    MockDate.set('2025-03-18');
 
    return () => {
      MockDate.reset();
    };
  },
  async play({ canvas, step }) {
    const maxDateButton = await canvas.findByShadowRole('button', { name: /Change maxDate to/i });
    await userEvent.click(maxDateButton);
    
    // TODO: Cannot find this button
    // const firstPastMax = await screen.findByShadowRole('button', { name: '18', hidden: true });
    // expect(firstPastMax).toBeDisabled();
    
    // console.log(await screen.findAllByShadowRole('button', { hidden: true }));
  }
};

export const MinDate: Story = {
  render: () => html`
<auro-datepicker
  minDate="03/25/2028"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const UpdateMinDate: Story = {
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector('#minDateExample');
      const changeMinDateButton = document.querySelector('#minDateChange');
      const resetButton = document.querySelector('#resetMinDate');
    
      const today = formatDateString(new Date());
    
      let nextWeek = new Date();
      let addOneWeek = nextWeek.getDate() + 7;
    
      nextWeek.setDate(addOneWeek);
      const nextWeekStr = formatDateString(nextWeek);
    
      datepicker?.setAttribute('value', today);
      datepicker?.setAttribute('minDate', today);
    
      changeMinDateButton?.addEventListener('click', () => {
        datepicker?.setAttribute('minDate', nextWeekStr);
      });
    
      resetButton?.addEventListener('click', () => {
        datepicker?.setAttribute('value', today);
        datepicker?.setAttribute('minDate', today);
      });
    }
    
    const template = html`
<auro-datepicker
  id="minDateExample"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="minDateChange"
  >Change minDate to a week from Today</auro-button
>
<auro-button id="resetMinDate"
  >Reset Datepicker to Initial Example</auro-button
>
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
  async beforeEach() {
    MockDate.set('2025-03-18');
 
    return () => {
      MockDate.reset();
    };
  },
  async play({ canvas, step }) {
    const maxDateButton = await canvas.findByShadowRole('button', { name: /Change minDate to/i });
    await userEvent.click(maxDateButton);
    
    // TODO: Cannot find this button
    // const lastBeforeMin = await screen.findByShadowRole('button', { name: '16', hidden: true });
    // expect(lastBeforeMin).toBeDisabled();
    
    // console.log(await screen.findAllByShadowRole('button', { hidden: true }));
  }
};

export const NoValidate: Story = {
  render: () => html`
<auro-datepicker required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const Required: Story = {
  render: () => html`
<auro-datepicker
  required
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-datepicker
  required
  range
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  `,
};

// TODO: Is the use of `action` instead of `alert` OK?
export const Validity: Story = {
  render: () => {
    function handleClick() {
      const datepicker: AuroDatePicker | null = document.querySelector('#validityExample');
      console.warn('Validity set to:', datepicker?.validity);
      action(`Validity set to: ${datepicker?.validity}`)();
    }

    return html`
<auro-datepicker required id="validityExample">
  <span slot="bib.fullscreen.headline">validity Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="validityExampleBtn" @click="${handleClick}">Get validity</auro-button>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const Value: Story = {
  render: () => html`
<auro-datepicker id="valueExample" value="02/02/2022">
  <span slot="bib.fullscreen.headline">value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const ValueEnd: Story = {
  render: () => html`
<auro-datepicker id="valueEndExample" range valueEnd="03/03/2023">
  <span slot="bib.fullscreen.headline">valueEnd Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const Format: Story = {
  render: () => html`
<auro-datepicker format="yyyy/mm/dd">
  <span slot="bib.fullscreen.headline">Format Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,
};

export const Focus: Story = {
  render: () => {
    function handleFocus1Click() {
      const datepicker: AuroDatePicker | null = document.querySelector('#focusExampleElem');
      // @ts-expect-error - TODO: `AuroDatePicker['focus']` is not typed to accept zero arguments
      datepicker?.focus();
    }

    function handleFocus2Click() {
      const datepicker: AuroDatePicker | null = document.querySelector('#focusExampleElem');
      datepicker?.focus('endDate');
    }
    
    return html`
<auro-datepicker id="focusExampleElem" range>
  <span slot="bib.fullscreen.headline">Focus Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="focusExampleBtn" @click="${handleFocus1Click}">Apply focus to datepicker</auro-button>
<auro-button id="focusExampleBtnTwo" @click="${handleFocus2Click}">Apply focus to the second input in datepicker</auro-button>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const HelpText: Story = {
  render: () => html`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">helpText Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="helpText">Choose a date must be today or earlier.</span>
</auro-datepicker>
  `,
};

export const DateSlot: Story = {
  render: () => html`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">dateSlot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="date_12_03_2023">Sold</span>
  <span highlight slot="date_12_04_2023">$89</span>
  <span slot="date_12_05_2023">$100</span>
  <span slot="date_12_06_2023">$2345</span>
  <span highlight slot="date_12_07_2023">$149</span>
  <span highlight slot="date_12_08_2023">$382</span>
  <span slot="date_12_09_2023">$560</span>
</auro-datepicker>
  `,
};

export const PopoverSlot: Story = {
  render: () => html`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">Popover Slot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="popover_12_03_2023">Tickets for this day are sold out</span>
  <span slot="popover_12_04_2023">Tickets for this day are $89</span>
  <span slot="popover_12_05_2023">Tickets for this day are $100</span>
  <span slot="popover_12_06_2023">Tickets for this day are $2345</span>
  <span slot="popover_12_07_2023">Tickets for this day are $149</span>
  <span slot="popover_12_08_2023">Tickets for this day are $382</span>
  <span slot="popover_12_09_2023">Tickets for this day are $560</span>
</auro-datepicker>
  `,
};

export const Localization: Story = {
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector("#localizationExample");
    
      if (datepicker) {
        datepicker.monthNames = ['일월', '이월', '삼월', '사월', '오월', '유월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'];
      }
    }
    
    const template = html`
<auro-datepicker format="yyyy/mm/dd" id="localizationExample">
  <span slot="bib.fullscreen.headline">Localization Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
    `;

    setTimeout(setup, 0);

    return template;
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  async beforeEach() {
    MockDate.set('2025-03-18');
 
    return () => {
      MockDate.reset();
    };
  },
  async play({ canvas, step }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // TODO: Not sure why this isn't working. Once it does, Chromatic snapshot can be disabled
    expect((await screen.findByShadowText('삼월')));
  },
};

export const ResetState: Story = {
  render: () => {
    function handleClick() {
      const datepicker: AuroDatePicker | null = document.querySelector('#resetStateExample');
        datepicker?.reset();
    };

    return html`
<auro-datepicker id="resetStateExample" range minDate="06/30/2025" calendarStartDate="06/30/2025" calendarFocusDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025" setCustomValidityRangeUnderflow="The date you entered is too early.">
  <span slot="bib.fullscreen.headline">Reset Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="resetStateBtn" @click="${handleClick}">Reset</auro-button>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export const DynamicSlot: Story = {
  render: () => {
    // Insert slot content when the datepicker has been opened
    function populateSlotContentExample(event) {
      if (event.detail.expanded) {
        // Array of object(s) containing key, value pairs defining what slot content to render
        const data = [
          {slot: 'date', month: '12', day: '1', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '2', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '3', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '4', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '5', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '6', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '7', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '8', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '9', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '10', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '11', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '12', year: 2023, content: 'Sold'},
          {slot: 'date', month: '12', day: '13', year: 2023, content: '$560'},
          {slot: 'date', month: '12', day: '14', year: 2023, content: '$89', highlight: true},
          {slot: 'date', month: '12', day: '15', year: 2023, content: '$100'},
          {slot: 'date', month: '12', day: '16', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '17', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '18', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '19', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '20', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '21', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '22', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '23', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '24', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '25', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '26', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '27', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '28', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '29', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '30', year: 2023, content: '$2345'},
          {slot: 'date', month: '12', day: '31', year: 2023, content: '$2345'},
          {slot: 'date', month: '1', day: '14', year: 2024, content: '$83', highlight: true},
          {slot: 'date', month: '1', day: '15', year: 2024, content: '$203'},
          {slot: 'date', month: '1', day: '16', year: 2024, content: '$4444'},
          {slot: 'date', month: '1', day: '17', year: 2024, content: '$83', highlight: true},
          {slot: 'date', month: '1', day: '18', year: 2024, content: '$96', highlight: true},
          {slot: 'date', month: '1', day: '19', year: 2024, content: 'Sold'},
          {slot: 'date', month: '1', day: '20', year: 2024, content: 'Sold'},
          {slot: 'popover', month: '12', day: '1', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '2', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '3', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '4', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '5', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '6', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '7', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '8', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '9', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '10', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '11', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '12', year: 2023, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '12', day: '13', year: 2023, content: 'Tickets for this date are $560'},
          {slot: 'popover', month: '12', day: '14', year: 2023, content: 'Tickets for this date are $89'},
          {slot: 'popover', month: '12', day: '15', year: 2023, content: 'Tickets for this date are $100'},
          {slot: 'popover', month: '12', day: '16', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '17', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '18', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '19', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '20', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '21', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '22', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '23', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '24', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '25', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '26', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '27', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '28', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '29', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '30', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '12', day: '31', year: 2023, content: 'Tickets for this date are $2345'},
          {slot: 'popover', month: '1', day: '14', year: 2024, content: 'Tickets for this date are $83'},
          {slot: 'popover', month: '1', day: '15', year: 2024, content: 'Tickets for this date are $203'},
          {slot: 'popover', month: '1', day: '16', year: 2024, content: 'Tickets for this date are $4444'},
          {slot: 'popover', month: '1', day: '17', year: 2024, content: 'Tickets for this date are $83'},
          {slot: 'popover', month: '1', day: '18', year: 2024, content: 'Tickets for this date are $96'},
          {slot: 'popover', month: '1', day: '19', year: 2024, content: 'Tickets for this date are sold out'},
          {slot: 'popover', month: '1', day: '20', year: 2024, content: 'Tickets for this date are sold out'}
        ];
  
        // For each item in the array, parse the keys into an HTML element and insert it into the DOM
        data.forEach((item) => {
          // Create the new element for the slot content
          const slotElement = document.createElement('span');
  
          if (item.month.toString().length === 1) {
            item.month = `0` + item.month;
          }
  
          if (item.day.toString().length === 1) {
            item.day = `0` + item.day;
          }
  
          // Create the slot name from the item's keys
          const slotName = `${item.slot}_${item.month}_${item.day}_${item.year}`;
  
          // Set the slot name and content
          slotElement.setAttribute('slot', slotName);
          slotElement.textContent = item.content;
  
          // Set the 'highlight' attribute on date slot content
          if (item.slot === 'date' && item.highlight) {
            slotElement.setAttribute('highlight', item.highlight ? 'true' : 'false');
          }
  
          // Append the new element to the DOM
          this.appendChild(slotElement);
        });
      }
      
      this.pushSlotContent();
    };

    return html`
<auro-datepicker id="slotContentExample" @auroDatePicker-toggled=${populateSlotContentExample} centralDate="12/13/2023" minDate="12/13/2023" maxDate="01/18/2024" range>
  <span slot="bib.fullscreen.headline">dynamic slot  Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: Is the use of `action` instead of `alert` OK?
export const LogValue: Story = {
  render: () => {
    function handleValueSet() {
      console.warn('Select value changed to:', this.value);
      action(`Select value changed to: ${this.value}`)();
    }

    return html`
<auro-datepicker id="datePickerValueAlert" @auroDatePicker-valueSet="${handleValueSet}">
  <span slot="bib.fullscreen.headline">Alert Value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

// TODO: How to register auro-dialog?
export const InDialog: Story = {
  render: () => {
    function handleClick() {
      const dialog = document.querySelector("#datepicker-dialog");
      dialog?.setAttribute('open', 'true');
    }

    return html`
<div>
  <auro-button id="datepicker-dialog-opener" @click="${handleClick}">Datepicker in Dialog</auro-button>

  <auro-dialog id="datepicker-dialog">
    <span slot="bib.fullscreen.headline">inDialog Example</span>
    <span slot="header">Datepicker in Dialog</span>
    <div slot="content">
      <auro-datepicker />
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

export const CentralDate: Story = {
  render: () => html`
<auro-datepicker centralDate="06/16/1980">
  <span slot="bib.fullscreen.headline">centralDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `
};

export const Custom: Story = {
  render: () => html`
<custom-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">custom-datepicker Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</custom-datepicker>
  `
};

export const SelectedDate: Story = {
  render: () => html`
<auro-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">selectedDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `
};
