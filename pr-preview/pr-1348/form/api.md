<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/api.md) -->
<!-- The below content is automatically added from ../docs/api.md -->

# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property                   | Attribute  | Modifiers | Type                                             | Default | Description                                      |
|----------------------------|------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| [cssClass](#cssClass)                 | `cssClass` |           | `boolean`                                        |         | Applies designated CSS class to demo element - you want to delete me! |
| [fixed](#fixed)                    | `fixed`    |           | `boolean`                                        |         | If declared, use fixed pixel values for element shape. |
| [formState](#formState)                |            |           | `FormState`                                      | {}      |                                                  |
| [isInitialState](#isInitialState)           |            | readonly  | `boolean`                                        |         | Mostly internal way to determine if a form is in the initial state. |
| [mutationEventListener](#mutationEventListener)    |            |           |                                                  |         |                                                  |
| [reset](#reset)                    |            |           |                                                  |         |                                                  |
| [resetElements](#resetElements)            |            | readonly  | `HTMLButtonElement[]`                            |         | Returns a collection of elements that will reset the form. |
| [sharedInputListener](#sharedInputListener)      |            |           |                                                  |         |                                                  |
| [sharedValidationListener](#sharedValidationListener) |            |           |                                                  |         |                                                  |
| [submit](#submit)                   |            |           |                                                  |         |                                                  |
| [submitElements](#submitElements)           |            | readonly  | `HTMLButtonElement[]`                            |         | Getter for internal _submitElements.             |
| [validity](#validity)                 |            | readonly  | `"valid" \| "invalid"`                           |         | Current validity state of the form, based on form element events. |
| [value](#value)                    |            | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` |         | Reduce the form value into a key-value pair.<br /><br />NOTE: form keys use `name` first, and `id` second if `name` is not available.<br />This follows standard HTML5 form behavior - submission uses `name` by default when creating<br />the FormData object. |

## Methods

| Method                      | Type                              | Description                                      |
|-----------------------------|-----------------------------------|--------------------------------------------------|
| [initializeState](#initializeState)           | `(): void`                        | Initialize (or reinitialize) the form state.     |
| [isButtonElement](#isButtonElement)           | `(element: HTMLElement): boolean` | Check if the tag name is a button element.<br /><br />**element**: The element to check. |
| [isFormElement](#isFormElement)             | `(element: HTMLElement): boolean` | Check if the tag name is a form element.<br /><br />**element**: The element to check (attr or tag name). |
| [onSlotChange](#onSlotChange)              | `(event: Event): void`            | Slot change event listener. This is the main entry point for the form element.<br /><br />**event**: The slot change event. |
| [queryAuroElements](#queryAuroElements)         | `(): NodeList`                    | Construct the query strings from elements, append them together, execute, and return the NodeList. |
| [reset](#reset)                     | `(): void`                        | Reset fires an event called `reset` - just as you would expect from a normal form. |
| [setDisabledStateOnButtons](#setDisabledStateOnButtons) | `(): void`                        |                                                  |
| [submit](#submit)                    | `(): void`                        | Submit fires an event called `submit` - just as you would expect from a normal form. |

## Events

| Event    | Type                                             | Description                    |
|----------|--------------------------------------------------|--------------------------------|
| [change](#change) | `Event`                                          | Fires when form state changes. |
| [reset](#reset)  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` |                                |
| [submit](#submit) | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` |                                |
<!-- AURO-GENERATED-CONTENT:END -->
