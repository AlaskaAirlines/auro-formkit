# Release Notes

## Bug Fixes

- **Correct typos and form index page imports** — Fixed minor typos and corrected imports on the form index documentation page.

## Chores

- **Remove docProcessor from build-tools** — Deleted `docProcessor.mjs` (moved to auro-library), removed its export from the build-tools package, and stripped the optional demo JS bundling from the rollup config. Removed stale `api.min.js` script tags from all component demo HTML files. Added `customize.js` and `getting-started.js` for the form component. Updated `turbo.json` with explicit auro-form build dependencies and cleaned up root `package.json` devDependencies.

## Documentation

- **Update docs to work in new CLI system** — Updated documentation files across components to be compatible with the new CLI-based doc system.
