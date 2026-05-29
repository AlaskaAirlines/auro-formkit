import { defaultReporter } from '@web/test-runner';
import { jsonSummaryReporter } from './wtr-json-summary-reporter.mjs';

export default {
  rootDir: '../../',
  files: [
    'test/**/*.test.js',
    '!**/node_modules/**'
  ],
  reporters: [defaultReporter(), jsonSummaryReporter()],
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
        <link rel="stylesheet" href="/node_modules/@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css">
        <link rel="stylesheet" href="/node_modules/@aurodesignsystem/design-tokens/dist/web/alaska.css">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
};
