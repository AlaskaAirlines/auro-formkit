import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

const createConfig = (input, output) => ({
  input,
  output: {
    format: 'esm',
    dir: output,
    entryFileNames: '[name].js'
  },
  plugins: [
    nodeResolve({
      browser: true,
      dedupe: ['lit', 'lit-element', 'lit-html'],
      preferBuiltins: false,
      moduleDirectories: ['node_modules']
    }),
    !production &&
      serve({
        open: true,
        openPage: '/docs/'
      })
  ]
});

const mainConfig = createConfig('./src/index.js', 'dist');

function createExampleConfig(entryPoint) {
  return {
    input: {
      [`${entryPoint}.min`]: `./demo/${entryPoint}.js`,
    },
    output: {
      format: 'esm',
      dir: `./demo/`,
    },
    plugins: [nodeResolve()],
  };
}
export default [mainConfig, createExampleConfig('index'), createExampleConfig('api')];
