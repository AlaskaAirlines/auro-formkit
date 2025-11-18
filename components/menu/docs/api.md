# auro-menu

The auro-menu element provides users a way to select from a list of options.

## Properties

| Property                   | Attribute                  | Modifiers | Type                              | Default     | Description                                      |
|----------------------------|----------------------------|-----------|-----------------------------------|-------------|--------------------------------------------------|
| `allowDeselect`            | `allowDeselect`            |           | `boolean`                         | false       | Allows deselecting an already selected option when clicked again in single-select mode. |
| `disabled`                 | `disabled`                 |           | `boolean`                         |             | When true, the entire menu and all options are disabled; |
| `hasLoadingPlaceholder`    |                            |           | `boolean`                         |             | Indicates whether the menu has a loadingIcon or loadingText to render when in a loading state. |
| `index`                    |                            |           | `number`                          |             |                                                  |
| `items`                    |                            | readonly  | `HTMLElement[]`                   |             |                                                  |
| `layout`                   |                            |           | `string`                          |             |                                                  |
| `loading`                  | `loading`                  |           | `boolean`                         | false       | When true, displays a loading state using the loadingIcon and loadingText slots if provided. |
| `matchWord`                | `matchword`                |           | `string`                          | "undefined" | Specifies a string used to highlight matched string parts in options. |
| `multiSelect`              | `multiselect`              |           | `boolean`                         | false       | When true, the selected option can be multiple options. |
| `noCheckmark`              | `nocheckmark`              |           | `boolean`                         | false       | When true, selected option will not show the checkmark. |
| `optionActive`             | `optionactive`             |           | `object`                          | "undefined" | Specifies the current active menuOption.         |
| `optionSelected`           | `optionSelected`           |           | `HTMLElement\|Array<HTMLElement>` | "undefined" | An array of currently selected menu options, type `HTMLElement` by default. In multi-select mode, `optionSelected` is an array of HTML elements. |
| `options`                  |                            | readonly  | `array`                           |             | Available menu options                           |
| `selectAllMatchingOptions` | `selectAllMatchingOptions` |           | `boolean`                         | false       | When true, selects all options that match the provided value/key when setting value and multiselect is enabled. |
| `selectedOption`           |                            | readonly  | `HTMLElement \| null`             |             | Gets the first selected option, or null if none. |
| `selectedOptions`          |                            | readonly  | `HTMLElement[]`                   |             | Gets the currently selected options.             |
| `value`                    | `value`                    |           | `string`                          | "undefined" | Value selected for the component.                |

## Methods

| Method               | Type                          | Description                                      |
|----------------------|-------------------------------|--------------------------------------------------|
| `reset`              | `(): void`                    | Resets the menu to its initial state.<br />This is the only way to return value to undefined. |
| `updateActiveOption` | `(option: HTMLElement): void` | Updates the currently active option in the menu.<br /><br />**option**: The option to set as active. |

## Events

| Event                         | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroMenu-activatedOption`    | `CustomEvent<Element>`                           | Notifies that a menuoption has been made `active`. |
| `auroMenu-customEventFired`   | `CustomEvent<any>`                               | Notifies that a custom event has been fired.     |
| `auroMenu-loadingChange`      | `CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>` | Notifies when the loading attribute is changed.  |
| `auroMenu-optionsChange`      | `CustomEvent<{ options: any; }>`                 |                                                  |
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

| Property      | Attribute     | Modifiers | Type      | Default | Description                                      |
|---------------|---------------|-----------|-----------|---------|--------------------------------------------------|
| `disabled`    | `disabled`    |           | `Boolean` | false   | When true specifies that the menuoption is disabled. |
| `event`       | `event`       |           | `string`  |         |                                                  |
| `iconTag`     |               |           | `string`  |         |                                                  |
| `isActive`    |               | readonly  | `boolean` |         | Returns whether the menu option is currently active and selectable.<br />An option is considered active if it is not hidden, not disabled, and not static. |
| `key`         | `key`         |           | `string`  |         |                                                  |
| `layout`      |               |           | `string`  |         |                                                  |
| `matchWord`   | `matchWord`   |           | `string`  |         |                                                  |
| `menuService` | `menuService` |           | `object`  | null    |                                                  |
| `nocheckmark` | `nocheckmark` |           | `boolean` | false   |                                                  |
| `selected`    | `selected`    |           | `Boolean` | false   | Specifies that an option is selected.            |
| `tabIndex`    | `tabIndex`    |           | `number`  |         |                                                  |
| `unsubscribe` |               |           |           | null    |                                                  |
| `value`       | `value`       |           | `String`  |         | Specifies the value to be sent to a server.      |

## Methods

| Method                | Type                          | Description                                      |
|-----------------------|-------------------------------|--------------------------------------------------|
| `attachTo`            | `(service: Object): void`     | Attaches this menu option to a menu service and subscribes to its events.<br />This method enables the option to participate in menu selection and highlighting logic.<br /><br />**service**: The menu service instance to attach to. |
| `bindEvents`          | `(): void`                    | Sets up event listeners for user interaction with the menu option.<br />This function enables click and mouse enter events to trigger selection and highlighting logic. |
| `handleMenuChange`    | `(event: Object): void`       | Handles changes from the menu service and updates the option's state.<br />This function synchronizes the option's properties and selection/highlight state with menu events.<br /><br />**event**: The event object from the menu service. |
| `setInternalSelected` | `(isSelected: boolean): void` | Updates the internal selected state of the menu option bypassing 'updated' and triggers custom events if selected.<br />This function ensures the option's selection state is synchronized with menu logic and notifies listeners.<br /><br />**isSelected**: Whether the option should be marked as selected. |
| `setSelected`         | `(isSelected: boolean): void` | Sets the selected state of the menu option.<br />This function updates whether the option is currently selected.<br /><br />**isSelected**: Whether the option should be marked as selected. |
| `updateActive`        | `(isActive: boolean): void`   | Updates the active state and visual highlighting of the menu option.<br />This function toggles the option's active status and applies or removes the active CSS class.<br /><br />**isActive**: Whether the option should be marked as active. |

## Events

| Event                      | Type                | Description                                      |
|----------------------------|---------------------|--------------------------------------------------|
| `auroMenuOption-click`     | `CustomEvent<this>` |                                                  |
| `auroMenuOption-mouseover` | `CustomEvent<this>` | Notifies that this option has been hovered over. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Specifies text for an option, but is not the value. |
