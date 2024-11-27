import { createRequire } from 'module';
import path from 'path';
import { writeFile } from 'fs';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);

const dsVariableFlat = require("@aurodesignsystem/design-tokens/dist/tokens/JSONVariablesFlat.json");

const breakpoints = Object.keys(dsVariableFlat).filter(v => v.includes('ds-grid-breakpoint'));

const content = `/* eslint-disable */
export default {
` + breakpoints.map(k => `'${k}': '${dsVariableFlat[k]}'`) + `
};`;

const thisFilePath = fileURLToPath(import.meta.url);
const filePath = path.resolve(path.dirname(thisFilePath), '../ds-grid-breakpoint.js');
// Write the file
writeFile(filePath, content, (err) => {
  if (err) {
    console.error(`Error writing file: ${err.message}`);
    throw err;
  }
  console.log(`Successfully wrote breakpoint vriable file to ${filePath}`);
});
