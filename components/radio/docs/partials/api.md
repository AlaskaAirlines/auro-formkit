<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Default

The following example illustrates the default use of the `<auro-radio>` custom element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>


<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDark.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->


<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDark.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

</auro-accordion>

### Default Group

This is a default configuration using the `<auro-radio-group>` and `<auro-radio>` elements. Notice the use of the `slot` attribute to set the group title of the `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basicGroup.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkGroup.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basicGroup.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkGroup.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>


### Checked

Use the `checked` attribute to pre-select a `<auro-radio>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checked.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkChecked.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checked.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkChecked.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Disabled

Use the `disabled` attribute to disable singular `<auro-radio>` elements or the entire `<auro-radio-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkDisabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkDisabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Error

Use the `error` attribute to apply a persistent custom error that supersedes the HTML5 validation logic.

A custom error message can be set using the `error` attribute, or it can be used in conjuction with the `setCustomValidityCustomError` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkError.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkError.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Horizontal Group

Using the `horizontal` attribute will render the `auro-radio` elements in a horizontal line.

**Note**: Using the horizontal attribute has a limit of 3 options. Beyond three, options will be listed in vertically.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/horizontal.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/horizontal.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Required

When present, the `required` attribute specifies that an `<auro-radio>` within the `<auro-radio-group>` must be checked. There is no error message associated with the `required` attribute by default. Use `setCustomValidityValueMissing` to set a custom error message.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Custom optional label

The `<auro-radio-group>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optionalLabel.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optionalLabel.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Reset State

Use the `reset()` method to reset the `<auro-radio-group>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/resetState.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/resetState.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/resetState.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Dynamic Example

This example demonstrates a data drive approach to rendering `<auro-radio>` buttons.

**Note**: When dynamically creating `<auro-radio>` elements, make sure to add an `id` attribute, as it is a required part of the HTML5 spec for all form elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
