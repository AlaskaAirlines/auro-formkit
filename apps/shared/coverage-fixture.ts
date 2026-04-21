import { test as base, expect, type Page, type Locator } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

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
    if (coverage.length > 0) {
      await addCoverageReport(coverage, test.info());
    }
  }, { auto: true }],
});

export { test, expect, type Page, type Locator };
