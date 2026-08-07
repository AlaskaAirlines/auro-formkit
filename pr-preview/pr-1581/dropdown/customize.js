/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroDropdown } from '../src/auro-dropdown.js';
AuroDropdown.register();
AuroDropdown.register('custom-dropdown');

import { fullscreenBreakpointExample } from '../apiExamples/fullscreen-breakpoint.js';
import { errorExample } from '../apiExamples/error.js';
import { matchWidthExample } from '../apiExamples/match-width.js';
import { inverseErrorExample } from '../apiExamples/appearance-inverse-error.js';
export function initExamples(initCount) {
  // javascript example function calls to be added here upon creation to test examples
  initCount = initCount || 0;

  try {
    fullscreenBreakpointExample();
    errorExample();
    matchWidthExample();
    inverseErrorExample();
  } catch {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
