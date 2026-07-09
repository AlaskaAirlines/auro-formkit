<auro-header level="1" id="overview">Datepicker - Getting Started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
<auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slot-fromLabel" class="level2 body-xs">fromLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-toLabel" class="level2 body-xs">toLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-input-clear" class="level2 body-xs">ariaLabel.input.clear</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">ariaLabel.bib.close</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">bib.fullscreen.headline</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-fromLabel" class="level2 body-xs">bib.fullscreen.fromLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-toLabel" class="level2 body-xs">bib.fullscreen.toLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-date" class="level2 body-xs">date_YYYY_MM_DD</auro-anchorlink>
<auro-anchorlink fluid href="#slot-popover" class="level2 body-xs">popover_YYYY_MM_DD</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
<auro-anchorlink fluid href="#valueEnd" class="level2 body-xs">ValueEnd</auro-anchorlink>
<auro-anchorlink fluid href="#values" class="level2 body-xs">Values</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
<auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/customRegistration.md -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- The below content is automatically added from ./../../../docs/partials/customRegistrationDescription.md -->
<p>Every Auro component consists of a JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define">custom element registration</a>. The class defines the component's behavior, and the registration maps it to an HTML tag name so it can be used in markup.</p>
<p>The default import (shown above) handles both steps automatically, registering the component under its standard tag name.</p>
<p>If you need multiple versions of the same component on a single page — for example, when two projects depend on different versions — you can register the class under a custom tag name to avoid conflicts.</p>
<p>To do this, import the component class directly and call its <code>register(name)</code> method with a unique name:</p>
<!-- AURO-GENERATED-CONTENT:END -->

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroDatepicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
// Register with a custom name if desired
AuroDatepicker.register('custom-datepicker');</code></pre>

This will create a new custom element `<custom-datepicker>` that behaves exactly like `<auro-datepicker>`, allowing both to coexist on the same page without interfering with each other.

<pre class="language-html"><code class="language-html">&lt;custom-datepicker&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;custom-datepicker Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.dateLabel"&gt;Choose a date&lt;/span&gt;
&lt;/custom-datepicker&gt;</code></pre>
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
<p>Once installed, the component can be used in your project by importing the component's registered module:</p>

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-datepicker';</code></pre>
<p>This import registers the <code>&lt;auro-datepicker&gt;</code> custom element globally. You can then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-datepicker/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-datepicker&gt;</code> custom element globally. You can then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/frameworks.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/frameworks.md -->
<auro-header level="2" id="frameworks">Frameworks</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion class="section" id="react">
<span slot="trigger">React</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/react.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/react.md -->
React 19 includes <auro-hyperlink href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</auro-hyperlink>, so <code>&lt;auro-datepicker&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the component at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
AuroDatePicker.register('[custom]-datepicker');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroDatePicker` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for <code>&lt;auro-datepicker&gt;</code> in JSX, add the following declaration to a <code>.d.ts</code> file in your project:

<pre class="language-js"><code class="language-js">import type { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-datepicker': React.HTMLAttributes&lt;AuroDatePicker&gt; &amp; Partial&lt;AuroDatePicker&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native <code>CustomEvent</code>s. Use a <code>ref</code> to attach event listeners in a <code>useEffect</code>:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyDatePicker() {
  const datepickerRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = datepickerRef.current;
    if (!el) return;
​
    const handleInput = (event: Event) =&gt; {
      console.log('Selected date:', (event as CustomEvent&lt;string&gt;).detail);
    };
​
    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
​
  return (
    &lt;custom-datepicker ref={datepickerRef}&gt;
      &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
    &lt;/custom-datepicker&gt;
  );
}</code></pre>

<auro-header level="3" id="reactModuleResolution">Module Resolution</auro-header>
Ensure your <code>tsconfig.json</code> uses <code>"moduleResolution": "bundler"</code> so TypeScript can resolve the component's package exports:

<pre class="language-js"><code class="language-js">{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="svelte">
<span slot="trigger">Svelte</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/svelte.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/svelte.md -->
Svelte has <auro-hyperlink href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</auro-hyperlink>, so <code>&lt;auro-datepicker&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the component in the <code>&lt;script&gt;</code> block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
  AuroDatePicker.register('[custom]-datepicker');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-datepicker>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
  AuroDatePicker.register('[custom]-datepicker');
​
  let datepickerValue = $state&lt;string&gt;('');
&lt;/script&gt;
&lt;custom-datepicker value={datepickerValue}&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/custom-datepicker&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for <code>&lt;auro-datepicker&gt;</code> props in templates, add the following to a <code>.d.ts</code> file in your project (e.g. <code>src/auro-elements.d.ts</code>):

<pre class="language-js"><code class="language-js">import type { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-datepicker': Partial&lt;AuroDatePicker&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroDatePicker&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like <code>value</code>, <code>range</code>, <code>disabled</code>, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
​
  function handleInput(e: Event) {
    value = (e as CustomEvent&lt;string&gt;).detail;
  }
&lt;/script&gt;
&lt;custom-datepicker oninput={handleInput}&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/custom-datepicker&gt;
&lt;p&gt;Selected: {value}&lt;/p&gt;</code></pre>

<auro-header level="3" id="svelteModuleResolution">Module Resolution</auro-header>
Ensure your <code>tsconfig.json</code> uses <code>"moduleResolution": "bundler"</code> so TypeScript can resolve the component's package exports:

<pre class="language-js"><code class="language-js">{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/minimal-config.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/minimal-config.md -->
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>Every <code>&lt;auro-datepicker&gt;</code> implementation requires the following:</p>
<ul>
<li><strong>A label in the `fromLabel` slot</strong> — Provides an accessible label for the date input.</li>
<li><strong>A `bib.fullscreen.headline` slot</strong> — Provides a headline for the fullscreen (mobile) calendar view.</li>
<li><strong>A `bib.fullscreen.fromLabel` slot</strong> — Provides a label for the date input in the fullscreen view.</li>
</ul>
<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<p>When using the `range` attribute, also provide `toLabel` and `bib.fullscreen.toLabel`:/<p>
<pre class="language-html"><code class="language-html">&lt;auro-datepicker range&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Dates&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<p>The following slots are available on the <code>&lt;auro-datepicker&gt;</code> element.</p>
<auro-header level="3" id="slot-fromLabel">fromLabel</auro-header>
<p>Defines the label content for the first (or only) date input.</p>
<auro-header level="3" id="slot-toLabel">toLabel</auro-header>
<p>Defines the label content for the second date input when the <code>range</code> attribute is used.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Defines the label content for the entire datepicker when <code>layout="snowflake"</code>.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Defines the content of the help text displayed below the datepicker.</p>
<auro-header level="3" id="slot-ariaLabel-input-clear">ariaLabel.input.clear</auro-header>
<p>Sets <code>aria-label</code> on the clear button.</p>
<auro-header level="3" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Sets <code>aria-label</code> on the close button in the fullscreen bib.</p>
<auro-header level="3" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>Defines the headline to display above the date labels in the fullscreen (mobile) layout.</p>
<auro-header level="3" id="slot-bib-fullscreen-fromLabel">bib.fullscreen.fromLabel</auro-header>
<p>Defines the content to display above the first date input in the fullscreen (mobile) layout.</p>
<auro-header level="3" id="slot-bib-fullscreen-toLabel">bib.fullscreen.toLabel</auro-header>
<p>Defines the content to display above the second date input in the fullscreen (mobile) layout when <code>range</code> is true.</p>
<auro-header level="3" id="slot-date">date_YYYY_MM_DD</auro-header>
<p>Defines the content to display in the <code>auro-calendar-cell</code> for the specified date. The date format in the slot name should match <code_YYYY>MM_DD</code> (e.g. <code>slot="date_2026_01_15"</code>). Colored using the success state token when the <code>highlight</code> attribute is applied.</p>
<auro-header level="3" id="slot-popover">popover_YYYY_MM_DD</auro-header>
<p>Defines the content to display in the <code>auro-calendar-cell</code> popover for the specified date. The date format in the slot name should match <code>YYYY_MM_DD</code> (e.g. <code>slot="popover_2026_01_15"</code>).</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, <code>"badInput"</code>, <code>"rangeOverflow"</code>, <code>"rangeUnderflow"</code>, and <code>"customError"</code>.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the selected date value as a string in <code>MM/DD/YYYY</code> format. When <code>range</code> is set, this represents the start date.</p>
<auro-header level="3" id="valueEnd">valueEnd</auro-header>
<p>Gets or sets the end date value when <code>range</code> is set. Uses the same <code>MM/DD/YYYY</code> format.</p>
<auro-header level="3" id="values">values</auro-header>
<p>A convenience read-only property for use when <code>range</code> is implemented that returns both <code>value</code> and <code>valueEnd</code> as an array.</p>
<ul>
<li>When <code>range</code> is set and both dates are selected, returns <code>[value, valueEnd]</code>.</li>
<li>When only <code>value</code> is set (range not complete or not enabled), returns <code>[value]</code>.</li>
<li>When no value is set, returns an empty array <code>[]</code>.</li>
</ul>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-datepicker&gt;</code> element.</p>
<auro-header level="3" id="focus">focus()</auro-header>
<p>Programmatically moves focus to the datepicker trigger input.</p>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>Programmatically hides the dropdown bib (calendar) if it is currently open.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the component to its initial state, clearing the selected date(s) and validation state.</p>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>Programmatically shows the dropdown bib (calendar) if it is not already open.</p>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
</section>
</div>
</div>
</div>
