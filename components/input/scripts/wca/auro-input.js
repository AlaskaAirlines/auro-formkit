
import { AuroInput } from '../../src/auro-input.js';

/**
     * Generate unique names for dependency components.
     */
class AuroInputWCA extends AuroInput {}

if (!customElements.get("auro-input")) {
  customElements.define("auro-input", AuroInputWCA);
}
