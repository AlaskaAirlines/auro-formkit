import { AuroDropdown } from '../../src/auro-dropdown.js';

/**
 * The `auro-dropdown` element provides a way to place content in a bib that can be toggled.
 */
class AuroDropdownWCA extends AuroDropdown {}

if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdownWCA);
}
