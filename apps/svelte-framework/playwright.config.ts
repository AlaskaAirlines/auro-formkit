import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: process.env.CI ? 30_000 : 15_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:5182',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Use `npm run dev:app -- --force` so Vite always invalidates its pre-bundle cache
    // (`node_modules/.vite/`) before starting, ensuring tests run against
    // freshly resolved dist files rather than a stale snapshot.
    command: 'npm run dev:app -- --force',
    url: 'http://localhost:5182',
    // Always launch a fresh server. `reuseExistingServer: true` would silently
    // run tests against an already-running server that may be serving stale
    // dist files, producing false positives.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
