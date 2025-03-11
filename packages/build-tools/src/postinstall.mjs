import { createRequire } from 'module';
import { pathToFileURL } from 'url';

const require = createRequire(import.meta.url);

const postinstallPath = require.resolve('@aurodesignsystem/auro-library/scripts/build/postinstall.mjs');

// Convert the path to a file:// URL for cross-platform compatibility
const postinstallURL = pathToFileURL(postinstallPath);

// Import and execute the script
import(postinstallURL);
