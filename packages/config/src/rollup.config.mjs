import { nodeResolve } from '@rollup/plugin-node-resolve';
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

export default [...componentRollupConfig, createExampleConfig('index'), createExampleConfig('api')];
