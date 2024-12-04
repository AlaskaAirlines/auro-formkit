
import { AuroRadio } from '../../src/auro-radio.js';

/**
 */
class AuroRadioWCA extends AuroRadio {}

if (!customElements.get("auro-radio")) {
  customElements.define("auro-radio", AuroRadioWCA);
}
