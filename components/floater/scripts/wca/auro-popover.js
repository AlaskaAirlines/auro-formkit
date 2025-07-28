
import { AuroFloater } from '../../src/auro-floater.js';

/**
 * The auro-floater element provides users a way to display additional information on demand.
 */
class AuroFloaterWCA extends AuroFloater {}

if (!customElements.get("auro-floater")) {
  customElements.define("auro-floater", AuroFloaterWCA);
}
