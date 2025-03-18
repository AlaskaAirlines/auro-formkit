import type { StorybookConfig } from "@storybook/web-components-vite";

import { join, dirname } from "path";

import remarkGfm from 'remark-gfm';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const relativeComponentDirectory = "../components";
const relativeDocDirectory = "../docs";

const config: StorybookConfig = {
  stories: [
    `${relativeComponentDirectory}/*/*.mdx`,
    `${relativeDocDirectory}/*.mdx`,
    `${relativeComponentDirectory}/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)`,
    `${relativeComponentDirectory}/*/stories/*.mdx`,
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    {
      // This needs to match the name inside `addon-essentials`, so don't use `getAbsolutePath`
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
