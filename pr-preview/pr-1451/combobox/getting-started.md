<auro-header level="1" id="overview">Combobox - Getting Started</auro-header>
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
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#inputValue" class="level2 body-xs">inputValue</auro-anchorlink>
<auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
<auro-anchorlink fluid href="#typedValue" class="level2 body-xs">typedValue</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
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

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
​
// Register with a custom name if desired
AuroCombobox.register('custom-combobox');</code></pre>

This will create a new custom element `<custom-combobox>` that behaves exactly like `<auro-combobox>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
<custom-combobox>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</custom-combobox>
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<pre class="language-html"><code class="language-html">&lt;custom-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/custom-combobox&gt;</code></pre>
</auro-accordion>
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
<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-combobox';</code></pre>
<p>This import registers the <code>&lt;auro-combobox&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
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
<span slot="trigger">CDN Installation and Implementation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN install & registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<auro-header level="3">Install & Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/cdnRegistration.md -->
<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-combobox/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-combobox&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
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
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/frameworks.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/frameworks.md -->
<auro-header level="2" id="frameworks">Frameworks</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion class="section" id="react">
<span slot="trigger">React</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/react.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/react.md -->
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-combobox&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
AuroCombobox.register('[custom]-combobox');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCombobox` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-combobox>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-menu/auro-menu/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-combobox': React.HTMLAttributes&lt;AuroCombobox&gt; &amp; Partial&lt;AuroCombobox&gt;;
      '[custom]-menu': React.HTMLAttributes&lt;AuroMenu&gt; &amp; Partial&lt;AuroMenu&gt;;
      '[custom]-menuoption': React.HTMLAttributes&lt;AuroMenuOption&gt; &amp; Partial&lt;AuroMenuOption&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
const options = [
  { id: 'opt-1', value: 'SEA', label: 'Seattle-Tacoma International' },
  { id: 'opt-2', value: 'LAX', label: 'Los Angeles International' },
  { id: 'opt-3', value: 'JFK', label: 'John F. Kennedy International' },
  { id: 'opt-4', value: 'ORD', label: "O'Hare International" },
];
​
function MyCombobox() {
  const comboboxRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = comboboxRef.current;
    if (!el) return;
​
    const handleInput = () =&gt; {
      console.log('Selected value:', (el as any).value);
    };
​
    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
​
  return (
    &lt;custom-combobox ref={comboboxRef}&gt;
      &lt;span slot="label"&gt;Search airports&lt;/span&gt;
      &lt;custom-menu&gt;
        {options.map(({ id, value, label }) =&gt; (
          &lt;custom-menuoption key={id} value={value}&gt;{label}&lt;/custom-menuoption&gt;
        ))}
        &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
      &lt;/custom-menu&gt;
    &lt;/custom-combobox&gt;
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/svelte.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/svelte.md -->
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-combobox&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-combobox>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
​
  const options: [string, string][] = [
    ['SEA', 'Seattle-Tacoma International'],
    ['LAX', 'Los Angeles International'],
    ['JFK', 'John F. Kennedy International'],
  ];
​
  let comboboxValue = $state&lt;string&gt;('');
&lt;/script&gt;
&lt;custom-combobox value={comboboxValue}&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
  &lt;custom-menu&gt;
    {#each options as [value, label]}
      &lt;custom-menuoption {value}&gt;{label}&lt;/custom-menuoption&gt;
    {/each}
    &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-combobox&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-combobox>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-combobox': Partial&lt;AuroCombobox&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroCombobox&gt;;
    '[custom]-menu': Partial&lt;AuroMenu&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenu&gt;;
    '[custom]-menuoption': Partial&lt;AuroMenuOption&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenuOption&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `value`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
​
  function handleInput(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-combobox oninput={handleInput}&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
  &lt;custom-menu&gt;
    &lt;custom-menuoption value="SEA"&gt;Seattle-Tacoma International&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="LAX"&gt;Los Angeles International&lt;/custom-menuoption&gt;
    &lt;custom-menuoption static nomatch&gt;No matching airport&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-combobox&gt;
&lt;p&gt;Selected: {value}&lt;/p&gt;</code></pre>

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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/getting-started/minimal-config.md) -->
<!-- The below content is automatically added from ./../docs/pages/getting-started/minimal-config.md -->
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
Every <code>&lt;auro-combobox&gt;</code> implementation requires three things:

1. **A unique `id` attribute** — Required when the combobox is used within a form so it can be properly identified during submission and validation.
2. **A label in the `label` slot** — Provides an accessible label for the combobox element.
3. **One or more `<auro-menuoption>` elements** — Placed inside an `<auro-menu>` in the default slot to define the available choices.

<pre class="language-html"><code class="language-html">&lt;auro-combobox id="airportSearch"&gt;
  &lt;span slot="label"&gt;Search airports&lt;/span&gt;
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
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="inputValue">inputValue</auro-header>
<p>Returns the current value of the internal HTML5 <code>input</code> element. This reflects exactly what the user has typed, regardless of whether it matches a menu option.</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected.</p>
<auro-header level="3" id="typedValue">typedValue</auro-header>
<p>Gets or sets the value of the internal input element. Unlike <code>value</code>, this represents what the user typed (or what was programmatically set in the input), not the selected option value.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the selected value of the combobox. When set programmatically, the component will attempt to match and select the corresponding menu option.</p>
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
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>Programmatically hides the dropdown bib if it is currently open.</p>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>Programmatically shows the dropdown bib if there are options to display.</p>
</section>
</div>
</div>
</div>
