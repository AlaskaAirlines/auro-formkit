# auro-dropdown

## Attributes

| Attribute          | Type        | Description                                      |
|--------------------|-------------|--------------------------------------------------|
| `disableEventShow` | ` Boolean ` | If declared, the dropdown will only show by calling the API .show() public method. |

## Properties

| Property                | Attribute               | Modifiers | Type                                             | Default        | Description                                      |
|-------------------------|-------------------------|-----------|--------------------------------------------------|----------------|--------------------------------------------------|
| `a11yAutocomplete`      |                         |           | `string`                                         |                | The value for the aria-autocomplete attribute of the trigger element. |
| `a11yRole`              |                         |           |                                                  |                | The value for the role attribute of the trigger element. |
| `autoPlacement`         | `autoPlacement`         |           | `boolean`                                        | "false"        | If declared, bib's position will be automatically calculated where to appear. |
| `bordered`              | `bordered`              |           | ` Boolean `                                      |                | If declared, applies a border around the trigger slot. |
| `chevron`               | `chevron`               |           | ` Boolean `                                      |                | If declared, the dropdown displays a chevron on the right. |
| `common`                | `common`                |           | ` Boolean `                                      |                | If declared, the dropdown will be styled with the common theme. |
| `commonLabelClasses`    |                         | readonly  | `object`                                         |                |                                                  |
| `commonWrapperClasses`  |                         | readonly  | `{ trigger: boolean; wrapper: boolean; hasFocus: boolean \| undefined; }` |                |                                                  |
| `disabled`              | `disabled`              |           | ` Boolean `                                      |                | If declared, the dropdown is not interactive.    |
| `error`                 | `error`                 |           | ` Boolean `                                      |                | If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both. |
| `errorMessage`          | `errorMessage`          |           | `string`                                         | ""             | Contains the help text message for the current validity error. |
| `fluid`                 | `fluid`                 |           | `Boolean`                                        |                | Makes the trigger to be full width of its parent container. |
| `focusShow`             | `focusShow`             |           | ` Boolean `                                      |                | If declared, the bib will display when focus is applied to the trigger. |
| `fullscreenBreakpoint`  | `fullscreenBreakpoint`  |           | ` String `                                       |                | Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. |
| `hoverToggle`           | `hoverToggle`           |           | ` Boolean `                                      |                | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| `inset`                 | `inset`                 |           | ` Boolean `                                      |                | If declared, will apply padding around trigger slot content. |
| `isBibFullscreen`       | `isBibFullscreen`       |           | `boolean`                                        | false          | If true, the dropdown bib is taking the fullscreen when it's open. |
| `isPopoverVisible`      | `isPopoverVisible`      |           | ` Boolean `                                      | false          | If true, the dropdown bib is displayed.          |
| `layout`                |                         |           | `string`                                         | "default"      |                                                  |
| `matchWidth`            | `matchWidth`            |           | ` Boolean `                                      | false          | If declared, the popover and trigger will be set to the same width. |
| `noFlip`                | `noFlip`                |           | `boolean`                                        | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noHideOnThisFocusLoss` | `noHideOnThisFocusLoss` |           | ` Boolean `                                      | false          | If declared, the dropdown will not hide when moving focus outside the element. |
| `noToggle`              | `noToggle`              |           | ` Boolean `                                      |                | If declared, the trigger will only show the dropdown bib. |
| `offset`                | `offset`                |           | `number`                                         | "0"            | Gap between the trigger element and bib.         |
| `onDark`                | `onDark`                |           | `boolean`                                        |                | If declared, onDark styles will be applied.      |
| `onSlotChange`          | `onSlotChange`          |           |                                                  |                |                                                  |
| `placement`             | `placement`             |           | `string`                                         | "bottom-start" | Position where the bib should appear relative to the trigger. |
| `rounded`               | `rounded`               |           | ` Boolean `                                      |                | If declared, will apply border-radius to trigger and default slots. |
| `shape`                 |                         |           | `string`                                         | "rounded"      |                                                  |
| `size`                  |                         |           | `string`                                         | "xl"           |                                                  |

## Methods

| Method                | Type                                  | Description                                      |
|-----------------------|---------------------------------------|--------------------------------------------------|
| `exposeCssParts`      | `(): void`                            | Exposes CSS parts for styling from parent components. |
| `getLayout`           | `(ForcedLayout: any): TemplateResult` |                                                  |
| `getLayoutClassic`    | `(): TemplateResult`                  |                                                  |
| `getLayoutEmphasized` | `(): TemplateResult`                  |                                                  |
| `hide`                | `(): void`                            | Public method to hide the dropdown.              |
| `show`                | `(): void`                            | Public method to show the dropdown.              |

## Events

| Event                       | Type                                 | Description                                      |
|-----------------------------|--------------------------------------|--------------------------------------------------|
| `auroDropdown-idAdded`      | `Object<key  : 'id', value: string>` | Notifies consumers that the unique ID for the dropdown bib has been generated. |
| `auroDropdown-toggled`      |                                      | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` |                                      | Notifies that the trigger has been clicked.      |

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
