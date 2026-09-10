# auro-dropdown

The `auro-dropdown` element provides a way to place content in a bib that can be toggled.

## Properties

| Property                  | Attribute                 | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `a11yRole`                |                           | `string`                                         |                  | The value for the role attribute of the trigger element. |
| `appearance`              | `appearance`              | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`           | `autoplacement`           | `boolean`                                        |                  | If declared, bib's position will be automatically calculated where to appear. |
| `chevron`                 | `chevron`                 | `boolean`                                        |                  | If declared, the dropdown displays a chevron on the right. |
| `desktopModal`            | `desktopmodal`            | `boolean`                                        |                  | If declared, the dropdown will behave as a modal dialog when in a desktop viewport size. |
| `disableEventShow`        | `disableeventshow`        | `boolean`                                        |                  | If declared, the dropdown will only show by calling the API .show() public method. |
| `disableKeyboardHandling` | `disablekeyboardhandling` | `boolean`                                        |                  | If declared, the dropdown will not handle keyboard events and will require the consumer to manage this behavior. |
| `disabled`                | `disabled`                | `boolean`                                        |                  | If declared, the dropdown is not interactive.    |
| `dropdownWidth`           | `dropdownwidth`           | `number`                                         |                  | Sets the width of the dropdown bib in pixels.    |
| `error`                   | `error`                   | `boolean`                                        |                  | If declared, will apply error UI to the dropdown. |
| `errorMessage`            | `errormessage`            | `string`                                         | "undefined"      | Contains the help text message for the current validity error. |
| `focusShow`               | `focusshow`               | `boolean`                                        |                  | If declared, the bib will display when focus is applied to the trigger. |
| `fullscreenBreakpoint`    | `fullscreenbreakpoint`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `hoverToggle`             | `hovertoggle`             | `boolean`                                        |                  | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| `isBibFullscreen`         | `isbibfullscreen`         | `boolean`                                        | false            | If true, the dropdown bib is taking the fullscreen when it's open. |
| `isPopoverVisible`        | `open`                    | `boolean`                                        | false            | If true, the dropdown bib is displayed.          |
| `layout`                  | `layout`                  | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the layout of the dropdown.                 |
| `matchWidth`              | `matchwidth`              | `boolean`                                        | false            | If declared, the popover and trigger will be set to the same width. |
| `noFlip`                  | `noflip`                  | `boolean`                                        |                  | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noHideOnThisFocusLoss`   | `nohideonthisfocusloss`   | `boolean`                                        | false            | If declared, the dropdown will not hide when moving focus outside the element. |
| `noToggle`                | `notoggle`                | `boolean`                                        |                  | If declared, the trigger will only show the dropdown bib. |
| `offset`                  | `offset`                  | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| `onDark`                  | `ondark`                  | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| `onSlotChange`            |                           | `() => void`                                     |                  | If declared, and a function is set, that function will execute when the slot content is updated. |
| `placement`               | `placement`               | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| `shape`                   | `shape`                   | `'box' \| 'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'rounded' \| 'snowflake'` | "undefined"      | Sets the shape of the dropdown.                  |
| `shift`                   | `shift`                   | `boolean`                                        |                  | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| `simple`                  | `simple`                  | `boolean`                                        |                  | If declared, applies a border around the trigger slot. |
| `size`                    | `size`                    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | "undefined"      | Sets the size of the dropdown.                   |
| `tabIndex`                | `tabindex`                | `number`                                         |                  | Sets the tabindex applied to the dropdown trigger for keyboard focus order. |

## Methods

| Method           | Type       | Description                                      |
|------------------|------------|--------------------------------------------------|
| `exposeCssParts` | `(): void` | Exposes CSS parts for styling from parent components. |
| `focus`          | `(): void` | When bib is open, focus on the first element inside of bib.<br />If not, trigger element will get focus. |
| `hide`           | `(): void` | Public method to hide the dropdown.              |
| `show`           | `(): void` | Public method to show the dropdown.              |

## Events

| Event                       | Type                          | Description                                      |
|-----------------------------|-------------------------------|--------------------------------------------------|
| `auroDropdown-idAdded`      | `CustomEvent<{ id: string }>` | Notifies consumers that the unique ID for the dropdown bib has been generated. |
| `auroDropdown-toggled`      |                               | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` | `CustomEvent<any>`            | Notifies that the trigger has been clicked.      |

## Slots

| Name       | Description                                |
|------------|--------------------------------------------|
|            | Default slot for the dropdown bib content. |
| `helpText` | Defines the content of the helpText.       |
| `trigger`  | Defines the content of the trigger.        |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `chevron`  | The collapsed/expanded state icon container.     |
| `helpText` | The helpText content container.                  |
| `size`     | The size of the dropdown bib. (height, width, maxHeight, maxWidth only) |
| `trigger`  | The trigger content container.                   |
| `wrapper`  | The trigger wrapper element surrounding the trigger content and chevron. |
