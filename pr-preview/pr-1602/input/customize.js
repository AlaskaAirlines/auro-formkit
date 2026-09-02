import { AuroInput } from '../src/auro-input.js';
import { customError } from "../apiExamples/error";
import { setReadonlyValue } from "../apiExamples/readonly";
import { swapInputValues } from "../apiExamples/swap-value";

AuroInput.register();
AuroInput.register('custom-input');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    customError();
    setReadonlyValue();
    swapInputValues();
  } catch (error) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}
