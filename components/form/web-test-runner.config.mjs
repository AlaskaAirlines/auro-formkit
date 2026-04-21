import baseConfig from '../../packages/config/src/web-test-runner.config.mjs';

export default {
  ...baseConfig,
  testsFinishTimeout: 90000,
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
};
