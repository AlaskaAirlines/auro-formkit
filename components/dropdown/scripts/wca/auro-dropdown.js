
import { AuroDropdown } from '../../src/auro-dropdown.js';

/**
 * @attr { Boolean } bordered - If declared, applies a border around the trigger slot.
 * @attr { Boolean } common - If declared, the dropdown will be styled with the common theme.
 * @attr { Boolean } chevron - If declared, the dropdown displays an display state chevron on the right.
 * @attr { Boolean } disabled - If declared, the dropdown is not interactive.
 * @attr { Boolean } disableEventShow - If declared, the dropdown will only show by calling the API .show() public method.
 * @attr { Boolean } error - If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both.
 * @attr {Boolean} fluid - Alters the shape of the button to be full width of its parent container
 * @attr { Boolean } matchWidth - If declared, the popover and trigger will be set to the same width.
 * @attr { Boolean } inset - If declared, will apply padding around trigger slot content.
 * @attr { Boolean } rounded - If declared, will apply border-radius to trigger and default slots.
 * @attr { Boolean } hoverToggle - if declared, the trigger will toggle the big on mouseover/mouseout.
 * @attr { Boolean } noToggle - If declared, the trigger will only show the dropdown bib.
 * @attr { Boolean } focusShow - if declared, the bib will display when focus is applied to the trigger.
 * @attr { Boolean } noHideOnThisFocusLoss - If declared, the dropdown will not hide when moving focus outside the element.
 * @attr { String } mobileFullscreenBreakpoint - Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
 * @prop { Boolean } isPopoverVisible - If true, the dropdown bib is displayed.
 * @slot - Default slot for the popover content.
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @slot trigger - Defines the content of the trigger.
 * @csspart trigger - The trigger content container.
 * @csspart chevron - The collapsed/expanded state icon container.
 * @csspart helpText - The helpText content container.
 * @csspart popover - The bib content container.
 * @event auroDropdown-triggerClick - Notifies that the trigger has been clicked.
 * @event auroDropdown-toggled - Notifies that the visibility of the dropdown bib has changed.
 */
class AuroDropdownWCA extends AuroDropdown {}

if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdownWCA);
}
