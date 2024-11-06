# auro-checkbox-group

The auro-checkbox-group element is a wrapper for auro-checkbox element.

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| `disabled`                      | `disabled`                      | `boolean` | "undefined" |                                                  |
| `error`                         | `error`                         | `String`  |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `horizontal`                    | `horizontal`                    | `Boolean` | false       | If set, checkboxes will be aligned horizontally. |
| `noValidate`                    | `noValidate`                    | `Boolean` |             | If set, disables auto-validation on blur.        |
| `required`                      | `required`                      | `Boolean` | false       | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `String`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `String`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `String`  |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `String`  | "undefined" | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `array`   | "undefined" |                                                  |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| `input`                     | `CustomEvent<any>` |                                                  |

## Slots

| Name            | Description                                     |
|-----------------|-------------------------------------------------|
| `helpText`      | Allows for the helper text to be overridden.    |
| `legend`        | Allows for the legend to be overridden.         |
| `optionalLabel` | Allows for the optional label to be overridden. |


# auro-checkbox

Custom element for the purpose of allowing users to select one or more options of a limited number of choices.

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `Boolean` | false   | If set to true, the checkbox will be filled with a checkmark. |
| `disabled` | `disabled` | `Boolean` | false   | If set to true, the checkbox will not be clickable. |
| `error`    | `error`    | `Boolean` | false   | If set to true, sets an error state on the checkbox. |
| `id`       | `id`       | `String`  |         | Sets the individual `id` per element.            |
| `name`     | `name`     | `String`  |         | Accepts any string, `DOMString` representing the value of the input. |
| `value`    | `value`    | `String`  |         | Sets the element's input value.                  |

## Methods

| Method         | Type                 |
|----------------|----------------------|
| `handleChange` | `(event: any): void` |
| `handleInput`  | `(event: any): void` |

## Events

| Event                   | Type               |
|-------------------------|--------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` |
| `auroCheckbox-focusout` | `CustomEvent<any>` |
| `auroCheckbox-input`    | `CustomEvent<any>` |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| `checkbox`       | apply css to a specific checkbox.         |
| `checkbox-input` | apply css to a specific checkbox's input. |
| `checkbox-label` | apply css to a specific checkbox's label. |
