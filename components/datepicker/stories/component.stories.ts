/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-datepicker',
  title: 'DatePicker/Interaction Tests',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-datepicker'
  }
};
export default meta;

type Story = StoryObj;

// Helper: open the bib and return an array of enabled (non-disabled) cell buttons.
// Awaits the full shadow DOM rendering chain before querying.
async function openBibAndGetEnabledCellBtns(el: any): Promise<HTMLButtonElement[]> {
  el.inputList[0].click();
  await el.updateComplete;

  // Wait for the calendar to become visible and finish rendering
  const calendar: any = el.calendar;
  await calendar.updateComplete;
  await new Promise((r) => setTimeout(r, 50));

  const calendarMonth: any = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
  await calendarMonth.updateComplete;

  const cells = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
  return [...cells]
    .map((c: any) => c.shadowRoot.querySelector('button') as HTMLButtonElement)
    .filter((btn) => btn && !btn.disabled);
}

// ─── Bib opens when clicking the date input ──────────────────────────────────
export const DatepickerBibOpensOnClick: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker centralDate="03/01/2025">
  <span slot="fromLabel">Departure date</span>
</auro-datepicker>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;

    el.inputList[0].click();
    await el.updateComplete;
    await el.dropdown.updateComplete;

    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Clicking a calendar cell sets value and closes bib ──────────────────────
export const DatepickerCalendarSelectsDate: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker centralDate="03/01/2025">
  <span slot="fromLabel">Departure date</span>
</auro-datepicker>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;

    const enabledBtns = await openBibAndGetEnabledCellBtns(el);
    enabledBtns[0].click();
    await el.updateComplete;

    await expect(el.value).toBeTruthy();
  },
};

// ─── Range mode — selecting start and end date populates both inputs ──────────
export const DatepickerRangeSelectsBothDates: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker range centralDate="03/01/2025">
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
</auro-datepicker>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;

    const enabledBtns = await openBibAndGetEnabledCellBtns(el);

    // Select start date (first enabled day)
    enabledBtns[0].click();
    await el.updateComplete;

    // Select end date (third enabled day — ensures a later date than start)
    enabledBtns[2].click();
    await el.updateComplete;

    await expect(el.value).toBeTruthy();
    await expect(el.valueEnd).toBeTruthy();
  },
};

// ─── Required — valueMissing error shown after focus + blur ──────────────────
export const DatepickerRequiredValidationError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker required>
  <span slot="fromLabel">Departure date</span>
  <span slot="helpText">Select a departure date.</span>
</auro-datepicker>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-datepicker') as any;
    await el.updateComplete;

    el.focus();
    el.blur();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.getAttribute('validity')).toBe('valueMissing');
  },
};

// ─── Preset value — input displays the pre-configured date ───────────────────
export const DatepickerPresetValue: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker value="03/15/2025">
  <span slot="fromLabel">Departure date</span>
</auro-datepicker>
  `,
};

// ─── Hover pseudo-state on the date input trigger ────────────────────────────
export const DatepickerHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-datepicker>
  <span slot="fromLabel">Departure date</span>
</auro-datepicker>
  `,
};
DatepickerHover.parameters = {
  pseudo: {
    hover: true,
  }
};
