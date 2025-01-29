import { nodeResolve } from '@rollup/plugin-node-resolve';
import mainRollupConfig from './main.rollup.config.mjs';

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

export default [...mainRollupConfig, createExampleConfig('index'), createExampleConfig('api')];
