import { defineConfig, devices } from '@playwright/test';

/**
 * Local visual report config — generates a slow-motion HTML report with video
 * and trace capture for manual verification of framework integration tests.
 *
 * Per-framework:
 *   npm run test:framework:report:react
 *   npx playwright show-report playwright-report (from apps/react-framework)
 *
 * Unified (both frameworks):
 *   npm run test:frameworks:report  (from repo root)
 *   npm run test:frameworks:report:show
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 1,
  reporter: [
    ['html', { open: 'always' }],
  ],
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:5181',
    headless: true,
    launchOptions: {
      slowMo: 300,
    },
    video: 'on',
    trace: 'on',
    viewport: { width: 1280, height: 800 },
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
