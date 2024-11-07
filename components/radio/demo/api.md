<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../api.md) -->
<!-- The below content is automatically added from ./../api.md -->

# auro-radio-group

## Properties

| Property                        | Attribute                       | Type          | Default     | Description                                      |
|---------------------------------|---------------------------------|---------------|-------------|--------------------------------------------------|
| [disabled](#disabled)                      | `disabled`                      | `boolean`     | false       |                                                  |
| [error](#error)                         | `error`                         | `String`      |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| [horizontal](#horizontal)                    | `horizontal`                    | `boolean`     | false       |                                                  |
| [noValidate](#noValidate)                    | `noValidate`                    | `Boolean`     |             | If set, disables auto-validation on blur.        |
| [optionSelected](#optionSelected)                | `optionSelected`                | `Object`      | "undefined" | Specifies the current selected radio button.     |
| [required](#required)                      | `required`                      | `Boolean`     | false       | Populates the `required` attribute on the element. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `String`      |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `String`      |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `String`      |             | Custom help text message to display when validity = `valueMissing`. |
| [validity](#validity)                      | `validity`                      | `String`      | "undefined" | Specifies the `validityState` this element is in. |
| [value](#value)                         | `value`                         | `array`       | "undefined" |                                                  |

## Methods

| Method  | Type       | Description                                    |
|---------|------------|------------------------------------------------|
| [reset](#reset) | `(): void` | Method for a total reset of the radio element. |

## Events

| Event                       | Description                                   |
|-----------------------------|-----------------------------------------------|
| `auroFormElement-validated` | Notifies that the element has been validated. |

## Slots

| Name            | Description                                     |
|-----------------|-------------------------------------------------|
| [helpText](#helpText)      | Allows for the helper text to be overridden.    |
| [legend](#legend)        | Allows for the legend to be overridden.         |
| [optionalLabel](#optionalLabel) | Allows for the optional label to be overridden. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `radio-group` | Apply css to the fieldset element in the shadow DOM |

# auro-radio

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| [checked](#checked)  | `checked`  | `Boolean` | false   | If set to true, the radio button will be filled. |
| [disabled](#disabled) | `disabled` | `Boolean` | false   | If set to true, the radio button will be non-clickable. |
| [error](#error)    | `error`    | `Boolean` | false   | If set to true, sets an error state on the radio button. |
| [id](#id)       | `id`       | `string`  |         |                                                  |
| [label](#label)    | `label`    | `string`  |         |                                                  |
| [name](#name)     | `name`     | `string`  |         |                                                  |
| [required](#required) | `required` | `Boolean` | false   | Defines element as required.                     |
| [tabIndex](#tabIndex) | `tabIndex` | `number`  | -1      |                                                  |
| [value](#value)    | `value`    | `string`  |         |                                                  |

## Events

| Event                | Type               | Description                                      |
|----------------------|--------------------|--------------------------------------------------|
| `auroRadio-blur`     | `CustomEvent<any>` | Notifies that the component has lost focus.      |
| `auroRadio-selected` | `CustomEvent<any>` | Notifies that the component has been marked as checked/selected. |
| [focusSelected](#focusSelected)      | `CustomEvent<any>` | Notifies that the component has gained focus.    |
| [resetRadio](#resetRadio)         | `CustomEvent<any>` | Notifies that the component has reset the checked/selected state. |
| [toggleSelected](#toggleSelected)     | `CustomEvent<any>` | Notifies that the component has toggled the checked/selected state. |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Default

The following example illustrates the default use of the `<auro-radio>` custom element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/basic.html -->
  <auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/basic.html -->

```html
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Default Group

This is a default configuration using the `<auro-radio-group>` and `<auro-radio>` elements. Notice the use of the `slot` attribute to set the group title of the `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basicGroup.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/basicGroup.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basicGroup.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/basicGroup.html -->

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Checked

Use the `checked` attribute to pre-select a `<auro-radio>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/checked.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/checked.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
    <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
    <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/checked.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/checked.html -->

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
  <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
  <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable singular `<auro-radio>` elements or the entire `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabled.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
    <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <auro-radio-group disabled>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabled.html -->

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
  <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<auro-radio-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to set an error state on the entire `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/error.html -->
  <auro-radio-group error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/error.html -->

```html
<auro-radio-group error="There is an error with this form entry">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Horizontal Group

Using the `horizontal` attribute will render the `auro-radio` elements in a horizontal line.

**Note**: Using the horizontal attribute has a limit of 3 options. Beyond three, options will be listed in vertically.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/horizontal.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/horizontal.html -->
  <auro-radio-group horizontal>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/horizontal.html -->

```html
<auro-radio-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Required

When present, the `required` attribute specifies that an `<auro-radio>` within the `<auro-radio-group>` must be checked. There is no error message associated with the `required` attribute by default. Use `setCustomValidityValueMissing` to set a custom error message.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/required.html -->
  <auro-radio-group required setCustomValidityValueMissing="value missing">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/required.html -->

```html
<auro-radio-group required setCustomValidityValueMissing="value missing">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Custom optional label

The `<auro-radio-group>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/optionalLabel.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/optionalLabel.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <span slot="optionalLabel">(add custom label here)</span>
    <auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/optionalLabel.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/optionalLabel.html -->

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <span slot="optionalLabel">(add custom label here)</span>
  <auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dynamic Example

This example demonstrates a data drive approach to rendering `<auro-radio>` buttons.

**Note**: When dynamically creating `<auro-radio>` elements, make sure to add an `id` attribute, as it is a required part of the HTML5 spec for all form elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/dynamic.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/dynamic.html -->
  <auro-radio-group required id="dynamicExample">
    <span slot="legend">Form label goes here</span>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/dynamic.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/dynamic.html -->

```html
<auro-radio-group required id="dynamicExample">
  <span slot="legend">Form label goes here</span>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/dynamic.js) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/dynamic.js -->

```js
export function dynamicExample() {
  const values = ['Yes', 'No', 'Maybe'];
  const radioGroup = document.getElementById('dynamicExample');

  for (let i = 0; i < values.length; i++) {
    const radio = document.createElement('auro-radio');

    radio.id = `dynamicRadio${i}`;
    radio.label = values[i];
    radio.name = 'radioDemo';
    radio.value = values[i];
    radio.textContent = values[i];

    radioGroup.appendChild(radio);
  }
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../src/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../src/tokens.scss -->

```scss
:host {
  // auro-radio-group colors
  --ds-auro-radio-group-help-text-color: var(--ds-color-text-secondary-default, $ds-color-text-secondary-default);
  --ds-auro-radio-group-label-color: inherit;

  // auro-radio colors
  --ds-auro-radio-btn-border-color: var(--ds-color-border-primary-default, $ds-color-border-primary-default);
  --ds-auro-radio-btn-fill-color: transparent;
  --ds-auro-radio-btn-inset-color: transparent;
  --ds-auro-radio-label-color: inherit;
  --ds-auro-radio-tap-color: transparent;
}
```
<!-- AURO-GENERATED-CONTENT:END -->
