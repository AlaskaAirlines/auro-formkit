<auro-header level="1" id="overview">Select - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/pages/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>trigger:</strong> shows the component label, current value and will render to reflect state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, <code>invalid</code>), and a flag marking instances that are required.
</li>
<li>
<strong>options list:</strong> a list of options that may be selected which are rendered in an element which can be expanded/collapsed by interacting with the trigger.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the trigger intended to help clarify the intended use of the component instance and any current validation error with instructions to resolve those errors.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the component label, a flag marking the component optional/required and the current value. This label is required in order to ensure correct behavior when a guest is using accessibility tools such as screen readers and VoiceOver utilities. The invalid state will also announce to accessibility tools when applied.</p>
<p>The optional/required flag content may be customized.</p>
<p>When rendering the value of a selected option, the entire text content of the option will render in the trigger, including any icons.</p>
<p>The trigger is a focusable element and will visually respond to common UI states - <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="options">List Options</auro-header>
<p>The component will render a list of options that may be selected. Each option may be in one of the following states when rendered:</p>
<ul>
<li>
<code>selected</code> - One option may be selected at a time and identifies the current value of the component. There is an optional feature that may be used to enable more than one option to be selected at a time.
</li>
<li>
<code>active</code> - One option may be active at a time. The active option indicates the item that will become selected if the user chooses.
</li>
<li>
<code>disabled</code> - One or more options may be disabled. Disabled options are not interactive and cannot be marked as active or selected.
</li>
</ul>
<auro-header level="4" id="helpText">Help Text</auro-header>
<p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers. In certain cases, a component label alone may be confusing.</p>
<p>If the component fails validation, the help text will change to show a validation help message instead of the default help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default Color</auro-header>
<p>When the component is used on a light background.</p>
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
<auro-header level="4" id="inverseColor">Inverse Color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-select appearance="inverse">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse"&gt;
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
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape | Size | Layout Support</auro-header>
<p>The <code>auro-select</code> component supports the <code>shape</code>, <code>size</code> and <code>layout</code> feature set. The component defaults to the <code>layout="classic"</code>, <code>shape="classic"</code> and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic Layout</auro-header>
<p>The <code>classic</code> layout is default for <code>auro-select</code>. No customization is needed to achieve this look.</p>
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
<auro-header level="4" id="emphasizedLayout">Emphasized Layout</auro-header>
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
<auro-header level="4" id="snowflakeLayout">Snowflake Layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.</p>
<p>The <code>snowflake</code> layout is only expected to be used on dark backgrounds, in conjunction with <code>appearance="inverse"</code>.</p>
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
