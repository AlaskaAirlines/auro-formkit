/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers */
import '../src/registered.js';
// import { dropdownCounterExample } from "../apiExamples/dropdown-mobile-properties.js";
import { eventCounterExample } from "../apiExamples/events.js";
import { inDialogExample } from "../apiExamples/in-dialog.js";
import { inDrawerExample } from "../apiExamples/in-drawer.js";

export function initExamples(initialCount = 0) {
  try {
    // javascript example function calls to be added here upon creation to test examples
    // dropdownCounterExample();
    eventCounterExample();
    inDialogExample();
    inDrawerExample();

  } catch (err) {
    if (initialCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initialCount + 1);
      }, 100);
    }
  }
}
