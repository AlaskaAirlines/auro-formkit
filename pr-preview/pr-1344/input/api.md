<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-input

The `auro-input` element provides users a way to enter data into a text field.

## Properties

| Property                          | Attribute                         | Type                                             | Default     | Description                                      |
|-----------------------------------|-----------------------------------|--------------------------------------------------|-------------|--------------------------------------------------|
| `a11yControls`                    | `a11yControls`                    | `string`                                         |             | The value for the aria-controls attribute.       |
| `a11yExpanded`                    | `a11yExpanded`                    | `boolean`                                        |             | The value for the aria-expanded attribute.       |
| `a11yRole`                        | `a11yRole`                        | `string`                                         |             | The value for the role attribute.                |
| [activeLabel](#activeLabel)                     | `activeLabel`                     | `boolean`                                        |             | If set, the label will remain fixed in the active position. |
| [appearance](#appearance)                      | `appearance`                      | `'default' \| 'inverse'`                         | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [autocapitalize](#autocapitalize)                  | `autocapitalize`                  | `string`                                         |             | An enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user. [off/none, on/sentences, words, characters]. |
| [autocomplete](#autocomplete)                    | `autocomplete`                    | `string`                                         |             | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| [autocorrect](#autocorrect)                     | `autocorrect`                     | `string`                                         |             | When set to `off`, stops iOS from auto-correcting words when typed into a text box. |
| [customValidityTypeEmail](#customValidityTypeEmail)         | `customValidityTypeEmail`         | `string`                                         |             | Custom help text message for email type validity. |
| [disabled](#disabled)                        | `disabled`                        | `boolean`                                        | false       | If set, disables the input.                      |
| [dvInputOnly](#dvInputOnly)                     | `dvInputOnly`                     | `boolean`                                        |             | If defined, the display value slot content will only mask the HTML5 input element. The input's label will not be masked. |
| [error](#error)                           | `error`                           | `string`                                         |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| [errorMessage](#errorMessage)                    | `errorMessage`                    | `string`                                         |             | Contains the help text message for the current validity error. |
| [format](#format)                          | `format`                          | `string`                                         |             | Specifies the input mask format.                 |
| [hasFocus](#hasFocus)                        |                                   | `boolean`                                        |             | Flag to indicate if the input currently has focus. |
| [hasValue](#hasValue)                        |                                   | `boolean`                                        |             | Flag to indicate if the input currently has value. |
| [icon](#icon)                            | `icon`                            | `boolean`                                        |             | If set, will render an icon inside the input to the left of the value. Support is limited to auro-input instances with credit card format. |
| [id](#id)                              | `id`                              | `string`                                         |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| [inputmode](#inputmode)                       | `inputmode`                       | `string`                                         |             | Exposes inputmode attribute for input.           |
| [lang](#lang)                            | `lang`                            | `string`                                         |             | Defines the language of an element.              |
| [layout](#layout)                          |                                   | `string`                                         | "classic"   |                                                  |
| [locale](#locale)                          | `locale`                          | `string`                                         | "en-US"     | Defines the locale of an element.<br />Used for locale-specific formatting, such as date formats. |
| [max](#max)                             | `max`                             | `string`                                         | "undefined" | The maximum value allowed. This only applies for inputs with a type of `number` and all date formats. |
| [maxLength](#maxLength)                       | `maxLength`                       | `number`                                         | "undefined" | The maximum number of characters the user can enter into the text input. This must be an integer value `0` or higher.<br />**Note**: This attribute is not intended to be used with a `type` or `format` that already has a defined length, such as credit-cards, dates or phone numbers. |
| [min](#min)                             | `min`                             | `string`                                         | "undefined" | The minimum value allowed. This only applies for inputs with a type of `number` and all date formats. |
| [minLength](#minLength)                       | `minLength`                       | `number`                                         | "undefined" | The minimum number of characters the user can enter into the text input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. |
| [name](#name)                            | `name`                            | `string`                                         |             | Populates the `name` attribute on the input.     |
| [nested](#nested)                          | `nested`                          | `boolean`                                        |             | Sets styles for nested operation - removes borders, hides help + error text, and<br />hides accents. |
| [noValidate](#noValidate)                      | `noValidate`                      | `boolean`                                        |             | If set, disables auto-validation on blur.        |
| [onDark](#onDark)                          | `onDark`                          | `boolean`                                        | false       | DEPRECATED - use `appearance="inverse"` instead. |
| [pattern](#pattern)                         | `pattern`                         | `string`                                         |             | Specifies a regular expression the form control's value should match. |
| [placeholder](#placeholder)                     | `placeholder`                     | `string`                                         |             | Define custom placeholder text.                  |
| [readonly](#readonly)                        | `readonly`                        | `boolean`                                        |             | Makes the input read-only, but can be set programmatically. |
| [required](#required)                        | `required`                        | `boolean`                                        | false       | Populates the `required` attribute on the input. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)               | `setCustomValidity`               | `string`                                         |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityBadInput](#setCustomValidityBadInput)       | `setCustomValidityBadInput`       | `string`                                         |             | Custom help text message to display when validity = `badInput`. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)    | `setCustomValidityCustomError`    | `string`                                         |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityForType](#setCustomValidityForType)        | `setCustomValidityForType`        | `string`                                         | "undefined" | Custom help text message to display for the declared element `type` and type validity fails. |
| [setCustomValidityRangeOverflow](#setCustomValidityRangeOverflow)  | `setCustomValidityRangeOverflow`  | `string`                                         |             | Custom help text message to display when validity = `rangeOverflow`. |
| [setCustomValidityRangeUnderflow](#setCustomValidityRangeUnderflow) | `setCustomValidityRangeUnderflow` | `string`                                         |             | Custom help text message to display when validity = `rangeUnderflow`. |
| [setCustomValidityTooLong](#setCustomValidityTooLong)        | `setCustomValidityTooLong`        | `string`                                         |             | Custom help text message to display when validity = `tooLong`. |
| [setCustomValidityTooShort](#setCustomValidityTooShort)       | `setCustomValidityTooShort`       | `string`                                         |             | Custom help text message to display when validity = `tooShort`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing)   | `setCustomValidityValueMissing`   | `string`                                         |             | Custom help text message to display when validity = `valueMissing`. |
| [shape](#shape)                           |                                   | `string`                                         | "classic"   |                                                  |
| [simple](#simple)                          | `simple`                          | `boolean`                                        |             | Simple makes the input render without a border.  |
| [size](#size)                            |                                   | `string`                                         | "lg"        |                                                  |
| [spellcheck](#spellcheck)                      | `spellcheck`                      | `string`                                         |             | An enumerated attribute defines whether the element may be checked for spelling errors. [true, false]. When set to `false` the attribute `autocorrect` is set to `off` and `autocapitalize` is set to `none`. |
| [type](#type)                            | `type`                            | `'text' \| 'password' \| 'email' \| 'credit-card' \| 'tel' \| 'number'` | "'text'"    | Populates the `type` attribute on the input.     |
| [validateOnInput](#validateOnInput)                 | `validateOnInput`                 | `boolean`                                        |             | Sets validation mode to re-eval with each input. |
| [validity](#validity)                        | `validity`                        | `string`                                         |             | Specifies the `validityState` this element is in. |
| [value](#value)                           | `value`                           | `string`                                         |             | Populates the `value` attribute on the input. Can also be read to retrieve the current value of the input. |

## Methods

| Method                 | Type                                             | Description                                      |
|------------------------|--------------------------------------------------|--------------------------------------------------|
| [clear](#clear)                | `(): void`                                       | Clears the input value.                          |
| [closestWithAttribute](#closestWithAttribute) | `(startNode: Node, attrName: string): Element\|null` | MOVE THIS TO AURO-LIBRARY ???<br />Walk up the DOM (including Shadow DOM boundaries) to find<br />the closest ancestor with a given attribute.<br /><br />**startNode**: The node to start from<br />**attrName**: Attribute name to match |
| [focus](#focus)                | `(): void`                                       | Function to set element focus.                   |
| [reset](#reset)                | `(): void`                                       | Resets component to initial state, including resetting the touched state and validity. |
| [setLocale](#setLocale)            | `(): void`                                       | If the locale wasn't set via attribute,<br />look for the closest `data-locale` attribute in the DOM and use that.<br />If none is found, default to 'en-US'. |
| [validate](#validate)             | `(force?: boolean \| undefined): void`           | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` value has changed. |
| `auroInput-validityChange`  | `CustomEvent<any>` |                                                  |
| [input](#input)                     | `InputEvent`       | Event fires when the value of an `auro-input` has been changed. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| `ariaLabel.clear`         | Sets aria-label on clear button for screen reader to read |
| `ariaLabel.password.hide` | Sets aria-label on password button to toggle off showing password |
| `ariaLabel.password.show` | Sets aria-label on password button to toggle on showing password |
| [displayValue](#displayValue)            | Allows custom HTML content to display in place of the value when the input is not focused. |
| [helpText](#helpText)                | Sets the help text displayed below the input.    |
| [label](#label)                   | Sets the label text for the input.               |
| [optionalLabel](#optionalLabel)           | Allows overriding the optional display text "(optional)", which appears next to the label. |

## CSS Shadow Parts

| Part            | Description                                      |
|-----------------|--------------------------------------------------|
| `accent-left`   | Use for customizing the style of the left accent element (e.g. padding, margin) |
| `accent-right`  | Use for customizing the style of the right accent element (e.g. padding, margin) |
| [accentIcon](#accentIcon)    | Use for customizing the style of the accentIcon element (e.g. credit card icon, calendar icon) |
| [displayValue](#displayValue)  | Use for customizing the style of the displayValue element |
| [helpText](#helpText)      | Use for customizing the style of the helpText element |
| [iconContainer](#iconContainer) | Use for customizing the style of the iconContainer (e.g. X icon for clearing input value) |
| [input](#input)         | Use for customizing the style of the input element |
| [inputHelpText](#inputHelpText) | Use for customizing the style of the input help text wrapper |
| [label](#label)         | Use for customizing the style of the label element |
| [wrapper](#wrapper)       | Use for customizing the style of the root element |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-input type="date" locale="en-GB">
    <span slot="ariaLabel.clear">Clear All</span>
    <span slot="label">GB Date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <auro-input type="date" locale="en-US">
    <span slot="ariaLabel.clear">Clear All</span>
    <span slot="label">US Date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <auro-input type="date">
    <span slot="ariaLabel.clear">Clear All</span>
    <span slot="label">Closest Locale Date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-input type="date" locale="en-GB">
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">GB Date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
<auro-input type="date" locale="en-US">
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">US Date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
<auro-input type="date">
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">Closest Locale Date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Active Label

Use the `activeLabel` attribute to make the label stay fixed in the active position.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/active-label.html) -->
  <!-- The below content is automatically added from ../apiExamples/active-label.html -->
  <auro-input activeLabel>
    <span slot="label">Address</span>
    <span slot="helpText">Please enter your home address.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/active-label.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/active-label.html -->

```html
<auro-input activeLabel>
  <span slot="label">Address</span>
  <span slot="helpText">Please enter your home address.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Appearance on Dark Backgrounds

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-input appearance="inverse">
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-input appearance="inverse">
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disable` attribute to prevent the user from interacting with the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-input disabled type="date">
    <span slot="label">Disabled</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-input disabled type="date">
  <span slot="label">Disabled</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-input appearance="inverse" disabled type="date">
    <span slot="label">Arrival date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->

```html
<auro-input appearance="inverse" disabled type="date">
  <span slot="label">Arrival date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to apply a persistent custom error that supersedes the HTML5 validation logic.

A custom error message can be set using the `error` attribute, or it can be used in conjuction with the `setCustomValidityCustomError` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/error.html) -->
  <!-- The below content is automatically added from ../apiExamples/error.html -->
  <auro-button id="setCustomErrorBtn">Set Custom Error</auro-button>
  <auro-button id="setCustomErrorClearBtn">Clear Custom Error</auro-button>
  <br /><br />
  <auro-input id="setCustomErrorExample" error="Initial error attribute value">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.html -->

```html
<auro-button id="setCustomErrorBtn">Set Custom Error</auro-button>
<auro-button id="setCustomErrorClearBtn">Clear Custom Error</auro-button>
<br /><br />
<auro-input id="setCustomErrorExample" error="Initial error attribute value">
  <span slot="label">Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.js -->

```js
export function customError() {
  const elem = document.querySelector('#setCustomErrorExample');
  // set custom error
  document.querySelector('#setCustomErrorBtn').addEventListener('click', () => {
    elem.error = "Custom Error Message";
  });

  // remove custom error
  document.querySelector('#setCustomErrorClearBtn').addEventListener('click', () => {
    elem.removeAttribute('error');
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ../apiExamples/appearance-inverse-error.html -->
  <auro-button appearance="inverse" id="setCustomErrorBtnOnDark">Set Custom Error</auro-button>
  <auro-button appearance="inverse" id="setCustomErrorClearBtnOnDark">Clear Custom Error</auro-button>
  <br /><br />
  <auro-input appearance="inverse" id="setCustomErrorExampleOnDark" error="Initial error attribute value">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/appearance-inverse-error.html -->

```html
<auro-button appearance="inverse" id="setCustomErrorBtnOnDark">Set Custom Error</auro-button>
<auro-button appearance="inverse" id="setCustomErrorClearBtnOnDark">Clear Custom Error</auro-button>
<br /><br />
<auro-input appearance="inverse" id="setCustomErrorExampleOnDark" error="Initial error attribute value">
  <span slot="label">Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/appearance-inverse-error.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/appearance-inverse-error.js -->

```js
export function customErrorOnDark() {
  const elem = document.querySelector('#setCustomErrorExampleOnDark');
  // set custom error
  document.querySelector('#setCustomErrorBtnOnDark').addEventListener('click', () => {
    elem.error = "Custom Error Message";
  });

  // remove custom error
  document.querySelector('#setCustomErrorClearBtnOnDark').addEventListener('click', () => {
    elem.removeAttribute('error');
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Format <a name="format"></a>
Use the `format` attribute to set the format of the IMask. 

Default masking definitions:
- 0 : number
- a : letter
- \* : any character

See [IMask](https://imask.js.org/) for more information on how to configure a mask.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/format.html) -->
  <!-- The below content is automatically added from ../apiExamples/format.html -->
  <auro-input format="47440000">
    <span slot="label">Custom format</span>
    <span slot="helpText">Format is: 47440000</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/format.html -->

```html
<auro-input format="47440000">
  <span slot="label">Custom format</span>
  <span slot="helpText">Format is: 47440000</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Input Mode

Set the `inputmode` for the input.

**IMPORTANT**: If you are also passing a `type`, most browsers will use the `type` attribute to determine what keyboard to display on mobile devices and ignore the `inputmode` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
  <auro-input inputmode="tel">
    <span slot="label">Telephone</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

```html
<auro-input inputmode="tel">
  <span slot="label">Telephone</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Max

Use the `max` attribute to define a maximum value used during validation. The attribute will only apply when `<auro-input>` also has a `type` attribute for `number` or any date format.

The `setCustomValidityRangeOverflow` attribute may optionally be used in combination with the `max` attribute to define custom help text used when the input value is greater than the value of the `max` attribute.

#### Date Example

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-date.html) -->
  <!-- The below content is automatically added from ../apiExamples/max-date.html -->
  <auro-input type="date" max="03/25/2023" setCustomValidityRangeOverflow="The selected date is past the defined maximum date.">
    <span slot="label">Choose a date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-date.html -->

```html
<auro-input type="date" max="03/25/2023" setCustomValidityRangeOverflow="The selected date is past the defined maximum date.">
  <span slot="label">Choose a date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Number Example

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-number.html) -->
  <!-- The below content is automatically added from ../apiExamples/max-number.html -->
  <auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum.">
    <span slot="label">Choose a number</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-number.html -->

```html
<auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum.">
  <span slot="label">Choose a number</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Max Length

Use the `maxlength` attribute to control the length of the input entered.

The `setCustomValidityTooLong` attribute may optionally be used in combination with the `maxLength` attribute to define custom help text used when the length of the input is too long.

**Note**: This attribute is not intended to be used with a `type` or `format` that already has a defined length, such as credit-cards, dates or phone numbers.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-length.html) -->
  <!-- The below content is automatically added from ../apiExamples/max-length.html -->
  <auro-input maxlength="12" setCustomValidityTooLong="Oops! There were too many characters entered." required>
    <span slot="label">Voucher Code</span>
    <span slot="helpText">Please enter your 12 character voucher code.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-length.html -->

```html
<auro-input maxlength="12" setCustomValidityTooLong="Oops! There were too many characters entered." required>
  <span slot="label">Voucher Code</span>
  <span slot="helpText">Please enter your 12 character voucher code.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Min <a name="min"></a>
Use the `min` attribute to define a minimum value used during validation. The attribute will only apply when `<auro-input>` also has a `type` attribute for `number` or any date format.

The `setCustomValidityRangeUnderflow` attribute may optionally be used in combination with the `min` attribute to define custom help text used when the input value is less than the value of the `min` attribute.

#### Date Example

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-date.html) -->
  <!-- The below content is automatically added from ../apiExamples/min-date.html -->
  <auro-input type="date" min="03/25/2023" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date.">
    <span slot="label">Choose a date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-date.html -->

```html
<auro-input type="date" min="03/25/2023" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date.">
  <span slot="label">Choose a date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Number Example

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-number.html) -->
  <!-- The below content is automatically added from ../apiExamples/min-number.html -->
  <auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum.">
    <span slot="label">Choose a number</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-number.html -->

```html
<auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum.">
  <span slot="label">Choose a number</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Min Length

Use the `minlength` attribute to control the length of the input entered.

The `setCustomValidityTooShort` attribute may optionally be used in combination with the `minLength` attribute to define custom help text used when the length of the input is not long enough.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-length.html) -->
  <!-- The below content is automatically added from ../apiExamples/min-length.html -->
  <auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required>
    <span slot="label">Voucher Code</span>
    <span slot="helpText">Please enter your 4 character voucher code.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-length.html -->

```html
<auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required>
  <span slot="label">Voucher Code</span>
  <span slot="helpText">Please enter your 4 character voucher code.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### No Validate

For use cases where the field is `required`, but live validation is not wanted, use the `noValidate` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/no-validate.html) -->
  <!-- The below content is automatically added from ../apiExamples/no-validate.html -->
  <auro-input noValidate required>
    <span slot="label">Address</span>
    <span slot="helpText">Please enter your home address.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/no-validate.html -->

```html
<auro-input noValidate required>
  <span slot="label">Address</span>
  <span slot="helpText">Please enter your home address.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Pattern <a name="pattern"></a>
Use the `pattern` attribute to set custom input validation. This example also uses the `spellcheck` attribute set to `false` which in turn sets `autocorrect` to `off` and `autocapitalize` to `none`. Additionally the `maxlength` attribute sets the maximum length of characters that can be entered.

The `<auro-input>` component supports setting a custom validity message specific to the pattern validation by using the `setCustomValidityPatternMismatch` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/pattern.html) -->
  <!-- The below content is automatically added from ../apiExamples/pattern.html -->
  <auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Only contain lowercase letters w/no spaces">
    <span slot="label">Username</span>
    <span slot="helpText">Please enter a username.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/pattern.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/pattern.html -->

```html
<auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Only contain lowercase letters w/no spaces">
  <span slot="label">Username</span>
  <span slot="helpText">Please enter a username.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Placeholder

Use the `placeholder` attribute to add a custom placeholder message within the element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placeholder.html) -->
  <!-- The below content is automatically added from ../apiExamples/placeholder.html -->
  <auro-input placeholder="John Doe" required>
    <span slot="label">Full name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/placeholder.html -->

```html
<auro-input placeholder="John Doe" required>
  <span slot="label">Full name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Readonly

Use the `readonly` attribute to prevent the user from editing the value of the input.

In this example, the user is able to programmatically change the value of the input by clicking the button or clear out the contents of the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/readonly.html) -->
  <!-- The below content is automatically added from ../apiExamples/readonly.html -->
  <auro-button id="setReadonlyValueBtn">Set Value to Auro Alaska</auro-button>
  <auro-button id="resetReadonlyValueBtn">Reset</auro-button>
  <br /><br />
  <auro-input readonly id="readonlyExample">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.html -->

```html
<auro-button id="setReadonlyValueBtn">Set Value to Auro Alaska</auro-button>
<auro-button id="resetReadonlyValueBtn">Reset</auro-button>
<br /><br />
<auro-input readonly id="readonlyExample">
  <span slot="label">Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.js -->

```js
export function setReadonlyValue() {
  const elem = document.querySelector('#readonlyExample');

  // set value of auro-input element
  document.querySelector('#setReadonlyValueBtn').addEventListener('click', () => {
      elem.value = "Auro Alaska";
  });

  document.querySelector('#resetReadonlyValueBtn').addEventListener('click', () => {
    elem.value = undefined;
});
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Required

When present, the `required` attribute specifies that an input field must be filled out before submitting the form.

When the validity check fails, the validityState equals `valueMissing`. The error message for the `valueMissing` validityState can be changed to a custom string using the `setCustomValidityValueMissing`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/required.html) -->
  <!-- The below content is automatically added from ../apiExamples/required.html -->
  <auro-input required placeholder="John Doe">
    <span slot="label">Full name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/required.html -->

```html
<auro-input required placeholder="John Doe">
  <span slot="label">Full name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Set Custom Validity

The `setCustomValidity` attribute can be used to set a custom string for all validityStates. When the component is first loaded, if this attribute is set on the element, all validityStates (except `valid`) will display the defined message.

**NOTE:** Custom strings are NOT localized. It is the responsibility of the element consumer to provide localized strings when using this element property.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity.html) -->
  <!-- The below content is automatically added from ../apiExamples/set-custom-validity.html -->
  <auro-input required minlength="3" setCustomValidity="Sorry, please enter your first and last name (one space required).">
    <span slot="label">Full Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity.html -->

```html
<auro-input required minlength="3" setCustomValidity="Sorry, please enter your first and last name (one space required).">
  <span slot="label">Full Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Type

#### Password

Use the `type="password"` attribute for a password style input. The hide/show password feature will automatically appear once a user begins to enter data.

Default help text will be added to the input `type="password"` if custom help text is not provided. See the example below.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/password.html) -->
  <!-- The below content is automatically added from ../apiExamples/password.html -->
  <auro-input type="password" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <span slot="ariaLabel.password.show">Show</span>
    <span slot="ariaLabel.password.hide">Hide</span>
    <span slot="label">Password</span>
    <span slot="helpText">Please enter a secure password.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/password.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/password.html -->

```html
<auro-input type="password" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="ariaLabel.password.show">Show</span>
  <span slot="ariaLabel.password.hide">Hide</span>
  <span slot="label">Password</span>
  <span slot="helpText">Please enter a secure password.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/appearance-inverse-password.html) -->
  <!-- The below content is automatically added from ../apiExamples/appearance-inverse-password.html -->
  <auro-input appearance="inverse" type="password" required>
    <span slot="label">Password</span>
    <span slot="helpText">Please enter a secure password.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/appearance-inverse-password.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/appearance-inverse-password.html -->

```html
<auro-input appearance="inverse" type="password" required>
  <span slot="label">Password</span>
  <span slot="helpText">Please enter a secure password.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Email

Use the `type="email"` attribute for a email style input. These examples illustrate the default error messaging per that browser. Content may vary.

Default help text will be added to the input `type="email"` if custom help text is not provided. See the example below.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/email.html) -->
  <!-- The below content is automatically added from ../apiExamples/email.html -->
  <auro-input type="email" required>
    <span slot="label">Email address</span>
    <span slot="helpText">Please enter your email address.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/email.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/email.html -->

```html
<auro-input type="email" required>
  <span slot="label">Email address</span>
  <span slot="helpText">Please enter your email address.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Number

Use the `type="number"` attribute for a numeric style input and invoke a numeric virtual keyboard on handheld devices.

This `number` input type should only be used for incremental numeric values, meaning values with decimals will be considered invalid. The `number` input type is not appropriate for values that happen to only consist of but aren't strictly speaking a number, such as postal codes in many countries or credit card numbers. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) for more information.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/number.html) -->
  <!-- The below content is automatically added from ../apiExamples/number.html -->
  <auro-input type="number" required>
    <span slot="label">Number of Passengers</span>
    <span slot="helpText">Please enter the number of passengers.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/number.html -->

```html
<auro-input type="number" required>
  <span slot="label">Number of Passengers</span>
  <span slot="helpText">Please enter the number of passengers.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Credit Card

Use the `type="credit-card"` attribute for a credit card formatted input.

Default help text will be added to the input `type="credit-card"` if custom help text is not provided. See the example below.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card.html) -->
  <!-- The below content is automatically added from ../apiExamples/credit-card.html -->
  <auro-input type="credit-card" required>
    <span slot="label">Card number</span>
    <span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card.html -->

```html
<auro-input type="credit-card" required>
  <span slot="label">Card number</span>
  <span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
Use the `type="credit-card"` and `icon` attributes for a credit card formatted input with credit card icon support.

**Dependency**: Please be sure to also install [auro-icon](https://auro.alaskaair.com/components/auro/icon/install) as a peer dependency.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
  <!-- The below content is automatically added from ../apiExamples/credit-card-icon.html -->
  <auro-input icon type="credit-card" required>
    <span slot="label">Card number</span>
    <span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
// Use 4147 3411 1111 1111 to see the Alaska Airline's credit card!
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card-icon.html -->

```html
<auro-input icon type="credit-card" required>
  <span slot="label">Card number</span>
  <span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Phone Number

Use the `type="tel"` attribute for a phone number formatted input. The default format is `+1 (000) 000-0000`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel.html) -->
  <!-- The below content is automatically added from ../apiExamples/tel.html -->
  <auro-input type="tel">
    <span slot="label">Telephone</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel.html -->

```html
<auro-input type="tel">
  <span slot="label">Telephone</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Phone Number Formatting

Use the `format` attribute to set a custom phone number format.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel-format.html) -->
  <!-- The below content is automatically added from ../apiExamples/tel-format.html -->
  <auro-input type="tel" format="+00 000 00 0000">
    <span slot="label">Telephone</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel-format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel-format.html -->

```html
<auro-input type="tel" format="+00 000 00 0000">
  <span slot="label">Telephone</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Date

Use the `type="date"` attribute for a date formatted input. The default date format is `mm/dd/yyyy`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-day-year.html) -->
  <!-- The below content is automatically added from ../apiExamples/month-day-year.html -->
  <auro-input type="date">
    <span slot="label">Arrival date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-day-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-day-year.html -->

```html
<auro-input type="date">
  <span slot="label">Arrival date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Date Formatting

Use the `format` attribute to put together any combination of `mm`, `dd`, & `yyyy` or `yy`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/year-month-day.html) -->
  <!-- The below content is automatically added from ../apiExamples/year-month-day.html -->
  <auro-input type="date" format="yyyy/mm/dd">
    <span slot="label">Arrival date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/year-month-day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/year-month-day.html -->

```html
<auro-input type="date" format="yyyy/mm/dd">
  <span slot="label">Arrival date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-year.html) -->
  <!-- The below content is automatically added from ../apiExamples/month-year.html -->
  <auro-input type="date" format="mm/yy">
    <span slot="label">Expiration date</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-year.html -->

```html
<auro-input type="date" format="mm/yy">
  <span slot="label">Expiration date</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/day.html) -->
  <!-- The below content is automatically added from ../apiExamples/day.html -->
  <auro-input type="date" format="dd">
    <span slot="label">Day</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/day.html -->

```html
<auro-input type="date" format="dd">
  <span slot="label">Day</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Validate on Input

Use the `validateOnInput` attribute to enable live validation on the `input` event. Recommended use is with setting a custom `pattern` and validation is required prior to a `blur` event.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/validate-on-input.html) -->
  <!-- The below content is automatically added from ../apiExamples/validate-on-input.html -->
  <auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
    <span slot="label">Full Name</span>
    <span slot="helpText">Please enter your full name as it appears on the card.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/validate-on-input.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/validate-on-input.html -->

```html
<auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
  <span slot="label">Full Name</span>
  <span slot="helpText">Please enter your full name as it appears on the card.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Value <a name="value"></a>
Use the `value` attribute to programmatically set the value of the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/programmatic-value.html) -->
  <!-- The below content is automatically added from ../apiExamples/programmatic-value.html -->
  <auro-input value="Alaska Airlines is the best!">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/programmatic-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/programmatic-value.html -->

```html
<auro-input value="Alaska Airlines is the best!">
  <span slot="label">Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Dynamically Set Value

Use the `value` and other components to dynamically set the value of the input.

Note: Setting the `value` to `undefined` will also reset the element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/value.html) -->
  <!-- The below content is automatically added from ../apiExamples/value.html -->
  <auro-button id="setValidValueBtn">Set Value to Alaska</auro-button>
  <auro-button id="setUndefinedValueBtn">Set Value to Undefined</auro-button>
  <br /><br />
  <auro-input id="setProgrammaticValueExample" value="Press one of the buttons above!">
    <span slot="label">Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/value.html -->

```html
<auro-button id="setValidValueBtn">Set Value to Alaska</auro-button>
<auro-button id="setUndefinedValueBtn">Set Value to Undefined</auro-button>
<br /><br />
<auro-input id="setProgrammaticValueExample" value="Press one of the buttons above!">
  <span slot="label">Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/value.js -->

```js
export function programmaticallySetValue() {
  const elem = document.querySelector('#setProgrammaticValueExample');

  // set value of auro-input element
  document.querySelector('#setValidValueBtn').addEventListener('click', () => {
    elem.value = "Alaska Airlines is the best";
  });

  // reset the value of auro-input element
  document.querySelector('#setUndefinedValueBtn').addEventListener('click', () => {
    elem.value = undefined;
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Method Examples

### Reset State

Use the `reset()` method to reset the `<auro-input>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br /><br />
  <auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!">
    <span slot="label">Full Name</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!">
  <span slot="label">Full Name</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/reset-state.js -->

```js
export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');

  document.querySelector('#resetStateBtn').addEventListener('click', () => {
    elem.reset();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Slot Examples

### Custom Optional Label

The `<auro-input>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
  <auro-input placeholder="John Doe" bordered>
    <span slot="label">Full name</span>
    <span slot="optionalLabel" style="color: grey; font-size: small"> - optional</span>
    <span slot="helpText">Please enter your full name.</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->

```html
<auro-input placeholder="John Doe" bordered>
  <span slot="label">Full name</span>
  <span slot="optionalLabel" style="color: grey; font-size: small"> - optional</span>
  <span slot="helpText">Please enter your full name.</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Swapping Values Between Inputs

Example illustrates using a JavaScript function attached to an `auro-button` component `click` event to swap the values of two `auro-input` elements. An example of this use case would be swapping the departure and arrival airports in a flight search form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/swap-value.html) -->
  <!-- The below content is automatically added from ../apiExamples/swap-value.html -->
  <auro-input id="swapExampleLeft">
    <span slot="label">Left Input</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <auro-button id="swapExampleBtn">Swap Values</auro-button>
  <auro-input id="swapExampleRight">
    <span slot="label">Right Input</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <style>
    #swapExampleWrapper {
      align-items: center;
    }

    #swapExampleLeft,
    #swapExampleRight {
      flex: 1;
    }

    #swapExampleBtn {
      width: unset;
      margin: 0 var(--auro-size-xs);
    }
  </style>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.html -->

```html
<auro-input id="swapExampleLeft">
  <span slot="label">Left Input</span>
  <span slot="helpText">Help Text</span>
</auro-input>
<auro-button id="swapExampleBtn">Swap Values</auro-button>
<auro-input id="swapExampleRight">
  <span slot="label">Right Input</span>
  <span slot="helpText">Help Text</span>
</auro-input>
<style>
  #swapExampleWrapper {
    align-items: center;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    width: unset;
    margin: 0 var(--auro-size-xs);
  }
</style>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.js -->

```js
export function swapInputValues() {
  const btn = document.querySelector('#swapExampleBtn');
  const inputOne = document.querySelector('#swapExampleLeft');
  const inputTwo = document.querySelector('#swapExampleRight');

  btn.addEventListener('click', () => {
    const valueOne = inputOne.value;
    const valueTwo = inputTwo.value;

    inputOne.value = valueTwo;
    inputTwo.value = valueOne;
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
/* stylelint-disable custom-property-empty-line-before */

@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});

  --ds-auro-input-outline-color: transparent;
}

:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});

  --ds-auro-input-outline-color: transparent;
}
```
<!-- AURO-GENERATED-CONTENT:END -->
