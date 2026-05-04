<auro-header level="1" id="overview">Checkbox - Getting Started</auro-header>
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
<auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-checkbox-group</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-group" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-legend" class="level2 body-xs">- legend</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">- optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slotsCheckbox" class="level2 body-xs">auro-checkbox</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-checkbox" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/install.md) -->
<!-- The below content is automatically added from ./../docs/pages/install.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>Every <code>&lt;auro-checkbox-group&gt;</code> implementation requires:</p>
<ol>
<li><strong>A legend in the <code>legend</code> slot</strong> — Provides an accessible label for the checkbox group.</li>
<li><strong>One or more <code>&lt;auro-checkbox&gt;</code> elements</strong> — Each with a unique <code>value</code> and <code>name</code> attribute.</li>
</ol>

<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="option1" name="example" id="cb-ex1"&gt;Option 1&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="option2" name="example" id="cb-ex2"&gt;Option 2&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-checkbox-group</auro-header>
<auro-header level="4" id="slot-default-group">(default)</auro-header>
<p>Default slot for the checkbox items. Place <code>&lt;auro-checkbox&gt;</code> elements here.</p>
<auro-header level="4" id="slot-legend">legend</auro-header>
<p>Defines the content of the legend label for the checkbox group.</p>
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>Defines the content of the help text displayed below the checkbox group.</p>
<auro-header level="4" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Allows overriding the optional display text <code>"(optional)"</code>, which appears next to the legend.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
<!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<span slot="optionalLabel" style="font-size: small; color: grey"> - optional</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;span slot="optionalLabel" style="font-size: small; color: grey"&gt; - optional&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="slotsCheckbox">auro-checkbox</auro-header>
<auro-header level="3" id="slot-default-checkbox">(default)</auro-header>
<p>Default slot for the checkbox label text. The content placed inside each <code>&lt;auro-checkbox&gt;</code> element becomes the visible label rendered next to the checkbox input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the checkbox group as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-checkbox-group&gt;</code> element.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the checkbox group to its initial state, clearing all checked values and validation state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="resetState" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
<auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="resetState" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="resetState" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="resetState" id="checkbox-basic3"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="resetState" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->
<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');
​
  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    elem.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the checkbox group. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
</section>
</div>
</div>
</div>
