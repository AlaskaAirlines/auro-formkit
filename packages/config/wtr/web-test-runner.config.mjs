export default {
  files: [
    'test/**/*.test.js',
    '!**/node_modules/**'
  ],
  nodeResolve: {
    moduleDirectories: ['node_modules', 'components'],
    extensions: ['.js', '.css']
  },
  coverageConfig: {
    threshold: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  }
 };