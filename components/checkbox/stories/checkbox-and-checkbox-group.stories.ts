/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';

import { html } from 'lit-html';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';

import { AuroCheckbox } from '../src/auro-checkbox';
import { AuroCheckboxGroup } from '../src/auro-checkbox-group';

import '@aurodesignsystem/auro-button';

AuroCheckbox.register(); // registering to `auro-checkbox`
AuroCheckboxGroup.register(); // registering to `auro-checkbox-group`

AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');

// Import all HTML files from apiExamples
const apiExamples = import.meta.glob('../apiExamples/*.html', { query: '?raw', import: 'default', eager: true });
const apiExamplesJs = import.meta.glob('../apiExamples/*.js', { query: '?raw', import: 'default', eager: true });

// Generate stories dynamically from apiExamples
const specialConfigs = {
  'appearance-inverse-disabled': {
    globals: {
      backgrounds: { value: 'dark' },
    },
  },
  'appearance-inverse': {
    globals: {
      backgrounds: { value: 'dark' },
    },
  },
  'appearance-inverse-error': {
    globals: {
      backgrounds: { value: 'dark' },
    },
  },
  'required': {
    play: async ({ canvas }: { canvas: any }) => {
      const checkboxes = await canvas.findAllByShadowRole('checkbox');
      const firstCheckbox = checkboxes[0];
      await userEvent.click(firstCheckbox);
      await userEvent.click(firstCheckbox);
    }
  },
  'reset-state': {
    parameters: {
      docs: {
        source: { type: 'code' },
      },
      chromatic: { disableSnapshot: true },
    },
    play: async ({ canvas }: { canvas: any }) => {
      const button = await canvas.findByShadowRole('button', { name: /Reset/i });
      await userEvent.click(button);

      const firstCheckbox = (await canvas.findAllByShadowRole('checkbox'))[0];
      expect(firstCheckbox).not.toBeChecked();
    }
  },
  'custom': {
    parameters: {
      chromatic: { disableSnapshot: true },
    }
  }
};

const meta: Meta = {
  component: "auro-checkbox-group",
  title: 'Checkbox & Checkbox Group',
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj;

const stories = generateStoriesFromGlobData(apiExamples, apiExamplesJs, specialConfigs) as Record<string, Story>;

// Export all generated stories
// eslint-disable-next-line @typescript-eslint/prefer-destructuring-assignment
// sourcery skip: use-object-destructuring
export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled;
export const AppearanceInverseError = stories.AppearanceInverseError;
export const AppearanceInverse = stories.AppearanceInverse;
export const Basic = stories.Basic;
export const Custom = stories.Custom;
export const DisabledGroup = stories.DisabledGroup;
export const Disabled = stories.Disabled;
export const ErrorGroup = stories.ErrorGroup;
export const Horizontal = stories.Horizontal;
export const OptionalLabel = stories.OptionalLabel;
export const Required = stories.Required;
export const ResetState = stories.ResetState;

// Add any additional stories that might not have direct HTML counterparts
export const DisabledCheckboxWithinGroup: Story = {
  render: () => html`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `
};

export const HorizontalLimit: Story = {
  render: () => html`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontalLimit" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontalLimit" id="checkbox-horizontalLimit2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontalLimit" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
  <auro-checkbox value="not sure" name="horizontalLimit" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
</auro-checkbox-group>
  `
};