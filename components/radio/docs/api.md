# auro-radio-group

## Properties

| Property                        | Attribute                       | Type          | Default     | Description                                      |
|---------------------------------|---------------------------------|---------------|-------------|--------------------------------------------------|
| `disabled`                      | `disabled`                      | `boolean`     | false       |                                                  |
| `error`                         | `error`                         | `String`      |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `horizontal`                    | `horizontal`                    | `boolean`     | false       |                                                  |
| `noValidate`                    | `noValidate`                    | `Boolean`     |             | If set, disables auto-validation on blur.        |
| `optionSelected`                | `optionSelected`                | `Object`      | "undefined" | Specifies the current selected radio button.     |
| `required`                      | `required`                      | `Boolean`     | false       | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `String`      |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `String`      |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `String`      |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `String`      | "undefined" | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `array`       | "undefined" |                                                  |

## Methods

| Method  | Type       | Description                                    |
|---------|------------|------------------------------------------------|
| `reset` | `(): void` | Method for a total reset of the radio element. |

## Events

| Event                       | Description                                   |
|-----------------------------|-----------------------------------------------|
| `auroFormElement-validated` | Notifies that the element has been validated. |

## Slots

| Name            | Description                                     |
|-----------------|-------------------------------------------------|
| `helpText`      | Allows for the helper text to be overridden.    |
| `legend`        | Allows for the legend to be overridden.         |
| `optionalLabel` | Allows for the optional label to be overridden. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `radio-group` | Apply css to the fieldset element in the shadow DOM |


# auro-radio

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `Boolean` | false   | If set to true, the radio button will be filled. |
| `disabled` | `disabled` | `Boolean` | false   | If set to true, the radio button will be non-clickable. |
| `error`    | `error`    | `Boolean` | false   | If set to true, sets an error state on the radio button. |
| `id`       | `id`       | `string`  |         |                                                  |
| `label`    | `label`    | `string`  |         |                                                  |
| `name`     | `name`     | `string`  |         |                                                  |
| `required` | `required` | `Boolean` | false   | Defines element as required.                     |
| `tabIndex` | `tabIndex` | `number`  | -1      |                                                  |
| `value`    | `value`    | `string`  |         |                                                  |

## Events

| Event                | Type               | Description                                      |
|----------------------|--------------------|--------------------------------------------------|
| `auroRadio-blur`     | `CustomEvent<any>` | Notifies that the component has lost focus.      |
| `auroRadio-selected` | `CustomEvent<any>` | Notifies that the component has been marked as checked/selected. |
| `focusSelected`      | `CustomEvent<any>` | Notifies that the component has gained focus.    |
| `resetRadio`         | `CustomEvent<any>` | Notifies that the component has reset the checked/selected state. |
| `toggleSelected`     | `CustomEvent<any>` | Notifies that the component has toggled the checked/selected state. |
