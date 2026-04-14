export default {
  rootDir: '../../',
  files: [
    'test/**/*.test.js',
    '!**/node_modules/**'
  ],
  nodeResolve: {
    moduleDirectories: [
      'node_modules',
      'components'
    ],
    extensions: [
      '.js',
      '.css'
    ]
  },
  coverageConfig: {
    include: ['src/**/*.js'],
    exclude: [
      '**/node_modules/**',
    ],
    threshold: {
      statements: 80,
      branches: 75,
      functions: 75,
      lines: 80
    }
  },
  testRunnerHtml: (testFramework) => `<html>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
};
