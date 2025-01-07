<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-combobox

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| [checkmark](#checkmark)                     | `checkmark`                     | `Boolean` |             | When attribute is present auro-menu will apply checkmarks to selected options. |
| [disabled](#disabled)                      | `disabled`                      | `Boolean` |             | If set, disables the combobox.                   |
| [error](#error)                         | `error`                         | `String`  |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| [noFilter](#noFilter)                      | `noFilter`                      | `Boolean` | false       | If set, combobox will not filter menuoptions based in input. |
| [noValidate](#noValidate)                    | `noValidate`                    | `Boolean` |             | If set, disables auto-validation on blur.        |
| [optionSelected](#optionSelected)                | `optionSelected`                | `Object`  | null        | Specifies the current selected option.           |
| [required](#required)                      | `required`                      | `Boolean` |             | Populates the `required` attribute on the input. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `String`  |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `String`  |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `String`  |             | Custom help text message to display when validity = `valueMissing`. |
| [triggerIcon](#triggerIcon)                   | `triggerIcon`                   | `Boolean` |             | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| [type](#type)                          | `type`                          | `String`  |             | Applies the defined value as the type attribute on auro-input. |
| [validity](#validity)                      | `validity`                      | `String`  | "undefined" | Specifies the `validityState` this element is in. |
| [value](#value)                         | `value`                         | `String`  | null        | Value selected for the dropdown menu.            |

## Methods

| Method  | Type       | Description                         |
|---------|------------|-------------------------------------|
| [focus](#focus) | `(): void` | Focuses the combobox trigger input. |
| [reset](#reset) | `(): void` | Resets component to initial state.  |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>` | Notifies that the component has a new value set. |
| `auroFormElement-validated` |                    | Notifies that the component value(s) have been validated. |

## Slots

| Name       | Description                          |
|------------|--------------------------------------|
|            | Default slot for the menu content.   |
| [helpText](#helpText) | Defines the content of the helpText. |
| [label](#label)    | Defines the content of the label.    |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-combobox>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dynamic Menu

This example demonstrates a data driven combobox. The data is used to populate the `auro-menu`. In this example, each time the input's value changes, the data is updated and the menu is recreated.

The menu in this example was populated from data from a country/city API. To keep the data set small, the data in the menu is based off an API call that returns all countries and cities that contain the substring "**germ**" (non case-sensitive) in their name.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamicMenu.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dynamicMenu.html -->
  <!-- HTML example file -->
  <!-- ----------------- -->
  <auro-combobox id="dynamicMenuExample" noFilter>
    <span slot="label">Name</span>
    <!--
      The auro-combobox element requires an empty auro-menu element
      due to the requirements of auro-dropdown and auro-input
    -->
    <auro-menu id="initMenu"></auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamicMenu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamicMenu.html -->

```html
<!-- HTML example file -->
<!-- ----------------- -->
<auro-combobox id="dynamicMenuExample" noFilter>
  <span slot="label">Name</span>
  <!--
    The auro-combobox element requires an empty auro-menu element
    due to the requirements of auro-dropdown and auro-input
  -->
  <auro-menu id="initMenu"></auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamicMenu.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamicMenu.js -->

```js
// Javascript example file
// -----------------------
import { DynamicData } from './dynamicMenuDataApi';

export function dynamicMenuExample() {
  // Resets the root menu
  function resetMenu(root) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  // Generates HTML for menu and submenus using country & city data from an external API
  function generateHtml(data) {
    const initialMenu = document.querySelector('#initMenu');

    resetMenu(initialMenu);

    for (let index = 0; index < data.length; index++) {
      let country = data[index]['country'];
      let cities = data[index]['cities'];

      generateMenuOptionHtml(initialMenu, country, country);

      for (let indexB = 0; indexB < cities.length; indexB++) {
        let subMenu = document.createElement('auro-menu');

        generateMenuOptionHtml(subMenu, cities[indexB], cities[indexB]);

        initialMenu.appendChild(subMenu);
      }
    };
  }

  // Helper function that generates HTML for menuoptions
  function generateMenuOptionHtml(menu, label, value) {
    let option = document.createElement('auro-menuoption');

    option.value = value;
    option.innerHTML = label;

    menu.appendChild(option);
  }

  // Main javascript that runs all JS to create example
  const dynamicData = new DynamicData();
  const dynamicMenuExample = document.querySelector('#dynamicMenuExample');
  const dropdownEl = dynamicMenuExample.shadowRoot.querySelector(dynamicMenuExample.dropdownTag._$litStatic$);
  const inputEl = dropdownEl.querySelector(dynamicMenuExample.inputTag._$litStatic$);

  inputEl.addEventListener('input', () => {
    let data = dynamicData.getData();
    data = dynamicData.filterData(data, dynamicMenuExample.value);

    generateHtml(data);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Property Examples

#### disabled

If set, disables the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-combobox disabled>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-combobox disabled>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### noFilter

If set, combobox will not do suggestion filtering of the menuoptions. This option is useful when the `<auro-menuoption>` elements are being pre-filtered externally to combobox (e.g. using the citysearch API).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noFilter.html) -->
  <!-- The below content is automatically added from ./../apiExamples/noFilter.html -->
  <auro-combobox noFilter>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noFilter.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/noFilter.html -->

```html
<auro-combobox noFilter>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### error

Sets a persistent error state (e.g. an error state returned from the server).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
  <auro-combobox error="Custom error message">
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

```html
<auro-combobox error="Custom error message">
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### noValidate

Intended for use with the `required` attribute. If set, disables auto-validation on blur. By using these two attributes in combination the validation for required fields is still computed for forms but no validation messaging will be generated in the UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noValidate.html) -->
  <!-- The below content is automatically added from ./../apiExamples/noValidate.html -->
  <auro-combobox required noValidate>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noValidate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/noValidate.html -->

```html
<auro-combobox required noValidate>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### required

Populates the `required` attribute on the input. Used for client-side validation.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-combobox required>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-combobox required>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### value

Use the `value` attribute to programmatically set the value of the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmaticValue.html) -->
  <!-- The below content is automatically added from ./../apiExamples/programmaticValue.html -->
  <auro-combobox value="Apples">
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmaticValue.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmaticValue.html -->

```html
<auro-combobox value="Apples">
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Dynamically Set Value

Use the `value` attribute in combination with another element to dynamically set the value of the combobox.

Can be used in the following ways:
* Preset the value of the combobox to valid menu option
* Set the value of the combobox to invalid menu option
* Reset the value of the combobox to undefined

Note: using a value that does not match a menu option will reset the combobox value to undefined.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value.html -->
  <auro-button id="valueValidExampleBtn">Set to an existing option</auro-button>
  <auro-button id="valueInvalidExampleBtn">Set to custom value</auro-button>
  <auro-button id="valueUndefinedExampleBtn">Reset</auro-button>
  <br/><br/>
  <auro-combobox id="valueExample" value="Apples">
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->

```html
<auro-button id="valueValidExampleBtn">Set to an existing option</auro-button>
<auro-button id="valueInvalidExampleBtn">Set to custom value</auro-button>
<auro-button id="valueUndefinedExampleBtn">Reset</auro-button>
<br/><br/>
<auro-combobox id="valueExample" value="Apples">
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.js -->

```js
export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  document.querySelector('#valueValidExampleBtn').addEventListener('click', () => {
    valueExample.value = 'Oranges';
  });

  document.querySelector('#valueInvalidExampleBtn').addEventListener('click', () => {
    valueExample.value = 'Dragon Fruit';
  });

  document.querySelector('#valueUndefinedExampleBtn').addEventListener('click', () => {
    valueExample.value = undefined;
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### type

When defined, the `auro-input` in the combobox trigger will use the defined `type` (e.g. `credit-card`).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/typeMonthDayYear.html) -->
  <!-- The below content is automatically added from ./../apiExamples/typeMonthDayYear.html -->
  <auro-combobox type="month-day-year" triggerIcon>
    <span slot="label">Date</span>
    <auro-menu>
      <auro-menuoption value="01/02/2020" id="option-date-0">
        01/02/2020
      </auro-menuoption>
      <auro-menuoption value="05/16/2022" id="option-date-1">
        05/16/2022
      </auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/typeMonthDayYear.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/typeMonthDayYear.html -->

```html
<auro-combobox type="month-day-year" triggerIcon>
  <span slot="label">Date</span>
  <auro-menu>
    <auro-menuoption value="01/02/2020" id="option-date-0">
      01/02/2020
    </auro-menuoption>
    <auro-menuoption value="05/16/2022" id="option-date-1">
      05/16/2022
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Method Examples

#### focus

The focus method will apply focus state to the combobox input field.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/focus.html) -->
  <!-- The below content is automatically added from ./../apiExamples/focus.html -->
  <auro-button id="focusExampleBtn">Apply focus to combobox</auro-button>
  <br /><br />
  <auro-combobox id="focusExample">
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.js -->

```js
export function focusExample() {
  const focusExample = document.querySelector('#focusExample');
  const focusExampleBtnElem = document.querySelector('#focusExampleBtn');

  focusExampleBtnElem.addEventListener('click', () => {
    focusExample.focus();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.html -->

```html
<auro-button id="focusExampleBtn">Apply focus to combobox</auro-button>
<br /><br />
<auro-combobox id="focusExample">
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### reset

Use the `reset()` method to reset the `<auro-combobox>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/resetState.html) -->
  <!-- The below content is automatically added from ./../apiExamples/resetState.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br /><br />
  <auro-combobox id="resetStateExample" required>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/resetState.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/resetState.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-combobox id="resetStateExample" required>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
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

### Slot Examples

#### helpText

Sets the help text displayed below the trigger. The `helpText` slot can be used to provide additional context for the combobox. When using the `error` property, the `helpText` slot can be used to describe the error.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/helpText.html) -->
  <!-- The below content is automatically added from ./../apiExamples/helpText.html -->
  <auro-combobox>
    <span slot="label">Name</span>
    <span slot="helpText">Custom help text</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/helpText.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/helpText.html -->

```html
<auro-combobox>
  <span slot="label">Name</span>
  <span slot="helpText">Custom help text</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Loading<a name="loading"></a>
While content is loading, the menu can either remain empty or display a loading placeholder

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
  <!-- The below content is automatically added from ./../apiExamples/loading.html -->
  <auro-combobox id="loadingExample">
    <span slot="label">Please select a preference</span>
    <auro-menu id="loadingExampleComboboxMenu">
      <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.js -->

```js
export function auroMenuLoadingExample() {
  const combobox = document.querySelector("#loadingExample");
  const menu = document.querySelector("#loadingExampleComboboxMenu");

  const emptyMenu = () => {
    const menuoptions = menu.querySelectorAll('auro-menuoption');
    menuoptions.forEach(mo => menu.removeChild(mo));
  }

  const fillMenu = () => {
    menu.innerHTML += `
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    `;
  }

  const load = () => {
    clearTimeout(load.id);
    emptyMenu();
    menu.setAttribute('loading', 'loading');
    load.id = setTimeout(() => {
      menu.removeAttribute('loading');
      fillMenu();
    }, 1000);

  }

  combobox.addEventListener("input", (e) => {
    if (e.target.value && e.target.value !== e.target.optionSelected?.textContent) {
      load();
    }
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.html -->

```html
<auro-combobox id="loadingExample">
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleComboboxMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### in Dialog

The component can be in a dialog.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inDialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inDialog.html -->
  <div>
    <auro-button id="combobox-dialog-opener">Combobox in Dialog</auro-button>
    <auro-dialog id="combobox-dialog">
      <span slot="header">Combobox in Dialog</span>
      <div slot="content">
        <auro-combobox id="focusExample">
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          </auro-menu>
        </auro-combobox>
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
  <auro-button id="combobox-dialog-opener">Combobox in Dialog</auro-button>
  <auro-dialog id="combobox-dialog">
    <span slot="header">Combobox in Dialog</span>
    <div slot="content">
      <auro-combobox id="focusExample">
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
          <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
          <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
          <auro-menuoption static nomatch>No matching option</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-dialog>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inDialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inDialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#combobox-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#combobox-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
