# auro-radio-group

The `auro-radio-group` element is used to group a set `auro-radio` elements.

## Properties

| Property                        | Attribute                       | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|--------------------------|-------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| `disabled`                      | `disabled`                      | `boolean`                |             | If true, all radio buttons will be disabled.     |
| `error`                         | `error`                         | `string`                 |             | If true, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `horizontal`                    | `horizontal`                    | `boolean`                |             | If true, displays radio buttons horizontally.    |
| `noValidate`                    | `noValidate`                    | `boolean`                |             | If true, disables auto-validation on blur.       |
| `onDark`                        | `onDark`                        | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| `optionSelected`                | `optionSelected`                | `object`                 |             | Specifies the current selected radio button.     |
| `required`                      | `required`                      | `boolean`                |             | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`                 |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`                 |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`                 |             | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `string`                 |             | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         | `string`                 |             | Specifies the current value of the selected radio button. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the element has been validated.    |
| `input`                     | `CustomEvent<any>` | Notifies every time the value prop of the element is changed. |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| `helpText`      | Allows for the helper text to be overridden.     |
| `legend`        | Allows for the legend to be overridden.          |
| `optionalLabel` | Allows overriding the optional display text "(optional)", which appears next to the label. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `radio-group` | Apply css to the fieldset element in the shadow DOM |


# auro-radio

The `auro-radio` element is used to a button that allows the user to select one option from a set.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| `checked`    | `checked`    | `boolean`                |             | If set to true, the radio button will be filled. |
| `disabled`   | `disabled`   | `boolean`                |             | If set to true, the radio button will be non-clickable. |
| `error`      | `error`      | `boolean`                |             | If set to true, sets an error state on the radio button. |
| `id`         | `id`         | `string`                 |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| `label`      | `label`      | `string`                 |             | Label for the radio button.                      |
| `name`       | `name`       | `string`                 |             | Name for the radio button group.                 |
| `onDark`     | `onDark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| `required`   | `required`   | `boolean`                |             | Defines element as required.                     |
| `value`      | `value`      | `string`                 |             | The value of the radio button.                   |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| `reset` | `(): void` | Resets component to initial state. |

## Events

| Event                | Type               | Description                                      |
|----------------------|--------------------|--------------------------------------------------|
| `auroRadio-blur`     | `CustomEvent<any>` | Notifies that the component has lost focus.      |
| `auroRadio-selected` | `CustomEvent<any>` | Notifies that the component has been marked as checked/selected. |
| `change`             | `CustomEvent<any>` | (Deprecated) Notifies when checked value is changed. |
| `focusSelected`      | `CustomEvent<any>` | Notifies that the component has gained focus.    |
| `input`              | `InputEvent`       | Notifies when when checked value is changed by user's interface. |
| `resetRadio`         | `CustomEvent<any>` | Notifies that the component has reset the checked/selected state. |
| `toggleSelected`     | `CustomEvent<any>` | Notifies that the component has toggled the checked/selected state. |

## CSS Shadow Parts

| Part          | Description                               |
|---------------|-------------------------------------------|
| `radio`       | apply css to a specific checkbox.         |
| `radio-input` | apply css to a specific checkbox's input. |
| `radio-label` | apply css to a specific checkbox's label. |
