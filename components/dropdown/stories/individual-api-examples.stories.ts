/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../src/registered';
import { AuroDropdown } from '../src/index';

AuroDropdown.register('custom-dropdown');

const { args, argTypes } = getStorybookHelpers('auro-dropdown');

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
  component: 'auro-dropdown',
  tags: ['autodocs'],
  title: 'Dropdown/Individual Examples',
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
export const BasicButton = stories.BasicButton; 
export const BasicIcon = stories.BasicIcon; 
export const Basic = stories.Basic; 
export const Chevron = stories.Chevron; 
export const CustomDimensions = stories.CustomDimensions; 
export const Custom = stories.Custom; 
export const Disabled = stories.Disabled; 
export const Error = stories.Error; 
export const FloaterConfig = stories.FloaterConfig; 
export const FullscreenBreakpoint = stories.FullscreenBreakpoint; 
export const HelpTextError = stories.HelpTextError; 
export const HelpText = stories.HelpText; 
export const InDialog = stories.InDialog; 
export const MatchWidth = stories.MatchWidth; 
export const NoToggle = stories.NoToggle; 
export const ProgrammaticallyHide = stories.ProgrammaticallyHide; 
export const ProgrammaticallyShow = stories.ProgrammaticallyShow; 
