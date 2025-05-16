<!--
The demo.md file is a compiled document. No edits should be made directly to this file.

demo.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/demo.md`
-->

# Select

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Default example

A baseline `<auro-select>` using `<auro-menu>` and `<auro-menuoption>` elements. Notice a default `Please select option` placeholder in the trigger.

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

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## placeholder

Use the `placeholder` slot to inject a custom placeholder option with the select element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customPlaceholder.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customPlaceholder.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Label, placeholder and help text slots

The following example illustrates the use of the `label`, `placeholder` and `helptext` slots for additional placement of content around the select menu.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/slots.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/slots.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>


## Autofill/Autocomplete Support

Use the `autocomplete` attribute to let browser's know what information to use to fill out the form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/autocomplete.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Example with auro-icons in options

Displays an `<auro-select>` element with `<auro-icon>` elements in each option.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/withIcons.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/withIcons.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Example with nested menus

This example shows nesting `<auro-menu>` elements to create submenus.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/withSubmenus.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>


<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/withSubmenus.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Example with no checkmark

Applying the `noCheckmark` attribute will prevent the checkmark icon from being shown on the selected option. The left padding to reserve space for the checkmark will not be shown.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noCheckmark.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noCheckmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Example with custom bib height

This example shows how to set a custom height for the bib from `<auro-dropdown>`.

Custom height dimensions are set by using the `dropdownSize` CSS Part and then applying a `max-height` rule and value.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/customBibHeight.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/customBibHeight.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Example with fullscreen dropdown breakpoint override

This example overrides the default dropdown behavior to force a non-fullscreen view on any screen size. `disabled`
ensures that the dropdown will never be fullscreen.
Please use `xl` if you want the opposite behavior, where a dropdown is always fullscreen.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/forcedFullscreenDisabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>


<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/forcedFullscreenDisabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>


## Error State

Use the `error` boolean attribute to toggle the error UI.

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


## Disabled state

Use the `disabled` boolean attribute to toggle the disabled UI.

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
