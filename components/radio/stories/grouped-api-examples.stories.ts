/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { generateGroupedStory } from '@aurodesignsystem/utils';

import '../src/registered';
import { AuroRadio, AuroRadioGroup } from '../src/index';
import '@aurodesignsystem/auro-button';

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

// Import all HTML files from apiExamples
const apiExamples = import.meta.glob('../apiExamples/*.html', { query: '?raw', import: 'default', eager: true });
const apiExamplesJs = import.meta.glob('../apiExamples/*.js', { query: '?raw', import: 'default', eager: true });

const ApiExamples: Meta = {
  component: 'auro-radio-group',
  subcomponents: { AuroRadio: 'auro-radio' },
  title: 'Radio & Radio Group/Grouped Examples',
  tags: ['chromatic-enabled'],
};

export default ApiExamples;

type Story = StoryObj;

export const LightExampleStories: Story = generateGroupedStory(apiExamples, apiExamplesJs, {
  exclude: ['inverse', 'reset-state']
}) as Story;

export const DarkExampleStories: Story = generateGroupedStory(apiExamples, apiExamplesJs, {
  include: ['inverse'],
  storyConfig: {
    globals: {
      backgrounds: { value: 'dark' },
    }
  }
}) as Story;
