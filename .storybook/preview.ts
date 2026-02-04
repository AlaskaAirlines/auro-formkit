import {
  type Preview,
  type StoryContext,
  type Args,
  setCustomElementsManifest,
} from "@storybook/web-components-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { Canvas, Controls, Meta, Markdown } from "@storybook/addon-docs/blocks";
import { html } from "lit-html";
import { within as withinShadow } from "shadow-dom-testing-library";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import customElements from "../custom-elements.json";
import { allModes, flatThemes, viewport } from "./modes";

setStorybookHelpersConfig({
  /** hides the `arg ref` label on each control */
  hideArgRef: false,
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef: "parsedTypes",
  /** Adds a <script> tag where a `component` variable will reference the story's component */
  setComponentVariable: false,
  /** renders default values for attributes and CSS properties */
  renderDefaultValues: false,
});

setCustomElementsManifest(customElements);

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

/**
 * Custom decorator to load CSS files based on the selected theme, using the built in
 */
export const withCssTheme = ({ themes, defaultTheme }) => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (
    storyFn: (args: Args, context: StoryContext) => any,
    context: StoryContext,
  ) => {
    const selectedTheme = pluckThemeFromContext(context) || defaultTheme;
    const themeCssUrl = themes[selectedTheme];

    // Remove existing StoryBook theme CSS link if any
    let existingLink = document.getElementById("storybook-theme-css");
    if (existingLink) {
      existingLink.parentNode?.removeChild(existingLink);
    }

    // Add new StoryBook theme CSS link
    const link = document.createElement("link");
    link.id = "storybook-theme-css";
    link.rel = "stylesheet";
    link.href = themeCssUrl;
    document.head.appendChild(link);

    return storyFn(context.args, context);
  };
};

const preview: Preview = {
  beforeEach({ canvasElement, canvas }) {
    Object.assign(canvas, { ...withinShadow(canvasElement) });
  },
  decorators: [
    withCssTheme({
      // reduced to only object with key and token URL value
      themes: flatThemes,
      defaultTheme: "Alaska",
    }),
  ],
  parameters: {
    controls: {
      disableSaveFromUI: true,
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },

    docs: {
      components: { Canvas, Controls, Markdown, Meta },
      source: {
        /**
         * When defining event handlers in a story's `render` function, the code before the return
         * statement is not included in the source code displayed in the Docs tab. To work around this,
         * we apply `parameters.docs.source.type = 'code'` to the story. That then prints the entire
         * story source, which includes more than just the `render` function we're interested in.
         * This transform function prints only the `render` function (i.e. the originalStoryFn).
         */
        transform: (code, { parameters, originalStoryFn }) =>
          parameters.docs.source.type === "code"
            ? originalStoryFn.toString()
            : code,
      },
      toc: true,
    },

    viewport: { options: viewport },

    chromatic: {
      modes: allModes, // Use the modes defined in modes.ts
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export type ShadowQueries = ReturnType<typeof withinShadow>;

declare module "storybook/internal/csf" {
  // since 8.6
  interface Canvas extends ShadowQueries {}
}

export default preview;
