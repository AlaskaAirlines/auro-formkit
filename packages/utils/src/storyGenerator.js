import fs from 'fs';
import path from 'path';
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
    
    // Apply special configurations
    if (specialConfigs[fileName]) {
      Object.assign(stories[storyName], specialConfigs[fileName]);
    }
  });
  
  return stories;
}

// Generate stories from apiExamples folder
export function generateStoriesFromApiExamples(apiExamplesPath) {
  const stories = {};
  
  if (!fs.existsSync(apiExamplesPath)) {
    return stories;
  }

  const htmlFiles = fs.readdirSync(apiExamplesPath).filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(htmlFile => {
    const fileName = htmlFile.replace('.html', '');
    const storyName = fileNameToStoryName(fileName);
    const htmlPath = path.join(apiExamplesPath, htmlFile);
    const jsPath = path.join(apiExamplesPath, fileName + '.js');
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    let jsContent = null;
    
    if (fs.existsSync(jsPath)) {
      jsContent = fs.readFileSync(jsPath, 'utf-8');
    }
    
    stories[storyName] = {
      fileName,
      htmlContent: htmlContent.trim(),
      jsContent,
      hasJS: !!jsContent
    };
  });
  
  return stories;
}

// Generate export statements for stories
export function generateExportStatements(stories) {
  const exportLines = Object.keys(stories).map(storyName => 
    `export const ${storyName} = stories.${storyName};`
  );
  
  if (exportLines.length === 0) {
    return '';
  }
  
  return `// eslint-disable-next-line @typescript-eslint/prefer-destructuring-assignment\n// sourcery skip: use-object-destructuring\n${exportLines.join('\n')}`;
}

// Update stories file with new exports
export function updateStoriesFile(storiesFilePath, stories) {
  if (!fs.existsSync(storiesFilePath)) {
    console.warn(`Stories file not found: ${storiesFilePath}`);
    return;
  }
  
  const content = fs.readFileSync(storiesFilePath, 'utf-8');
  
  // Find the export section (everything after "// Export all generated stories")
  const exportMarker = '// Export all generated stories';
  const exportIndex = content.indexOf(exportMarker);
  
  if (exportIndex === -1) {
    console.warn(`Export marker not found in ${storiesFilePath}`);
    return;
  }
  
  // Find where additional stories start (manually written ones)
  const additionalMarker = '// Add any additional stories';
  const additionalIndex = content.indexOf(additionalMarker);
  
  const beforeExports = content.substring(0, exportIndex + exportMarker.length);
  const afterExports = additionalIndex > -1 ? content.substring(additionalIndex) : '';
  
  const newExports = generateExportStatements(stories);
  
  const newContent = `${beforeExports}\n${newExports}\n\n${afterExports}`;
  
  fs.writeFileSync(storiesFilePath, newContent, 'utf-8');
  console.log(`✅ Updated ${path.basename(storiesFilePath)} with ${Object.keys(stories).length} stories`);
}