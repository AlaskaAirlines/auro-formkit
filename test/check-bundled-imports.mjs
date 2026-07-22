#!/usr/bin/env node
// Verifies that published dist files only keep the externals declared in
// packages/config/src/internal.rollup.config.mjs. Any other bare specifier
// means rollup failed to inline code we meant to ship.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXTERNAL_PACKAGE_NAMES } from '@aurodesignsystem/config/internal.rollup';
import {
  buildAllowlist,
  findUnbundledImports,
  initUnbundledImports,
} from '@aurodesignsystem/utils';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ALLOWED = buildAllowlist(EXTERNAL_PACKAGE_NAMES);
const COMPONENT_DIST_RE = /^\.\/components\/[^/]+\/dist\/.+\.js$/u;

// Walks the root package.json `exports` map and collects every component dist
// file we publish. Using exports (rather than a hardcoded list) means the
// check tracks reality whenever a new entry point is added to the package.
function collectPublishedEntries(exportsField) {
  const found = new Set();
  const visit = (value) => {
    if (typeof value === 'string') {
      if (COMPONENT_DIST_RE.test(value)) found.add(value);
    } else if (value && typeof value === 'object') {
      for (const child of Object.values(value)) visit(child);
    }
  };
  visit(exportsField);
  return [...found].sort();
}

// Returns a failure object, or null if the file is clean. `kind` lets the
// summary tailor the hint to the actual failure (missing file vs leaky import).
function checkEntry(relativePath) {
  const filePath = resolve(REPO_ROOT, relativePath);
  const label = relativePath.replace(/^\.\//u, '');
  if (!existsSync(filePath)) {
    return {
      label,
      kind: 'missing',
      reason: 'declared in root package.json `exports` but not present on disk',
    };
  }
  const offenders = findUnbundledImports(readFileSync(filePath, 'utf8'), ALLOWED);
  return offenders.length
    ? { label, kind: 'unbundled', reason: `unbundled imports: ${offenders.join(', ')}` }
    : null;
}

// es-module-lexer's parser must finish initializing before parse() runs.
await initUnbundledImports;

const rootPkg = JSON.parse(readFileSync(resolve(REPO_ROOT, 'package.json'), 'utf8'));
const entries = collectPublishedEntries(rootPkg.exports);

const failures = [];
for (const entry of entries) {
  const failure = checkEntry(entry);
  if (failure) failures.push(failure);
}

if (failures.length) {
  console.error(`✗ bundled-imports check failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):\n`);
  for (const { label, reason } of failures) console.error(`  ${label}\n    ${reason}\n`);
  if (failures.some((f) => f.kind === 'missing')) {
    console.error(
      'Missing files: run `npm run build` to produce them, or update the\n' +
      '`exports` field in package.json if the entry is stale.\n'
    );
  }
  if (failures.some((f) => f.kind === 'unbundled')) {
    console.error(
      'Unbundled imports: these specifiers should have been inlined by rollup.\n' +
      'Update EXTERNAL_PACKAGE_NAMES in packages/config/src/internal.rollup.config.mjs\n' +
      'if the change is intentional.\n'
    );
  }
  process.exit(1);
}

const byComponent = new Map();
for (const entry of entries) {
  const [, component, file] = entry.match(/^\.\/components\/([^/]+)\/dist\/(.+)$/u);
  if (!byComponent.has(component)) byComponent.set(component, []);
  byComponent.get(component).push(file);
}

console.log(`✓ bundled-imports check passed (${entries.length} files scanned)`);
for (const [component, files] of byComponent) {
  console.log(`  ${component}: ${files.join(', ')}`);
}
