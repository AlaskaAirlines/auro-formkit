import config from "@auro-formkit/config/wtr";

export default {
  ...config,
  coverageConfig: {
    // Disabled until form and counter have full test coverage
    threshold: {
      statements: 80,
      branches: 80,
      functions: 75,
      lines: 80
    }
  }
};
