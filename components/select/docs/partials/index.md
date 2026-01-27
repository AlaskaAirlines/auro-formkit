<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Select
 
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
 
## Use Cases
 
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
 
## Example(s)

### Basic

A baseline `<auro-select>` using `<auro-menu>` and `<auro-menuoption>` elements.
 
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
 
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
 
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
 
</auro-accordion>

### Shape | Size | Layout Support

The `auro-select` component supports the `shape`, `size` and `layout` feature set. The component defaults to the `layout="classic"`, `shape="classic"` and `size="lg"`.

#### Classic Layout (Legacy)

The `classic` layout is default for `auro-select`. No customization is needed to achieve this look.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Emphasized Layout

The `emphasized` layout is only supported on light backgrounds.

The `emphasized` layout supports the following shapes:
- `pill`
- `pill-left`
- `pill-right`

The `emphasized` layout supports the following sizes:
- `xl`

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Snowflake Layout

The `snowflake` layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.

The `snowflake` layout is only expected to be used on dark backgrounds, in conjunction with `appearance="inverse"`.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>
