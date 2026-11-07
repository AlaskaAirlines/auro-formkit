# auro-radio-group

The `auro-radio-group` element is used to group a set `auro-radio` elements.

## Properties

| Property                        | Attribute                       | Modifiers | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|--------------------------|-------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    |           | `'default' \| 'inverse'` | "'default'" | Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br />The group passes this value to every radio button in it. |
| `disabled`                      | `disabled`                      |           | `boolean`                |             | Turns off every radio button in the group.<br />Removing `disabled` later turns every radio button back on, including ones you disabled individually. |
| `error`                         | `error`                         |           | `string`                 |             | Shows the group in its error state with this message, such as "Select an option".<br />The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message. |
| `horizontal`                    | `horizontal`                    |           | `boolean`                |             | Places the radio buttons side by side on one line.<br />Works for up to three radio buttons; groups with four or more stay stacked vertically. |
| `noValidate`                    | `novalidate`                    |           | `boolean`                |             | Stops the group from validating automatically when focus leaves it or the selection changes.<br />To validate the group yourself, call `validate()`. The `error` attribute still applies. |
| `onDark`                        | `ondark`                        |           | `boolean`                |             | Deprecated: Use `appearance="inverse"` instead.<br />Shows the group and its radio buttons in colors made for dark backgrounds. |
| `optionSelected`                |                                 |           | `HTMLElement`            |             | Gets the selected `auro-radio` element, or `undefined` when nothing is selected. |
| `required`                      | `required`                      |           | `boolean`                |             | Requires a selection in the group and hides the "(optional)" text after the legend.<br />When nothing is selected, the group shows an error after focus leaves it. |
| `setCustomValidity`             | `setcustomvalidity`             |           | `string`                 |             | Sets one error message for every kind of error, such as "Choose an option".<br />It replaces the `error` text and the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages. |
| `setCustomValidityCustomError`  | `setcustomvaliditycustomerror`  |           | `string`                 |             | Sets the error message shown while the `error` attribute is set, in place of the attribute's own text.<br />`setCustomValidity` takes priority when both are set. |
| `setCustomValidityValueMissing` | `setcustomvalidityvaluemissing` |           | `string`                 |             | Sets the error message shown when the group is `required` and nothing is selected, such as "Select an option".<br />The group has no default message, so set this or `setCustomValidity` to show one. `setCustomValidity` takes priority when both are set. |
| `validity`                      | `validity`                      | readonly  | `string`                 |             | Gets the group's current validation state: `valid`, `valueMissing`, or `customError`.<br />It's `undefined` until the group is first validated. |
| `value`                         | `value`                         |           | `string`                 |             | Gets the `value` of the selected radio button, such as `window`.<br />Setting it doesn't select a radio button; set `checked` on the radio button instead. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets the group: unchecks every radio button, including one that started out checked, and clears the value and validation state.<br />An error set with the `error` attribute stays. |
| `validate` | `(force?: boolean \| undefined): void` | Validates the group and shows an error message if it's invalid.<br /><br />**force**: If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`. |
| `input`                     | `CustomEvent<any>` | Fires whenever the group's `value` changes, including when it's set in code or cleared by `reset()`. |

## Slots

| Name      | Description                             |
|-----------|-----------------------------------------|
|           |                                         |
| `default` | The `auro-radio` elements in the group. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `helpText`    | The help text element below the group, which shows the help text or the error message. |
| `radio-group` | The `<fieldset>` element, with `role="radiogroup"`, that wraps the legend and the radio buttons. |


# auro-radio

The `auro-radio` element is used to a button that allows the user to select one option from a set.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` | `'default' \| 'inverse'` | "'default'" | Sets the radio button colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br />Inside an `auro-radio-group`, the group's `appearance` replaces this value. |
| `checked`    | `checked`    | `boolean`                |             | Selects the radio button and fills its circle. Set it in markup to preselect an option. |
| `disabled`   | `disabled`   | `boolean`                |             | Turns the radio button off, so it can't be selected.<br />A disabled radio button is shown in a muted style, and arrow keys skip it. |
| `error`      | `error`      | `boolean`                |             | Shows the radio button in its error style.<br />Inside an `auro-radio-group`, the group sets and clears this from its own validation, so set `error` on the group instead. |
| `id`         | `id`         | `string`                 |             | Sets a unique identifier for the radio button, such as `seat-window` (the `id` attribute). |
| `label`      | `label`      | `string`                 |             | Sets the label text for the radio button, such as "Window seat".<br />Content in the default slot replaces it. |
| `name`       | `name`       | `string`                 |             | Sets the name of the radio button's inner `<input>` element, such as `seat` (the input's `name`).<br />This doesn't group radio buttons or add them to form data: `auro-radio-group` groups them, and `auro-form` reads the group's `name` attribute. |
| `onDark`     | `ondark`     | `boolean`                |             | Deprecated: Use `appearance="inverse"` instead.<br />Shows the radio button in colors made for dark backgrounds. |
| `required`   | `required`   | `boolean`                |             | Tells screen readers that a selection is required, by setting `aria-required`.<br />Inside an `auro-radio-group`, the group sets this from its own `required`, so set `required` on the group instead. |
| `value`      | `value`      | `string`                 |             | Sets the value the group takes when this radio button is selected, such as `window`. |

## Methods

| Method  | Type       | Description                                      |
|---------|------------|--------------------------------------------------|
| `reset` | `(): void` | Resets the radio button: unchecks it, removes its error style, and marks it as not yet interacted with. |

## Events

| Event                | Type               | Description                                      |
|----------------------|--------------------|--------------------------------------------------|
| `auroRadio-blur`     | `CustomEvent<any>` | Fires when the radio button loses focus.         |
| `auroRadio-selected` | `CustomEvent<any>` | Fires when the radio button becomes checked, whether someone selects it or `checked` is set in code. |
| `change`             | `CustomEvent<any>` | Deprecated: Use the `input` event instead. Fires when someone selects the radio button. |
| `focusSelected`      | `CustomEvent<any>` | Fires when the radio button gets focus.          |
| `input`              | `Event`            | Fires when someone selects the radio button.     |
| `resetRadio`         | `CustomEvent<any>` | Fires whenever the radio button's `checked` state changes, including on first render. |
| `toggleSelected`     | `CustomEvent<any>` | Fires when someone selects the radio button. `auro-radio-group` listens for it to update its selection. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `content` | Extra content shown below the label, such as a short description of the option. |
| `default` | Label text for the radio button, such as "Window seat". Replaces the `label` attribute when set. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `radio`       | The container that wraps the radio button's input and label. |
| `radio-input` | The native `<input type="radio">` element. It's visually hidden, so styles on this part don't change the visible circle. |
| `radio-label` | The `<label>` element that holds the label text and draws the visible circle. |
