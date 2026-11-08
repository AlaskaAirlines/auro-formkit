/**
 * Custom Elements Manifest analyzer config for the formkit monorepo.
 *
 * The CEM plugins (deprecated prose, numeric bounds, `@requiredWhen`,
 * `@relevantWhen`, `@category`, read-only and private attribute filtering,
 * `@internal`, sorting, and `@forcePrivate`) live in `@aurodesignsystem/auro-cli`,
 * so every Auro repo builds its manifest with the same rules that
 * `auro cem-check` validates. auro-cli only ships them inside its own analyzer
 * config, which targets a single-component repo, so this file reuses that
 * config's plugins with formkit's monorepo globs.
 *
 * Two plugins are left out because they write JSX and Svelte type exports to
 * `dist/index.d.ts` in the current folder, which doesn't exist at the monorepo
 * root. Each formkit component builds its own `.d.ts` files with `tsc`.
 */

// auro-cli exports only its CLI entry, so locate the bundled config next to it.
const auroCliConfigUrl = new URL(
  './configs/custom-elements-manifest.config.mjs',
  import.meta.resolve('@aurodesignsystem/auro-cli')
);

const { default: auroCliConfig } = await import(auroCliConfigUrl);

const SINGLE_COMPONENT_PLUGINS = new Set([
  '@wc-toolkit/jsx-types',
  'add-dts-exports-plugin'
]);

export default {
  globs: ['components/**/src/*.js'],
  exclude: [
    'components/**/src/**/*.stories.ts',
    'components/**/dist/**/*.js'
  ],
  litelement: true,
  plugins: auroCliConfig.plugins.filter((plugin) => !SINGLE_COMPONENT_PLUGINS.has(plugin.name))
};
