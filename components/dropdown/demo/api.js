/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers */
import { errorExample } from '../apiExamples/error';
import { inverseErrorExample } from '../apiExamples/appearance-inverse-error';
import { fullscreenBreakpointExample } from '../apiExamples/fullscreen-breakpoint';
import { classicExample } from '../apiExamples/classic/basic.js';
import { classicInverseExample } from '../apiExamples/classic/appearance-inverse.js';
import { matchWidthExample } from '../apiExamples/match-width.js';
import { hideExample } from './../apiExamples/programmatically-hide';
import { showExample } from './../apiExamples/programmatically-show';
import { inDialogExample } from './../apiExamples/in-dialog';
import '../src/registered.js';

export function initExamples(initialCount = 0) {
  try {
    // javascript example function calls to be added here upon creation to test examples
    errorExample();
    inverseErrorExample();
    fullscreenBreakpointExample();
    classicExample();
    classicInverseExample();
    matchWidthExample();
    hideExample();
    showExample();
    inDialogExample();
  } catch (err) {
    if (initialCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initialCount + 1);
      }, 100);
    }
  }
}
