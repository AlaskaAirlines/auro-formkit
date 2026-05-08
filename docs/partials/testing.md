```
npm run test
```

#### Port configuration

Turbo will attempt to test components in parallel which will lead to port conflicts.

Setting the `concurrency` to `1` will prevent Turbo from running tests in parallel:

```
"test": "turbo run test --concurrency=1",
```

`turbo.json`does not support `--concurrency` yet. See [this issue](https://github.com/vercel/turborepo/discussions/7493).

## Framework tests

The `apps/` directory contains minimal consumer harnesses for React and SvelteKit. These run Playwright tests against the real component lifecycle inside each framework, covering scenarios like initial value assignment and DOM remount.

### Prerequisites

Build the components first (required because the apps consume from `dist/`):

```
npm run build
```

Playwright browser binaries (first time only):

```
npx playwright install chromium
```

### Running

```bash
# React only
npm run test:framework:react

# Svelte only
npm run test:framework:svelte

# Both together
npm run test:frameworks
```

### Apps

| App | Port | Located at |
|-----|------|------------|
| `@aurodesignsystem/react-framework` | 5181 | `apps/react-framework/` |
| `@aurodesignsystem/svelte-framework` | 5182 | `apps/svelte-framework/` |

Each app starts its own dev server automatically when `playwright test` runs (via `webServer` in `playwright.config.ts`). Existing running servers on those ports are reused to speed up local iteration.

To open an app manually:

```bash
cd apps/react-framework && npm run dev:app
cd apps/svelte-framework && npm run dev:app
```
