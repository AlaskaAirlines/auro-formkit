<auro-header level="1" id="overview">Dropdown</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#useCases">User stories</auro-anchorlink>
<auro-anchorlink fluid href="#basicTrigger" class="level2 body-xs">Text trigger</auro-anchorlink>
<auro-anchorlink fluid href="#iconTrigger" class="level2 body-xs">Icon trigger</auro-anchorlink>
<auro-anchorlink fluid href="#buttonTrigger" class="level2 body-xs">Button trigger</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
        Use <code>auro-dropdown</code> to show interactive content, such as a list of options or a short form, in a panel that opens from a trigger. Both the trigger and the panel accept any valid HTML.

<p class="note"><strong>Note:</strong> If the content isn't interactive, such as a tooltip, [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="useCases">User stories</auro-header>
<auro-header level="3" id="basicTrigger">Text trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="iconTrigger">Icon trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-icon.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-icon.html -->
<auro-dropdown>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
<auro-icon
              category="interface"
              name="arrow-down">Show flight details</auro-icon>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-icon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    &lt;auro-icon
      category="interface"
      name="arrow-down"&gt;Show flight details&lt;/auro-icon&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="buttonTrigger">Button trigger</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-button.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-button.html -->
<auro-dropdown>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
<auro-button>
              Flight details
</auro-button>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-button.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-button.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    &lt;auro-button&gt;
      Flight details
    &lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
