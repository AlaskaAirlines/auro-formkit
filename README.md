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

# Auro Formkit

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->

## Description

`auro-formkit` is a collection of web components that can be used to build forms.

It is a monorepo that contains the following components:

- `auro-checkbox`
    - `auro-checkbox-group`
- `auro-combobox`
- `auro-counter`
    - `auro-counter-group`
- `auro-datepicker`
- `auro-dropdown`
- `auro-form`
- `auro-input`
- `auro-menu`
    - `auro-menu-option`
- `auro-radio`
    - `auro-radio-group`
- `auro-select`
<!-- AURO-GENERATED-CONTENT:END -->

## Install

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/usage/componentInstall_esm.md) -->
[![Build Status](https://img.shields.io/github/actions/workflow/status/AlaskaAirlines/auro-formkit/testPublish.yml?style=for-the-badge)](https://github.com/AlaskaAirlines/auro-formkit/actions/workflows/testPublish.yml)
[![See it on NPM!](https://img.shields.io/npm/v/@aurodesignsystem/auro-formkit?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@aurodesignsystem/auro-formkit)
[![License](https://img.shields.io/npm/l/@aurodesignsystem/auro-formkit?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
![ESM supported](https://img.shields.io/badge/ESM-compatible-FFE900?style=for-the-badge)

```shell
$ npm i @aurodesignsystem/auro-formkit
```

Installing as a direct, dev or peer dependency is up to the user installing the package. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer.

<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/gettingStarted.md) -->
<!-- The below content is automatically added from ./docs/partials/gettingStarted.md -->
To start using the Auro Formkit components, follow the instructions below:

### Usage

You can use Auro Formkit components in your project in two ways: default or custom registration.

#### Default Registration

For default registration, simply import the component:

```javascript
import "@aurodesignsystem/auro-formkit/auro-checkbox";
```

This will automatically register both the `<auro-checkbox>` and the included `<auro-checkbox-group>` component for use in your project. Note that not all Auro Formkit components have sub-components. Be sure to check the documentation for each component to understand its specific usage and registration requirements.

#### Class Custom Registration

If you prefer to register the component with a custom name, you can call the component class directly to create a custom registration:

```javascript
import { AuroCheckbox, AuroCheckboxGroup } from "@aurodesignsystem/auro-formkit/auro-checkbox/class";

AuroCheckbox.register('custom-checkbox');
AuroCheckbox.register('custom-checkbox-group');
```

This will register the component as `<custom-checkbox>` and `<custom-checkbox-group>`.

### Basic HTML Example

Here is an example of how to use the Auro Checkbox component in your HTML:

`index.html -> <head>`

```html
<script type="module">
    import "@aurodesignsystem/auro-formkit/auro-checkbox";
</script>
```

`index.html -> <body>`

```html
<auro-checkbox-group>
    <span slot="legend">
        Form label goes here
    </span>
    <auro-checkbox value="value1" name="basic" id="checkbox-basic1">
        Checkbox option
    </auro-checkbox>
    <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>
        Checkbox option two
    </auro-checkbox>
</auro-checkbox-group>
```

By following these steps, you can easily integrate Auro Formkit components into your project.
<!-- AURO-GENERATED-CONTENT:END -->

## Development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/developmentDescription.md) -->
<!-- The below content is automatically added from ./docs/partials/developmentDescription.md -->

### Filtering

Running the `dev` command will open a `localhost` development server for all components in the monorepo at once.

To only develop a single component, use the `--filter` flag:

```
turbo dev --filter=@aurodesignsystem/auro-input
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

#### Port configuration

Turbo will attempt to test components in parallel which will lead to port conflicts.

Setting the `concurrency` to `1` will prevent Turbo from running tests in parallel:

```
"test": "turbo run test --concurrency=1",
```

`turbo.json`does not support `--concurrency` yet. See [this issue](https://github.com/vercel/turborepo/discussions/7493).
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->

## Turborepo Overview

This monorepo is managed using [Turborepo](https://turborepo.org/).

### Managing dependencies

#### Best practices for dependency installation

When you install a dependency in a component or package in `auro-formkit`, you should install it directly in the package that uses it. 

The package's `package.json` will have every dependency that it needs. This is true for both external and internal dependencies.

### Types of Dependencies by Source

#### External Dependencies
- These are packages fetched from the `npm` registry (e.g., Lit, Rollup, Sass)
- Declared in `package.json` using exact versions or version ranges
- Installed in `node_modules` during `npm install` or `yarn install`

#### Internal Dependencies
- These are packages from within the `auro-formkit` monorepo
- Allow sharing code between different packages in your repository
- Example: The `@aurodesignsystem/combobox` package might depend on `@auro-formkit/input`
- Must be declared in `package.json` just like external dependencies
- Use workspace protocols (e.g., `"workspace:*"` or `"workspace:^1.0.0"`)

### Types of Dependencies by Purpose

#### Dependencies (`dependencies`)
- Required for the package to function in production
- Example:
  ```json
  {
    "dependencies": {
      "lit.js": "^3.0.0",                    // External dependency
      "@auro-formkit/input": "workspace:*"  // Internal dependency
    }
  }
  ```

#### Peer Dependencies (`peerDependencies`)
- Packages that your library expects the consuming application to provide
- Common for plugins or UI component libraries
- Example:
  ```json
  {
    "peerDependencies": {
      "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
      "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
    }
  }
  ```

### Development Dependencies (`devDependencies`)
- Only needed during development, testing, or building
- Not included in the production bundle
- Example:
  ```json
  {
    "devDependencies": {
      "typescript": "^5.0.0",
      "@open-wc/testing": "^4.0.0"  // Internal dev dependency
    }
  }
  ```

## Example: Component Dependencies

Let's use `@auro-formki/combobox` as an example to illustrate these concepts:

```json
{
  "name": "@auro-formkit/combobox",
  "dependencies": {
    // Internal dependencies
    "@aurodesignsystem/auro-dropdown": "*",     // Required UI component
    "@aurodesignsystem/auro-input": "*",        // Required UI component

    // External dependencies
    "@alaskaairux/icons": "^4.44.1",  // Required UI component
    "lit": "^3.2.1"                   // Framework
  },
  "peerDependencies": {
    "@aurodesignsystem/design-tokens": "^4.12.1",
    "@aurodesignsystem/webcorestylesheets": "^5.1.2"
  },
  "devDependencies": {
    // Build utilities
    "rollup": "^4.24.4",
    "@auro-formkit/build-tools": "*",
  }
}
```

This structure ensures that:
1. The package explicitly declares all its dependencies
2. Internal dependencies are properly tracked and versioned
3. Development tools are separated from production dependencies
4. Peer dependencies are clearly communicated to consumers

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