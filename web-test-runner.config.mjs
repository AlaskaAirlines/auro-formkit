export default {
  files: [
    'components/**/test/*.test.js',
    '!./components/**/node_modules/**'
  ],
  nodeResolve: {
    moduleDirectories: ['node_modules', 'components'],
    extensions: ['.js', '.css']
  },
  coverageConfig: {
    threshold: {
      statements: 80,
      branches: 78,
      functions: 80,
      lines: 80
    }
  }
 };