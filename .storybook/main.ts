// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/web-components-vite";

import { join, dirname } from "path";

import remarkGfm from 'remark-gfm';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const relativeComponentDirectory = "../components/checkbox";
const relativeDocDirectory = "../docs";

const config: StorybookConfig = {
  stories: [
    `${relativeComponentDirectory}/**/**/*.mdx`,
    `${relativeDocDirectory}/*.mdx`,
    `${relativeComponentDirectory}/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
    `${relativeComponentDirectory}/**/stories/**/*.mdx`,
    '../components/radio/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    `../components/counter/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
    `../components/form/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
  ],
  addons: [{
    // This needs to match the name inside `addon-essentials`, so don't use `getAbsolutePath`
    name: getAbsolutePath("@storybook/addon-docs"),
    options: {
      mdxPluginOptions: {
        mdxCompileOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
  }, getAbsolutePath("@storybook/addon-themes"), getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@chromatic-com/storybook"), getAbsolutePath("@storybook/addon-designs"), getAbsolutePath("@storybook/addon-vitest"), getAbsolutePath("storybook-addon-tag-badges"), getAbsolutePath("storybook-addon-pseudo-states")],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  core: {
    disableTelemetry: true,
  }
};
export default config;
