# auro-combobox

The `auro-combobox` element provides users with a way to select an option from a list of filtered or suggested options based on user input.

## Properties

| Property                              | Attribute                             | Modifiers | Type                                             | Default          | Description                                      |
|---------------------------------------|---------------------------------------|-----------|--------------------------------------------------|------------------|--------------------------------------------------|
| `appearance`                          | `appearance`                          |           | `string`                                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`                       | `autoPlacement`                       |           | `boolean`                                        |                  | If declared, bib's position will be automatically calculated where to appear. |
| `autocomplete`                        | `autocomplete`                        |           | `string`                                         |                  | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| `behavior`                            | `behavior`                            |           | `'filter' \| 'suggestion'`                       | "'suggestion'"   | Sets the behavior of the combobox, "filter" or "suggestion".<br />"filter" requires the user to select an option from the menu.<br />"suggestion" allows the user to enter a value not present in the menu options. |
| `checkmark`                           | `checkmark`                           |           | `boolean`                                        |                  | When attribute is present auro-menu will apply check marks to selected options. |
| `disabled`                            | `disabled`                            |           | `boolean`                                        |                  | If set, disables the combobox.                   |
| `dvInputOnly`                         | `dvInputOnly`                         |           | `boolean`                                        |                  | If defined, the display value slot content will only mask the HTML5 input element. The inputs label will not be masked. |
| `error`                               | `error`                               |           | `string`                                         |                  | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `format`                              | `format`                              |           | `string`                                         |                  | Specifies the input mask format.                 |
| `fullscreenBreakpoint`                | `fullscreenBreakpoint`                |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpointat which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `inputValue`                          |                                       | readonly  | `string \| undefined`                            |                  | Returns the current value of the input element within the combobox. |
| `inputmode`                           | `inputmode`                           |           | `string`                                         |                  | Exposes inputmode attribute for input.           |
| `largeFullscreenHeadline`             | `largeFullscreenHeadline`             |           | `boolean`                                        |                  | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600 |
| `layout`                              | `layout`                              |           | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the layout of the combobox.                 |
| `noFilter`                            | `noFilter`                            |           | `boolean`                                        |                  | If set, combobox will not filter menuoptions based on input. |
| `noFlip`                              | `noFlip`                              |           | `boolean`                                        |                  | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                          | `noValidate`                          |           | `boolean`                                        |                  | If set, disables auto-validation on blur.        |
| `offset`                              | `offset`                              |           | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| `onDark`                              | `onDark`                              |           | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| `optionSelected`                      | `optionSelected`                      |           | `HTMLElement`                                    |                  | Specifies the current selected option.           |
| `persistInput`                        | `persistInput`                        |           | `boolean`                                        |                  | If declared, selecting a menu option will not change the input value. By doing so,<br />the current menu filter will be preserved and the user can continue from their last<br />filter state. It is recommended to use this in combination with the `displayValue` slot. |
| `placeholder`                         | `placeholder`                         |           | `string`                                         |                  | Define custom placeholder text, only supported by date input formats. |
| `placement`                           | `placement`                           |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| `required`                            | `required`                            |           | `boolean`                                        |                  | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`                   | `setCustomValidity`                   |           | `string`                                         |                  | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`        | `setCustomValidityCustomError`        |           | `string`                                         |                  | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing`       | `setCustomValidityValueMissing`       |           | `string`                                         |                  | Custom help text message to display when validity = `valueMissing`. |
| `setCustomValidityValueMissingFilter` | `setCustomValidityValueMissingFilter` |           | `string`                                         |                  | Custom help text message to display when validity = `valueMissing` due to the user not choosing a menu option when behavior = "filter". |
| `shift`                               | `shift`                               |           | `boolean`                                        |                  | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| `triggerIcon`                         | `triggerIcon`                         |           | `boolean`                                        |                  | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| `type`                                | `type`                                |           | `string`                                         |                  | Applies the defined value as the type attribute on `auro-input`. |
| `typedValue`                          | `typedValue`                          |           | `string`                                         |                  | Specifies the value of the input element within the combobox. |
| `validity`                            | `validity`                            |           | `string`                                         |                  | Specifies the `validityState` this element is in. |
| `value`                               | `value`                               |           | `string`                                         |                  | Value selected for the dropdown menu.            |

## Methods

| Method               | Type                                   | Description                                      |
|----------------------|----------------------------------------|--------------------------------------------------|
| `clear`              | `(): void`                             | Clears the current value of the combobox.        |
| `focus`              | `(): void`                             | Focuses the combobox trigger input.              |
| `hideBib`            | `(): void`                             | Hides the dropdown bib if its open.              |
| `isValid`            | `(): boolean`                          | Checks if the element is valid.                  |
| `reset`              | `(): void`                             | Resets component to initial state.               |
| `setMenuValue`       | `(value: string): void`                | Sets the menu value if menu is available.<br /><br />**value**: The value to set on the menu. |
| `showBib`            | `(): void`                             | Shows the dropdown bib if there are options to show. |
| `updateActiveOption` | `(index: number): void`                | Updates the active option in the menu.<br /><br />**index**: Index of the option to make active. |
| `validate`           | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>`                               | (Deprecated) Notifies that the component has a new value set. |
| `auroFormElement-validated` |                                                  | Notifies that the component value(s) have been validated. |
| `input`                     | `CustomEvent<{ optionSelected: any; value: any; }>` | Notifies that the component has a new value set. |
| `inputValue`                | `CustomEvent<{ value: string \| undefined; }>`   | Notifies that the components internal HTML5 input value has changed. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `ariaLabel.input.clear`   | Sets aria-label on clear button                  |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| `displayValue`            | Allows custom HTML content to display the selected value when the combobox is not focused. Only works with `snowflake` and `emphasized` layouts. |
| `helpText`                | Defines the content of the helpText.             |
| `label`                   | Defines the content of the label.                |
| `optionalLabel`           | Allows overriding the optional display text "(optional)", which appears next to the label. |
