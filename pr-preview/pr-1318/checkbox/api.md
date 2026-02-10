<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-checkbox-group

The `auro-checkbox-group` element is a wrapper for `auro-checkbox` elements..

## Properties

| Property                        | Attribute                       | Type                     | Default     | Description                                      |
|---------------------------------|---------------------------------|--------------------------|-------------|--------------------------------------------------|
| [appearance](#appearance)                    | `appearance`                    | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [disabled](#disabled)                      | `disabled`                      | `boolean`                |             | If set, disables the checkbox group.             |
| [error](#error)                         | `error`                         | `string`                 |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| [horizontal](#horizontal)                    | `horizontal`                    | `boolean`                |             | If set, checkboxes will be aligned horizontally. |
| [noValidate](#noValidate)                    | `noValidate`                    | `boolean`                |             | If set, disables auto-validation on blur.        |
| [onDark](#onDark)                        | `onDark`                        | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| [required](#required)                      | `required`                      | `boolean`                |             | Populates the `required` attribute on the element. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `string`                 |             | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `string`                 |             | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `string`                 |             | Custom help text message to display when validity = `valueMissing`. |
| [validity](#validity)                      | `validity`                      | `string`                 |             | Specifies the `validityState` this element is in. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| [reset](#reset)    | `(): void`                             | Resets component to initial state.               |
| [validate](#validate) | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| [input](#input)                     | `CustomEvent<any>` |                                                  |

## Slots

| Name            | Description                                      |
|-----------------|--------------------------------------------------|
| [default](#default)       | The default slot for the checkbox items.         |
| [helpText](#helpText)      | Allows for the helper text to be overridden.     |
| [legend](#legend)        | Allows for the legend to be overridden.          |
| [optionalLabel](#optionalLabel) | Allows overriding the optional display text "(optional)", which appears next to the label. |

# auro-checkbox

The `auro-checkbox` element is for the purpose of allowing users to select one or more options of a limited number of choices.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| [appearance](#appearance) | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [checked](#checked)    | `checked`    | `boolean`                |             | If set to true, the checkbox will be filled with a checkmark. |
| [disabled](#disabled)   | `disabled`   | `boolean`                |             | If set to true, the checkbox will not be clickable. |
| [error](#error)      | `error`      | `boolean`                |             | If set to true, the checkbox will be displayed with an error state. |
| [id](#id)         | `id`         | `string`                 |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |
| [name](#name)       | `name`       | `string`                 |             | Accepts any string and is used to identify related checkboxes when submitting form data. |
| [onDark](#onDark)     | `onDark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| [value](#value)      | `value`      | `string`                 |             | Sets the element's input value. Must be unique within an auro-checkbox-group element. |

## Methods

| Method  | Type       | Description                        |
|---------|------------|------------------------------------|
| [reset](#reset) | `(): void` | Resets component to initial state. |

## Events

| Event                   | Type               | Description                                      |
|-------------------------|--------------------|--------------------------------------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` |                                                  |
| `auroCheckbox-focusout` | `CustomEvent<any>` |                                                  |
| `auroCheckbox-input`    | `CustomEvent<any>` |                                                  |
| [change](#change)                | `CustomEvent<any>` | (Deprecated) Notifies when checked value is changed. |
| [input](#input)                 | `InputEvent`       | Notifies when when checked value is changed by user's interface. |

## Slots

| Name      | Description                              |
|-----------|------------------------------------------|
| [default](#default) | The default slot for the checkbox label. |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| [checkbox](#checkbox)       | apply css to a specific checkbox.         |
| `checkbox-input` | apply css to a specific checkbox's input. |
| `checkbox-label` | apply css to a specific checkbox's label. |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label</span>
    <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
    <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
    <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
    <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to render the checkbox for use on dark backgrounds.

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-checkbox-group appearance="inverse">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
    <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
    <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
    <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-checkbox-group appearance="inverse">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable individual `<auro-checkbox>` elements or the entire `<auro-checkbox-group>`.

#### Disabled Checkbox within Group

The `disabled` attribute used to disable a single `<auro-checkbox>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled Group

The `disabled` attribute used to disable the entire `<auro-checkbox-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled-group.html -->
  <auro-checkbox-group disabled>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-checkbox-group appearance="inverse" disabled>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-group.html -->

```html
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<auro-checkbox-group appearance="inverse" disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Horizontal Group

Using the `horizontal` attribute will render the checkbox options on a horizontal line.

**Note**: Using the `horizontal` attribute has a limit of 3 options. Beyond three, options will be listed in vertically.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/horizontal.html) -->
  <!-- The below content is automatically added from ./../apiExamples/horizontal.html -->
  <auro-checkbox-group horizontal>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
    <auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
    <auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/horizontal.html -->

```html
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Form Validation

In the `auro-checkbox-group` element, the `required` and `error` states are the two possible validation states.

It should be noted that form validation is only supported within an `auro-checkbox-group` element. In order to support validation on a single `auro-checkbox` element, it must be wrapped in an `auro-checkbox-group`.

### Error

Use the `error` attribute to force an error state on the element.

The `error` attribute used to set error state on the entire `<auro-checkbox-group>`. If using the `error` attribute on an `<auro-checkbox-group>`, a string with the error message needs to be passed along with the attribute.

**Note**: The `error` attribute is only supported on the `<auro-checkbox-group>` element, not on individual `<auro-checkbox>` elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error-group.html -->
  <auro-checkbox-group error="custom error">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-checkbox-group appearance="inverse" error="custom error">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error-group.html -->

```html
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<auro-checkbox-group appearance="inverse" error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Required

When present, the `required` attribute specifies that at least one or more `<auro-checkbox>` elements within the `<auro-checkbox-group>` must be checked.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
    <auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
    <auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
    <auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Slot Examples

### Custom Optional Label

The `<auro-checkbox-group>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <span slot="optionalLabel" style="font-size: small; color: grey"> - optional</span>
    <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
    <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
    <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
    <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <span slot="optionalLabel" style="font-size: small; color: grey"> - optional</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Reset State

Use the `reset()` method to reset the `<auro-checkbox-group>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br/><br/>
  <auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="value1" name="resetState" id="checkbox-basic1">Checkbox option</auro-checkbox>
    <auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
    <auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
    <auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="resetState" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
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

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host {
  --ds-auro-checkbox-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-checkbox-checkmark-color: var(--ds-advanced-color-boolean-indicator, #{v.$ds-advanced-color-boolean-indicator});
  --ds-auro-checkbox-container-color: var(--ds-advanced-color-boolean-isfalse, #{v.$ds-advanced-color-boolean-isfalse});
  --ds-auro-checkbox-label-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-checkbox-outline-color: transparent;
  --ds-auro-checkbox-group-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
```
<!-- AURO-GENERATED-CONTENT:END -->
