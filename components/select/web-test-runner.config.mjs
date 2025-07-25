import config from "@auro-formkit/config/wtr";

export default {
  ...config,
  coverageConfig: {
    include: ['src/**/*.js'],
    exclude: [
      '**/node_modules/**',
      '**/vendor/**'
    ],
    // Disabled until form and counter have full test coverage
    threshold: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  }
};
