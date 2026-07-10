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
export const AppearanceInverse = stories.AppearanceInverse;
export const Autocomplete = stories.Autocomplete;
export const Basic = stories.Basic;
export const Disabled = stories.Disabled;
export const Error = stories.Error;
export const FlexMenuWidth = stories.FlexMenuWidth;
export const FullscreenBreakpoint = stories.FullscreenBreakpoint;
export const MultiSelect = stories.MultiSelect;
export const NoCheckmark = stories.NoCheckmark;
export const Placeholder = stories.Placeholder;
export const Required = stories.Required;
export const WithSubmenus = stories.WithSubmenus;
export const DisplayValue = stories.DisplayValue;
export const DisabledOptions = stories.DisabledOptions;
export const NoValidate = stories.NoValidate;
export const Placement = stories.Placement;
export const Shift = stories.Shift;
export const NoFlip = stories.NoFlip;
export const Offset = stories.Offset;
export const Fluid = stories.Fluid;
export const MatchWidth = stories.MatchWidth;
export const Appearance = stories.Appearance;
export const CustomValidity = stories.CustomValidity;
export const LargeFullscreenHeadline = stories.LargeFullscreenHeadline;
export const CssParts = stories.CssParts;
