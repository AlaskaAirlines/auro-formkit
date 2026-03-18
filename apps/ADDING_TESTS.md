# Adding shared framework tests

Tests in `shared/` run against both the React and Svelte apps from a single file.
Follow these four steps to add a new test suite.

---

## 1. Create the shared Playwright suite

Add a file to `shared/` named `<suite-name>.suite.ts`. Export a function that
accepts a `framework` label and registers all tests inside it.

```ts
// shared/my-feature.suite.ts
import { test, expect, type Page } from '@playwright/test';

async function waitForReady(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-my-element') !== undefined,
    { timeout: 10_000 },
  );
}

export function myFeatureSuite(framework: string) {
  test.describe(`auro-my-element in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/my-feature');
      await waitForReady(page);
    });

    test('does the thing', async ({ page }) => {
      // ...
    });
  });
}
```

---

## 2. Wire the suite into each framework's spec file

Create a spec file in each framework's `tests/` directory that simply calls the
shared suite with its framework label.

**`react-framework/tests/my-feature.spec.ts`**
```ts
import { myFeatureSuite } from '../../shared/my-feature.suite';

myFeatureSuite('React');
```

**`svelte-framework/tests/my-feature.spec.ts`**
```ts
import { myFeatureSuite } from '../../shared/my-feature.suite';

myFeatureSuite('Svelte');
```

Each framework's `playwright.config.ts` already points at its own `./tests` dir
and dev server, so no config changes are needed.

---

## 3. Create the test page in each framework app

### React — `react-framework/src/pages/MyFeature.tsx`

```tsx
export default function MyFeature() {
  return (
    <div>
      {/* Render the component(s) under test here */}
      <auro-my-element></auro-my-element>
    </div>
  );
}
```

### Svelte — `svelte-framework/src/routes/my-feature/+page.svelte`

```svelte
<script lang="ts">
  import '@aurodesignsystem/auro-formkit/auro-my-element';
</script>

<!-- Render the component(s) under test here -->
<auro-my-element></auro-my-element>
```

---

## 4. Register the route and add it to the dashboard nav

### React

In `react-framework/src/App.tsx`, add a `<Route>` for the new page:

```tsx
import MyFeature from './pages/MyFeature';

// inside <Router>:
<Route path="/my-feature" component={MyFeature} />
```

In `react-framework/src/pages/Home.tsx`, add an entry to `SUITES`:

```ts
const SUITES = [
  { label: 'auro-select: remount', path: '/select-remount' },
  { label: 'auro-my-element: my feature', path: '/my-feature' }, // add this
];
```

### Svelte

SvelteKit picks up the new route automatically from the file you created in
step 3. Just add an entry to the `suites` array in
`svelte-framework/src/routes/+page.svelte`:

```ts
const suites = [
  { label: 'auro-select: remount', path: '/select-remount' },
  { label: 'auro-my-element: my feature', path: '/my-feature' }, // add this
];
```

---

## Running the tests

From the repo root:

```bash
# React only
npm run test:framework:react

# Svelte only
npm run test:framework:svelte

# Both
npm run test:frameworks
```
