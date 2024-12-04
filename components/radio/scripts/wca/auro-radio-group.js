
import { AuroRadioGroup } from '../../src/auro-radio-group.js';

/**
 */
class AuroRadioGroupWCA extends AuroRadioGroup {}

if (!customElements.get("auro-radio-group")) {
  customElements.define("auro-radio-group", AuroRadioGroupWCA);
}
