<auro-header level="1" id="overview">Counter - Overview and UX Guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#standaloneCounter" class="level2 body-xs">Standalone Counter</auro-anchorlink>
<auro-anchorlink fluid href="#counterGroup" class="level2 body-xs">Counter Group</auro-anchorlink>
<auro-anchorlink fluid href="#dropdownCounter" class="level2 body-xs">Dropdown Counter</auro-anchorlink>
<auro-anchorlink fluid href="#viewport" class="level2 body-xs">Change Viewport Size</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The <code>auro-counter</code> component is a ui element that enables a way to increment or decrement a single digit value. Common use case is inside the <code>auro-counter-group</code> to facilitate a collection of counters to add passenger types to a flight.
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
Adults
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<section>
<auro-header level="2" id="userStories">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="standaloneCounter">Standalone Counter</auro-header>
<p>As a user, I want a simple numeric input that I can increment or decrement to select a quantity.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
Adults
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="counterGroup">Counter Group</auro-header>
<p>As a user, I want to select multiple related quantities — such as different passenger types — in a single grouped interface.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-counter-group>
<auro-counter>
Short label
</auro-counter>
<auro-counter>
Another short label
</auro-counter>
<auro-counter>
This is an example of the wrapping behavior for a long label
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter&gt;
    Short label
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Another short label
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    This is an example of the wrapping behavior for a long label
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dropdownCounter">Dropdown Counter</auro-header>
<p>As a user, I want a compact dropdown that expands to reveal counter options, saving space in forms.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
Adults
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
Children
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
Lap Infants
<span slot="description">Under 2 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="description"&gt;Under 17 years old. Restrictions apply if traveling without an adult.&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Lap Infants
    &lt;span slot="description"&gt;Under 2 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewport">Change Viewport Size</auro-header>
<p>The user may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the counter group while the dropdown bib is expanded. It is possible that the viewport size change will cause the bib to change from a popover to a fullscreen modal or vice versa while the bib is open.</p>
<auro-header level="4" id="us-popoverToModal">Popover to Modal</auro-header>
<p>While in a popover display state with the bib open, focus will be on the trigger. After switching to the fullscreen modal dialog, focus will move to the close button inside the dialog.</p>
<auro-header level="4" id="us-modalToPopover">Modal to Popover</auro-header>
<p>While in a fullscreen modal display state with the bib open, focus will be on the close button inside the dialog. After switching to the popover display, focus will move to the trigger.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
