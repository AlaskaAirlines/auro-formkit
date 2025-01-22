# auro-form

The auro-form element provides users a way to ... (it would be great if you fill this out).

## Attributes

| Attribute  | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| `cssClass` | `String`  | Applies designated CSS class to demo element - you want to delete me! |
| `fixed`    | `Boolean` | Uses fixed pixel values for element shape        |

## Properties

| Property         | Modifiers | Type                                             | Default | Description                                      |
|------------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `formState`      |           | `FormState`                                      | {}      |                                                  |
| `isInitialState` | readonly  | `boolean`                                        |         | Mostly internal way to determine if a form is in the initial state. |
| `reset`          |           |                                                  |         |                                                  |
| `submit`         |           |                                                  |         |                                                  |
| `validity`       | readonly  | `"valid" \| "invalid"`                           |         | Current validity state of the form, based on form element events. |
| `value`          | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` |         | Reduce the form value into a key-value pair.<br /><br />NOTE: form keys use `name` first, and `id` second if `name` is not available.<br />This follows standard HTML5 form behavior - submission uses `name` by default when creating<br />the FormData object. |

## Methods

| Method                      | Type                              | Description                                      |
|-----------------------------|-----------------------------------|--------------------------------------------------|
| `initializeState`           | `(): void`                        | Initialize (or reinitialize) the form state.     |
| `isButtonElement`           | `(element: HTMLElement): boolean` | Check if the tag name is a button element.<br /><br />**element**: The element to check. |
| `isFormElement`             | `(element: HTMLElement): boolean` | Check if the tag name is a form element.<br /><br />**element**: The element to check (attr or tag name). |
| `onSlotChange`              | `(): void`                        |                                                  |
| `queryAuroElements`         | `(): NodeList`                    | Construct the query strings from elements, append them together, execute, and return the NodeList. |
| `reset`                     | `(): void`                        |                                                  |
| `setDisabledStateOnButtons` | `(): void`                        |                                                  |
| `submit`                    | `(): void`                        | Submit fires an event called `submit` - just as you would expect from a normal form. |

## Events

| Event    | Type                                             |
|----------|--------------------------------------------------|
| `submit` | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` |
