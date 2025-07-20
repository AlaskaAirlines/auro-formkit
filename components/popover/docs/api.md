# auro-popover

The auro-popover element provides users a way to display additional information on demand.

## Properties

| Property         | Attribute        | Modifiers | Type                   |
|------------------|------------------|-----------|------------------------|
| `behavior`       | `behavior`       |           | `string`               |
| `button`         |                  | readonly  | `Element \| undefined` |
| `minInputLength` | `minInputLength` |           | `number`               |
| `offset`         | `offset`         |           | `number`               |
| `placement`      | `placement`      |           | `string`               |
| `popover`        |                  | readonly  | `Element \| undefined` |
| `showOnFocus`    | `showOnFocus`    |           | `boolean`              |
| `showOnHover`    | `showOnHover`    |           | `boolean`              |
| `shown`          | `shown`          |           | `boolean`              |
| `title`          | `title`          |           | `string`               |
| `type`           | `type`           |           | `string`               |

## Methods

| Method   | Type       | Description                            |
|----------|------------|----------------------------------------|
| `toggle` | `(): void` | Toggles the visibility of the floater. |
