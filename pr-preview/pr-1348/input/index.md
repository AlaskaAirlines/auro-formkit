<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Input

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
Use the `<auro-input>` custom element to create basic single-line text fields. Supports type `text`, `password`, and `email` with validation, required input, error states and a secondary `bordered` theme. Use the slots `label` and `helpText` for additional content support.
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `<auro-input>` element should be used in situations where users may:

* needs to enter information
* be filling out a form
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-input>
    <span slot="ariaLabel.clear">Clear All</span>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-input>
  <span slot="ariaLabel.clear">Clear All</span>
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Layouts

The `auro-input` element supports multiple layouts to fit different design needs. The available layouts are: `classic`, `emphasized`, and `snowflake`. Each layout offers a unique visual style while maintaining the same core functionality.

**Important**: The `emphasized` and `snowflake` layouts are designed specifically for dark backgrounds and should be used with the `appearance="inverse"` attribute.

#### Emphasized

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <label slot="label">From</label>
    <span slot="helpText">Example help text</span>
    <span slot="displayValue">
      <div>
        <div class="subText">Los Angeles</div>
      </div>
    </span>
  </auro-input>
  <auro-input id="beta" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <label slot="label">From</label>
    <span slot="helpText">Example help text</span>
  </auro-input>
  <auro-input id="charlie" layout="emphasized-left" shape="pill-left" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <label slot="label">From</label>
    <span slot="helpText">Example help text</span>
  </auro-input>
  <auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <label slot="label">From</label>
    <span slot="helpText">Example help text</span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <label slot="label">From</label>
  <span slot="helpText">Example help text</span>
  <span slot="displayValue">
    <div>
      <div class="subText">Los Angeles</div>
    </div>
  </span>
</auro-input>
<auro-input id="beta" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <label slot="label">From</label>
  <span slot="helpText">Example help text</span>
</auro-input>
<auro-input id="charlie" layout="emphasized-left" shape="pill-left" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <label slot="label">From</label>
  <span slot="helpText">Example help text</span>
</auro-input>
<auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <label slot="label">From</label>
  <span slot="helpText">Example help text</span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-input dvInputOnly value="lax" id="snowflakePill" layout="snowflake" shape="snowflake" size="lg" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
    <span slot="ariaLabel.clear">Clear All</span>
    <label slot="label">From</label>
    <span slot="helpText">Example help text</span>
    <span slot="displayValue">
      <div>
        <div class="subText">Los Angeles</div>
      </div>
    </span>
  </auro-input>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-input dvInputOnly value="lax" id="snowflakePill" layout="snowflake" shape="snowflake" size="lg" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
  <span slot="ariaLabel.clear">Clear All</span>
  <label slot="label">From</label>
  <span slot="helpText">Example help text</span>
  <span slot="displayValue">
    <div>
      <div class="subText">Los Angeles</div>
    </div>
  </span>
</auro-input>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
