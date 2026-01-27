
import { AuroCounterGroup } from '../../src/auro-counter-group.js';

/**
 * The `auro-counter-group` element provides a flexible interface for grouping multiple counters, supporting validation, custom validity messages, and disabled states based on the group's value.
 */
class AuroCounterGroupWCA extends AuroCounterGroup {};

if (!customElements.get("auro-counter-group")) {
  customElements.define("auro-counter-group", AuroCounterGroupWCA);
}
