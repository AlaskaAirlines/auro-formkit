import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: process.env.CI ? 30_000 : 15_000,
  retries: process.env.CI ? 2 : 1,
  reporter: [
    ['list'],
    ['monocart-reporter', {
      name: 'React Playwright Coverage',
      outputFile: './coverage/report.html',
      coverage: {
        outputDir: './coverage-code',
        reports: ['v8', 'console-details', ['json-summary', { file: 'coverage-summary.json' }]],
        entryFilter: (entry: { url: string }) =>
          entry.url.includes('/components/') && entry.url.includes('/dist/'),
        sourceFilter: () => true,
      },
    }],
  ],
  use: {
    baseURL: 'http://localhost:5181',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Use `npm run dev:app -- --force` so Vite always invalidates its pre-bundle cache
    // (`node_modules/.vite/`) before starting, ensuring tests run against
    // freshly resolved dist files rather than a stale snapshot.
    command: 'npm run dev:app -- --force',
    url: 'http://localhost:5181',
    // Always launch a fresh server. `reuseExistingServer: true` would silently
    // run tests against an already-running server that may be serving stale
    // dist files, producing false positives.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
