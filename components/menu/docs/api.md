# auro-menu

The `auro-menu` element provides users a way to select from a list of options.

## Properties

| Property                | Attribute     | Modifiers | Type                                   | Default     | Description                                      |
|-------------------------|---------------|-----------|----------------------------------------|-------------|--------------------------------------------------|
| `currentLabel`          |               | readonly  | `string`                               |             | Gets the text of the selected option. In multi-select mode, gets the text of every selected option, separated by commas. |
| `disabled`              | `disabled`    |           | `boolean`                              |             | Turns off the whole menu. Every option is shown in a muted style and can't be highlighted or selected with the mouse or keyboard, but each option's own `disabled` setting stays unchanged. |
| `hasLoadingPlaceholder` |               | readonly  | `boolean`                              |             | Checks whether the menu has content for the `loadingIcon` or `loadingText` slot. Only content present when the menu first renders counts. |
| `index`                 |               |           | `number`                               |             | Gets or sets the position in `options` of the option that Enter and Tab act on: the option last highlighted or selected. It's `-1` when there's none. |
| `layout`                | `layout`      |           | `string`                               |             | Sets a layout name for the menu. The menu has no layouts, so this doesn't currently change how it looks. |
| `loading`               | `loading`     |           | `boolean`                              | false       | Shows a loading placeholder in place of the options, using the `loadingIcon` and `loadingText` slots when they have content. Also sets `aria-busy` so screen readers know the options aren't ready. |
| `matchWord`             | `matchword`   |           | `string`                               | "undefined" | Sets the text to highlight in each option, such as what someone has typed into a search field. Matching text is shown in bold, ignoring case. Options marked `persistent`, `disabled`, `hidden`, or `static` aren't highlighted. |
| `multiSelect`           | `multiselect` |           | `boolean`                              | false       | Lets people select more than one option. Choosing a selected option again deselects it, and `value` holds the selected values as a JSON array string, such as `'["stops","price"]'`. |
| `noCheckmark`           | `nocheckmark` |           | `boolean`                              | false       | Hides the checkmark next to selected options. Applies to every option in the menu, including options in nested menus. |
| `optionActive`          |               |           | `HTMLElement`                          | "undefined" | Gets the active option: the one highlighted by the arrow keys or hover. It's `undefined` when no option is highlighted. |
| `optionSelected`        |               |           | `HTMLElement \| HTMLElement[]`         | "undefined" | Gets the selected option, or an array of the selected options in multi-select mode. It's `undefined` when nothing is selected. |
| `options`               |               | readonly  | `HTMLElement[] \| undefined`           |             | Gets the options in the menu, including options in nested menus, in the order they appear. |
| `selectedOption`        |               | readonly  | `HTMLElement \| null`                  |             | Gets the first selected option, or `null` when nothing is selected. |
| `selectedOptions`       |               | readonly  | `HTMLElement[]`                        |             | Gets the selected options as an array.           |
| `shape`                 | `shape`       |           | `'box' \| 'pill' \| 'snowflake'`       | "'box'"     | Sets the corner shape of every option in the menu. `box` (the default) and `snowflake` have square corners, and `pill` has fully rounded ends. An option's own `shape` overrides it. |
| `size`                  | `size`        |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | "'sm'"      | Sets the text size and spacing of every option in the menu, from `xs` (smallest) to `xl` (largest). An option's own `size` overrides it. |
| `value`                 | `value`       |           | `string`                               | "undefined" | Sets the selected option by its `value`, such as `stops`, and updates when someone selects an option. In multi-select mode, it's a JSON array string, such as `'["stops","price"]'`, and values that match only `disabled` or `static` options are dropped. Options marked `disabled` or `static` can't be selected by value, but `hidden` options can; when nothing selectable matches, the selection is cleared and `auroMenu-selectValueFailure` fires. |

## Methods

| Method                           | Type                                             | Description                                      |
|----------------------------------|--------------------------------------------------|--------------------------------------------------|
| `initializeArchitectureDefaults` | `(): void`                                       |                                                  |
| `navigateOptions`                | `(direction: string): void`                      | Moves the active option to the next or previous option, wrapping around at either end. Skips options that are `disabled`, `hidden`, or `static`, and does nothing when the menu is disabled.<br /><br />**direction**: The direction to move, `up` or `down`. |
| `reset`                          | `(): void`                                       | Clears the selection and the active option, and sets `value` to `undefined`. Fires `auroMenu-selectValueReset`. |
| `selectByValue`                  | `(value: string \| string[] \| null \| undefined): void` | Selects the option whose `value` matches, or in multi-select mode, the options that match an array of values. Options marked `disabled` or `static` can't be selected, but `hidden` options can; when nothing selectable matches, the selection is cleared and `auroMenu-selectValueFailure` fires. Passing `undefined`, `null`, an empty string, or an empty array clears the selection without firing that event.<br /><br />**value**: The value to select, or an array of values in multi-select mode. |
| `updateActiveOption`             | `(indexOrOption: number \| HTMLElement): void`   | Makes an option the active (highlighted) option and fires `auroMenu-activatedOption`. Does nothing when the option or position isn't in `options`.<br /><br />**indexOrOption**: The position in `options` of the option to make active, or the option element itself. |

## Events

| Event                         | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroMenu-activatedOption`    | `CustomEvent<Element>`                           | Fires when an option becomes the active (highlighted) option, through the arrow keys, hover, or `updateActiveOption()`. The option is in `detail`. |
| `auroMenu-customEventFired`   | `CustomEvent<any>`                               | Fires right after the menu fires the event named in an option's `event` attribute. The option is in `detail.option`. |
| `auroMenu-loadingChange`      | `CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>` | Fires when `loading` changes.                    |
| `auroMenu-optionsChange`      | `CustomEvent<{ options: Array<HTMLElement> }>`   | Fires when the set of options in the menu changes. |
| `auroMenu-selectValueFailure` | `CustomEvent<any>`                               | Fires when a value doesn't match any option that can be selected. |
| `auroMenu-selectValueReset`   | `CustomEvent<any>`                               | Fires when `reset()` clears the menu.            |
| `auroMenu-selectedOption`     | `CustomEvent<any>`                               | Fires when the selection changes, including when an option is deselected or the selection is cleared. In single-select mode, it also fires when someone chooses the option that's already selected. |

## Slots

| Name          | Description                                      |
|---------------|--------------------------------------------------|
|               | The `auro-menuoption` elements to choose from. It can also hold `<hr>` dividers and nested `auro-menu` elements. {@requiredWhen always} {@category ui} |
| `loadingIcon` | Icon shown while the menu is loading, such as an `auro-loader`. {@relevantWhen loading} {@category ui} |
| `loadingText` | Text shown while the menu is loading, such as "Loading...". {@relevantWhen loading} {@category ui} |


# auro-menuoption

The `auro-menuoption` element provides users a way to define a menu option.

## Attributes

| Attribute | Type      | Description                                      |
|-----------|-----------|--------------------------------------------------|
| `static`  | `Boolean` | Shows the option as a row that can't be highlighted or selected, and that the arrow keys skip. Use it for section headings or informational rows inside a menu. |

## Properties

| Property      | Attribute     | Modifiers | Type      | Default | Description                                      |
|---------------|---------------|-----------|-----------|---------|--------------------------------------------------|
| `disabled`    | `disabled`    |           | `boolean` | false   | Turns the option off. A disabled option is shown in a muted style and can't be highlighted or selected. |
| `event`       | `event`       |           | `string`  |         | Sets the name of a custom event, such as `custom-flight-search`, that the menu fires instead of selecting the option when someone chooses it. The menu also fires `auroMenu-customEventFired`, with the option in `detail.option`. |
| `iconTag`     |               |           |           |         |                                                  |
| `isActive`    |               | readonly  | `boolean` |         | Checks whether the option can be highlighted and selected: it isn't `hidden`, `disabled`, or `static`, and no menu containing it is disabled. |
| `layout`      |               |           | `string`  |         |                                                  |
| `noCheckmark` | `nocheckmark` |           | `boolean` | false   | Hides the checkmark when this option is selected. Whenever the menu's `nocheckmark` setting changes, the menu copies it onto every option, replacing this value. |
| `noMatch`     | `nomatch`     |           | `boolean` | false   | Marks the option as the "no matching results" row that `auro-combobox` shows when nothing matches what someone typed. |
| `persistent`  | `persistent`  |           | `boolean` | false   | Keeps the option's text as written when the menu highlights `matchword` text. Use it for utility rows, such as "Add new…", that should look the same whatever someone types. |
| `selected`    | `selected`    |           | `boolean` | false   | Deprecated: Use the `value` attribute on `auro-menu`, or call its `selectByValue()` method, instead.<br />Shows whether the option is selected; the menu sets it to match its own selection. Support for setting it on the option will be removed in a future major release. |
| `value`       | `value`       |           | `string`  |         | Sets the value that identifies this option, such as `stops`. The menu's `value` becomes this value when the option is selected. |

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
| `auroMenuOption-click`     | `CustomEvent<this>` | Fires when the option is clicked, unless the option or a menu containing it is disabled. |
| `auroMenuOption-mouseover` | `CustomEvent<this>` | Fires when the pointer moves over the option.    |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | The option's label text. {@requiredWhen always} {@category ui} |
