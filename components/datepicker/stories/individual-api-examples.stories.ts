/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';
import '../src/registered';
import { AuroDatePicker } from '../src/index';

AuroDatePicker.register('custom-datepicker');

const { args, argTypes } = getStorybookHelpers('auro-datepicker');

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
  component: 'auro-datepicker',
  tags: ['autodocs'],
  title: 'DatePicker/Individual Examples',
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
export const AlertValue = stories.AlertValue;
export const AppearanceInverseRange = stories.AppearanceInverseRange;
export const AppearanceInverse = stories.AppearanceInverse;
export const AriaLabelInputClear = stories.AriaLabelInputClear;
export const Basic = stories.Basic;
export const CalendarFocusDate = stories.CalendarFocusDate;
export const CalendarStartAndEndDate = stories.CalendarStartAndEndDate;
export const CentralDate = stories.CentralDate;
export const Custom = stories.Custom;
export const DateSlot = stories.DateSlot;
export const Disabled = stories.Disabled;
export const DynamicSlot = stories.DynamicSlot;
export const Error = stories.Error;
export const FloaterConfig = stories.FloaterConfig;
export const Focus = stories.Focus;
export const Format = stories.Format;
export const FullscreenBreakpoint = stories.FullscreenBreakpoint;
export const HelpText = stories.HelpText;
export const InDialog = stories.InDialog;
export const Inputmode = stories.Inputmode;
export const Localization = stories.Localization;
export const MaxDate = stories.MaxDate;
export const MinDate = stories.MinDate;
export const NoValidate = stories.NoValidate;
export const PopoverSlot = stories.PopoverSlot;
export const Range = stories.Range;
export const ReferenceDates = stories.ReferenceDates;
export const Required = stories.Required;
export const ResetState = stories.ResetState;
export const Stacked = stories.Stacked;
export const UpdateMaxDate = stories.UpdateMaxDate;
export const UpdateMinDate = stories.UpdateMinDate;
export const Validity = stories.Validity;
export const ValueEnd = stories.ValueEnd;
export const Value = stories.Value;
