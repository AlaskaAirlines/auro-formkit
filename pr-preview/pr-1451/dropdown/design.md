<auro-header level="1" id="overview">Dropdown - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>trigger:</strong> shows the component label or content and will render to reflect state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>).
</li>
<li>
<strong>bib:</strong> the expandable content area that is shown/hidden when the trigger is activated.
</li>
<li>
<strong>chevron:</strong> an optional icon indicating the expanded/collapsed state of the dropdown. Visible when the <code>chevron</code> attribute is set.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the trigger intended to help clarify the intended use of the component instance.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger is a focusable element and will visually respond to common UI states - <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="bib">Bib</auro-header>
<p>The bib is positioned relative to the trigger and may be configured to appear above or below. At smaller viewports the bib can switch to fullscreen mode based on the <code>fullscreenBreakpoint</code> setting.</p>
<auro-header level="4" id="helpText">Help Text</auro-header>
<p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape | Size | Layout Support</auro-header>
<p>The <code>auro-dropdown</code> component supports the <code>shape</code>, <code>size</code> and <code>layout</code> feature set. The component defaults to the <code>layout="classic"</code>, <code>shape="classic"</code> and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic Layout</auro-header>
<p>The <code>classic</code> layout is default for <code>auro-dropdown</code>. No customization is needed to achieve this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/classic/basic.html -->
<auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="classicButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="classicButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="emphasizedLayout">Emphasized Layout</auro-header>
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
<auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&lt;auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&lt;auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake Layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.</p>
<p>The <code>snowflake</code> layout is only expected to be used on dark backgrounds, in conjunction with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
