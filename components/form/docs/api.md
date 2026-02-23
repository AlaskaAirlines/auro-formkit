# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property                   | Attribute  | Modifiers | Type                                             | Default | Description                                      |
|----------------------------|------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `cssClass`                 | `cssClass` |           | `boolean`                                        |         | Applies designated CSS class to demo element - you want to delete me! |
| `fixed`                    | `fixed`    |           | `boolean`                                        |         | If declared, use fixed pixel values for element shape. |
| `formState`                |            |           | `FormState`                                      | {}      |                                                  |
| `handleKeyDown`            |            |           |                                                  |         |                                                  |
| `isInitialState`           |            | readonly  | `boolean`                                        |         | Mostly internal way to determine if a form is in the initial state. |
| `mutationEventListener`    |            |           |                                                  |         |                                                  |
| `reset`                    |            |           |                                                  |         |                                                  |
| `resetElements`            |            | readonly  | `HTMLButtonElement[]`                            |         | Returns a collection of elements that will reset the form. |
| `sharedInputListener`      |            |           |                                                  |         |                                                  |
| `sharedValidationListener` |            |           |                                                  |         |                                                  |
| `submit`                   |            |           |                                                  |         |                                                  |
| `submitElements`           |            | readonly  | `HTMLButtonElement[]`                            |         | Getter for internal _submitElements.             |
| `validity`                 |            | readonly  | `"valid" \| "invalid"`                           |         | Current validity state of the form, based on form element events. |
| `value`                    |            | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` |         | Reduce the form value into a key-value pair.     |

## Methods

| Method                      | Type                              | Description                                      |
|-----------------------------|-----------------------------------|--------------------------------------------------|
| `initializeState`           | `(): void`                        | Initialize (or reinitialize) the form state.     |
| `isButtonElement`           | `(element: HTMLElement): boolean` | Check if the tag name is a button element.<br /><br />**element**: The element to check. |
| `isFormElement`             | `(element: HTMLElement): boolean` | Check if the tag name is a form element.<br /><br />**element**: The element to check (attr or tag name). |
| `onSlotChange`              | `(event: Event): void`            | Slot change event listener. This is the main entry point for the form element.<br /><br />**event**: The slot change event. |
| `queryAuroElements`         | `(): NodeList`                    | Construct the query strings from elements, append them together, execute, and return the NodeList. |
| `reset`                     | `(): void`                        | Reset fires an event called `reset` - just as you would expect from a normal form. |
| `setDisabledStateOnButtons` | `(): void`                        |                                                  |
| `submit`                    | `(): Promise<void>`               | Submit fires an event called `submit` - just as you would expect from a normal form. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| `change` |                                                  | Fires when form state changes.                   |
| `reset`  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is reset. The event detail contains the previous value of the form before reset. |
| `submit` | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is submitted. The event detail contains the current value of the form. |

## Slots

| Name      | Description                         |
|-----------|-------------------------------------|
| `default` | The default slot for form elements. |
