/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../src/registered';
import '../../menu/src/registered';
import { AuroSelect } from '../src/index';

AuroSelect.register('custom-select');

const { args, argTypes } = getStorybookHelpers('auro-select');

// Import all HTML files from apiExamples
const apiExamples = import.meta.glob('../apiExamples/*.html', { query: '?raw', import: 'default', eager: true });
const apiExamplesJs = import.meta.glob('../apiExamples/*.js', { query: '?raw', import: 'default', eager: true });

const specialConfigs = {
  'appearance-inverse': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-description': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-disabled': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-dropdown': {
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
  'appearance-inverse-group': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-helptext': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-snowflake': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
};

const ApiExamples: Meta = {
  component: 'auro-select',
  tags: ['autodocs'],
  title: 'Select/Individual Examples',
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
export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled;
export const AppearanceInverseError = stories.AppearanceInverseError;
export const AppearanceInverse = stories.AppearanceInverse;
export const Autocomplete = stories.Autocomplete;
export const Basic = stories.Basic;
export const CustomBibHeight = stories.CustomBibHeight;
export const CustomErrorValidity  = stories.CustomErrorValidity;
export const Custom = stories.Custom;
export const Disabled = stories.Disabled;
export const Error = stories.Error;
export const FlexMenuWidth = stories.FlexMenuWidth;
export const FloaterConfig = stories.FloaterConfig;
export const FullscreenBreakpoint = stories.FullscreenBreakpoint;
export const FullscreenDisabled = stories.FullscreenDisabled;
export const HelpText = stories.HelpText;
export const InDialog  = stories.InDialog;
export const Label = stories.Label;
export const Loading  = stories.Loading;
export const MultiSelect = stories.MultiSelect;
export const NestedSelect  = stories.NestedSelect;
export const NoCheckmark = stories.NoCheckmark;
export const OptionalLabel = stories.OptionalLabel;
export const Placeholder = stories.Placeholder;
export const Required = stories.Required;
export const ResetState  = stories.ResetState;
export const UpdateActiveOption  = stories.UpdateActiveOption;
export const ValueAlert  = stories.ValueAlert;
export const ValueExtraction  = stories.ValueExtraction;
export const Value  = stories.Value;
export const WithIcons = stories.WithIcons;
export const WithSubmenus = stories.WithSubmenus;
