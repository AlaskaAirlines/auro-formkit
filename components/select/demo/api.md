<!--
The apiExamples.md file is a compiled document. No edits should be made directly to this file.

apiExamples.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/apiExamples.md`
-->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-select

The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| [disabled](#disabled)                      | `disabled`                      | `boolean` |             | When attribute is present, element shows disabled state. |
| [error](#error)                         | `error`                         | `string`  |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| [flexMenuWidth](#flexMenuWidth)                 | `flexMenuWidth`                 | `boolean` |             | If set, makes dropdown width match the size of the content, rather than the width of the trigger. |
| [multiSelect](#multiSelect)                   | `multiselect`                   | `boolean` |             | Sets multi-select mode, allowing multiple options to be selected at once. |
| [noCheckmark](#noCheckmark)                   | `noCheckmark`                   | `boolean` |             | When true, checkmark on selected option will no longer be present. |
| [noValidate](#noValidate)                    | `noValidate`                    | `boolean` |             | If set, disables auto-validation on blur.        |
| [optionSelected](#optionSelected)                | `optionSelected`                |           | "undefined" | Specifies the current selected menuOption.       |
| [required](#required)                      | `required`                      | `boolean` |             | Populates the `required` attribute on the element. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `string`  |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `string`  |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `string`  |             | Custom help text message to display when validity = `valueMissing`. |
| [validity](#validity)                      | `validity`                      | `string`  |             | Specifies the `validityState` this element is in. |
| [value](#value)                         | `value`                         |           | "undefined" | Value selected for the component.                |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| [reset](#reset) | `(): void` | Resets component to initial state. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| `auroSelect-valueSet`       | `CustomEvent<any>` | Notifies that the component has a new value set. |

## Slots

| Name          | Description                                      |
|---------------|--------------------------------------------------|
|               | Default slot for the menu content.               |
| [helpText](#helpText)    | Defines the content of the helpText.             |
| [label](#label)       | Defines the content of the label.                |
| [placeholder](#placeholder) | Defines the content of the placeholder to be shown when there is no value |

## CSS Shadow Parts

| Part       | Description                 |
|------------|-----------------------------|
| [helpText](#helpText) | Apply CSS to the help text. |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Default example

A baseline `auro-select` using `auro-menu` and `auro-menuoption` elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-select>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-select>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Property Examples

#### value <a name="value"></a>
Use the `value` property to define a preset value on the `auro-select` element. The `value` of `auro-select` must match the `value` defined of a single `auro-menuoption`. Upon initially rendering the component, if the `value` does not match an `auro-menuoption`, the `value` of `auro-select` will be set to `undefined`.

To pre-set the value of auro-select on load, use the `value` property. The `selected` attribute on auro-menuoption is designed to illustrate state in the DOM.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value.html -->
  <auro-button id="validValueExampleBtn">Set Value to Valid Option</auro-button>
  <auro-button id="invalidValueExampleBtn">Set Value to Invalid Option</auro-button>
  <br/><br/>
  <auro-select id="valueExample" value='["price"]'>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
      <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
      <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
      <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
      <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
      <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->

```html
<auro-button id="validValueExampleBtn">Set Value to Valid Option</auro-button>
<auro-button id="invalidValueExampleBtn">Set Value to Invalid Option</auro-button>
<br/><br/>
<auro-select id="valueExample" value='["price"]'>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
    <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
    <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
    <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
    <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
    <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.js -->

```js
export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  document.querySelector('#validValueExampleBtn').addEventListener('click', () => {
    valueExample.value = ['arrival'];
  });

  document.querySelector('#invalidValueExampleBtn').addEventListener('click', () => {
    valueExample.value = ['flight course'];
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### required <a name="required"></a>
When present, the `required` attribute specifies that a select field must be filled out before submitting the form.

When the validity check fails the validityState, equals `valueMissing`. The error message for the `valueMissing` validityState can be set to a custom string using the `setCustomValidityValueMissing`. There is no default error message defined.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-select required setCustomValidityValueMissing="Custom required validation error message.">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-select required setCustomValidityValueMissing="Custom required validation error message.">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### error <a name="error"></a>
Use the `error` attribute to apply a persistent custom error that supersedes the HTML5 validation logic.

A custom error message can be set using the `error` attribute, or it can be used in conjuction with the `setCustomValidityCustomError` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/errorApi.html) -->
  <!-- The below content is automatically added from ./../apiExamples/errorApi.html -->
  <auro-button id="undefinedValueExampleBtnAddError">Set Error</auro-button>
  <auro-button id="undefinedValueExampleBtnRemoveError">Remove Error</auro-button>
  <br /><br />
  <auro-select id="errorExample" error="Custom error message">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/errorApi.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/errorApi.html -->

```html
<auro-button id="undefinedValueExampleBtnAddError">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError">Remove Error</auro-button>
<br /><br />
<auro-select id="errorExample" error="Custom error message">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### disabled <a name="disabled"></a>
Use the `disabled` boolean attribute to toggle the disabled UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-select disabled>
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-select disabled>
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### multiselect <a name="multiselect"></a>
Sets multi-select mode, allowing multiple options to be selected at once.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiselect.html) -->
  <!-- The below content is automatically added from ./../apiExamples/multiselect.html -->
  <auro-select multiselect>
    <label slot="placeholder">Select one or more options</label>
    <auro-menu>
      <auro-menuoption value="1">Option 1</auro-menuoption>
      <auro-menuoption value="2">Option 2</auro-menuoption>
      <auro-menuoption value="3">Option 3</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multiselect.html -->

```html
<auro-select multiselect>
  <label slot="placeholder">Select one or more options</label>
  <auro-menu>
    <auro-menuoption value="1">Option 1</auro-menuoption>
    <auro-menuoption value="2">Option 2</auro-menuoption>
    <auro-menuoption value="3">Option 3</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### flexMenuWidth <a name="flexMenuWidth"></a>
Use the `flexMenuWidth` boolean attribute to toggle the width of the `<auro-select>` element to match the width of the bib content, rather than the width of the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/flexMenuWidth.html) -->
  <!-- The below content is automatically added from ../apiExamples/flexMenuWidth.html -->
  <auro-select flexMenuWidth id="flexMenuWidthExample">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
      <auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
      <auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
      <auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
      <auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
    </auro-menu>
  </auro-select>
  <style>
    #flexMenuWidthExample::part(dropdownTrigger) {
      width: 25%;
    }
  </style>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/flexMenuWidth.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/flexMenuWidth.html -->

```html
<auro-select flexMenuWidth id="flexMenuWidthExample">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
    <auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
    <auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
    <auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
    <auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
  </auro-menu>
</auro-select>
<style>
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
</style>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Slot Examples

#### label <a name="label"></a>
Use the `label` slot to give your users contextual information about their selection options. This `label` content is also helpful for assistive devices.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/label.html -->
  <auro-select>
    <span slot="label">Please select a preference</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/label.html -->

```html
<auro-select>
  <span slot="label">Please select a preference</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### helpText <a name="helpText"></a>
Use the `helptext` slot to provide additional information back to your user about their selection option(s).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/helpText.html) -->
  <!-- The below content is automatically added from ./../apiExamples/helpText.html -->
  <auro-select>
    <label slot="placeholder">Placeholder Text</label>
    <span slot="helpText">Custom help text message.</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/helpText.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/helpText.html -->

```html
<auro-select>
  <label slot="placeholder">Placeholder Text</label>
  <span slot="helpText">Custom help text message.</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Functional Examples

### Reset State

Use the `reset()` method to reset the `<auro-select>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/resetState.html) -->
  <!-- The below content is automatically added from ./../apiExamples/resetState.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br/><br/>
  <auro-select id="resetStateExample" value='["price"]'>
    <label slot="placeholder">Placeholder Text</label>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/resetState.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/resetState.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-select id="resetStateExample" value='["price"]'>
  <label slot="placeholder">Placeholder Text</label>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/resetState.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/resetState.js -->

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

### Extract value

The following example illustrates how a user may query the `element.value` or `element.optionSelected` for the current value or complete option object that is selected.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/valueExtraction.html) -->
  <!-- The below content is automatically added from ./../apiExamples/valueExtraction.html -->
  <auro-select id="valueExtraction">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-button id="valueExtractionBtn">Get current value</auro-button>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/valueExtraction.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/valueExtraction.html -->

```html
<auro-select id="valueExtraction">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
<auro-button id="valueExtractionBtn">Get current value</auro-button>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/valueExtraction.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/valueExtraction.js -->

```js
export function valueExtractionExample() {
  const valueExtractionExample = document.querySelector('#valueExtraction');
  const valueExtractionBtn = document.querySelector('#valueExtractionBtn');

  valueExtractionBtn.addEventListener('click', () => {
    console.warn('Value selected:', valueExtractionExample.value);
    console.warn('Option selected:', valueExtractionExample.optionSelected);

    alert(`Value selected: ${valueExtractionExample.value}`);
  })
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Custom Validity with Error State

This example programmatically adds the `error` state when a user selects an option that is greater than `2`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customErrorValidity.html) -->
  <!-- The below content is automatically added from ./../apiExamples/customErrorValidity.html -->
  <auro-select id="primaryError">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu>
      <auro-menuoption value="1">1</auro-menuoption>
      <auro-menuoption value="2">2</auro-menuoption>
      <auro-menuoption value="3">3</auro-menuoption>
      <auro-menuoption value="4">4</auro-menuoption>
      <auro-menuoption value="5">5</auro-menuoption>
      <auro-menuoption value="6">6</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customErrorValidity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/customErrorValidity.html -->

```html
<auro-select id="primaryError">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu>
    <auro-menuoption value="1">1</auro-menuoption>
    <auro-menuoption value="2">2</auro-menuoption>
    <auro-menuoption value="3">3</auro-menuoption>
    <auro-menuoption value="4">4</auro-menuoption>
    <auro-menuoption value="5">5</auro-menuoption>
    <auro-menuoption value="6">6</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customErrorValidity.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/customErrorValidity.js -->

```js
export function customErrorValidityExample(elem) {
  const customErrorValidityExample = document.querySelector('#primaryError');

  customErrorValidityExample.addEventListener('auroSelect-valueSet', () => {
    if (+customErrorValidityExample.value > 2) {
      customErrorValidityExample.setAttribute('error', 'Quantity Exceeded');
    } else if (customErrorValidityExample.hasAttribute('error')) {
      customErrorValidityExample.removeAttribute('error');
    }
  })
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Loading<a name="loading"></a>
While content is loading, the menu can either remain empty or display a loading placeholder

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
  <!-- The below content is automatically added from ./../apiExamples/loading.html -->
  <auro-select id="loadingExample">
    <span slot="label">Please select a preference</span>
    <auro-menu id="loadingExampleSelectMenu">
      <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.js -->

```js
export function auroMenuLoadingExample() {
  const select = document.querySelector("#loadingExample");
  const menu = document.querySelector("#loadingExampleSelectMenu");

  const emptyMenu = () => {
    const menuoptions = menu.querySelectorAll('auro-menuoption');
    menuoptions.forEach(mo => menu.removeChild(mo));
  }

  const fillMenu = () => {
      menu.innerHTML += `
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>`;
  }

  select.addEventListener("click", () => {
    if (!menu.hasAttribute('loading') && !select.value) {
      emptyMenu();
      menu.setAttribute('loading', 'loading');
      setTimeout(() => {
        menu.removeAttribute('loading');
        fillMenu();
      }, 1000);
    }
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.html -->

```html
<auro-select id="loadingExample">
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleSelectMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### in Dialog

The component can be in a dialog.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inDialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inDialog.html -->
  <div>
    <auro-button id="select-dialog-opener">Select in Dialog</auro-button>
    <auro-dialog id="select-dialog">
      <span slot="header">Select in Dialog</span>
      <div slot="content">
        <auro-select id="valueExample" value='["price"]'>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
            <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
            <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
            <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
            <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
            <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
          </auro-menu>
        </auro-select>
      </div>
    </auro-dialog>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inDialog.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inDialog.html -->

```html
<div>
  <auro-button id="select-dialog-opener">Select in Dialog</auro-button>
  <auro-dialog id="select-dialog">
    <span slot="header">Select in Dialog</span>
    <div slot="content">
      <auro-select id="valueExample" value='["price"]'>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
          <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
          <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
          <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
          <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
          <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </auro-dialog>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inDialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inDialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#select-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#select-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Watch for value changes

The following example listens for the `auroMenu-selectedOption` event. Once triggered, element.value or element.optionSelected may be queried for the new value or complete option object.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/valueAlert.html) -->
  <!-- The below content is automatically added from ./../apiExamples/valueAlert.html -->
  <auro-select id="valueAlert">
    <label slot="placeholder">Placeholder Text</label>
    <auro-menu id="valueAlertMenu">
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/valueAlert.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/valueAlert.html -->

```html
<auro-select id="valueAlert">
  <label slot="placeholder">Placeholder Text</label>
  <auro-menu id="valueAlertMenu">
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/valueAlert.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/valueAlert.js -->

```js
export function valueAlertExample() {
  const select = document.querySelector('#valueAlert');
  const menu = document.querySelector('#valueAlertMenu');

  menu.addEventListener('auroMenu-selectedOption', () => {
    console.warn('Select value changed to:', select.value);
    console.warn('Select optionSelected changed to:', select.optionSelected);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@import '@aurodesignsystem/design-tokens/dist/tokens/SCSSVariables';

:host {
  --ds-auro-select-placeholder-text-color: var(--ds-color-text-secondary-default, $ds-color-text-secondary-default);
}
```
<!-- AURO-GENERATED-CONTENT:END -->
