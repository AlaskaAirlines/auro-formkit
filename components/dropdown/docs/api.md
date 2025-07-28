# auro-dropdown

## Properties

| Property                | Attribute               | Type        | Default        | Description                                      |
|-------------------------|-------------------------|-------------|----------------|--------------------------------------------------|
| `a11yRole`              |                         |             |                | The value for the role attribute of the trigger element. |
| `autoPlacement`         | `autoPlacement`         | `boolean`   | "false"        | If declared, bib's position will be automatically calculated where to appear. |
| `chevron`               | `chevron`               | ` Boolean ` |                | If declared, the dropdown displays a chevron on the right. |
| `disableEventShow`      | `disableEventShow`      | ` Boolean ` | "false"        | If declared, the dropdown will only show by calling the API .show() public method. |
| `disableFocusTrap`      | `disableFocusTrap`      | `boolean`   |                | If declared, the focus trap inside of bib will be turned off. |
| `disabled`              | `disabled`              | ` Boolean ` |                | If declared, the dropdown is not interactive.    |
| `error`                 | `error`                 | ` Boolean ` |                | If declared in combination with not using the `simple` property or `helpText` slot content, will apply red color to both. |
| `errorMessage`          | `errorMessage`          | `string`    | "undefined"    | Contains the help text message for the current validity error. |
| `focusShow`             | `focusShow`             | ` Boolean ` |                | If declared, the bib will display when focus is applied to the trigger. |
| `fullscreenBreakpoint`  | `fullscreenBreakpoint`  | ` String `  | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `hoverToggle`           | `hoverToggle`           | ` Boolean ` |                | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| `isBibFullscreen`       | `isBibFullscreen`       | `boolean`   | false          | If true, the dropdown bib is taking the fullscreen when it's open. |
| `isPopoverVisible`      | `open`                  | ` Boolean ` | false          | If true, the dropdown bib is displayed.          |
| `layout`                |                         |             | "undefined"    |                                                  |
| `matchWidth`            | `matchWidth`            | ` Boolean ` | false          | If declared, the popover and trigger will be set to the same width. |
| `noFlip`                | `noFlip`                | `boolean`   | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noHideOnThisFocusLoss` | `noHideOnThisFocusLoss` | ` Boolean ` | false          | If declared, the dropdown will not hide when moving focus outside the element. |
| `noToggle`              | `noToggle`              | ` Boolean ` |                | If declared, the trigger will only show the dropdown bib. |
| `offset`                | `offset`                | `number`    | "0"            | Gap between the trigger element and bib.         |
| `onDark`                | `onDark`                | `boolean`   |                | If declared, onDark styles will be applied.      |
| `onSlotChange`          | `onSlotChange`          |             |                | If declared, and a function is set, that function will execute when the slot content is updated. |
| `placement`             | `placement`             | `string`    | "bottom-start" | Position where the bib should appear relative to the trigger. |
| `shape`                 |                         |             | "undefined"    |                                                  |
| `simple`                | `simple`                | `boolean`   |                | If declared, applies a border around the trigger slot. |
| `size`                  |                         |             | "undefined"    |                                                  |

## Methods

| Method           | Type       | Description                                      |
|------------------|------------|--------------------------------------------------|
| `exposeCssParts` | `(): void` | Exposes CSS parts for styling from parent components. |
| `hide`           | `(): void` | Public method to hide the dropdown.              |
| `show`           | `(): void` | Public method to show the dropdown.              |
| `toggle`         | `(): void` | Public method to toggle the dropdown.            |

## Events

| Event                          | Type                                  | Description                                      |
|--------------------------------|---------------------------------------|--------------------------------------------------|
| `auroDropdown-strategy-change` | `CustomEvent<any>`                    |                                                  |
| `auroDropdown-toggled`         | `CustomEvent<{ expanded: boolean; }>` | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick`    |                                       | Notifies that the trigger has been clicked.      |

## Slots

| Name       | Description                           |
|------------|---------------------------------------|
|            | Default slot for the popover content. |
| `helpText` | Defines the content of the helpText.  |
| `trigger`  | Defines the content of the trigger.   |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `chevron`  | The collapsed/expanded state icon container.     |
| `helpText` | The helpText content container.                  |
| `popover`  | The bib content container.                       |
| `size`     | The size of the dropdown bib. (height, width, maxHeight, maxWidth only) |
| `trigger`  | The trigger content container.                   |
