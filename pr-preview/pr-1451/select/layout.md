<auro-header level="1" id="overview">Select - Layout</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">

### Component Anatomy

The `auro-select` component is composed of two key parts:

- **Trigger** — The visible, interactive element that the user clicks (or otherwise activates) to expand the component. The trigger displays the current selection or placeholder text.
- **Bib** — The expandable panel that appears when the trigger is activated. The bib contains the menu options that the user may select by clicking on them.

When the trigger is activated, the bib expands to reveal the available options. Selecting an option from the bib updates the trigger's displayed value and collapses the bib.

### Shape | Size | Layout Support

The `auro-select` component supports the `shape`, `size` and `layout` feature set. The component defaults to the `layout="classic"`, `shape="classic"` and `size="lg"`.

#### Classic Layout (Legacy)

The `classic` layout is default for `auro-select`. No customization is needed to achieve this look.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Select Example</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<div style="display: flex; flex-direction: row; gap: 10px;">
<auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="label">Select Example</span>
<auro-menu nocheckmark>
<auro-menuoption value="flights">
<auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="cars">
<auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="hotels">
<auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="packages">
<auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="cruises">
<auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
</auro-menuoption>
</auro-menu>
</auro-select>
<auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;">
<span slot="label">Select Example</span>
<auro-menu nocheckmark>
<auro-menuoption value="flights">
<auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="cars">
<auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="hotels">
<auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="packages">
<auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="cruises">
<auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
<auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
</auro-menuoption>
</auro-menu>
</auro-select>
<auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;">
<span slot="label">Select Example</span>
<span slot="helpText">no displayValue in menuoptions</span>
<auro-menu nocheckmark>
<auro-menuoption value="flights">
<auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
</auro-menuoption>
<auro-menuoption value="cars">
<auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
</auro-menuoption>
<auro-menuoption value="hotels">
<auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
</auro-menuoption>
<auro-menuoption value="packages">
<auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
</auro-menuoption>
<auro-menuoption value="cruises">
<auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
</auro-menuoption>
</auro-menu>
</auro-select>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

<pre class="language-html"><code class="language-html">&lt;div style="display: flex; flex-direction: row; gap: 10px;"&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;"&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;"&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;span slot="helpText"&gt;no displayValue in menuoptions&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake Layout

The `snowflake` layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.

The `snowflake` layout is only expected to be used on dark backgrounds, in conjunction with `appearance="inverse"`.

<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="label">Label</span>
<span slot="helpText">Help Text</span>
<auro-menu nocheckmark>
<auro-menuoption value="flights">
<auro-icon category="terminal" name="plane-diag-stroke" customColor></auro-icon> Flights
</auro-menuoption>
<auro-menuoption value="cars">
<auro-icon category="destination" name="car-rental-stroke" customColor></auro-icon> Cars
</auro-menuoption>
<auro-menuoption value="hotels">
<auro-icon category="destination" name="hotel-stroke" customColor></auro-icon> Hotels
</auro-menuoption>
<auro-menuoption value="packages">
<auro-icon category="shop" name="gift-stroke" customColor></auro-icon> Packages
</auro-menuoption>
<auro-menuoption value="cruises">
<auro-icon category="in-flight" name="boarding" customColor></auro-icon> Cruises
</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
  &lt;auro-menu nocheckmark&gt;
    &lt;auro-menuoption value="flights"&gt;
      &lt;auro-icon category="terminal" name="plane-diag-stroke" customColor&gt;&lt;/auro-icon&gt; Flights
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cars"&gt;
      &lt;auro-icon category="destination" name="car-rental-stroke" customColor&gt;&lt;/auro-icon&gt; Cars
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hotels"&gt;
      &lt;auro-icon category="destination" name="hotel-stroke" customColor&gt;&lt;/auro-icon&gt; Hotels
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="packages"&gt;
      &lt;auro-icon category="shop" name="gift-stroke" customColor&gt;&lt;/auro-icon&gt; Packages
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cruises"&gt;
      &lt;auro-icon category="in-flight" name="boarding" customColor&gt;&lt;/auro-icon&gt; Cruises
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
