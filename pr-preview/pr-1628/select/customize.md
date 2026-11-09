<auro-header level="1" id="overview">Select: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, size, and layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom display value</auro-anchorlink>
<auro-anchorlink fluid href="#resetOption" class="level2 body-xs">Reset option</auro-anchorlink>
<auro-anchorlink fluid href="#noCheckmark" class="level2 body-xs">No checkmark</auro-anchorlink>
<auro-anchorlink fluid href="#fluid" class="level2 body-xs">Fluid</auro-anchorlink>
<auro-anchorlink fluid href="#flexMenuWidth" class="level2 body-xs">Flex menu width</auro-anchorlink>
<auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match width</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No flip</auro-anchorlink>
<auro-anchorlink fluid href="#offset" class="level2 body-xs">Offset</auro-anchorlink>
<auro-anchorlink fluid href="#shift" class="level2 body-xs">Shift</auro-anchorlink>
<auro-anchorlink fluid href="#largeHeader" class="level2 body-xs">Large fullscreen header</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#autoComplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#typeAhead" class="level2 body-xs">Type-ahead</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable options</auro-anchorlink>
<auro-anchorlink fluid href="#submenus" class="level2 body-xs">Submenus</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force error state</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
<auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
<auro-anchorlink fluid href="#loading" class="level2 body-xs">Loading</auro-anchorlink>
<auro-anchorlink fluid href="#nonUniqueValues" class="level2 body-xs">Non-unique option values</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="layout">Shape, size, and layout</auro-header>
<p>The <code>shape</code>, <code>size</code>, and <code>layout</code> attributes work together to control the overall look of the component.</p>
<p>See the <auro-hyperlink href="design">Design page</auro-hyperlink> for a detailed breakdown.</p>
<auro-header level="3" id="background">Light vs. dark background</auro-header>
<p>The <code>appearance</code> attribute sets the colors to match the background behind the component. Use <code>inverse</code> on dark backgrounds and <code>default</code>, the default value, on light ones.</p>
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
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance.html -->
<auro-select appearance="inverse" placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Inverse appearance</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse" placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse appearance&lt;/span&gt;
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
<auro-header level="3" id="displayValue">Custom display value</auro-header>
<p>The <code>displayValue</code> slot shows custom HTML content in place of the selected option's text while the bib is closed. Put the content inside each <code>&lt;auro-menuoption&gt;</code> with <code>slot="displayValue"</code>. Use it to show icons, formatted text, or other rich content in the trigger.</p>
<p>To keep showing the selected option's display value even while the bib is open, set the <code>forceDisplayValue</code> attribute on the component, which visually hides the label and value text.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/display-value.html -->
<auro-select forceDisplayValue>
<span slot="bib.fullscreen.headline">Travel type</span>
<span slot="label">Travel type</span>
<auro-menu>
<auro-menuoption value="flights">
              Flights
<auro-icon slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="cars">
              Cars
<auro-icon slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
</auro-menuoption>
<auro-menuoption value="hotels">
              Hotels
<auro-icon slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/display-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select forceDisplayValue&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Travel type&lt;/span&gt;
  &lt;span slot="label"&gt;Travel type&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="flights"&gt;
      Flights
      &lt;auro-icon slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cars"&gt;
      Cars
      &lt;auro-icon slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hotels"&gt;
      Hotels
      &lt;auro-icon slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="resetOption">Adding a reset option</auro-header>
<p><code>auro-select</code> has no built-in way to clear a selection from the trigger. If a user picks the wrong option on an optional field, they have no way to reset their selection.</p>
<p>Add a selectable entry at the top of the menu with whatever label fits the field, such as "None", "N/A", or "No preference". <code>value=""</code> doesn't work, because <code>auro-menu</code> treats an empty string as a clear-selection signal.</p>
<p>Use a non-empty sentinel such as <code>value="none"</code> instead, choosing one that can't collide with any real domain value. Either accept <code>"none"</code> on the backend, or coerce it in your submit handler:</p>
        <pre><code>payload.suffix = payload.suffix === "none" ? "" : payload.suffix;</code></pre>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/none-option.html) -->
<!-- The below content is automatically added from ./../apiExamples/none-option.html -->
<auro-select>
<span slot="bib.fullscreen.headline">Suffix</span>
<span slot="label">Suffix</span>
<span slot="helpText">If shown on your government-issued travel ID.</span>
<auro-menu>
<auro-menuoption value="none">None</auro-menuoption>
<auro-menuoption value="Jr">Jr</auro-menuoption>
<auro-menuoption value="Sr">Sr</auro-menuoption>
<auro-menuoption value="II">II</auro-menuoption>
<auro-menuoption value="III">III</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/none-option.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/none-option.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Suffix&lt;/span&gt;
  &lt;span slot="label"&gt;Suffix&lt;/span&gt;
  &lt;span slot="helpText"&gt;If shown on your government-issued travel ID.&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="none"&gt;None&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Jr"&gt;Jr&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Sr"&gt;Sr&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="II"&gt;II&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="III"&gt;III&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noCheckmark">Hide checkmark indicators</auro-header>
<p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set <code>noCheckmark</code> on the select, as in the following example, or <code>nocheckmark</code> on the <code>&lt;auro-menu&gt;</code> element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-checkmark.html -->
<auro-select nocheckmark placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-checkmark.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select nocheckmark placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="fluid">Fluid</auro-header>
<p>When the <code>fluid</code> attribute is present, the component stretches to fill the full width of its container. This is useful for form layouts where the select should fill the available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
<!-- The below content is automatically added from ./../apiExamples/fluid.html -->
<auro-select fluid placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fluid.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fluid.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select fluid placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="flexMenuWidth">Flex menu width</auro-header>
<p>In the classic layout, the bib width matches the trigger width by default. Setting the <code>flexMenuWidth</code> attribute lets the bib size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/flex-menu-width.html -->
<auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
<auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
<auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
<auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
<auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/flex-menu-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="united states"&gt;United States has a country code of (+1)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="costa rica"&gt;Costa Rica has a country code of (+506)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mexico"&gt;Mexico has a country code of (+52)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="afghanistan"&gt;Afghanistan has a country code of (+93)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="albania"&gt;Albania has a country code of (+355)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match width</auro-header>
<p>In the emphasized and snowflake layouts, set the <code>matchWidth</code> attribute to make the bib the same width as the trigger. The classic layout always matches the trigger's width unless <code>flexMenuWidth</code> is set, so <code>matchWidth</code> has no effect there.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-select layout="emphasized" shape="pill" size="xl" matchWidth placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select layout="emphasized" shape="pill" size="xl" matchWidth placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="placement">Placement</auro-header>
<p>The <code>placement</code> attribute sets where the bib opens relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
<!-- The below content is automatically added from ./../apiExamples/placement.html -->
<auro-select placement="top-start" placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placement.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placement="top-start" placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="noFlip">No flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the bib doesn't flip to the opposite side when there isn't enough space in the specified <code>placement</code>. By default, the bib flips to stay visible within the viewport.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-flip.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-flip.html -->
<auro-select noFlip placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-flip.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-flip.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select noFlip placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="offset">Offset</auro-header>
<p>The <code>offset</code> attribute sets the gap, in pixels, between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/offset.html) -->
<!-- The below content is automatically added from ./../apiExamples/offset.html -->
<auro-select offset="16" placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/offset.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/offset.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select offset="16" placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="shift">Shift</auro-header>
<p>When the <code>shift</code> attribute is present, the bib slides along the trigger's edge to avoid being cut off by the viewport. Use it when the bib would otherwise extend beyond the edge of the screen. It applies only in the emphasized layout.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
<!-- The below content is automatically added from ./../apiExamples/shift.html -->
<div style="display: flex; justify-content: flex-end;">
<auro-select layout="emphasized" shape="pill" size="xl" shift placeholder="Sort by" style="display: inline-block;">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Fewest stops</auro-menuoption>
<auro-menuoption value="price">Lowest price, including taxes and fees</auro-menuoption>
<auro-menuoption value="duration">Shortest total travel duration</auro-menuoption>
<auro-menuoption value="departure">Earliest departure time</auro-menuoption>
<auro-menuoption value="arrival">Earliest arrival time</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska Airlines and partner flights</auro-menuoption>
</auro-menu>
</auro-select>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/shift.html -->
<pre class="language-html"><code class="language-html">&lt;div style="display: flex; justify-content: flex-end;"&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" shift placeholder="Sort by" style="display: inline-block;"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="stops"&gt;Fewest stops&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="price"&gt;Lowest price, including taxes and fees&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="duration"&gt;Shortest total travel duration&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="departure"&gt;Earliest departure time&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="arrival"&gt;Earliest arrival time&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska Airlines and partner flights&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="largeHeader">Large fullscreen header</auro-header>
<p>When the <code>largeFullscreenHeadline</code> attribute is present, the headline in the fullscreen bib uses the larger <code>HeadingDisplay</code> style. By default, the fullscreen headline uses <code>Heading 600</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/large-fullscreen-headline.html) -->
<!-- The below content is automatically added from ./../apiExamples/large-fullscreen-headline.html -->
<auro-select largeFullscreenHeadline fullscreenBreakpoint="lg">
<span slot="label">Select example</span>
<span slot="bib.fullscreen.headline">Large headline</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/large-fullscreen-headline.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/large-fullscreen-headline.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select largeFullscreenHeadline fullscreenBreakpoint="lg"&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Large headline&lt;/span&gt;
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
<auro-header level="3" id="breakpoint">Fullscreen breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute sets the largest screen size at which the bib opens as a fullscreen dialog. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<p>When opened, the bib shows as a fullscreen dialog if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-select fullscreenBreakpoint="lg">
<span slot="label">Select example</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select fullscreenBreakpoint="lg"&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
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
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Restyle the component by changing the values of the following tokens for the select, dropdown, and menu.</p>
<auro-header level="4" id="cssTokensSelect">Select</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host(:not([ondark])),
:host(:not([appearance='inverse'])) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-select-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-select-outline-color: transparent;
}
&#10;:host([ondark]),
:host([appearance='inverse']) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-select-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-select-outline-color: transparent;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../dropdown/src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensMenu">Menu</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../menu/src/styles/default/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../menu/src/styles/default/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host {
  --ds-auro-menu-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-menu-loader-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-menu-loader-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-menuoption-container-color: transparent;
  --ds-auro-menuoption-container-border-color: var(--ds-auro-menuoption-container-color);
  --ds-auro-menuoption-icon-color: transparent;
  --ds-auro-menuoption-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-select&gt;</code> exposes the following parts.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>wrapper</code></td><td>The outermost element inside the select.</td></tr>
<tr><td><code>dropdown</code></td><td>The inner dropdown element that holds the trigger and the bib.</td></tr>
<tr><td><code>dropdownTrigger</code></td><td>The trigger that shows the label and selected value. Doesn't currently match any element, so styles set on it have no effect.</td></tr>
<tr><td><code>dropdownChevron</code></td><td>The container for the arrow icon that shows whether the bib is open.</td></tr>
<tr><td><code>dropdownSize</code></td><td>A hidden element whose <code>height</code>, <code>width</code>, <code>max-height</code>, and <code>max-width</code> are copied to the bib. Applies only when the bib matches the trigger's width: in the classic layout unless <code>flexMenuWidth</code> is set, and in other layouts when <code>matchWidth</code> is set.</td></tr>
<tr><td><code>displayValue</code></td><td>The container for <code>displayValue</code> content in the trigger.</td></tr>
<tr><td><code>helpText</code></td><td>The help text or error message shown below the select.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
          auro-select.css-parts-demo::part(dropdownChevron) {
            color: purple;
          }
          auro-select.css-parts-demo::part(helpText) {
            color: green;
          }
          auro-select.css-parts-demo::part(dropdownSize) {
            max-height: 200px;
          }
</style>
<auro-select class="css-parts-demo">
<span slot="bib.fullscreen.headline">CSS parts example</span>
<span slot="label">CSS parts example</span>
<span slot="helpText">This select has custom styles applied through CSS shadow parts.</span>
<auro-menu>
<auro-menuoption value="one">Option one</auro-menuoption>
<auro-menuoption value="two">Option two</auro-menuoption>
<auro-menuoption value="three">Option three</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-select.css-parts-demo::part(dropdownChevron) {
    color: purple;
  }
  auro-select.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-select.css-parts-demo::part(dropdownSize) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;auro-select class="css-parts-demo"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;CSS parts example&lt;/span&gt;
  &lt;span slot="label"&gt;CSS parts example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This select has custom styles applied through CSS shadow parts.&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="one"&gt;Option one&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="two"&gt;Option two&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="three"&gt;Option three&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="autoComplete">Autocomplete</auro-header>
<p>The <code>autocomplete</code> attribute gives the browser an autofill hint for the select, such as <code>country-name</code> for a country. When set, the browser may offer saved values for the field. It doesn't currently apply in the emphasized layout.</p>
<p>This is especially useful when the select is used alongside other form fields that support autofill, creating a seamless form-filling experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
<!-- The below content is automatically added from ./../apiExamples/autocomplete.html -->
<form>
<auro-select autocomplete="country-name">
<span slot="label">Select your country</span>
<span slot="bib.fullscreen.headline">Select your country</span>
<auro-menu>
<auro-menuoption value="US">United States</auro-menuoption>
<auro-menuoption value="CA">Canada</auro-menuoption>
<auro-menuoption value="MX">Mexico</auro-menuoption>
<auro-menuoption value="GB">United Kingdom</auro-menuoption>
<auro-menuoption value="FR">France</auro-menuoption>
<auro-menuoption value="DE">Germany</auro-menuoption>
<auro-menuoption value="JP">Japan</auro-menuoption>
<auro-menuoption value="AU">Australia</auro-menuoption>
<auro-menuoption value="BR">Brazil</auro-menuoption>
<auro-menuoption value="IN">India</auro-menuoption>
</auro-menu>
</auro-select>
</form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/autocomplete.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/autocomplete.html -->
<pre class="language-html"><code class="language-html">&lt;form&gt;
  &lt;auro-select autocomplete="country-name"&gt;
    &lt;span slot="label"&gt;Select your country&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Select your country&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="US"&gt;United States&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="CA"&gt;Canada&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="MX"&gt;Mexico&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="GB"&gt;United Kingdom&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="FR"&gt;France&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="DE"&gt;Germany&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="JP"&gt;Japan&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="AU"&gt;Australia&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="BR"&gt;Brazil&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="IN"&gt;India&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
&lt;/form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="typeAhead">Type-ahead</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/typeahead.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/typeahead.md -->
<p>Type-ahead lets a guest jump to an option by typing. As people type, the active option moves to the first option whose <strong>displayed text</strong> starts with the typed characters. This follows the <auro-hyperlink href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA Listbox pattern</auro-hyperlink> and mirrors native HTML <code>&lt;select&gt;</code> behavior. Matching uses the shown text, not the <code>value</code> attribute.</p>
<p>The <code>typeaheadTimeoutMs</code> attribute (default <code>500</code>) sets how long typed characters keep adding to the search between keystrokes. Repeating the same character cycles through the options that start with it. When an option starts with the repeated characters themselves, such as "Aachen" for <kbd>a</kbd>, <kbd>a</kbd>, type-ahead moves to that option instead. Type-ahead skips <code>disabled</code>, <code>hidden</code>, and <code>static</code> options.</p>
<div class="note">
<strong>Note:</strong> The <kbd>Space</kbd> key depends on context. When no type-ahead search is in progress, it opens or closes the bib, as elsewhere in <code>&lt;auro-select&gt;</code>. While a type-ahead search is in progress, it adds a space to the search instead, so multi-word options such as "San Francisco" can be matched by typing <kbd>s</kbd>, <kbd>a</kbd>, <kbd>n</kbd>, <kbd>Space</kbd>, <kbd>f</kbd>.
</div>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/typeahead.html) -->
<!-- The below content is automatically added from ./../apiExamples/typeahead.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Airport</span>
<span slot="label">Destination airport</span>
<auro-menu>
<auro-menuoption value="ANC">Anchorage</auro-menuoption>
<auro-menuoption value="ATL">Atlanta</auro-menuoption>
<auro-menuoption value="AUS">Austin</auro-menuoption>
<auro-menuoption value="BOS">Boston</auro-menuoption>
<auro-menuoption value="DEN">Denver</auro-menuoption>
<auro-menuoption value="DFW" disabled>Dallas/Fort Worth</auro-menuoption>
<auro-menuoption value="DTW">Detroit</auro-menuoption>
<auro-menuoption value="HNL">Honolulu</auro-menuoption>
<auro-menuoption value="LAX">Los Angeles</auro-menuoption>
<auro-menuoption value="MIA">Miami</auro-menuoption>
<auro-menuoption value="ORD">Chicago</auro-menuoption>
<auro-menuoption value="PDX">Portland</auro-menuoption>
<auro-menuoption value="PHX">Phoenix</auro-menuoption>
<auro-menuoption value="SAN">San Diego</auro-menuoption>
<auro-menuoption value="SEA">Seattle</auro-menuoption>
<auro-menuoption value="SFO">San Francisco</auro-menuoption>
<auro-menuoption value="SJC" disabled>San Jose</auro-menuoption>
<auro-menuoption value="SLC">Salt Lake City</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/typeahead.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/typeahead.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Airport&lt;/span&gt;
  &lt;span slot="label"&gt;Destination airport&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="ANC"&gt;Anchorage&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ATL"&gt;Atlanta&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="AUS"&gt;Austin&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="BOS"&gt;Boston&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="DEN"&gt;Denver&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="DFW" disabled&gt;Dallas/Fort Worth&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="DTW"&gt;Detroit&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="HNL"&gt;Honolulu&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="LAX"&gt;Los Angeles&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="MIA"&gt;Miami&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ORD"&gt;Chicago&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="PDX"&gt;Portland&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="PHX"&gt;Phoenix&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SAN"&gt;San Diego&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SEA"&gt;Seattle&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SFO"&gt;San Francisco&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SJC" disabled&gt;San Jose&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SLC"&gt;Salt Lake City&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable component</auro-header>
<p>The entire component can be disabled. A disabled component is shown in a muted style, doesn't respond to pointer events, and can't be opened, but keyboard users can still tab to it.</p>
<p>When the select is disabled, <code>auro-form</code> leaves its value out of the form data, as a native form does for disabled controls.</p>
<p class="note">
<strong>Note:</strong> When the component is both <strong>invalid</strong> and <code>disabled</code>, it can't be opened, but the error message still shows below the trigger.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-select disabled placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select disabled placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="disableOptions">Disable options</auro-header>
<p>The component may be rendered with one or more <code>disabled</code> options. When people move through the options with the keyboard or a screen reader, disabled options are skipped.</p>
<p>When people use a pointer, hovering over a disabled option is ignored, and the previous active option stays active.</p>
<p class="note">
<strong>Note:</strong> Setting the component <code>value</code> to one that matches a <code>disabled</code> or <code>static</code> option, whether through the <code>value</code> attribute or code such as <code>el.value = 'x'</code>, is rejected: <code>value</code> is cleared to <code>undefined</code>, and <code>optionSelected</code> to <code>undefined</code>, or to an empty array in <code>multiSelect</code> mode. A value matching a <code>hidden</code> option is still applied.
</p>
<p class="note">
<strong>Note:</strong> Adding <code>disabled</code> to the selected option doesn't currently clear the selection. To clear it, set the select's <code>value</code> to <code>undefined</code>.
</p>
<p class="note">
<strong>Note:</strong> Marking all options as disabled isn't supported. Disable the component instead.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-options.html -->
<auro-select placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price" disabled>Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure" disabled>Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-options.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-options.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price" disabled&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure" disabled&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="submenus">Submenus</auro-header>
<p>Options may be organized into nested groups by placing additional <code>&lt;auro-menu&gt;</code> elements inside the top-level <code>&lt;auro-menu&gt;</code>. Use <code>&lt;hr&gt;</code> elements to add visual dividers between groups. Nested groups receive an indent and an <code>aria-label="submenu"</code> so that screen readers can announce the grouping.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/with-submenus.html) -->
<!-- The below content is automatically added from ./../apiExamples/with-submenus.html -->
<auro-select placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="person">Person</auro-menuoption>
<auro-menuoption value="woman">Woman</auro-menuoption>
<auro-menuoption value="man">Man</auro-menuoption>
<auro-menuoption value="camera">Camera</auro-menuoption>
<auro-menuoption value="tv">TV</auro-menuoption>
</auro-menu>
</auro-menu>
<hr>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/with-submenus.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/with-submenus.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
      &lt;hr&gt;
      &lt;auro-menu&gt;
        &lt;auro-menuoption value="person"&gt;Person&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="woman"&gt;Woman&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="man"&gt;Man&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="camera"&gt;Camera&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="tv"&gt;TV&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/auro-menu&gt;
    &lt;hr&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
<p>Certain use cases may require the guest to make a selection from the component to continue the intended workflow, such as submitting a form.</p>
<p>When the component is marked required:</p>
<ol>
<li>Move focus to the <code>&lt;auro-select&gt;</code> element.</li>
<li>Activate the trigger (such as with a mouse click, tap, or key press).</li>
<li>Navigate the list of options.</li>
<li>
            Collapse the bib without making a selection.
<p class="note">
            The component then shows the validation error. To resolve it, the guest continues with the following steps.
</p>
</li>
<li>Activate the trigger.</li>
<li>Navigate the list of options, marking any option as active.</li>
<li>
            Select the active option.
<p class="note">
            The component then removes the validation error.
</p>
</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-select required placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select required placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="forceError">Force an error state</auro-header>
<p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component shows its error state regardless of the current selection.</p>
<p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If <code>setCustomValidityCustomError</code> or <code>setCustomValidity</code> is also set, that value is used as the error message instead.</p>
<p>Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-select error="Custom error message" placeholder="Placeholder text">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select error="Custom error message" placeholder="Placeholder text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="customValidation">Custom validation messages</auro-header>
<p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component shows the <code>setCustomValidity</code> message if it's set. Otherwise, it shows the message for the current validity state.</p>
<ul>
<li><strong><code>setCustomValidity</code>:</strong> Sets one error message to show for every validation error. When set, it replaces the state-specific messages.</li>
<li><strong><code>setCustomValidityCustomError</code>:</strong> Sets the message shown while the <code>error</code> attribute puts the component into the <code>customError</code> validity state. When it isn't set, the <code>error</code> value is the message.</li>
<li><strong><code>setCustomValidityValueMissing</code>:</strong> Sets the message shown when the component is <code>required</code> and the user leaves it empty (the <code>valueMissing</code> validity state).</li>
</ul>
<p>The priority order for error messages is: <code>setCustomValidity</code> &gt; state-specific property &gt; the <code>error</code> attribute value (for <code>customError</code>). Without any of these, the component shows its error state with no message text.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-validity.html -->
<auro-select required setCustomValidityValueMissing="Please select a sort preference." placeholder="Sort by...">
<span slot="label">Sort preference</span>
<span slot="bib.fullscreen.headline">Sort preference</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-validity.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select required setCustomValidityValueMissing="Please select a sort preference." placeholder="Sort by..."&gt;
  &lt;span slot="label"&gt;Sort preference&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Sort preference&lt;/span&gt;
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
<auro-header level="3" id="noValidate">No validation</auro-header>
<p>When the <code>noValidate</code> attribute is present, the component doesn't validate automatically when it loses focus or its value changes. Call <code>validate()</code> to validate it. This is useful when validation is handled externally or should only be triggered on form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-select required noValidate placeholder="Placeholder text">
<span slot="label">Label</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select required noValidate placeholder="Placeholder text"&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
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
<auro-header level="3" id="placeholder">Placeholder</auro-header>
<p>Use the <code>placeholder</code> attribute to set placeholder text that's displayed in the trigger before a value has been selected.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
<!-- The below content is automatically added from ./../apiExamples/placeholder.html -->
<auro-select placeholder="Please select your preferred option">
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Label</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placeholder.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Please select your preferred option"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
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
<auro-header level="3" id="loading">Loading</auro-header>
<p>Use the <code>loading</code> attribute on <code>auro-menu</code> to display a loading state while menu options are being fetched. Fill the <code>loadingIcon</code> and <code>loadingText</code> slots inside the menu to provide visual feedback during the loading state.</p>
<p>In this example, after you choose a category, the second select loads for 5 seconds before showing its options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
<!-- The below content is automatically added from ./../apiExamples/loading.html -->
<auro-select id="loadingSelectCategory">
<span slot="bib.fullscreen.headline">Select category</span>
<span slot="label">Category</span>
<auro-menu>
<auro-menuoption value="Fruit">Fruit</auro-menuoption>
<auro-menuoption value="Vegetable">Vegetable</auro-menuoption>
<auro-menuoption value="Protein">Protein</auro-menuoption>
</auro-menu>
</auro-select>
<auro-select id="loadingSelectItem" disabled>
<span slot="bib.fullscreen.headline">Select item</span>
<span slot="label">Item</span>
<auro-menu id="loadingSelectItemMenu">
<auro-loader slot="loadingIcon" orbit xs></auro-loader>
<span slot="loadingText">Loading...</span>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select id="loadingSelectCategory"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select category&lt;/span&gt;
  &lt;span slot="label"&gt;Category&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Fruit"&gt;Fruit&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Vegetable"&gt;Vegetable&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Protein"&gt;Protein&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
&lt;auro-select id="loadingSelectItem" disabled&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select item&lt;/span&gt;
  &lt;span slot="label"&gt;Item&lt;/span&gt;
  &lt;auro-menu id="loadingSelectItemMenu"&gt;
    &lt;auro-loader slot="loadingIcon" orbit xs&gt;&lt;/auro-loader&gt;
    &lt;span slot="loadingText"&gt;Loading...&lt;/span&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="nonUniqueValues">Non-unique option values</auro-header>
<p>Two or more <code>auro-menuoption</code> elements may share the same <code>value</code>. This is common when the <code>value</code> represents a coarser grouping than the option label, for example, several airports that all serve the same city. The component tracks the specific option a user selects, so the correct label is displayed even when the underlying <code>value</code> is duplicated.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values.html) -->
<!-- The below content is automatically added from ./../apiExamples/duplicate-values.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Choose an airport</span>
<span slot="label">Departure airport</span>
<auro-menu>
<auro-menuoption value="seattle">Seattle&ndash;Tacoma International (SEA)</auro-menuoption>
<auro-menuoption value="seattle">Seattle Paine Field (PAE)</auro-menuoption>
<auro-menuoption value="portland">Portland International (PDX)</auro-menuoption>
<auro-menuoption value="spokane">Spokane International (GEG)</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/duplicate-values.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose an airport&lt;/span&gt;
  &lt;span slot="label"&gt;Departure airport&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="seattle"&gt;Seattle&amp;ndash;Tacoma International (SEA)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="seattle"&gt;Seattle Paine Field (PAE)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="portland"&gt;Portland International (PDX)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="spokane"&gt;Spokane International (GEG)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>In <code>multiSelect</code> mode, options that share a <code>value</code> are tracked independently, so each can be selected and removed on its own. Selections are stored in DOM order regardless of the order in which they were chosen.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values-multiselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/duplicate-values-multiselect.html -->
<auro-select multiselect placeholder="Select one or more airports">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Choose airports</span>
<span slot="label">Airports served</span>
<auro-menu>
<auro-menuoption value="seattle">Seattle&ndash;Tacoma International (SEA)</auro-menuoption>
<auro-menuoption value="seattle">Seattle Paine Field (PAE)</auro-menuoption>
<auro-menuoption value="portland">Portland International (PDX)</auro-menuoption>
<auro-menuoption value="spokane">Spokane International (GEG)</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values-multiselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/duplicate-values-multiselect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select multiselect placeholder="Select one or more airports"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose airports&lt;/span&gt;
  &lt;span slot="label"&gt;Airports served&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="seattle"&gt;Seattle&amp;ndash;Tacoma International (SEA)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="seattle"&gt;Seattle Paine Field (PAE)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="portland"&gt;Portland International (PDX)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="spokane"&gt;Spokane International (GEG)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
