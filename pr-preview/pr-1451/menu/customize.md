<auro-header level="1" id="overview">Menu - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#restrictedWidth" class="level2 body-xs">Restricted Width</auro-anchorlink>
<auro-anchorlink fluid href="#scroll" class="level2 body-xs">Scroll</auro-anchorlink>
<auro-anchorlink fluid href="#nocheckmark" class="level2 body-xs">No Checkmark</auro-anchorlink>
<auro-anchorlink fluid href="#nestedMenu" class="level2 body-xs">Nested Menu</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled Options</auro-anchorlink>
<auro-anchorlink fluid href="#disabledMenu" class="level2 body-xs">Disabled Menu</auro-anchorlink>
<auro-anchorlink fluid href="#hidden" class="level2 body-xs">Hidden Options</auro-anchorlink>
<auro-anchorlink fluid href="#multiselect" class="level2 body-xs">Multi-Select</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
<auro-anchorlink fluid href="#presetValueMultiselect" class="level2 body-xs">Preset Value (Multi)</auro-anchorlink>
<auro-anchorlink fluid href="#preselect" class="level2 body-xs">Pre-Selected</auro-anchorlink>
<auro-anchorlink fluid href="#allowDeselect" class="level2 body-xs">Allow Deselect</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/default/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/default/tokens.scss -->
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
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
#customTokensMenu {
--ds-auro-menu-divider-color: #c9a4db;
--ds-auro-menuoption-container-color: #f3eaf8;
--ds-auro-menuoption-container-border-color: #7b2d8e;
--ds-auro-menuoption-icon-color: #5b1a6e;
--ds-auro-menuoption-text-color: #5b1a6e;
}
</style>
<auro-menu id="customTokensMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price" selected>Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #customTokensMenu {
    --ds-auro-menu-divider-color: #c9a4db;
    --ds-auro-menuoption-container-color: #f3eaf8;
    --ds-auro-menuoption-container-border-color: #7b2d8e;
    --ds-auro-menuoption-icon-color: #5b1a6e;
    --ds-auro-menuoption-text-color: #5b1a6e;
  }
&lt;/style&gt;
&lt;auro-menu id="customTokensMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price" selected&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="restrictedWidth">Restricted Width</auro-header>
<p>Use inline styles or a wrapping container to restrict the width of the menu. Long option text will wrap within the available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/restricted-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/restricted-width.html -->
<auro-menu style="width: 300px">
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab">Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as 'option_10_redevelopment_hover_scenario.png'</auro-menuoption>
<hr>
<auro-menuoption value="share">Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/restricted-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/restricted-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu style="width: 300px"&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab"&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as 'option_10_redevelopment_hover_scenario.png'&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share"&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="scroll">Scroll</auro-header>
<p>Use <code>max-height</code> to constrain the menu height. When options overflow the container, the menu becomes scrollable.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/scroll.html) -->
<!-- The below content is automatically added from ./../apiExamples/scroll.html -->
<auro-menu id="alpha" style="max-height: 200px">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu id="beta">
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu id="charlie">
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
<auro-menu id="delta">
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/scroll.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/scroll.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="alpha" style="max-height: 200px"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="beta"&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu id="charlie"&gt;
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
  &lt;auro-menu id="delta"&gt;
    &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="nocheckmark">No Checkmark</auro-header>
<p>Use the <code>nocheckmark</code> attribute to hide the selection checkmark icon on menu options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nocheckmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/nocheckmark.html -->
<auro-menu nocheckmark>
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
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nocheckmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/nocheckmark.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu nocheckmark&gt;
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
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="nestedMenu">Nested Menu</auro-header>
<p>Nest additional <code>auro-menu</code> elements inside the default slot to create sub-menus. Each nested menu maintains its own selection state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nested-menu.html) -->
<!-- The below content is automatically added from ./../apiExamples/nested-menu.html -->
<auro-menu id="alpha">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu id="beta">
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu id="charlie">
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
<auro-menu id="delta">
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nested-menu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/nested-menu.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="alpha"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="beta"&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu id="charlie"&gt;
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
  &lt;auro-menu id="delta"&gt;
    &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="disabled">Disabled Options</auro-header>
<p>Use the <code>disabled</code> attribute on <code>auro-menuoption</code> to prevent interaction with specific options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" disabled&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabledMenu">Disabled Menu</auro-header>
<p>Use the <code>disabled</code> attribute on <code>auro-menu</code> to disable the entire menu and all of its options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-menu.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-menu.html -->
<auro-menu disabled>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab">Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share">Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-menu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-menu.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu disabled&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab"&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share"&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="hidden">Hidden Options</auro-header>
<p>Use the <code>hidden</code> attribute on <code>auro-menuoption</code> to visually hide an option while keeping it in the DOM.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hidden.html) -->
<!-- The below content is automatically added from ./../apiExamples/hidden.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" hidden>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hidden.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/hidden.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" hidden&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="multiselect">Multi-Select</auro-header>
<p>Use the <code>multiselect</code> attribute on <code>auro-menu</code> to allow multiple options to be selected simultaneously.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
<!-- The below content is automatically added from ./../apiExamples/multi-select.html -->
<auro-menu multiselect>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multi-select.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu multiselect&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValue">Preset Value</auro-header>
<p>Use the <code>value</code> attribute on <code>auro-menu</code> to set the selected option when the menu renders.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/preset-value.html -->
<auro-menu value="duration">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preset-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu value="duration"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValueMultiselect">Preset Value with Multi-Select</auro-header>
<p>When using <code>multiselect</code>, set the <code>value</code> attribute to a JSON stringified array of values to pre-select multiple options.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value-multiselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/preset-value-multiselect.html -->
<auro-menu value='["stops","duration","arrival"]' multiselect>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value-multiselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preset-value-multiselect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu value='["stops","duration","arrival"]' multiselect&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="preselect">Pre-Selected</auro-header>
<p>Use the <code>selected</code> attribute on <code>auro-menuoption</code> to pre-select an option when the menu renders.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/preselect.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window" selected>New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preselect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window" selected&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" disabled&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="allowDeselect">Allow Deselect</auro-header>
<p>Use the <code>allowDeselect</code> attribute to allow users to click a selected option again to deselect it in single-select mode. In multi-select mode, deselection is always available regardless of this attribute.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/allow-deselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/allow-deselect.html -->
<auro-menu allowDeselect>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/allow-deselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/allow-deselect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu allowDeselect&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
