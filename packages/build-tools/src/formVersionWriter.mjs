import { createRequire } from 'module';
import { mkdir, writeFile, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const auroSubNameIndex = 5;

/**
 * Writes a version file for the specified dependency package.
 * @param {string} pkg Dependency to write version file for
 */
export function writeDepVersionFile(pkg) {
  const path = `${pkg}/package.json`;
  const json = require(path);
  const { version } = json;
  const elemSubName = pkg.substring(pkg.indexOf('auro-') + auroSubNameIndex);
  
  const callerPath = fileURLToPath(import.meta.url);
  const pathParts = callerPath.split('/');
  const componentsIndex = pathParts.indexOf('components');
  const componentName = componentsIndex !== -1 ? pathParts[componentsIndex + 1] : null;
  
  const basePath = componentName
    ? `components/${componentName}/src`
    : 'src';
    
  const versionFilePath = `./${basePath}/${elemSubName}Version.js`;
  console.log(`Writing version file to: ${versionFilePath}`);
  
  const directory = dirname(versionFilePath);
  if (!existsSync(directory)) {
    mkdir(directory, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  // Add semicolon and newline to the end of the content
  const fileContent = `export default '${version}';\n`;
  
  writeFile(versionFilePath, fileContent, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      throw err;
    }
    console.log(`Successfully wrote version file for ${pkg}`);
  });
}