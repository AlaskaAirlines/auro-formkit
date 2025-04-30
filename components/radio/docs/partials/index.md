<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Radio

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## auro-radio use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Default

This is a default configuration of `<auro-radio>`.

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

### Accordion Nested Group

This example shows how to use `<auro-accordion>` with the `<auro-radio-group>` and `<auro-radio>` elements for
nested/optional groups (such as a "More Options" section in a payment processor).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/accordionExample.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/accordionExample.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>
