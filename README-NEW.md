## Getting started

### Installation

```
npm i
```

### Development

```
npm run dev
```

#### Filtering

Running the `dev` command will run all components in development.

To only develop a single component, use the `--filter` flag:

```
turbo dev --filter=@auro-formkit/auro-input

@TODO:
npm run dev --filter=@auro-formkit/auro-input
```

### Testing

```
npm run test
```

### @TODO:

#### WTR & Workspaces

`web-test-runner` does not support the `node:` prefix. Therefor, this does not work:

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

### Linting

```
npm run lint
```

### Build

```
npm run build
```


## Managing dependencies

### Best practices for dependency installation

When you install a dependency in a component or package in `auro-formkit`, you should install it directly in the package that uses it. 

The package's `package.json` will have every dependency that it needs. This is true for both external and internal dependencies.

- External dependencies come from the `npm` registry.

- Internal dependencies let you share functionality within your repository.

This practice has several benefits:

- **Improved clarity:** It's easier to understand what a package depends on when its dependencies are listed in its `package.json`. Developers working in the repository can see at a glance what dependencies are used within the package.

- **Enhanced flexibility:** In a monorepo at scale, it can be unrealistic to expect each package to use the same version of an external dependency.

- **Better caching ability:** If you install too many dependencies in the root of your repository, you'll be changing the workspace root whenever you add, update, or delete a dependency, leading to unnecessary cache misses.

- **Pruning unused dependencies:** When dependencies are installed in the packages that they are meant for, Turborepo can read your lockfile and remove dependencies that aren't used in the packages you need.

For more information, see the [Turborepo docs](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies).

#### The root `package.json`

The only dependencies that belong in the root `package.json` are **tools for managing the repository**. 
Whereas dependencies for building applications and libraries are installed in their respective packages. 

Some examples of dependencies that make sense to install in the root are `turbo`, `husky`, or `stylelint`.