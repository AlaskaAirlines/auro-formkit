/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { userEvent, expect } from 'storybook/test';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes, events } = getStorybookHelpers("auro-form");

import { html } from 'lit';

import '../src/registered';
import '@aurodesignsystem/auro-button';
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroDatePicker } from '@aurodesignsystem/auro-datepicker';
import { AuroForm } from '../src/index';

AuroInput.register();
AuroDatePicker.register();
AuroForm.register('custom-form');

const meta: Meta = {
  component: 'auro-form',
  title: 'Form',
  tags: ['autodocs'],
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

type Story = StoryObj;

/**
 * Filling a required field makes the submit button enabled.
 * Clicking submit fires the `submit` event with the correct form value.
 */
export const SuccessfulSubmit: Story = {
  tags: ['!autodocs'],
  play: async ({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) => {
    const form = canvasElement.querySelector('auro-form') as any;

    let submitted = false;
    let submitValue: any = null;
    form.addEventListener('submit', (e: any) => { submitted = true; submitValue = e.detail.value; });

    // Type into the auro-input's native text box
    const input = await canvas.findByShadowRole('textbox');
    await userEvent.type(input, 'Seattle');

    // Tab away to trigger blur → auro-input validates → auroFormElement-validated fires
    await userEvent.tab();
    await form.updateComplete;

    // Submit button should now be enabled (field is valid)
    const submitBtn = canvasElement.querySelector('auro-button[type="submit"]') as any;
    expect(submitBtn.hasAttribute('disabled')).toBe(false);

    // Click the submit button
    const submitBtnText = await canvas.findByShadowText('Submit');
    await userEvent.click(submitBtnText);
    await form.updateComplete;

    // submit event should have fired with the entered value
    expect(submitted).toBe(true);
    expect(submitValue).toEqual({ searchBox: 'Seattle' });
  },
  render: () => html`
<auro-form>
  <auro-input id="success-input" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `
};

/**
 * Clicking reset clears form values and fires the `reset` event
 * with the previous value in `event.detail.previousValue`.
 * The reset button starts disabled and enables once the user interacts with the form.
 */
export const ResetForm: Story = {
  tags: ['!autodocs'],
  play: async ({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) => {
    const form = canvasElement.querySelector('auro-form') as any;

    let resetFired = false;
    let previousValue: any = null;
    form.addEventListener('reset', (e: any) => { resetFired = true; previousValue = e.detail.previousValue; });

    // Reset button starts disabled (form is in initial state)
    const resetBtn = canvasElement.querySelector('auro-button[type="reset"]') as any;
    expect(resetBtn.hasAttribute('disabled')).toBe(true);

    // Type a value into the input (value change alone enables reset — no blur needed)
    const input = await canvas.findByShadowRole('textbox');
    await userEvent.type(input, 'Los Angeles');
    await form.updateComplete;

    // Reset button should now be enabled
    expect(resetBtn.hasAttribute('disabled')).toBe(false);

    // Click reset
    const resetBtnText = await canvas.findByShadowText('Reset');
    await userEvent.click(resetBtnText);
    await form.updateComplete;

    // reset event should have fired with the previous value
    expect(resetFired).toBe(true);
    expect(previousValue).toEqual({ searchBox: 'Los Angeles' });

    // Form should be back in initial state
    expect(form.isInitialState).toBe(true);
  },
  render: () => html`
<auro-form>
  <auro-input id="reset-input" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <auro-button type="reset">Reset</auro-button>
  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `
};

/**
 * Pressing Enter while focused in a valid form field submits the form.
 */
export const EnterKeySubmit: Story = {
  tags: ['!autodocs'],
  play: async ({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) => {
    const form = canvasElement.querySelector('auro-form') as any;

    let submitted = false;
    let submitValue: any = null;
    form.addEventListener('submit', (e: any) => { submitted = true; submitValue = e.detail.value; });

    const input = await canvas.findByShadowRole('textbox');

    // Type a value — Enter invokes form.submit() via handleKeyDown,
    // which force-validates so an explicit blur is not required here
    await userEvent.type(input, 'Seattle{Enter}');
    await form.updateComplete;

    expect(submitted).toBe(true);
    expect(submitValue).toEqual({ searchBox: 'Seattle' });
  },
  render: () => html`
<auro-form>
  <auro-input id="enter-key-input" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `
};

/**
 * Verifies that `AuroForm` can be registered under a custom element tag name.
 * The `<custom-form>` element should behave identically to `<auro-form>`:
 * accepting input, enabling the submit button when the field is valid,
 * and firing the `submit` event with the correct value.
 */
export const CustomRegistration: Story = {
  tags: ['!autodocs'],
  play: async ({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) => {
    // Verify the custom element is registered in the registry
    expect(customElements.get('custom-form')).toBeDefined();

    const form = canvasElement.querySelector('custom-form') as any;
    expect(form).not.toBeNull();

    let submitted = false;
    let submitValue: any = null;
    form.addEventListener('submit', (e: any) => { submitted = true; submitValue = e.detail.value; });

    // Type into the shadow-DOM textbox
    const input = await canvas.findByShadowRole('textbox');
    await userEvent.type(input, 'Anchorage');

    // Tab away to trigger validation
    await userEvent.tab();
    await form.updateComplete;

    // Submit button should now be enabled
    const submitBtn = canvasElement.querySelector('auro-button[type="submit"]') as any;
    expect(submitBtn.hasAttribute('disabled')).toBe(false);

    // Click submit
    const submitBtnText = await canvas.findByShadowText('Submit');
    await userEvent.click(submitBtnText);
    await form.updateComplete;

    expect(submitted).toBe(true);
    expect(submitValue).toEqual({ destination: 'Anchorage' });
  },
  render: () => html`
<custom-form>
  <auro-input id="custom-reg-input" name="destination" required>
    <span slot="label">Destination</span>
  </auro-input>
  <auro-button type="submit">Submit</auro-button>
</custom-form>
  `
};

/**
 * A form with multiple named fields collects all values under their respective `name` keys
 * and includes them all in `event.detail.value` on submit.
 */
export const MultiFieldSubmit: Story = {
  tags: ['!autodocs'],
  play: async ({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) => {
    const form = canvasElement.querySelector('auro-form') as any;

    let submitted = false;
    let submitValue: any = null;
    form.addEventListener('submit', (e: any) => { submitted = true; submitValue = e.detail.value; });

    const inputs = await canvas.findAllByShadowRole('textbox');

    // Type in first field then tab to the second — this blurs the first and triggers its validation
    await userEvent.type(inputs[0], 'Jane');
    await userEvent.tab();
    await form.updateComplete;

    // Type in second field then tab out — blurs and validates the second field
    await userEvent.type(inputs[1], 'Doe');
    await userEvent.tab();
    await form.updateComplete;

    // Both fields valid — click submit
    const submitBtnText = await canvas.findByShadowText('Submit');
    await userEvent.click(submitBtnText);
    await form.updateComplete;

    expect(submitted).toBe(true);
    expect(submitValue).toEqual({
      firstName: 'Jane',
      lastName: 'Doe'
    });
  },
  render: () => html`
<auro-form>
  <auro-input id="multi-first" name="firstName" required>
    <span slot="label">First name</span>
  </auro-input>
  <auro-input id="multi-last" name="lastName" required>
    <span slot="label">Last name</span>
  </auro-input>
  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `
};
