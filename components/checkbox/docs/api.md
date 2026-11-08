# auro-checkbox

A checkbox that lets people turn one option on or off, usually as one of several choices in an `auro-checkbox-group`.

**Key capabilities**
- **Preselected options**: Set `checked` to show the option as selected when the page loads.
- **Disabled options**: Set `disabled` to stop people from changing the option.
- **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
- **Accessible label**: The checkbox always uses its text content as the name screen readers announce.

**Example**

```html
<auro-checkbox-group>
  <span slot="legend">Seat preferences</span>
  <auro-checkbox value="window" name="seat">Window seat</auro-checkbox>
  <auro-checkbox value="aisle" name="seat">Aisle seat</auro-checkbox>
</auro-checkbox-group>
```

### Properties and attributes

| Properties | Attributes | Modifiers | Type                   | Default   | Category | Required | Description                                                                                                                                                                                                               |
| ---------- | ---------- | --------- | ---------------------- | --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance | appearance |           | `default` \| `inverse` | `default` | ui       |          | Sets the checkbox colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br>Inside an `auro-checkbox-group`, the group's `appearance` replaces this value.                        |
| disabled   | disabled   |           | boolean                |           | ui       |          | Turns the checkbox off, so clicks and the Space key don't change it.<br>A disabled checkbox is shown in a muted style but stays in the keyboard tab order.                                                                |
| onDark     | ondark     |           | boolean                |           | ui       |          | Deprecated: Use `appearance="inverse"` instead.<br>Shows the checkbox in colors made for dark backgrounds.                                                                                                                |
| checked    | checked    |           | boolean                |           | behavior |          | Selects the checkbox and shows a checkmark. Set it in markup to preselect an option.                                                                                                                                      |
| error      | error      |           | boolean                |           | behavior |          | Shows the checkbox in its error style.<br>Inside an `auro-checkbox-group`, the group sets and clears this from its own validation, so set `error` on the group instead.                                                   |
| id         | id         |           | string                 |           | behavior |          | Sets a unique identifier for the checkbox, such as `seat-window` (the `id` attribute).                                                                                                                                    |
| name       | name       |           | string                 |           | behavior |          | Sets the name of the checkbox's inner `<input>` element, such as `seat` (the input's `name`).<br>This doesn't add the checkbox to form data: `auro-form` reads the `name` attribute of the `auro-checkbox-group` instead. |
| value      | value      |           | string                 |           | behavior | Yes      | Sets the value the checkbox adds to the group's selected values when it's checked, such as `window`.<br>Use a value that's unique within the `auro-checkbox-group`.                                                       |

### Methods

| Name     | Parameters                                                    | Return | Description                                                                                         |
| -------- | ------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| register | `name` (string) - The tag name to register the element under. |        | Registers the element with the browser under a tag name.                                            |
| reset    | None                                                          | void   | Resets the checkbox: unchecks it, removes its error style, and marks it as not yet interacted with. |

### Events

| Name                  | Description                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| auroCheckbox-focusin  | Fires when the checkbox gets focus or is clicked.                                              |
| auroCheckbox-focusout | Fires when the checkbox loses focus.                                                           |
| input                 | Fires when someone checks or unchecks the checkbox.                                            |
| auroCheckbox-input    | Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox. |
| change                | Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox. |

### Slots

| Name    | Category | Required | Description                                                                                                   |
| ------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| default | ui       | Yes      | Label text for the checkbox, such as "Window seat". Screen readers announce this text as the checkbox's name. |

### CSS shadow parts

| Name           | Description                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| checkbox       | The container that wraps the checkbox's box and its label.                                                               |
| checkbox-input | The native `<input type="checkbox">` element. It's visually hidden, so styles on this part don't change the visible box. |
| checkbox-label | The element that wraps the label text from the default slot.                                                             |

# auro-checkbox-group

A group of related checkboxes with a shared label that lets people select one or more options and can require at least one choice.

**Key capabilities**
- **Required selection**: Set `required` to show an error when someone leaves the group without checking any option.
- **Custom error messages**: Set `setCustomValidityValueMissing` to replace the error text, or `error` to show an error of your own.
- **Horizontal layout**: Set `horizontal` to place up to three checkboxes side by side.
- **Disable every option**: Set `disabled` to turn off all the checkboxes in the group at once.
- **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.

**Example**

```html
<auro-checkbox-group required>
  <span slot="legend">Seat preferences</span>
  <auro-checkbox value="window" name="seat">Window seat</auro-checkbox>
  <auro-checkbox value="aisle" name="seat">Aisle seat</auro-checkbox>
</auro-checkbox-group>
```

### Properties and attributes

| Properties                    | Attributes                    | Modifiers | Type                   | Default   | Category | Relevant when | Description                                                                                                                                                                                                                                                |
| ----------------------------- | ----------------------------- | --------- | ---------------------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                    | appearance                    |           | `default` \| `inverse` | `default` | ui       |               | Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br>The group passes this value to every checkbox in it.                                                                                      |
| disabled                      | disabled                      |           | boolean                |           | ui       |               | Turns off every checkbox in the group.<br>Removing `disabled` later turns every checkbox back on, including ones you disabled individually.                                                                                                                |
| horizontal                    | horizontal                    |           | boolean                |           | ui       |               | Places the checkboxes side by side on one line.<br>Works for up to three checkboxes; groups with four or more stay stacked vertically.                                                                                                                     |
| onDark                        | ondark                        |           | boolean                |           | ui       |               | Deprecated: Use `appearance="inverse"` instead.<br>Shows the group and its checkboxes in colors made for dark backgrounds.                                                                                                                                 |
| error                         | error                         |           | string                 |           | behavior |               | Shows the group in its error state with this message, such as "Select at least one option".<br>The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message.                       |
| noValidate                    | novalidate                    |           | boolean                |           | behavior |               | Stops the group from validating automatically when focus leaves it or a checkbox changes.<br>To validate the group yourself, call `validate()`. The `error` attribute still applies.                                                                       |
| required                      | required                      |           | boolean                |           | behavior |               | Requires at least one checked checkbox in the group and hides the "(optional)" text after the legend.<br>Unless `noValidate` is set, the group shows an error when focus leaves it with nothing checked, or when someone unchecks the last checked option. |
| setCustomValidity             | setcustomvalidity             |           | string                 |           | behavior |               | Sets one error message for every kind of error, such as "Choose at least one option".<br>It replaces the `error` text and the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages.                                                 |
| setCustomValidityCustomError  | setcustomvaliditycustomerror  |           | string                 |           | behavior | `error`       | Sets the error message shown while the `error` attribute is set, in place of the attribute's own text.<br>`setCustomValidity` takes priority when both are set.                                                                                            |
| setCustomValidityValueMissing | setcustomvalidityvaluemissing |           | string                 |           | behavior | `required`    | Sets the error message shown when the group is `required` and no checkbox is checked, such as "Select at least one option".<br>`setCustomValidity` takes priority when both are set.                                                                       |
| validity                      | validity                      | readonly  | string                 |           | behavior |               | Gets the group's current validation state: `valid`, `valueMissing`, or `customError`.<br>It's `undefined` until the group is first validated.                                                                                                              |

### Methods

| Name     | Parameters                                                                                                                                                                                                                          | Return | Description                                                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| register | `name` (string) - The tag name to register the element under.                                                                                                                                                                       |        | Registers the element with the browser under a tag name.                                                                                                               |
| reset    | None                                                                                                                                                                                                                                | void   | Resets the group: unchecks every checkbox, including ones that started out checked, and clears the validation state.<br>An error set with the `error` attribute stays. |
| validate | `force` (boolean) - If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value. |        | Validates the group and shows an error message if it's invalid.                                                                                                        |

### Events

| Name                      | Description                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| auroFormElement-validated | Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`. |
| input                     | Fires when a checkbox in the group is checked or unchecked, after the group's selected values update.             |

### Slots

| Name          | Category | Required | Relevant when | Description                                                                                                                      |
| ------------- | -------- | -------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| default       | ui       | Yes      |               | The `auro-checkbox` elements in the group.                                                                                       |
| helpText      | ui       |          |               | Help text shown below the group, such as "Select all that apply". While the group shows an error, the error message replaces it. |
| legend        | ui       | Yes      |               | Label for the group, such as "Seat preferences". Screen readers announce it as the group's name.                                 |
| optionalLabel | ui       |          | `!required`   | Text shown after the legend when the group isn't `required`, such as "- optional". Defaults to "(optional)".                     |

### CSS shadow parts

| Name           | Description                                                                            |
| -------------- | -------------------------------------------------------------------------------------- |
| checkbox-group | The `<fieldset>` element that wraps the legend and the checkboxes.                     |
| helpText       | The help text element below the group, which shows the help text or the error message. |