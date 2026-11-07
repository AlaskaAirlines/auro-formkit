# auro-select

The `auro-select` element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property                        | Attribute                       | Type                                             | Default          | Description                                      |
|---------------------------------|---------------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    | `'default' \| 'inverse'`                         | "'default'"      | Sets the colors to match the background behind the select. Use `inverse` on dark backgrounds and `default` on light ones. |
| `autoPlacement`                 | `autoplacement`                 | `boolean`                                        | false            | Deprecated: Use `placement` instead.<br />The bib already flips to the opposite side when it doesn't fit, unless `noFlip` is set. |
| `autocomplete`                  | `autocomplete`                  | `string`                                         |                  | Sets the autofill hint for the hidden native select, such as `country-name` (the native `autocomplete` attribute).<br />Doesn't currently apply when `layout="emphasized"`, which has no hidden native select. |
| `disabled`                      | `disabled`                      | `boolean`                                        |                  | Turns the select off. A disabled select is shown in a muted style and can't be opened, but keyboard users can still tab to it.<br />`auro-form` leaves a disabled select's value out of its form data. |
| `error`                         | `error`                         | `string`                                         |                  | Forces the select into the `customError` state and shows this text as the error message, such as `Choose another option`.<br />When `setCustomValidityCustomError` or `setCustomValidity` is set, that message replaces this text.<br />Remove the attribute to clear the error and validate normally. |
| `flexMenuWidth`                 | `flexmenuwidth`                 | `boolean`                                        |                  | Sizes the bib to fit its options instead of matching the trigger's width. Use it when option text is wider than the trigger.<br />Applies only when `layout="classic"`. |
| `fluid`                         | `fluid`                         | `boolean`                                        |                  | Stretches the select to fill the full width of its container. |
| `forceDisplayValue`             | `forcedisplayvalue`             | `boolean`                                        | false            | Shows the selected option's `displayValue` content in the trigger even while the bib is open, and visually hides the label and value text.<br />Applies only when the selected option has `displayValue` content. |
| `fullscreenBreakpoint`          | `fullscreenbreakpoint`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Sets the largest screen size at which the bib opens as a fullscreen dialog instead of a popover, such as `sm`.<br />Use `disabled` to never open it fullscreen. |
| `largeFullscreenHeadline`       | `largefullscreenheadline`       | `boolean`                                        |                  | Makes the headline in the fullscreen bib larger, using the display heading style. |
| `layout`                        | `layout`                        | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the select's overall look. Use `emphasized` for a large, prominent select on light backgrounds, and `snowflake` only on dark backgrounds with `appearance="inverse"`. |
| `matchWidth`                    | `matchwidth`                    | `boolean`                                        | false            | Makes the bib the same width as the trigger.<br />Applies only when `layout` isn't `classic`; the classic layout always matches the trigger's width unless `flexMenuWidth` is set. |
| `multiSelect`                   | `multiselect`                   | `boolean`                                        |                  | Lets people select more than one option, and keeps the bib open between selections. `value` becomes a JSON array string, such as `["stops","price"]`.<br />Consider checkboxes instead, which make choosing several options easier for everyone, including screen reader users. |
| `name`                          | `name`                          | `string`                                         |                  | Sets the key for the select's value in form data, such as `sortOrder` (the native `name` attribute). |
| `noCheckmark`                   | `nocheckmark`                   | `boolean`                                        |                  | Hides the checkmark next to the selected option.<br />Removing the attribute doesn't currently bring the checkmark back. |
| `noFlip`                        | `noflip`                        | `boolean`                                        | false            | Keeps the bib on the `placement` side even when there isn't enough room there.<br />By default, the bib flips to the opposite side. |
| `noValidate`                    | `novalidate`                    | `boolean`                                        |                  | Turns off automatic validation when the select loses focus or its value changes.<br />Use it when your code validates the select, such as on form submit, by calling `validate()`. |
| `offset`                        | `offset`                        | `number`                                         | "0"              | Sets the gap between the trigger and the bib, in pixels, such as `8`. |
| `onDark`                        | `ondark`                        | `boolean`                                        |                  | Deprecated: Use `appearance="inverse"` instead.<br />Sets the colors for a dark background. |
| `optionSelected`                |                                 | `HTMLElement\|Array<HTMLElement>`                |                  | Gets the selected `<auro-menuoption>` element, or `undefined` when nothing is selected.<br />In `multiSelect` mode, it's an array of the selected options. |
| `placeholder`                   | `placeholder`                   | `string`                                         |                  | Sets the text shown in the trigger before an option is selected, such as `Choose a destination`. |
| `placement`                     | `placement`                     | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Sets where the bib opens relative to the trigger, such as `bottom-start` (below, lined up with the trigger's start edge) or `top`.<br />The bib flips to the opposite side when there isn't enough room, unless `noFlip` is set. |
| `required`                      | `required`                      | `boolean`                                        |                  | Requires a selection. A required select shows the `valueMissing` error when it's left empty, and doesn't show the "(optional)" text after the label. |
| `setCustomValidity`             | `setcustomvalidity`             | `string`                                         |                  | Sets one error message to show for every validation error, such as `Choose a sort order`.<br />When set, it replaces the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages and the `error` text. |
| `setCustomValidityCustomError`  | `setcustomvaliditycustomerror`  | `string`                                         |                  | Sets the error message shown while the `error` attribute is set, in place of the `error` text.<br />Ignored when `setCustomValidity` is set. |
| `setCustomValidityValueMissing` | `setcustomvalidityvaluemissing` | `string`                                         |                  | Sets the error message shown when a `required` select is left empty, such as `Choose a sort order`.<br />Ignored when `setCustomValidity` is set. |
| `shape`                         | `shape`                         | `'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'snowflake'` | "'classic'"      | Sets the shape of the trigger. Use `classic` with the classic layout, `pill`, `pill-left`, or `pill-right` with the emphasized layout, and `snowflake` with the snowflake layout. |
| `shift`                         | `shift`                         | `boolean`                                        | false            | Slides the bib along the trigger's edge to keep it on screen when it would otherwise be cut off.<br />Applies only when `layout="emphasized"`. |
| `size`                          | `size`                          | `'lg' \| 'xl'`                                   | "'lg'"           | Sets the height of the trigger. Use `xl` only with the emphasized layout, and `lg` with the other layouts. |
| `typeaheadTimeoutMs`            | `typeaheadtimeoutms`            | `number`                                         | "500"            | Sets how long, in milliseconds, typed characters keep adding to the type-ahead search before it starts over.<br />Increase it, for example to `1000`, for people who type slowly. |
| `validity`                      | `validity`                      | `string`                                         |                  | Reports the select's current validity state, such as `valid`, `valueMissing`, or `customError`.<br />Validation sets it, and it stays `undefined` until the select first validates. |
| `value`                         | `value`                         | `string`                                         |                  | Sets the selected option by its value, such as `price`. In `multiSelect` mode, it's a JSON array string, such as `["stops","price"]`.<br />A value that matches no option, or matches a `disabled` or `static` option, clears both `value` and `optionSelected`; `hidden` options can still be selected by value. |

## Methods

| Method               | Type                                   | Description                                      |
|----------------------|----------------------------------------|--------------------------------------------------|
| `hideBib`            | `(): void`                             | Closes the bib if it's open.                     |
| `reset`              | `(): void`                             | Clears the selection and the validation state, and marks the select as not yet touched. |
| `setMenuValue`       | `(value: string): void`                | Selects the menu option whose value matches, as setting `value` does.<br />A value that matches no option, or matches a `disabled` or `static` option, clears `value` and `optionSelected`; `hidden` options can still be selected.<br /><br />**value**: The option value to select, such as `price`. |
| `showBib`            | `(): void`                             | Opens the bib if it's closed. Does nothing while the select is disabled. |
| `updateActiveOption` | `(index: number): void`                | Sets the active option, the one keyboard users are on, by its position in the menu.<br /><br />**index**: The zero-based index of the option to make active. |
| `validate`           | `(force?: boolean \| undefined): void` | Checks the selection and updates `validity` and the error message. Runs even when `noValidate` is set.<br /><br />**force**: If true, validates right away, even before the user has interacted with the select. If false, validates only when focus is outside the select and the user has interacted with it or a value is set. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroFormElement-validated` |                                                  | Fires each time the select validates, with the current `validity` and error `message` in `event.detail`. |
| `auroSelect-valueSet`       | `CustomEvent<any>`                               | Fires whenever `value` changes. Use `input` in new code, which also includes the new value. |
| `input`                     | `CustomEvent<{ optionSelected: any; value: any; }>` | Fires whenever `value` changes, with the new `value` and `optionSelected` in `event.detail`. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | The `<auro-menu>` that holds the options. {@requiredWhen always} {@category ui} |
| `ariaLabel.bib.close`     | Text screen readers announce for the close button in the fullscreen bib, such as "Close sort options". Defaults to "Close". {@requiredWhen always} {@category a11y} |
| `bib.fullscreen.headline` | Headline shown above the options in the fullscreen bib, such as "Sort by". {@requiredWhen always} {@category ui} |
| `displayValue`            | Content shown in the trigger in place of the selected option's text while the bib is closed, such as an icon. Put it inside each `<auro-menuoption>` with `slot="displayValue"`, and the select copies the selected option's content here. {@category ui} |
| `helpText`                | Help text shown below the select. An error message replaces it while the select is invalid. {@category ui} |
| `label`                   | Label that names the select. Screen readers announce it as the name of the select and of its option list. {@requiredWhen always} {@category ui} |
| `valueText`               | Doesn't currently show its content. To change how the selected value looks, use the `displayValue` slot instead. {@category ui} |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| `displayValue`    | The container for `displayValue` content in the trigger. |
| `dropdown`        | The inner dropdown element that holds the trigger and the bib. |
| `dropdownChevron` | The container for the arrow icon that shows whether the bib is open. |
| `dropdownSize`    | A hidden element whose `height`, `width`, `max-height`, and `max-width` are copied to the bib. Applies only when the bib matches the trigger's width: in the classic layout unless `flexMenuWidth` is set, and in other layouts when `matchWidth` is set. |
| `dropdownTrigger` | The trigger that shows the label and selected value. Doesn't currently match any element, so styles set on it have no effect. |
| `helpText`        | The help text or error message shown below the select. |
| `wrapper`         | The outermost element inside the select.         |
