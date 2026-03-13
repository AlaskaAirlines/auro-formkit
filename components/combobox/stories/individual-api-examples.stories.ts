/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../../menu/src/registered';
import '../src/registered';
import { AuroCombobox } from '../src/index';

AuroCombobox.register('custom-combobox');

const { args, argTypes } = getStorybookHelpers('auro-combobox');

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
  component: 'auro-combobox',
  tags: ['autodocs'],
  title: 'Combobox/Individual Examples',
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
export const Airports = stories.Airports;
export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled;
export const AppearanceInverseError = stories.AppearanceInverseError;
export const AppearanceInverse = stories.AppearanceInverse;
export const Basic = stories.Basic;
export const Checkmark = stories.Checkmark;
export const Custom = stories.Custom;
export const Disabled = stories.Disabled;
export const DisplayValue = stories.DisplayValue;
export const DynamicMenu = stories.DynamicMenu;
export const Error = stories.Error;
export const ExternalSelection = stories.ExternalSelection;
export const Filter = stories.Filter;
export const FloaterConfig = stories.FloaterConfig;
export const Focus = stories.Focus;
export const FullscreenBreakpoint = stories.FullscreenBreakpoint;
export const HelpText = stories.HelpText;
export const InDialog = stories.InDialog;
export const Inputmode = stories.Inputmode;
export const Loading = stories.Loading;
export const MaxHeight = stories.MaxHeight;
export const NoFilter = stories.NoFilter;
export const NoMatch = stories.NoMatch;
export const NoValidate = stories.NoValidate;
export const OptionalLabel = stories.OptionalLabel;
export const PersistInput = stories.PersistInput;
export const Persistent = stories.Persistent;
export const ProgrammaticValue = stories.ProgrammaticValue;
export const Required = stories.Required;
export const ResetState = stories.ResetState;
export const Suggestion = stories.Suggestion;
export const SwapValue = stories.SwapValue;
export const TypeCreditCard = stories.TypeCreditCard;
export const TypeMonthDayYear = stories.TypeMonthDayYear;
export const Value = stories.Value;
