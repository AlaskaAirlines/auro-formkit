// Debug script to test generateGroupedStory function
import { generateGroupedStory } from './packages/utils/src/storyHelpers.js';

// Mock data
const mockApiExamples = {
  '../apiExamples/basic.html': '<div>Basic Example</div>',
  '../apiExamples/advanced.html': '<div>Advanced Example</div>'
};

const mockApiExamplesJs = {};

// Test the function
const result = generateGroupedStory(mockApiExamples, mockApiExamplesJs, {
  exclude: ['inverse'],
  storyConfig: {
    tags: ['chromatic-enabled'],
  }
});

console.log('Generated story config:');
console.log(JSON.stringify(result, null, 2));
console.log('Tags:', result.tags);