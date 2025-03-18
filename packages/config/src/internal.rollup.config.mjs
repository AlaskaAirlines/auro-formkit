import { nodeResolve } from '@rollup/plugin-node-resolve';

const createConfig = (input, output) => ({
  input,
  output: {
    format: 'esm',
    dir: output,
    entryFileNames: '[name].js'
  },
  external: [
    'lit',
    '@lit/reactive-element',
    'lit-html',
    'lit/decorators.js',
    'lit/static-html.js',
    'lit/directives/repeat.js',
    'lit/directives/class-map.js',
    'lit/directives/if-defined.js',
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
