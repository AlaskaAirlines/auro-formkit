
import { AuroCheckboxGroup } from '../../src/auro-checkbox-group.js';

/**
 * The auro-checkbox-group element is a wrapper for auro-checkbox element.
 */
class AuroCheckboxGroupWCA extends AuroCheckboxGroup {}

if (!customElements.get("auro-checkbox-group")) {
  customElements.define("auro-checkbox-group", AuroCheckboxGroupWCA);
}
