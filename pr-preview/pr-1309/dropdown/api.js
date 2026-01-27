/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers */
import { hideExample } from './../apiExamples/programmatically-hide.js';
import { showExample } from './../apiExamples/programmatically-show.js';
import { inDialogExample } from './../apiExamples/in-dialog.js';
import '../src/registered.js';

export function initExamples(initialCount = 0) {
  try {
    // javascript example function calls to be added here upon creation to test examples
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
