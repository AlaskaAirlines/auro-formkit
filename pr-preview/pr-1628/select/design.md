<auro-header level="1" id="overview">Select: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>Trigger:</strong> Shows the label, the current value, and the component's state, such as <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, or <code>invalid</code>, plus an "(optional)" flag when the component isn't required.
</li>
<li>
<strong>Options list:</strong> The options people can select, shown in a bib that opens and closes from the trigger.
</li>
<li>
<strong>Help text:</strong> Text below the trigger that explains how to use the component, or, when it's invalid, what's wrong and how to fix it.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the label, an "(optional)" flag when the component isn't required, and the current value. The label is required so screen reader users, including VoiceOver users, know what the component is for. When the component becomes invalid, screen readers announce the error message.</p>
<p>To change the "(optional)" text, use the <code>optionalLabel</code> slot.</p>
<p>In single-select mode, the trigger shows the selected option's full content, including any icons. In <code>multiSelect</code> mode, it shows the selected options' text, separated by commas.</p>
<p>The trigger can receive focus and visually responds to common UI states: <strong>Hover</strong> <em>(<code>:hover</code>)</em>, <strong>Focus</strong> <em>(<code>:focus-within</code>)</em>, and <strong>Disabled</strong> <em>(the <code>disabled</code> attribute)</em>. The <strong>Active</strong> <em>(<code>:active</code>)</em> state uses the same style as focus.</p>
<auro-header level="4" id="options">List options</auro-header>
<p>The component renders a list of options that people can select. Each option can be in one of the following states:</p>
<ul>
<li>
<code>selected</code>: One option can be selected at a time, and it sets the component's current value. Set <code>multiSelect</code> to allow more than one selected option.
</li>
<li>
<code>active</code>: One option can be active at a time. The active option is the one that becomes selected when the user confirms a choice.
</li>
<li>
<code>disabled</code>: One or more options can be disabled. Disabled options aren't interactive and can't become active or selected.
</li>
</ul>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text isn't required. Still, consider how people understand the full context of the component, particularly screen reader users. In some cases, a label alone may be confusing.</p>
<p>When the component fails validation, an error message replaces the help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the component is on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Select example</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
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
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is on a dark background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-select appearance="inverse">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Select example</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
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
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-select</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> attributes. It defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic layout</auro-header>
<p>The <code>classic</code> layout is the default for <code>auro-select</code>, so it needs no extra attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Select example</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
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
<auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
<p>The <code>emphasized</code> layout is only supported on light backgrounds.</p>
<p>The <code>emphasized</code> layout supports the following shapes:</p>
<ul>
<li><code>pill</code></li>
<li><code>pill-left</code></li>
<li><code>pill-right</code></li>
</ul>
<p>The <code>emphasized</code> layout supports the following sizes:</p>
<ul>
<li><code>xl</code></li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<div style="display: flex; flex-direction: row; gap: 10px;">
<auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Select example</span>
<span slot="label">Select example</span>
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
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Select example</span>
<span slot="label">Select example</span>
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
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Select example</span>
<span slot="label">Select example</span>
<span slot="helpText">No display value in the menu options</span>
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
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Select example&lt;/span&gt;
    &lt;span slot="label"&gt;Select example&lt;/span&gt;
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
&#10;  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Select example&lt;/span&gt;
    &lt;span slot="label"&gt;Select example&lt;/span&gt;
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
&#10;  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Select example&lt;/span&gt;
    &lt;span slot="label"&gt;Select example&lt;/span&gt;
    &lt;span slot="helpText"&gt;No display value in the menu options&lt;/span&gt;
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
<auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a one-off layout that doesn't follow the usual pattern. Use it only as shown in the following example.</p>
<p>The <code>snowflake</code> layout is only for dark backgrounds, together with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Label</span>
<span slot="label">Label</span>
<span slot="helpText">Help text</span>
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
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Label&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
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
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
