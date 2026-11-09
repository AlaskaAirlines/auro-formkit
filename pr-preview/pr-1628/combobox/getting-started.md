<auro-header level="1" id="overview">Combobox: Getting started</auro-header>
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
<auro-anchorlink fluid href="#slot-default" class="level2 body-xs">(default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-input-clear" class="level2 body-xs">ariaLabel.input.clear</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">ariaLabel.bib.close</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">bib.fullscreen.headline</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
<auro-anchorlink fluid href="#inputValue" class="level2 body-xs">inputValue</auro-anchorlink>
<auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
<auro-anchorlink fluid href="#typedValue" class="level2 body-xs">typedValue</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
<auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
<auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
<auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- The below content is automatically added from ./../../../docs/partials/customRegistrationDescription.md -->
<p>Every Auro component consists of a JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define">custom element registration</a>. The class defines the component's behavior, and the registration maps it to an HTML tag name so it can be used in markup.</p>
<p>The default import (shown above) handles both steps automatically, registering the component under its standard tag name.</p>
<p>To use more than one version of the same component on a page, such as when two projects depend on different versions, register the class under a custom tag name to avoid conflicts.</p>
<p>To do this, import the component class directly and call its <code>register(name)</code> method with a unique name:</p>
<!-- AURO-GENERATED-CONTENT:END -->

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
&#10;// Register with a custom name if desired
AuroCombobox.register('custom-combobox');</code></pre>

This creates a new custom element, `<custom-combobox>`, that behaves exactly like `<auro-combobox>`, so both can coexist on the same page without interfering with each other.

<pre class="language-html"><code class="language-html">&lt;custom-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/custom-combobox&gt;</code></pre>
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
<p>After installing, import the component's registered module:</p>

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-combobox';</code></pre>
<p>This import registers the <code>&lt;auro-combobox&gt;</code> custom element globally. Then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose an option&lt;/span&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-combobox/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-combobox&gt;</code> custom element globally. Then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose an option&lt;/span&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so the combobox works directly in JSX without any wrapper library. The examples below register it under a custom tag name, such as <code>&lt;custom-combobox&gt;</code>, and use that tag.

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the components at the top level of your application (for example, in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;AuroCombobox.register('[custom]-combobox');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCombobox` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for the combobox in JSX, add the following declaration to a `.d.ts` file in your project, replacing `[custom]` with the prefix you registered:

<pre class="language-js"><code class="language-js">import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-combobox': React.HTMLAttributes&lt;AuroCombobox&gt; &amp; Partial&lt;AuroCombobox&gt;;
      '[custom]-menu': React.HTMLAttributes&lt;AuroMenu&gt; &amp; Partial&lt;AuroMenu&gt;;
      '[custom]-menuoption': React.HTMLAttributes&lt;AuroMenuOption&gt; &amp; Partial&lt;AuroMenuOption&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
&#10;const options = [
  { id: 'opt-1', value: 'SEA', label: 'Seattle-Tacoma International' },
  { id: 'opt-2', value: 'LAX', label: 'Los Angeles International' },
  { id: 'opt-3', value: 'JFK', label: 'John F. Kennedy International' },
  { id: 'opt-4', value: 'ORD', label: "O'Hare International" },
];
&#10;function MyCombobox() {
  const comboboxRef = useRef&lt;HTMLElement&gt;(null);
&#10;  useEffect(() =&gt; {
    const el = comboboxRef.current;
    if (!el) return;
&#10;    const handleInput = () =&gt; {
      console.log('Selected value:', (el as any).value);
    };
&#10;    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
&#10;  return (
    &lt;custom-combobox ref={comboboxRef}&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Search airports&lt;/span&gt;
      &lt;span slot="label"&gt;Search airports&lt;/span&gt;
      &lt;span slot="ariaLabel.input.clear"&gt;Clear airport&lt;/span&gt;
      &lt;custom-menu&gt;
        {options.map(({ id, value, label }) =&gt; (
          &lt;custom-menuoption key={id} value={value}&gt;{label}&lt;/custom-menuoption&gt;
        ))}
        &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
      &lt;/custom-menu&gt;
    &lt;/custom-combobox&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so the combobox works directly in Svelte templates without any wrapper or configuration. The examples below register it under a custom tag name, such as <code>&lt;custom-combobox&gt;</code>, and use that tag.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use the combobox directly in your Svelte template, under the tag name you registered. Bind properties with standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&#10;  const options: [string, string][] = [
    ['SEA', 'Seattle-Tacoma International'],
    ['LAX', 'Los Angeles International'],
    ['JFK', 'John F. Kennedy International'],
  ];
&#10;  let comboboxValue = $state&lt;string&gt;('');
&lt;/script&gt;
&lt;custom-combobox value={comboboxValue}&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Search airports&lt;/span&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear airport&lt;/span&gt;
  &lt;custom-menu&gt;
    {#each options as [value, label]}
      &lt;custom-menuoption {value}&gt;{label}&lt;/custom-menuoption&gt;
    {/each}
    &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-combobox&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for the combobox's props in templates, add the following to a `.d.ts` file in your project (such as `src/auro-elements.d.ts`), replacing `[custom]` with the prefix you registered:

<pre class="language-js"><code class="language-js">import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-combobox': Partial&lt;AuroCombobox&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroCombobox&gt;;
    '[custom]-menu': Partial&lt;AuroMenu&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenu&gt;;
    '[custom]-menuoption': Partial&lt;AuroMenuOption&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenuOption&gt;;
  }
}</code></pre>

This turns on prop hints in Svelte templates for attributes such as `value` and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
&#10;  function handleInput(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-combobox oninput={handleInput}&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Search airports&lt;/span&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear airport&lt;/span&gt;
  &lt;custom-menu&gt;
    &lt;custom-menuoption value="SEA"&gt;Seattle-Tacoma International&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="LAX"&gt;Los Angeles International&lt;/custom-menuoption&gt;
    &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-combobox&gt;
&lt;p&gt;Selected: {value}&lt;/p&gt;</code></pre>

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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/minimal-config.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/minimal-config.md -->
<auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
<p>Every <code>&lt;auro-combobox&gt;</code> needs the following content:</p>
<ul>
<li><strong>A label in the <code>label</code> slot</strong>: Names the combobox for screen readers.</li>
<li><strong>Text in the <code>ariaLabel.input.clear</code> slot</strong>: Names the clear button for screen readers, such as "Clear airport". The combobox has no default text for it.</li>
<li><strong>A headline in the <code>bib.fullscreen.headline</code> slot</strong>: Shown above the options when the bib opens fullscreen on small screens.</li>
<li><strong>One or more <code>&lt;auro-menuoption&gt;</code> elements</strong>: Placed inside an <code>&lt;auro-menu&gt;</code> in the default slot to define the available choices.</li>
</ul>
<p>Inside an <code>&lt;auro-form&gt;</code>, also set a unique <code>name</code> attribute, which the form uses to track the combobox's value and validity.</p>
<pre class="language-html"><code class="language-html">&lt;auro-combobox name="airportSearch"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Search airports&lt;/span&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear airport&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="SEA"&gt;Seattle-Tacoma International&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="LAX"&gt;Los Angeles International&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="JFK"&gt;John F. Kennedy International&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching airport&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<p>The following slots are available on the <code>&lt;auro-combobox&gt;</code> element.</p>
<auro-header level="3" id="slot-default">(default)</auro-header>
<p>The <code>&lt;auro-menu&gt;</code> that holds the <code>&lt;auro-menuoption&gt;</code> elements the user chooses from. Every combobox needs one.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Text for the combobox label. Every combobox needs a label, because it gives the input its accessible name.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Help text shown below the combobox. When validation fails, the error message replaces it.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Text shown next to the label when the combobox isn't <code>required</code>. Defaults to "(optional)".</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Custom HTML content shown in place of the selected value when the combobox doesn't have focus.</p>
<auro-header level="3" id="slot-ariaLabel-input-clear">ariaLabel.input.clear</auro-header>
<p>Text screen readers announce for the clear button, such as "Clear selection". The combobox has no default text, so without it the clear button has no accessible name. In the fullscreen bib, the clear button currently uses "Clear Input" instead.</p>
<auro-header level="3" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Text screen readers announce for the close button in the fullscreen bib, such as "Close airport list". Defaults to "Close".</p>
<auro-header level="3" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>Headline shown above the menu options in the fullscreen bib.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State management</auro-header>
<p>The following properties hold the combobox's current state. Read them with JavaScript, and set <code>value</code> or <code>typedValue</code> to change them.</p>
<auro-header level="3" id="inputValue">inputValue</auro-header>
<p>Gets the text currently in the input, whether or not it matches a menu option. It changes as the user types, and it's read-only.</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>Gets the selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> when no option is selected.</p>
<auro-header level="3" id="typedValue">typedValue</auro-header>
<p>Sets the text shown in the input, such as a search the user started earlier. It doesn't update as the user types, so read <code>inputValue</code> to get the current text.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Gets the result of the last validation as a string, such as <code>valid</code>, <code>valueMissing</code>, or <code>customError</code>. It's <code>undefined</code> until the combobox validates.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the combobox's value: the chosen option's <code>value</code>, or the text in the input when no option is chosen. When you set it to the <code>value</code> of an option that isn't <code>disabled</code> or <code>static</code>, the combobox selects that option.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-combobox&gt;</code> element.</p>
<auro-header level="3" id="clear">clear()</auro-header>
<p>Clears the current value of the combobox, resetting both the input and the selected option.</p>
<auro-header level="3" id="focus">focus()</auro-header>
<p>Programmatically moves focus to the combobox trigger input.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the component to its initial state, clearing the value, input text, and validation state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-combobox id="resetStateExample" required>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="ariaLabel.bib.close">Close combobox</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&#10;&lt;auro-combobox id="resetStateExample" required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->
<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');
&#10;  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    elem.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Validates the component and updates <code>validity</code> and the error message. Pass <code>true</code> to validate even when the combobox has focus or the user hasn't interacted with it yet.</p>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>Hides the bib if it's open.</p>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>Shows the bib when the input has a value and there are options or a <code>nomatch</code> option to show. Doesn't currently open the bib for a loading menu that has no options yet.</p>
</section>
</div>
</div>
</div>
