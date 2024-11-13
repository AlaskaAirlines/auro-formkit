import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import glob from 'glob';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

// Get entry points for each component
const getComponentEntryPoints = () => {
  const files = glob.sync('components/*/src/index.js');
  return files.map(file => {
    const name = path.basename(path.dirname(path.dirname(file)));
    return {
      name,
      input: file,
      output: `dist/components/${name}`
    };
  });
};

const createConfig = (name, input, output) => ({
  input: { [`auro-${name}__bundled`]: input },
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

const mainConfig = createConfig('formkit', './index.js', 'dist');
const componentConfigs = getComponentEntryPoints().map(({ name, input, output }) =>
  createConfig(name, input, output)
);


function createExampleConfig(componentName, entryPoint) {
  return {
    input: {
      [`${entryPoint}.min`]: `./components/${componentName}/demo/${entryPoint}.js`,
    },
    output: {
      format: 'esm',
      dir: `./components/${componentName}/demo/`,
    },
    plugins: [nodeResolve()],
  };
}

const docConfig = getComponentEntryPoints().map( ({ name }) => {
  const indexExample = createExampleConfig(name, 'index');
  const apiExample = createExampleConfig(name, 'api');
  return [indexExample, apiExample];
}).flat();

export default [mainConfig, ...componentConfigs, ...docConfig];
