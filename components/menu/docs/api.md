# auro-menu

The auro-menu element provides users a way to select from a list of options.

## Properties

| Property                | Attribute        | Type                            | Default     | Description                                      |
|-------------------------|------------------|---------------------------------|-------------|--------------------------------------------------|
| `disabled`              | `disabled`       | `boolean`                       |             | When true, the entire menu and all options are disabled; |
| `hasLoadingPlaceholder` |                  | `boolean`                       |             | Indicates whether the menu has a loadingIcon or loadingText to render when in a loading state. |
| `loading`               | `loading`        | `boolean`                       | false       | When true, displays a loading state using the loadingIcon and loadingText slots if provided. |
| `matchWord`             | `matchword`      | `string`                        | "undefined" | Specifies a string used to highlight matched string parts in options. |
| `multiSelect`           | `multiselect`    | `boolean`                       | false       | When true, the selected option can be multiple options. |
| `noCheckmark`           | `nocheckmark`    | `boolean`                       | false       | When true, selected option will not show the checkmark. |
| `optionActive`          | `optionactive`   | `object`                        | "undefined" | Specifies the current active menuOption.         |
| `optionSelected`        | `optionselected` | `Array<HTMLElement>\|undefined` | "undefined" | An array of currently selected menu options. In single-select mode, the array will contain only one HTMLElement. `undefined` when no options are selected. |
| `value`                 | `value`          | `Array<string>\|undefined`      | "undefined" | Value selected for the menu. `undefined` when no selection has been made, otherwise an array of strings. In single-select mode, the array will contain only one value. |

## Methods

| Method  | Type       | Description                                      |
|---------|------------|--------------------------------------------------|
| `reset` | `(): void` | Resets the menu to its initial state.<br />This is the only way to return value to undefined. |

## Events

| Event                         | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroMenu-activatedOption`    | `CustomEvent<Element>`                           | Notifies that a menuoption has been made `active`. |
| `auroMenu-customEventFired`   | `CustomEvent<any>`                               | Notifies that a custom event has been fired.     |
| `auroMenu-loadingChange`      | `CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>` | Notifies when the loading attribute is changed.  |
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

The auro-menu element provides users a way to define a menu option.

## Attributes

| Attribute     | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `noCheckmark` | `String` | When true, selected option will not show the checkmark. |

## Properties

| Property      | Attribute     | Type      | Default | Description                                      |
|---------------|---------------|-----------|---------|--------------------------------------------------|
| `disabled`    | `disabled`    | `Boolean` | false   | When true specifies that the menuoption is disabled. |
| `iconTag`     |               | `string`  |         |                                                  |
| `nocheckmark` | `nocheckmark` | `boolean` | false   |                                                  |
| `selected`    | `selected`    | `Boolean` | false   | Specifies that an option is selected.            |
| `value`       | `value`       | `String`  |         | Specifies the value to be sent to a server.      |

## Events

| Event                      | Type                | Description                                      |
|----------------------------|---------------------|--------------------------------------------------|
| `auroMenuOption-mouseover` | `CustomEvent<this>` | Notifies that this option has been hovered over. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Specifies text for an option, but is not the value. |
