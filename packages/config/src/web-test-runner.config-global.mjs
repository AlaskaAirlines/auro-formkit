import { defaultReporter } from '@web/test-runner';
import { jsonSummaryReporter } from './wtr-json-summary-reporter.mjs';

export default {
  files: [
    'components/**/test/**/*.test.js',
    '!**/node_modules/**'
  ],
  concurrency: 1,
  testsFinishTimeout: 300000,
  // Filter out browser `console.debug()` output. We emit `console.debug` from
  // component internals (e.g. deprecation notices, locale fallbacks) to help
  // consumers troubleshoot integration issues at runtime — they shouldn't
  // clutter our own test output. Warnings, errors, log, and info still print.
  filterBrowserLogs: (log) => log.type !== 'debug',
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
    include: ['components/**/src/**/*.js'],
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
