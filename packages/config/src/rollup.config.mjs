import { nodeResolve } from '@rollup/plugin-node-resolve';
import { existsSync } from 'node:fs';
import componentRollupConfig from './internal.rollup.config.mjs';

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

const optionalEntryPoints = ['install', 'getting-started'];
const optionalConfigs = optionalEntryPoints
  .filter((entry) => existsSync(`./demo/${entry}.js`))
  .map(createExampleConfig);

export default [...componentRollupConfig, createExampleConfig('index'), createExampleConfig('api'), ...optionalConfigs];
