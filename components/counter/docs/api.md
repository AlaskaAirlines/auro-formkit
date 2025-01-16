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

| Method             | Type                                  | Description                                      |
|--------------------|---------------------------------------|--------------------------------------------------|
| `decrement`        | `(value?: number \| undefined): void` | Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.<br /><br />**value**: The amount to decrement by. |
| `handleSlotChange` | `(): void`                            |                                                  |
| `increment`        | `(value?: number \| undefined): void` | Increments the counter value by 1. If a value is provided, it increments by that amount.<br /><br />**value**: The amount to increment by. |

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

| Property   | Attribute  | Type     | Default     | Description                                      |
|------------|------------|----------|-------------|--------------------------------------------------|
| `max`      | `max`      | `number` | "undefined" | The maximum value allowed for the whole group of counters. |
| `min`      | `min`      | `number` | "undefined" | The minimum value allowed for the whole group of counters. |
| `validity` | `validity` | `string` | "undefined" | Reflects the validity state.                     |
| `value`    | `value`    | `number` | "undefined" | The current value.                               |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name      | Description                |
|-----------|----------------------------|
| `Default` | Slot for counter elements. |
