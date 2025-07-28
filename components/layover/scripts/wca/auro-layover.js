
import { AuroLayover } from '../../src/auro-layover.js';

/**
 * The auro-layover element provides users a way to display additional information on demand.
 */
class AuroLayoverWCA extends AuroLayover {}

if (!customElements.get("auro-layover")) {
  customElements.define("auro-layover", AuroLayoverWCA);
}
