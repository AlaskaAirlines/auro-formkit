```
npm run test
```

### @TODO:

#### WTR & Workspaces

`web-test-runner` does not support the `node:` prefix. Therefore, this does not work:

```
"test": "wtr --config node:@auro-formkit/config/wtr --coverage"
```
However, referencing the path directly works:

```
"test": "wtr --config \"../../packages/config/src/web-test-runner.config.mjs\" --coverage"
```

`pnpm`supports a `workspace:` prefix:

```
"test": "wtr --config workspace:@auro-formkit/config/wtr --coverage"
```

#### Port configuration

Turbo will attempt to test components in parallel which will lead to port conflicts.

Setting the `concurrency` to `1` will prevent Turbo from running tests in parallel:

```
"test": "turbo run test --concurrency=1",
```

`turbo.json`does not support `--concurrency` yet. See [this issue](https://github.com/vercel/turborepo/discussions/7493).