/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers */
import { showExample } from './../apiExamples/programmaticallyShow.js';
import { hideExample } from './../apiExamples/programmaticallyHide.js';
import '../src/index.js';

export function initExamples(initialCount = 0) {
  try {
    // javascript example function calls to be added here upon creation to test examples
    showExample();
    hideExample();
  } catch (err) {
    if (initialCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initialCount + 1);
      }, 100);
    }
  }
}
