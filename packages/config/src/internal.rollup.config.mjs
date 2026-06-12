/* eslint-disable require-unicode-regexp */

import { nodeResolve } from '@rollup/plugin-node-resolve';

// Shared by rollup and test/check-bundled-imports.mjs so both gates use the
// same external-package allowlist.
export const EXTERNAL_PACKAGE_NAMES = [
  'lit',
  'lit-element',
  'lit-html',
  '@lit',
  '@lit-labs',
];

const createConfig = (input, output) => ({
  input,
  output: {
    format: 'esm',
    dir: output,
    entryFileNames: '[name].js'
  },
  external: EXTERNAL_PACKAGE_NAMES.map((name) => new RegExp(`node_modules/${name}`)),
  // Rollup warns and externalizes unresolved imports by default; for published
  // bundles, that means silently shipping broken dist files.
  onwarn(warning, warn) {
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(
        `Unresolved import "${warning.source}" in ${warning.importer}. ` +
        `Possible causes: the dependency is missing from node_modules, ` +
        `its dist/ entry point has not been built yet ` +
        `(check turbo.json for a "${warning.source}#build" dependsOn entry), ` +
        `or the specifier is misspelled.`
      );
    }
    warn(warning);
  },
  plugins: [
    nodeResolve({
      dedupe: [
        'lit',
        'lit-element',
        'lit-html'
      ],
      preferBuiltins: false,
      moduleDirectories: ['node_modules']
    })
  ]
});

export default [
  createConfig('./src/index.js', 'dist'),
  createConfig('./src/registered.js', 'dist'),
];
