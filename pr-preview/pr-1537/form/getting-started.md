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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/customRegistration.md -->

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
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
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
<auro-form id="tripForm" class="trip-form">
<!-- Trip type — auro-radio-group -->
<div class="form-section">
<auro-radio-group required name="tripType">
<span slot="legend">Trip type</span>
<auro-radio id="trip-roundtrip" name="tripTypeChoice" label="Round trip" value="roundtrip" checked></auro-radio>
<auro-radio id="trip-oneway" name="tripTypeChoice" label="One way" value="oneway"></auro-radio>
</auro-radio-group>
</div>
<!-- Route — auro-select (from) + auro-combobox (to) -->
<div class="form-section">
<h4 class="section-heading">Where are you going?</h4>
<div class="field-row">
<auro-select required name="departureAirport">
<span slot="label">From</span>
<span slot="bib.fullscreen.headline">Choose a departure city</span>
<auro-menu>
<auro-menuoption value="SEA">Seattle (SEA)</auro-menuoption>
<auro-menuoption value="PDX">Portland (PDX)</auro-menuoption>
<auro-menuoption value="SFO">San Francisco (SFO)</auro-menuoption>
<auro-menuoption value="LAX">Los Angeles (LAX)</auro-menuoption>
<auro-menuoption value="ANC">Anchorage (ANC)</auro-menuoption>
</auro-menu>
</auro-select>
<auro-combobox required name="destination">
<span slot="label">To</span>
<span slot="bib.fullscreen.headline">Search destinations</span>
<auro-menu>
<auro-menuoption value="HNL">Honolulu (HNL)</auro-menuoption>
<auro-menuoption value="OGG">Maui (OGG)</auro-menuoption>
<auro-menuoption value="JFK">New York (JFK)</auro-menuoption>
<auro-menuoption value="ORD">Chicago (ORD)</auro-menuoption>
<auro-menuoption value="DFW">Dallas–Fort Worth (DFW)</auro-menuoption>
<auro-menuoption static nomatch>No matching destinations</auro-menuoption>
</auro-menu>
</auro-combobox>
</div>
</div>
<!-- When & who — auro-datepicker (range) + auro-counter-group -->
<div class="form-section">
<h4 class="section-heading">When and who?</h4>
<div class="field-row">
<auro-datepicker required range name="travelDates">
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<auro-counter-group isDropdown max="9" name="travelers">
<div slot="label">Travelers</div>
<span slot="bib.fullscreen.headline">Travelers</span>
<span slot="ariaLabel.bib.close">Close</span>
<auro-counter name="adults" min="1" max="9" value="1">
                  Adults
<span slot="description">Age 18+</span>
</auro-counter>
<auro-counter name="children" min="0" max="8" value="0">
                  Children
<span slot="description">Age 2–17</span>
</auro-counter>
<auro-counter name="infants" min="0" max="4" value="0">
                  Lap infants
<span slot="description">Under 2</span>
</auro-counter>
</auro-counter-group>
</div>
</div>
<!-- Lead traveler — auro-input -->
<div class="form-section">
<h4 class="section-heading">Lead traveler</h4>
<div class="field-row">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First name</span>
</auro-input>
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last name</span>
</auro-input>
<auro-input id="email" name="email" type="email" class="span-2" required>
<span slot="label">Email</span>
<span slot="helpText">We'll send your confirmation here.</span>
</auro-input>
</div>
</div>
<!-- Extras — auro-checkbox-group -->
<div class="form-section">
<auro-checkbox-group name="extras">
<span slot="legend">Add to your trip (optional)</span>
<auro-checkbox id="extra-bags" value="bags">First checked bag</auro-checkbox>
<auro-checkbox id="extra-insurance" value="insurance">Travel insurance</auro-checkbox>
<auro-checkbox id="extra-lounge" value="lounge">Alaska Lounge+ day pass</auro-checkbox>
</auro-checkbox-group>
</div>
<div class="form-actions">
<auro-button type="reset" variant="secondary">Reset</auro-button>
<auro-button type="submit">Search flights</auro-button>
</div>
</auro-form>
<output id="tripFormOutput" aria-live="polite">Fill in the required fields and submit to see the collected form value. Notice how <code>travelDates</code> is a two-item array for a round trip and a single string for one way, and how the optional <code>extras</code> come through as an array.</output>
<style>
          #tripFormOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }

          .trip-form {
            display: block;
            padding: 1.5rem;
            border: 1px solid #2a2a2a;
            border-radius: 1rem;
          }

          .trip-form .form-section {
            margin-top: 1.5rem;
          }

          .trip-form .form-section:first-of-type {
            margin-top: 0;
          }

          .trip-form .section-heading {
            margin: 0 0 0.75rem;
          }

          .trip-form .field-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            align-items: start;
          }

          .trip-form .field-row + .field-row {
            margin-top: 1rem;
          }

          .trip-form .span-2 {
            grid-column: span 2;
          }

          @media (max-width: 660px) {
            .trip-form .field-row {
              grid-template-columns: 1fr;
            }

            .trip-form .span-2 {
              grid-column: span 1;
            }
          }

          .trip-form .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="tripForm" class="trip-form"&gt;
  &lt;!-- Trip type — auro-radio-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-radio-group required name="tripType"&gt;
      &lt;span slot="legend"&gt;Trip type&lt;/span&gt;
      &lt;auro-radio id="trip-roundtrip" name="tripTypeChoice" label="Round trip" value="roundtrip" checked&gt;&lt;/auro-radio&gt;
      &lt;auro-radio id="trip-oneway" name="tripTypeChoice" label="One way" value="oneway"&gt;&lt;/auro-radio&gt;
    &lt;/auro-radio-group&gt;
  &lt;/div&gt;
  &lt;!-- Route — auro-select (from) + auro-combobox (to) --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Where are you going?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-select required name="departureAirport"&gt;
        &lt;span slot="label"&gt;From&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Choose a departure city&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption value="SEA"&gt;Seattle (SEA)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="PDX"&gt;Portland (PDX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="SFO"&gt;San Francisco (SFO)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="LAX"&gt;Los Angeles (LAX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="ANC"&gt;Anchorage (ANC)&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-select&gt;
      &lt;auro-combobox required name="destination"&gt;
        &lt;span slot="label"&gt;To&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Search destinations&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption value="HNL"&gt;Honolulu (HNL)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="OGG"&gt;Maui (OGG)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="JFK"&gt;New York (JFK)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="ORD"&gt;Chicago (ORD)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="DFW"&gt;Dallas–Fort Worth (DFW)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption static nomatch&gt;No matching destinations&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-combobox&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- When &amp; who — auro-datepicker (range) + auro-counter-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;When and who?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-datepicker required range name="travelDates"&gt;
        &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
        &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
      &lt;/auro-datepicker&gt;
      &lt;auro-counter-group isDropdown max="9" name="travelers"&gt;
        &lt;div slot="label"&gt;Travelers&lt;/div&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Travelers&lt;/span&gt;
        &lt;span slot="ariaLabel.bib.close"&gt;Close&lt;/span&gt;
        &lt;auro-counter name="adults" min="1" max="9" value="1"&gt;
          Adults
          &lt;span slot="description"&gt;Age 18+&lt;/span&gt;
        &lt;/auro-counter&gt;
        &lt;auro-counter name="children" min="0" max="8" value="0"&gt;
          Children
          &lt;span slot="description"&gt;Age 2–17&lt;/span&gt;
        &lt;/auro-counter&gt;
        &lt;auro-counter name="infants" min="0" max="4" value="0"&gt;
          Lap infants
          &lt;span slot="description"&gt;Under 2&lt;/span&gt;
        &lt;/auro-counter&gt;
      &lt;/auro-counter-group&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Lead traveler — auro-input --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Lead traveler&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-input id="first-name" name="firstName" required&gt;
        &lt;span slot="label"&gt;First name&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="last-name" name="lastName" required&gt;
        &lt;span slot="label"&gt;Last name&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="email" name="email" type="email" class="span-2" required&gt;
        &lt;span slot="label"&gt;Email&lt;/span&gt;
        &lt;span slot="helpText"&gt;We'll send your confirmation here.&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Extras — auro-checkbox-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-checkbox-group name="extras"&gt;
      &lt;span slot="legend"&gt;Add to your trip (optional)&lt;/span&gt;
      &lt;auro-checkbox id="extra-bags" value="bags"&gt;First checked bag&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-insurance" value="insurance"&gt;Travel insurance&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-lounge" value="lounge"&gt;Alaska Lounge+ day pass&lt;/auro-checkbox&gt;
    &lt;/auro-checkbox-group&gt;
  &lt;/div&gt;
  &lt;div class="form-actions"&gt;
    &lt;auro-button type="reset" variant="secondary"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Search flights&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;
&lt;output id="tripFormOutput" aria-live="polite"&gt;Fill in the required fields and submit to see the collected form value. Notice how &lt;code&gt;travelDates&lt;/code&gt; is a two-item array for a round trip and a single string for one way, and how the optional &lt;code&gt;extras&lt;/code&gt; come through as an array.&lt;/output&gt;
&lt;style&gt;
  #tripFormOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
​
  .trip-form {
    display: block;
    padding: 1.5rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
​
  .trip-form .form-section {
    margin-top: 1.5rem;
  }
​
  .trip-form .form-section:first-of-type {
    margin-top: 0;
  }
​
  .trip-form .section-heading {
    margin: 0 0 0.75rem;
  }
​
  .trip-form .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }
​
  .trip-form .field-row + .field-row {
    margin-top: 1rem;
  }
​
  .trip-form .span-2 {
    grid-column: span 2;
  }
​
  @media (max-width: 660px) {
    .trip-form .field-row {
      grid-template-columns: 1fr;
    }
​
    .trip-form .span-2 {
      grid-column: span 1;
    }
  }
​
  .trip-form .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
&lt;/style&gt;</code></pre>
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
