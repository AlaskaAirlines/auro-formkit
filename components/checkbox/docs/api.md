# auro-checkbox-group

The auro-checkbox-group element is a wrapper for auro-checkbox element.

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| `disabled`                      | `disabled`                      | `boolean` | "undefined" | If set, disables the checkbox group.             |
| `error`                         | `error`                         | `string`  |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `horizontal`                    | `horizontal`                    | `boolean` | false       | If set, checkboxes will be aligned horizontally. |
| `noValidate`                    | `noValidate`                    | `boolean` |             | If set, disables auto-validation on blur.        |
| `required`                      | `required`                      | `boolean` | false       | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`  |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `string`  | "undefined" | Specifies the `validityState` this element is in. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value<br /><br />**force**: Whether to force validation. |

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
| `checked`  | `checked`  | `boolean` | false   | If set to true, the checkbox will be filled with a checkmark. |
| `disabled` | `disabled` | `boolean` | false   | If set to true, the checkbox will not be clickable. |
| `id`       | `id`       | `string`  |         | Sets the individual `id` per element.            |
| `name`     | `name`     | `string`  |         | Accepts any string and is used to identify related checkboxes when submitting form data. |
| `value`    | `value`    | `string`  |         | Sets the element's input value. Must be unique within an auro-checkbox-group element. |

## Methods

| Method         | Type                 | Description                        |
|----------------|----------------------|------------------------------------|
| `handleChange` | `(event: any): void` |                                    |
| `handleInput`  | `(event: any): void` |                                    |
| `reset`        | `(): void`           | Resets component to initial state. |

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
