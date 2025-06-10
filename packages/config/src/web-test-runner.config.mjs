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
      '**/vendor/**'
    ],
    // Disabled until form and counter have full test coverage
    threshold: {
      statements: 80,
      branches: 78,
      functions: 80,
      lines: 80
    }
  },
  testRunnerHtml: (testFramework) => `<html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm//@aurodesignsystem/design-tokens@latest/dist/auro-classic/CSSCustomProperties.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm//@aurodesignsystem/design-tokens@latest/dist/alaska/CSSCustomProperties--alaska.css">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
};
