<auro-header level="1" id="overview">Menu - Getting Started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedAccordion" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
<auro-anchorlink fluid href="#autoAccordion" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnAccordion" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal Configuration</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slotDefault" class="level2 body-xs">Default Slot</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
<auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
<auro-anchorlink fluid href="#optionActive" class="level2 body-xs">optionActive</auro-anchorlink>
<auro-anchorlink fluid href="#currentLabel" class="level2 body-xs">currentLabel</auro-anchorlink>
<auro-anchorlink fluid href="#options" class="level2 body-xs">options</auro-anchorlink>
<auro-anchorlink fluid href="#index" class="level2 body-xs">index</auro-anchorlink>
<auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#makeSelection" class="level2 body-xs">makeSelection()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#updateActiveOption" class="level2 body-xs">updateActiveOption()</auro-anchorlink>
<auro-anchorlink fluid href="#navigateOptions" class="level2 body-xs">navigateOptions()</auro-anchorlink>
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
There are two key parts to every Auro component: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
// Register with a custom name if desired
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menu-option');</code></pre>

This will create a new custom element `<custom-menu>` and `<custom-menu-option>` that behaves exactly like `<auro-menu>` and `<auro-menu-option>`, allowing both to coexist on the same page without interfering with each other.

<pre class="language-html"><code class="language-html">&lt;custom-menu&gt;
  &lt;custom-menuoption value="stops"&gt;Stops&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="price"&gt;Price&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="duration"&gt;Duration&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="departure"&gt;Departure&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="arrival"&gt;Arrival&lt;/custom-menuoption&gt;
&lt;/custom-menu&gt;</code></pre>
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

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-menu';</code></pre>

Then use the element in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="option3"&gt;Option 3&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
The menu component can be loaded via CDN without a build step:

<pre class="language-html"><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-menu/+esm" type="module"&gt;&lt;/script&gt;</code></pre>

Then use the element in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="option3"&gt;Option 3&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-menu&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroMenu` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-menu>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-menu': React.HTMLAttributes&lt;AuroMenu&gt; &amp; Partial&lt;AuroMenu&gt;;
      '[custom]-menuoption': React.HTMLAttributes&lt;AuroMenuOption&gt; &amp; Partial&lt;AuroMenuOption&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyMenu() {
  const menuRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = menuRef.current;
    if (!el) return;
​
    const handleSelect = () =&gt; {
      console.log('Selected value:', (el as any).value);
    };
​
    el.addEventListener('selectedOption', handleSelect);
    return () =&gt; el.removeEventListener('selectedOption', handleSelect);
  }, []);
​
  return (
    &lt;custom-menu ref={menuRef}&gt;
      &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
      &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
      &lt;custom-menuoption value="option3"&gt;Option 3&lt;/custom-menuoption&gt;
    &lt;/custom-menu&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-menu&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-menu>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;
&lt;custom-menu&gt;
  &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option3"&gt;Option 3&lt;/custom-menuoption&gt;
&lt;/custom-menu&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-menu>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-menu': Partial&lt;AuroMenu&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenu&gt;;
    '[custom]-menuoption': Partial&lt;AuroMenuOption&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenuOption&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `value`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `selectedOption` event on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
​
  function handleSelect(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-menu on:selectedOption={handleSelect}&gt;
  &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
&lt;/custom-menu&gt;
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
<auro-header level="2" id="minimalConfig">Minimal Configuration</auro-header>
<p>The most basic use of <code>&lt;auro-menu&gt;</code> is a list of <code>&lt;auro-menuoption&gt;</code> elements in the default slot. Each option should have a <code>&lt;value&gt;</code> attribute.</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotDefault">Default Slot</auro-header>
<p>The default slot accepts <code>auro-menuoption</code> elements and <code>&lt;hr&gt;</code> elements as dividers. You can also nest additional <code>&lt;auro-menu&gt;</code> elements within the default slot.</p>
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following properties reflect the current state of the menu and can be accessed via JavaScript.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the selected value. In multi-select mode, this is a JSON stringified array of selected option values (e.g., <code>'["stops","duration"]'</code>).</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an array of selected elements.</p>
<auro-header level="3" id="optionActive">optionActive</auro-header>
<p>Returns the currently active (focused) <code>&lt;auro-menuoption&gt;</code> element. The active option receives visual focus during keyboard navigation.</p>
<auro-header level="3" id="currentLabel">currentLabel</auro-header>
<p>Returns the display label of the currently selected option(s). Useful for rendering a summary of the selection outside the menu.</p>
<auro-header level="3" id="options">options</auro-header>
<p>Returns a read-only array of available <code>&lt;auro-menuoption&gt;</code> elements currently in the menu.</p>
<auro-header level="3" id="index">index</auro-header>
<p>Gets or sets the index of the currently highlighted option. Setting this value programmatically moves the visual focus indicator.</p>
</section>
<section>
<auro-header level="2" id="functions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-menu&gt;</code> element.</p>
<auro-header level="3" id="makeSelection">makeSelection()</auro-header>
<p>Selects the currently active menu option. This is the programmatic equivalent of clicking on an option or pressing Enter while an option is focused.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the menu to its initial state, clearing all selected options and restoring the value to <code>undefined</code>.</p>
<auro-header level="3" id="updateActiveOption">updateActiveOption(option)</auro-header>
<p>Sets the specified <code>&lt;auro-menuoption&gt;</code> element as the currently active (highlighted) option.</p>
<auro-header level="3" id="navigateOptions">navigateOptions(direction)</auro-header>
<p>Moves the highlight to the next or previous option. Accepts <code>'up'</code> or <code>'down'</code> as the direction parameter.</p>
</section>
</div>
</div>
</div>
