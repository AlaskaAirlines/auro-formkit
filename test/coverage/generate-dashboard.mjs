#!/usr/bin/env node
/**
 * Reads coverage data from WTR lcov.info files and Playwright report JSON files,
 * then injects the data into index.html so the dashboard works when opened directly.
 *
 * Usage: node test/coverage/generate-dashboard.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

const COMPONENTS = [
  'bibtemplate', 'checkbox', 'combobox', 'counter', 'datepicker',
  'dropdown', 'form', 'helptext', 'input', 'layoutElement',
  'menu', 'radio', 'select',
];

function parseLcov(text) {
  let lf = 0, lh = 0, brf = 0, brh = 0, fnf = 0, fnh = 0;
  for (const line of text.split('\n')) {
    if (line.startsWith('LF:'))  lf  += parseInt(line.slice(3), 10);
    if (line.startsWith('LH:'))  lh  += parseInt(line.slice(3), 10);
    if (line.startsWith('BRF:')) brf += parseInt(line.slice(4), 10);
    if (line.startsWith('BRH:')) brh += parseInt(line.slice(4), 10);
    if (line.startsWith('FNF:')) fnf += parseInt(line.slice(4), 10);
    if (line.startsWith('FNH:')) fnh += parseInt(line.slice(4), 10);
  }
  const pct = (found, hit) => found === 0 ? 100 : Math.round(hit / found * 1000) / 10;
  return {
    lines:     pct(lf, lh),
    branches:  pct(brf, brh),
    functions: pct(fnf, fnh),
  };
}

function readJsonSafe(filePath) {
  try {
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

// Collect WTR component coverage and test results
const components = {};
for (const name of COMPONENTS) {
  const entry = {};

  // Coverage from lcov
  const lcovPath = resolve(ROOT, `components/${name}/coverage/lcov.info`);
  if (existsSync(lcovPath)) {
    try {
      Object.assign(entry, parseLcov(readFileSync(lcovPath, 'utf-8')));
    } catch { /* skip */ }
  }

  // Test results from WTR reporter
  const resultsJson = readJsonSafe(resolve(ROOT, `components/${name}/coverage/test-results.json`));
  if (resultsJson) {
    entry.tests   = resultsJson.tests   ?? null;
    entry.passed  = resultsJson.passed  ?? null;
    entry.failed  = resultsJson.failed  ?? null;
    entry.skipped = resultsJson.skipped ?? null;
  }

  if (Object.keys(entry).length > 0) {
    components[name] = entry;
  }
}

// Collect Playwright framework data
const frameworks = {};
for (const fw of ['react', 'svelte']) {
  const reportJson = readJsonSafe(resolve(ROOT, `apps/${fw}-framework/coverage/report.json`));
  const coverageJson = readJsonSafe(resolve(ROOT, `apps/${fw}-framework/coverage-code/coverage-summary.json`));

  const entry = {};

  if (reportJson?.summary) {
    const s = reportJson.summary;
    entry.tests  = s.tests?.value  ?? null;
    entry.passed = s.passed?.value ?? null;
    entry.failed = s.failed?.value ?? null;
    entry.flaky  = s.flaky?.value  ?? null;
  }

  if (coverageJson) {
    const t = coverageJson.total || coverageJson;
    entry.covLines     = t.lines?.pct     ?? null;
    entry.covBranches  = t.branches?.pct  ?? null;
    entry.covFunctions = t.functions?.pct ?? null;
  }

  if (Object.keys(entry).length > 0) {
    frameworks[fw] = entry;
  }
}

const data = { components, frameworks };

// Read the HTML template and inject data
const htmlPath = resolve(__dirname, 'index.html');
let html = readFileSync(htmlPath, 'utf-8');

const scriptTag = `<!--REPORT_DATA_START--><script>window.__DASHBOARD_DATA__ = ${JSON.stringify(data)};</script><!--REPORT_DATA_END-->`;
const timestamp = `<!--TS_START-->${new Date().toLocaleString()}<!--TS_END-->`;

// Replace either the original placeholder or the previously injected block
html = html.replace(/<!--REPORT_DATA_START-->.*?<!--REPORT_DATA_END-->|<!--REPORT_DATA-->/, scriptTag);
html = html.replace(/<!--TS_START-->.*?<!--TS_END-->|<!--TIMESTAMP-->/, timestamp);

writeFileSync(htmlPath, html, 'utf-8');

const compCount = Object.keys(components).length;
const fwCount = Object.keys(frameworks).length;
console.log(`Dashboard updated: ${compCount} component(s), ${fwCount} framework(s)`);
