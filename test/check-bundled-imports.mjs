#!/usr/bin/env node
// Verifies that published dist files only keep the externals declared in
// packages/config/src/internal.rollup.config.mjs. Any other bare specifier
// means rollup failed to inline code we meant to ship.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { init, parse } from 'es-module-lexer';
import { EXTERNAL_PACKAGE_NAMES } from '@aurodesignsystem/config/internal.rollup';

const ENTRY_FILES = ['index.js', 'registered.js'];
const COMPONENTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../components');

// A specifier is allowed if it exactly matches an EXTERNAL_PACKAGE_NAMES entry
// (`lit`) or is a subpath of one (`lit/static-html.js`, `@lit/context`).
const ALLOWED = EXTERNAL_PACKAGE_NAMES.map((name) => new RegExp(`^${name}(?:/.+)?$`));

const listComponentDirs = () => readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map(({ name }) => name);

// Returns specifiers rollup should have inlined but didn't. Uses the same ESM
// lexer Vite/Rollup use, so no false positives from comments or `import()`.
function findUnbundledImports(source) {
  const [imports] = parse(source);
  return [...new Set(imports.map((i) => source.slice(i.s, i.e)))]
    .filter((s) => !s.startsWith('.') && !s.startsWith('/'))
    .filter((s) => !ALLOWED.some((re) => re.test(s)));
}

// Returns a failure object, or null if the file is clean.
function checkEntryFile(componentName, entryFile) {
  const filePath = join(COMPONENTS_DIR, componentName, 'dist', entryFile);
  const label = `${componentName}/dist/${entryFile}`;
  if (!existsSync(filePath)) return { label, reason: 'missing — run `npm run build` first' };
  const offenders = findUnbundledImports(readFileSync(filePath, 'utf8'));
  return offenders.length ? { label, reason: `unbundled imports: ${offenders.join(', ')}` } : null;
}

// es-module-lexer's parser must finish initializing before parse() runs.
await init;

const failures = [];
let scanned = 0;
for (const componentName of listComponentDirs()) {
  for (const entry of ENTRY_FILES) {
    scanned++;
    const failure = checkEntryFile(componentName, entry);
    if (failure) failures.push(failure);
  }
}

if (failures.length) {
  console.error(`✗ bundled-imports check failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):\n`);
  for (const { label, reason } of failures) console.error(`  ${label}\n    ${reason}\n`);
  console.error(
    'These specifiers should have been inlined by rollup. Update\n' +
    'EXTERNAL_PACKAGE_NAMES in packages/config/src/internal.rollup.config.mjs\n' +
    'if the change is intentional.\n'
  );
  process.exit(1);
}

console.log(`✓ bundled-imports check passed (${scanned} files scanned)`);
