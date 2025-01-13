# auro-combobox

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| `checkmark`                     | `checkmark`                     | `Boolean` |             | When attribute is present auro-menu will apply checkmarks to selected options. |
| `disabled`                      | `disabled`                      | `Boolean` |             | If set, disables the combobox.                   |
| `error`                         | `error`                         | `String`  |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `noFilter`                      | `noFilter`                      | `Boolean` | false       | If set, combobox will not filter menuoptions based in input. |
| `noValidate`                    | `noValidate`                    | `Boolean` |             | If set, disables auto-validation on blur.        |
| `optionSelected`                | `optionSelected`                | `Object`  | "undefined" | Specifies the current selected option.           |
| `required`                      | `required`                      | `Boolean` |             | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `String`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `String`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `String`  |             | Custom help text message to display when validity = `valueMissing`. |
| `triggerIcon`                   | `triggerIcon`                   | `Boolean` |             | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| `type`                          | `type`                          | `String`  |             | Applies the defined value as the type attribute on auro-input. |
| `validity`                      | `validity`                      | `String`  | "undefined" | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `String`  | "undefined" | Value selected for the dropdown menu.            |

## Methods

| Method  | Type       | Description                         |
|---------|------------|-------------------------------------|
| `focus` | `(): void` | Focuses the combobox trigger input. |
| `reset` | `(): void` | Resets component to initial state.  |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>` | Notifies that the component has a new value set. |
| `auroFormElement-validated` |                    | Notifies that the component value(s) have been validated. |

## Slots

| Name       | Description                          |
|------------|--------------------------------------|
|            | Default slot for the menu content.   |
| `helpText` | Defines the content of the helpText. |
| `label`    | Defines the content of the label.    |
