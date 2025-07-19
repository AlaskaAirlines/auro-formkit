# auro-popover

The auro-popover element provides users a way to display additional information on demand.

## Properties

| Property      | Attribute     | Modifiers | Type                   |
|---------------|---------------|-----------|------------------------|
| `behavior`    | `behavior`    |           | `string`               |
| `button`      |               | readonly  | `Element \| undefined` |
| `offset`      | `offset`      |           | `number`               |
| `placement`   | `placement`   |           | `string`               |
| `popover`     |               | readonly  | `Element \| undefined` |
| `showOnHover` | `showOnHover` |           | `boolean`              |
| `shown`       | `shown`       |           | `boolean`              |
| `title`       | `title`       |           | `string`               |
| `type`        | `type`        |           | `string`               |

## Methods

| Method   | Type       | Description                            |
|----------|------------|----------------------------------------|
| `toggle` | `(): void` | Toggles the visibility of the floater. |
