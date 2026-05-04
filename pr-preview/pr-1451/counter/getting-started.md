<auro-header level="1" id="overview">Counter - Getting Started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
<auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-counter-group</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">- label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-valueText" class="level2 body-xs">- valueText</auro-anchorlink>
<auro-anchorlink fluid href="#slotsCounter" class="level2 body-xs">auro-counter</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-counter" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-description" class="level2 body-xs">- description</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText-counter" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
<auro-anchorlink fluid href="#increment" class="level2 body-xs">increment()</auro-anchorlink>
<auro-anchorlink fluid href="#decrement" class="level2 body-xs">decrement()</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/install.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/install.md -->
<auro-header level="2" id="setup">Setup</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion expanded class="section" id="recommendedAccordion">
<span slot="trigger">Recommended Installation and Implementation</span>
<div class="accordion-content">
<auro-header level="3">Install</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/auro-formkit</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/customRegistration.md -->
<auro-header level="4">Custom Component Registration for Version Management</auro-header>
There are two key parts to every Auro component: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
​
// Register with a custom name if desired
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');</code></pre>

This will create a new custom element <code>&lt;custom-counter&gt;</code> and <code>&lt;custom-counter-group&gt;</code> that behaves exactly like <code>&lt;auro-counter&gt;</code> and <code>&lt;auro-counter-group&gt;</code>, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom.html -->
<pre class="language-html"><code class="language-html">&lt;custom-counter-group&gt;
  &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;custom-counter&gt;
    Adults
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/custom-counter&gt;
  &lt;custom-counter&gt;
    Children
    &lt;span slot="description"&gt;2-17 years&lt;/span&gt;
  &lt;/custom-counter&gt;
&lt;/custom-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="autoAccordion">
<span slot="trigger">Auto Installation and Implementation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> Default registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<auro-header level="3">Install</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/auro-formkit</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/defaultRegistration.md -->
Import the component and its dependencies, then register the custom elements:

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-counter';</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter&gt;Adults&lt;/auro-counter&gt;
  &lt;auro-counter&gt;Children&lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
The counter components can be loaded via CDN without a build step:

<pre class="language-html"><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-counter/+esm" type="module"&gt;&lt;/script&gt;</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter&gt;Adults&lt;/auro-counter&gt;
  &lt;auro-counter&gt;Children&lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>A standalone <code>&lt;auro-counter&gt;</code> requires only a label in the default slot:</p>
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
&lt;/auro-counter&gt;</code></pre>
<p>For a grouped counter with dropdown, provide a <code>label</code> slot and <code>bib.fullscreen.headline</code> slot on the group:</p>
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="label"&gt;Passengers&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;auro-counter&gt;Adults&lt;/auro-counter&gt;
  &lt;auro-counter&gt;Children&lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-counter-group</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter-group&gt;</code> element.</p>
<auro-header level="4" id="slot-label">label</auro-header>
<p>Dropdown label content. Only used when <code>isDropdown</code> is true.</p>
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
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>Dropdown help text content. Only used when <code>isDropdown</code> is true.</p>
<auro-header level="4" id="slot-valueText">valueText</auro-header>
<p>Customize the value display text in the dropdown trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-value-text.html -->
<div style="max-width: 350px;">
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="valueText">Custom value text</div>
<div slot="label"></div>
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
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-value-text.html -->
<pre class="language-html"><code class="language-html">&lt;div style="max-width: 350px;"&gt;
  &lt;auro-counter-group isDropdown&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
    &lt;div slot="valueText"&gt;Custom value text&lt;/div&gt;
    &lt;div slot="label"&gt;&lt;/div&gt;
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
  &lt;/auro-counter-group&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="slotsCounter">auro-counter</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter&gt;</code> element.</p>
<auro-header level="4" id="slot-default-counter">(default)</auro-header>
<p>Main label content for the counter. This is the primary text displayed alongside the increment/decrement controls.</p>
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
<auro-header level="4" id="slot-description">description</auro-header>
<p>Descriptive content rendered below the counter label. Use this for supplementary information about the counter option.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/description.html) -->
<!-- The below content is automatically added from ./../apiExamples/description.html -->
<auro-counter>
Adults
<span slot="description">18 years or older</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/description.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/description.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-helpText-counter">helpText</auro-header>
<p>Help text content displayed below the counter.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-helptext.html) -->
<!-- The below content is automatically added from ./../apiExamples/counter-helptext.html -->
<auro-counter>
Adults
<span slot="helpText">This is help text for the counter</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-helptext.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-helptext.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="helpText"&gt;This is help text for the counter&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the counter or counter group as a string. Possible values include <code>valid</code> and <code>customError</code>.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available.</p>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the counter or counter group. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
<auro-header level="3" id="increment">increment()</auro-header>
<p>Increments the counter value by 1. Optionally pass a number to increment by a specific amount.</p>
<auro-header level="3" id="decrement">decrement()</auro-header>
<p>Decrements the counter value by 1. Optionally pass a number to decrement by a specific amount.</p>
</section>
</div>
</div>
</div>
