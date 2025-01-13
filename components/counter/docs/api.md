# auro-counter

## Properties

| Property     | Attribute    | Type      | Default     | Description                           |
|--------------|--------------|-----------|-------------|---------------------------------------|
| `disabled`   | `disabled`   | `boolean` | false       | Indicates if the counter is disabled. |
| `max`        | `max`        | `number`  | 9           | The maximum value for the counter.    |
| `min`        | `min`        | `number`  | 0           | The minimum value for the counter.    |
| `noValidate` | `noValidate` | `boolean` | false       | Indicates if validation is disabled.  |
| `validity`   | `validity`   | `string`  | "undefined" | The validity state of the counter.    |
| `value`      | `value`      | `number`  | "undefined" | The current value of the counter.     |

## Methods

| Method      | Type       | Description                               |
|-------------|------------|-------------------------------------------|
| `decrement` | `(): void` | Decrements the value of the counter by 1. |
| `increment` | `(): void` | Increments the counter value by 1.        |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name          | Description                          |
|---------------|--------------------------------------|
| `Default`     | Main label content for the counter.  |
| `description` | Descriptive content for the counter. |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| `controlMinus`   | Styling hook for minus button.            |
| `controlPlus`    | Styling hook for plus button.             |
| `counterControl` | Styling hook for counter control section. |


# auro-counter-group

## Properties

| Property     | Attribute    | Type      | Default     | Description                                      |
|--------------|--------------|-----------|-------------|--------------------------------------------------|
| `max`        | `max`        | `number`  | "undefined" | The maximum value allowed for the whole group of counters. |
| `min`        | `min`        | `number`  | "undefined" | The minimum value allowed for the whole group of counters. |
| `noValidate` | `noValidate` | `boolean` | false       | If true, disables validation.                    |
| `validity`   | `validity`   | `string`  | "undefined" | Reflects the validity state.                     |
| `value`      | `value`      | `number`  | "undefined" | The current value.                               |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name      | Description                |
|-----------|----------------------------|
| `Default` | Slot for counter elements. |
