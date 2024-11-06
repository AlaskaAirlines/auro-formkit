<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Checkbox

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./description.md) -->
<!-- The below content is automatically added from ./description.md -->
`<auro-checkbox>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of allowing users to select one or more options of a limited number of choices.
<!-- AURO-GENERATED-CONTENT:END -->

## auro-checkbox use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./useCases.md) -->
<!-- The below content is automatically added from ./useCases.md -->
The `<auro-checkbox>` element should be used in situations where users may:

* Be filling out a form
* Need to select one or more options
<!-- AURO-GENERATED-CONTENT:END -->

## Additional Information

## Example(s)

### Default

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/basic.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="checkbox option" name="example1" id="checkbox-basic1">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox option" name="example2" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox option" name="example3" id="checkbox-basic3">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox option" name="example4" id="checkbox-basic4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/basic.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checkbox option" name="example1" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example2" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example3" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example4" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable individual `<auro-checkbox>` elements or the entire `<auro-checkbox-group>`.

#### Disabled Group

The `disabled` attribute used to disable the entire `<auro-checkbox-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabledGroup.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabledGroup.html -->
  <auro-checkbox-group disabled>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabledGroup.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabledGroup.html -->

```html
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled Checkbox within Group

The `disabled` attribute used to disable a single `<auro-checkbox>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabled.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabled1">Checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabled.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Required Group

When present, the `required` attribute specifies that at least one or more `<auro-checkbox>` elements within the `<auro-checkbox-group>` must be checked.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/required.html -->
  <auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="checked option" name="example1" id="checkbox-required1">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example2" id="checkbox-required2">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example3" id="checkbox-required3">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example4" id="checkbox-required4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/required.html -->

```html
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checked option" name="example1" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example2" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example3" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example4" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to force an error state on the element.

#### Checkbox Group with Error

The `error` attribute used to set error state on the entire `<auro-checkbox-group>`. If using the `error` attribute on an `<auro-checkbox-group>`, a string with the error message needs to be passed along with the attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/errorGroup.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/errorGroup.html -->
  <auro-checkbox-group error="custom error">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="error checkbox option" name="example1" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example2" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example3" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example4" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/errorGroup.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/errorGroup.html -->

```html
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error checkbox option" name="example1" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example2" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example3" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example4" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Horizontal Group

Using the `horizontal` attribute will render the checkbox options on a horizontal line.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/horizontal.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/horizontal.html -->
  <auro-checkbox-group horizontal>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="checkbox option" value="yes" id="checkbox-horizontal1">Yes</auro-checkbox>
    <auro-checkbox value="checkbox option" value="no" id="checkbox-horizontal2">No</auro-checkbox>
    <auro-checkbox value="checkbox option" value="maybe" id="checkbox-horizontal3">Maybe</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/horizontal.html -->

```html
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checkbox option" value="yes" id="checkbox-horizontal1">Yes</auro-checkbox>
  <auro-checkbox value="checkbox option" value="no" id="checkbox-horizontal2">No</auro-checkbox>
  <auro-checkbox value="checkbox option" value="maybe" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Horizontal Group Limitation

Using the `horizontal` attribute has a limit of 3 options. Beyond three, options will be listed in vertically.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/horizontalLimit.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/horizontalLimit.html -->
  <auro-checkbox-group horizontal>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="checkbox option" value="yes" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
    <auro-checkbox value="checkbox option" value="no" id="checkbox-horizontalLimit2">No</auro-checkbox>
    <auro-checkbox value="checkbox option" value="maybe" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
    <auro-checkbox value="checkbox optiom" value="not sure" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/horizontalLimit.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/horizontalLimit.html -->

```html
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checkbox option" value="yes" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
  <auro-checkbox value="checkbox option" value="no" id="checkbox-horizontalLimit2">No</auro-checkbox>
  <auro-checkbox value="checkbox option" value="maybe" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
  <auro-checkbox value="checkbox optiom" value="not sure" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Recommended Use and Version Control

There are two important parts of every Auro component. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element. The class is exported and then used as part of defining the Web Component. When importing this component as described in the <a href="#install">install</a> section, the class is imported and the `auro-checkbox` custom element is defined automatically.

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static `register(name)` method on the component class and pass in a unique name.

```js
import { AuroCheckbox } from './src/auro-checkbox.js';
import { AuroCheckboxGroup } from './src/auro-checkbox-group.js';

AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This will create a new custom element that you can use in your HTML that will function identically to the `<auro-checkbox>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/customCheckbox.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/customCheckbox.html -->
  <custom-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <custom-checkbox value="checkbox option" name="example1" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="checkbox option" name="example2" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
    <custom-checkbox value="checkbox option" name="example3" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="checkbox option" name="example4" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
  </custom-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/customCheckbox.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/customCheckbox.html -->

```html
<custom-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <custom-checkbox value="checkbox option" name="example1" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="checkbox option" name="example2" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
  <custom-checkbox value="checkbox option" name="example3" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="checkbox option" name="example4" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
</custom-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
