import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import glob from 'glob';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

// Function to get additional entry points
const getAdditionalEntryPoints = () => {
  const files = glob.sync('src/*/index.js');
  return files.reduce((acc, file) => {
    const name = path.basename(path.dirname(file));
    acc[`${name}__bundled`] = file;
    return acc;
  }, {});
};

const modernConfig = {
  input: {
    ['auro-form__bundled']: './index.js',
    ...getAdditionalEntryPoints()
  },
  output: {
    format: 'esm',
    dir: 'dist/'
  },
  plugins: [
    nodeResolve(),
    !production &&
      serve({
        open: true,
        openPage: '/docs/'
      })
  ]
};

export default [modernConfig];