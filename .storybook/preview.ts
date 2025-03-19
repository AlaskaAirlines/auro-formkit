import type { Preview, StoryContext, Args } from "@storybook/web-components";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { Canvas, Meta, Markdown } from '@storybook/blocks';
import { html } from "lit-html";
import { within as withinShadow } from 'shadow-dom-testing-library';

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

/**
 * List of container sizes to cycle through
 */
const containerSizes = [
  { title: "Full Width", value: "100%" },
  { title: "Container (968px)", value: "968px" },
  { title: "Container (856px)", value: "856px" },
  { title: "Tablet (768px)", value: "768px" },
  { title: "Container (668px)", value: "668px" },
  { title: "Container (656px)", value: "656px" },
  { title: "Container (543px)", value: "543px" },
  { title: "Container (527px)", value: "527px" },
  { title: "Container (476px)", value: "476px" },
  { title: "Container (415px)", value: "415px" },
  { title: "Mobile (320px)", value: "320px" },
  { title: "Side Nav (288px)", value: "288px" },
  { title: "Anchor Nav (168px)", value: "168px" },
];

/**
 * Global Container Decorator
 * Wraps all stories in multiple containers with adjustable sizes for Canvas.
 * Displays only one example in the Docs page.
 */
const containerDecorator = (Story, context) => {
  // Check if we are in the "docs" view mode
  if (context.viewMode === "docs") {
    // Show only one example (default size) in Docs
    return html` ${Story()} `;
  }

  // In "story" view mode (Canvas), show all sizes
  return html`
    <div style="padding:1rem">
      <div class="story-description-container">
        <h2>Component Overview</h2>
        <p>
          This page demonstrates the
          <strong>${context.name}</strong>
          variant of the
          <strong>${context.title}</strong>
          component and its variations across the officially supported container
          sizes. Use the controls to explore different configurations and
          responsive behaviors.
        </p>
      </div>
      ${containerSizes.map(
        ({ title, value }) => html`
          <div
            style="
              margin: 10px auto;
              max-width: ${value};
            "
          >
            <h4 style="text-align: center;">${title}</h4>
            ${Story()}
          </div>
        `,
      )}
    </div>
  `;
};

const preview: Preview = {
  beforeEach({ canvasElement, canvas }) {
    Object.assign(canvas, { ...withinShadow(canvasElement) });
  },
  decorators: [
    // (Story, context) => containerDecorator(() => Story(context), context), // Add containerDecorator globally
    withCssTheme({
      themes: {
        // TODO: These are temporary CSS file(s) that override design tokens as multi-brand support is being added.
        // Eventually these should be updated or replaced with the final css sheet/values.
        // (https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1164663).
        Alaska: "",
        Hawaiian: "https://jetstream-rouge.vercel.app/themes/californian.css",
      },
      defaultTheme: "Alaska",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      components: {
        Canvas,
        Meta,
        Markdown,
      },
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
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export type ShadowQueries = ReturnType<typeof withinShadow>

declare module 'storybook/internal/csf' { // since 8.6
  interface Canvas extends ShadowQueries {}
}

export default preview;
