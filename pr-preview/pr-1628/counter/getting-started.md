<auro-header level="1" id="overview">Counter: Getting started</auro-header>
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
<auro-anchorlink fluid href="#minimalConfig">Minimal config</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-counter-group</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-group" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">- label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-valueText" class="level2 body-xs">- valueText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-typeIcon" class="level2 body-xs">- typeIcon</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">- bib.fullscreen.headline</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-footer" class="level2 body-xs">- bib.fullscreen.footer</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">- ariaLabel.bib.close</auro-anchorlink>
<auro-anchorlink fluid href="#slotsCounter" class="level2 body-xs">auro-counter</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-counter" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-description" class="level2 body-xs">- description</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText-counter" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-minus" class="level2 body-xs">- ariaLabel.minus</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-plus" class="level2 body-xs">- ariaLabel.plus</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
<auro-anchorlink fluid href="#increment" class="level2 body-xs">increment()</auro-anchorlink>
<auro-anchorlink fluid href="#decrement" class="level2 body-xs">decrement()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
<auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
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
<auro-header level="4">Custom component registration for version management</auro-header>
Every Auro component has two key parts: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

Import only the component class, then call its `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;// Register with a custom name if desired
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');</code></pre>

This creates the custom elements <code>&lt;custom-counter&gt;</code> and <code>&lt;custom-counter-group&gt;</code>, which behave exactly like <code>&lt;auro-counter&gt;</code> and <code>&lt;auro-counter-group&gt;</code>, so both versions can share a page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom.html -->
<pre class="language-html"><code class="language-html">&lt;custom-counter-group&gt;
  &lt;custom-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/custom-counter&gt;
  &lt;custom-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/custom-counter&gt;
&lt;/custom-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
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
Import the component, which also registers its custom elements:

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-counter';</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
Load the counter components from a CDN, with no build step:

<pre class="language-html"><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-counter/+esm" type="module"&gt;&lt;/script&gt;</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-counter&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the components at the top level of your application (for example, in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;AuroCounter.register('[custom]-counter');
AuroCounterGroup.register('[custom]-counter-group');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCounter` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for `<auro-counter>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-counter': React.HTMLAttributes&lt;AuroCounter&gt; &amp; Partial&lt;AuroCounter&gt;;
      '[custom]-counter-group': React.HTMLAttributes&lt;AuroCounterGroup&gt; &amp; Partial&lt;AuroCounterGroup&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`. The counter group fires an `input` event whenever a counter changes:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
&#10;function MyCounterGroup() {
  const groupRef = useRef&lt;HTMLElement&gt;(null);
&#10;  useEffect(() =&gt; {
    const el = groupRef.current;
    if (!el) return;
&#10;    const handleInput = () =&gt; {
      console.log('Counter group value:', (el as any).value);
    };
&#10;    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
&#10;  return (
    &lt;custom-counter-group ref={groupRef}&gt;
      &lt;custom-counter name="adults"&gt;
        Adults
        &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
        &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;/custom-counter&gt;
      &lt;custom-counter name="children"&gt;
        Children
        &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
        &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;/custom-counter&gt;
    &lt;/custom-counter-group&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-counter&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use the elements you registered, such as `<custom-counter-group>`, directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
&lt;/script&gt;
&lt;custom-counter-group&gt;
  &lt;custom-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;/custom-counter&gt;
  &lt;custom-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
  &lt;/custom-counter&gt;
&lt;/custom-counter-group&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-counter>` props in templates, add the following to a `.d.ts` file in your project (for example, `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
&#10;declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-counter': Partial&lt;AuroCounter&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroCounter&gt;;
    '[custom]-counter-group': Partial&lt;AuroCounterGroup&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroCounterGroup&gt;;
  }
}</code></pre>

This enables prop hinting in Svelte templates for attributes such as `value`, `min`, `max`, and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `input` event, which the counter fires whenever its value changes:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let count = $state(0);
&#10;  function handleChange(e: Event) {
    count = (e.target as HTMLElement &amp; { value: number }).value;
  }
&lt;/script&gt;
&lt;custom-counter on:input={handleChange}&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/custom-counter&gt;
&lt;p&gt;Count: {count}&lt;/p&gt;</code></pre>

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
<auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
<p>A standalone <code>&lt;auro-counter&gt;</code> requires a label in the default slot and names for its minus and plus buttons in the <code>ariaLabel.minus</code> and <code>ariaLabel.plus</code> slots:</p>
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<p>For a grouped counter with dropdown, also provide the <code>label</code>, <code>bib.fullscreen.headline</code>, and <code>ariaLabel.bib.close</code> slots on the group:</p>
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="label"&gt;Passengers&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close passenger selector&lt;/span&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-counter-group</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter-group&gt;</code> element.</p>
<auro-header level="4" id="slot-default-group">(default)</auro-header>
<p>The <code>auro-counter</code> elements in the group. Every group needs at least one.</p>
<auro-header level="4" id="slot-label">label</auro-header>
<p>The label shown in the dropdown trigger, such as "Passengers". Applies only when <code>isDropdown</code> is set.</p>
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
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>Extra guidance shown below the dropdown. An error message replaces it while any counter is invalid. Applies only when <code>isDropdown</code> is set.</p>
<auro-header level="4" id="slot-valueText">valueText</auro-header>
<p>Custom text shown in the dropdown trigger in place of the default summary of each counter's value and label. Applies only when <code>isDropdown</code> is set.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-value-text.html -->
<div style="max-width: 350px;">
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="valueText">Custom value text</div>
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
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-value-text.html -->
<pre class="language-html"><code class="language-html">&lt;div style="max-width: 350px;"&gt;
  &lt;auro-counter-group isDropdown&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
    &lt;div slot="valueText"&gt;Custom value text&lt;/div&gt;
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
  &lt;/auro-counter-group&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-typeIcon">typeIcon</auro-header>
<p>An icon shown at the start of the dropdown trigger, such as a person icon for a passenger selector. Applies only when <code>isDropdown</code> is set.</p>
<auro-header level="4" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>The heading shown at the top of the fullscreen dropdown, such as "Passengers". Set it whenever <code>isDropdown</code> is set.</p>
<auro-header level="4" id="slot-bib-fullscreen-footer">bib.fullscreen.footer</auro-header>
<p>Content shown at the bottom of the fullscreen dropdown, such as Reset and Save buttons. Applies only when <code>isDropdown</code> is set.</p>
<auro-header level="4" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Text screen readers announce for the close button in the fullscreen dropdown, such as "Close passenger selector". Defaults to "Close", so set it whenever <code>isDropdown</code> is set.</p>
<auro-header level="3" id="slotsCounter">auro-counter</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter&gt;</code> element.</p>
<auro-header level="4" id="slot-default-counter">(default)</auro-header>
<p>The counter's label, such as "Adults", shown next to the minus and plus buttons. Screen readers read it as the counter's name.</p>
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
<auro-header level="4" id="slot-description">description</auro-header>
<p>Short supporting text shown below the label, such as "18 years or older". Screen readers read it as part of the counter's name.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/description.html) -->
<!-- The below content is automatically added from ./../apiExamples/description.html -->
<auro-counter>
  Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
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
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-helpText-counter">helpText</auro-header>
<p>Extra guidance shown below the counter. An error message replaces it while the counter is invalid.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-helptext.html) -->
<!-- The below content is automatically added from ./../apiExamples/counter-helptext.html -->
<auro-counter>
  Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
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
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;span slot="helpText"&gt;This is help text for the counter&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-ariaLabel-minus">ariaLabel.minus</auro-header>
<p>Text screen readers announce for the minus button, such as "Remove adult". Defaults to "−" (a minus sign), so set it on every counter.</p>
<auro-header level="4" id="slot-ariaLabel-plus">ariaLabel.plus</auro-header>
<p>Text screen readers announce for the plus button, such as "Add adult". Defaults to "+", so set it on every counter.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State management</auro-header>
<p>The following property reflects the current state of the component. Read it from JavaScript.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current validation result of the counter or counter group as a string. Possible values include <code>valid</code>, <code>customError</code>, <code>rangeOverflow</code>, and <code>rangeUnderflow</code>.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available.</p>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the counter or counter group. Pass <code>true</code> to validate even while the element has focus.</p>
<auro-header level="3" id="increment">increment()</auro-header>
<p>Increases the counter's value by 1, or by the number you pass. Does nothing when the counter is disabled or already at its maximum.</p>
<auro-header level="3" id="decrement">decrement()</auro-header>
<p>Decreases the counter's value by 1, or by the number you pass. Does nothing when the counter is disabled or already at its minimum.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Sets the counter, or every counter in a counter group, back to its <code>min</code> value and clears its validation state. A counter with the <code>error</code> attribute stays invalid. <code>&lt;auro-form&gt;</code> also calls <code>reset()</code> when a form is reset. Increment the counters below, then select <strong>Reset</strong>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-counter-group id="resetStateGroup" name="passengers" max="9">
<auro-counter name="adults" min="1" max="9">
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">Age 18+</span>
</auro-counter>
<auro-counter name="children" min="0" max="8">
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">Age 2–17</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&#10;&lt;auro-counter-group id="resetStateGroup" name="passengers" max="9"&gt;
  &lt;auro-counter name="adults" min="1" max="9"&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;Age 18+&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter name="children" min="0" max="8"&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;Age 2–17&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->
<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const group = document.querySelector('#resetStateGroup');
&#10;  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    // Clears every counter in the group back to its min value.
    group.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>Opens a counter group's dropdown if it's closed. Does nothing unless <code>isDropdown</code> is set.</p>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>Closes a counter group's dropdown if it's open. Does nothing unless <code>isDropdown</code> is set.</p>
</section>
</div>
</div>
</div>
