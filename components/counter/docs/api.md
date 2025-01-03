# auro-counter

## Properties

| Property                          | Attribute                         | Type      | Default     | Description                                      |
|-----------------------------------|-----------------------------------|-----------|-------------|--------------------------------------------------|
| `disabled`                        | `disabled`                        | `boolean` | false       | Determines whether the counter is interactive or disabled. |
| `error`                           | `error`                           | `boolean` | false       | Indicates if the counter is in an error state.   |
| `max`                             | `max`                             | `number`  | 9           | Maximum value of the counter.                    |
| `min`                             | `min`                             | `number`  | 0           | Minimum value of the counter.                    |
| `noValidate`                      | `noValidate`                      | `boolean` |             |                                                  |
| `setCustomValidity`               | `setCustomValidity`               | `string`  |             |                                                  |
| `setCustomValidityCustomError`    | `setCustomValidityCustomError`    | `string`  |             |                                                  |
| `setCustomValidityRangeOverflow`  | `setCustomValidityRangeOverflow`  | `string`  |             |                                                  |
| `setCustomValidityRangeUnderflow` | `setCustomValidityRangeUnderflow` | `string`  |             |                                                  |
| `setCustomValidityValueMissing`   | `setCustomValidityValueMissing`   | `string`  |             |                                                  |
| `subLabel`                        | `subLabel`                        | `string`  | ""          | Optional sub-label text for the counter.         |
| `validity`                        | `validity`                        | `string`  | "undefined" | Indicates if the current value is valid.         |
| `value`                           | `value`                           | `number`  | "undefined" | Value of the counter.                            |

## Methods

| Method                | Type                         | Description                                      |
|-----------------------|------------------------------|--------------------------------------------------|
| `decrement`           | `(): void`                   | Decrements the value of the counter by 1 if it is greater than the minimum value. |
| `increment`           | `(): void`                   | Increments the counter value by 1 if it is less than the maximum value. |
| `initValue`           | `(): void`                   | Initializes the value of the counter.<br />If the current value is undefined, it sets the value to the minimum value. |
| `isIncrementDisabled` | `(extrema: number): boolean` | Determines if the increment button should be disabled based on the current value and extrema.<br /><br />**extrema**: The extreme value (either min or max) to compare against the current value. |
| `jumpFocusToEnabled`  | `(): void`                   | Moves the focus to the first enabled button within the shadow DOM.<br />This method searches for the first `auro-counter-button` element that is not disabled<br />and sets the focus on it. |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name | Description                         |
|------|-------------------------------------|
|      | Default slot for main label content |

## CSS Shadow Parts

| Part             | Description                              |
|------------------|------------------------------------------|
| `controlMinus`   | Styling hook for minus button            |
| `controlPlus`    | Styling hook for plus button             |
| `counterControl` | Styling hook for counter control section |
