/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroDropdown } from '../src/auro-dropdown.js';
AuroDropdown.register();
AuroDropdown.register('custom-dropdown');

import { fullscreenBreakpointExample } from '../apiExamples/fullscreen-breakpoint.js';
export function initExamples(initCount) {
  // javascript example function calls to be added here upon creation to test examples
  initCount = initCount || 0;

  try {
    fullscreenBreakpointExample();
  } catch {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
