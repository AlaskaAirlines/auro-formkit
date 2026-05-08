/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-helptext',
  title: 'HelpText',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-helptext'
  }
};
export default meta;

type Story = StoryObj;

// ─── Default help text ──────────────────────────────────────────────────────
export const HelpTextDefault: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-helptext>This is help text content.</auro-helptext>
  `,
};

// ─── Error help text ─────────────────────────────────────────────────────────
export const HelpTextError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-helptext error>This is an error message.</auro-helptext>
  `,
};

// ─── Inverse appearance ──────────────────────────────────────────────────────
export const HelpTextInverse: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-helptext appearance="inverse">This is inverse help text.</auro-helptext>
</div>
  `,
};

// ─── Inverse error ───────────────────────────────────────────────────────────
export const HelpTextInverseError: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="background: var(--ds-color-background-darkest, #07244a); padding: 2rem;">
  <auro-helptext appearance="inverse" error>This is an inverse error message.</auro-helptext>
</div>
  `,
};
