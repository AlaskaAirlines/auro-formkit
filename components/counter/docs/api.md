# auro-counter-group

The `auro-counter-group` element provides a flexible interface for grouping multiple counters, supporting validation, custom validity messages, and disabled states based on the group's value.

## Properties

| Property                  | Attribute                 | Modifiers | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|-----------|--------------------------------------------------|------------------|--------------------------------------------------|
| `appearance`              | `appearance`              |           | `'default' \| 'inverse'`                         | "'default'"      | Sets the colors to match the background behind the group. Use `inverse` on dark backgrounds and `default` on light ones. |
| `autoPlacement`           | `autoplacement`           |           | `boolean`                                        | "false"          | Deprecated: Use `placement` instead.<br />Moves the open dropdown to whichever side of the trigger has the most space. Applies only when `isDropdown` is set. |
| `fullscreenBreakpoint`    | `fullscreenbreakpoint`    |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Sets the largest screen size at which the open dropdown fills the screen. Use `disabled` to keep it as a dropdown on every screen size. Applies only when `isDropdown` is set. |
| `isDropdown`              | `isdropdown`              |           | `boolean`                                        | false            | Shows the counters in a dropdown with a label and a summary of their values. Use it to save space in forms. |
| `largeFullscreenHeadline` | `largefullscreenheadline` |           | `boolean`                                        | false            | Shows the fullscreen dropdown's headline in a larger heading style. Applies only when `isDropdown` is set. |
| `layout`                  | `layout`                  |           | `'classic' \| 'snowflake'`                       | "'classic'"      | Sets the dropdown's layout. Use `classic` for most forms, and `snowflake` only on dark backgrounds with `appearance="inverse"`. Applies only when `isDropdown` is set. |
| `matchWidth`              | `matchwidth`              |           | `boolean`                                        | false            | Makes the open dropdown the same width as its trigger. Without it, the dropdown's content sets its width. Applies only when `isDropdown` is set. |
| `max`                     | `max`                     |           | `number`                                         | "undefined"      | Sets the highest total allowed across all counters. When the total reaches it, every counter's plus button turns off. |
| `min`                     | `min`                     |           | `number`                                         | "undefined"      | Sets the lowest total allowed across all counters. When the total is at or below it, every counter's minus button turns off. |
| `noFlip`                  | `noflip`                  |           | `boolean`                                        | false            | Keeps the open dropdown on the side set by `placement`, even when there isn't enough space there. Without it, the dropdown flips to the opposite side. Applies only when `isDropdown` is set. |
| `offset`                  | `offset`                  |           | `number`                                         |                  | Sets the gap in pixels between the trigger and the open dropdown, such as `20`. Uses `0` when not set. Applies only when `isDropdown` is set. |
| `onDark`                  | `ondark`                  |           | `boolean`                                        | false            | Deprecated: Use `appearance="inverse"` instead.<br />Shows the group in colors for dark backgrounds. |
| `placement`               | `placement`               |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Sets where the open dropdown appears relative to its trigger. The first word is the side, and `-start` or `-end` lines the dropdown up with the start or end edge of the trigger. Applies only when `isDropdown` is set. |
| `shape`                   | `shape`                   |           | `'box' \| 'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'rounded' \| 'snowflake'` | "'classic'"      | Sets the shape of the dropdown. Defaults to `snowflake` when `layout="snowflake"`, and to `classic` otherwise. Applies only when `isDropdown` is set. |
| `shift`                   | `shift`                   |           | `boolean`                                        | false            | Moves the open dropdown along its side so the edge of the screen doesn't cut it off. Applies only when `isDropdown` is set. |
| `size`                    | `size`                    |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | "'xl'"           | Sets the size of the dropdown. Defaults to `lg` when `layout="snowflake"`, and to `xl` otherwise. Applies only when `isDropdown` is set. |
| `total`                   |                           | readonly  | `number`                                         | "undefined"      | Gets the sum of every counter's value, such as `3` for 2 adults and 1 child. |
| `validity`                | `validity`                | readonly  | `string`                                         | "undefined"      | Gets the group's validation result: `valid`, or the first invalid counter's reason, such as `customError` or `rangeOverflow`. |
| `value`                   |                           | readonly  | `Record<string, number>`                         | "undefined"      | Gets each counter's value, keyed by the counter's `name`, such as `{ adults: 2, children: 1 }`. Counters without a `name` use `counter-0`, `counter-1`, and so on. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `hideBib`  | `(): void`                             | Closes the dropdown if it's open. Does nothing unless `isDropdown` is set. |
| `reset`    | `(): void`                             | Resets every counter to its `min` value and clears the group's validation state.<br />`value` and `total` update as each counter finishes resetting. |
| `showBib`  | `(): void`                             | Opens the dropdown if it's closed. Does nothing unless `isDropdown` is set. |
| `validate` | `(force?: boolean \| undefined): void` | Updates the group's `validity` from its counters and fires `auroFormElement-validated`.<br /><br />**force**: If true, runs the group's own check even while it has focus. If false, skips that check while the group has focus; `validity` still updates from the counters. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroFormElement-validated` | `CustomEvent<{ validity: any; message: string \| undefined; }>` | Fires each time the group is validated, with the result in `event.detail.validity` and `event.detail.message`. |
| `input`                     | `CustomEvent<{ total: number \| undefined; value: {} \| undefined; }>` | Fires when any counter's value changes, with the new `total` and `value` in `event.detail`. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| `ariaLabel.bib.close`     | Text screen readers announce for the close button in the fullscreen dropdown, such as "Close passenger selector". Defaults to "Close". {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category a11y} |
| `bib.fullscreen.footer`   | Content shown at the bottom of the fullscreen dropdown, such as Reset and Save buttons. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui} |
| `bib.fullscreen.headline` | The heading shown at the top of the fullscreen dropdown, such as "Passengers". Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category ui} |
| `default`                 | The `auro-counter` elements in the group. {@requiredWhen always} {@category ui} |
| `helpText`                | Extra guidance shown below the dropdown. An error message replaces it while any counter is invalid. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui} |
| `label`                   | The label shown in the dropdown trigger, such as "Passengers". Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category ui} |
| `typeIcon`                | An icon shown at the start of the dropdown trigger, such as a person icon for a passenger selector. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui} |
| `valueText`               | Custom text shown in the dropdown trigger in place of the default summary of each counter's value and label. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui} |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `dropdown` | The dropdown element, rendered when `isDropdown` is set. |
| `helpText` | The paragraph that shows the help text, or the combined error message while a counter is invalid. Rendered only when `isDropdown` is set. |


# auro-counter

The `auro-counter` element provides a flexible counter interface with increment and decrement buttons, supporting optional sub-labels and disabled states.

## Properties

| Property     | Attribute    | Modifiers | Type                     | Default     | Description                                      |
|--------------|--------------|-----------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` |           | `'default' \| 'inverse'` | "'default'" | Sets the colors to match the background behind the counter. Use `inverse` on dark backgrounds and `default` on light ones. |
| `disabled`   | `disabled`   |           | `boolean`                |             | Turns the counter off. A disabled counter is shown in a muted style, its buttons can't be clicked, and it's removed from the keyboard tab order. |
| `error`      | `error`      |           | `string`                 |             | Sets a custom error message, such as "Select at least one adult", and marks the counter invalid. The message replaces the help text. Set it with the `error` attribute: setting only the `error` property doesn't currently mark the counter invalid. |
| `max`        | `max`        |           | `number`                 | "9"         | Sets the highest value the counter allows. The plus button turns off at this value. |
| `min`        | `min`        |           | `number`                 | "0"         | Sets the lowest value the counter allows. The counter starts at this value, and the minus button turns off at it. |
| `name`       | `name`       |           | `string`                 |             | Sets the key for this counter's entry in the group's `value` object, such as `adults`. Applies only inside `auro-counter-group`, which uses `counter-0`, `counter-1`, and so on for counters without a name. |
| `onDark`     | `ondark`     |           | `boolean`                |             | Deprecated: Use `appearance="inverse"` instead.<br />Shows the counter in colors for dark backgrounds. |
| `validity`   | `validity`   | readonly  | `string`                 |             | Reports whether the counter passes validation: `valid`, or the reason it fails, such as `customError`, `rangeOverflow`, or `rangeUnderflow`. |
| `value`      | `value`      |           | `number \| undefined`    |             | Gets the current value of the counter.           |

## Methods

| Method      | Type                                   | Description                                      |
|-------------|----------------------------------------|--------------------------------------------------|
| `decrement` | `(value?: number \| undefined): void`  | Decreases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its minimum, and doesn't stop a larger step at `min`.<br /><br />**value**: The amount to subtract. Defaults to 1. |
| `increment` | `(value?: number \| undefined): void`  | Increases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its maximum, and doesn't cap a larger step at `max`.<br /><br />**value**: The amount to add. Defaults to 1. |
| `reset`     | `(): void`                             | Sets the value back to `min` and clears the counter's validation state, as other Auro form elements do when reset. |
| `validate`  | `(force?: boolean \| undefined): void` | Checks the counter's value against `min`, `max`, and the `error` attribute, and updates `validity`.<br /><br />**force**: If true, validates even while the counter has focus. If false, skips validation while the counter has focus. |

## Events

| Event   | Type                                           | Description                                    |
|---------|------------------------------------------------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` | Notifies that the counter's value has changed. |

## Slots

| Name              | Description                                      |
|-------------------|--------------------------------------------------|
| `ariaLabel.minus` | Text screen readers announce for the minus button, such as "Remove adult". Defaults to "−" (a minus sign). {@requiredWhen always} {@category a11y} |
| `ariaLabel.plus`  | Text screen readers announce for the plus button, such as "Add adult". Defaults to "+". {@requiredWhen always} {@category a11y} |
| `default`         | The counter's label, such as "Adults". Screen readers read it, with any `description`, as the counter's name. {@requiredWhen always} {@category ui} |
| `description`     | Short supporting text shown below the label, such as "18 years or older". Screen readers read it as part of the counter's name. {@category ui} |
| `helpText`        | Extra guidance shown below the counter. An error message replaces it while the counter is invalid. {@category ui} |

## CSS Shadow Parts

| Part             | Description                                      |
|------------------|--------------------------------------------------|
| `controlMinus`   | The minus button, which lowers the value by 1.   |
| `controlPlus`    | The plus button, which raises the value by 1.    |
| `counterControl` | The spinbutton element that holds the minus button, the value, and the plus button. |
| `helpText`       | The paragraph that shows the help text, or the error message while the counter is invalid. |
