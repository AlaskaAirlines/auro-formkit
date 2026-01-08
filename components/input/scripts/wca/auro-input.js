import { AuroInput } from '../../src/auro-input.js';

/**
 * The `auro-input` element provides users a way to enter data into a text field.
 */
class AuroInputWCA extends AuroInput {}

if (!customElements.get("auro-input")) {
  customElements.define("auro-input", AuroInputWCA);
}
