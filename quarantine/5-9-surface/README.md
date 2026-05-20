# Quarantine: 5.9 Surface Artifacts

API example files quarantined during the FormKit v6 revert (Sub-PR 2: Surface Removal).

These files demonstrate 5.9-only features (`allowDeselect`, `selectAllMatchingOptions`, `key` attribute, duplicate values) that are being removed as part of the reversion from the 5.9 MenuService/Lit Context architecture back to 5.8.1 patterns.

## Contents

- `menu-apiExamples/` — API examples from `components/menu/apiExamples/`
- `select-apiExamples/` — API examples from `components/select/apiExamples/`

## Restoration

To restore these files to their original locations:

```bash
git mv quarantine/5-9-surface/menu-apiExamples/* components/menu/apiExamples/
git mv quarantine/5-9-surface/select-apiExamples/* components/select/apiExamples/
```

You will also need to re-add the corresponding story exports and documentation entries. See the Sub-PR 2 commit diff for the exact lines that were removed from docs and stories files.
