# auro-dropdown

## Attributes

| Attribute          | Type        | Description                                      |
|--------------------|-------------|--------------------------------------------------|
| `disableEventShow` | ` Boolean ` | If declared, the dropdown will only show by calling the API .show() public method. |

## Properties

| Property                     | Attribute                    | Type        | Default | Description                                      |
|------------------------------|------------------------------|-------------|---------|--------------------------------------------------|
| `bordered`                   | `bordered`                   | ` Boolean ` |         | If declared, applies a border around the trigger slot. |
| `chevron`                    | `chevron`                    | ` Boolean ` |         | If declared, the dropdown displays an display state chevron on the right. |
| `common`                     | `common`                     | ` Boolean ` |         | If declared, the dropdown will be styled with the common theme. |
| `disabled`                   | `disabled`                   | ` Boolean ` |         | If declared, the dropdown is not interactive.    |
| `error`                      | `error`                      | ` Boolean ` |         | If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both. |
| `focusShow`                  | `focusShow`                  | ` Boolean ` |         | if declared, the the bib will display when focus is applied to the trigger. |
| `hoverToggle`                | `hoverToggle`                | ` Boolean ` |         | if declared, the trigger will toggle the big on mouseover/mouseout. |
| `inset`                      | `inset`                      | ` Boolean ` |         | If declared, will apply padding around trigger slot content. |
| `isPopoverVisible`           | `isPopoverVisible`           | ` Boolean ` | false   | If true, the dropdown bib is displayed.          |
| `matchWidth`                 | `matchWidth`                 | ` Boolean ` | false   | If declared, the popover and trigger will be set to the same width. |
| `mobileFullscreenBreakpoint` | `mobileFullscreenBreakpoint` | ` String `  |         | Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. |
| `noHideOnThisFocusLoss`      | `noHideOnThisFocusLoss`      | ` Boolean ` | false   | If declared, the dropdown will not hide when moving focus outside the element. |
| `noToggle`                   | `noToggle`                   | ` Boolean ` |         | If declared, the trigger will only show the the dropdown bib. |
| `onSlotChange`               | `onSlotChange`               |             |         |                                                  |
| `rounded`                    | `rounded`                    | ` Boolean ` |         | If declared, will apply border-radius to trigger and default slots. |

## Methods

| Method              | Type                   | Description                                      |
|---------------------|------------------------|--------------------------------------------------|
| `handleDefaultSlot` | `(event: Event): void` | Handles the default slot change event and updates the content.<br /><br />This method retrieves all nodes assigned to the default slot of the event target and appends them<br />to the `bibContent` element. If a callback function `onSlotChange` is defined, it is invoked to<br />notify about the slot change.<br /><br />**event**: The event object representing the slot change. |
| `hide`              | `(): void`             | Public method to hide the dropdown.              |
| `show`              | `(): void`             | Public method to show the dropdown.              |

## Events

| Event                       | Description                                      |
|-----------------------------|--------------------------------------------------|
| `auroDropdown-toggled`      | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` | Notifies that the trigger has been clicked.      |

## Slots

| Name       | Description                           |
|------------|---------------------------------------|
|            | Default slot for the popover content. |
| `helpText` | Defines the content of the helpText.  |
| `label`    | Defines the content of the label.     |
| `trigger`  | Defines the content of the trigger.   |

## CSS Shadow Parts

| Part       | Description                                  |
|------------|----------------------------------------------|
| `chevron`  | The collapsed/expanded state icon container. |
| `helpText` | The helpText content container.              |
| `popover`  | The bib content container.                   |
| `trigger`  | The trigger content container.               |
