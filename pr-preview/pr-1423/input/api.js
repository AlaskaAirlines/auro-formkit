import { customError } from "../apiExamples/error";
import { customErrorOnDark } from "../apiExamples/appearance-inverse-error";
import { setReadonlyValue } from "../apiExamples/readonly";
import { programmaticallySetValue } from "../apiExamples/value";
import { resetStateExample } from "../apiExamples/reset-state";
import { swapInputValues } from "../apiExamples/swap-value";
import './index.js';

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    customError();
    customErrorOnDark();
    setReadonlyValue();
    swapInputValues();
    programmaticallySetValue();
    resetStateExample();
  } catch (error) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
