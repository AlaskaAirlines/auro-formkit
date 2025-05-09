<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Dropdown

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Dropdown use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
## Accessibility support

To meet our accessibility requirement, all uses of `auro-dropdown` should have a valid label. See the following options.

1. Use the `label` content slot
1. Use `aria-label` to insert label content that will only be read by screen readers
1. Use `aria-labeledby` to append a description from another element on the page

Not including one of the above options will result in your UI being non-compliant with Alaska's accessibility policies.

## Common use with auro-label

This first common example uses the default `auro-dropdown` element with the attributes of `bordered` `rounded` `inset` `toggle` and `chevron`. Additionally the `aria-label` attribute is used to define a string value that labels an interactive element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/common.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkCommon.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/common.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkCommon.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>


## Common use using the label content slot

This common example uses the default `auro-dropdown` element with the attributes of `bordered` `rounded` `inset` `toggle` and `chevron`. Additionally the `slot` content container to define a string value that labels the interactive element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/commonSlot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkCommonSlot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/commonSlot.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/onDarkCommonSlot.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common use with popover content wider than the trigger

This common example uses the default `auro-dropdown` element with the attributes of `bordered` `rounded` `inset` `toggle` and `chevron`. Additionally the trigger is full width of the containing element and the popover content is set to a width wider than the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/widerPopover.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/widerPopover.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common use with popover width matching the trigger

This common example uses the default `auro-dropdown` element with the attributes of `bordered` `rounded` `inset` `toggle` and `chevron`. Additionally  `matchWidth` attribute is used to make the popover match the width of the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/commonMatchWidth.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/commonMatchWidth.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common use with its width matching the trigger

To make the dropdown to be just big as the trigger's content, style the `auro-dropdown` width `display: inline-block`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inline.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inline.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Triggering a fullscreen dropdown
This example shows how to set a dropdown fullscreen breakpoint attribute. Most consuming components use `sm` by default, but
dropdown supports `xs`, `sm`, `md`, `lg`, `xl` and `disabled`, with `disabled` ensuring that the dropdown will never be fullscreen.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Supported standard and accessible interactions

The dropdown can be opened with the following actions:

1. Clicking/tapping on the trigger.
1. Tabbing to the trigger and using the `enter` or `spacebar` keys.
1. Programmatically via another control in the UI calling the `show()` method (see api).

The dropdown can be closed with the following actions:

1. Clicking anywhere in the view outside of the dropdown.
1. Clicking on the trigger when the `toggle` attribute is used.
1. Using the `esc` key.
1. Programmatically via another control in the UI calling the `hide()` method (see api).
