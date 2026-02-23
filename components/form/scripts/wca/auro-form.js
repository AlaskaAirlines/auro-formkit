import { AuroForm } from '../../src/auro-form.js';

/**
 * The `auro-form` element provides users a way to create and manage forms in a consistent manner.
 */
class AuroFormWCA extends AuroForm {}

if (!customElements.get("auro-form")) {
  customElements.define("auro-form", AuroFormWCA);
}
