<auro-header level="1" id="overview">Combobox - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom Display Value</auro-anchorlink>
<auro-anchorlink fluid href="#checkmarks" class="level2 body-xs">Checkmarks</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib Placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#behaviorMode" class="level2 body-xs">Suggestion vs. Filter</auro-anchorlink>
<auro-anchorlink fluid href="#inputType" class="level2 body-xs">Input Type</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
<auro-anchorlink fluid href="#noFilter" class="level2 body-xs">No Filter</auro-anchorlink>
<auro-anchorlink fluid href="#persistInput" class="level2 body-xs">Persist Input</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
<auro-anchorlink fluid href="#dynamicMenu" class="level2 body-xs">Dynamic Menu</auro-anchorlink>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-default.html -->
<auro-combobox>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Default Appearance</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-default.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Default Appearance&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-combobox appearance="inverse">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Inverse Appearance</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox appearance="inverse"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse Appearance&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="displayValue">Custom Display Value</auro-header>
<p>The <code>displayValue</code> slot allows custom HTML content to be shown in place of the selected option's text when the combobox is not focused. Only the <code>snowflake</code> and <code>emphasized</code> layouts are supported.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/display-value.html -->
<auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">
Apples
<span slot="displayValue">🍎</span>
</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">
Oranges
<span slot="displayValue">🍊</span>
</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">
Peaches
<span slot="displayValue">🍑</span>
</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">
Grapes
<span slot="displayValue">🍇</span>
</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">
Cherries
<span slot="displayValue">🍒</span>
</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/display-value.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;
      Apples
      &lt;span slot="displayValue"&gt;🍎&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;
      Oranges
      &lt;span slot="displayValue"&gt;🍊&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;
      Peaches
      &lt;span slot="displayValue"&gt;🍑&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;
      Grapes
      &lt;span slot="displayValue"&gt;🍇&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;
      Cherries
      &lt;span slot="displayValue"&gt;🍒&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="checkmarks">Checkmark on Selected Option</auro-header>
<p>Use the <code>checkmark</code> attribute to display a checkmark next to the selected option in the dropdown menu.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/checkmark.html -->
<auro-combobox checkmark>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/checkmark.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox checkmark&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Name&lt;/span&gt;
    &lt;auro-menu&gt;
        &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
        &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placement">Bib Placement</auro-header>
<p>The bib position can be customized with <code>placement</code>, <code>offset</code>, <code>flip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
<ul>
<li><code>placement</code> specifies the preferred position where the bib should appear relative to the trigger.</li>
<li><code>offset</code> sets the distance between the trigger and the bib.</li>
<li>When <code>autoPlacement</code> is enabled, smart positioning logic is applied to determine the best placement for the bib.</li>
<li>Unless <code>noFlip</code> is enabled, if there isn't enough space for the preferred <code>placement</code>, the bib will automatically flip to an alternative position.</li>
<li><code>shift</code> when enabled, adjusts the bib position when it would overflow the viewport boundaries.</li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<div style="width: 350px">
<auro-combobox offset="20" noFlip placement="bottom-end">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Label</span>
<span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-combobox offset="20" placement="bottom-end">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Label</span>
<span slot="helpText">bottom-end bib with 20px offset and flip</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-combobox offset="20" noFlip placement="right" autoPlacement>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Label</span>
<span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-combobox width="350px" offset="20" noFlip placement="bottom-start" shift>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Label</span>
<span slot="helpText">bottom-start bib with 20px offset, noFlip and shift</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

<pre class="language-html"><code class="language-html">&lt;div style="width: 350px"&gt;
  &lt;auro-combobox offset="20" noFlip placement="bottom-end"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-end bib with 20px offset and noFlip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
  &lt;auro-combobox offset="20" placement="bottom-end"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-end bib with 20px offset and flip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
  &lt;auro-combobox offset="20" noFlip placement="right" autoPlacement&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;right bib with 20px offset, noFlip and autoPlacement&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
  &lt;auro-combobox width="350px" offset="20" noFlip placement="bottom-start" shift&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-start bib with 20px offset, noFlip and shift&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noFlip">No Flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
<!-- The below content is automatically added from ./../apiExamples/noflip.html -->
<auro-combobox noFlip>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<span slot="helpText">Bib will not flip position</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/noflip.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox noFlip&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Bib will not flip position&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<p>When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-combobox fullscreenBreakpoint="lg">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox fullscreenBreakpoint="lg"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by changing the values of the following token(s) for the dropown, input and menu</p>
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
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../input/src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">/* stylelint-disable custom-property-empty-line-before */
​
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
​
  --ds-auro-input-outline-color: transparent;
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
​
  --ds-auro-input-outline-color: transparent;
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
<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-combobox&gt;</code>.</p>
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
auro-combobox.css-parts-demo::part(dropdownTrigger) {
border-color: orange;
}
auro-combobox.css-parts-demo::part(dropdownChevron) {
color: purple;
}
auro-combobox.css-parts-demo::part(helpText) {
color: green;
}
auro-combobox.css-parts-demo::part(dropdownSize) {
max-height: 200px;
}
</style>
<auro-combobox class="css-parts-demo">
<span slot="label">CSS Parts Example</span>
<span slot="helpText">This combobox has custom styles applied via CSS Shadow Parts.</span>
<auro-menuoption value="one">Option One</auro-menuoption>
<auro-menuoption value="two">Option Two</auro-menuoption>
<auro-menuoption value="three">Option Three</auro-menuoption>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-combobox.css-parts-demo::part(dropdownTrigger) {
    border-color: orange;
  }
  auro-combobox.css-parts-demo::part(dropdownChevron) {
    color: purple;
  }
  auro-combobox.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-combobox.css-parts-demo::part(dropdownSize) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;auro-combobox class="css-parts-demo"&gt;
  &lt;span slot="label"&gt;CSS Parts Example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This combobox has custom styles applied via CSS Shadow Parts.&lt;/span&gt;
  &lt;auro-menuoption value="one"&gt;Option One&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="two"&gt;Option Two&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="three"&gt;Option Three&lt;/auro-menuoption&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="behaviorMode">Suggestion vs. Filter</auro-header>
<p>There are two behaviors available for the combobox: <code>suggestion</code> and <code>filter</code>. The default behavior is <code>suggestion</code>.</p>
<p>With <code>behavior="suggestion"</code>, the menu options are displayed as suggestions, but the user may enter whatever value they like into the input.</p>
<p>With <code>behavior="filter"</code>, the user is not required pick a value but if a value is typed into the input the user is required to choose one of the menu options in order for the input to be considered valid.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/suggestion.html) -->
<!-- The below content is automatically added from ./../apiExamples/suggestion.html -->
<auro-combobox behavior="suggestion">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear All</span>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name - suggestion behavior</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/suggestion.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/suggestion.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox behavior="suggestion"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name - suggestion behavior&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/filter.html) -->
<!-- The below content is automatically added from ./../apiExamples/filter.html -->
<auro-combobox behavior="filter" setCustomValidityValueMissingFilter="Please select an option from the list">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear All</span>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name - filter behavior</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/filter.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/filter.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox behavior="filter" setCustomValidityValueMissingFilter="Please select an option from the list"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name - filter behavior&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputType">Input Type</auro-header>
<p>When defined, the <code>auro-input</code> in the combobox trigger will use the defined <code>type</code>. Use the <code>triggerIcon</code> attribute to provide context to the user about the expected input type.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
<!-- The below content is automatically added from ./../apiExamples/type_credit-card.html -->
<auro-combobox type="credit-card" triggerIcon>
<span slot="bib.fullscreen.headline">Credit Card</span>
<span slot="label">Credit Card Number</span>
<auro-menu>
<auro-menuoption value="4500000000000000" id="option-cc-0">
<auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
4000 0000 0000 0000
</auro-menuoption>
<auro-menuoption value="340000000000000" id="option-cc-1">
<auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
3400 000000 00000
</auro-menuoption>
<auro-menuoption value="30000000000000" id="option-cc-2">
<auro-icon category="payment" customcolor name="credit-card"></auro-icon>
3000 000000 0000
</auro-menuoption>
<auro-menuoption value="5100000000000000" id="option-cc-4">
<auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
5000 0000 0000 0000
</auro-menuoption>
<auro-menuoption value="6011000000000000" id="option-cc-5">
<auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
6000 0000 0000 0000
</auro-menuoption>
<auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_credit-card.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/type_credit-card.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox type="credit-card" triggerIcon&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Credit Card&lt;/span&gt;
  &lt;span slot="label"&gt;Credit Card Number&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="4500000000000000" id="option-cc-0"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-visa"&gt;&lt;/auro-icon&gt;
      4000 0000 0000 0000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="340000000000000" id="option-cc-1"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-amex"&gt;&lt;/auro-icon&gt;
      3400 000000 00000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="30000000000000" id="option-cc-2"&gt;
      &lt;auro-icon category="payment" customcolor name="credit-card"&gt;&lt;/auro-icon&gt;
      3000 000000 0000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="5100000000000000" id="option-cc-4"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-mastercard"&gt;&lt;/auro-icon&gt;
      5000 0000 0000 0000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="6011000000000000" id="option-cc-5"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-discover"&gt;&lt;/auro-icon&gt;
      6000 0000 0000 0000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching credit card saved&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Input Mode</auro-header>
<p>The <code>inputmode</code> attribute controls which virtual keyboard layout is presented on mobile devices. For example, setting <code>inputmode="numeric"</code> displays a number pad instead of the full text keyboard, making it easier for users to enter the expected type of data.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-combobox inputmode="numeric">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="1" id="option-0">1</auro-menuoption>
<auro-menuoption value="2" id="option-1">2</auro-menuoption>
<auro-menuoption value="3" id="option-2">3</auro-menuoption>
<auro-menuoption value="4" id="option-3">4</auro-menuoption>
<auro-menuoption value="5" id="option-4">5</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox inputmode="numeric"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="1" id="option-0"&gt;1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="2" id="option-1"&gt;2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="3" id="option-2"&gt;3&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="4" id="option-3"&gt;4&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="5" id="option-4"&gt;5&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noFilter">Turn off Filtering</auro-header>
<p>If set, combobox will not do suggestion filtering of the menuoptions. This option is useful when the <code>&lt;auro-menuoption&gt;</code> elements are being pre-filtered externally (e.g. using the citysearch API).</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-filter.html -->
<auro-combobox noFilter>
<span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-filter.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-filter.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox noFilter&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;noFilter Combobox Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="persistInput">Persist Input</auro-header>
<p>The <code>persistInput</code> attribute allows you to set the combobox to persist the value of the input regardless of the current value set for the combobox. This is typically used in conjunction with display values and dynamic menus.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
<!-- The below content is automatically added from ./../apiExamples/persist-input.html -->
<auro-combobox
required
persistInput
setCustomValidityValueMissing="Please select an option from the list."
>
<span slot="bib.fullscreen.headline">Persistant Input</span>
<span slot="label">Persistant Input</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">
Apples
<div slot="displayValue">Apples</div>
</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">
Oranges
<div slot="displayValue">Oranges</div>
</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">
Peaches
<div slot="displayValue">Peaches</div>
</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">
Grapes
<div slot="displayValue">Grapes</div>
</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">
Cherries
<div slot="displayValue">Cherries</div>
</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persist-input.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/persist-input.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox
  required
  persistInput
  setCustomValidityValueMissing="Please select an option from the list."
  &gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Persistant Input&lt;/span&gt;
  &lt;span slot="label"&gt;Persistant Input&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;
      Apples
      &lt;div slot="displayValue"&gt;Apples&lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;
      Oranges
      &lt;div slot="displayValue"&gt;Oranges&lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;
      Peaches
      &lt;div slot="displayValue"&gt;Peaches&lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;
      Grapes
      &lt;div slot="displayValue"&gt;Grapes&lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;
      Cherries
      &lt;div slot="displayValue"&gt;Cherries&lt;/div&gt;
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>Use the <code>disabled</code> attribute to disable the combobox. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-combobox disabled>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox disabled&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-option.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-option.html -->
<auro-combobox>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1" disabled>Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4" disabled>Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-option.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-option.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1" disabled&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4" disabled&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require Selection</auro-header>
<p>Populates the <code>required</code> attribute on the input. Used for client-side validation.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-combobox required>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force Error State</auro-header>
<p>Using the <code>error</code> attribute with a given message sets a persistent error state (e.g. an error state returned from the server).</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-combobox error="Custom error message">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox error="Custom error message"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom Validation Messages</auro-header>
<p>The combobox provides several properties to customize the error messages displayed for different validation states:</p>
<ul>
<li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error.</li>
<li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty.</li>
<li><strong><code>setCustomValidityValueMissingFilter</code></strong> — Displayed when the user has not chosen a menu option when <code>behavior="filter"</code>.</li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity-message.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-validity-message.html -->
<auro-combobox required setCustomValidityValueMissing="Please select a fruit from the list.">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity-message.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-validity-message.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox required setCustomValidityValueMissing="Please select a fruit from the list."&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>When the <code>noValidate</code> attribute is present, the component will not perform automatic validation on blur. This is useful when validation is handled externally or should only be triggered on form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-combobox required noValidate>
<span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->

<pre class="language-html"><code class="language-html">&lt;auro-combobox required noValidate&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;noValidate Combobox Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dynamicMenu">Dynamic Menu</auro-header>
<p>The combobox supports dynamically generated menu options. This is useful when the menu options are fetched from an external API based on user input, such as a city search.</p>
<p>Use the <code>noFilter</code> and <code>persistInput</code> attributes together when implementing a dynamic menu. The <code>noFilter</code> attribute prevents the combobox from filtering the options internally (since the API handles filtering), and <code>persistInput</code> keeps the typed value visible while the user browses results.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamic-menu.html) -->
<!-- The below content is automatically added from ./../apiExamples/dynamic-menu.html -->
<!-- HTML example file -->
<!-- ----------------- -->
<auro-combobox
id="dynamicMenuExample"
value="TAN"
noFilter
persistInput
dvInputOnly
setCustomValidityValueMissing="Please select an option from the list."
required>
<span slot="bib.fullscreen.headline">Dynamic Combobox Header</span>
<span slot="label">First</span>
<!--
The auro-combobox element requires an empty auro-menu element
due to the requirements of auro-dropdown and auro-input
-->
<auro-menu id="initMenu"></auro-menu>
</auro-combobox>
<br>
<auro-combobox
id="dynamicMenuExampleTwo"
value="GER"
noFilter
persistInput
dvInputOnly
setCustomValidityValueMissing="Please select an option from the list."
required>
<span slot="bib.fullscreen.headline">Dynamic Combobox Header</span>
<span slot="label">Second</span>
<!--
The auro-combobox element requires an empty auro-menu element
due to the requirements of auro-dropdown and auro-input
-->
<auro-menu id="initMenuTwo"></auro-menu>
</auro-combobox>
<br>
<auro-button id="dynamicMenuSwapButton">
Swap Values
</auro-button>
<auro-button id="dynamicMenuPersistButton">
Toggle Persist Input
</auro-button>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic-menu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dynamic-menu.html -->

<pre class="language-html"><code class="language-html">&lt;!-- HTML example file --&gt;
&lt;!-- ----------------- --&gt;
&lt;auro-combobox
  id="dynamicMenuExample"
  value="TAN"
  noFilter
  persistInput
  dvInputOnly
  setCustomValidityValueMissing="Please select an option from the list."
  required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Dynamic Combobox Header&lt;/span&gt;
  &lt;span slot="label"&gt;First&lt;/span&gt;
  &lt;!--
    The auro-combobox element requires an empty auro-menu element
    due to the requirements of auro-dropdown and auro-input
  --&gt;
  &lt;auro-menu id="initMenu"&gt;&lt;/auro-menu&gt;
&lt;/auro-combobox&gt;
&lt;br&gt;
&lt;auro-combobox
  id="dynamicMenuExampleTwo"
  value="GER"
  noFilter
  persistInput
  dvInputOnly
  setCustomValidityValueMissing="Please select an option from the list."
  required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Dynamic Combobox Header&lt;/span&gt;
  &lt;span slot="label"&gt;Second&lt;/span&gt;
  &lt;!--
    The auro-combobox element requires an empty auro-menu element
    due to the requirements of auro-dropdown and auro-input
  --&gt;
  &lt;auro-menu id="initMenuTwo"&gt;&lt;/auro-menu&gt;
&lt;/auro-combobox&gt;
&lt;br&gt;
&lt;auro-button id="dynamicMenuSwapButton"&gt;
  Swap Values
&lt;/auro-button&gt;
&lt;auro-button id="dynamicMenuPersistButton"&gt;
  Toggle Persist Input
&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
