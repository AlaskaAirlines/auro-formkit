<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Combobox

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
`<auro-combobox>` is the combination of [dropdown](http://auro.alaskaair.com/components/auro/dropdown), [input](http://auro.alaskaair.com/components/auro/input), and [menu](http://auro.alaskaair.com/components/auro/menu) and allows users to filter search results from a predefined list as they type. When the user starts typing in the text input, a dropdown of a menu shows up to display options that match the user’s search.

By default, `auro-combobox` behaves as a suggestion list. This means any value may be typed into the combobox and the menu list presented effectively provides sample or suggestion options. With the use of the `persistInput` attribute the `auro-combobox` behaves as a filter of menu options. In this mode. typing into the input field will execute the filter but will not set the `value` of the combobox. The combobox value is set by selecting a menu option. Clicking the `X` clear button in the input will remove the current value of the HTML5 input causing the menu filter to reset as well as remove the current value of the combobox.
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `<auro-combobox>` element should be used in situations where users may:

* Search
  * Airports: user looks for a specific airport by searching for the city name or airport code
  * Site wide: user searches for a topic site wide and combobox makes suggestions on searchable results
* Filter
  * Options: user chooses filters for their search by using combobox
* Select
  * Quantity: user types a quantity to select an option within a range (for example, the user may be limited to 2-34)
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-combobox>
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Layouts

#### Emphasized

Use `layout="emphasized"` to apply the emphasized style to the combobox. This layout is designed for use on light backgrounds.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
    <span slot="displayValue">
      <div>
        <div class="mainText">Apples</div>
        <div class="subText">Fruit</div>
      </div>
    </span>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
  <span slot="displayValue">
    <div>
      <div class="mainText">Apples</div>
      <div class="subText">Fruit</div>
    </div>
  </span>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake

Use `layout="snowflake"`, with `shape="snowflake"` and `appearance="inverse"` to apply the snowflake style to the combobox. This layout is designed for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
