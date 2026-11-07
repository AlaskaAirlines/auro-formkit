# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property         | Modifiers | Type                                             | Description                                      |
|------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `isInitialState` | readonly  | `boolean`                                        | Checks whether the form is unchanged, with every field still holding its starting value, the value it had when the form first found it. The form counts as changed while any field's value differs from its starting value or any field has failed validation, so changing a value back makes this true again. |
| `validity`       | readonly  | `"valid" \| "invalid" \| null`                   | Gets the form's overall validity: `invalid` when any enabled field has failed validation or is required but empty, and `valid` otherwise. Stays `null` while `isInitialState` is true, so you can hold back error messages until the user changes something. |
| `value`          | readonly  | `Record<string, string \| number \| boolean \| string[] \| Record<string, number> \| null>` | Gets the current values of all named, enabled form elements as one object, keyed by each element's `name` attribute. Each value is the child component's own `.value`, so its shape depends on the element type: for example, `auro-checkbox-group` gives an array, `auro-counter-group` gives an object keyed by counter name, and `auro-select` with `multiSelect` gives a JSON-encoded string. The one form-specific exception is a `range` `auro-datepicker`, which gives its `.values` array (`[start, end]`) instead of its single `.value` string once the user has entered dates. |

## Methods

| Method   | Type                | Description                                      |
|----------|---------------------|--------------------------------------------------|
| `reset`  | `(): void`          | Resets every tracked form element by calling its own `reset()`, then fires a `reset` event with the form's values from just before the reset in `detail.previousValue`. Each element decides what resetting means: for example, `auro-input` clears its value instead of restoring the one it started with. |
| `submit` | `(): Promise<void>` | Validates every enabled form element and, when none is invalid or required but empty, fires a `submit` event with the form's current values in `detail.value`. Otherwise, each invalid field shows its error and the `submit` event doesn't fire. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| `change` |                                                  | Fires when a child form element's value changes, and when the form rebuilds its state, such as after its content changes or a reset. |
| `input`  |                                                  | Fires when a child form element receives user input. |
| `reset`  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| Record<string, number> \| null>; }>` | Fires after the form resets. The event's `detail.previousValue` holds the form's values from just before the reset. |
| `submit` | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| Record<string, number> \| null>; }>` | Fires when the form is submitted and no enabled field is invalid or required but empty. The event's `detail.value` holds the form's current values. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Named Auro form elements, such as `auro-input` and `auro-select`, plus the submit and reset buttons the form controls. Fields can be nested in other elements, such as a `div` or `fieldset`. {@requiredWhen always} {@category ui} |
