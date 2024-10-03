// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
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
  
  // Get the calling file's path
  const callerPath = fileURLToPath(import.meta.url);
  
  // Get component name from the script path instead of env variable
  const pathParts = callerPath.split('/');
  const componentsIndex = pathParts.indexOf('components');
  const componentName = componentsIndex !== -1 ? pathParts[componentsIndex + 1] : null;
  
  // Construct the correct base path
  const basePath = componentName 
    ? `components/${componentName}/src`
    : 'src';
  
  // Construct the version file path (no longer adding /src/ again)
  const versionFilePath = `./${basePath}/${elemSubName}Version.js`;
  
  // Log for debugging
  console.log(`Writing version file to: ${versionFilePath}`);
  
  // Ensure the directory exists
  const directory = dirname(versionFilePath);
  if (!existsSync(directory)) {
    mkdir(directory, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
  
  // Write the file
  writeFile(versionFilePath, `export default '${version}'`, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      throw err;
    }
    console.log(`Successfully wrote version file for ${pkg}`);
  });
}