# auro-checkbox-group

The `auro-checkbox-group` element is a wrapper for `auro-checkbox` elements..

## Properties

| Property                        | Attribute                       | Modifiers | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|--------------------------|-------------|--------------------------------------------------|
| `appearance`                    | `appearance`                    |           | `'default' \| 'inverse'` | "'default'" | Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br />The group passes this value to every checkbox in it. |
| `disabled`                      | `disabled`                      |           | `boolean`                |             | Turns off every checkbox in the group.<br />Removing `disabled` later turns every checkbox back on, including ones you disabled individually. |
| `error`                         | `error`                         |           | `string`                 |             | Shows the group in its error state with this message, such as "Select at least one option".<br />The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message. |
| `horizontal`                    | `horizontal`                    |           | `boolean`                |             | Places the checkboxes side by side on one line.<br />Works for up to three checkboxes; groups with four or more stay stacked vertically. |
| `noValidate`                    | `novalidate`                    |           | `boolean`                |             | Stops the group from validating automatically when focus leaves it or a checkbox changes.<br />To validate the group yourself, call `validate()`. The `error` attribute still applies. |
| `onDark`                        | `ondark`                        |           | `boolean`                |             | Deprecated: Use `appearance="inverse"` instead.<br />Shows the group and its checkboxes in colors made for dark backgrounds. |
| `required`                      | `required`                      |           | `boolean`                |             | Requires at least one checked checkbox in the group and hides the "(optional)" text after the legend.<br />The group shows an error when focus leaves it with nothing checked, or when someone unchecks the last checked option. |
| `setCustomValidity`             | `setcustomvalidity`             |           | `string`                 |             | Sets one error message for every kind of error, such as "Choose at least one option".<br />It replaces the `error` text and the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages. |
| `setCustomValidityCustomError`  | `setcustomvaliditycustomerror`  |           | `string`                 |             | Sets the error message shown while the `error` attribute is set, in place of the attribute's own text.<br />`setCustomValidity` takes priority when both are set. |
| `setCustomValidityValueMissing` | `setcustomvalidityvaluemissing` |           | `string`                 |             | Sets the error message shown when the group is `required` and no checkbox is checked, such as "Select at least one option".<br />`setCustomValidity` takes priority when both are set. |
| `validity`                      | `validity`                      | readonly  | `string`                 |             | Gets the group's current validation state: `valid`, `valueMissing`, or `customError`.<br />It's `undefined` until the group is first validated. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets the group: unchecks every checkbox, including ones that started out checked, and clears the validation state.<br />An error set with the `error` attribute stays. |
| `validate` | `(force?: boolean \| undefined): void` | Validates the group and shows an error message if it's invalid.<br /><br />**force**: If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`. |
| `input`                     | `CustomEvent<any>` | Fires when a checkbox in the group is checked or unchecked, after the group's selected values update. |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| `default`       | The `auro-checkbox` elements in the group. {@requiredWhen always} {@category ui} |
| `helpText`      | Help text shown below the group, such as "Select all that apply". While the group shows an error, the error message replaces it. {@category ui} |
| `legend`        | Label for the group, such as "Seat preferences". Screen readers announce it as the group's name. {@requiredWhen always} {@category ui} |
| `optionalLabel` | Text shown after the legend when the group isn't `required`, such as "- optional". Defaults to "(optional)". {@relevantWhen !required} {@category ui} |

## CSS Shadow Parts

| Part             | Description                                      |
|------------------|--------------------------------------------------|
| `checkbox-group` | The `<fieldset>` element that wraps the legend and the checkboxes. |
| `helpText`       | The help text element below the group, which shows the help text or the error message. |


# auro-checkbox

The `auro-checkbox` element is for the purpose of allowing users to select one or more options of a limited number of choices.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| `appearance` | `appearance` | `'default' \| 'inverse'` | "'default'" | Sets the checkbox colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.<br />Inside an `auro-checkbox-group`, the group's `appearance` replaces this value. |
| `checked`    | `checked`    | `boolean`                |             | Selects the checkbox and shows a checkmark. Set it in markup to preselect an option. |
| `disabled`   | `disabled`   | `boolean`                |             | Turns the checkbox off, so clicks and the Space key don't change it.<br />A disabled checkbox is shown in a muted style but stays in the keyboard tab order. |
| `error`      | `error`      | `boolean`                |             | Shows the checkbox in its error style.<br />Inside an `auro-checkbox-group`, the group sets and clears this from its own validation, so set `error` on the group instead. |
| `id`         | `id`         | `string`                 |             | Sets a unique identifier for the checkbox, such as `seat-window` (the `id` attribute). |
| `name`       | `name`       | `string`                 |             | Sets the name of the checkbox's inner `<input>` element, such as `seat` (the input's `name`).<br />This doesn't add the checkbox to form data: `auro-form` reads the `name` attribute of the `auro-checkbox-group` instead. |
| `onDark`     | `ondark`     | `boolean`                |             | Deprecated: Use `appearance="inverse"` instead.<br />Shows the checkbox in colors made for dark backgrounds. |
| `value`      | `value`      | `string`                 |             | Sets the value the checkbox adds to the group's selected values when it's checked, such as `window`.<br />Use a value that's unique within the `auro-checkbox-group`. |

## Methods

| Method  | Type       | Description                                      |
|---------|------------|--------------------------------------------------|
| `reset` | `(): void` | Resets the checkbox: unchecks it, removes its error style, and marks it as not yet interacted with. |

## Events

| Event                   | Type               | Description                                      |
|-------------------------|--------------------|--------------------------------------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` | Fires when the checkbox gets focus or is clicked. |
| `auroCheckbox-focusout` | `CustomEvent<any>` | Fires when the checkbox loses focus.             |
| `auroCheckbox-input`    | `CustomEvent<any>` | Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox. |
| `change`                |                    | Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox. |
| `input`                 |                    | Fires when someone checks or unchecks the checkbox. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Label text for the checkbox, such as "Window seat". Screen readers announce this text as the checkbox's name. {@requiredWhen always} {@category ui} |

## CSS Shadow Parts

| Part             | Description                                      |
|------------------|--------------------------------------------------|
| `checkbox`       | The container that wraps the checkbox's box and its label. |
| `checkbox-input` | The native `<input type="checkbox">` element. It's visually hidden, so styles on this part don't change the visible box. |
| `checkbox-label` | The element that wraps the label text from the default slot. |
