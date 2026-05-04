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
<auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default" class="level2 body-xs">(default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-valueText" class="level2 body-xs">valueText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">ariaLabel.bib.close</auro-anchorlink>
<auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">bib.fullscreen.headline</auro-anchorlink>
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
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/install.md) -->
<!-- The below content is automatically added from ./../docs/pages/install.md -->
<auro-header level="2" id="setup">Setup</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion expanded class="section" id="recommendedAccordion">
<span slot="trigger">Recommended Installation and Implementation</span>
<div class="accordion-content">
<auro-header level="3">Install</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/customRegistration.md -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- The below content is automatically added from ./../../../docs/partials/customRegistrationDescription.md -->
<p>Every Auro component consists of a JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define">custom element registration</a>. The class defines the component's behavior, and the registration maps it to an HTML tag name so it can be used in markup.</p>
<p>The default import (shown above) handles both steps automatically, registering the component under its standard tag name.</p>
<p>If you need multiple versions of the same component on a single page — for example, when two projects depend on different versions — you can register the class under a custom tag name to avoid conflicts.</p>
<p>To do this, import the component class directly and call its <code>register(name)</code> method with a unique name:</p>
<!-- AURO-GENERATED-CONTENT:END -->

<pre class="language-js"><code class="language-js">// Import the classes
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu } from '@aurodesignsystem/auro-formkit/auro-menu/class';
import { AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menuoption/class';
​
// Register each component with a custom name
AuroSelect.register('[custom]-select');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');</code></pre>

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

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/defaultRegistration.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/frameworks.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/frameworks.md -->
<auro-header level="2" id="frameworks">Frameworks</auro-header>
<auro-accordion-group Emphasis>
<auro-accordion class="section" id="react">
<span slot="trigger">React</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/react.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/react.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/svelte.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/svelte.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/minimal-config.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/minimal-config.md -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<p>The following slots are available on the <code>&lt;auro-select&gt;</code> element.</p>
<auro-header level="3" id="slot-default">(default)</auro-header>
<p>Default slot for the menu content. Place <code>&lt;auro-menuoption&gt;</code> elements here.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Defines the content of the label.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Defines the content of the help text displayed below the select.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Allows overriding the optional display text <code>"(optional)"</code>, which appears next to the label.</p>
<auro-header level="3" id="slot-valueText">valueText</auro-header>
<p>Dropdown value text display.</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Allows custom HTML content to display the selected value when the select is not focused.</p>
<auro-header level="3" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Sets <code>aria-label</code> on the close button in the fullscreen bib.</p>
<auro-header level="3" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>Defines the headline to display above menu options in the fullscreen bib.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="hasFocus">hasFocus</auro-header>
<p>Returns <code>true</code> when the select trigger currently has focus.</p>
<auro-header level="3" id="isPopoverVisible">isPopoverVisible</auro-header>
<p>Returns <code>true</code> when the dropdown bib is currently visible.</p>
<auro-header level="3" id="name">name</auro-header>
<p>Gets or sets the name for the select element. Used when submitting form data.</p>
<auro-header level="3" id="optionSelected">optionSelected</auro-header>
<p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an <code>Array</code> of selected elements.</p>
<auro-header level="3" id="touched">touched</auro-header>
<p>Returns <code>true</code> after the user has interacted with the component (opened and closed the bib, or changed the value).</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the selected value of the select. When set programmatically, the component will attempt to match and select the corresponding menu option.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-select&gt;</code> element.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the component to its initial state, clearing the value and validation state.</p>
<auro-header level="3" id="updateActiveOption">updateActiveOption()</auro-header>
<p>Updates the active option in the menu by index. The active option receives visual focus when navigating with the keyboard.</p>
<auro-header level="3" id="hideBib">hideBib()</auro-header>
<p>Programmatically hides the dropdown bib if it is currently open.</p>
<auro-header level="3" id="showBib">showBib()</auro-header>
<p>Programmatically shows the dropdown bib if there are options to display.</p>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
</section>
</div>
</div>
</div>
