
import { AuroCounterGroup } from '../../src/auro-counter-group.js';

class AuroCounterGroupWCA extends AuroCounterGroup {};

if (!customElements.get("auro-counter-group")) {
  customElements.define("auro-counter-group", AuroCounterGroupWCA);
}
