
import { AuroForm } from '../../src/auro-form.js';

/**
 * The auro-form element provides users a way to ... (it would be great if you fill this out).
 */
class AuroFormWCA extends AuroForm {}

if (!customElements.get("auro-form")) {
  customElements.define("auro-form", AuroFormWCA);
}
