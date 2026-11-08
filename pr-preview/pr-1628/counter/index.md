<auro-header level="1" id="overview">Counter: Overview and UX guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User stories</auro-anchorlink>
<auro-anchorlink fluid href="#standaloneCounter" class="level2 body-xs">Standalone counter</auro-anchorlink>
<auro-anchorlink fluid href="#counterGroup" class="level2 body-xs">Counter group</auro-anchorlink>
<auro-anchorlink fluid href="#dropdownCounter" class="level2 body-xs">Dropdown counter</auro-anchorlink>
<auro-anchorlink fluid href="#viewport" class="level2 body-xs">Change viewport size</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<code>auro-counter</code> lets people choose a number with minus and plus buttons, such as how many passengers are traveling. Use it inside <code>auro-counter-group</code> to collect several related counts, such as adults, children, and lap infants on a flight.
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<section>
<auro-header level="2" id="userStories">User stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="standaloneCounter">Standalone counter</auro-header>
<p>As a user, I want a simple numeric input that I can increment or decrement to select a quantity.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
  Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="counterGroup">Counter group</auro-header>
<p>As a user, I want to select multiple related quantities, such as different passenger types, in a single grouped interface.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-counter-group>
<auro-counter>
    Short label
<span slot="ariaLabel.minus">Decrease short label</span>
<span slot="ariaLabel.plus">Increase short label</span>
</auro-counter>
<auro-counter>
    Another short label
<span slot="ariaLabel.minus">Decrease another short label</span>
<span slot="ariaLabel.plus">Increase another short label</span>
</auro-counter>
<auro-counter>
    This is an example of the wrapping behavior for a long label
<span slot="ariaLabel.minus">Decrease long label</span>
<span slot="ariaLabel.plus">Increase long label</span>
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
    &lt;span slot="ariaLabel.minus"&gt;Decrease short label&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase short label&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Another short label
    &lt;span slot="ariaLabel.minus"&gt;Decrease another short label&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase another short label&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    This is an example of the wrapping behavior for a long label
    &lt;span slot="ariaLabel.minus"&gt;Decrease long label&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase long label&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dropdownCounter">Dropdown counter</auro-header>
<p>As a user, I want a compact dropdown that expands to reveal counter options, saving space in forms.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
    Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
    Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
    Lap infants
<span slot="ariaLabel.minus">Remove lap infant</span>
<span slot="ariaLabel.plus">Add lap infant</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;Under 17 years old. Restrictions apply if traveling without an adult.&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Lap infants
    &lt;span slot="ariaLabel.minus"&gt;Remove lap infant&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add lap infant&lt;/span&gt;
    &lt;span slot="description"&gt;Under 2 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewport">Change viewport size</auro-header>
<p>The user may change the size of their viewport, for example by resizing their desktop browser window or rotating their mobile device. In some cases, this re-renders the counter group while the dropdown bib is expanded, and the open bib can switch from a popover to a fullscreen modal or back.</p>
<auro-header level="4" id="us-popoverToModal">Popover to modal</auro-header>
<p>While in a popover display state with the bib open, focus is on the trigger. After switching to the fullscreen modal dialog, focus moves to the close button inside the dialog.</p>
<auro-header level="4" id="us-modalToPopover">Modal to popover</auro-header>
<p>While in a fullscreen modal display state with the bib open, focus is on the close button inside the dialog. After switching to the popover display, focus moves to the trigger.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
