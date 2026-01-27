import { AuroCheckbox } from '../../src/auro-checkbox.js';

/**
 * The `auro-checkbox` element is for the purpose of allowing users to select one or more options of a limited number of choices.
 */
class AuroCheckboxWCA extends AuroCheckbox {}

if (!customElements.get("auro-checkbox")) {
  customElements.define("auro-checkbox", AuroCheckboxWCA);
}
