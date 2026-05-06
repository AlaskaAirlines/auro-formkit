<auro-header level="1" id="overview">Dropdown - Getting Started</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
<auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
<auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
<auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
<auro-anchorlink fluid href="#minimalConfig">Minimal Configuration</auro-anchorlink>
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slotTrigger" class="level2 body-xs">Trigger</auro-anchorlink>
<auro-anchorlink fluid href="#slotHelpText" class="level2 body-xs">Help Text</auro-anchorlink>
<auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#fnShow" class="level2 body-xs">show()</auro-anchorlink>
<auro-anchorlink fluid href="#fnHide" class="level2 body-xs">hide()</auro-anchorlink>
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

## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
// Register with a custom name if desired
AuroDropdown.register('custom-dropdown');</code></pre>

This will create a new custom element `<custom-dropdown>` that behaves exactly like `<auro-dropdown>`, allowing both to coexist on the same page without interfering with each other.

<pre class="language-html"><code class="language-html">&lt;custom-dropdown id="customCommon" layout="classic" shape="classic" size="lg" aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="customCommonButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/custom-dropdown&gt;</code></pre>
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

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-dropdown';</code></pre>

Then use the element in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
The dropdown component can be loaded via CDN without a build step:

<pre class="language-html"><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-dropdown/+esm" type="module"&gt;&lt;/script&gt;</code></pre>

Then use the element in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-dropdown&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
AuroDropdown.register('[custom]-dropdown');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroDropdown` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-dropdown>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-dropdown': React.HTMLAttributes&lt;AuroDropdown&gt; &amp; Partial&lt;AuroDropdown&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyDropdown() {
  const dropdownRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = dropdownRef.current;
    if (!el) return;
​
    const handleToggle = () =&gt; {
      console.log('Dropdown toggled, isPopoverVisible:', (el as any).isPopoverVisible);
    };
​
    el.addEventListener('auroDropdown-toggled', handleToggle);
    return () =&gt; el.removeEventListener('auroDropdown-toggled', handleToggle);
  }, []);
​
  return (
    &lt;custom-dropdown ref={dropdownRef}&gt;
      &lt;span slot="trigger"&gt;Open dropdown&lt;/span&gt;
      &lt;p&gt;Dropdown content goes here&lt;/p&gt;
    &lt;/custom-dropdown&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-dropdown&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
  AuroDropdown.register('[custom]-dropdown');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-dropdown>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
  AuroDropdown.register('[custom]-dropdown');
&lt;/script&gt;
&lt;custom-dropdown&gt;
  &lt;span slot="trigger"&gt;Open dropdown&lt;/span&gt;
  &lt;p&gt;Dropdown content goes here&lt;/p&gt;
&lt;/custom-dropdown&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-dropdown>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-dropdown': Partial&lt;AuroDropdown&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroDropdown&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `disabled`, `chevron`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `auroDropdown-toggled` event on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let isOpen = $state(false);
​
  function handleToggle(e: Event) {
    isOpen = (e.target as HTMLElement &amp; { isPopoverVisible: boolean }).isPopoverVisible;
  }
&lt;/script&gt;
&lt;custom-dropdown on:auroDropdown-toggled={handleToggle}&gt;
  &lt;span slot="trigger"&gt;Open dropdown&lt;/span&gt;
  &lt;p&gt;Dropdown content goes here&lt;/p&gt;
&lt;/custom-dropdown&gt;
&lt;p&gt;Dropdown is {isOpen ? 'open' : 'closed'}&lt;/p&gt;</code></pre>

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
<p>The most basic use of <code>auro-dropdown</code> requires content in the default slot and a trigger element in the <code>trigger</code> slot. An accessible label must also be provided via <code>aria-label</code>, <code>aria-labelledby</code>, or the <code>label</code> slot.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotTrigger">Trigger</auro-header>
<p>The <code>trigger</code> slot defines the clickable element that toggles the dropdown bib. Any valid HTML can be placed in this slot.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-button.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-button.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
<auro-button slot="trigger">
Dropdown
</auro-button>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-button.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-button.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    &lt;auro-button slot="trigger"&gt;
      Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="slotHelpText">Help Text</auro-header>
<p>Content defined in the <code>helpText</code> slot will be rendered left aligned below the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
<!-- The below content is automatically added from ./../apiExamples/help-text.html -->
<auro-dropdown
aria-label="custom label"
inset
bordered
rounded>
Lorem ipsum solar
<span slot="helpText">
Helper text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/help-text.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded&gt;
  Lorem ipsum solar
  &lt;span slot="helpText"&gt;
    Helper text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="functions">Functions</auro-header>
<auro-header level="3" id="fnShow">show()</auro-header>
<p>Use the <code>show()</code> method to programmatically open the dropdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-show.html) -->
<!-- The below content is automatically added from ./../apiExamples/programmatically-show.html -->
<auro-input id="showExampleTriggerInput" required>
<span slot="label">Enter a value to show the dropdown</span>
</auro-input>
<br />
<auro-dropdown id="showMethodExample" aria-label="custom label" layout="classic" shape="classic" size="lg">
<p>
Lorem ipsum solar
</p>
<span slot="trigger">Trigger Label</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-show.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input id="showExampleTriggerInput" required&gt;
  &lt;span slot="label"&gt;Enter a value to show the dropdown&lt;/span&gt;
&lt;/auro-input&gt;
&lt;br /&gt;
&lt;auro-dropdown id="showMethodExample" aria-label="custom label" layout="classic" shape="classic" size="lg"&gt;
  &lt;p&gt;
    Lorem ipsum solar
  &lt;/p&gt;
  &lt;span slot="trigger"&gt;Trigger Label&lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-show.js -->
<pre class="language-js"><code class="language-js">export function showExample() {
  const triggerInput = document.querySelector('#showExampleTriggerInput');
  const dropdownElem = document.querySelector('#showMethodExample');
​
  triggerInput?.addEventListener('keydown', () =&gt; {
    dropdownElem?.show();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="fnHide">hide()</auro-header>
<p>Use the <code>hide()</code> method to programmatically close the dropdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-hide.html) -->
<!-- The below content is automatically added from ./../apiExamples/programmatically-hide.html -->
<auro-dropdown id="hideExample" aria-label="custom label" layout="classic" shape="classic" size="lg">
<p>
Lorem ipsum solar
</p>
<div style="padding: var(--ds-size-150);">
<auro-button id="hideExampleBtn">
Hide Dropdown
</auro-button>
</div>
<span slot="trigger">
Trigger
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-hide.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="hideExample" aria-label="custom label" layout="classic" shape="classic" size="lg"&gt;
  &lt;p&gt;
    Lorem ipsum solar
  &lt;/p&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    &lt;auro-button id="hideExampleBtn"&gt;
      Hide Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="trigger"&gt;
    Trigger
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-hide.js -->
<pre class="language-js"><code class="language-js">export function hideExample() {
  const btn = document.querySelector('#hideExampleBtn');
  const dropdown = document.querySelector('#hideExample');
​
  btn?.addEventListener('click', () =&gt; {
    dropdown?.hide();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
