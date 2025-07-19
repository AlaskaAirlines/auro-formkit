
import { AuroPopover } from '../../src/auro-popover.js';

/**
 * The auro-popover element provides users a way to display additional information on demand.
 */
class AuroPopoverWCA extends AuroPopover {}

if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopoverWCA);
}
