
import { AuroRadioGroup } from '../../src/auro-radio-group.js';

/**
 * The `auro-radio-group` element is used to group a set `auro-radio` elements.
 */
class AuroRadioGroupWCA extends AuroRadioGroup {}

if (!customElements.get("auro-radio-group")) {
  customElements.define("auro-radio-group", AuroRadioGroupWCA);
}
