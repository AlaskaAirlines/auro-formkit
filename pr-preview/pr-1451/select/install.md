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
<p>Every Auro component consists of a JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define">custom element registration</a>. The class defines the component's behavior, and the registration maps it to an HTML tag name so it can be used in markup.</p>
<p>The default import (shown above) handles both steps automatically, registering the component under its standard tag name.</p>
<p>If you need multiple versions of the same component on a single page — for example, when two projects depend on different versions — you can register the class under a custom tag name to avoid conflicts.</p>
<p>To do this, import the component class directly and call its `register(name)` method with a unique name:</p>
<pre class="language-js"><code class="language-js">// Import the classes
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu } from '@aurodesignsystem/auro-formkit/auro-menu/class';
import { AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menuoption/class';
​
// Register each component with a custom name
AuroSelect.register('custom-select');
AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menuoption');</code></pre>

The `<auro-menu>` and `<auro-menuoption>` components must also be custom registered when using a custom `<auro-select>` registration. All three components work together and need to be registered under the same custom naming convention.

This will create new custom elements that behave exactly like their standard counterparts, allowing both to coexist on the same page without interfering with each other.

<pre class="language-html"><code class="language-html">&lt;custom-select placeholder="Placeholder Text" id="custom-select"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;custom-menu&gt;
    &lt;custom-menuoption value="stops"&gt;Stops&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="price"&gt;Price&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="duration"&gt;Duration&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="departure"&gt;Departure&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="arrival"&gt;Arrival&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-select&gt;</code></pre>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/defaultRegistration.md -->
<p>Once installed, the component can be used in your project by importing the component's registered module:</p>
<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-select';</code></pre>
<p>This import registers the <code>&lt;auro-select&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-select id="default-select"&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation and Implementation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN install & registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<auro-header level="3">Install & Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/cdnRegistration.md -->
<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-select/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-select&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-select id="cdn-select"&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
