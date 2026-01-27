import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

// Utility function to convert filename to story name
export function fileNameToStoryName(fileName) {
  return fileName
    .replace('.html', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Utility function to create a story from HTML content
export function createStoryFromHtml(htmlContent, jsContent) {
  const storyConfig = {
    render: () => {
      if (jsContent) {
        // For stories with JavaScript, we need to execute the JS after render
        setTimeout(() => {
          try {
            // Create a function from the JS content and execute it
            const func = new Function(jsContent.replace('export function ', 'return function ').replace(/export\s+/g, ''));
            const exportedFunction = func();
            if (typeof exportedFunction === 'function') {
              exportedFunction();
            }
          } catch (error) {
            console.warn('Failed to execute story JavaScript:', error);
          }
        }, 0);
      }
      return html`${unsafeHTML(htmlContent)}`;
    }
  };

  return storyConfig;
}

// Generate stories from imported glob data
export function generateStoriesFromGlobData(apiExamples, apiExamplesJs, specialConfigs = {}) {
  const stories = {};
  
  Object.entries(apiExamples).forEach(([path, htmlContent]) => {
    const fileName = path.split('/').pop()?.replace('.html', '') || '';
    const storyName = fileNameToStoryName(fileName);
    
    // Check if there's a corresponding JS file
    const jsPath = path.replace('.html', '.js');
    const jsContent = apiExamplesJs[jsPath];
    
    stories[storyName] = createStoryFromHtml(htmlContent, jsContent);
    
    // Set default globals for all stories
    stories[storyName].globals = {
      backgrounds: { value: 'light' },
      ...stories[storyName].globals
    };
    
    // Apply special configurations
    if (specialConfigs[fileName]) {
      Object.assign(stories[storyName], specialConfigs[fileName]);
      
      // Merge globals specifically to avoid overwriting
      if (specialConfigs[fileName].globals) {
        stories[storyName].globals = {
          ...stories[storyName].globals,
          ...specialConfigs[fileName].globals
        };
      }
    }
  });
  
  return stories;
}