<auro-header level="1" id="overview">Dropdown: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/design/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/design/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>Trigger:</strong> shows the component label or content, and changes to reflect the component's state, such as <code>focus</code>, <code>hover</code>, or <code>disabled</code>.
</li>
<li>
<strong>Bib:</strong> the expandable content area that is shown/hidden when the trigger is activated.
</li>
<li>
<strong>Chevron:</strong> an optional icon indicating the expanded/collapsed state of the dropdown. Visible when the <code>chevron</code> attribute is set.
</li>
<li>
<strong>Help text:</strong> text below the trigger that helps people understand how to use the dropdown.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger is a focusable element and visually responds to common UI states: <strong>Hover</strong> <em>(<code>:hover</code>)</em>, <strong>Focus</strong> <em>(<code>:focus-within</code>)</em>, and <strong>Disabled</strong> <em>(the <code>disabled</code> attribute)</em>. The <strong>Active</strong> <em>(<code>:active</code>)</em> state uses the same style as focus.</p>
<auro-header level="4" id="bib">Bib</auro-header>
<p>The bib opens next to the trigger, on the side that <code>placement</code> sets. On screens at or below the <code>fullscreenBreakpoint</code> width, the bib fills the screen instead.</p>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text is optional. Consider how people, especially screen reader users, understand the full context of the dropdown without it.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-dropdown</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> attributes. None of them has a default value, so set all three, such as <code>layout="classic" shape="classic" size="lg"</code>, to get the standard look.</p>
<auro-header level="4" id="classicLayout">Classic layout</auro-header>
<p>The <code>classic</code> layout is the standard look for <code>auro-dropdown</code>. Set <code>layout="classic"</code> to use it.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/classic/basic.html -->
<auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron>
<div style="padding: var(--ds-size-150);">
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<br />
<auro-button id="classicButton">
            Dismiss dropdown
</auro-button>
</div>
<span slot="helpText">
          Times are local to each airport
</span>
<div slot="trigger">
          Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
    &lt;br /&gt;
    &lt;auro-button id="classicButton"&gt;
      Dismiss dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Times are local to each airport
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
<p>The <code>emphasized</code> layout is only supported on dark backgrounds.</p>
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
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<auro-dropdown shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
        Round trip
<div slot="trigger">
          Trip type
</div>
<span slot="helpText">
          Choose round trip or one way
</span>
</auro-dropdown>
<auro-dropdown shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
        Seattle (SEA)
<div slot="trigger">
          From
</div>
<span slot="helpText">
          Departure airport
</span>
</auro-dropdown>
<auro-dropdown shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
        Anchorage (ANC)
<div slot="trigger">
          To
</div>
<span slot="helpText">
          Arrival airport
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Round trip
  &lt;div slot="trigger"&gt;
    Trip type
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Choose round trip or one way
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&#10;&lt;auro-dropdown shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Seattle (SEA)
  &lt;div slot="trigger"&gt;
    From
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Departure airport
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&#10;&lt;auro-dropdown shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Anchorage (ANC)
  &lt;div slot="trigger"&gt;
    To
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Arrival airport
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one-off layout that doesn't follow the normal pattern. Use it only as shown in the following example.</p>
<p>Use the <code>snowflake</code> layout only on dark backgrounds, together with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-dropdown shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse">
        1 adult
<div slot="trigger">
          Travelers
</div>
<span slot="helpText">
          Include everyone on the trip, including children
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse"&gt;
  1 adult
  &lt;div slot="trigger"&gt;
    Travelers
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Include everyone on the trip, including children
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
