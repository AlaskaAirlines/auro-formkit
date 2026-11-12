```
npm run test
```

#### Port configuration

Turbo tests components in parallel, which can lead to port conflicts.

To stop Turbo from running the component tests in parallel, set `--concurrency` to `1` in the `test:wtr` script:

```
"test:wtr": "turbo run test --concurrency=1 --continue",
```

`turbo.json` doesn't currently support `--concurrency`. See [this issue](https://github.com/vercel/turborepo/discussions/7493).

## Framework tests

The `apps/` directory contains minimal consumer harnesses for React and SvelteKit. These run Playwright tests against the real component lifecycle inside each framework, covering scenarios such as initial value assignment and DOM remount.

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

Each app starts its own dev server automatically when `playwright test` runs (via `webServer` in `playwright.config.ts`). It always starts a fresh server and doesn't reuse one already running on that port, so tests don't run against a server with stale `dist/` files.

To open an app manually:

```bash
cd apps/react-framework && npm run dev:app
cd apps/svelte-framework && npm run dev:app
```
