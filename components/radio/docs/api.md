# auro-radio

A radio button that lets people choose one option from a set, used inside an `auro-radio-group`.

**Key capabilities**
- **Preselected option**: Set `checked` to show the option as selected when the page loads.
- **Disabled option**: Set `disabled` to stop people from selecting the option.
- **Extra description**: Put supporting text in the `content` slot to show it below the label.
- **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.

**Example**

```html
<auro-radio-group>
  <span slot="legend">Seat preference</span>
  <auro-radio value="window" name="seat">Window seat</auro-radio>
  <auro-radio value="aisle" name="seat">Aisle seat</auro-radio>
</auro-radio-group>
```

### Properties and attributes

| Properties | Attributes | Modifiers | Type                   | Default   | Category | Required | Description                                                                                                                                                                                                                                         |
| ---------- | ---------- | --------- | ---------------------- | --------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance | appearance |           | `default` \| `inverse` | `default` | ui       |          | Sets the radio button colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br>Inside an `auro-radio-group`, the group's `appearance` replaces this value each time the group's `appearance` changes.      |
| disabled   | disabled   |           | boolean                |           | ui       |          | Turns the radio button off, so it can't be selected.<br>A disabled radio button is shown in a muted style, and arrow keys skip it.                                                                                                                  |
| label      | label      |           | string                 |           | ui       |          | Sets the label text for the radio button, such as "Window seat".<br>Content in the default slot replaces it.                                                                                                                                        |
| onDark     | ondark     |           | boolean                |           | ui       |          | Deprecated: Use `appearance="inverse"` instead.<br>Shows the radio button in colors made for dark backgrounds.                                                                                                                                      |
| checked    | checked    |           | boolean                |           | behavior |          | Selects the radio button and fills its circle. Set it in markup to preselect an option.                                                                                                                                                             |
| error      | error      |           | boolean                |           | behavior |          | Shows the radio button in its error style.<br>Inside an `auro-radio-group`, the group sets and clears this from its own validation, so set `error` on the group instead.                                                                            |
| id         | id         |           | string                 |           | behavior |          | Sets a unique identifier for the radio button, such as `seat-window` (the `id` attribute).                                                                                                                                                          |
| name       | name       |           | string                 |           | behavior |          | Sets the name of the radio button's inner `<input>` element, such as `seat` (the input's `name`).<br>This doesn't group radio buttons or add them to form data: `auro-radio-group` groups them, and `auro-form` reads the group's `name` attribute. |
| required   | required   |           | boolean                |           | behavior |          | Tells screen readers that a selection is required, by setting `aria-required`.<br>Inside an `auro-radio-group`, the group sets this from its own `required`, so set `required` on the group instead.                                                |
| value      | value      |           | string                 |           | behavior | Yes      | Sets the value the group takes when this radio button is selected, such as `window`.                                                                                                                                                                |

### Methods

| Name     | Parameters                                                    | Return | Description                                                                                             |
| -------- | ------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| register | `name` (string) - The tag name to register the element under. |        | Registers the element with the browser under a tag name.                                                |
| reset    | None                                                          | void   | Resets the radio button: unchecks it, removes its error style, and marks it as not yet interacted with. |

### Events

| Name               | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| auroRadio-blur     | Fires when the radio button loses focus.                                                                |
| auroRadio-selected | Fires when the radio button becomes checked, whether someone selects it or `checked` is set in code.    |
| focusSelected      | Fires when the radio button gets focus.                                                                 |
| input              | Fires when someone selects the radio button.                                                            |
| resetRadio         | Fires whenever the radio button's `checked` state changes, including on first render.                   |
| toggleSelected     | Fires when someone selects the radio button. `auro-radio-group` listens for it to update its selection. |
| change             | Deprecated: Use the `input` event instead. Fires when someone selects the radio button.                 |

### Slots

| Name    | Description                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------ |
| content | Extra content shown below the label, such as a short description of the option.                  |
| default | Label text for the radio button, such as "Window seat". Replaces the `label` attribute when set. |

### CSS shadow parts

| Name        | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| radio       | The container that wraps the radio button's input and label.                                                             |
| radio-input | The native `<input type="radio">` element. It's visually hidden, so styles on this part don't change the visible circle. |
| radio-label | The `<label>` element that holds the label text and draws the visible circle.                                            |

# auro-radio-group

A group of radio buttons with a shared label that lets people choose exactly one option, and can require a choice.

**Key capabilities**
- **One choice at a time**: The group always unchecks the other radio buttons when someone selects one.
- **Required selection**: Set `required` to show an error when someone leaves the group without selecting an option.
- **Custom error messages**: Set `setCustomValidityValueMissing` to show error text, or `error` to show an error of your own.
- **Horizontal layout**: Set `horizontal` to place up to three radio buttons side by side.
- **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.

**Example**

```html
<auro-radio-group required>
  <span slot="legend">Seat preference</span>
  <auro-radio value="window" name="seat">Window seat</auro-radio>
  <auro-radio value="aisle" name="seat">Aisle seat</auro-radio>
</auro-radio-group>
```

### Properties and attributes

| Properties                    | Attributes                    | Modifiers | Type                   | Default   | Category | Relevant when | Description                                                                                                                                                                                                                                                            |
| ----------------------------- | ----------------------------- | --------- | ---------------------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                    | appearance                    |           | `default` \| `inverse` | `default` | ui       |               | Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br>The group passes this value to the radio buttons it contains. Radio buttons you add later don't pick it up until this value changes.                  |
| disabled                      | disabled                      |           | boolean                |           | ui       |               | Turns off every radio button in the group.<br>Removing `disabled` later turns every radio button back on, including ones you disabled individually.                                                                                                                    |
| horizontal                    | horizontal                    |           | boolean                |           | ui       |               | Places the radio buttons side by side on one line.<br>Works for up to three radio buttons; groups with four or more stay stacked vertically.                                                                                                                           |
| onDark                        | ondark                        |           | boolean                |           | ui       |               | Deprecated: Use `appearance="inverse"` instead.<br>Shows the group and its radio buttons in colors made for dark backgrounds.                                                                                                                                          |
| error                         | error                         |           | string                 |           | behavior |               | Shows the group in its error state with this message, such as "Select an option".<br>The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message.                                             |
| noValidate                    | novalidate                    |           | boolean                |           | behavior |               | Stops the group from validating automatically when focus leaves it or the selection changes.<br>To validate the group yourself, call `validate(true)`, which checks right away, even before anyone has interacted with the group. The `error` attribute still applies. |
| optionSelected                |                               |           | HTMLElement            |           | behavior |               | Gets the selected `auro-radio` element, or `undefined` when nothing is selected.                                                                                                                                                                                       |
| required                      | required                      |           | boolean                |           | behavior |               | Requires a selection in the group and hides the "(optional)" text after the legend.<br>Unless `noValidate` is set, the group shows an error when focus leaves it with nothing selected.                                                                                |
| setCustomValidity             | setcustomvalidity             |           | string                 |           | behavior |               | Sets one error message for every kind of error, such as "Choose an option".<br>It replaces the `error` text and the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages.                                                                       |
| setCustomValidityCustomError  | setcustomvaliditycustomerror  |           | string                 |           | behavior | `error`       | Sets the error message shown while the `error` attribute is set, in place of the attribute's own text.<br>`setCustomValidity` takes priority when both are set.                                                                                                        |
| setCustomValidityValueMissing | setcustomvalidityvaluemissing |           | string                 |           | behavior | `required`    | Sets the error message shown when the group is `required` and nothing is selected, such as "Select an option".<br>The group has no default message, so set this or `setCustomValidity` to show one. `setCustomValidity` takes priority when both are set.              |
| validity                      | validity                      | readonly  | string                 |           | behavior |               | Gets the group's current validation state: `valid`, `valueMissing`, or `customError`.<br>It's `undefined` until the group is first validated.                                                                                                                          |
| value                         | value                         |           | string                 |           | behavior |               | Gets the `value` of the selected radio button, such as `window`.<br>Setting it doesn't select a radio button; set `checked` on the radio button instead.                                                                                                               |

### Methods

| Name     | Parameters                                                                                                                                                                                                                          | Return | Description                                                                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| register | `name` (string) - The tag name to register the element under.                                                                                                                                                                       |        | Registers the element with the browser under a tag name.                                                                                                                            |
| reset    | None                                                                                                                                                                                                                                | void   | Resets the group: unchecks every radio button, including one that started out checked, and clears the value and validation state.<br>An error set with the `error` attribute stays. |
| validate | `force` (boolean) - If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value. |        | Validates the group and shows an error message if it's invalid.                                                                                                                     |

### Events

| Name                      | Description                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| auroFormElement-validated | Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`. |
| input                     | Fires whenever the group's `value` changes, including when it's set in code or cleared by `reset()`.              |

### Slots

| Name          | Category | Required | Relevant when | Description                                                                                                               |
| ------------- | -------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| helpText      | ui       |          |               | Help text shown below the group, such as "Choose one". While the group shows an error, the error message replaces it.     |
| legend        | ui       | Yes      |               | Label for the group, such as "Seat preference". Screen readers announce it as the group's name.                           |
| optionalLabel | ui       |          | `!required`   | Text shown after the legend when the group isn't `required`, such as a translated "(optional)". Defaults to "(optional)". |
| default       |          |          |               | The `auro-radio` elements in the group.                                                                                   |

### CSS shadow parts

| Name        | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| helpText    | The help text element below the group, which shows the help text or the error message.           |
| radio-group | The `<fieldset>` element, with `role="radiogroup"`, that wraps the legend and the radio buttons. |