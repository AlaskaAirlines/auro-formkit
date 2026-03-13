/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../src/registered';
import { AuroMenu, AuroMenuOption } from '../src/index';

AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menu-option');

const { args, argTypes } = getStorybookHelpers('auro-menu');

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
  component: 'auro-menu',
  tags: ['autodocs'],
  title: 'Menu & Menu Option/Individual Examples',
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
export const AllowDeselect = stories.AllowDeselect;
export const Basic = stories.Basic;
export const Custom = stories.Custom;
export const DisabledMenu = stories.DisabledMenu;
export const Disabled = stories.Disabled;
export const Hidden = stories.Hidden;
export const Hr = stories.Hr;
export const Keys = stories.Keys;
export const Loading = stories.Loading;
export const MatchWord = stories.MatchWord;
export const MultiSelect = stories.MultiSelect;
export const NestedMenu = stories.NestedMenu;
export const Nocheckmark = stories.Nocheckmark;
export const Preselect = stories.Preselect;
export const Reset = stories.Reset;
export const RestrictedWidth = stories.RestrictedWidth;
export const Scroll = stories.Scroll;
export const SelectAllMatchingOptions = stories.SelectAllMatchingOptions;
