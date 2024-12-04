
import { AuroMenuOption } from '../../src/auro-menuoption.js';

/**
 * The auro-menu element provides users a way to define a menu option.
 */
class AuroMenuOptionWCA extends AuroMenuOption {}

if (!customElements.get("auro-menuoption")) {
  customElements.define("auro-menuoption", AuroMenuOptionWCA);
}
