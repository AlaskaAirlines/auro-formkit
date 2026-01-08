
import { AuroRadio } from '../../src/auro-radio.js';

/**
 * The `auro-radio` element is used to a button that allows the user to select one option from a set.
 */
class AuroRadioWCA extends AuroRadio {}

if (!customElements.get("auro-radio")) {
  customElements.define("auro-radio", AuroRadioWCA);
}
