# auro-popover

The auro-popover element provides users a way to display additional information on demand.

## Properties

| Property         | Attribute        | Modifiers | Type                | Description                                      |
|------------------|------------------|-----------|---------------------|--------------------------------------------------|
| `behavior`       | `behavior`       |           | `string`            |                                                  |
| `button`         |                  | readonly  | `HTMLButtonElement` | A reference to the popover component's internal button element (trigger) |
| `minInputLength` | `minInputLength` |           | `number`            |                                                  |
| `offset`         | `offset`         |           | `number`            |                                                  |
| `placement`      | `placement`      |           | `string`            |                                                  |
| `popover`        |                  | readonly  | `HTMLElement`       | A reference to the popover component's internal popover element |
| `showOnFocus`    | `showOnFocus`    |           | `boolean`           |                                                  |
| `showOnHover`    | `showOnHover`    |           | `boolean`           |                                                  |
| `shown`          | `shown`          |           | `boolean`           |                                                  |
| `title`          | `title`          |           | `string`            |                                                  |
| `type`           | `type`           |           | `string`            |                                                  |

## Methods

| Method   | Type       | Description                            |
|----------|------------|----------------------------------------|
| `toggle` | `(): void` | Toggles the visibility of the floater. |
