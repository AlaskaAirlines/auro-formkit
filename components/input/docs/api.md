# auro-input

Generate unique names for dependency components.

## Attributes

| Attribute    | Type      | Description                    |
|--------------|-----------|--------------------------------|
| `bordered`   | `Boolean` | Applies bordered UI variant.   |
| `borderless` | `Boolean` | Applies borderless UI variant. |

## Properties

| Property                          | Attribute                         | Type      | Default     | Description                                      |
|-----------------------------------|-----------------------------------|-----------|-------------|--------------------------------------------------|
| `activeLabel`                     | `activeLabel`                     | `boolean` | false       | If set, the label will remain fixed in the active position. |
| `autocapitalize`                  | `autocapitalize`                  | `string`  |             | An enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user. [off/none, on/sentences, words, characters]. |
| `autocomplete`                    | `autocomplete`                    | `string`  |             | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| `autocorrect`                     | `autocorrect`                     | `string`  |             | When set to `off`, stops iOS from auto-correcting words when typed into a text box. |
| `customValidityTypeEmail`         | `customValidityTypeEmail`         | `string`  |             | Custom help text message for email type validity. |
| `disabled`                        | `disabled`                        | `boolean` | false       | If set, disables the input.                      |
| `error`                           | `error`                           | `string`  |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `errorMessage`                    | `errorMessage`                    | `string`  |             | Contains the help text message for the current validity error. |
| `format`                          | `format`                          | `string`  |             | Specifies the input mask format.                 |
| `icon`                            | `icon`                            | `boolean` | false       | If set, will render an icon inside the input to the left of the value. Support is limited to auro-input instances with credit card format. |
| `id`                              | `id`                              | `string`  |             | Sets the unique ID of the element.               |
| `lang`                            | `lang`                            | `string`  |             | Defines the language of an element.              |
| `max`                             | `max`                             | `string`  | "undefined" | The maximum value allowed. This only applies for inputs with a type of `number` and all date formats. |
| `maxLength`                       | `maxLength`                       | `number`  | "undefined" | The maximum number of characters the user can enter into the text input. This must be an integer value `0` or higher. |
| `min`                             | `min`                             | `string`  | "undefined" | The minimum value allowed. This only applies for inputs with a type of `number` and all date formats. |
| `minLength`                       | `minLength`                       | `number`  | "undefined" | The minimum number of characters the user can enter into the text input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. |
| `name`                            | `name`                            | `string`  |             | Populates the `name` attribute on the input.     |
| `noValidate`                      | `noValidate`                      | `boolean` | false       | If set, disables auto-validation on blur.        |
| `onDark`                          | `onDark`                          | `boolean` | false       | Sets onDark styles on input.                     |
| `pattern`                         | `pattern`                         | `string`  |             | Specifies a regular expression the form control's value should match. |
| `placeholder`                     | `placeholder`                     | `string`  |             | Define custom placeholder text, only supported by date input formats. |
| `readonly`                        | `readonly`                        | `boolean` |             | Makes the input read-only, but can be set programmatically. |
| `required`                        | `required`                        | `boolean` | false       | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`               | `setCustomValidity`               | `string`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityBadInput`       | `setCustomValidityBadInput`       | `string`  |             | Custom help text message to display when validity = `badInput`. |
| `setCustomValidityCustomError`    | `setCustomValidityCustomError`    | `string`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityForType`        | `setCustomValidityForType`        | `string`  | "undefined" | Custom help text message to display for the declared element `type` and type validity fails. |
| `setCustomValidityRangeOverflow`  | `setCustomValidityRangeOverflow`  | `string`  |             | Custom help text message to display when validity = `rangeOverflow`. |
| `setCustomValidityRangeUnderflow` | `setCustomValidityRangeUnderflow` | `string`  |             | Custom help text message to display when validity = `rangeUnderflow`. |
| `setCustomValidityTooLong`        | `setCustomValidityTooLong`        | `string`  |             | Custom help text message to display when validity = `tooLong`. |
| `setCustomValidityTooShort`       | `setCustomValidityTooShort`       | `string`  |             | Custom help text message to display when validity = `tooShort`. |
| `setCustomValidityValueMissing`   | `setCustomValidityValueMissing`   | `string`  |             | Custom help text message to display when validity = `valueMissing`. |
| `spellcheck`                      | `spellcheck`                      | `string`  |             | An enumerated attribute defines whether the element may be checked for spelling errors. [true, false]. When set to `false` the attribute `autocorrect` is set to `off` and `autocapitalize` is set to `none`. |
| `type`                            | `type`                            | `string`  |             | Populates the `type` attribute on the input. Allowed values are `password`, `email`, `credit-card`, `date`, `tel` or `text`. If given value is not allowed or set, defaults to `text`. |
| `validateOnInput`                 | `validateOnInput`                 | `boolean` |             | Sets validation mode to re-eval with each input. |
| `validity`                        | `validity`                        | `string`  |             | Specifies the `validityState` this element is in. |
| `value`                           | `value`                           | `string`  |             | Populates the `value` attribute on the input. Can also be read to retrieve the current value of the input. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` value has changed. |
| `auroInput-validityChange`  | `CustomEvent<any>` |                                                  |
| `input`                     |                    | Event fires when the value of an `auro-input` has been changed. |

## Slots

| Name       | Description                                   |
|------------|-----------------------------------------------|
| `helptext` | Sets the help text displayed below the input. |
| `label`    | Sets the label text for the input.            |

## CSS Shadow Parts

| Part            | Description                                      |
|-----------------|--------------------------------------------------|
| `accentIcon`    | Use for customizing the style of the accentIcon element (e.g. credit card icon, calendar icon) |
| `helpText`      | Use for customizing the style of the helpText element |
| `iconContainer` | Use for customizing the style of the iconContainer (e.g. X icon for clearing input value) |
| `label`         | Use for customizing the style of the label element |
| `wrapper`       | Use for customizing the style of the root element |
