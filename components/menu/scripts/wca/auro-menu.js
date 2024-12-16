
import { AuroMenu } from '../../src/auro-menu.js';

/**
 * The auro-menu element provides users a way to select from a list of options.
 * @attr {Object} optionSelected - Specifies the current selected menuOption.
 * @attr {String} matchWord - Specifies the a string used to highlight matched string parts in options.
 * @attr {Boolean} disabled - When true, the entire menu and all options are disabled;
 * @attr {Boolean} noCheckmark - When true, selected option will not show the checkmark.
 * @attr {Boolean} loading - When true, loading slot will be showing
 * @attr {String} value - Value selected for the menu.
 * @event auroMenu-selectedOption - Notifies that a new menuoption selection has been made.
 * @event selectedOption - (DEPRECATED) Notifies that a new menuoption selection has been made.
 * @event auroMenu-activatedOption - Notifies that a menuoption has been made `active`.
 * @event auroMenuActivatedOption - (DEPRECATED) Notifies that a menuoption has been made `active`.
 * @event auroMenu-selectValueFailure - Notifies that a an attempt to select a menuoption by matching a value has failed.
 * @event auroMenuSelectValueFailure - (DEPRECATED) Notifies that a an attempt to select a menuoption by matching a value has failed.
 * @event auroMenu-customEventFired - Notifies that a custom event has been fired.
 * @event auroMenuCustomEventFired - (DEPRECATED) Notifies that a custom event has been fired.
 * @event auroMenu-selectValueReset - Notifies that the component value has been reset.
 * @slot Slot for insertion of menu options.
 */
class AuroMenuWCA extends AuroMenu {}

if (!customElements.get("auro-menu")) {
  customElements.define("auro-menu", AuroMenuWCA);
}
