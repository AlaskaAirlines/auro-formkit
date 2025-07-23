# auro-floater

The auro-floater element provides users a way to display additional information on demand.

## Properties

| Property           | Attribute          | Modifiers | Type                | Description                                      |
|--------------------|--------------------|-----------|---------------------|--------------------------------------------------|
| `behavior`         | `behavior`         |           | `string`            | The behavior of the popover, "dialog", "dropdown", "tooltip", or "input" |
| `button`           |                    | readonly  | `HTMLButtonElement` | A reference to the popover component's internal button element (trigger) |
| `floatingUiConfig` | `floatingUiConfig` |           | `object`            |                                                  |
| `minInputLength`   | `minInputLength`   |           | `number`            | The minimum number of characters the user must type before the popover is shown |
| `offset`           | `offset`           |           | `number`            | The offset distance of the floater               |
| `placement`        | `placement`        |           | `string`            | The position of the floater, e.g., "bottom-start", "top-end" etc. |
| `popover`          |                    | readonly  | `HTMLElement`       | A reference to the popover component's internal popover element |
| `showOnFocus`      | `showOnFocus`      |           | `string`            | Whether the floater should open on focus (input behavior only) |
| `showOnHover`      | `showOnHover`      |           | `boolean`           | Whether the floater should show on hover         |
| `shown`            | `shown`            |           | `boolean`           | Whether the floater is shown or not              |
| `title`            | `title`            |           | `string`            | The title of the floater - REQUIRED FOR A11Y     |
| `type`             | `type`             |           | `string`            | The type of floater, e.g., "manual", "auto", or "hint" |

## Methods

| Method   | Type       | Description                            |
|----------|------------|----------------------------------------|
| `toggle` | `(): void` | Toggles the visibility of the floater. |

## Events

| Event                 | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `auro-popover-change` | `CustomEvent<{ target: this; newState: any; }>`  | Fired when the popover's visibility state changes. Event detail contains {target: AuroPopover, newState: string} where newState is either "shown" or "hidden". |
| `auro-popover-hidden` | `CustomEvent<{ target: this; newState: string; }>` | Fired when the popover is hidden. Event detail contains {target: AuroPopover, newState: "hidden"}. |
| `auro-popover-shown`  | `CustomEvent<{ target: this; newState: string; }>` | Fired when the popover is shown. Event detail contains {target: AuroPopover, newState: "shown"}. |
