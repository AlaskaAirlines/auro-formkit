# auro-form

The auro-form element provides users a way to ... (it would be great if you fill this out).

## Attributes

| Attribute  | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| `cssClass` | `String`  | Applies designated CSS class to demo element - you want to delete me! |
| `fixed`    | `Boolean` | Uses fixed pixel values for element shape        |

## Properties

| Property       | Modifiers | Type                                             | Default | Description                                      |
|----------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `formElements` |           | `HTMLInputElement[]`                             | []      |                                                  |
| `formState`    |           | `FormState`                                      | {}      |                                                  |
| `value`        | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` |         | Reduce the form value into a key-value pair.<br /><br />NOTE: form keys use `name` first, and `id` second if `name` is not available.<br />This follows standard HTML5 form behavior - submission uses `name` by default when creating<br />the FormData object. |

## Methods

| Method              | Type                       |
|---------------------|----------------------------|
| `getSubmitFunction` | `(): (event: any) => void` |
| `onSlotChange`      | `(event: any): void`       |
