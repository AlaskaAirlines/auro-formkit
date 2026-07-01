<auro-header level="1" id="overview">Select - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom Display Value</auro-anchorlink>
<auro-anchorlink fluid href="#resetOption" class="level2 body-xs">Reset Option</auro-anchorlink>
<auro-anchorlink fluid href="#noCheckmark" class="level2 body-xs">No Checkmark</auro-anchorlink>
<auro-anchorlink fluid href="#fluid" class="level2 body-xs">Fluid</auro-anchorlink>
<auro-anchorlink fluid href="#flexMenuWidth" class="level2 body-xs">Flex Menu Width</auro-anchorlink>
<auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match Width</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
<auro-anchorlink fluid href="#offset" class="level2 body-xs">Offset</auro-anchorlink>
<auro-anchorlink fluid href="#shift" class="level2 body-xs">Shift</auro-anchorlink>
<auro-anchorlink fluid href="#largeHeader" class="level2 body-xs">Large Fullscreen Header</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#autoComplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#typeAhead" class="level2 body-xs">Type-Ahead</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
<auro-anchorlink fluid href="#submenus" class="level2 body-xs">Submenus</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
<auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
<p>The <code>shape</code>, <code>size</code> and <code>layout</code> attributes work in collaboration to control the overall architecture of the component.</p>
<p>See the <a href="./design.html">Design page</a> for a detailed breakdown.</p>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
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
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance.html -->
<auro-select appearance="inverse" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Inverse Appearance</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse Appearance&lt;/span&gt;
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
<auro-header level="3" id="displayValue">Custom Display Value</auro-header>
<p>The <code>displayValue</code> slot allows custom HTML content to be shown in place of the selected option's text when the select is not focused. This is useful for displaying icons, formatted text, or other rich content in the trigger.</p>
<p>To always show the custom display value (even when no selection has been made), set the <code>forceDisplayValue</code> attribute on the component.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/display-value.html -->
<auro-select forceDisplayValue>
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
<p>Add a selectable entry at the top of the menu with whatever label fits the field ("None," "N/A," "No preference," etc.). <code>auro-menu</code> treats an empty or whitespace-only value as a clear-selection instruction, so an option with <code>value=""</code> will clear the field rather than remain selected.</p>
<p>Use a non-empty sentinel like <code>value="none"</code> instead, choosing one that cannot collide with any real domain value. Either accept <code>"none"</code> on the backend, or coerce it in your submit handler:</p>
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
<p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set the <code>nocheckmark</code> attribute on the <code>auro-menu</code> element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-checkmark.html -->
<auro-select nocheckmark placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select nocheckmark placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>When the <code>fluid</code> attribute is present, the component will expand to 100% width of its container element. This is useful for form layouts where the select should fill the available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
<!-- The below content is automatically added from ./../apiExamples/fluid.html -->
<auro-select fluid placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select fluid placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>By default, the bib width matches the trigger width. Setting the <code>flexMenuWidth</code> attribute allows the bib to size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/flex-menu-width.html -->
<auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
<auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
<auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
<auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
<auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
</auro-menu>
</auro-select>
<style>
          #flexMenuWidthExample::part(dropdownTrigger) {
            width: 25%;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/flex-menu-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="united states"&gt;United States has a country code of (+1)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="costa rica"&gt;Costa Rica has a country code of (+506)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mexico"&gt;Mexico has a country code of (+52)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="afghanistan"&gt;Afghanistan has a country code of (+93)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="albania"&gt;Albania has a country code of (+355)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
&lt;style&gt;
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match Width</auro-header>
<p>When the <code>matchWidth</code> attribute is present, the popover bib and trigger will be set to the same width. This ensures the dropdown menu appears at exactly the same width as the trigger element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-select matchWidth placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select matchWidth placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>The <code>placement</code> attribute defines the position where the dropdown bib should appear relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
<!-- The below content is automatically added from ./../apiExamples/placement.html -->
<auro-select placement="top-start" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select placement="top-start" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<auro-header level="3" id="noFlip">No Flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>. By default, the bib will automatically reposition itself to remain visible within the viewport.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-flip.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-flip.html -->
<auro-select noFlip placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select noFlip placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>The <code>offset</code> attribute defines the gap (in pixels) between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/offset.html) -->
<!-- The below content is automatically added from ./../apiExamples/offset.html -->
<auro-select offset="16" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select offset="16" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>When the <code>shift</code> attribute is present, the dropdown bib will shift its position to avoid being cut off by the viewport. This is useful when the bib would otherwise extend beyond the edge of the screen.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
<!-- The below content is automatically added from ./../apiExamples/shift.html -->
<auro-select shift placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/shift.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select shift placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<auro-header level="3" id="largeHeader">Large Fullscreen Header</auro-header>
<p>When the <code>largeFullscreenHeadline</code> attribute is present, the headline displayed in the fullscreen bib will render in the larger <code>HeadingDisplay</code> style. By default, the fullscreen headline uses <code>Heading 600</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/large-fullscreen-headline.html) -->
<!-- The below content is automatically added from ./../apiExamples/large-fullscreen-headline.html -->
<auro-select largeFullscreenHeadline fullscreenBreakpoint="lg">
<span slot="label">Select Example</span>
<span slot="bib.fullscreen.headline">Large Headline</span>
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
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Large Headline&lt;/span&gt;
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
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<p>When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-select fullscreenBreakpoint="lg">
<span slot="label">Select Example</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>The component may be restyled by changing the values of the following token(s) for the dropown, input and menu</p>
<auro-header level="4" id="cssTokensSelect">Select</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host(:not([ondark])),
:host(:not([appearance='inverse'])) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-select-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-select-outline-color: transparent;
}
​
:host([ondark]),
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
​
:host(:not([ondark])),
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
​
:host([ondark]),
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
​
:host {
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
<auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-select&gt;</code>.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>dropdownTrigger</code></td><td>The trigger content container.</td></tr>
<tr><td><code>dropdownChevron</code></td><td>The collapsed/expanded state icon container.</td></tr>
<tr><td><code>dropdownSize</code></td><td>The dropdown bib sizing container (height, width, maxHeight, maxWidth only).</td></tr>
<tr><td><code>helpText</code></td><td>The help text element.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
          auro-select.css-parts-demo::part(dropdownTrigger) {
            border-color: orange;
          }
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
<span slot="label">CSS Parts Example</span>
<span slot="helpText">This select has custom styles applied via CSS Shadow Parts.</span>
<auro-menu>
<auro-menuoption value="one">Option One</auro-menuoption>
<auro-menuoption value="two">Option Two</auro-menuoption>
<auro-menuoption value="three">Option Three</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-select.css-parts-demo::part(dropdownTrigger) {
    border-color: orange;
  }
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
  &lt;span slot="label"&gt;CSS Parts Example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This select has custom styles applied via CSS Shadow Parts.&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="one"&gt;Option One&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="two"&gt;Option Two&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="three"&gt;Option Three&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="autoComplete">Autocomplete</auro-header>
<p>The <code>autocomplete</code> attribute enables browser autofill support for the select element. When set, the browser may offer saved values for the field based on the specified autocomplete token (e.g. <code>country-name</code> for country selection).</p>
<p>This is especially useful when the select is used alongside other form fields that support autofill, creating a seamless form-filling experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
<!-- The below content is automatically added from ./../apiExamples/autocomplete.html -->
<form>
<auro-select autocomplete="country-name">
<span slot="label">Select Your Country</span>
<span slot="bib.fullscreen.headline">Select Your Country</span>
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
    &lt;span slot="label"&gt;Select Your Country&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Select Your Country&lt;/span&gt;
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
<auro-header level="3" id="typeAhead">Type-Ahead</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/typeahead.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/typeahead.md -->
<p>Type-ahead lets a guest jump to an option by typing. As keys are pressed, the active option advances to the first enabled option whose <strong>displayed text</strong> starts with the buffered keystrokes — following the <auro-hyperlink href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA Listbox pattern</auro-hyperlink>, and mirroring native HTML <code>&lt;select&gt;</code> behavior. Matching uses the rendered text rather than the <code>value</code> attribute.</p>
<p>The <code>typeaheadTimeoutMs</code> attribute (default <code>500</code>) controls how long the buffer persists between keystrokes. Repeating the same character cycles through every enabled option starting with it; disabled options are skipped.</p>
<div class="note">
<strong>Note:</strong> The <kbd>Space</kbd> key is context-sensitive. When the type-ahead buffer is empty it toggles the bib open or closed, matching the rest of <code>&lt;auro-select&gt;</code>. When the buffer is active it extends the buffer instead, so multi-word options such as "San Francisco" can be matched by typing <kbd>s</kbd>, <kbd>a</kbd>, <kbd>n</kbd>, <kbd>Space</kbd>, <kbd>f</kbd>.
</div>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/typeahead.html) -->
<!-- The below content is automatically added from ./../apiExamples/typeahead.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close Popup</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
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
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>The entire component may be disabled. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
<p>When the component is disabled and part of a form, the components value is still included in the form submission.</p>
<p class="note">
<strong>Note:</strong> If the component is marked as both <strong>invalid</strong> and <code>disabled</code>, the <strong>invalid</strong> state UI/UX and functional behavior are ignored. The <code>disabled</code> UI/UX and functional behavior works normally.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-select disabled placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select disabled placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<auro-header level="3" id="disableOptions">Disable Option(s)</auro-header>
<p>The component may be rendered with one or more <code>disabled</code> options. When navigating the list of options with the keyboard or assistive technology to mark the next or previous option as active, disabled options will be skipped, jumping to the next enabled option.</p>
<p>While using the pointer to mark options as active, hovering over disabled options will be ignored and the previous active option will remain active.</p>
<p class="note">
<strong>Note:</strong> If the currently <code>selected</code> option is marked as <code>disabled</code>, the component value is reset to <code>undefined</code> and the component validation workflow is performed (e.g., if the component instance is <code>required</code> it will set <code>validity="valueMissing".</code>).
</p>
<p class="note">
<strong>Note:</strong> marking all options as disabled is not supported. Disable the component instead.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-options.html -->
<auro-select placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>Options may be organized into nested groups by placing additional <code>&lt;auro-menu&gt;</code> elements inside the top-level <code>&lt;auro-menu&gt;</code>. Use <code>&lt;hr&gt;</code> elements to add visual dividers between groups. Nested groups receive an indent and an <code>aria-label="submenu"</code> so that assistive technologies can announce the grouping.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/with-submenus.html) -->
<!-- The below content is automatically added from ./../apiExamples/with-submenus.html -->
<auro-select placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
<p>When the component is marked required:</p>
<ol>
<li>Move focus to the auro-select element</li>
<li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
<li>Navigate the list of options</li>
<li>
            Collapse the bib without making a selection
<p class="note">
            This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.
</p>
</li>
<li>Activate the trigger</li>
<li>Navigate the list of options marking any option as active</li>
<li>
            Select the active option
<p class="note">
            This will re-render the component and the validation error state will be removed.
</p>
</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-select required placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select required placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current selection.</p>
<p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
<p>Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-select error="Custom error message" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select error="Custom error message" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
<ul>
<li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
<li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
</ul>
<p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message. Default messages are provided by the browser and are pre-localized to the language the browser is running in.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-validity.html -->
<auro-select required setCustomValidityValueMissing="Please select a sort preference." placeholder="Sort by...">
<span slot="label">Sort Preference</span>
<span slot="bib.fullscreen.headline">Sort Preference</span>
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
  &lt;span slot="label"&gt;Sort Preference&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Sort Preference&lt;/span&gt;
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
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>When the <code>noValidate</code> attribute is present, the component will not perform automatic validation on blur. This is useful when validation is handled externally or should only be triggered on form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-select required noValidate placeholder="Placeholder Text">
<span slot="label">Label</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
<pre class="language-html"><code class="language-html">&lt;auro-select required noValidate placeholder="Placeholder Text"&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
<p>Use the <code>placeholder</code> attribute to define custom placeholder text that is displayed in the trigger before a value has been selected.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
<!-- The below content is automatically added from ./../apiExamples/placeholder.html -->
<auro-select placeholder="Please select your preferred option">
<span slot="bib.fullscreen.headline">Bib Headline</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
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
</section>
</div>
</div>
</div>
