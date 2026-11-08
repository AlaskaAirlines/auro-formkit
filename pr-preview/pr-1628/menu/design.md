<auro-header level="1" id="overview">Menu - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="anatomy">Component anatomy</auro-header>
<p>The <code>auro-menu</code> component is a list container that renders one or more <code>auro-menuoption</code> elements. The component consists of the following key elements:</p>
<ul>
<li><strong>Menu container:</strong> The outer list element (<code>role="listbox"</code>) that holds all options and manages selection state, keyboard navigation, and active/selected tracking.</li>
<li><strong>Menu option:</strong> An individual selectable item (<code>auro-menuoption</code>) within the menu. Each option has a <code>value</code> and label text, and responds to the selected, disabled, and hidden states.</li>
<li><strong>Checkmark icon:</strong> A visual indicator shown on each selected option. Hide it with the <code>nocheckmark</code> attribute.</li>
<li><strong>Divider (<code>&lt;hr&gt;</code>):</strong> A horizontal rule used to visually separate groups of options within the menu.</li>
</ul>
<auro-header level="3" id="menuOption">Menu option</auro-header>
<p>Each <code>auro-menuoption</code> has a distinct look for these states: <strong>Hover</strong>, <strong>Active</strong> (keyboard-highlighted), <strong>Selected</strong>, and <strong>Disabled</strong>. Options support a default slot for display text and a <code>value</code> attribute that identifies the option when it's selected.</p>
<auro-header level="3" id="dividers">Dividers</auro-header>
<p>Use standard <code>&lt;hr&gt;</code> elements between <code>auro-menuoption</code> elements to create visual group separators. Dividers can't be selected, and keyboard navigation skips them.</p>
<auro-header level="3" id="checkmark">Checkmark</auro-header>
<p>By default, a checkmark icon appears next to each selected option. Use the <code>nocheckmark</code> attribute on <code>auro-menu</code> to hide this indicator when you want a simpler look.</p>
</section>
<section>
<auro-header level="2" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-menu</code> component supports the <code>shape</code> and <code>size</code> feature set. The component defaults to <code>shape="box"</code> and <code>size="sm"</code>. The component doesn't support the <code>layout</code> attribute.</p>
<auro-header level="3" id="size">Size</auro-header>
<p>Use the <code>size</code> attribute to change the size of menu options. Supported values are <code>xs</code>, <code>sm</code> (default), <code>md</code>, <code>lg</code>, and <code>xl</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/size.html) -->
<!-- The below content is automatically added from ./../apiExamples/size.html -->
<auro-menu size="md">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/size.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/size.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu size="md"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="shape">Shape</auro-header>
<p>Use the <code>shape</code> attribute to change the shape of menu options. Supported values are <code>box</code> (default), <code>pill</code>, and <code>snowflake</code>. <code>box</code> and <code>snowflake</code> have square corners, and <code>pill</code> has fully rounded ends.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shape.html) -->
<!-- The below content is automatically added from ./../apiExamples/shape.html -->
<auro-menu shape="pill">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shape.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/shape.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu shape="pill"&gt;
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
