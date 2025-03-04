import { nodeResolve } from '@rollup/plugin-node-resolve';

const createConfig = (input, output) => ({
  input,
  output: {
    format: 'esm',
    dir: output,
    entryFileNames: '[name].js'
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
