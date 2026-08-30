# auro-checkbox-group

The `auro-checkbox-group` element is a wrapper for `auro-checkbox` elements..

## Properties

| Property                        | Attribute                       | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|--------------------------|-------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| `disabled`                      | `disabled`                      | `boolean`                |             | If set, disables the checkbox group.             |
| `error`                         | `error`                         | `string`                 |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `horizontal`                    | `horizontal`                    | `boolean`                |             | If set, checkboxes will be aligned horizontally. |
| `noValidate`                    | `novalidate`                    | `boolean`                |             | If set, disables auto-validation on blur.        |
| `onDark`                        | `ondark`                        | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| `required`                      | `required`                      | `boolean`                |             | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setcustomvalidity`             | `string`                 |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setcustomvaliditycustomerror`  | `string`                 |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setcustomvalidityvaluemissing` | `string`                 |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `string`                 |             | Specifies the `validityState` this element is in. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| `input`                     | `CustomEvent<any>` | Notifies when the group's value changes due to a checkbox selection being added or removed. |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| `default`       | The default slot for the checkbox items.         |
| `helpText`      | Allows for the helper text to be overridden.     |
| `legend`        | Allows for the legend to be overridden.          |
| `optionalLabel` | Allows overriding the optional display text "(optional)", which appears next to the label. |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `helpText` | Apply css to the help text element that displays helper or error messages. |


# auro-checkbox

The `auro-checkbox` element is for the purpose of allowing users to select one or more options of a limited number of choices.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| `checked`    | `checked`    | `boolean`                |             | If set to true, the checkbox will be filled with a checkmark. |
| `disabled`   | `disabled`   | `boolean`                |             | If set to true, the checkbox will not be clickable. |
| `error`      | `error`      | `boolean`                |             | If set to true, the checkbox will be displayed with an error state. |
| `id`         | `id`         | `string`                 |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| `name`       | `name`       | `string`                 |             | Accepts any string and is used to identify related checkboxes when submitting form data. |
| `onDark`     | `ondark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| `value`      | `value`      | `string`                 |             | Sets the element's input value. Must be unique within an auro-checkbox-group element. |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| `reset` | `(): void` | Resets component to initial state. |

## Events

| Event                   | Type               | Description                                      |
|-------------------------|--------------------|--------------------------------------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` | Notifies when the checkbox receives focus.       |
| `auroCheckbox-focusout` | `CustomEvent<any>` | Notifies when the checkbox loses focus.          |
| `auroCheckbox-input`    | `CustomEvent<any>` | Notifies when the checked value is changed by user interaction. **DEPRECATED** - Use the `input` event instead. |
| `change`                |                    | Notifies when checked value is changed. **DEPRECATED** - Use the `input` event instead. |
| `input`                 |                    | Notifies when when checked value is changed by user's interface. |

## Slots

| Name      | Description                              |
|-----------|------------------------------------------|
| `default` | The default slot for the checkbox label. |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| `checkbox`       | apply css to a specific checkbox.         |
| `checkbox-input` | apply css to a specific checkbox's input. |
| `checkbox-label` | apply css to a specific checkbox's label. |
