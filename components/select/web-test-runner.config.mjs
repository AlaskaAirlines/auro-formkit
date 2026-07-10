import config from "@aurodesignsystem/config/wtr";

export default {
  ...config,
  // Run test files serially in the same browser to avoid cross-file state
  // collisions (focus handoff, shared component registration). Mirrors the
  // menu package's local wtr config.
  concurrency: 1,
  coverageConfig: {
    include: ['src/**/*.js'],
    exclude: [
      '**/node_modules/**',
      '**/vendor/**'
    ],
    // Disabled until form and counter have full test coverage
    threshold: {
      statements: 75,
      branches: 74,
      functions: 75,
      lines: 75
    }
  }
};
