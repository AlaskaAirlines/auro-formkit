# auro-counter

## Properties

| Property   | Attribute  | Type      | Default     | Description                                      |
|------------|------------|-----------|-------------|--------------------------------------------------|
| `disabled` | `disabled` | `boolean` | false       | Indicates if the counter is disabled.            |
| `max`      | `max`      | `number`  | 9           | The maximum value for the counter.               |
| `min`      | `min`      | `number`  | 0           | The minimum value for the counter.               |
| `onDark`   | `onDark`   | `boolean` | false       | If declared, the counter will be rendered with onDark styles. |
| `validity` | `validity` | `string`  | "undefined" | The validity state of the counter.               |
| `value`    | `value`    | `number`  | "undefined" | The current value of the counter.                |

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
| `default`     | Main label content for the counter.  |
| `description` | Descriptive content for the counter. |


# auro-counter-group

## Properties

| Property                  | Attribute                 | Type                     | Default        | Description                                      |
|---------------------------|---------------------------|--------------------------|----------------|--------------------------------------------------|
| `autoPlacement`           | `autoPlacement`           | `boolean`                | "false"        | If declared, bib's position will be automatically calculated where to appear. |
| `fullscreenBreakpoint`    | `fullscreenBreakpoint`    | `string`                 | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `isDropdown`              | `isDropdown`              | `boolean`                | false          | Indicates if the counter group is displayed as a dropdown. |
| `largeFullscreenHeadline` | `largeFullscreenHeadline` | `boolean`                | false          | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| `layout`                  |                           | `'classic'\|'snowflake'` |                | Determines the layout style of the counter group when it is a dropdown. Options are 'classic' or 'snowflake'. Default is 'classic'. |
| `matchWidth`              | `matchWidth`              | `boolean`                | false          | If declared, the dropdown will expand to the width of its parent container.<br />Otherwise, the dropdown width will be determined by its content. |
| `max`                     | `max`                     | `number`                 | "undefined"    | The maximum value allowed for the whole group of counters. |
| `min`                     | `min`                     | `number`                 | "undefined"    | The minimum value allowed for the whole group of counters. |
| `noFlip`                  | `noFlip`                  | `boolean`                | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `offset`                  | `offset`                  | `number`                 | "0"            | Gap between the trigger element and bib.         |
| `onDark`                  | `onDark`                  | `boolean`                | false          | If declared, counters and dropdown will be rendered with onDark styles. |
| `placement`               | `placement`               | `string`                 | "bottom-start" | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \| "right" \| "bottom" \| "left" \|<br />"bottom-start" \| "top-start" \| "top-end" \|<br />"right-start" \| "right-end" \| "bottom-end" \|<br />"left-start" \| "left-end" |
| `total`                   | `total`                   | `number`                 | "undefined"    | The total value of the counters.                 |
| `validity`                | `validity`                | `string`                 | "undefined"    | Reflects the validity state.                     |
| `value`                   | `value`                   | `object`                 | "undefined"    | The current individual values of the nested counters. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                             |
|---------|--------------------------------------------------|
| `input` | `CustomEvent<{ total: number \| undefined; value: {} \| undefined; }>` |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| `bib.fullscreen.footer`   | Defines the footer to display at the bottom of fullscreen bib. Only used when `isDropdown` is true. |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options. Only used when `isDropdown` is true. Required. |
| `default`                 | Slot for counter elements.                       |
| `helpText`                | Dropdown help text content. Only used when `isDropdown` is true. |
| `label`                   | Dropdown label content. Only used when `isDropdown` is true. |
| `valueText`               | Dropdown value text display. Only used when `isDropdown` is true. |
