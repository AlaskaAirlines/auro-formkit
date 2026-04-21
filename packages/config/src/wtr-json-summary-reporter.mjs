import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Recursively counts tests from a WTR TestSuiteResult.
 */
function countTests(suite) {
  let passed = 0, failed = 0, skipped = 0;
  for (const t of suite.tests || []) {
    if (t.skipped) skipped++;
    else if (t.passed) passed++;
    else failed++;
  }
  for (const s of suite.suites || []) {
    const sub = countTests(s);
    passed  += sub.passed;
    failed  += sub.failed;
    skipped += sub.skipped;
  }
  return { passed, failed, skipped };
}

/**
 * WTR reporter that writes a test-results.json summary to the component's
 * coverage/ directory after the test run finishes.
 *
 * Usage in web-test-runner.config.mjs:
 *   import { jsonSummaryReporter } from './wtr-json-summary-reporter.mjs';
 *   export default { reporters: [jsonSummaryReporter()], ... };
 */
export function jsonSummaryReporter() {
  return {
    stop({ sessions }) {
      // Aggregate results across all sessions (one per browser × file)
      let totalPassed = 0, totalFailed = 0, totalSkipped = 0;
      let sessionErrors = 0;

      for (const session of sessions) {
        if (session.testResults) {
          const counts = countTests(session.testResults);
          totalPassed  += counts.passed;
          totalFailed  += counts.failed;
          totalSkipped += counts.skipped;
        }
        if (session.errors?.length) {
          sessionErrors += session.errors.length;
        }
      }

      const total = totalPassed + totalFailed + totalSkipped;
      const summary = {
        tests: total,
        passed: totalPassed,
        failed: totalFailed + sessionErrors,
        skipped: totalSkipped,
      };

      // Write to coverage/test-results.json relative to cwd (component root)
      const outPath = resolve(process.cwd(), 'coverage', 'test-results.json');
      writeFileSync(outPath, JSON.stringify(summary, null, 2) + '\n', 'utf-8');
    },
  };
}
