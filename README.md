<!--
The README.md file is a compiled document. No edits should be made directly to this file.

README.md is created by running `npm run build:docs:kit`.

The following sections are editable by making changes to the following files:

| SECTION                | DESCRIPTION                                       | FILE LOCATION                       |
|------------------------|---------------------------------------------------|-------------------------------------|
| Description            | Description of the component                      | `./docs/partials/description.md`    |
| Use Cases              | Examples for when to use this component           | `./docs/partials/useCases.md`       |
| Additional Information | For use to add any component specific information | `./docs/partials/readmeAddlInfo.md` |
| Component Example Code | HTML sample code of the components use            | `./apiExamples/basic.html`          |
-->

# Formkit

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->

## Description

`auro-formkit` is a collection of web components that can be used to build forms.

It is a monorepo that contains the following components:

- `@auro-formkit/auro-input`
- `@auro-formkit/auro-dropdown`
- `@auro-formkit/auro-combobox`
- `@auro-formkit/auro-menu`
- `@auro-formkit/auro-radio`
- `@auro-formkit/auro-checkbox`
- `@auro-formkit/auro-select`
- `@auro-formkit/auro-counter`
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->

## Turborepo Overview

This monorepo is managed using [Turborepo](https://turborepo.org/).

### Managing dependencies

#### Best practices for dependency installation

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

### Root `package.json`

The only dependencies that belong in the root `package.json` are **tools for managing the repository**.

Some examples of dependencies that make sense to install in the root are `turbo`, `husky`, or `stylelint`.

Conversely, dependencies Auro components rely on should be installed in their respective packages, such as `Lit`, `Rollup`, or other `auro-formkit` dependencies.
<!-- AURO-GENERATED-CONTENT:END -->

## Install

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/usage/componentInstall_esm.md) -->
[![Build Status](https://img.shields.io/github/actions/workflow/status/AlaskaAirlines/-formkit/-formkit/build-tools/testPublish.yml?style=for-the-badge)](https://github.com/AlaskaAirlines/-formkit/-formkit/build-tools/actions/workflows/testPublish.yml)
[![See it on NPM!](https://img.shields.io/npm/v/@auro-formkit/-formkit/-formkit/build-tools?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@auro-formkit/-formkit/-formkit/build-tools)
[![License](https://img.shields.io/npm/l/@auro-formkit/-formkit/-formkit/build-tools?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
![ESM supported](https://img.shields.io/badge/ESM-compatible-FFE900?style=for-the-badge)

```shell
$ npm i @auro-formkit/-formkit/-formkit/build-tools
```

Installing as a direct, dev or peer dependency is up to the user installing the package. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer.

<!-- AURO-GENERATED-CONTENT:END -->

## Development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/developmentDescription.md) -->
<!-- The below content is automatically added from ./docs/partials/developmentDescription.md -->

### Filtering

Running the `dev` command will run all components in development.

To only develop a single component, use the `--filter` flag:

```
turbo dev --filter=@auro-formkit/auro-input
```
<!-- AURO-GENERATED-CONTENT:END -->

### Start development environment

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/localhost.md) -->
<!-- The below content is automatically added from ./docs/partials/localhost.md -->

## Local Development
<!-- AURO-GENERATED-CONTENT:END -->

### Testing

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/testing.md) -->
<!-- The below content is automatically added from ./docs/partials/testing.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->