<auro-header level="1" id="overview">Form: Getting started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
<auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal configuration</auro-anchorlink>
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
<span slot="trigger">Recommended installation and implementation</span>
<div class="accordion-content">
<auro-header level="3">Install</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->
<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/auro-formkit</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/customRegistration.md -->
## Custom component registration for version management

Every Auro component has two key parts: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so you can use it in HTML.

To register the component under your own name, import only the component class and call the <code>register(name)</code> method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;// Register with a custom name if desired
AuroForm.register('[custom]-form');</code></pre>

This creates a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, so both can be on the same page without interfering with each other.

### Using custom-named child form elements

When you use custom-named Auro form elements, such as `auro-input` registered as `custom-input`,
register them _before_ `auro-form`, because of the order in which the elements render.
`auro-form` recognizes Auro form elements by their tag name, such as `auro-input`, or by a matching attribute that each custom-named element adds to itself once it's registered and on the page.

For example, the following is correct:

<pre class="language-javascript"><code class="language-javascript">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;AuroInput.register('[custom]-input'); // register child form elements first
AuroForm.register('[custom]-form'); // the form then recognizes each custom-input when it looks for its fields</code></pre>

The following is _not_ correct, and the form doesn't work as expected:

<pre class="language-javascript"><code class="language-javascript">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;AuroForm.register('[custom]-form'); // the form looks for its fields when it first renders
AuroInput.register('[custom]-input'); // too late: the form has already looked and didn't recognize the custom input</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="autoAccordion">
<span slot="trigger">Auto installation and implementation</span>
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
Import the component, which registers the custom element:

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
<span slot="trigger">CDN installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-form/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-form&gt;</code> custom element globally. Then use it in your HTML:</p>

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

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the components at the top level of your application, such as in your root `main.tsx` or `App.tsx`:

<pre class="language-js"><code class="language-js">import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;AuroForm.register('[custom]-form');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroForm` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for `<auro-form>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-form': React.HTMLAttributes&lt;AuroForm&gt; &amp; Partial&lt;AuroForm&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
&#10;function MyForm() {
  const formRef = useRef&lt;HTMLElement&gt;(null);
&#10;  useEffect(() =&gt; {
    const el = formRef.current;
    if (!el) return;
&#10;    const handleSubmit = (e: Event) =&gt; {
      console.log('Form values:', (e as CustomEvent).detail.value);
    };
&#10;    el.addEventListener('submit', handleSubmit);
    return () =&gt; el.removeEventListener('submit', handleSubmit);
  }, []);
&#10;  return (
    &lt;custom-form ref={formRef}&gt;
      {/* Add Auro form elements here */}
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/custom-form&gt;
  );
}</code></pre>

<auro-header level="3" id="reactModuleResolution">Module resolution</auro-header>
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

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;  AuroForm.register('[custom]-form');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use `<auro-form>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;  AuroForm.register('[custom]-form');
&lt;/script&gt;
&lt;custom-form&gt;
  &lt;!-- Add Auro form elements here --&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/custom-form&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-form>` props in templates, add the following to a `.d.ts` file in your project, such as `src/auro-elements.d.ts`:

<pre class="language-js"><code class="language-js">import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';
&#10;declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-form': Partial&lt;AuroForm&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroForm&gt;;
  }
}</code></pre>

This adds autocomplete and type checking for `<auro-form>` properties, such as `value` and `validity`, in Svelte templates.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
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

<auro-header level="3" id="svelteModuleResolution">Module resolution</auro-header>
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
<auro-header level="2" id="minimalConfig">Minimal configuration</auro-header>
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
&#10;  &lt;br /&gt;
&#10;  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="slots">Slots</auro-header>
<p>The <code>default</code> slot accepts Auro form elements, such as <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, and <code>auro-counter-group</code>, as well as any HTML elements for layout and structure.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
<!-- The below content is automatically added from ./../apiExamples/complex.html -->
<auro-form id="bookingForm" class="trip-form">
<!-- Cabin: auro-radio-group -->
<div class="form-section">
<auro-radio-group required name="cabin">
<span slot="legend">Cabin</span>
<auro-radio id="cabin-main" name="cabinChoice" label="Main" value="main" checked></auro-radio>
<auro-radio id="cabin-premium" name="cabinChoice" label="Premium" value="premium"></auro-radio>
<auro-radio id="cabin-first" name="cabinChoice" label="First class" value="first"></auro-radio>
</auro-radio-group>
</div>
<!-- Route: auro-select (from) and auro-combobox (to) -->
<div class="form-section">
<h4 class="section-heading">Where are you going?</h4>
<div class="field-row">
<auro-select required name="departureAirport">
<span slot="label">From</span>
<span slot="bib.fullscreen.headline">Choose a departure city</span>
<span slot="ariaLabel.bib.close">Close</span>
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
<span slot="ariaLabel.input.clear">Clear destination</span>
<span slot="ariaLabel.bib.close">Close</span>
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
<!-- When and who: auro-datepicker (range) and auro-counter-group -->
<div class="form-section">
<h4 class="section-heading">When and who?</h4>
<div class="field-row">
<auro-datepicker required range name="travelDates">
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
<span slot="bib.fullscreen.headline">Choose travel dates</span>
<span slot="ariaLabel.bib.close">Close</span>
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
<!-- Lead traveler: auro-input -->
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
<!-- Extras: auro-checkbox-group -->
<div class="form-section">
<auro-checkbox-group name="extras">
<span slot="legend">Add to your trip</span>
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
<output id="bookingFormOutput" aria-live="polite">Fill in the required fields and submit to see the collected form value. Notice the shapes each field contributes: <code>travelDates</code> as a two-item <code>[departure, return]</code> array, <code>travelers</code> as an object keyed by counter name, <code>extras</code> as an array, and <code>cabin</code> as the selected value.</output>
<style>
          #bookingFormOutput {
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
<pre class="language-html"><code class="language-html">&lt;auro-form id="bookingForm" class="trip-form"&gt;
  &lt;!-- Cabin: auro-radio-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-radio-group required name="cabin"&gt;
      &lt;span slot="legend"&gt;Cabin&lt;/span&gt;
      &lt;auro-radio id="cabin-main" name="cabinChoice" label="Main" value="main" checked&gt;&lt;/auro-radio&gt;
      &lt;auro-radio id="cabin-premium" name="cabinChoice" label="Premium" value="premium"&gt;&lt;/auro-radio&gt;
      &lt;auro-radio id="cabin-first" name="cabinChoice" label="First class" value="first"&gt;&lt;/auro-radio&gt;
    &lt;/auro-radio-group&gt;
  &lt;/div&gt;
&#10;  &lt;!-- Route: auro-select (from) and auro-combobox (to) --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Where are you going?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-select required name="departureAirport"&gt;
        &lt;span slot="label"&gt;From&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Choose a departure city&lt;/span&gt;
        &lt;span slot="ariaLabel.bib.close"&gt;Close&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption value="SEA"&gt;Seattle (SEA)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="PDX"&gt;Portland (PDX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="SFO"&gt;San Francisco (SFO)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="LAX"&gt;Los Angeles (LAX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="ANC"&gt;Anchorage (ANC)&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-select&gt;
&#10;      &lt;auro-combobox required name="destination"&gt;
        &lt;span slot="label"&gt;To&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Search destinations&lt;/span&gt;
        &lt;span slot="ariaLabel.input.clear"&gt;Clear destination&lt;/span&gt;
        &lt;span slot="ariaLabel.bib.close"&gt;Close&lt;/span&gt;
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
&#10;  &lt;!-- When and who: auro-datepicker (range) and auro-counter-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;When and who?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-datepicker required range name="travelDates"&gt;
        &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
        &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Choose travel dates&lt;/span&gt;
        &lt;span slot="ariaLabel.bib.close"&gt;Close&lt;/span&gt;
      &lt;/auro-datepicker&gt;
&#10;      &lt;auro-counter-group isDropdown max="9" name="travelers"&gt;
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
&#10;  &lt;!-- Lead traveler: auro-input --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Lead traveler&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-input id="first-name" name="firstName" required&gt;
        &lt;span slot="label"&gt;First name&lt;/span&gt;
      &lt;/auro-input&gt;
&#10;      &lt;auro-input id="last-name" name="lastName" required&gt;
        &lt;span slot="label"&gt;Last name&lt;/span&gt;
      &lt;/auro-input&gt;
&#10;      &lt;auro-input id="email" name="email" type="email" class="span-2" required&gt;
        &lt;span slot="label"&gt;Email&lt;/span&gt;
        &lt;span slot="helpText"&gt;We'll send your confirmation here.&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&#10;  &lt;!-- Extras: auro-checkbox-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-checkbox-group name="extras"&gt;
      &lt;span slot="legend"&gt;Add to your trip&lt;/span&gt;
      &lt;auro-checkbox id="extra-bags" value="bags"&gt;First checked bag&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-insurance" value="insurance"&gt;Travel insurance&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-lounge" value="lounge"&gt;Alaska Lounge+ day pass&lt;/auro-checkbox&gt;
    &lt;/auro-checkbox-group&gt;
  &lt;/div&gt;
&#10;  &lt;div class="form-actions"&gt;
    &lt;auro-button type="reset" variant="secondary"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Search flights&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;
&#10;&lt;output id="bookingFormOutput" aria-live="polite"&gt;Fill in the required fields and submit to see the collected form value. Notice the shapes each field contributes: &lt;code&gt;travelDates&lt;/code&gt; as a two-item &lt;code&gt;[departure, return]&lt;/code&gt; array, &lt;code&gt;travelers&lt;/code&gt; as an object keyed by counter name, &lt;code&gt;extras&lt;/code&gt; as an array, and &lt;code&gt;cabin&lt;/code&gt; as the selected value.&lt;/output&gt;
&#10;&lt;style&gt;
  #bookingFormOutput {
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
&#10;  .trip-form {
    display: block;
    padding: 1.5rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
&#10;  .trip-form .form-section {
    margin-top: 1.5rem;
  }
&#10;  .trip-form .form-section:first-of-type {
    margin-top: 0;
  }
&#10;  .trip-form .section-heading {
    margin: 0 0 0.75rem;
  }
&#10;  .trip-form .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }
&#10;  .trip-form .field-row + .field-row {
    margin-top: 1rem;
  }
&#10;  .trip-form .span-2 {
    grid-column: span 2;
  }
&#10;  @media (max-width: 660px) {
    .trip-form .field-row {
      grid-template-columns: 1fr;
    }
&#10;    .trip-form .span-2 {
      grid-column: span 1;
    }
  }
&#10;  .trip-form .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.js -->
<pre class="language-js"><code class="language-js">/* eslint-disable jsdoc/require-jsdoc */
&#10;/**
 * Displays the collected value of the complex booking form on submit, mirroring
 * the Disabled Fields example. Every field in this form — including the cabin
 * radio group — is collected into `form.value` automatically by `auro-form`; no
 * per-field wiring is needed.
 */
export async function complexExample() {
  await customElements.whenDefined('auro-form');
&#10;  const form = document.querySelector('#bookingForm');
  if (!form) {
    throw new Error('complexExample: #bookingForm not yet rendered');
  }
&#10;  const output = document.querySelector('#bookingFormOutput');
  if (!output) {
    throw new Error('complexExample: #bookingFormOutput not yet rendered');
  }
&#10;  await form.updateComplete;
&#10;  form.addEventListener('submit', (event) =&gt; {
    output.textContent = JSON.stringify(event.detail.value, null, 2);
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="functions">Functions</auro-header>
<auro-header level="3" id="fnSubmit">submit()</auro-header>
<p>Validates every enabled form element and, when none is invalid or required but empty, fires a <code>submit</code> event with the form's current values in <code>detail.value</code>. Otherwise, each invalid field shows its error and the <code>submit</code> event doesn't fire.</p>
<auro-header level="3" id="fnReset">reset()</auro-header>
<p>Resets every tracked form element by calling its own <code>reset()</code>, then fires a <code>reset</code> event with the form's values from just before the reset in <code>detail.previousValue</code>. Each element decides what resetting means: for example, <code>auro-input</code> clears its value instead of restoring the one it started with.</p>
</section>
</div>
</div>
</div>
