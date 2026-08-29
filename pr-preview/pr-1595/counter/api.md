<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-counter-group

The `auro-counter-group` element provides a flexible interface for grouping multiple counters, supporting validation, custom validity messages, and disabled states based on the group's value.

## Properties

| Property                  | Attribute                 | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `appearance`              | `appearance`              | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| `autoPlacement`           | `autoplacement`           | `boolean`                                        | "false"          | If declared, bib's position will be automatically calculated where to appear. |
| `error`                   | `error`                   | `string`                                         |                  | The current error message to display when the component is invalid. |
| `fullscreenBreakpoint`    | `fullscreenbreakpoint`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `isDropdown`              | `isdropdown`              | `boolean`                                        | false            | If true, the counter group is displayed as a dropdown. |
| `largeFullscreenHeadline` | `largefullscreenheadline` | `boolean`                                        | false            | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| `layout`                  | `layout`                  | `'classic' \| 'snowflake'`                       | "'classic'"      | Determines the layout style of the counter group when it is a dropdown. |
| `matchWidth`              | `matchwidth`              | `boolean`                                        | false            | If declared, the dropdown will expand to the width of its parent container.<br />Otherwise, the dropdown width will be determined by its content. |
| `max`                     | `max`                     | `number`                                         | "undefined"      | The maximum value allowed for the whole group of counters. |
| `min`                     | `min`                     | `number`                                         | "undefined"      | The minimum value allowed for the whole group of counters. |
| `noFlip`                  | `noflip`                  | `boolean`                                        | false            | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `offset`                  | `offset`                  | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| `onDark`                  | `ondark`                  | `boolean`                                        | false            | DEPRECATED - use `appearance` instead.           |
| `placement`               | `placement`               | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| `shape`                   | `shape`                   | `'box' \| 'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'rounded' \| 'snowflake'` | "'classic'"      | Sets the shape of the counter group when it is a dropdown. |
| `shift`                   | `shift`                   | `boolean`                                        | false            | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| `size`                    | `size`                    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | "'xl'"           | Sets the size of the counter group when it is a dropdown. |
| `total`                   | `total`                   | `number`                                         | "undefined"      | The total value of the counters.                 |
| `validity`                | `validity`                | `string`                                         | "undefined"      | Reflects the validity state.                     |
| `value`                   | `value`                   | `object`                                         | "undefined"      | The current individual values of the nested counters. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `hideBib`  | `(): void`                             | Hides the dropdown bib if its open.              |
| `showBib`  | `(): void`                             | Shows the dropdown bib if there are options to show. |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                             | Description                                      |
|---------|--------------------------------------------------|--------------------------------------------------|
| `input` | `CustomEvent<{ total: number \| undefined; value: {} \| undefined; }>` | Notifies that the counter group's value has changed. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `bib.fullscreen.footer`   | Defines the footer to display at the bottom of fullscreen bib. Only used when `isDropdown` is true. |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options. Only used when `isDropdown` is true. Required. |
| `default`                 | Slot for counter elements.                       |
| `helpText`                | Dropdown help text content. Only used when `isDropdown` is true. |
| `label`                   | Dropdown label content. Only used when `isDropdown` is true. |
| `valueText`               | Dropdown value text display. Only used when `isDropdown` is true. |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `dropdown` | The dropdown element rendered when `isDropdown` is true. |
| `helpText` | The help text and error message container.       |

# auro-counter

The `auro-counter` element provides a flexible counter interface with increment and decrement buttons, supporting optional sub-labels and disabled states.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| `disabled`   | `disabled`   | `boolean`                |             | Indicates if the counter is disabled.            |
| `error`      | `error`      | `string`                 |             | Error state and message.<br />True if set, value is the error message. |
| `max`        | `max`        | `number`                 |             | The maximum value for the counter.               |
| `min`        | `min`        | `number`                 |             | The minimum value for the counter.               |
| `onDark`     | `ondark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| `validity`   | `validity`   | `string`                 |             | The validity state of the counter.               |
| `value`      | `value`      | `number \| undefined`    |             | Gets the current value of the counter.           |

## Methods

| Method      | Type                                   | Description                                      |
|-------------|----------------------------------------|--------------------------------------------------|
| `decrement` | `(value?: number \| undefined): void`  | Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.<br /><br />**value**: The amount to decrement by. |
| `increment` | `(value?: number \| undefined): void`  | Increments the counter value by 1. If a value is provided, it increments by that amount.<br /><br />**value**: The amount to increment by. |
| `validate`  | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                           | Description                                    |
|---------|------------------------------------------------|------------------------------------------------|
| `input` | `CustomEvent<{ value: number \| undefined; }>` | Notifies that the counter's value has changed. |

## Slots

| Name              | Description                                |
|-------------------|--------------------------------------------|
| `ariaLabel.minus` | Accessible label for the decrement button. |
| `ariaLabel.plus`  | Accessible label for the increment button. |
| `default`         | Main label content for the counter.        |
| `description`     | Descriptive content for the counter.       |
| `helpText`        | Help text content for the counter.         |

## CSS Shadow Parts

| Part             | Description                                      |
|------------------|--------------------------------------------------|
| `controlMinus`   | The decrement button.                            |
| `controlPlus`    | The increment button.                            |
| `counterControl` | The container for the counter's spinbutton controls and value. |
| `helpText`       | The help text and error message container.       |
<!-- AURO-GENERATED-CONTENT:END -->
