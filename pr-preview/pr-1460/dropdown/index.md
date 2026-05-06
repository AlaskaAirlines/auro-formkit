<auro-header level="1" id="overview">Dropdown</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#useCases">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#basicTrigger" class="level2 body-xs">Text Trigger</auro-anchorlink>
<auro-anchorlink fluid href="#iconTrigger" class="level2 body-xs">Icon Trigger</auro-anchorlink>
<auro-anchorlink fluid href="#buttonTrigger" class="level2 body-xs">Button Trigger</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The `auro-dropdown` component is a trigger and dropdown element combination intended to be used with dropdown content that is interactive. `auro-dropdown` is content agnostic and any valid HTML can be placed in either the trigger or the dropdown.

_Note: if the dropdown content in your implementation is not interactive (e.g. a tooltip) [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs._
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="useCases">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The `auro-dropdown` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when interactive help is required
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="basicTrigger">Text Trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="iconTrigger">Icon Trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-icon.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-icon.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
<auro-icon
category="interface"
name="arrow-down"></auro-icon>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-icon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    &lt;auro-icon
      category="interface"
      name="arrow-down"&gt;&lt;/auro-icon&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="buttonTrigger">Button Trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-button.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-button.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
<auro-button slot="trigger">
Dropdown
</auro-button>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-button.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-button.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    &lt;auro-button slot="trigger"&gt;
      Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
