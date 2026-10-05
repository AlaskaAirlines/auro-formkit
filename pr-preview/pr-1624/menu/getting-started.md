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
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#selectByValue" class="level2 body-xs">selectByValue()</auro-anchorlink>
<auro-anchorlink fluid href="#updateActiveOption" class="level2 body-xs">updateActiveOption()</auro-anchorlink>
<auro-anchorlink fluid href="#navigateOptions" class="level2 body-xs">navigateOptions()</auro-anchorlink>
<auro-anchorlink fluid href="#events">Events</auro-anchorlink>
<auro-anchorlink fluid href="#eventList" class="level2 body-xs">Event List</auro-anchorlink>
<auro-anchorlink fluid href="#eventAttribute" class="level2 body-xs">Option event attribute</auro-anchorlink>
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
<p>Gets or sets the selected value. In multi-select mode, this is a JSON stringified array of selected option values (e.g., <code>'["stops","duration"]'</code>). If the value matches an option marked <code>disabled</code> or <code>static</code>, the selection is cleared (<code>optionSelected</code> becomes <code>undefined</code>) and <code>auroMenu-selectValueFailure</code> is dispatched. <code>hidden</code> options remain selectable by value.</p>
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
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the menu to its initial state, clearing all selected options and restoring the value to <code>undefined</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset.html -->
<auro-menu id="resetExample" value="duration">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br/><br/>
<auro-button id="resetExampleBtn">RESET</auro-button>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="resetExample" value="duration"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-button id="resetExampleBtn"&gt;RESET&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="selectByValue">selectByValue(value)</auro-header>
<p>Selects the option(s) whose <code>value</code> matches the argument. Accepts a string in single-select mode or an array of strings in multi-select mode; passing <code>undefined</code>, <code>null</code>, an empty string, or an empty array clears the selection.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/select-by-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/select-by-value.html -->
<auro-menu id="selectByValueMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br />
<auro-button id="selectByValueStops">Select "Stops"</auro-button>
<auro-button id="selectByValueDuration">Select "Duration"</auro-button>
<auro-button id="selectByValueClear">Clear selection</auro-button>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/select-by-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/select-by-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="selectByValueMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;br /&gt;
&lt;auro-button id="selectByValueStops"&gt;Select "Stops"&lt;/auro-button&gt;
&lt;auro-button id="selectByValueDuration"&gt;Select "Duration"&lt;/auro-button&gt;
&lt;auro-button id="selectByValueClear"&gt;Clear selection&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="updateActiveOption">updateActiveOption(indexOrOption)</auro-header>
<p>Sets the specified option as the currently active (highlighted) option. Accepts either a numeric index into <code>options</code> or an <code>&lt;auro-menuoption&gt;</code> element reference.</p>
<auro-header level="3" id="navigateOptions">navigateOptions(direction)</auro-header>
<p>Moves the active option to the next or previous option. Accepts <code>'up'</code> or <code>'down'</code> as the direction parameter.</p>
</section>
<section>
<auro-header level="2" id="events">Events</auro-header>
<p>The <code>&lt;auro-menu&gt;</code> element dispatches custom events that consumers can subscribe to via <code>addEventListener</code>. The example below wires listeners for the full event set and logs each firing.</p>
<auro-header level="3" id="eventList">Event List</auro-header>
<ul>
<li><code>auroMenu-selectedOption</code> — a new selection has been made.</li>
<li><code>auroMenu-activatedOption</code> — the active (highlighted) option changed via keyboard or hover.</li>
<li><code>auroMenu-optionsChange</code> — the set of available options was updated (e.g., after a slot change).</li>
<li><code>auroMenu-selectValueReset</code> — the menu's <code>value</code> was reset via <code>reset()</code>.</li>
<li><code>auroMenu-selectValueFailure</code> — a value selection (via <code>selectByValue()</code>, the <code>value</code> attribute, or setting the <code>value</code> property) found no matching selectable option. This includes values that match an option marked <code>disabled</code> or <code>static</code>, which are never selectable.</li>
</ul>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/events.html) -->
<!-- The below content is automatically added from ./../apiExamples/events.html -->
<auro-menu id="eventsExampleMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br />
<auro-button id="eventsExampleReset">reset()</auro-button>
<auro-button id="eventsExampleBadValue">selectByValue("nonexistent")</auro-button>
<auro-button id="eventsExampleClearLog">Clear log</auro-button>
        <pre id="eventsExampleLog" style="max-height: 200px; overflow: auto; padding: var(--ds-size-100, 8px); background: var(--ds-color-container-secondary, #f5f5f5); border-radius: 4px;">(interact with the menu above)</pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/events.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/events.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="eventsExampleMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;br /&gt;
&lt;auro-button id="eventsExampleReset"&gt;reset()&lt;/auro-button&gt;
&lt;auro-button id="eventsExampleBadValue"&gt;selectByValue("nonexistent")&lt;/auro-button&gt;
&lt;auro-button id="eventsExampleClearLog"&gt;Clear log&lt;/auro-button&gt;
&lt;pre id="eventsExampleLog" style="max-height: 200px; overflow: auto; padding: var(--ds-size-100, 8px); background: var(--ds-color-container-secondary, #f5f5f5); border-radius: 4px;"&gt;(interact with the menu above)&lt;/pre&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="eventAttribute">Option event attribute</auro-header>
<p>Attach an <code>event</code> attribute to any <code>auro-menuoption</code> to dispatch a named custom event from the menu when that option is selected. The generic <code>auroMenu-customEventFired</code> event is also dispatched on every firing — its <code>detail.option</code> references the option that triggered it, so a single listener can route on the <code>event</code> attribute value.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/event-attribute.html) -->
<!-- The below content is automatically added from ./../apiExamples/event-attribute.html -->
<auro-menu id="eventAttrExample">
<auro-menuoption value="search" event="custom-flight-search">Search flights</auro-menuoption>
<auro-menuoption value="clear" event="custom-clear-filters">Clear filters</auro-menuoption>
<auro-menuoption value="save" event="custom-save-preferences">Save preferences</auro-menuoption>
</auro-menu>
<p>Last custom event: <output id="eventAttrOutput">(none)</output></p>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/event-attribute.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/event-attribute.html -->
<pre class="language-html"><code class="language-html">&lt;auro-menu id="eventAttrExample"&gt;
  &lt;auro-menuoption value="search" event="custom-flight-search"&gt;Search flights&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="clear" event="custom-clear-filters"&gt;Clear filters&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save" event="custom-save-preferences"&gt;Save preferences&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;p&gt;Last custom event: &lt;output id="eventAttrOutput"&gt;(none)&lt;/output&gt;&lt;/p&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
