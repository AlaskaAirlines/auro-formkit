# auro-combobox

## Properties

| Property                        | Attribute                       | Type          | Default        | Description                                      |
|---------------------------------|---------------------------------|---------------|----------------|--------------------------------------------------|
| `autoPlacement`                 | `autoPlacement`                 | `boolean`     |                | If declared, bib's position will be automatically calculated where to appear. |
| `autocomplete`                  | `autocomplete`                  | `string`      | "false"        | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| `checkmark`                     | `checkmark`                     | `boolean`     |                | When attribute is present auro-menu will apply checkmarks to selected options. |
| `disabled`                      | `disabled`                      | `boolean`     |                | If set, disables the combobox.                   |
| `error`                         | `error`                         | `string`      |                | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `fullscreenBreakpoint`          | `fullscreenBreakpoint`          | `string`      | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `inputmode`                     | `inputmode`                     | `string`      |                | Exposes inputmode attribute for input.           |
| `largeFullscreenHeadline`       | `largeFullscreenHeadline`       | `boolean`     |                | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600 |
| `layout`                        |                                 | `string`      |                |                                                  |
| `matchWidth`                    | `matchWidth`                    | `boolean`     | true           | If declared, the popover and trigger will be set to the same width. |
| `noFilter`                      | `noFilter`                      | `boolean`     |                | If set, combobox will not filter menuoptions based in input. |
| `noFlip`                        | `noFlip`                        | `boolean`     | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                    | `noValidate`                    | `boolean`     |                | If set, disables auto-validation on blur.        |
| `offset`                        | `offset`                        | `number`      | "0"            | Gap between the trigger element and bib.         |
| `onDark`                        | `onDark`                        | `boolean`     |                | If declared, onDark styles will be applied to the trigger. |
| `optionSelected`                | `optionSelected`                | `HTMLElement` |                | Specifies the current selected option.           |
| `placeholder`                   | `placeholder`                   | `string`      |                | Define custom placeholder text, only supported by date input formats. |
| `placement`                     | `placement`                     | `string`      | "bottom-start" | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \| "right" \| "bottom" \| "left" \|<br />"bottom-start" \| "top-start" \| "top-end" \|<br />"right-start" \| "right-end" \| "bottom-end" \|<br />"left-start" \| "left-end" |
| `required`                      | `required`                      | `boolean`     |                | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`      |                | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`      |                | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`      |                | Custom help text message to display when validity = `valueMissing`. |
| `triggerIcon`                   | `triggerIcon`                   | `boolean`     |                | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| `type`                          | `type`                          | `string`      |                | Applies the defined value as the type attribute on auro-input. |
| `validity`                      | `validity`                      | `string`      |                | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `string`      |                | Value selected for the dropdown menu.            |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `focus`    | `(): void`                             | Focuses the combobox trigger input.              |
| `isValid`  | `(): boolean`                          |                                                  |
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>` | Notifies that the component has a new value set. |
| `auroFormElement-validated` |                    | Notifies that the component value(s) have been validated. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| `displayValue`            | Allows custom HTML content to display the selected value when the combobox is not focused. Only works with `snowflake` and `emphasized` layouts. |
| `helpText`                | Defines the content of the helpText.             |
| `label`                   | Defines the content of the label.                |
