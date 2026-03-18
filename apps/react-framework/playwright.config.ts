import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 15_000,
  use: {
    baseURL: 'http://localhost:5181',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev:app',
    url: 'http://localhost:5181',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
