/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../src/registered';
import { AuroInput } from '../src/index';

AuroInput.register('custom-input');

const { args, argTypes } = getStorybookHelpers('auro-input');

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
  component: 'auro-input',
  tags: ['autodocs'],
  title: 'Input/Individual Examples',
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

// export const ApiGroupProperties = stories.ApiGroupProperties;
// export const ApiProperties = stories.ApiProperties;
// export const ApiSlots = stories.ApiSlots;
// export const AppearanceInverse = stories.AppearanceInverse;
// export const AppearanceInverseDescription = stories.AppearanceInverseDescription;
// export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled;
// export const AppearanceInverseDropdown = stories.AppearanceInverseDropdown;
// export const AppearanceInverseError = stories.AppearanceInverseError;
// export const AppearanceInverseGroup = stories.AppearanceInverseGroup;
// export const AppearanceInverseHelptext = stories.AppearanceInverseHelptext;
// export const AppearanceInverseSnowflake = stories.AppearanceInverseSnowflake;
// export const Basic = stories.Basic;
// export const BasicStandalone = stories.BasicStandalone;
// export const CounterDisabled = stories.CounterDisabled;
// export const CounterError = stories.CounterError;
// export const CounterHelptext = stories.CounterHelptext;
// export const CounterMinmax = stories.CounterMinmax;
// export const Custom = stories.Custom;
// export const Description = stories.Description;
// export const Disabled = stories.Disabled;
// export const Dropdown = stories.Dropdown;
// export const DropdownError = stories.DropdownError;
// export const DropdownErrorGroup = stories.DropdownErrorGroup;
// export const DropdownMobileProperties = stories.DropdownMobileProperties;
// export const DropdownSnowflake = stories.DropdownSnowflake;
// export const DropdownValueText = stories.DropdownValueText;
// export const Events = stories.Events;
// export const FloaterConfig = stories.FloaterConfig;
// export const GroupCounterMax = stories.GroupCounterMax;
// export const GroupMax = stories.GroupMax;
