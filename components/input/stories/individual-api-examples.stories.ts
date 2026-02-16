/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes } = getStorybookHelpers("auro-input");
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';

import { AuroInput } from '../src/index';  
import '@aurodesignsystem/auro-button';
AuroInput.register();
AuroInput.register('custom-input');


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
  'appearance-inverse-error': {
    globals: {
      backgrounds: { value: 'dark' },
    },
    tags: ['!autodocs'],
  },
  'appearance-inverse-password': {
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
};

const ApiExamples: Meta = {
  component: 'auro-input',
  tags: ['autodocs'],
  title: 'Input',
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

// CLASSIC LAYOUT EXAMPLES
export const ActiveLabel = stories.ActiveLabel;
export const AppearanceInverseDisabled = stories.AppearanceInverseDisabled;
export const AppearanceInverseError = stories.AppearanceInverseError;
export const AppearanceInversePassword = stories.AppearanceInversePassword;
export const AppearanceInverse = stories.AppearanceInverse;
export const Basic = stories.Basic;
export const CreditCardIcon = stories.CreditCardIcon;
export const CreditCard = stories.CreditCard;
export const Custom = stories.Custom;
export const Day = stories.Day;
export const Disabled = stories.Disabled;
export const Email = stories.Email;
export const Error = stories.Error;
export const Format = stories.Format;
export const Inputmode = stories.Inputmode;
export const MaxDate = stories.MaxDate;
export const MaxLength = stories.MaxLength;
export const MaxNumber = stories.MaxNumber;
export const MinDate = stories.MinDate;
export const MinLength = stories.MinLength;
export const MinNumber = stories.MinNumber;
export const MonthDayYear = stories.MonthDayYear;
export const MonthYear = stories.MonthYear;
export const NoValidate = stories.NoValidate;
export const Number = stories.Number;
export const OptionalLabel = stories.OptionalLabel;
export const Password = stories.Password;
export const Pattern = stories.Pattern;
export const Placeholder = stories.Placeholder;
export const ProgrammaticValue = stories.ProgrammaticValue;
export const Readonly = stories.Readonly;
export const Required = stories.Required;
export const ResetState = stories.ResetState;
export const SetCustomValidity = stories.SetCustomValidity;
export const SwapValue = stories.SwapValue;
export const TelFormat = stories.TelFormat;
export const Tel = stories.Tel;
export const ValidateOnInput = stories.ValidateOnInput;
export const Value = stories.Value;
export const YearMonthDay = stories.YearMonthDay;