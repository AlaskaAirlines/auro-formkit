# auro-menu

The `auro-menu` element provides users a way to select from a list of options.

## Properties

| Property                | Attribute      | Modifiers | Type                  | Default     | Description                                      |
|-------------------------|----------------|-----------|-----------------------|-------------|--------------------------------------------------|
| `currentLabel`          |                | readonly  | `string`              |             |                                                  |
| `disabled`              | `disabled`     |           | `boolean`             |             | When true, the entire menu and all options are disabled. |
| `hasLoadingPlaceholder` |                | readonly  | `boolean`             |             | Getter for loading placeholder state.            |
| `index`                 |                |           | `number`              |             |                                                  |
| `layout`                |                |           | `string`              |             |                                                  |
| `loading`               | `loading`      |           | `boolean`             | false       | When true, displays a loading state using the loadingIcon and loadingText slots if provided. |
| `matchWord`             | `matchword`    |           | `string`              | "undefined" | Specifies a string used to highlight matched string parts in options. |
| `multiSelect`           | `multiselect`  |           | `boolean`             | false       | When true, the selected option can be multiple options. |
| `noCheckmark`           | `nocheckmark`  |           | `boolean`             | false       | When true, selected option will not show the checkmark. |
| `optionActive`          | `optionactive` |           | `object`              | "undefined" | Specifies the current active menuOption.         |
| `optionSelected`        |                |           | `object`              | "undefined" | The currently selected menu option(s). In single-select mode this is a single `HTMLElement` (or `undefined` when nothing is selected). In multi-select mode this is an array of `HTMLElement`s. |
| `options`               |                | readonly  | `HTMLElement[]`       |             |                                                  |
| `selectedOption`        |                | readonly  | `HTMLElement \| null` |             | Gets the first selected option, or null if none. |
| `selectedOptions`       |                | readonly  | `HTMLElement[]`       |             | Gets the currently selected options as an array. |
| `value`                 | `value`        |           | `string`              | "undefined" | The value of the selected option. In multi-select mode, this is a JSON stringified array of selected option values.<br />The value must match a selectable option. Options marked `disabled` or `static` are not selectable by value: if the value matches one, the selection is cleared (`optionSelected` becomes `undefined`) and `auroMenu-selectValueFailure` is dispatched. `hidden` options remain selectable by value. |

## Methods

| Method               | Type                                             | Description                                      |
|----------------------|--------------------------------------------------|--------------------------------------------------|
| `navigateOptions`    | `(direction: string): void`                      | Navigates through options using keyboard.<br /><br />**direction**: 'up' or 'down'. |
| `reset`              | `(): void`                                       | Resets the menu to its initial state.<br />This is the only way to return value to undefined. |
| `selectByValue`      | `(value: string \| string[] \| null \| undefined): void` | Selects options by value. Options marked `disabled` or `static` are not selectable: if the value matches one, the selection is cleared and `auroMenu-selectValueFailure` is dispatched. `hidden` options remain selectable. Passing `undefined`, `null`, an empty string, or an empty array clears the selection without dispatching a failure.<br /><br />**value**: The value(s) to select. |
| `updateActiveOption` | `(indexOrOption: number \| HTMLElement): void`   | Updates the active option state and dispatches events.<br />Accepts either a numeric index or an HTMLElement option.<br /><br />**indexOrOption**: Index of the option or the option element to make active. |

## Events

| Event                         | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroMenu-activatedOption`    | `CustomEvent<Element>`                           | Notifies that a menuoption has been made `active`. |
| `auroMenu-customEventFired`   | `CustomEvent<any>`                               | Notifies that a custom event has been fired.     |
| `auroMenu-loadingChange`      | `CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>` | Notifies when the loading attribute is changed.  |
| `auroMenu-optionsChange`      | `CustomEvent<{ options: Element[] \| undefined; }>` |                                                  |
| `auroMenu-selectValueFailure` | `CustomEvent<any>`                               | Notifies that an attempt to select a menuoption by matching a value has failed. |
| `auroMenu-selectValueReset`   | `CustomEvent<any>`                               | Notifies that the component value has been reset. |
| `auroMenu-selectedOption`     | `CustomEvent<any>`                               | Notifies that a new menuoption selection has been made. |

## Slots

| Name          | Description                                 |
|---------------|---------------------------------------------|
|               | Slot for insertion of menu options.         |
| `loadingIcon` | Icon to show while loading attribute is set |
| `loadingText` | Text to show while loading attribute is set |


# auro-menuoption

The `auro-menuoption` element provides users a way to define a menu option.

## Attributes

| Attribute | Type      | Description                                      |
|-----------|-----------|--------------------------------------------------|
| `static`  | `Boolean` | When present, marks the option as non-interactive — it renders but is skipped during keyboard navigation and cannot be selected. Useful for section headers, informational rows inside a menu, or attaching event listeners. |

## Properties

| Property      | Attribute     | Modifiers | Type      | Default | Description                                      |
|---------------|---------------|-----------|-----------|---------|--------------------------------------------------|
| `disabled`    | `disabled`    |           | `boolean` | false   |                                                  |
| `iconTag`     |               |           |           |         |                                                  |
| `isActive`    |               | readonly  | `boolean` |         | Returns whether the menu option is currently active and selectable. |
| `layout`      |               |           | `string`  |         |                                                  |
| `noCheckmark` | `noCheckmark` |           | `boolean` | false   |                                                  |
| `noMatch`     | `nomatch`     |           | `boolean` | false   | When true, marks this option as the "no matching results" placeholder shown by combobox<br />when the user's input does not match any available options. |
| `persistent`  | `persistent`  |           | `boolean` | false   | When true, this option is excluded from `matchWord` DOM rewriting — useful for utility rows (e.g., "Add new…") that must render identically regardless of the current filter. |
| `selected`    | `selected`    |           | `boolean` | false   | **Deprecated.** Use the `value` attribute on `auro-menu` to set the selected option when the menu renders (or call `menu.selectByValue(value)` programmatically). Support for the child-level `selected` attribute will be removed in a future major release. |
| `value`       | `value`       |           | `string`  |         |                                                  |

## Methods

| Method             | Type                  |
|--------------------|-----------------------|
| `attachTo`         | `(): void`            |
| `handleMenuChange` | `(): void`            |
| `setSelected`      | `(value: any): void`  |
| `updateActive`     | `(active: any): void` |

## Events

| Event                      | Type                | Description                                      |
|----------------------------|---------------------|--------------------------------------------------|
| `auroMenuOption-click`     | `CustomEvent<this>` | Notifies that this option has been clicked.      |
| `auroMenuOption-mouseover` | `CustomEvent<this>` | Notifies that this option has been hovered over. |

## Slots

| Name      | Description                                |
|-----------|--------------------------------------------|
| `default` | The default slot for the menu option text. |
