/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-datepicker',
  title: 'DatePicker/Playground',
  tags: ['autodocs'],
  parameters: {
    rootSelector: 'auro-datepicker'
  }
};
export default meta;

type Story = StoryObj;

// export const CounterAtMax: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter min="0" max="3">
//   Adults
//   <span slot="description">Max: 3</span>
// </auro-counter>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const buttons = await canvas.findAllByShadowRole('button');
//     const plusButton = buttons[1];
//     await userEvent.click(plusButton);
//     await userEvent.click(plusButton);
//     await userEvent.click(plusButton);
//     await expect(plusButton).toBeDisabled();
//   },
// };

// export const DropdownOpenWithCount: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter-group isDropdown>
//   <span slot="bib.fullscreen.headline">Passengers</span>
//   <div slot="label">Passengers</div>
//   <div slot="valueText">Select passengers</div>
//   <auro-counter>
//     Adults
//     <span slot="description">18 years or older</span>
//   </auro-counter>
//   <auro-counter>
//     Children
//     <span slot="description">2–17 years</span>
//   </auro-counter>
// </auro-counter-group>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const trigger = await canvas.findByShadowText(/Select passengers/i);
//     await userEvent.click(trigger);
//     const plusButtons = await canvas.findAllByShadowRole('button', { name: '+' });
//     // Increment Adults (first plus button) twice
//     await userEvent.click(plusButtons[0]);
//     await userEvent.click(plusButtons[0]);
//   },
// };

// export const GroupMaxReached: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter-group max="4" min="0">
//   <div slot="label">Passengers</div>
//   <div slot="helpText">Total must be 4 or fewer</div>
//   <auro-counter> Adults </auro-counter>
//   <auro-counter> Children </auro-counter>
// </auro-counter-group>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const buttons = await canvas.findAllByShadowRole('button');
//     const firstPlusButton = buttons[1];
//     const secondPlusButton = buttons[3];
//     await userEvent.click(firstPlusButton);
//     await userEvent.click(firstPlusButton);
//     await userEvent.click(secondPlusButton);
//     await userEvent.click(secondPlusButton);
//     await expect(firstPlusButton).toBeDisabled();
//     await expect(secondPlusButton).toBeDisabled();
//   },
// };

// export const DropdownOpen: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter-group isDropdown>
//   <span slot="bib.fullscreen.headline">Passengers</span>
//   <div slot="label">Passengers</div>
//   <div slot="valueText">Open dropdown</div>
//   <auro-counter>
//     Adults
//     <span slot="description">18 years or older</span>
//   </auro-counter>
//   <auro-counter>
//     Children
//     <span slot="description">2–17 years</span>
//   </auro-counter>
// </auro-counter-group>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const trigger = await canvas.findByShadowText(/Open dropdown/i);
//     await userEvent.click(trigger);
//   },
// };

// export const DropdownOpenWithError: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter-group isDropdown>
//   <span slot="ariaLabel.bib.close">Close Popup</span>
//   <span slot="bib.fullscreen.headline">Passengers</span>
//   <div slot="label">Passengers</div>
//   <div slot="valueText">View errors</div>
//   <auro-counter error="Custom error on Adults counter">
//     Adults
//     <span slot="description">18 years or older</span>
//   </auro-counter>
//   <auro-counter error="Custom error on Children counter">
//     Children
//     <span slot="description">2–17 years</span>
//   </auro-counter>
// </auro-counter-group>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const trigger = await canvas.findByShadowText(/View errors/i);
//     await userEvent.click(trigger);
//   },
// };

// export const DropdownSnowflakeOpen: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter-group max="10" min="2" isDropdown layout="snowflake">
//   <span slot="ariaLabel.bib.close">Close Popup</span>
//   <div slot="bib.fullscreen.headline">Group fullscreen label</div>
//   <div slot="label">Snowflake Dropdown Group</div>
//   <div slot="helpText">Total must be between 2-10</div>

//   <auro-counter> Counter 1 </auro-counter>
//   <auro-counter> Counter 2 </auro-counter>
// </auro-counter-group>
//   `,
//   async play({ canvas }: { canvas: any }) {
//     const trigger = await canvas.findByShadowText(/Snowflake Dropdown Group/i);
//     await userEvent.click(trigger);
//   },
// };
//
// export const CounterWithHover: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   render: () => html`
// <auro-counter min="0" max="3">
//   Adults
//   <span slot="description">Max: 3</span>
// </auro-counter>
//   `,
// };
//
// CounterWithHover.parameters = { 
//   pseudo: { 
//     hover: true,
//     active: true,
//   }
// };
