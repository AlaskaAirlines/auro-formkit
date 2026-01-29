<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Dropdown

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The `auro-dropdown` component is a trigger and dropdown element combination intended to be used with dropdown content that is interactive. `auro-dropdown` is content agnostic and any valid HTML can be placed in either the trigger or the dropdown.

_Note: if the dropdown content in your implementation is not interactive (e.g. a tooltip) [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs._
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `auro-dropdown` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when interactive help is required
<!-- AURO-GENERATED-CONTENT:END -->

## Accessibility support

To meet our accessibility requirement, all uses of `auro-dropdown` should have a valid label. See the following options.

1. Use the `label` content slot
1. Use `aria-label` to insert label content that will only be read by screen readers
1. Use `aria-labeledby` to append a description from another element on the page

Not including one of the above options will result in your UI being non-compliant with Alaska's accessibility policies.

## Supported Standard and Accessible Interactions

The dropdown can be opened with the following actions:

1. Clicking/tapping on the trigger.
1. Tabbing to the trigger and using the `enter` or `spacebar` keys.
1. Programmatically via another control in the UI calling the `show()` method (see api).

The dropdown can be closed with the following actions:

1. Clicking anywhere in the view outside of the dropdown.
1. Using the `esc` key.
1. Programmatically via another control in the UI calling the `hide()` method (see api).

## Example(s)

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-dropdown aria-label="custom label">
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Layouts

The `auro-dropdown` element supports multiple layouts to fit different design needs. The available layouts are: `classic`, `emphasized`, and `snowflake`. Each layout offers a unique visual style while maintaining the same core functionality.

**Important**: The `emphasized` and `snowflake` layouts are designed specifically for dark backgrounds and should be used with the `appearance="inverse"` attribute.

#### Classic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/classic/basic.html -->
  <auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150);">
      Lorem ipsum solar
      <br />
      <auro-button id="classicButton">
        Dismiss Dropdown
      </auro-button>
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/basic.html -->

```html
<auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button id="classicButton">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/classic/appearance-inverse.html -->
  <auro-dropdown id="classicInverse" appearance="inverse" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150);">
      Lorem ipsum solar
      <br />
      <auro-button id="classicInverseButton">
        Dismiss Dropdown
      </auro-button>
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/appearance-inverse.html -->

```html
<auro-dropdown id="classicInverse" appearance="inverse" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button id="classicInverseButton">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Emphasized

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-dropdown>
  <auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-dropdown>
  <auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse">
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
