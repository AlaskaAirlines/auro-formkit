import { test as base, expect, type Page, type Locator } from '@playwright/test';

// Dynamic import so tests still run when monocart-reporter isn't installed
// (e.g. when using the HTML-only report config).
let addCoverageReport: ((coverage: unknown, info: unknown) => Promise<void>) | undefined;
try {
  ({ addCoverageReport } = await import('monocart-reporter'));
} catch {
  // monocart-reporter not available — coverage collection will be skipped
}

/**
 * Extended Playwright test fixture that collects V8 code coverage
 * from Chromium CDP on every test, then feeds it to monocart-reporter.
 *
 * Usage in shared suites:
 *   import { test, expect, type Page, type Locator } from './coverage-fixture';
 */
const test = base.extend<{ autoCollectCoverage: void }>({
  autoCollectCoverage: [async ({ page }, use) => {
    // Start collecting JS coverage before the test navigates
    await page.coverage.startJSCoverage({ resetOnNavigation: false });

    // Run the test
    await use();

    // Stop and pass coverage data to monocart-reporter
    const coverage = await page.coverage.stopJSCoverage();
    if (coverage.length > 0 && addCoverageReport) {
      await addCoverageReport(coverage, test.info());
    }
  }, { auto: true }],
});

export { test, expect, type Page, type Locator };
