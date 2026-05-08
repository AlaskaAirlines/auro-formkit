# auro-select: Value Lost After DOM Remount in Svelte

## Problem Statement

In a Svelte 5 project, `auro-select` correctly applies its `value` attribute on the first page load, but after the component is toggled out of and back into the DOM (via `{#if showSelect}`), the selected value is not restored. All three value surfaces (`getAttribute('value')`, `.value`, and `optionSelected`) are empty after remount. The failure is reproducible with static options and with direct property assignment (`element.value = 'bar'`).

---

## Reproduction Environment

- **Svelte playground:** `/Users/Ryan.Menner@alaskaair.com/code/auro-framework-playground/svelte-kit/src/routes/+page.svelte`
- **Dev server:** `http://localhost:5174/`
- **Repo under investigation:** `/Users/Ryan.Menner@alaskaair.com/code/components/auro-formkit`

### Svelte Page Summary

```svelte
let selectValue = $state<string>('bar');
let showSelect  = $state<boolean>(true);

$effect(() => {
  if (showSelect) {
    tick().then(() => {
      setTimeout(() => {
        if (selectElement) {
          (selectElement as any).value = selectValue;
        }
      }, 0);
    });
  }
});

{#if showSelect}
  <auro-select value={selectValue} bind:this={selectElement}>
    <auro-menu>
      {#each options as [value, label]}
        <auro-menuoption {value}>{label}</auro-menuoption>
      {/each}
    </auro-menu>
  </auro-select>
{/if}
```

The `{#if}` block fully unmounts and recreates all elements on every toggle.

---

## Key Files

| File | Role |
|---|---|
| `components/select/src/auro-select.js` | Host component, owns `value` prop, calls `setMenuValue` |
| `components/menu/src/auro-menu.js` | `updated()` calls `menuService.selectByValue(value)` |
| `components/menu/src/auro-menu.context.js` | `MenuService.selectByValue()` matches options by `option.key` |
| `components/menu/src/auro-menuoption.js` | Sets `this.key` in `connectedCallback` and `updated` |

---

## Root Cause Analysis

Three separate timing races interact to produce the failure.

### Race 1 -- option.key is null at register time (menuoption.js)

When Svelte inserts `<auro-menuoption value="bar">` into the DOM via `{#each}`, it creates the element and connects it **before** setting the `value` property. At the moment `connectedCallback` fires:

- `getAttribute('value')` returns `null` (attribute not yet reflected)
- `getAttribute('key')` returns `null`

The original code unconditionally assigned:

```js
this.key = keyAttr !== null ? keyAttr : valueAttr; // → null
```

Setting `this.key = null` blocked the fallback in `updated()` that was supposed to set `key` from `value`:

```js
if (changedProperties.has('value') && this.key === undefined) { // null !== undefined → skipped
  this.key = this.value;
}
```

Result: `addMenuOption(this)` registers an option with `key === null`, which can never match a real value string.

### Race 2 -- selectByValue fired before any options exist

`auro-menu.updated()` called `menuService.selectByValue(this.value)` synchronously. On the initial mount AND after remount, this happens before any `auro-menuoption` has called `attachTo()` (context delivery is async). With `_menuOptions.length === 0`, the no-match path falls through:

```js
} else {
  this.stageUpdate(); // dispatches auroMenu-selectedOption with stringValue: undefined
}
```

`auro-select` listens for `auroMenu-selectedOption` and writes `this.value = event.detail.stringValue` — which is `undefined`. This **erases** the original `value="bar"` attribute and property.

### Race 3 -- deferred selectByValue still beats option key assignment

Even after deferring `selectByValue` past the no-options case:

- `Promise.resolve()` (microtask) runs after `auro-menu.updated()` but **inside the same Lit microtask batch**, before the separate `auro-menuoption.updated()` batches run. So `option.key` is still `null` when matching is attempted.
- `setTimeout(0)` (macrotask) runs after **all** pending microtask queues drain, which does include the option `updated()` cycles — but only after the `internalUpdateInProgress` guard is taken into account correctly.

---

## What Was Tried

### Iteration 1 (packed as `0.0.0`)

**Changes:**

1. **`auro-menuoption.js` `connectedCallback`** -- only assign `this.key` when the resolved value is not null:

```js
const resolvedKey = keyAttr !== null ? keyAttr : valueAttr;
if (resolvedKey !== null) {
  this.key = resolvedKey;
}
```

2. **`auro-menuoption.js` `updated`** -- broaden fallback guard from `=== undefined` to `== null`:

```js
if (changedProperties.has('value') && this.key == null) {
  this.key = this.value;
}
```

3. **`auro-menu.js` `updated`** -- wrap `selectByValue` in `Promise.resolve().then()` to defer past the current Lit cycle:

```js
if (changedProperties.has('value')) {
  Promise.resolve().then(() => {
    this.menuService.selectByValue(this.value);
  });
}
```

**Result:** Remount now works. Initial load broken.

The `Promise.resolve()` microtask was still called before the separate option `updated()` microtask batches. So on initial load, `_menuOptions` had options registered but `key` was still `null` for all of them. `selectByValue` matched nothing, fell to `stageUpdate()`, and cascaded `value = undefined`.

### Iteration 2 (packed as `0.0.1`)

**Changes (additional, in `auro-menu.context.js`):**

1. **`MenuService` constructor** -- added `_pendingValue` and `_pendingRetryScheduled` state:

```js
this._pendingValue = null;
this._pendingRetryScheduled = false;
```

2. **`MenuService.selectByValue`** -- guard against no options:

```js
if (this._menuOptions.length === 0) {
  this._pendingValue = value;
  return;
}
```

3. **`MenuService.addMenuOption`** -- debounced retry via `setTimeout(0)`:

```js
if (this._pendingValue != null && !this._pendingRetryScheduled) {
  this._pendingRetryScheduled = true;
  setTimeout(() => {
    this._pendingRetryScheduled = false;
    const pendingValue = this._pendingValue;
    this._pendingValue = null;
    this.selectByValue(pendingValue);
  }, 0);
}
```

4. **`MenuService.hostDisconnected`** -- clear pending state:

```js
this._pendingValue = null;
this._pendingRetryScheduled = false;
```

**Result:** Remount works. Initial load still broken.

Runtime inspection showed `_menuOptions.length === 3` and all keys correct after 600ms, but `svcSelected === 0`. The `Promise.resolve()` path in `auro-menu.updated()` still raced ahead of option `updated()` batches — `selectByValue` ran while keys were populated (Race 1 was fixed), but the `_menuOptions.length === 0` guard no longer applied (options were already registered), so it fell straight into the key-matching path. Because `Promise.resolve()` fires in a microtask within the **same Lit update batch** as `auro-menu.updated()`, option `updated()` hooks (a later batch) had not yet run, so all keys were still `null` at that moment.

### Iteration 3 (packed as `0.0.2`) -- FAILED

**Changes** (replacing `Promise.resolve()` with `setTimeout(0)` + `internalUpdateInProgress` guard in `auro-menu.js`):

```js
if (!this.internalUpdateInProgress) {
  setTimeout(() => {
    this.menuService.selectByValue(this.value);
  }, 0);
}
```

**Rationale:** `setTimeout(0)` is a macrotask and is guaranteed to execute only after all pending microtask queues have fully drained, which includes every `auro-menuoption.updated()` batch. The `!this.internalUpdateInProgress` guard prevents scheduling the `setTimeout` for user-driven value changes (clicking an option), because `setInternalValue()` sets the flag synchronously and the timeout would cause a spurious reset/re-select cycle after the flag clears.

**Result:** Still broken on initial load. `svcSelected: 0` after 800ms despite correct option keys.

**Diagnosis (runtime spying):** Playwright runtime probes showed:
- `selectByValue` fired in the first 50ms (before spy could be installed at 50ms — call log was empty on installation)
- `optKeys` were correct `['foo', 'bar', 'baz']` at 600ms
- `svcSelected` remained 0

Deeper investigation revealed: `selectByValue` WAS running and MATCHING the option. But `reset()` — called at the start of `selectByValue` — invokes `stageUpdate()` when `selectedOptions` is non-empty on repeat calls. `stageUpdate()` dispatches `auroMenu-selectedOption` with `stringValue: undefined` as an intermediate event BETWEEN the clear and the re-selection. `auro-select` hears this event and sets its own `this.value = undefined`. This triggers `setMenuValue(undefined)` → `auro-menu.value = undefined` → `auro-menu.updated()` fires → another `setTimeout` → `selectByValue(undefined)` → early exit. The intended selection is lost in this cascade.

The same cascade also explains why the initial load fails even when keys are correct on the very first call: Svelte's `$effect` `setTimeout` fires and sets `auro-select.value = 'bar'` AFTER the first `selectByValue` run, causing a second `selectByValue` whose `reset()` step broadcasts the destructive `undefined` event.

---

### Iteration 4 (packed as `0.0.3`) -- REVERTED

**Root cause (confirmed):** `reset()` inside `selectByValue` fires an intermediate `auroMenu-selectedOption` event with `stringValue: undefined`. This cascades: `auro-select.value = undefined` → `auro-menu.value = undefined` → second `selectByValue(undefined)` exits early → selection is lost.

**Fix in `auro-menu.context.js`:**

`reset()` now accepts a `silent` flag. When `true`, `stageUpdate()` is skipped. `selectByValue` calls `reset(true)` so no intermediate event fires. The subsequent `selectOptions()` call broadcasts the correct final state.

```js
// reset() signature change
reset(silent = false) {
  const previousOptions = [...this.selectedOptions];
  this.selectedOptions = [];

  if (!silent && previousOptions.length) {
    this.stageUpdate();
  }
}

// selectByValue now calls reset(true)
this.reset(true);
```

**Status:** Built and packed. Reverted before browser test. The cascade root cause analysis is sound but this approach accumulated too much state machinery. Reverting to iteration 1 to re-test from a simpler baseline and understand what specifically breaks on initial load.

---

## Resolution: Iteration 5 -- PASSED

### Summary

The root cause of the destructive feedback loop was `reset()` inside `selectByValue` emitting an intermediate `auroMenu-selectedOption` event with `stringValue: undefined`, which cascaded through `auro-select` and wiped the host value. The fix eliminates `reset()` from the programmatic selection path entirely, makes `selectByValue` a single-transaction operation, and adds a bounded pending-retry mechanism to handle framework mount-order races (Svelte, React, etc.) where option keys are not yet resolved when `selectByValue` first runs.

### Design decisions

- **No-match behavior:** host `value` is preserved when a programmatic value has no matching option. Menu selection clears, but the host attribute/property is not overwritten.
- **Event contract:** exactly one `auroMenu-selectedOption` event per logical programmatic value change. No intermediate clear event.
- **Matching rule:** continues matching by option `key` when present.
- **Reason metadata:** all `stageUpdate` calls now carry a `reason` field (`'user'`, `'programmatic'`, `'no-match'`, `'reset'`) so consumers can distinguish semantic from intermediate events.

### Changes by file

#### `components/menu/src/auro-menu.context.js`

1. **`selectByValue` refactored** -- no longer calls `reset()` first. Instead:
   - If `_menuOptions` is empty or keys are unresolved, queues a bounded retry via `queuePendingValue`.
   - If no match with resolved keys, clears selection with `reason: 'no-match'` and dispatches `auroMenu-selectValueFailure`.
   - If match found, sets `this.selectedOptions` directly and calls `stageUpdate({ reason: 'programmatic' })` once.
   - If `internalUpdateInProgress` is true, defers via `queuePendingValue` instead of dropping the value.

2. **`queuePendingValue` / `clearPendingValue` added** -- bounded retry (max 5 attempts) using `setTimeout(0)`. Retries fire after option `updated()` cycles complete. Cleared on disconnect and on successful match.

3. **`addMenuOption`** -- triggers pending retry when a new option registers and a pending value exists.

4. **`removeMenuOption`** -- clears pending state when all options are removed.

5. **`hostDisconnected`** -- clears pending retry state.

6. **`reset(meta)`** -- accepts metadata (default `{ reason: 'reset' }`). No longer called by `selectByValue`.

7. **`stageUpdate` / `notifyStateChange` / `notifyValueChange`** -- accept and forward `meta` object. `notifyValueChange` no longer dispatches `auroMenu-selectedOption` directly (removed duplicate emission source).

8. **`selectOptions` / `deselectOptions`** -- tagged with `reason: 'user'`.

#### `components/menu/src/auro-menu.js`

1. **`updated()`** -- calls `selectByValue` synchronously (not deferred). The destructive cascade that originally required deferral is eliminated because `selectByValue` no longer calls `reset()`. The `internalUpdateInProgress` guard prevents re-entrant calls from user-driven selection. The pending-retry mechanism handles framework mount-order races.

2. **`handleMenuChange`** -- removed the `newValue === undefined` special-case that unconditionally synced undefined values.

3. **`notifySelectionChange`** -- forwards `reason` and `requestedValues` metadata from the event.

#### `components/select/src/auro-select.js`

1. **`auroMenu-selectedOption` listener** -- uses `reason` metadata to decide whether to sync host value:
   - `reason: 'no-match'` -- host value is preserved (not overwritten with undefined).
   - `reason: 'programmatic'`, `'user'`, `'reset'` -- host value is synced.
   - Untagged events with `stringValue === undefined` -- ignored (prevents initialization noise from clearing preset values).

2. **`updated()` multiSelect guard** -- only clears selection when `multiSelect` actually changes (not on first render from `undefined`).

#### `components/menu/src/auro-menuoption.js`

Unchanged from iteration 1 baseline:
- `connectedCallback` only assigns `this.key` when a non-null attribute is present.
- `updated` uses loose equality (`== null`) for the key fallback guard.

### Test results

| Suite | Result |
|---|---|
| `components/menu/test/auro-menu.test.js` | 47 passed, 0 failed |
| `components/select/test/auro-select.test.js` | 80 passed, 0 failed |
| `components/combobox/test/auro-combobox.test.js` | 85 passed, 0 failed |
| `components/dropdown/test/auro-dropdown.test.js` | 50 passed, 0 failed |
| `apps/svelte-framework/tests/select-remount.spec.ts` | 2 passed, 0 failed |

### New test coverage added

**`auro-select.test.js`:**
- `applies value from host attribute on initial render` -- verifies `value`, `optionSelected`, and reflected attribute after fixture with `value="bar"`.
- `restores selection from value attribute after disconnect and reconnect` -- mounts, verifies, unmounts via `innerHTML = ''`, remounts, and re-verifies.
- `should preserve host value and clear selected option when non-existent value is set programmatically` -- verifies host `value` is preserved while `optionSelected` is cleared.

**`auro-menu.test.js`:**
- `should dispatch a single selectedOption event for one programmatic value update` -- counts `auroMenu-selectedOption` events and asserts exactly 1.

### Svelte demo updated

`apps/svelte-framework/src/routes/+page.svelte` -- removed the `$effect` / `tick` / `setTimeout` workaround. Uses plain attribute binding: `<auro-select value={selectValue}>`.

`apps/svelte-framework/tests/select-remount.spec.ts` -- asserts both `.value` property and `getAttribute('value')` on initial render and after remount.

---

## Post-Resolution: Key Fallback Regression

### Problem

After Iteration 5 was committed, the framework tests passed on the same session but failed after a branch switch and rebuild. The root cause was a regression introduced to satisfy the linter.

### Code regression: `=== null` vs `== null` in `auro-menuoption.js`

The `updated()` key fallback guard was changed from `== null` to `=== null` to satisfy the `eqeqeq` and `no-eq-null` rules in `@aurodesignsystem/eslint-config`. This broke the remount fix.

When a framework (Svelte, React) inserts `<auro-menuoption>` into the DOM before setting its `value` property:

1. `connectedCallback` fires with both `getAttribute('value')` and `getAttribute('key')` returning `null`.
2. The guard `if (resolvedKey !== null)` in `connectedCallback` correctly skips the assignment, leaving the Lit property `key` at its **default value of `undefined`** (not `null`).
3. When the framework later sets `value="bar"`, `updated()` fires.
4. `this.key === null` evaluates to `false` because `undefined !== null`. The fallback is skipped.
5. `this.key` stays `undefined`, so `selectByValue('bar')` can never match this option.

**Fix:** restored `this.key == null` (loose equality) with an inline `// eslint-disable-line eqeqeq, no-eq-null` directive and a comment explaining why the exception is necessary.

### Changes by file

#### `components/menu/src/auro-menuoption.js`

- `updated()` key fallback: `this.key === null` restored to `this.key == null` with `// eslint-disable-line eqeqeq, no-eq-null`. Comment updated to explain why loose equality is required and why strict equality breaks the framework mount-order scenario.

---

## Post-Resolution: Refinement of Guards — Commits `b5aa194` and `94608a9`

After Iteration 5 proved stable for the remount scenario, two guards in `auro-select.js` (added in `e4534fa`) were identified as over-protective. They prevented legitimate behaviors and were unnecessary given the lower-level fixes in MenuService.

### Guard 1: `reason !== 'no-match'` in `auroMenu-selectedOption` listener

**Original behavior:** The listener skipped host-value sync when `reason === 'no-match'`, preserving the host value when a programmatic value had no matching option.

**Problem:** Setting a non-existent value programmatically should clear the host's `value` and `optionSelected`. The guard made invalid values silently stick instead of being cleared.

**Resolution (commit `b5aa194`):** The guard was removed. The host always syncs with the menu's reported value. The lower-level fixes (no `reset()`, pending retry) already prevent the destructive cascade during remount.

### Guard 2: `changedProperties.get('multiSelect') !== undefined` in `updated()`

**Original behavior:** `clearSelection()` was skipped on first render when `multiSelect` changed from `undefined` (Lit default) to `true`.

**Problem:** This also blocked dynamic toggling scenarios (switching between single- and multi-select mode) from clearing stale state.

**Resolution (commit `b5aa194`):** The old-value check was removed. The existing `!changedProperties.has('value')` guard already prevents first-render clearing when `multiSelect` and `value` arrive together.

### Bug discovered during revert testing (commit `94608a9`)

When `selectByValue` found no matching options **and** `selectedOptions` was already empty, `stageUpdate` was not called. This caused two bugs:

1. Setting an invalid value when **no prior selection exists** left the host `value` stuck at the invalid string.
2. Double-clicking a "set invalid" button left the host `value` stuck on the second click.

**Fix:** `stageUpdate({ reason: 'no-match' })` now always fires on a no-match result, regardless of prior selection state.

### Tests added

**Unit tests (`auro-select.test.js`):**
- `multiselect with preset values retains those values on initial render`
- `toggling multiSelect to true clears any existing single-select value`
- `setting an invalid value when no prior selection exists clears the value and optionSelected`
- `setting an invalid value on a multiselect with no prior selection keeps value and optionSelected empty`
- `setting an invalid value when a selection already exists resets value and optionSelected`
- `setting an invalid value on a multiselect with preset values clears the selection`
- `double-clicking set-invalid keeps value cleared` (single-select and multiselect)

**Framework tests (Playwright, both Svelte and React):**
- `setting an invalid value clears the selection` (single-select and multiselect)
- `double-clicking set-invalid keeps value cleared` (single-select and multiselect)

---

## Post-Resolution: Cross-Bundle Version Collision — Commit `100316a`

### Problem

In a Svelte 5 environment where `borealis-header` (which bundles its own older copy of `auro-menu`) is loaded alongside a newer version of formkit, `auro-select` crashes with:

```
Uncaught TypeError: Cannot read properties of undefined (reading '0')
```

The crash occurs at:

```js
this.optionSelected = this.multiSelect ? event.detail.options : event.detail.options[0];
```

### Root cause

This is **not** a bug in formkit's internal event contract. Formkit's own `MenuService.notifyValueChange` always includes `options: this.selectedOptions` (an array, possibly empty) in the event detail.

The crash occurs when a **different bundled version** of `auro-menu` (e.g., from `borealis-header`) wins the `customElements.define` race for the `auro-menu` tag name. That older version dispatches `auroMenu-selectedOption` **without** an `options` property in the event detail, making `event.detail.options` literally `undefined`.

This is a tag-name collision caused by one or both packages not custom-registering their internal dependencies via `AuroDependencyVersioning`. When both packages properly custom-register all components, each select listens only on its own menu instance and the collision cannot occur.

### Fix

A minimal defensive guard was added to the `auroMenu-selectedOption` listener:

```js
const options = event.detail.options || [];

this.value = event.detail.stringValue;
this.optionSelected = this.multiSelect ? options : options[0];
```

The `|| []` fallback prevents a hard crash without masking the underlying version collision. The correct long-term fix is for all packages to custom-register their dependencies.

Debug `console.log` statements from the investigation were also removed in this commit.
