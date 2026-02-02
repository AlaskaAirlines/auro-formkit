# auro-dropdown

The `auro-dropdown` element provides a way to place content in a bib that can be toggled.

## Properties

| Property                | Attribute               | Type                                             | Default          | Description                                      |
|-------------------------|-------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `a11yRole`              |                         |                                                  |                  | The value for the role attribute of the trigger element. |
| `appearance`            | `appearance`            | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`         | `autoPlacement`         | `boolean`                                        |                  | If declared, bib's position will be automatically calculated where to appear. |
| `chevron`               | `chevron`               | `boolean`                                        |                  | If declared, the dropdown displays a chevron on the right. |
| `disableEventShow`      | `disableEventShow`      | `boolean`                                        |                  | If declared, the dropdown will only show by calling the API .show() public method. |
| `disableFocusTrap`      | `disableFocusTrap`      | `boolean`                                        |                  | If declared, the focus trap inside of bib will be turned off. |
| `disabled`              | `disabled`              | `boolean`                                        |                  | If declared, the dropdown is not interactive.    |
| `error`                 | `error`                 | `boolean`                                        |                  | If declared, will apply error UI to the dropdown. |
| `errorMessage`          | `errorMessage`          | `string`                                         | "undefined"      | Contains the help text message for the current validity error. |
| `focusShow`             | `focusShow`             | `boolean`                                        |                  | If declared, the bib will display when focus is applied to the trigger. |
| `fullscreenBreakpoint`  | `fullscreenBreakpoint`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `hoverToggle`           | `hoverToggle`           | `boolean`                                        |                  | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| `isBibFullscreen`       | `isBibFullscreen`       | `boolean`                                        | false            | If true, the dropdown bib is taking the fullscreen when it's open. |
| `isPopoverVisible`      | `open`                  | `boolean`                                        | false            | If true, the dropdown bib is displayed.          |
| `layout`                | `layout`                | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the layout of the dropdown.                 |
| `matchWidth`            | `matchWidth`            | `boolean`                                        | false            | If declared, the popover and trigger will be set to the same width. |
| `noFlip`                | `noFlip`                | `boolean`                                        |                  | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noHideOnThisFocusLoss` | `noHideOnThisFocusLoss` | `boolean`                                        | false            | If declared, the dropdown will not hide when moving focus outside the element. |
| `noToggle`              | `noToggle`              | `boolean`                                        |                  | If declared, the trigger will only show the dropdown bib. |
| `offset`                | `offset`                | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| `onDark`                | `onDark`                | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| `onSlotChange`          | `onSlotChange`          |                                                  |                  | If declared, and a function is set, that function will execute when the slot content is updated. |
| `placement`             | `placement`             | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| `shape`                 |                         |                                                  | "undefined"      |                                                  |
| `shift`                 | `shift`                 | `boolean`                                        |                  | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| `simple`                | `simple`                | `boolean`                                        |                  | If declared, applies a border around the trigger slot. |
| `size`                  |                         |                                                  | "undefined"      |                                                  |

## Methods

| Method           | Type       | Description                                      |
|------------------|------------|--------------------------------------------------|
| `exposeCssParts` | `(): void` | Exposes CSS parts for styling from parent components. |
| `focus`          | `(): void` | When bib is open, focus on the first element inside of bib.<br />If not, trigger element will get focus. |
| `hide`           | `(): void` | Public method to hide the dropdown.              |
| `show`           | `(): void` | Public method to show the dropdown.              |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroDropdown-idAdded`      | `Object<key  : 'id', value: string>`             | Notifies consumers that the unique ID for the dropdown bib has been generated. |
| `auroDropdown-ready`        | `Object<key  : 'dropdown', value: AuroDropdown>` | Notifies that the dropdown is fully initialized and ready for external modification. |
| `auroDropdown-toggled`      |                                                  | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` | `CustomEvent<any>`                               | Notifies that the trigger has been clicked.      |

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
| `size`     | The size of the dropdown bib. (height, width, maxHeight, maxWidth only) |
| `trigger`  | The trigger content container.                   |
