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
- Example: The `@auro-formkit/combobox` package might depend on `@auro-formkit/input`
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
      "@open-wc/testing": "^4.0.0",
      "@auro-formkit/input": "workspace:*"  // Internal dev dependency
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
    "@auro-formkit/auro-dropdown": "*",     // Required UI component
    "@auro-formkit/auro-input": "*",        // Required UI component
    
    // External dependencies
    "@alaskaairux/icons": "^4.44.1",  // Required UI component
    "lit": "^3.2.1"                   // Framework
  },
  "peerDependencies": {
    "@aurodesignsystem/design-tokens": "^4.12.1",
    "@aurodesignsystem/webcorestylesheets": "^5.1.2"
  },
  "devDependencies": {
    // Testing utilities
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