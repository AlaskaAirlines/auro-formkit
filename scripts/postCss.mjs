import fs from 'fs/promises';
import path from 'path';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import comments from 'postcss-discard-comments';

// Path to the directory containing CSS files
const directoryPath = new URL('../src', import.meta.url).pathname;

/**
 * Recursively process CSS files in a directory and its subdirectories
 * @param {string} dir - Directory to process
 */
async function processCssFiles(dir) {
  try {
    // Read contents of directory
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      // If it's a directory, recursively process it
      if (file.isDirectory()) {
        await processCssFiles(fullPath);
      // If it's a CSS file, process it
      } else if (path.extname(file.name).toLowerCase() === '.css') {
        await processPostCss(fullPath);
      }
    }
  } catch (err) {
    console.error('Processing failed:', err);
  }
}

/**
 * Process CSS file(s) with PostCSS
 * Applies autoprefixer and removes comments starting with '@'
 * @param {string} filePath - Full path of CSS file to process
 */
async function processPostCss(filePath) {
  try {
    // Read CSS file
    const css = await fs.readFile(filePath, 'utf8');
    // Process CSS with PostCSS plugins
    const result = await postcss([
      autoprefixer,
      comments({
        remove: comment => comment[0] === '@'
      })
    ]).process(css, { from: filePath, to: filePath });
    // Write processed CSS back to the file
    await fs.writeFile(filePath, result.css);
    console.log(`Processed: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Process CSS
processCssFiles(directoryPath);