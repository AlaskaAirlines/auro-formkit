<auro-header level="1" id="overview">Input: Getting started</auro-header>
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
<auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-clear" class="level2 body-xs">ariaLabel.clear</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-password-show" class="level2 body-xs">ariaLabel.password.show</auro-anchorlink>
<auro-anchorlink fluid href="#slot-ariaLabel-password-hide" class="level2 body-xs">ariaLabel.password.hide</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
<auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
<auro-anchorlink fluid href="#hasValue" class="level2 body-xs">hasValue</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
<auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
<auro-anchorlink fluid href="#auroInputUtilFormatIso" class="level2 body-xs">formatISODate()</auro-anchorlink>
<auro-anchorlink fluid href="#auroInputUtilToIso" class="level2 body-xs">toISOFormatString()</auro-anchorlink>
<auro-anchorlink fluid href="#auroInputUtilToFormattedValue" class="level2 body-xs">toFormattedValue()</auro-anchorlink>
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
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;// Register with a custom name if desired
AuroInput.register('[custom]-input');</code></pre>

<p>This creates a new custom element, such as <code>&lt;custom-input&gt;</code>, that behaves exactly like <code>&lt;auro-input&gt;</code>, allowing both to coexist on the same page without interfering with each other.</p>

<pre class="language-html"><code class="language-html">&lt;custom-input&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/custom-input&gt;</code></pre>
</auro-accordion>
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
<p>After you install the package, import the component's registered module:</p>

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-input';</code></pre>
<p>This import registers the <code>&lt;auro-input&gt;</code> custom element globally. Then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-input/+esm"&gt;&lt;/script&gt;</code></pre>
<p>This script registers the <code>&lt;auro-input&gt;</code> custom element globally. Then use it in your HTML:</p>

<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the component at the top level of your application, such as in your root `main.tsx` or `App.tsx`:

<pre class="language-js"><code class="language-js">import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;AuroInput.register('[custom]-input');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroInput` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for `<auro-input>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-input': React.HTMLAttributes&lt;AuroInput&gt; &amp; Partial&lt;AuroInput&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event handling</auro-header>
The input fires standard DOM events, such as `input`. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
&#10;function MyInput() {
  const inputRef = useRef&lt;HTMLElement&gt;(null);
&#10;  useEffect(() =&gt; {
    const el = inputRef.current;
    if (!el) return;
&#10;    const handleInput = () =&gt; {
      console.log('Current value:', (el as any).value);
    };
&#10;    el.addEventListener('input', handleInput);
    return () =&gt; el.removeEventListener('input', handleInput);
  }, []);
&#10;  return (
    &lt;custom-input ref={inputRef}&gt;
      &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
    &lt;/custom-input&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the component in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;  AuroInput.register('[custom]-input');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use `<auro-input>` directly in your Svelte template. Bind properties with standard Svelte attribute syntax:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;  AuroInput.register('[custom]-input');
&#10;  let inputValue = $state&lt;string&gt;('');
&lt;/script&gt;
&lt;custom-input value={inputValue}&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/custom-input&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-input>` props in templates, add the following to a `.d.ts` file in your project, such as `src/auro-elements.d.ts`:

<pre class="language-js"><code class="language-js">import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
&#10;declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-input': Partial&lt;AuroInput&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroInput&gt;;
  }
}</code></pre>

This turns on prop hints in Svelte templates for attributes, such as `value` and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
The input fires standard DOM events, such as `input`. Use the `oninput` handler directly on the element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let value = $state('');
&#10;  function handleInput(e: Event) {
    value = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-input oninput={handleInput}&gt;
  &lt;span slot="label"&gt;Enter your name&lt;/span&gt;
&lt;/custom-input&gt;
&lt;p&gt;Current value: {value}&lt;/p&gt;</code></pre>

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
<p>The field's label, which screen readers also announce as the field's name. Every input needs one.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Help text shown below the field, such as a hint about what to enter. An error message replaces it while the input is invalid. When the slot is empty, <code>password</code>, <code>email</code>, <code>credit-card</code>, and <code>tel</code> inputs show built-in help text.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Text shown after the label when the input isn't <code>required</code>, in place of the default " (optional)". To show nothing, put an empty element in the slot, such as <code>&lt;span slot="optionalLabel"&gt;&lt;/span&gt;</code>.</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Content shown in place of the value when the input has a value and doesn't have focus, such as a city name for an airport code. It also hides the label unless <code>dvInputOnly</code> is set.</p>
<auro-header level="3" id="slot-ariaLabel-clear">ariaLabel.clear</auro-header>
<p>Text screen readers announce for the clear button, for example "Clear full name". Defaults to "Clear Input".</p>
<auro-header level="3" id="slot-ariaLabel-password-show">ariaLabel.password.show</auro-header>
<p>Text screen readers announce for the button that shows the password, for example "Show password". Defaults to "Show Password".</p>
<auro-header level="3" id="slot-ariaLabel-password-hide">ariaLabel.password.hide</auro-header>
<p>Text screen readers announce for the button that hides the password, for example "Hide password". Defaults to "Hide Password".</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State management</auro-header>
<p>Read the following properties with JavaScript to get the component's current state. The component sets <code>hasFocus</code>, <code>hasValue</code>, and <code>validity</code> itself, so read them instead of setting them.</p>
<auro-header level="3" id="hasFocus">hasFocus</auro-header>
<p>Returns <code>true</code> when the input element currently has focus.</p>
<auro-header level="3" id="hasValue">hasValue</auro-header>
<p>Returns <code>true</code> when the input element has a value.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the result of the last validation as a string, such as <code>valid</code>, <code>valueMissing</code>, or <code>customError</code>. It's <code>undefined</code> until the input is first validated.</p>
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
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!">
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!"&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
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
<p>Validates the value and updates <code>validity</code> and <code>errorMessage</code>. Pass <code>true</code> to validate even while the input has focus or before the user has interacted with it. <code>noValidate</code> doesn't stop this method from validating.</p>
</section>
<section>
<auro-header level="3" id="auroInputUtil">AuroInputUtil</auro-header>
<p><code>AuroInputUtil</code> is a standalone utility exported from the package for working with date values. When <code>type="date"</code> uses a full date format, <code>.value</code> stores a valid, complete date as ISO (<code>YYYY-MM-DD</code>). Use these helpers to convert between ISO and any display format in your application.</p>
<auro-header level="4" id="auroInputUtilFormatIso">formatISODate(isoStr, format)</auro-header>
<p>Converts an ISO string from <code>.value</code> into a display format string, such as <code>01/15/2024</code>. Returns <code>undefined</code> for empty or invalid input.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.formatISODate('2024-01-15', 'dd/mm/yyyy'); // returns '15/01/2024'</code></pre>
<auro-header level="4" id="auroInputUtilToIso">toISOFormatString(date)</auro-header>
<p>Converts a <code>Date</code> instance to an ISO string you can use to set <code>input.value</code> in code. Throws an error when the argument isn't a valid <code>Date</code>.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toISOFormatString(new Date('2024/01/15')); // returns '2024-01-15'</code></pre>
<auro-header level="4" id="auroInputUtilToFormattedValue">toFormattedValue(valueObject, format)</auro-header>
<p>Converts a <code>Date</code> instance to a string in the given date format, such as <code>15/01/2024</code> for <code>dd/mm/yyyy</code>. Returns <code>undefined</code> when <code>valueObject</code> isn't a valid <code>Date</code> or <code>format</code> is empty.</p>
<p>Use it when an API needs the date in a specific format, whatever format the user typed it in.</p>
<ul>
<li><strong><code>valueObject</code></strong>: The <code>Date</code> to format, such as <code>input.valueObject</code>.</li>
<li><strong><code>format</code></strong>: The display format, such as <code>mm/dd/yyyy</code>.</li>
</ul>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toFormattedValue(auroInput.valueObject, 'dd/mm/yyyy'); // returns '15/01/2024' for an ISO value of '2024-01-15'</code></pre>
</section>
</div>
</div>
</div>
