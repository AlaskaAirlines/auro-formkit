import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const postinstallPath = require.resolve('@aurodesignsystem/auro-library/scripts/build/postinstall.mjs');

// Import and execute the script
import(postinstallPath);
