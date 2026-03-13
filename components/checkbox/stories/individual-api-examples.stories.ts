/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { args, argTypes } = getStorybookHelpers("auro-checkbox-group");
import { generateStoriesFromGlobData } from '@aurodesignsystem/utils';

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
  }
};

const ApiExamples: Meta = {
  component: 'auro-checkbox-group',
  subcomponents: { AuroCheckbox: 'auro-checkbox' },
  tags: ['autodocs'],
  title: 'Checkbox & Checkbox Group/Individual Examples',
  args,
  argTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VpUz89Ov6ImBpY5YvzYbZW/Auro-toolkit?node-id=0-1066&m=dev',
    },
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
export const Basic = stories.Basic;
export const Custom = stories.Custom;
export const DisabledGroup = stories.DisabledGroup;
export const Disabled = stories.Disabled;
export const ErrorGroup = stories.ErrorGroup;
export const Horizontal = stories.Horizontal;
export const OptionalLabel = stories.OptionalLabel;
export const Required = stories.Required;
export const ResetState = stories.ResetState;
