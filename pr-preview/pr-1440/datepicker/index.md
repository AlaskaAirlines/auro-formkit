<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Datepicker

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The `<auro-datepicker>` element allows users to select a date, or a pair of dates identifying a range, either with text input or by making a section in a calendar. The `<auro-datepicker>` element is the combination of [auro-dropdown](http://auro.alaskaair.com/components/auro/dropdown), [auro-input](http://auro.alaskaair.com/components/auro/input), and Auro's extension of [wc-range-datepicker](https://www.npmjs.com/package/wc-range-datepicker).
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `<auro-datepicker>` element should be used in situations where users may:

* select a single date
* select a pair of dates which identify a calendar range
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-datepicker>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-datepicker>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Range

The datepicker can also be used to select a range between two dates by adding the `range` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/range.html) -->
  <!-- The below content is automatically added from ./../apiExamples/range.html -->
  <auro-datepicker range>
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
    <span slot="fromLabel">Departure</span>
    <span slot="toLabel">Return</span>
    <span slot="bib.fullscreen.fromLabel">Departure</span>
    <span slot="bib.fullscreen.toLabel">Return</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/range.html -->

```html
<auro-datepicker range>
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Snowflake Layout

Use `layout="snowflake"`, with `shape="snowflake"` and `appearance="inverse"` to apply the snowflake layout to the datepicker. This layout is designed for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-datepicker layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="label">Date</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-datepicker layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="label">Date</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Range

Ranged variation of the snowflake layout.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/range.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/range.html -->
  <auro-datepicker range layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
    <span slot="ariaLabel.bib.close">Close Calendar</span>
    <span slot="fromLabel">From Date Test</span>
    <span slot="toLabel">To Date Test</span>
    <span slot="label">Testing Date Label</span>
    <span slot="bib.fullscreen.headline">Datepicker Headline</span>
    <span slot="bib.fullscreen.fromLabel">Choose a departing date</span>
    <span slot="bib.fullscreen.toLabel">Choose a returning date</span>
  </auro-datepicker>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/range.html -->

```html
<auro-datepicker range layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
  <span slot="ariaLabel.bib.close">Close Calendar</span>
  <span slot="fromLabel">From Date Test</span>
  <span slot="toLabel">To Date Test</span>
  <span slot="label">Testing Date Label</span>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="bib.fullscreen.fromLabel">Choose a departing date</span>
  <span slot="bib.fullscreen.toLabel">Choose a returning date</span>
</auro-datepicker>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
