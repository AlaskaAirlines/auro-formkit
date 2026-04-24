<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Menu

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The `<auro-menu>` element provides a list of options for a user to select from.

A list of options is created within the `<slot>` of the `<auro-menu>` element by using the `<auro-menuoption>` element to define options. Use a standard `<hr>` element to create dividers within the list of options.

The `<auro-menu>` element is designed for contextual menus, e.g. a dropdown menus. They are not intended to be used for navigation menus which have a different semantic meaning. The `<auro-menu>` element does not support hide/show functionality within its scope. This functionality will be managed by a wrapping element such as a drop-down menu composite element.
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `<auro-menu>` element should be used in situations where users may:

* A user needs to select one option from a list of options.
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preselect.html) -->
  <!-- The below content is automatically added from ./../apiExamples/preselect.html -->
  <auro-menu>
    <auro-menuoption value="new tab">New tab</auro-menuoption>
    <auro-menuoption value="new window" selected>New window</auro-menuoption>
    <auro-menuoption value="open file">Open file</auro-menuoption>
    <auro-menuoption value="open location">Open location</auro-menuoption>
    <hr>
    <auro-menuoption value="close window">Close window</auro-menuoption>
    <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
    <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
    <hr>
    <auro-menuoption value="share" disabled>Share</auro-menuoption>
    <hr>
    <auro-menuoption value="print">Print</auro-menuoption>
  </auro-menu>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preselect.html -->

```html
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window" selected>New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
