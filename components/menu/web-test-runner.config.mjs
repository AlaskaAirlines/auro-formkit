import baseConfig from '../../packages/config/src/web-test-runner.config.mjs';

export default {
  ...baseConfig,
  concurrency: 1,
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
};
