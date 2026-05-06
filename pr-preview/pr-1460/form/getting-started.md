<auro-header level="1" id="overview">Form - Getting Started</auro-header>
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
<auro-anchorlink fluid href="#minimalConfig">Minimal Configuration</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#fnSubmit" class="level2 body-xs">submit()</auro-anchorlink>
<auro-anchorlink fluid href="#fnReset" class="level2 body-xs">reset()</auro-anchorlink>
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

## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the <code>register(name)</code> method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
// Register with a custom name if desired
AuroForm.register('[custom]-form');</code></pre>

This will create a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, allowing both to coexist on the same page without interfering with each other.

### Using Custom-Named Child Form Elements

When consuming custom-named Auro form elements (like `auro-input` registered as `custom-input`),
these elements _must_ be registered BEFORE auro-form due to rendering order limitations.
Auro form elements are automatically recognized based on their tag name (e.g. `auro-input`) or special auro attributes which are only assigned during the initial render.

For example, the following is correct:

<pre class="language-javascript"><code class="language-javascript">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
AuroInput.register('[custom]-input'); // adds an internal identifier auro-form uses to recognize the custom element
AuroForm.register('[custom]-form'); // render looks for said identifier</code></pre>

The following is NOT correct and will result in forms not working as expected:

<pre class="language-javascript"><code class="language-javascript">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
AuroForm.register('[custom]-form'); // forms start rendering, looking for auro inputs, or custom-named inputs
AuroInput.register('[custom]-input'); // too late, form has already rendered and did not find the custom element</code></pre>
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
Import the component, then register the custom element:

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-form';</code></pre>

Then use the element in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-form&gt;
  &lt;auro-input name="searchBox" required&gt;
    &lt;span slot="label"&gt;Search flights&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-form/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-form&gt;</code> custom element globally. You can then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-form&gt;
  &lt;auro-input name="searchBox" required&gt;
    &lt;span slot="label"&gt;Search flights&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-form&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
AuroForm.register('[custom]-form');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroForm` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-form>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-form': React.HTMLAttributes&lt;AuroForm&gt; &amp; Partial&lt;AuroForm&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyForm() {
  const formRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = formRef.current;
    if (!el) return;
​
    const handleSubmit = (e: Event) =&gt; {
      console.log('Form values:', (e as CustomEvent).detail.value);
    };
​
    el.addEventListener('submit', handleSubmit);
    return () =&gt; el.removeEventListener('submit', handleSubmit);
  }, []);
​
  return (
    &lt;custom-form ref={formRef}&gt;
      {/* Add Auro form elements here */}
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/custom-form&gt;
  );
}</code></pre>

<auro-header level="3" id="reactModuleResolution">Module Resolution</auro-header>
Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-form&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
  AuroForm.register('[custom]-form');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-form>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
  AuroForm.register('[custom]-form');
&lt;/script&gt;
&lt;custom-form&gt;
  &lt;!-- Add Auro form elements here --&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/custom-form&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-form>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-form': Partial&lt;AuroForm&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroForm&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `disabled` and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `submit` and `reset` events on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  function handleSubmit(e: Event) {
    console.log('Form values:', (e as CustomEvent).detail.value);
  }
&lt;/script&gt;
&lt;custom-form on:submit={handleSubmit}&gt;
  &lt;!-- Add Auro form elements here --&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/custom-form&gt;</code></pre>

<auro-header level="3" id="svelteModuleResolution">Module Resolution</auro-header>
Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

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
<auro-header level="2" id="minimalConfig">Minimal Configuration</auro-header>
<p>The most basic use of <code>auro-form</code> requires one or more named Auro form elements inside the form. Add a button with <code>type="submit"</code> to trigger form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-form>
<auro-input id="search-box" name="searchBox" required>
<span slot="label">Search flights</span>
</auro-input>
<br />
<auro-button type="submit">Submit</auro-button>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form&gt;
  &lt;auro-input id="search-box" name="searchBox" required&gt;
    &lt;span slot="label"&gt;Search flights&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="slots">Slots</auro-header>
<p>The <code>default</code> slot accepts any Auro form elements (e.g., <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, <code>auro-counter-group</code>) as well as any HTML elements for layout and structure.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
<!-- The below content is automatically added from ./../apiExamples/complex.html -->
<style>
.submitBlock {
margin-top: 1rem;
display: flex;
justify-content: flex-end;
gap: 1rem;
}
.datepickerBlock {
margin-top: 1rem;
}
.complex-form {
display: block;
padding: 1rem;
border: 1px solid #2a2a2a;
border-radius: 1rem;
}
</style>
<auro-form class="complex-form">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<br />
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<br />
<auro-input id="occupation" name="occupation" required>
<span slot="label">Occupation</span>
</auro-input>
<br />
<auro-input-two id="cool-fact" name="coolFact" required>
<span slot="label">Cool Fact</span>
</auro-input-two>
<div class="datepickerBlock">
<h4>Pick a cool date</h4>
<auro-datepicker id="date-example" name="dateExample" required>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
</div>
<div class="datepickerBlock">
<h4>Pick a date range</h4>
<auro-datepicker id="date-range" name="dateRange" required range>
<span slot="fromLabel">Start</span>
<span slot="toLabel">End</span>
<span slot="bib.fullscreen.fromLabel">Start</span>
<span slot="bib.fullscreen.toLabel">End</span>
</auro-datepicker>
</div>
<div class="submitBlock">
<auro-button type="reset">Reset</auro-button>
<auro-button type="submit">Submit</auro-button>
</div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  .datepickerBlock {
    margin-top: 1rem;
  }
  .complex-form {
    display: block;
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
&lt;/style&gt;
&lt;auro-form class="complex-form"&gt;
  &lt;auro-input id="first-name" name="firstName" required&gt;
    &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="last-name" name="lastName" required&gt;
    &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="occupation" name="occupation" required&gt;
    &lt;span slot="label"&gt;Occupation&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input-two id="cool-fact" name="coolFact" required&gt;
    &lt;span slot="label"&gt;Cool Fact&lt;/span&gt;
  &lt;/auro-input-two&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a cool date&lt;/h4&gt;
    &lt;auro-datepicker id="date-example" name="dateExample" required&gt;
      &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a date range&lt;/h4&gt;
    &lt;auro-datepicker id="date-range" name="dateRange" required range&gt;
      &lt;span slot="fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="toLabel"&gt;End&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="bib.fullscreen.toLabel"&gt;End&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="submitBlock"&gt;
    &lt;auro-button type="reset"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="functions">Functions</auro-header>
<auro-header level="3" id="fnSubmit">submit()</auro-header>
<p>Validates all form elements. If all are valid, fires a <code>submit</code> event with <code>detail.value</code> containing the current form values. If any element is invalid, its error state is surfaced and the <code>submit</code> event is not fired.</p>
<auro-header level="3" id="fnReset">reset()</auro-header>
<p>Resets all form elements to their initial state and fires a <code>reset</code> event. The event's <code>detail.previousValue</code> contains the form values captured immediately before the reset.</p>
</section>
</div>
</div>
</div>
