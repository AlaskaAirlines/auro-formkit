# auro-counter

## Properties

| Property   | Attribute  | Type      | Default     | Description                           |
|------------|------------|-----------|-------------|---------------------------------------|
| `disabled` | `disabled` | `boolean` | false       | Indicates if the counter is disabled. |
| `max`      | `max`      | `number`  | 9           | The maximum value for the counter.    |
| `min`      | `min`      | `number`  | 0           | The minimum value for the counter.    |
| `validity` | `validity` | `string`  | "undefined" | The validity state of the counter.    |
| `value`    | `value`    | `number`  | "undefined" | The current value of the counter.     |

## Methods

| Method      | Type                                   | Description                                      |
|-------------|----------------------------------------|--------------------------------------------------|
| `decrement` | `(value?: number \| undefined): void`  | Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.<br /><br />**value**: The amount to decrement by. |
| `increment` | `(value?: number \| undefined): void`  | Increments the counter value by 1. If a value is provided, it increments by that amount.<br /><br />**value**: The amount to increment by. |
| `validate`  | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name          | Description                          |
|---------------|--------------------------------------|
| `Default`     | Main label content for the counter.  |
| `description` | Descriptive content for the counter. |


# auro-counter-group

## Properties

| Property     | Attribute    | Type      | Default     | Description                                      |
|--------------|--------------|-----------|-------------|--------------------------------------------------|
| `isDropdown` | `isDropdown` | `boolean` | false       | Indicates if the counter group is displayed as a dropdown. |
| `max`        | `max`        | `number`  | "undefined" | The maximum value allowed for the whole group of counters. |
| `min`        | `min`        | `number`  | "undefined" | The minimum value allowed for the whole group of counters. |
| `total`      | `total`      | `number`  | "undefined" | The total value of the counters.                 |
| `validity`   | `validity`   | `string`  | "undefined" | Reflects the validity state.                     |
| `value`      | `value`      | `object`  | "undefined" | The current individual values of the nested counters. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                             |
|---------|--------------------------------------------------|
| `input` | `CustomEvent<{ total: number \| undefined; value: {} \| undefined; }>` |

## Slots

| Name        | Description                                      |
|-------------|--------------------------------------------------|
| `Default`   | Slot for counter elements.                       |
| `HelpText`  | Dropdown help text content. Only used when `isDropdown` is true. |
| `Label`     | Dropdown label content. Only used when `isDropdown` is true. |
| `ValueText` | Dropdown value text display. Only used when `isDropdown` is true. |
