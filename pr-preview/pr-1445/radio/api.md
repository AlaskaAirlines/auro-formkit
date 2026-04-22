<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-radio-group

The `auro-radio-group` element is used to group a set `auro-radio` elements.

## Properties

| Property                        | Attribute                       | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|--------------------------|-------------|--------------------------------------------------|
| [appearance](#appearance)                    | `appearance`                    | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [disabled](#disabled)                      | `disabled`                      | `boolean`                |             | If true, all radio buttons will be disabled.     |
| [error](#error)                         | `error`                         | `string`                 |             | If true, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| [horizontal](#horizontal)                    | `horizontal`                    | `boolean`                |             | If true, displays radio buttons horizontally.    |
| [noValidate](#noValidate)                    | `noValidate`                    | `boolean`                |             | If true, disables auto-validation on blur.       |
| [onDark](#onDark)                        | `onDark`                        | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| [optionSelected](#optionSelected)                | `optionSelected`                | `object`                 |             | Specifies the current selected radio button.     |
| [required](#required)                      | `required`                      | `boolean`                |             | Populates the `required` attribute on the element. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `string`                 |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `string`                 |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `string`                 |             | Custom help text message to display when validity = `valueMissing`. |
| [validity](#validity)                      | `validity`                      | `string`                 |             | Specifies the `validityState` this element is in. |
| [value](#value)                         | `value`                         | `string`                 |             | Specifies the current value of the selected radio button. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| [reset](#reset)    | `(): void`                             | Resets component to initial state.               |
| [validate](#validate) | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the element has been validated.    |
| [input](#input)                     | `CustomEvent<any>` | Notifies every time the value prop of the element is changed. |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| [helpText](#helpText)      | Allows for the helper text to be overridden.     |
| [legend](#legend)        | Allows for the legend to be overridden.          |
| [optionalLabel](#optionalLabel) | Allows overriding the optional display text "(optional)", which appears next to the label. |

## CSS Shadow Parts

| Part          | Description                                      |
|---------------|--------------------------------------------------|
| `radio-group` | Apply css to the fieldset element in the shadow DOM |

# auro-radio

The `auro-radio` element is used to a button that allows the user to select one option from a set.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| [appearance](#appearance) | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [checked](#checked)    | `checked`    | `boolean`                |             | If set to true, the radio button will be filled. |
| [disabled](#disabled)   | `disabled`   | `boolean`                |             | If set to true, the radio button will be non-clickable. |
| [error](#error)      | `error`      | `boolean`                |             | If set to true, sets an error state on the radio button. |
| [id](#id)         | `id`         | `string`                 |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| [label](#label)      | `label`      | `string`                 |             | Label for the radio button.                      |
| [name](#name)       | `name`       | `string`                 |             | Name for the radio button group.                 |
| [onDark](#onDark)     | `onDark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| [required](#required)   | `required`   | `boolean`                |             | Defines element as required.                     |
| [value](#value)      | `value`      | `string`                 |             | The value of the radio button.                   |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| [reset](#reset) | `(): void` | Resets component to initial state. |

## Events

| Event                | Type               | Description                                      |
|----------------------|--------------------|--------------------------------------------------|
| `auroRadio-blur`     | `CustomEvent<any>` | Notifies that the component has lost focus.      |
| `auroRadio-selected` | `CustomEvent<any>` | Notifies that the component has been marked as checked/selected. |
| [change](#change)             | `CustomEvent<any>` | (Deprecated) Notifies when checked value is changed. |
| [focusSelected](#focusSelected)      | `CustomEvent<any>` | Notifies that the component has gained focus.    |
| [input](#input)              | `InputEvent`       | Notifies when when checked value is changed by user's interface. |
| [resetRadio](#resetRadio)         | `CustomEvent<any>` | Notifies that the component has reset the checked/selected state. |
| [toggleSelected](#toggleSelected)     | `CustomEvent<any>` | Notifies that the component has toggled the checked/selected state. |

## CSS Shadow Parts

| Part          | Description                               |
|---------------|-------------------------------------------|
| [radio](#radio)       | apply css to a specific checkbox.         |
| `radio-input` | apply css to a specific checkbox's input. |
| `radio-label` | apply css to a specific checkbox's label. |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic Radio

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
  <auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->

```html
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Basic Radio Group

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

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

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to render the radio for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes" appearance="inverse"></auro-radio>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes" appearance="inverse"></auro-radio>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-group.html -->
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-group.html -->

```html
<auro-radio-group appearance="inverse">
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
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checked.html) -->
  <!-- The below content is automatically added from ./../apiExamples/checked.html -->
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
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checked.html) -->
  <!-- The below content is automatically added from ./../apiExamples/checked.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
    <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
    <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-checked.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-checked.html -->
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
    <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
    <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-checked.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-checked.html -->
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
    <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
    <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable singular `<auro-radio>` elements or the entire `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
    <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <auro-radio-group disabled>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked></auro-radio>
    <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
  <!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
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
    <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked></auro-radio>
    <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  ```
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
    <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <auro-radio-group appearance="inverse" disabled>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked></auro-radio>
    <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-radio-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
    <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <auro-radio-group appearance="inverse" disabled>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked></auro-radio>
    <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to apply a persistent custom error that supersedes the HTML5 validation logic.

A custom error message can be set using the `error` attribute, or it can be used in conjunction with the `setCustomValidityCustomError` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
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
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
  <!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
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
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-radio-group appearance="inverse" error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-radio-group appearance="inverse" error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Horizontal Group

Using the `horizontal` attribute will render the `auro-radio` elements in a horizontal line.

**Note**: Using the horizontal attribute has a limit of 3 options. Beyond three, options will be listed in vertically.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/horizontal.html) -->
  <!-- The below content is automatically added from ./../apiExamples/horizontal.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/horizontal.html -->

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
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

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

## Method Examples

### Reset State

Use the `reset()` method to reset the `<auro-radio-group>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br/><br/>
  <auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
    <span slot="legend">Form label goes here</span>
    <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
    <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
    <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->

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

### Optional Label

The `<auro-radio-group>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->

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

## Common Usage Patterns & Functional Examples

### Dynamic Example

This example demonstrates a data drive approach to rendering `<auro-radio>` buttons.

**Note**: When dynamically creating `<auro-radio>` elements, make sure to add an `id` attribute, as it is a required part of the HTML5 spec for all form elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dynamic.html -->
  <auro-radio-group required id="dynamicExample">
    <span slot="legend">Form label goes here</span>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamic.html -->

```html
<auro-radio-group required id="dynamicExample">
  <span slot="legend">Form label goes here</span>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamic.js -->

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

### Multiline Label

Example to show text wrapping on multiline labels.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiline-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/multiline-group.html -->
  <auro-radio-group>
    <span slot="legend">Form label goes here</span>
    <auro-radio id="basicGroupRadio1" label="Sample text" name="radioDemo" value="option1"></auro-radio>
    <auro-radio id="basicGroupRadio2" label="This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines." name="radioDemo" value="option2"></auro-radio>
    <auro-radio id="basicGroupRadio3" label="Sample text" name="radioDemo" value="option3"></auro-radio>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiline-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multiline-group.html -->

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Sample text" name="radioDemo" value="option1"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines." name="radioDemo" value="option2"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Sample text" name="radioDemo" value="option3"></auro-radio>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Accordion Nested Group

This example shows how to use `<auro-accordion>` with the `<auro-radio-group>` and `<auro-radio>` elements for
nested/optional groups (such as a "More Options" section in a payment processor).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/accordion-example.html) -->
  <!-- The below content is automatically added from ./../apiExamples/accordion-example.html -->
  <auro-radio-group>
    <span slot="legend">Accordion Test</span>
    <auro-radio id="basicGroupRadio1" label="Credit or debit card" name="creditordebit" value="credit"></auro-radio>
    <auro-radio id="basicGroupRadio2" label="Apple Pay" name="applePay" value="applePay"></auro-radio>
    <auro-radio id="basicGroupRadio3" label="Alaska Airlines Commercial Account" name="alaskaCommercial" value="alaskaCommercial"></auro-radio>
    <auro-accordion>
      <span slot="trigger">More payment options</span>
      <auro-radio id="basicGroupRadio4" label="Click to pay" name="manualCredit" value="manualCredit"></auro-radio>
      <auro-radio id="basicGroupRadio5" label="Google Pay" name="googlePay" value="googlePay"></auro-radio>
    </auro-accordion>
  </auro-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/accordion-example.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/accordion-example.html -->

```html
<auro-radio-group>
  <span slot="legend">Accordion Test</span>
  <auro-radio id="basicGroupRadio1" label="Credit or debit card" name="creditordebit" value="credit"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="Apple Pay" name="applePay" value="applePay"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Alaska Airlines Commercial Account" name="alaskaCommercial" value="alaskaCommercial"></auro-radio>
  <auro-accordion>
    <span slot="trigger">More payment options</span>
    <auro-radio id="basicGroupRadio4" label="Click to pay" name="manualCredit" value="manualCredit"></auro-radio>
    <auro-radio id="basicGroupRadio5" label="Google Pay" name="googlePay" value="googlePay"></auro-radio>
  </auro-accordion>
</auro-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host {
  // auro-radio-group colors
  --ds-auro-radio-group-label-color: inherit;

  // auro-radio colors
  --ds-auro-radio-btn-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-radio-btn-fill-color: transparent;
  --ds-auro-radio-btn-inset-color: transparent;
  --ds-auro-radio-label-color: inherit;
  --ds-auro-radio-tap-color: transparent;
}
```
<!-- AURO-GENERATED-CONTENT:END -->
