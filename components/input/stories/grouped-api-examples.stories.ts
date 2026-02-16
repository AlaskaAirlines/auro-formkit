/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { generateGroupedStory } from '@aurodesignsystem/utils';
import { AuroInput } from '../src/index';  
import '@aurodesignsystem/auro-button';
AuroInput.register();
AuroInput.register('custom-input');

// Import all HTML files from apiExamples
const apiExamples = import.meta.glob('../apiExamples/*.html', { query: '?raw', import: 'default', eager: true });
const apiExamplesJs = import.meta.glob('../apiExamples/*.js', { query: '?raw', import: 'default', eager: true });

const ApiExamples: Meta = {
  component: 'auro-input',
  title: 'Input/Grouped Examples',
  tags: ['chromatic-enabled'],
};

export default ApiExamples;

type Story = StoryObj;

export const LightExampleStories: Story = generateGroupedStory(apiExamples, apiExamplesJs, {
  exclude: ['inverse']
}) as Story;

export const DarkExampleStories: Story = generateGroupedStory(apiExamples, apiExamplesJs, {
  include: ['inverse'],
  storyConfig: {
    globals: {
      backgrounds: { value: 'dark' },
    }
  }
}) as Story;
