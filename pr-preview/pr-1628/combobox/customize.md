<auro-header level="1" id="overview">Combobox: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, size, and layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom display value</auro-anchorlink>
<auro-anchorlink fluid href="#checkmarks" class="level2 body-xs">Checkmarks</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No flip</auro-anchorlink>
<auro-anchorlink fluid href="#customBibWidth" class="level2 body-xs">Custom bib width</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#behaviorMode" class="level2 body-xs">Suggestion vs. filter</auro-anchorlink>
<auro-anchorlink fluid href="#inputType" class="level2 body-xs">Input type</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input mode</auro-anchorlink>
<auro-anchorlink fluid href="#noFilter" class="level2 body-xs">No filter</auro-anchorlink>
<auro-anchorlink fluid href="#persistInput" class="level2 body-xs">Persist input</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable options</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force error state</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
<auro-anchorlink fluid href="#dynamicMenu" class="level2 body-xs">Dynamic menu</auro-anchorlink>
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
<p>Set <code>appearance="inverse"</code> when the combobox is on a dark background. The default, <code>appearance="default"</code>, is for light backgrounds.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-default.html -->
<auro-combobox>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Default appearance</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Default appearance&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
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
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Inverse appearance</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse appearance&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
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
<auro-header level="3" id="displayValue">Custom display value</auro-header>
<p>The <code>displayValue</code> slot shows custom HTML content in place of the selected option's text when the combobox doesn't have focus.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/display-value.html -->
<auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="checkmarks">Checkmark on selected option</auro-header>
<p>Use the <code>checkmark</code> attribute to display a checkmark next to the selected option in the dropdown menu.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/checkmark.html -->
<auro-combobox checkmark>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
    &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
    &lt;span slot="label"&gt;Name&lt;/span&gt;
    &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="placement">Bib placement</auro-header>
<p>Customize the bib position with the <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
<ul>
<li><code>placement</code> sets the preferred position of the bib relative to the trigger.</li>
<li><code>offset</code> sets the distance between the trigger and the bib.</li>
<li>When there isn't enough space for the preferred <code>placement</code>, the bib flips to another position, unless <code>noFlip</code> is set.</li>
<li><code>shift</code> moves the bib to keep it inside the viewport when it would otherwise overflow.</li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<div style="width: 350px">
<auro-combobox offset="20" noFlip placement="bottom-end">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Label</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="helpText">Bib placed below the trigger at its end edge, 20px away, and doesn't flip</span>
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
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Label</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="helpText">Bib placed below the trigger at its end edge, 20px away, and flips when there isn't room</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-combobox offset="20" noFlip placement="right">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Label</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="helpText">Bib placed to the right of the trigger, 20px away, and doesn't flip</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-combobox offset="20" noFlip placement="bottom-start" shift>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Label</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="helpText">Bib placed below the trigger at its start edge, 20px away, shifts to stay in view, and doesn't flip</span>
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
    &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bib placed below the trigger at its end edge, 20px away, and doesn't flip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
&#10;  &lt;auro-combobox offset="20" placement="bottom-end"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bib placed below the trigger at its end edge, 20px away, and flips when there isn't room&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
&#10;  &lt;auro-combobox offset="20" noFlip placement="right"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bib placed to the right of the trigger, 20px away, and doesn't flip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
&#10;  &lt;auro-combobox offset="20" noFlip placement="bottom-start" shift&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bib placed below the trigger at its start edge, 20px away, shifts to stay in view, and doesn't flip&lt;/span&gt;
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
<auro-header level="3" id="noFlip">No flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the bib doesn't flip to another position when there isn't enough space in the specified <code>placement</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
<!-- The below content is automatically added from ./../apiExamples/noflip.html -->
<auro-combobox noFlip>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="helpText">The bib stays below the trigger, even without room</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="helpText"&gt;The bib stays below the trigger, even without room&lt;/span&gt;
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
<auro-header level="3" id="customBibWidth">Custom bib width</auro-header>
<p>By default the bib's width matches the trigger. To set a specific width, style the <code>dropdownSize</code> CSS shadow part.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-bib-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-bib-width.html -->
<auro-combobox id="customBibWidthExample">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear departure airport</span>
<span slot="bib.fullscreen.headline">Departure airport</span>
<span slot="label">From</span>
<auro-menu>
<auro-menuoption value="SEA">Seattle, WA (SEA-Seattle/Tacoma Intl.)</auro-menuoption>
<auro-menuoption value="PDX">Portland, OR (PDX-Portland Intl.)</auro-menuoption>
<auro-menuoption value="SFO">San Francisco, CA (SFO-San Francisco Intl.)</auro-menuoption>
<auro-menuoption value="LAX">Los Angeles, CA (LAX-Los Angeles Intl.)</auro-menuoption>
<auro-menuoption value="JFK">New York, NY (JFK-John F. Kennedy Intl.)</auro-menuoption>
<auro-menuoption value="ORD">Chicago, IL (ORD-Chicago O'Hare Intl.)</auro-menuoption>
</auro-menu>
</auro-combobox>
<style>
            #customBibWidthExample::part(dropdownSize) {
              width: 400px;
            }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-bib-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-bib-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox id="customBibWidthExample"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear departure airport&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Departure airport&lt;/span&gt;
  &lt;span slot="label"&gt;From&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="SEA"&gt;Seattle, WA (SEA-Seattle/Tacoma Intl.)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="PDX"&gt;Portland, OR (PDX-Portland Intl.)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="SFO"&gt;San Francisco, CA (SFO-San Francisco Intl.)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="LAX"&gt;Los Angeles, CA (LAX-Los Angeles Intl.)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="JFK"&gt;New York, NY (JFK-John F. Kennedy Intl.)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ORD"&gt;Chicago, IL (ORD-Chicago O'Hare Intl.)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;
&#10;&lt;style&gt;
  #customBibWidthExample::part(dropdownSize) {
    width: 400px;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="breakpoint">Fullscreen breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute sets the screen size at which the bib switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<p>When the screen is the selected breakpoint's size or smaller, the bib opens in fullscreen mode. Set the value to <code>disabled</code> to keep the bib from ever opening in fullscreen mode.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-combobox fullscreenBreakpoint="lg">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<p>Restyle the combobox by changing the values of the following tokens from the dropdown, input, and menu.</p>
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
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../input/src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">/* stylelint-disable custom-property-empty-line-before */
&#10;@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
&#10;  --ds-auro-input-outline-color: transparent;
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
&#10;  --ds-auro-input-outline-color: transparent;
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
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-combobox&gt;</code> exposes the following parts.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>dropdownTrigger</code></td><td>Doesn't currently style anything, because the dropdown inside the combobox doesn't render a <code>trigger</code> part.</td></tr>
<tr><td><code>dropdownChevron</code></td><td>Doesn't currently style anything, because the combobox doesn't show a chevron.</td></tr>
<tr><td><code>dropdownSize</code></td><td>The element that sets the bib's size. Only <code>height</code>, <code>width</code>, <code>max-height</code>, and <code>max-width</code> apply.</td></tr>
<tr><td><code>dropdownBibTemplate</code></td><td>The container inside the bib that holds the options and, in the fullscreen bib, the headline, close button, and input.</td></tr>
<tr><td><code>helpText</code></td><td>The help text and error message below the combobox.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
            auro-combobox.css-parts-demo::part(helpText) {
              color: green;
            }
            auro-combobox.css-parts-demo::part(dropdownSize) {
              max-height: 200px;
            }
</style>
<auro-combobox class="css-parts-demo">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">CSS parts example</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="helpText">This combobox has custom styles applied with CSS shadow parts.</span>
<auro-menu>
<auro-menuoption value="one">Option one</auro-menuoption>
<auro-menuoption value="two">Option two</auro-menuoption>
<auro-menuoption value="three">Option three</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-combobox.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-combobox.css-parts-demo::part(dropdownSize) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;auro-combobox class="css-parts-demo"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;CSS parts example&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
  &lt;span slot="helpText"&gt;This combobox has custom styles applied with CSS shadow parts.&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="one"&gt;Option one&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="two"&gt;Option two&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="three"&gt;Option three&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="behaviorMode">Suggestion vs. filter</auro-header>
<p>The combobox has two behaviors: <code>suggestion</code> and <code>filter</code>. The default behavior is <code>suggestion</code>.</p>
<p>With <code>behavior="suggestion"</code>, the menu options are suggestions, and the user can type any value into the input.</p>
<p>With <code>behavior="filter"</code>, the user doesn't have to enter a value, but once they type into the input, they must choose one of the menu options for the input to be valid.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/suggestion.html) -->
<!-- The below content is automatically added from ./../apiExamples/suggestion.html -->
<auro-combobox behavior="suggestion">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name (suggestion behavior)</span>
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
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name (suggestion behavior)&lt;/span&gt;
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
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name (filter behavior)</span>
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
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name (filter behavior)&lt;/span&gt;
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
<auro-header level="3" id="inputType">Input type</auro-header>
<p>Set <code>type</code> to apply that type to the combobox's input, such as <code>credit-card</code>. Use the <code>triggerIcon</code> attribute to show the user an icon for the expected input type. Icon rendering is currently limited to <code>type="credit-card"</code>. With any other type, <code>triggerIcon</code> doesn't show an icon.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
<!-- The below content is automatically added from ./../apiExamples/type_credit-card.html -->
<auro-combobox type="credit-card" triggerIcon>
<span slot="bib.fullscreen.headline">Credit card</span>
<span slot="label">Credit card number</span>
<span slot="ariaLabel.input.clear">Clear credit card number</span>
<auro-menu>
<auro-menuoption value="4500000000000000" id="option-cc-0">
<auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
                4500 0000 0000 0000
</auro-menuoption>
<auro-menuoption value="340000000000000" id="option-cc-1">
<auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
                3400 000000 00000
</auro-menuoption>
<auro-menuoption value="30000000000000" id="option-cc-2">
<auro-icon category="payment" customcolor name="cc-dinersclub"></auro-icon>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Credit card&lt;/span&gt;
  &lt;span slot="label"&gt;Credit card number&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear credit card number&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="4500000000000000" id="option-cc-0"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-visa"&gt;&lt;/auro-icon&gt;
      4500 0000 0000 0000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="340000000000000" id="option-cc-1"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-amex"&gt;&lt;/auro-icon&gt;
      3400 000000 00000
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="30000000000000" id="option-cc-2"&gt;
      &lt;auro-icon category="payment" customcolor name="cc-dinersclub"&gt;&lt;/auro-icon&gt;
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
<auro-header level="3" id="inputMode">Input mode</auro-header>
<p>Set <code>inputmode</code> to choose which on-screen keyboard mobile devices show. For example, <code>inputmode="numeric"</code> shows a number pad instead of the full keyboard, which makes digits easier to enter.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-combobox inputmode="numeric">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="noFilter">Turn off filtering</auro-header>
<p>Set <code>noFilter</code> to show every option no matter what the user types. Use it when you filter the <code>&lt;auro-menuoption&gt;</code> elements yourself, such as with results from a city search API.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-filter.html -->
<auro-combobox noFilter>
<span slot="bib.fullscreen.headline">Combobox without filtering</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Combobox without filtering&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="persistInput">Persist input</auro-header>
<p>Set <code>persistInput</code> to keep the user's typed text in the input when they select an option, instead of replacing it with the option's text. Use it with display values and dynamic menus.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
<!-- The below content is automatically added from ./../apiExamples/persist-input.html -->
<auro-combobox
            required
            persistInput
            setCustomValidityValueMissing="Please select an option from the list."
            >
<span slot="bib.fullscreen.headline">Persistent input</span>
<span slot="label">Persistent input</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Persistent input&lt;/span&gt;
  &lt;span slot="label"&gt;Persistent input&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
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
<auro-header level="3" id="disableComponent">Disable component</auro-header>
<p>Use the <code>disabled</code> attribute to turn off the combobox. A disabled combobox is shown in a disabled style, can't receive focus, and doesn't respond to the keyboard or pointer.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-combobox disabled>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="disableOptions">Disable options</auro-header>
<p>The component can render one or more <code>disabled</code> options. When the user moves the active option with the keyboard or a screen reader, disabled options are skipped and the next enabled option becomes active.</p>
<p>When the user hovers over a disabled option with a pointer, nothing happens and the previous active option stays active.</p>
<p class="note">
<strong>Note:</strong> Setting <code>value</code> to the value of a <code>disabled</code> option doesn't select it. The combobox clears <code>value</code> and <code>optionSelected</code> to <code>undefined</code> instead. Disabling an option after it's selected doesn't currently clear the value.
</p>
<p class="note">
<strong>Note:</strong> Marking all options as disabled isn't supported. Disable the component instead.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-option.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-option.html -->
<auro-combobox>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="requireSelection">Require selection</auro-header>
<p>Set <code>required</code> to show an error when the user leaves the combobox empty.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-combobox required>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="forceError">Force error state</auro-header>
<p>Set the <code>error</code> attribute to a message to keep the combobox in an error state, such as for an error returned from the server.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-combobox error="Custom error message">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="customValidation">Custom validation messages</auro-header>
<p>The combobox provides several properties to customize the error messages displayed for different validation states:</p>
<ul>
<li><strong><code>setCustomValidity</code></strong>: Replaces the message for every validation error, except the filter-mode message from <code>setCustomValidityValueMissingFilter</code>.</li>
<li><strong><code>setCustomValidityCustomError</code></strong>: Sets the message shown while the <code>error</code> attribute is set.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong>: Sets the message shown when the component is <code>required</code> and the user leaves it empty.</li>
<li><strong><code>setCustomValidityValueMissingFilter</code></strong>: Sets the message shown when <code>behavior="filter"</code> and the user types text without choosing a menu option.</li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity-message.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-validity-message.html -->
<auro-combobox required setCustomValidityValueMissing="Please select a fruit from the list.">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="noValidate">No validation</auro-header>
<p>When the <code>noValidate</code> attribute is present, the component doesn't validate automatically on blur. Use it when you handle validation yourself or only want to validate on form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-combobox required noValidate>
<span slot="bib.fullscreen.headline">Combobox without validation</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
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
  &lt;span slot="bib.fullscreen.headline"&gt;Combobox without validation&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
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
<auro-header level="3" id="dynamicMenu">Dynamic menu</auro-header>
<p>The combobox supports dynamically generated menu options. Use them when you fetch the menu options from an external API based on user input, such as a city search.</p>
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
            setCustomValidityValueMissing="Please select an option from the list."
            required>
<span slot="bib.fullscreen.headline">Dynamic combobox header</span>
<span slot="label">First</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
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
            setCustomValidityValueMissing="Please select an option from the list."
            required>
<span slot="bib.fullscreen.headline">Dynamic combobox header</span>
<span slot="label">Second</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<!--
              The auro-combobox element requires an empty auro-menu element
              due to the requirements of auro-dropdown and auro-input
            -->
<auro-menu id="initMenuTwo"></auro-menu>
</auro-combobox>
<br>
<auro-button id="dynamicMenuSwapButton">
            Swap values
</auro-button>
<auro-button id="dynamicMenuPersistButton">
            Toggle persist input
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
  setCustomValidityValueMissing="Please select an option from the list."
  required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Dynamic combobox header&lt;/span&gt;
  &lt;span slot="label"&gt;First&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
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
  setCustomValidityValueMissing="Please select an option from the list."
  required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Dynamic combobox header&lt;/span&gt;
  &lt;span slot="label"&gt;Second&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
  &lt;!--
    The auro-combobox element requires an empty auro-menu element
    due to the requirements of auro-dropdown and auro-input
  --&gt;
  &lt;auro-menu id="initMenuTwo"&gt;&lt;/auro-menu&gt;
&lt;/auro-combobox&gt;
&lt;br&gt;
&lt;auro-button id="dynamicMenuSwapButton"&gt;
  Swap values
&lt;/auro-button&gt;
&#10;&lt;auro-button id="dynamicMenuPersistButton"&gt;
  Toggle persist input
&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="loading">Loading</auro-header>
<p>Use the <code>loading</code> attribute on <code>auro-menu</code> to display a loading state while menu options are being fetched. Define the <code>loadingIcon</code> and <code>loadingText</code> slots inside the menu to provide visual feedback during the loading state.</p>
<p>In this example, the combobox loads for 5 seconds before displaying the options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
<!-- The below content is automatically added from ./../apiExamples/loading.html -->
<auro-combobox id="loadingExample">
<span slot="bib.fullscreen.headline">Loading combobox header</span>
<span slot="label">Please select a preference</span>
<span slot="ariaLabel.input.clear">Clear preference</span>
<auro-menu id="loadingExampleComboboxMenu">
<auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox id="loadingExample"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Loading combobox header&lt;/span&gt;
  &lt;span slot="label"&gt;Please select a preference&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear preference&lt;/span&gt;
  &lt;auro-menu id="loadingExampleComboboxMenu"&gt;
    &lt;auro-loader slot="loadingIcon" orbit xs&gt;&lt;/auro-loader&gt;&lt;span slot="loadingText"&gt;Loading...&lt;/span&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="nonUniqueValues">Non-unique option values</auro-header>
<p>Two or more <code>auro-menuoption</code> elements may share the same <code>value</code>. This is common when the <code>value</code> represents a coarser grouping than the option label, such as several airports that all serve the same city. When the user filters the list and selects one of several options that share a <code>value</code>, the combobox resolves to the exact option chosen, so the correct label is displayed even though the underlying <code>value</code> is duplicated.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values.html) -->
<!-- The below content is automatically added from ./../apiExamples/duplicate-values.html -->
<auro-combobox>
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear departure airport</span>
<span slot="bib.fullscreen.headline">Choose an airport</span>
<span slot="label">Departure airport</span>
<auro-menu>
<auro-menuoption value="seattle" suggest="seattle sea seatac tacoma">Seattle&ndash;Tacoma International (SEA)</auro-menuoption>
<auro-menuoption value="seattle" suggest="seattle pae paine field everett">Seattle Paine Field (PAE)</auro-menuoption>
<auro-menuoption value="portland" suggest="portland pdx oregon">Portland International (PDX)</auro-menuoption>
<auro-menuoption value="spokane" suggest="spokane geg washington">Spokane International (GEG)</auro-menuoption>
<auro-menuoption static nomatch>No matching airport</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/duplicate-values.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear departure airport&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose an airport&lt;/span&gt;
  &lt;span slot="label"&gt;Departure airport&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="seattle" suggest="seattle sea seatac tacoma"&gt;Seattle&amp;ndash;Tacoma International (SEA)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="seattle" suggest="seattle pae paine field everett"&gt;Seattle Paine Field (PAE)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="portland" suggest="portland pdx oregon"&gt;Portland International (PDX)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="spokane" suggest="spokane geg washington"&gt;Spokane International (GEG)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching airport&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
