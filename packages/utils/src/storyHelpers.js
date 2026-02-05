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

// Filter files based on include/exclude patterns
function filterFiles(apiExamples, options = {}) {
  const { include, exclude } = options;
  
  return Object.entries(apiExamples).filter(([path]) => {
    const fileName = path.split('/').pop()?.replace('.html', '') || '';
    
    // If include is specified, only include files that match
    if (include && include.length > 0) {
      const isIncluded = include.some(pattern => {
        if (typeof pattern === 'string') {
          return fileName.includes(pattern);
        }
        if (pattern instanceof RegExp) {
          return pattern.test(fileName);
        }
        return false;
      });
      if (!isIncluded) return false;
    }
    
    // If exclude is specified, exclude files that match
    if (exclude && exclude.length > 0) {
      const isExcluded = exclude.some(pattern => {
        if (typeof pattern === 'string') {
          return fileName.includes(pattern);
        }
        if (pattern instanceof RegExp) {
          return pattern.test(fileName);
        }
        return false;
      });
      if (isExcluded) return false;
    }
    
    return true;
  });
}

// Create a title from filename for grouped stories
function createSectionTitle(fileName) {
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate a single grouped story from multiple HTML files
export function generateGroupedStory(apiExamples, apiExamplesJs, options = {}) {
  const { include, exclude, storyConfig = {}, storyTitle = 'All Examples' } = options;
  
  // Filter files based on include/exclude
  const filteredFiles = filterFiles(apiExamples, { include, exclude });
  
  if (filteredFiles.length === 0) {
    console.warn('No files matched the include/exclude criteria');
    return {
      render: () => html`<p>No examples found matching the specified criteria.</p>`
    };
  }
  
  // Collect all JavaScript content that needs to be executed
  const allJsContent = [];
  
  // Create the combined HTML content
  const combinedHtml = filteredFiles
    .map(([path, htmlContent]) => {
      const fileName = path.split('/').pop()?.replace('.html', '') || '';
      const sectionTitle = createSectionTitle(fileName);
      
      // Check if there's a corresponding JS file
      const jsPath = path.replace('.html', '.js');
      const jsContent = apiExamplesJs[jsPath];
      if (jsContent) {
        allJsContent.push(jsContent);
      }
      
      return `
        <section class="story-section">
          <h3 class="story-title">${sectionTitle}</h3>
          <div class="story-content">
            ${htmlContent}
          </div>
        </section>
      `;
    })
    .join('');
  
  const baseStoryConfig = {
    render: () => {
      // Execute all JavaScript content after render
      if (allJsContent.length > 0) {
        setTimeout(() => {
          allJsContent.forEach(jsContent => {
            try {
              const func = new Function(jsContent.replace('export function ', 'return function ').replace(/export\s+/g, ''));
              const exportedFunction = func();
              if (typeof exportedFunction === 'function') {
                exportedFunction();
              }
            } catch (error) {
              console.warn('Failed to execute story JavaScript:', error);
            }
          });
        }, 0);
      }
      return html`${unsafeHTML(combinedHtml)}`;
    },
    globals: {
      backgrounds: { value: 'light' }
    }
  };

  // Apply the provided story configuration
  const finalStoryConfig = {
    ...baseStoryConfig,
    ...storyConfig
  };

  // Merge globals specifically to avoid overwriting
  if (storyConfig.globals) {
    finalStoryConfig.globals = {
      ...baseStoryConfig.globals,
      ...storyConfig.globals
    };
  }

  // Ensure tags are properly preserved
  if (storyConfig.tags) {
    finalStoryConfig.tags = storyConfig.tags;
  }

  return finalStoryConfig;
}