<auro-header level="2" id="setup">Setup</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion expanded class="section" id="recommendedAccordion">
<span slot="trigger">Recommended Installation and Implementation</span>
<div class="accordion-content">
<auro-header level="3">Install</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->
<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/customRegistration.md -->
<auro-header level="2" id="customRegistration">Custom Component Registration for Version Management</auro-header>
        There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

        You can do this by importing only the component class and using the <code>register(name)</code> method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';
​
// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');</code></pre>

        This will create a new custom element <code>&gt;custom-checkbox&lt;</code> and <code>&gt;custom-checkbox-group&lt;</code> that behaves exactly like <code>&gt;auro-checkbox&lt;</code> and <code>&lt;auro-checkbox-group&gt;</code>, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom.html -->
<pre class="language-html"><code class="language-html">&lt;custom-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;custom-checkbox value="value1" name="custom" id="checkbox-custom1"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
  &lt;custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked&gt;Custom checkbox option&lt;/custom-checkbox&gt;
  &lt;custom-checkbox value="value3" name="custom" id="checkbox-custom3"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
  &lt;custom-checkbox value="value4" name="custom" id="checkbox-custom4"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
&lt;/custom-checkbox-group&gt;</code></pre>
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
<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/defaultRegistration.md -->
<p>Once installed, the component can be used in your project by importing the component's registered module:</p>
<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-checkbox';</code></pre>
<p>This import registers the <code>&lt;auro-checkbox&gt;</code> and <code>&lt;auro-checkbox-group&gt;</code> custom elements globally. You can then use them in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Choose your options&lt;/span&gt;
  &lt;auro-checkbox value="option1" name="default" id="cb1"&gt;Option 1&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="option2" name="default" id="cb2"&gt;Option 2&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation and Implementation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN install & registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<auro-header level="3">Install & Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-checkbox/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-checkbox&gt;</code> and <code>&lt;auro-checkbox-group&gt;</code> custom elements globally. You can then use them in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Choose your options&lt;/span&gt;
  &lt;auro-checkbox value="option1" name="cdn" id="cb-cdn1"&gt;Option 1&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="option2" name="cdn" id="cb-cdn2"&gt;Option 2&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
