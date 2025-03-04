
import { AuroCounter } from '../../src/auro-counter.js';

class AuroCounterWCA extends AuroCounter {};

if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounterWCA);
}
