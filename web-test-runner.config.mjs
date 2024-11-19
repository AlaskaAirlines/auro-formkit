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
      statements: 70,
      branches: 78,
      functions: 70,
      lines: 70
    }
  }
 };