/* eslint-disable require-unicode-regexp */

import { nodeResolve } from '@rollup/plugin-node-resolve';

const createConfig = (input, output) => ({
  input,
  output: {
    format: 'esm',
    dir: output,
    entryFileNames: '[name].js'
  },
  external: [
    /node_modules\/lit/,
    /node_modules\/lit-element/,
    /node_modules\/lit-html/,
    /node_modules\/@lit/,
    /node_modules\/@lit-labs/,
  ],
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
