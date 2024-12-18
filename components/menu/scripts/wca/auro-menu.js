
import { AuroMenu } from '../../src/auro-menu.js';

/**
 * The auro-menu element provides users a way to select from a list of options.
 * @attr {Object} optionSelected - Specifies the current selected menuOption.
 * @attr {String} matchWord - Specifies a string used to highlight matched string parts in options.
 * @attr {Boolean} disabled - When true, the entire menu and all options are disabled;
 * @attr {Boolean} noCheckmark - When true, selected option will not show the checkmark.
 * @attr {Boolean} loading - When true, displays a loading state using the loadingIcon and loadingText slots if provided.
 * @attr {String} value - Value selected for the menu.
 * @prop {Boolean} hasLoadingPlaceholder - Indicates whether the menu has a loadingIcon or loadingText to render when in a loading state.
 * @event auroMenu-selectedOption - Notifies that a new menuoption selection has been made.
 * @event selectedOption - (DEPRECATED) Notifies that a new menuoption selection has been made.
 * @event auroMenu-activatedOption - Notifies that a menuoption has been made `active`.
 * @event auroMenuActivatedOption - (DEPRECATED) Notifies that a menuoption has been made `active`.
 * @event auroMenu-selectValueFailure - Notifies that a an attempt to select a menuoption by matching a value has failed.
 * @event auroMenuSelectValueFailure - (DEPRECATED) Notifies that a an attempt to select a menuoption by matching a value has failed.
 * @event auroMenu-customEventFired - Notifies that a custom event has been fired.
 * @event auroMenuCustomEventFired - (DEPRECATED) Notifies that a custom event has been fired.
 * @event auroMenu-selectValueReset - Notifies that the component value has been reset.
 * @event auroMenu-loadingChange - Notifies when the loading attribute is changed.
 * @slot loadingText - text to show while loading attribute is set
 * @slot loadingIcon - icon to show while loading attribute is set
 * @slot Slot for insertion of menu options.
 */
class AuroMenuWCA extends AuroMenu {}

if (!customElements.get("auro-menu")) {
  customElements.define("auro-menu", AuroMenuWCA);
}
