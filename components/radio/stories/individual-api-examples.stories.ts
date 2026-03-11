/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes } = getStorybookHelpers("auro-radio-group");
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';

import '../src/registered';
import { AuroRadio, AuroRadioGroup } from '../src/index';
import '@aurodesignsystem/auro-button';

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

// Import all HTML files from apiExamples
const apiExamples = import.meta.glob('../apiExamples/*.html', { query: '?raw', import: 'default', eager: true });
const apiExamplesJs = import.meta.glob('../apiExamples/*.js', { query: '?raw', import: 'default', eager: true });

// Generate stories dynamically from apiExamples
const specialConfigs = {
  'appearance-inverse-disabled': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-error': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-checked': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-group': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  }
};

const ApiExamples: Meta = {
  component: 'auro-radio-group',
  subcomponents: { AuroRadio: 'auro-radio' },
  tags: ['autodocs'],
  title: 'Radio & Radio Group',
  args,
  argTypes,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default ApiExamples;

type Story = StoryObj;

const stories = generateStoriesFromGlobData(apiExamples, apiExamplesJs, specialConfigs) as Record<string, Story>;

// Export all generated stories
// eslint-disable-next-line @typescript-eslint/prefer-destructuring-assignment
// sourcery skip: use-object-destructuring
export const AccordionExample = stories.AccordionExample; 
export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled; 
export const AppearanceInverseChecked = stories.AppearanceInverseChecked; 
export const AppearanceInverseError = stories.AppearanceInverseError; 
export const AppearanceInverseGroup = stories.AppearanceInverseGroup; 
export const AppearanceInverse = stories.AppearanceInverse; 
export const BasicStandalone = stories.BasicStandalone; 
export const Basic = stories.Basic; 
export const Checked = stories.Checked; 
export const Custom = stories.Custom; 
export const Disabled = stories.Disabled;
// export const ResetState = stories.ResetState;
export const Required = stories.Required; 
export const OptionalLabel = stories.OptionalLabel; 
export const MultilineGroup = stories.MultilineGroup; 
export const Error = stories.Error; 
export const Horizontal = stories.Horizontal; 
export const Dynamic = stories.Dynamic;
