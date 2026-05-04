<auro-header level="1" id="overview">Input - Getting Started</auro-header>
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
<auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-clear" class="level2 body-xs">ariaLabel.clear</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-password-show" class="level2 body-xs">ariaLabel.password.show</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-password-hide" class="level2 body-xs">ariaLabel.password.hide</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
<auro-anchorlink fluid href="#hasValue" class="level2 body-xs">hasValue</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
<auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
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
<pre class="language-js"><code class="language-js">// Import the class only
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
// Register with a custom name if desired
AuroInput.register('[custom]-input');</code></pre>

<p>This will create a new custom element <code>&lt;custom-input&gt;</code> that behaves exactly like <code>&lt;auro-input&gt;</code>, allowing both to coexist on the same page without interfering with each other.</p>
<pre class="language-html"><code class="language-html">&lt;custom-input&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/custom-input&gt;</code></pre>
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
<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3">Implementation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/defaultRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/defaultRegistration.md -->
<p>Once installed, the component can be used in your project by importing the component's registered module:</p>
<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-input';</code></pre>
<p>This import registers the <code>&lt;auro-input&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
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
<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-input/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-input&gt;</code> custom element globally. You can then use it in your HTML:</p>
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
</auro-accordion-group>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
AuroInput.register('[custom]-input');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroInput` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-input>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-input': React.HTMLAttributes&lt;AuroInput&gt; &amp; Partial&lt;AuroInput&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyInput() {
  const inputRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = inputRef.current;
    if (!el) return;
​
    const handleInput = () =&gt; {
      console.log('Current value:', (el as any).value);
    };
​
    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
​
  return (
    &lt;custom-input ref={inputRef}&gt;
      &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
    &lt;/custom-input&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
  AuroInput.register('[custom]-input');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-input>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
  AuroInput.register('[custom]-input');
​
  let inputValue = $state&lt;string&gt;('');
&lt;/script&gt;
&lt;custom-input value={inputValue}&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/custom-input&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-input>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-input': Partial&lt;AuroInput&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroInput&gt;;
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
&lt;custom-input oninput={handleInput}&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/custom-input&gt;
&lt;p&gt;Current value: {value}&lt;/p&gt;</code></pre>

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
        Every <code>&lt;auro-input&gt;</code> implementation requires a label in the <code>label</code> slot to provide an accessible label for the input element.

<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<p>The following named slots are available on the <code>&lt;auro-input&gt;</code> element.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Sets the label text for the input.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Sets the help text displayed below the input.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Allows overriding the optional display text <code>"(optional)"</code>, which appears next to the label.</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Allows custom HTML content to display in place of the value when the input is not focused.</p>
<auro-header level="3" id="slot-ariaLabel-clear">ariaLabel.clear</auro-header>
<p>Sets <code>aria-label</code> on the clear button for screen readers.</p>
<auro-header level="3" id="slot-ariaLabel-password-show">ariaLabel.password.show</auro-header>
<p>Sets <code>aria-label</code> on the password button to toggle on showing the password.</p>
<auro-header level="3" id="slot-ariaLabel-password-hide">ariaLabel.password.hide</auro-header>
<p>Sets <code>aria-label</code> on the password button to toggle off showing the password.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="hasFocus">hasFocus</auro-header>
<p>Returns <code>true</code> when the input element currently has focus.</p>
<auro-header level="3" id="hasValue">hasValue</auro-header>
<p>Returns <code>true</code> when the input element has a value.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
<auro-header level="3" id="value">value</auro-header>
<p>Gets or sets the current value of the input element.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-input&gt;</code> element.</p>
<auro-header level="3" id="clear">clear()</auro-header>
<p>Clears the current value of the input.</p>
<auro-header level="3" id="focus">focus()</auro-header>
<p>Programmatically moves focus to the input element.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the component to its initial state, clearing the value and validation state.</p>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
</section>
</div>
</div>
</div>
