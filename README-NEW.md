## Managing dependencies

### Best practices for dependency installation

When you install a dependency in your repository, you should install it directly in the package that uses it. 

The package's `package.json` will have every dependency that the package needs. This is true for both external and internal dependencies.

- External dependencies come from the `npm` registry, allowing you to leverage valuable code from the ecosystem to build your applications and libraries faster.

- Internal dependencies let you share functionality within your repository, dramatically improving discoverability and usability of shared code. We will discuss how to build an Internal Package in the next guide.

This practice has several benefits:

- **Improved clarity:** It's easier to understand what a package depends on when its dependencies are listed in its package.json. Developers working in the repository can see at a glance what dependencies are used within the package.

- **Enhanced flexibility:** In a monorepo at scale, it can be unrealistic to expect each package to use the same version of an external dependency. When there are many teams working in the same codebase, there will be differing priorities, timelines, and needs due to the realities of operating at scale. By installing dependencies in the package that uses them, you can enable your ui team to bump to the latest version of TypeScript, while your web team can prioritize shipping new features and bumping TypeScript later. Additionally, if you still want to keep dependency versions in sync, you can do that, too.

- **Better caching ability:** If you install too many dependencies in the root of your repository, you'll be changing the workspace root whenever you add, update, or delete a dependency, leading to unnecessary cache misses.

- **Pruning unused dependencies:** When dependencies are installed in the packages that they are meant for, Turborepo can read your lockfile and remove dependencies that aren't used in the packages you need.

For more information, see the [Turborepo docs](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies).

#### The root `package.json`

The only dependencies that belong in the root `package.json` are **tools for managing the repository**. 
Whereas dependencies for building applications and libraries are installed in their respective packages. 

Some examples of dependencies that make sense to install in the root are `turbo`, `husky`, or `stylelint`.