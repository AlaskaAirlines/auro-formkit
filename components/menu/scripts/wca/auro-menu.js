
import { AuroMenu } from '../../src/auro-menu.js';

/**
 * The auro-menu element provides users a way to select from a list of options.
 */
class AuroMenuWCA extends AuroMenu {}

if (!customElements.get("auro-menu")) {
  customElements.define("auro-menu", AuroMenuWCA);
}
