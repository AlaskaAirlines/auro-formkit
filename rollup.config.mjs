import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import glob from 'glob';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

// Get entry points for each component
const getComponentEntryPoints = () => {
  const files = glob.sync('src/*/index.js');
  return files.map(file => {
    const name = path.basename(path.dirname(file));
    return {
      name,
      input: file,
      output: `dist/${name}`
    };
  });
};

const createConfig = (name, input, output) => ({
  input: { [`${name}__bundled`]: input },
  output: {
    format: 'esm',
    dir: output,
    chunkFileNames: '[name]-[hash].js'
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

const mainConfig = createConfig('auro-form', './index.js', 'dist');

const componentConfigs = getComponentEntryPoints().map(({ name, input, output }) => 
  createConfig(name, input, output)
);

export default [mainConfig, ...componentConfigs];