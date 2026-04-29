<auro-header level="1" id="overview">Select - Getting Started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recomended</auro-anchorlink>
<auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#setup">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#appearance">Customize Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom Display Value</auro-anchorlink>
<auro-anchorlink fluid href="#noCheckmark" class="level2 body-xs">No Checkmark</auro-anchorlink>
<auro-anchorlink fluid href="#fluid" class="level2 body-xs">Fluid</auro-anchorlink>
<auro-anchorlink fluid href="#flexMenuWidth" class="level2 body-xs">Flex Menu Width</auro-anchorlink>
<auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match Width</auro-anchorlink>
<auro-anchorlink fluid href="#size" class="level2 body-xs">Size</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
<auro-anchorlink fluid href="#offset" class="level2 body-xs">Offset</auro-anchorlink>
<auro-anchorlink fluid href="#shift" class="level2 body-xs">Shift</auro-anchorlink>
<auro-anchorlink fluid href="#largeHeader" class="level2 body-xs">Large Fullscreen Header</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Customize Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#autoComplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
<auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
<auro-anchorlink fluid href="#isPopoverVisible" class="level2 body-xs">isPopoverVisible</auro-anchorlink>
<auro-anchorlink fluid href="#name" class="level2 body-xs">Name</auro-anchorlink>
<auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
<auro-anchorlink fluid href="#touched" class="level2 body-xs">Touched</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#updateActiveOption" class="level2 body-xs">updateActiveOption()</auro-anchorlink>
<auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
<auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/install.md) -->
<!-- The below content is automatically added from ./../docs/partials/install.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/defaultRegistration.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/cdnRegistration.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/frameworks.md) -->
<!-- The below content is automatically added from ./../docs/partials/frameworks.md -->
<auro-header level="2" id="frameworks">Frameworks</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion class="section" id="react">
<span slot="trigger">React</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/react.md) -->
<!-- The below content is automatically added from ./../docs/partials/react.md -->
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-select&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
AuroSelect.register('[custom]-select');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroSelect` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-select>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-menu/auro-menu/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-select': React.HTMLAttributes&lt;AuroSelect&gt; &amp; Partial&lt;AuroSelect&gt;;
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
  { id: 'opt-1', value: 'stops', label: 'Stops' },
  { id: 'opt-2', value: 'price', label: 'Price' },
  { id: 'opt-3', value: 'duration', label: 'Duration' },
  { id: 'opt-4', value: 'departure', label: 'Departure' },
];
​
function MySelect() {
  const selectRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = selectRef.current;
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
    &lt;custom-select ref={selectRef}&gt;
      &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
      &lt;custom-menu&gt;
        {options.map(({ id, value, label }) =&gt; (
          &lt;custom-menuoption key={id} value={value}&gt;{label}&lt;/custom-menuoption&gt;
        ))}
      &lt;/custom-menu&gt;
    &lt;/custom-select&gt;
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/svelte.md) -->
<!-- The below content is automatically added from ./../docs/partials/svelte.md -->
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-select&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroSelect.register('[custom]-select');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-select>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroSelect.register('[custom]-select');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
​
  const options: [string, string][] = [
    ['stops', 'Stops'],
    ['price', 'Price'],
    ['duration', 'Duration'],
  ];
​
  let selectValue = $state&lt;string&gt;(''); // this will work to preset the value but it will not be reactive - it's a one way binding
​
  // Need to add testing that oninput works in all our components
&lt;/script&gt;
&lt;custom-select value={selectValue}&gt;
  &lt;span slot="label"&gt;Filter by&lt;/span&gt;
  &lt;custom-menu&gt;
    {#each options as [value, label]}
      &lt;custom-menuoption {value}&gt;{label}&lt;/custom-menuoption&gt;
    {/each}
  &lt;/custom-menu&gt;
&lt;/custom-select&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-select>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-select': Partial&lt;AuroSelect&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroSelect&gt;;
    '[custom]-menu': Partial&lt;AuroMenu&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenu&gt;;
    '[custom]-menuoption': Partial&lt;AuroMenuOption&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenuOption&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `value`, `placeholder`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
​
  function handleInput(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-select oninput={handleInput}&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;custom-menu&gt;
    &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
    &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
  &lt;/custom-menu&gt;
&lt;/custom-select&gt;
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/minimal-config.md) -->
<!-- The below content is automatically added from ./../docs/partials/minimal-config.md -->
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
Every <code>&lt;auro-select&gt;</code> implementation requires three things:

1. **A unique `id` attribute** — Required when the select is used within a form so it can be properly identified during submission and validation.
2. **A label in the `label` slot** — Provides an accessible label for the select element.
3. **One or more `<auro-menuoption>` elements** — Placed inside an `<auro-menu>` in the default slot to define the available choices.

<pre class="language-html"><code class="language-html">&lt;auro-select id="flightFilter"&gt;
  &lt;span slot="label"&gt;Filter by&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customization.md) -->
<!-- The below content is automatically added from ./../docs/partials/customization.md -->
<auro-header level="2" id="appearance">Customize Appearance</auro-header>
<auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
<p>The <code>layout</code> attribute determines the overall layout of the select component. Supported values are <code>classic</code>, <code>emphasized</code>, and <code>snowflake</code>. The default value is <code>classic</code>.</p>
<p>The <code>shape</code> attribute determines the shape of the dropdown bib. Supported values are <code>classic</code>, <code>pill</code>, <code>pill-left</code>, <code>pill-right</code>, and <code>snowflake</code>.</p>
<p>These attributes work together to give full control over the visual appearance and sizing of the component. See the <a href="./layout.html">Layout page</a> for a detailed breakdown of each layout option.</p>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Select Example</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance.html -->
<auro-select appearance="inverse" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Inverse Appearance</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse Appearance&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="displayValue">Custom Display Value</auro-header>
<p>The <code>displayValue</code> slot allows custom HTML content to be shown in place of the selected option's text when the select is not focused. This is useful for displaying icons, formatted text, or other rich content in the trigger.</p>
<p>To always show the custom display value (even when no selection has been made), set the <code>forceDisplayValue</code> attribute on the component.</p>
<auro-header level="3" id="noCheckmark">Hide checkmark indicators</auro-header>
<p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set the <code>nocheckmark</code> attribute on the <code>auro-menu</code> element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-checkmark.html -->
<auro-select nocheckmark placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-checkmark.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select nocheckmark placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;auro-menu&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="fluid">Fluid</auro-header>
<p>When the <code>fluid</code> attribute is present, the component will expand to 100% width of its container element. This is useful for form layouts where the select should fill the available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
<!-- The below content is automatically added from ./../apiExamples/fluid.html -->
<auro-select fluid placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fluid.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fluid.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select fluid placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="flexMenuWidth">Flex menu width</auro-header>
<p>By default, the bib width matches the trigger width. Setting the <code>flexMenuWidth</code> attribute allows the bib to size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/flex-menu-width.html -->
<auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
<auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
<auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
<auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
<auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
</auro-menu>
</auro-select>
<style>
#flexMenuWidthExample::part(dropdownTrigger) {
width: 25%;
}
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/flex-menu-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="united states"&gt;United States has a country code of (+1)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="costa rica"&gt;Costa Rica has a country code of (+506)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mexico"&gt;Mexico has a country code of (+52)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="afghanistan"&gt;Afghanistan has a country code of (+93)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="albania"&gt;Albania has a country code of (+355)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
​
&lt;style&gt;
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match Width</auro-header>
<p>When the <code>matchWidth</code> attribute is present, the popover bib and trigger will be set to the same width. This ensures the dropdown menu appears at exactly the same width as the trigger element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-select matchWidth placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select matchWidth placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="size">Size</auro-header>
<p>The <code>size</code> attribute determines the size of the dropdown bib. Only the <code>emphasized</code> layout supports <code>size="xl"</code>, while all other layouts support <code>size="lg"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/size.html) -->
<!-- The below content is automatically added from ./../apiExamples/size.html -->
<auro-select layout="emphasized" shape="pill" size="xl" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/size.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/size.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select layout="emphasized" shape="pill" size="xl" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placement">Placement</auro-header>
<p>The <code>placement</code> attribute defines the position where the dropdown bib should appear relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
<!-- The below content is automatically added from ./../apiExamples/placement.html -->
<auro-select placement="top-start" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placement.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placement="top-start" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noFlip">No Flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>. By default, the bib will automatically reposition itself to remain visible within the viewport.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-flip.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-flip.html -->
<auro-select noFlip placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-flip.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-flip.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select noFlip placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="offset">Offset</auro-header>
<p>The <code>offset</code> attribute defines the gap (in pixels) between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/offset.html) -->
<!-- The below content is automatically added from ./../apiExamples/offset.html -->
<auro-select offset="16" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/offset.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/offset.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select offset="16" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="shift">Shift</auro-header>
<p>When the <code>shift</code> attribute is present, the dropdown bib will shift its position to avoid being cut off by the viewport. This is useful when the bib would otherwise extend beyond the edge of the screen.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
<!-- The below content is automatically added from ./../apiExamples/shift.html -->
<auro-select shift placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/shift.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select shift placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="largeHeader">Large Fullscreen Header</auro-header>
<p>When the <code>largeFullscreenHeadline</code> attribute is present, the headline displayed in the fullscreen bib will render in the larger <code>HeadingDisplay</code> style. By default, the fullscreen headline uses <code>Heading 600</code>.</p>
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<p>When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-select fullscreenBreakpoint="lg">
<span slot="label">Select Example</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select fullscreenBreakpoint="lg"&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="2" id="customBehavior">Customize Behavior</auro-header>
<auro-header level="3" id="autoComplete">Autocomplete</auro-header>
<p>The <code>autocomplete</code> attribute enables browser autofill support for the select element. When set, the browser may offer saved values for the field based on the specified autocomplete token (e.g. <code>address-level1</code> for state selection).</p>
<p>This is especially useful when the select is used alongside other form fields that support autofill, creating a seamless form-filling experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
<!-- The below content is automatically added from ./../apiExamples/autocomplete.html -->
<div class="autofill-example-form">
<div class="input-row">
<auro-input autocomplete="given-name">
<span slot="label">First Name</span>
<span slot="bib.fullscreen.headline">First Name</span>
</auro-input>
<auro-input autocomplete="family-name">
<span slot="label">Last Name</span>
<span slot="bib.fullscreen.headline">Last Name</span>
</auro-input>
</div>
<div class="input-row">
<auro-input autocomplete="address-line1">
<span slot="label">Street Address</span>
<span slot="bib.fullscreen.headline">Street Address</span>
</auro-input>
<auro-input autocomplete="address-level2">
<span slot="label">City</span>
<span slot="bib.fullscreen.headline">City</span>
</auro-input>
<auro-select autocomplete="address-level1">
<span slot="bib.fullscreen.headline">Select Your State</span>
<span slot="label">Select Your State</span>
<auro-menu>
<auro-menuoption value="AL">Alabama</auro-menuoption>
<auro-menuoption value="AK">Alaska</auro-menuoption>
<auro-menuoption value="AZ">Arizona</auro-menuoption>
<auro-menuoption value="AR">Arkansas</auro-menuoption>
<auro-menuoption value="CA">California</auro-menuoption>
<auro-menuoption value="CO">Colorado</auro-menuoption>
<auro-menuoption value="CT">Connecticut</auro-menuoption>
<auro-menuoption value="DE">Delaware</auro-menuoption>
<auro-menuoption value="DC">District of Columbia</auro-menuoption>
<auro-menuoption value="FL">Florida</auro-menuoption>
<auro-menuoption value="GA">Georgia</auro-menuoption>
<auro-menuoption value="HI">Hawaii</auro-menuoption>
<auro-menuoption value="ID">Idaho</auro-menuoption>
<auro-menuoption value="IL">Illinois</auro-menuoption>
<auro-menuoption value="IN">Indiana</auro-menuoption>
<auro-menuoption value="IA">Iowa</auro-menuoption>
<auro-menuoption value="KS">Kansas</auro-menuoption>
<auro-menuoption value="KY">Kentucky</auro-menuoption>
<auro-menuoption value="LA">Louisiana</auro-menuoption>
<auro-menuoption value="ME">Maine</auro-menuoption>
<auro-menuoption value="MD">Maryland</auro-menuoption>
<auro-menuoption value="MA">Massachusetts</auro-menuoption>
<auro-menuoption value="MI">Michigan</auro-menuoption>
<auro-menuoption value="MN">Minnesota</auro-menuoption>
<auro-menuoption value="MS">Mississippi</auro-menuoption>
<auro-menuoption value="MO">Missouri</auro-menuoption>
<auro-menuoption value="MT">Montana</auro-menuoption>
<auro-menuoption value="NE">Nebraska</auro-menuoption>
<auro-menuoption value="NV">Nevada</auro-menuoption>
<auro-menuoption value="NH">New Hampshire</auro-menuoption>
<auro-menuoption value="NJ">New Jersey</auro-menuoption>
<auro-menuoption value="NM">New Mexico</auro-menuoption>
<auro-menuoption value="NY">New York</auro-menuoption>
<auro-menuoption value="NC">North Carolina</auro-menuoption>
<auro-menuoption value="ND">North Dakota</auro-menuoption>
<auro-menuoption value="OH">Ohio</auro-menuoption>
<auro-menuoption value="OK">Oklahoma</auro-menuoption>
<auro-menuoption value="OR">Oregon</auro-menuoption>
<auro-menuoption value="PA">Pennsylvania</auro-menuoption>
<auro-menuoption value="RI">Rhode Island</auro-menuoption>
<auro-menuoption value="SC">South Carolina</auro-menuoption>
<auro-menuoption value="SD">South Dakota</auro-menuoption>
<auro-menuoption value="TN">Tennessee</auro-menuoption>
<auro-menuoption value="TX">Texas</auro-menuoption>
<auro-menuoption value="UT">Utah</auro-menuoption>
<auro-menuoption value="VT">Vermont</auro-menuoption>
<auro-menuoption value="VA">Virginia</auro-menuoption>
<auro-menuoption value="WA">Washington</auro-menuoption>
<auro-menuoption value="WV">West Virginia</auro-menuoption>
<auro-menuoption value="WI">Wisconsin</auro-menuoption>
<auro-menuoption value="WY">Wyoming</auro-menuoption>
</auro-menu>
</auro-select>
</div>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/autocomplete.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/autocomplete.html -->
<pre class="language-html"><code class="language-html">&lt;div class="autofill-example-form"&gt;
  &lt;div class="input-row"&gt;
    &lt;auro-input autocomplete="given-name"&gt;
      &lt;span slot="label"&gt;First Name&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;First Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input autocomplete="family-name"&gt;
      &lt;span slot="label"&gt;Last Name&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Last Name&lt;/span&gt;
    &lt;/auro-input&gt;
  &lt;/div&gt;
  &lt;div class="input-row"&gt;
    &lt;auro-input autocomplete="address-line1"&gt;
      &lt;span slot="label"&gt;Street Address&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Street Address&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input autocomplete="address-level2"&gt;
      &lt;span slot="label"&gt;City&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;City&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-select autocomplete="address-level1"&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Select Your State&lt;/span&gt;
      &lt;span slot="label"&gt;Select Your State&lt;/span&gt;
      &lt;auro-menu&gt;
        &lt;auro-menuoption value="AL"&gt;Alabama&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AK"&gt;Alaska&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AZ"&gt;Arizona&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AR"&gt;Arkansas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CA"&gt;California&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CO"&gt;Colorado&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CT"&gt;Connecticut&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="DE"&gt;Delaware&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="DC"&gt;District of Columbia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="FL"&gt;Florida&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="GA"&gt;Georgia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="HI"&gt;Hawaii&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ID"&gt;Idaho&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IL"&gt;Illinois&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IN"&gt;Indiana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IA"&gt;Iowa&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="KS"&gt;Kansas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="KY"&gt;Kentucky&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="LA"&gt;Louisiana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ME"&gt;Maine&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MD"&gt;Maryland&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MA"&gt;Massachusetts&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MI"&gt;Michigan&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MN"&gt;Minnesota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MS"&gt;Mississippi&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MO"&gt;Missouri&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MT"&gt;Montana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NE"&gt;Nebraska&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NV"&gt;Nevada&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NH"&gt;New Hampshire&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NJ"&gt;New Jersey&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NM"&gt;New Mexico&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NY"&gt;New York&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NC"&gt;North Carolina&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ND"&gt;North Dakota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OH"&gt;Ohio&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OK"&gt;Oklahoma&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OR"&gt;Oregon&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="PA"&gt;Pennsylvania&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="RI"&gt;Rhode Island&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="SC"&gt;South Carolina&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="SD"&gt;South Dakota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="TN"&gt;Tennessee&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="TX"&gt;Texas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="UT"&gt;Utah&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="VT"&gt;Vermont&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="VA"&gt;Virginia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WA"&gt;Washington&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WV"&gt;West Virginia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WI"&gt;Wisconsin&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WY"&gt;Wyoming&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/auro-select&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>The entire component may be disabled. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
<p>When the component is disabled and part of a form, the components value is still included in the form submission.</p>
<p class="note">
<strong>Note:</strong> If the component is marked as both <strong>invalid</strong> and <code>disabled</code>, the <strong>invalid</strong> state UI/UX and functional behavior are ignored. The <code>disabled</code> UI/UX and functional behavior works normally.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-select disabled placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select disabled placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableOptions">Disable Option(s)</auro-header>
<p>The component may be rendered with one or more <code>disabled</code> options. When navigating the list of options with the keyboard or assistive technology to mark the next or previous option as active, disabled options will be skipped, jumping to the next enabled option.</p>
<p>While using the pointer to mark options as active, hovering over disabled options will be ignored and the previous active option will remain active.</p>
<p class="note">
<strong>Note:</strong> If the currently <code>selected</code> option is marked as <code>disabled</code>, the component value is reset to <code>undefined</code> and the component validation workflow is performed (e.g., if the component instance is <code>required</code> it will set <code>validity="valueMissing".</code>).
</p>
<p class="note">
<strong>Note:</strong> marking all options as disabled is not supported. Disable the component instead.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-options.html -->
<auro-select placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price" disabled>Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure" disabled>Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-options.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-options.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price" disabled&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure" disabled&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
<p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
<p>When the component is marked required:</p>
<ol>
<li>Move focus to the auro-select element</li>
<li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
<li>Navigate the list of options</li>
<li>
Collapse the bib without making a selection
<p class="note">
This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.
</p>
</li>
<li>Activate the trigger</li>
<li>Navigate the list of options marking any option as active</li>
<li>
Select the active option
<p class="note">
This will re-render the component and the validation error state will be removed.
</p>
</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-select required setCustomValidityValueMissing="Custom required validation error message." placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select required setCustomValidityValueMissing="Custom required validation error message." placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force an error state</auro-header>
<p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current selection.</p>
<p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
<p>Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-select error="Custom error message" placeholder="Placeholder Text">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select error="Custom error message" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom validation messages</auro-header>
<p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
<ul>
<li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
<li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
</ul>
<p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message. Default messages are provided by the browser and are pre-localized to the language the browser is running in.</p>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>When the <code>noValidate</code> attribute is present, the component will not perform automatic validation on blur. This is useful when validation is handled externally or should only be triggered on form submission.</p>
<auro-header level="3" id="placeholder">Placeholder</auro-header>
<p>Use the <code>placeholder</code> attribute to define custom placeholder text that is displayed in the trigger before a value has been selected.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
<!-- The below content is automatically added from ./../apiExamples/placeholder.html -->
<auro-select placeholder="Please select your preferred option">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placeholder.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Please select your preferred option"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<auro-header level="3" id="hasFocus">hasFocus</auro-header>
<p>The <code>hasFocus</code> property is a read-only boolean that indicates whether the component currently has focus. This property is automatically managed by the component and reflects the focus state of the trigger element.</p>
<auro-header level="3" id="isPopoverVisible">isPopoverVisible</auro-header>
<p>The <code>isPopoverVisible</code> property is a read-only boolean that indicates whether the dropdown bib is currently visible. This can be used to conditionally execute logic based on the open/closed state of the dropdown.</p>
<auro-header level="3" id="name">Name</auro-header>
<p>The <code>name</code> attribute sets the name for the select element. This is used to identify the element when submitting form data and can be referenced when accessing form values programmatically.</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>The <code>optionSelected</code> property returns a reference to the currently selected <code>auro-menuoption</code> element. When <code>multiselect</code> is enabled, this property returns an array of selected option elements. This property is read-only and is updated automatically when the selection changes.</p>
<auro-header level="3" id="touched">Touched</auro-header>
<p>The <code>touched</code> property is a read-only boolean that indicates whether the user has interacted with the component. The component is considered touched after the user opens and closes the dropdown bib at least once. This is useful for deferring validation feedback until the user has had a chance to interact with the component.</p>
<auro-header level="3" id="validity">Validity</auro-header>
<p>The <code>validity</code> property reflects the current validation state of the component. Possible values include <code>valid</code>, <code>valueMissing</code> (when <code>required</code> and no option is selected), and <code>customError</code> (when the <code>error</code> attribute is set). The component dispatches an <code>auroFormElement-validated</code> event when the validity state changes.</p>
<auro-header level="3" id="value">Value</auro-header>
<p>The <code>value</code> property reflects the currently selected option's value. It can also be set programmatically to pre-select an option. When <code>multiselect</code> is enabled, the value is a JSON array string (e.g. <code>'["price", "duration"]'</code>).</p>
<p>The component dispatches an <code>input</code> event whenever the value changes, with the updated <code>value</code> and <code>optionSelected</code> available in the event's <code>detail</code> object.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
<!-- The below content is automatically added from ./../apiExamples/value.html -->
<auro-button id="validValueExampleBtn">Set Value to Valid Option</auro-button>
<auro-button id="invalidValueExampleBtn">Set Value to Invalid Option</auro-button>
<br/><br/>
<auro-select id="valueExample" multiselect value='["price", "duration"]'>
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
<auro-menuoption id="option-1" value="price">Price</auro-menuoption>
<auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
<auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
<auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
<auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="validValueExampleBtn"&gt;Set Value to Valid Option&lt;/auro-button&gt;
&lt;auro-button id="invalidValueExampleBtn"&gt;Set Value to Invalid Option&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-select id="valueExample" multiselect value='["price", "duration"]'&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption id="option-0" value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-1" value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-2" value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-3" value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-4" value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-5" value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<auro-header level="3" id="reset">reset()</auro-header>
<p>The <code>reset()</code> method restores the component to its initial state. This clears the current selection, resets the value, and removes any validation errors.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-select id="resetStateExample" value="price">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
​
&lt;auro-select id="resetStateExample" value="price"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="updateActiveOption">updateActiveOption()</auro-header>
<p>The <code>updateActiveOption(index)</code> method programmatically sets the active (highlighted) option in the menu by its zero-based index. This does not select the option — it only marks it as active for keyboard navigation or visual highlighting.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/update-active-option.html) -->
<!-- The below content is automatically added from ./../apiExamples/update-active-option.html -->
<auro-select id="updateActiveOptionExample">
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Select Example</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-active-option.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-active-option.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select id="updateActiveOptionExample"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>The <code>hideBib()</code> method programmatically closes the dropdown bib if it is currently open. This is useful for closing the dropdown in response to external events or custom interaction flows.</p>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>The <code>showBib()</code> method programmatically opens the dropdown bib, provided there are options available to display. This is useful for triggering the dropdown from custom UI elements or in response to specific user actions.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
