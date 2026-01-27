#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateStoriesFromApiExamples, updateStoriesFile } from './src/storyGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the root directory (formkit)
const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'components');

function updateAllStories() {
  const targetComponent = process.argv[2]; // Get component name from command line argument
  
  if (targetComponent) {
    console.log(`🔄 Updating stories for ${targetComponent} component...`);
  } else {
    console.log('🔄 Scanning for components with apiExamples...');
  }
  
  if (!fs.existsSync(componentsDir)) {
    console.error('❌ Components directory not found:', componentsDir);
    process.exit(1);
  }
  
  let components;
  if (targetComponent) {
    // Check if the specific component exists
    const componentPath = path.join(componentsDir, targetComponent);
    if (!fs.existsSync(componentPath)) {
      console.error(`❌ Component '${targetComponent}' not found in components directory`);
      process.exit(1);
    }
    components = [targetComponent];
  } else {
    // Get all components
    components = fs.readdirSync(componentsDir)
      .filter(item => fs.statSync(path.join(componentsDir, item)).isDirectory());
  }
  
  let updatedCount = 0;
  
  components.forEach(component => {
    const componentDir = path.join(componentsDir, component);
    const apiExamplesDir = path.join(componentDir, 'apiExamples');
    const storiesDir = path.join(componentDir, 'stories');
    
    // Check if component has apiExamples and stories
    if (!fs.existsSync(apiExamplesDir) || !fs.existsSync(storiesDir)) {
      console.log(`⏭️  Skipping ${component} - missing apiExamples or stories folder`);
      return;
    }
    
    // Find the stories file
    const storiesFiles = fs.readdirSync(storiesDir)
      .filter(file => file.endsWith('.stories.ts') || file.endsWith('.stories.js'));
    
    if (storiesFiles.length === 0) {
      console.log(`⏭️  Skipping ${component} - no stories file found`);
      return;
    }
    
    // Use the first stories file found
    const storiesFile = path.join(storiesDir, storiesFiles[0]);
    
    console.log(`🔧 Processing ${component}...`);
    
    try {
      const stories = generateStoriesFromApiExamples(apiExamplesDir);
      
      if (Object.keys(stories).length === 0) {
        console.log(`⏭️  Skipping ${component} - no HTML files in apiExamples`);
        return;
      }
      
      updateStoriesFile(storiesFile, stories);
      updatedCount++;
    } catch (error) {
      console.error(`❌ Error processing ${component}:`, error.message);
    }
  });
  
  console.log(`\n🎉 Complete! Updated ${updatedCount} component story file${updatedCount === 1 ? '' : 's'}.`);
  
  if (updatedCount === 0 && targetComponent) {
    console.log(`💡 Usage: node update-stories.js [component-name]`);
    console.log(`💡 Example: node update-stories.js checkbox`);
  }
}

// Run the script
updateAllStories();