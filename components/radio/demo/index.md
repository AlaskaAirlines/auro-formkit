<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Radio

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
`<auro-radio>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) that is rendered as a small circle, which is filled or highlighted when selected. Only one `<auro-radio>` component in a given `<auro-radio-group>` can be selected at the same time.
<!-- AURO-GENERATED-CONTENT:END -->

## auro-radio use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `<auro-radio>` element is designed to be a single component for the use of creating an input `type="radio"` with an associated `<label>` that meets all use case and accessibility standards.

The following examples illustrate fully functional `<auro-radio>` elements wrapped with the `<auro-radio-group>` element. The `<auro-radio-group>` element is REQUIRED in order to mantain the relationship between individual `<auro-radio>` elements for functional radio button actions.

**Note**: The `<auro-radio>` element is only for to for use as a set of two or more `<auro-radio>` elements within an `<auro-radio-group>` element.
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Default

This is a default configuration of `<auro-radio>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Default Group

This is a default configuration using the `<auro-radio-group>` and `<auro-radio>` elements. Notice the use of the `slot` attribute to set the group title of the `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basicGroup.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basicGroup.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basicGroup.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basicGroup.html -->

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

## Recommended Use and Version Control

There are two important parts of every Auro component. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element. The class is exported and then used as part of defining the Web Component. When importing this component as described in the <a href="#install">install</a> section, the class is imported and the `<auro-radio>` custom element is defined automatically.

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static `register(name)` method on the component class and pass in a unique name.

```js
import { AuroRadio } from './src/auro-radio.js';
import { AuroRadioGroup } from './src/auro-radio-group.js';

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');
```

This will create a new custom element that you can use in your HTML that will function identically to the `<auro-radio>` element.

Using the `AuroRadio.register` function to create a custom `<auro-radio>` will NOT create a custom `<auro-radio-group>`. If you are using `AuroRadioGroup`, you will need to register both `AuroRadio` and `AuroRadioGroup` with their respective `.register` function.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customRadio.html) -->
  <!-- The below content is automatically added from ./../apiExamples/customRadio.html -->
  <custom-radio-group>
    <span slot="legend">Form label goes here</span>
    <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
    <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
    <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
  </custom-radio-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customRadio.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/customRadio.html -->

```html
<custom-radio-group>
  <span slot="legend">Form label goes here</span>
  <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
  <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
  <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
</custom-radio-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
