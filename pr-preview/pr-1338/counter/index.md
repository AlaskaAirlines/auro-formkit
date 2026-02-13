<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Counter

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The `auro-counter` component is a ui element that enables a way to increment or decrement a single digit value. Common use case is inside the `auro-counter-group` to facilitate a collection of counters to add passenger types to a flight.
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `auro-counter` element should be used in situations where users may:

* Need to input a numeric value within a defined range
* Need a user-friendly interface for quantity selection
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic Counter

The counter component provides a simple interface for incrementing or decrementing numeric values. It displays a label with increment/decrement buttons and the current value. 

This example demonstrates most basic implementation of a standalone counter.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
  <auro-counter>
    Adults
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->

```html
<auro-counter>
  Adults
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Basic Counter Group

Counter groups allow you to manage multiple related counters together. This is useful when you need to collect multiple quantities that are related, such as different passenger types.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-counter-group>
    <auro-counter>
      Short label
    </auro-counter>
    <auro-counter>
      Another short label
    </auro-counter>
    <auro-counter>
      This is an example of the wrapping behavior for a long label
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-counter-group>
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
