# auro-checkbox-group

The auro-checkbox-group element is a wrapper for auro-checkbox element.

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| `disabled`                      | `disabled`                      | `boolean` | "undefined" | If set, disables the checkbox group.             |
| `error`                         | `error`                         | `string`  |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `horizontal`                    | `horizontal`                    | `boolean` | false       | If set, checkboxes will be aligned horizontally. |
| `noValidate`                    | `noValidate`                    | `boolean` |             | If set, disables auto-validation on blur.        |
| `onDark`                        | `onDark`                        | `boolean` | false       | Sets onDark styles for component.                |
| `required`                      | `required`                      | `boolean` | false       | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`  |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `string`  | "undefined" | Specifies the `validityState` this element is in. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| `input`                     | `CustomEvent<any>` |                                                  |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| `helpText`      | Allows for the helper text to be overridden.     |
| `legend`        | Allows for the legend to be overridden.          |
| `optionalLabel` | Allows overriding the optional display text "(optional)", which appears next to the label. |


# auro-checkbox

Custom element for the purpose of allowing users to select one or more options of a limited number of choices.

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `boolean` | false   | If set to true, the checkbox will be filled with a checkmark. |
| `disabled` | `disabled` | `boolean` | false   | If set to true, the checkbox will not be clickable. |
| `error`    | `error`    | `boolean` | false   | If set to true, the checkbox will be displayed with an error state. |
| `id`       | `id`       | `string`  |         | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| `name`     | `name`     | `string`  |         | Accepts any string and is used to identify related checkboxes when submitting form data. |
| `onDark`   | `onDark`   | `boolean` | false   | Sets onDark styles for component.                |
| `value`    | `value`    | `string`  |         | Sets the element's input value. Must be unique within an auro-checkbox-group element. |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| `reset` | `(): void` | Resets component to initial state. |

## Events

| Event                   | Type               | Description                                      |
|-------------------------|--------------------|--------------------------------------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` |                                                  |
| `auroCheckbox-focusout` | `CustomEvent<any>` |                                                  |
| `auroCheckbox-input`    | `CustomEvent<any>` |                                                  |
| `change`                | `CustomEvent<any>` | (Deprecated) Notifies when checked value is changed. |
| `input`                 | `InputEvent`       | Notifies when when checked value is changed by user's interface. |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| `checkbox`       | apply css to a specific checkbox.         |
| `checkbox-input` | apply css to a specific checkbox's input. |
| `checkbox-label` | apply css to a specific checkbox's label. |
