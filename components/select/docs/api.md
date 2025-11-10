# auro-select

The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property                        | Attribute                       | Type                              | Default        | Description                                      |
|---------------------------------|---------------------------------|-----------------------------------|----------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    | `string`                          | "'default'"    | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`                 | `autoPlacement`                 | `boolean`                         | "false"        | If declared, bib's position will be automatically calculated where to appear. |
| `autocomplete`                  | `autocomplete`                  | `string`                          |                | If declared, sets the autocomplete attribute for the select element. |
| `disabled`                      | `disabled`                      | `boolean`                         |                | When attribute is present, element shows disabled state. |
| `error`                         | `error`                         | `string`                          |                | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `fluid`                         | `fluid`                         | `boolean`                         |                | When attribute is present, element will be 100% width of container element. |
| `forceDisplayValue`             | `forceDisplayValue`             | `boolean`                         | false          | If declared, the label and value will be visually hidden and the displayValue will render 100% of the time. |
| `fullscreenBreakpoint`          | `fullscreenBreakpoint`          | `string`                          | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `largeFullscreenHeadline`       | `largeFullscreenHeadline`       | `boolean`                         |                | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| `layout`                        |                                 | `string`                          |                |                                                  |
| `matchWidth`                    | `matchWidth`                    | `boolean`                         | false          | If declared, the popover and trigger will be set to the same width. |
| `multiSelect`                   | `multiselect`                   | `boolean`                         |                | Sets multi-select mode, allowing multiple options to be selected at once. |
| `name`                          | `name`                          | `string`                          |                | The name for the select element.                 |
| `noCheckmark`                   | `noCheckmark`                   | `boolean`                         |                | When true, checkmark on selected option will no longer be present. |
| `noFlip`                        | `noFlip`                        | `boolean`                         | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                    | `noValidate`                    | `boolean`                         |                | If set, disables auto-validation on blur.        |
| `offset`                        | `offset`                        | `number`                          | "0"            | Gap between the trigger element and bib.         |
| `onDark`                        | `onDark`                        | `boolean`                         |                | DEPRECATED - use `appearance` instead.           |
| `optionSelected`                | `optionSelected`                | `HTMLElement\|Array<HTMLElement>` |                | Specifies the current selected menuOption. Default type is `HTMLElement`, changing to `Array<HTMLElement>` when `multiSelect` is true. |
| `placeholder`                   | `placeholder`                   | `string`                          |                | Define custom placeholder text.                  |
| `placement`                     | `placement`                     | `string`                          | "bottom-start" | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \| "right" \| "bottom" \| "left" \|<br />"bottom-start" \| "top-start" \| "top-end" \|<br />"right-start" \| "right-end" \| "bottom-end" \|<br />"left-start" \| "left-end". |
| `required`                      | `required`                      | `boolean`                         |                | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`                          |                | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`                          |                | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`                          |                | Custom help text message to display when validity = `valueMissing`. |
| `shift`                         | `shift`                         | `boolean`                         | "false"        | If set, the dropdown will shift its position to avoid being cut off by the viewport. |
| `validity`                      | `validity`                      | `string`                          |                | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `string`                          |                | Value selected for the component.                |

## Methods

| Method         | Type                                   | Description                                      |
|----------------|----------------------------------------|--------------------------------------------------|
| `hideBib`      | `(): void`                             | Hides the dropdown bib if its open.              |
| `reset`        | `(): void`                             | Resets component to initial state.               |
| `setMenuValue` | `(value: any): void`                   |                                                  |
| `showBib`      | `(): void`                             | Shows the dropdown bib if there are options to show. |
| `validate`     | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroFormElement-validated` |                                                  | Notifies that the `validity` and `errorMessage` values have changed. |
| `auroSelect-valueSet`       | `CustomEvent<any>`                               | Notifies that the component has a new value set. |
| `input`                     | `CustomEvent<{ optionSelected: any; value: any; }>` | Notifies every time the value prop of the element is changed. The updated `value` and `optionSelected` will be delivered in `detail` object. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| `displayValue`            | Allows custom HTML content to display the selected value when select is not focused. |
| `helpText`                | Defines the content of the helpText.             |
| `label`                   | Defines the content of the label.                |
| `optionalLabel`           | Allows overriding the optional display text "(optional)", which appears next to the label. |
| `valueText`               | Dropdown value text display.                     |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| `dropdownChevron` | Apply CSS to the collapsed/expanded state icon container. |
| `dropdownSize`    | Apply size styles to the dropdown bib. (height, width, maxHeight, maxWidth only) |
| `dropdownTrigger` | Apply CSS to the trigger content container.      |
| `helpText`        | Apply CSS to the help text.                      |
