import { AuroCounter } from '../../src/auro-counter.js';

/**
 * The `auro-counter` element provides a flexible counter interface with increment and decrement buttons, supporting optional sub-labels and disabled states.
 */
class AuroCounterWCA extends AuroCounter {};

if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounterWCA);
}
