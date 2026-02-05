import { Viewport } from "storybook/viewport";

/**
 * This file defines the available modes for the Storybook configuration.
 */

const breakpoints = {
  "gridBreakpoint": {
    "xs": {
      "value": "320px",
      "type": "semantic",
      "public": true,
      "deprecated": true
    },
    "sm": {
      "value": "576px",
      "type": "semantic",
      "public": true,
      "deprecated": true
    },
    "md": {
      "value": "768px",
      "type": "semantic",
      "public": true,
      "deprecated": true
    },
    "lg": {
      "value": "1024px",
      "type": "semantic",
      "public": true,
      "deprecated": true
    },
    "xl": {
      "value": "1232px",
      "type": "semantic",
      "public": true,
      "deprecated": true
    }
  }
}

const includedBreakpoints = ['xs', 'xl'];

/** Breakpoint array formatted to to use
 * for Storybook viewport controls.
 * {
 *   [key: string]: {
 *     name: string;
 *     styles: { height: string, width: string };
 *     type: 'desktop' | 'mobile' | 'tablet' | 'other';
 *   };
 * }
 */
export const viewport: Record<string, Viewport> = Object.fromEntries(
  Object.entries(breakpoints.gridBreakpoint).map(([key, bp]) => [
    key,
    {
      name: key,
      styles: {
        width: bp.value,
        height: '100%',
      },
      type: key === 'xs' || key === 'sm' ? 'mobile' : key === 'md' ? 'tablet' : 'desktop',
    },
  ])
);

export const chromaticViewport: Record<string, Viewport> = Object.fromEntries(
  Object.entries(breakpoints.gridBreakpoint).filter(([key]) => includedBreakpoints.includes(key)).map(([key, bp]) => [
    key,
    {
      name: key,
      styles: {
        width: bp.value,
        height: '100%',
      },
      type: key === 'xs' || key === 'sm' ? 'mobile' : key === 'md' ? 'tablet' : 'desktop',
    },
  ])
);

/**
 * Themes object that points to stylesheets with design tokens for theming
 */
export const themes = {
    Alaska: {
        tokens: "https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/themes/alaska/CSSCustomProperties--alaska.css",
        chromaticKey: "Alaska",
    },
    Hawaiian: {
        tokens: "https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/themes/hawaiian/CSSCustomProperties--hawaiian.min.css",
        chromaticKey: false,
    },
    Atmos: {
        tokens: "https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/themes/auro1/CSSCustomProperties--auro1.min.css",
        chromaticKey: false,
    },
    Classic: {
        tokens: "https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/themes/alaska-classic/CSSCustomProperties--alaskaClassic.css",
        chromaticKey: false,
    },
    // Add more themes as needed
} as const
export type Theme = (typeof themes)[keyof typeof themes]

export const flatThemes = Object.fromEntries(
    Object.entries(themes).map(([key, value]) => [key, value.tokens])
);

export interface Mode {
    viewport: Viewport
    theme: keyof typeof themes
}
export type Modes = Record<string, Mode>

/**
 * Generates all combinations of themes and viewports for Chromatic modes.
 * Chromatic also enforce the width and height are between 200 and 2560 pixels.
 * https://www.chromatic.com/docs/modes/viewports/#are-there-any-constraints-on-the-viewport-size-that-i-can-choose
 *
 * Example output: {
 *  "Alaska-320px-xs": { viewport: "xs", theme: "Alaska" },
 *  "Alaska-1024px-lg": { viewport: "lg", theme: "Alaska" },
 *  ...
 *  "Hawaiian--320px-xs": { viewport: "xs", theme: "Hawaiian" },
 *  ...
 * }
 */
export const allModes = Object.fromEntries(
    Object.entries(themes)
        .filter(([, theme]) => !!theme.chromaticKey)
        .flatMap(([themeName, theme]) =>
            Object.values(chromaticViewport)
                .map((item) => [
                    `${item.name.toUpperCase()}-${theme.chromaticKey}-${item.styles.width.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`,
                    {
                        viewport: item.name,
                        theme: themeName,
                    },
                ])
        )
)
