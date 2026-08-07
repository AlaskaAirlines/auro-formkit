import { AuroInput } from '../src/auro-input.js';
import { customError } from "../apiExamples/error";
import { setReadonlyValue } from "../apiExamples/readonly";
import { resetStateExample } from "../apiExamples/reset-state";
import { swapInputValues } from "../apiExamples/swap-value";

AuroInput.register();
AuroInput.register('custom-input');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    customError();
    setReadonlyValue();
    swapInputValues();
    resetStateExample();
  } catch (error) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
