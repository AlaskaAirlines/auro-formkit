<auro-header level="1" id="overview">Menu - Getting started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#recommendedAccordion" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
<auro-anchorlink fluid href="#autoAccordion" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
<auro-anchorlink fluid href="#cdnAccordion" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
<auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal configuration</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slotDefault" class="level2 body-xs">Default slot</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
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
<auro-anchorlink fluid href="#eventList" class="level2 body-xs">Event list</auro-anchorlink>
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
Every Auro component has two key parts: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

Import only the component classes and call each one's `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;// Register with a custom name if desired
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

This creates the custom elements `<custom-menu>` and `<custom-menuoption>`, which behave exactly like `<auro-menu>` and `<auro-menuoption>` and can be used on the same page without interfering with each other.

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
Import the component. The import registers `<auro-menu>` and `<auro-menuoption>` under their default tag names:

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
<span slot="trigger">CDN installation</span>
<div class="accordion-content">
<p class="warning"><strong>Warning:</strong> CDN registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
Load the menu component from a CDN, without a build step:

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

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the components at the top level of your application, such as in your root `main.tsx` or `App.tsx`:

<pre class="language-js"><code class="language-js">import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroMenu` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for `<auro-menu>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-menu': React.HTMLAttributes&lt;AuroMenu&gt; &amp; Partial&lt;AuroMenu&gt;;
      '[custom]-menuoption': React.HTMLAttributes&lt;AuroMenuOption&gt; &amp; Partial&lt;AuroMenuOption&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
&#10;function MyMenu() {
  const menuRef = useRef&lt;HTMLElement&gt;(null);
&#10;  useEffect(() =&gt; {
    const el = menuRef.current;
    if (!el) return;
&#10;    const handleSelect = () =&gt; {
      console.log('Selected value:', (el as any).value);
    };
&#10;    el.addEventListener('auroMenu-selectedOption', handleSelect);
    return () =&gt; el.removeEventListener('auroMenu-selectedOption', handleSelect);
  }, []);
&#10;  return (
    &lt;custom-menu ref={menuRef}&gt;
      &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
      &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
      &lt;custom-menuoption value="option3"&gt;Option 3&lt;/custom-menuoption&gt;
    &lt;/custom-menu&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-menu&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use `<auro-menu>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
&lt;/script&gt;
&lt;custom-menu&gt;
  &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option3"&gt;Option 3&lt;/custom-menuoption&gt;
&lt;/custom-menu&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-menu>` props in templates, add the following to a `.d.ts` file in your project, such as `src/auro-elements.d.ts`:

<pre class="language-js"><code class="language-js">import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';
&#10;declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-menu': Partial&lt;AuroMenu&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenu&gt;;
    '[custom]-menuoption': Partial&lt;AuroMenuOption&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroMenuOption&gt;;
  }
}</code></pre>

This enables prop hinting for attributes such as `value` and `disabled` directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `auroMenu-selectedOption` event on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
&#10;  function handleSelect(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-menu on:auroMenu-selectedOption={handleSelect}&gt;
  &lt;custom-menuoption value="option1"&gt;Option 1&lt;/custom-menuoption&gt;
  &lt;custom-menuoption value="option2"&gt;Option 2&lt;/custom-menuoption&gt;
&lt;/custom-menu&gt;
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
<auro-header level="2" id="minimalConfig">Minimal configuration</auro-header>
<p>The most basic use of <code>&lt;auro-menu&gt;</code> is a list of <code>&lt;auro-menuoption&gt;</code> elements in the default slot. Give each option a <code>value</code> attribute.</p>
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
<auro-header level="3" id="slotDefault">Default slot</auro-header>
<p>The default slot accepts <code>auro-menuoption</code> elements and <code>&lt;hr&gt;</code> elements as dividers. It also accepts nested <code>&lt;auro-menu&gt;</code> elements, which indent a group of options.</p>
</section>
<section>
<auro-header level="2" id="stateManagement">State management</auro-header>
<p>Read these properties in JavaScript to get the menu's current state.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the selected value. In multi-select mode, it's a JSON array string of the selected option values, such as <code>'["stops","duration"]'</code>. When the value matches no option, or only options marked <code>disabled</code> or <code>static</code>, the menu clears the selection (<code>optionSelected</code> becomes <code>undefined</code>) and fires <code>auroMenu-selectValueFailure</code>. In multi-select mode, the menu drops values that match only <code>disabled</code> or <code>static</code> options, and fires the event only when no value matches. Options marked <code>hidden</code> can still be selected by value.</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>Returns the selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an array of selected elements.</p>
<auro-header level="3" id="optionActive">optionActive</auro-header>
<p>Returns the active <code>&lt;auro-menuoption&gt;</code> element: the option highlighted by the arrow keys or hover. Focus doesn't move to the active option; it's only shown as highlighted.</p>
<auro-header level="3" id="currentLabel">currentLabel</auro-header>
<p>Returns the text of the selected option, or of every selected option separated by commas in multi-select mode. Use it to show a summary of the selection outside the menu.</p>
<auro-header level="3" id="options">options</auro-header>
<p>Returns the <code>&lt;auro-menuoption&gt;</code> elements in the menu, including those in nested menus, or <code>undefined</code> when the menu has none.</p>
<auro-header level="3" id="index">index</auro-header>
<p>Gets or sets the position in <code>options</code> of the option that Enter and Tab act on: the option last highlighted or selected. It's <code>-1</code> when there's none. Setting it highlights that option.</p>
</section>
<section>
<auro-header level="2" id="functions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-menu&gt;</code> element.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the menu to its initial state: clears the selection and the active option, sets <code>value</code> to <code>undefined</code>, and dispatches <code>auroMenu-selectValueReset</code>.</p>
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
<auro-button id="resetExampleBtn">Reset</auro-button>
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
&lt;auro-button id="resetExampleBtn"&gt;Reset&lt;/auro-button&gt;</code></pre>
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
<p>Sets the specified option as the active (highlighted) option and dispatches <code>auroMenu-activatedOption</code>. Accepts either a numeric index into <code>options</code> or an <code>&lt;auro-menuoption&gt;</code> element reference.</p>
<auro-header level="3" id="navigateOptions">navigateOptions(direction)</auro-header>
<p>Moves the active option to the next or previous interactive option, wrapping around at either end. Accepts <code>'up'</code> or <code>'down'</code> as the direction parameter.</p>
</section>
<section>
<auro-header level="2" id="events">Events</auro-header>
<p>The <code>&lt;auro-menu&gt;</code> element dispatches custom events that consumers can subscribe to via <code>addEventListener</code>. The example below listens for the selection, active-option, options, reset, and failure events and logs each one.</p>
<auro-header level="3" id="eventList">Event list</auro-header>
<ul>
<li><code>auroMenu-selectedOption</code>: the selection changed, including when an option is deselected or the selection is cleared. In single-select mode, it also fires when the already-selected option is chosen again.</li>
<li><code>auroMenu-activatedOption</code>: the active (highlighted) option changed through the keyboard, hover, or <code>updateActiveOption()</code>.</li>
<li><code>auroMenu-optionsChange</code>: the set of available options was updated, such as after a slot change.</li>
<li><code>auroMenu-selectValueReset</code>: the menu's <code>value</code> was reset with <code>reset()</code>.</li>
<li><code>auroMenu-selectValueFailure</code>: a value selection (through <code>selectByValue()</code>, the <code>value</code> attribute, or setting the <code>value</code> property) found no matching selectable option. This includes values that match an option marked <code>disabled</code> or <code>static</code>, which are never selectable. It also fires in multi-select mode when someone chooses an option with no <code>value</code>.</li>
<li><code>auroMenu-loadingChange</code>: the <code>loading</code> attribute changed.</li>
<li><code>auroMenu-customEventFired</code>: the menu fired the event named in an option's <code>event</code> attribute. See <a href="#eventAttribute">Option event attribute</a>.</li>
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
<p>Attach an <code>event</code> attribute to any <code>auro-menuoption</code> to dispatch a named custom event from the menu, instead of selecting the option, when someone chooses it. The menu also dispatches the generic <code>auroMenu-customEventFired</code> event every time. Its <code>detail.option</code> references the option that triggered it, so a single listener can route on the <code>event</code> attribute value.</p>
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
