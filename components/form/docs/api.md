# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property         | Modifiers | Type                                             | Description                                      |
|------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `isInitialState` | readonly  | `boolean`                                        | Returns `true` if no form element has been interacted with or had its value changed since the form was initialized or last reset. |
| `validity`       | readonly  | `"valid" \| "invalid" \| null`                   | Returns `'valid'` if all required and interacted-with form elements are valid, `'invalid'` if any are not, or `null` if the form has not been interacted with yet. |
| `value`          | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` | Returns the current values of all named form elements as a key-value object, keyed by each element's `name` attribute. |

## Methods

| Method   | Type                | Description                                      |
|----------|---------------------|--------------------------------------------------|
| `reset`  | `(): void`          | Resets all form elements to their initial state and fires a `reset` event. The event's `detail.previousValue` contains the form values captured immediately before the reset. |
| `submit` | `(): Promise<void>` | Validates all form elements. If all are valid, fires a `submit` event with `detail.value` containing the current form values. If any element is invalid, its error state is surfaced and the `submit` event is not fired. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| `change` |                                                  | Fires when a child form element's value changes or the form is initialized. |
| `input`  |                                                  | Fires when a child form element receives user input. |
| `reset`  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is reset. The event detail contains the previous value of the form before reset. |
| `submit` | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is submitted. The event detail contains the current value of the form. |

## Slots

| Name      | Description                         |
|-----------|-------------------------------------|
| `default` | The default slot for form elements. |
