# auro-floater

The auro-floater element provides users a way to display additional information on demand.

## Properties

| Property           | Attribute          | Modifiers | Type                | Description                                      |
|--------------------|--------------------|-----------|---------------------|--------------------------------------------------|
| `arrowEl`          | `arrowEl`          |           | `object`            | A reference to the arrow element (if desired)    |
| `behavior`         | `behavior`         |           | `string`            | The behavior of the popover, "dialog", "dialog-fullscreen", "dropdown", "tooltip", or "input", "input-fullscreen", "input-dropdown" |
| `button`           |                    | readonly  | `HTMLButtonElement` | A reference to the popover component's internal button element (trigger) |
| `inline`           | `inline`           |           | `string`            | Whether or not the floater should try to align to an inline element like a hyperlink |
| `input`            | `input`            |           | `object`            | A reference to the input to attach to for input behavior |
| `minInputLength`   | `minInputLength`   |           | `number`            | The minimum number of characters the user must type before the popover is shown |
| `offset`           | `offset`           |           | `number`            | The offset distance of the floater               |
| `placement`        | `placement`        |           | `string`            | The position of the floater, e.g., "bottom-start", "top-end" etc. (do not use with useAutoPlacement) |
| `popover`          |                    | readonly  | `HTMLElement`       | A reference to the popover component's internal popover element |
| `showOnChange`     | `showOnChange`     |           | `string`            | Whether the floater should show on change (input behavior only) |
| `showOnFocus`      | `showOnFocus`      |           | `string`            | Whether the floater should open on focus (input behavior only) |
| `showOnHover`      | `showOnHover`      |           | `boolean`           | Whether the floater should show on hover         |
| `shown`            | `shown`            |           | `boolean`           | Whether the floater is shown or not              |
| `title`            | `title`            |           | `string`            | The title of the floater - REQUIRED FOR A11Y     |
| `type`             | `type`             |           | `string`            | The type of floater, e.g., "manual", "auto", or "hint" |
| `useAutoPlacement` | `useAutoPlacement` |           | `string`            | Whether or not to use automatic placement for the floater (do not use with placement) |
| `useFlip`          | `useFlip`          |           | `string`            | Whether or not to use the flip behavior (flips the element when it goes off-screen) |
| `useHide`          | `useHide`          |           | `string`            | Whether or not to use the hide behavior (hides element when trigger is not visible) |

## Methods

| Method   | Type       | Description                            |
|----------|------------|----------------------------------------|
| `toggle` | `(): void` | Toggles the visibility of the floater. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auro-floater-beforechange` | `CustomEvent<{ target: this; newState: any; }>`  |                                                  |
| `auro-floater-change`       | `CustomEvent<{ target: this; newState: any; }>`  | Fired when the floater's visibility state changes. Event detail contains {target: AuroFloater, newState: string} where newState is either "shown" or "hidden". |
| `auro-floater-hidden`       | `CustomEvent<{ target: this; newState: string; }>` | Fired when the floater is hidden. Event detail contains {target: AuroFloater, newState: "hidden"}. |
| `auro-floater-shown`        | `CustomEvent<{ target: this; newState: string; }>` | Fired when the floater is shown. Event detail contains {target: AuroFloater, newState: "shown"}. |
