<auro-header level="1" id="overview">Radio - Getting Started</auro-header>
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
<auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-radio-group</auro-anchorlink>
<auro-anchorlink fluid href="#slot-legend" class="level2 body-xs">- legend</auro-anchorlink>
<auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
<auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">- optionalLabel</auro-anchorlink>
<auro-anchorlink fluid href="#slotsRadio" class="level2 body-xs">auro-radio</auro-anchorlink>
<auro-anchorlink fluid href="#slot-default-radio" class="level2 body-xs">- (default)</auro-anchorlink>
<auro-anchorlink fluid href="#slot-content" class="level2 body-xs">- content</auro-anchorlink>
<auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
<auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
<auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
<auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
<auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
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
<auro-header level="4" id="customRegistration">Custom Component Registration for Version Management</auro-header>
There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
// Register with a custom name if desired
AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');</code></pre>

This will create a new custom element `<custom-radio>` and `<custom-radio-group>` that behaves exactly like `<auro-radio>` and `<auro-radio-group>`, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom.html -->
<pre class="language-html"><code class="language-html">&lt;custom-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/custom-radio&gt;
  &lt;custom-radio id="customRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/custom-radio&gt;
  &lt;custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/custom-radio&gt;
&lt;/custom-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
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
Import the component and its dependencies, then register the custom elements:

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-radio';</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="radio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</auro-accordion>
<auro-accordion class="section" id="cdnAccordion">
<span slot="trigger">CDN Installation</span>
<div class="accordion-content">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/cdnRegistration.md -->
The radio components can be loaded via CDN without a build step:

<pre class="language-html"><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-radio/+esm" type="module"&gt;&lt;/script&gt;</code></pre>

Then use the elements in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="radio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
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
React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-radio&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

<pre class="language-js"><code class="language-js">import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
AuroRadio.register('[custom]-radio');
AuroRadioGroup.register('[custom]-radio-group');</code></pre>

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroRadio` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-radio>` in JSX, add the following declaration to a `.d.ts` file in your project:

<pre class="language-js"><code class="language-js">import type { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-radio': React.HTMLAttributes&lt;AuroRadio&gt; &amp; Partial&lt;AuroRadio&gt;;
      '[custom]-radio-group': React.HTMLAttributes&lt;AuroRadioGroup&gt; &amp; Partial&lt;AuroRadioGroup&gt;;
    }
  }
}</code></pre>

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

<pre class="language-js"><code class="language-js">import { useRef, useEffect } from 'react';
​
function MyRadioGroup() {
  const groupRef = useRef&lt;HTMLElement&gt;(null);
​
  useEffect(() =&gt; {
    const el = groupRef.current;
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
    &lt;custom-radio-group ref={groupRef}&gt;
      &lt;span slot="legend"&gt;Choose an option&lt;/span&gt;
      &lt;custom-radio value="yes" name="example" label="Yes"&gt;&lt;/custom-radio&gt;
      &lt;custom-radio value="no" name="example" label="No"&gt;&lt;/custom-radio&gt;
    &lt;/custom-radio-group&gt;
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
Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-radio&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
  AuroRadio.register('[custom]-radio');
  AuroRadioGroup.register('[custom]-radio-group');
&lt;/script&gt;</code></pre>

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-radio-group>` directly in your Svelte template:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
  AuroRadio.register('[custom]-radio');
  AuroRadioGroup.register('[custom]-radio-group');
&lt;/script&gt;
&lt;custom-radio-group&gt;
  &lt;span slot="legend"&gt;Choose an option&lt;/span&gt;
  &lt;custom-radio value="yes" name="example" label="Yes"&gt;&lt;/custom-radio&gt;
  &lt;custom-radio value="no" name="example" label="No"&gt;&lt;/custom-radio&gt;
&lt;/custom-radio-group&gt;</code></pre>

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-radio>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

<pre class="language-js"><code class="language-js">import type { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';
​
declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-radio': Partial&lt;AuroRadio&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroRadio&gt;;
    '[custom]-radio-group': Partial&lt;AuroRadioGroup&gt; &amp; svelteHTML.HTMLAttributes&lt;AuroRadioGroup&gt;;
  }
}</code></pre>

This enables prop hinting for attributes like `value`, `checked`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the group element:

<pre class="language-html"><code class="language-html">&lt;script lang="ts"&gt;
  let selected = $state('');
​
  function handleInput(e: Event) {
    selected = (e.target as HTMLElement &amp; { value: string }).value;
  }
&lt;/script&gt;
&lt;custom-radio-group oninput={handleInput}&gt;
  &lt;span slot="legend"&gt;Choose an option&lt;/span&gt;
  &lt;custom-radio value="yes" name="example" label="Yes"&gt;&lt;/custom-radio&gt;
  &lt;custom-radio value="no" name="example" label="No"&gt;&lt;/custom-radio&gt;
&lt;/custom-radio-group&gt;
&lt;p&gt;Selected: {selected}&lt;/p&gt;</code></pre>

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
<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>Every <code>&lt;auro-radio-group&gt;</code> implementation requires:</p>
<ol>
<li><strong>A legend in the <code>legend</code> slot</strong> — Provides an accessible label for the radio group.</li>
<li><strong>Two or more <code>&lt;auro-radio&gt;</code> elements</strong> — Each with a unique <code>value</code>, <code>name</code>, and <code>label</code> attribute.</li>
</ol>
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio value="yes" name="example" id="radio-ex1" label="Yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio value="no" name="example" id="radio-ex2" label="No"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
<!-- The below content is automatically added from ./../docs/partials/getting-started/slots.md -->
<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-radio-group Slots</auro-header>
<auro-header level="4" id="slot-legend">legend</auro-header>
<p>The <code>legend</code> slot provides an accessible label for the radio group. This is rendered inside a native <code>&lt;legend&gt;</code> element within the component's <code>&lt;fieldset&gt;</code>.</p>
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>The <code>helpText</code> slot allows custom help text to be displayed below the radio group.</p>
<auro-header level="4" id="slot-optionalLabel">optionalLabel</auro-header>
<p>The <code>optionalLabel</code> slot allows overriding the default <em>"(optional)"</em> text that appears next to the legend when the group is not required.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
<!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
<auro-radio-group>
<span slot="legend">Form label goes here</span>
<span slot="optionalLabel"> - custom optional flag</span>
<auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;span slot="optionalLabel"&gt; - custom optional flag&lt;/span&gt;
  &lt;auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="slotsRadio">auro-radio Slots</auro-header>
<auro-header level="4" id="slot-default-radio">(default)</auro-header>
<p>Default slot for the radio button label text. If content is placed inside the <code>&lt;auro-radio&gt;</code> element, it overrides the <code>label</code> attribute. This is useful for rich label content such as multiline text.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiline-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/multiline-group.html -->
<auro-radio-group>
<span slot="legend">Form label goes here</span>
<auro-radio id="basicGroupRadio1" label="Sample text" name="radioDemo" value="option1"></auro-radio>
<auro-radio id="basicGroupRadio2" label="This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines." name="radioDemo" value="option2"></auro-radio>
<auro-radio id="basicGroupRadio3" label="Sample text" name="radioDemo" value="option3"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiline-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multiline-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="basicGroupRadio1" label="Sample text" name="radioDemo" value="option1"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio2" label="This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines. This text is long enough to wrap onto multiple lines." name="radioDemo" value="option2"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio3" label="Sample text" name="radioDemo" value="option3"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-content">content</auro-header>
<p>Named slot for additional content rendered below the radio button label. Use this for supplementary information or descriptions associated with a radio option.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/content-slot.html) -->
<!-- The below content is automatically added from ./../apiExamples/content-slot.html -->
<auro-radio-group>
<span slot="legend">Choose your seat preference</span>
<auro-radio id="contentSlotRadio1" label="Window" name="seatPref" value="window">
Window Seat
<span slot="content">Best for views and resting against the wall</span>
</auro-radio>
<auro-radio id="contentSlotRadio2" label="Middle" name="seatPref" value="middle">
Middle Seat
<span slot="content">Sit between two fellow travelers</span>
</auro-radio>
<auro-radio id="contentSlotRadio3" label="Aisle" name="seatPref" value="aisle">
Aisle Seat
<span slot="content">Easy access to the aisle for stretching</span>
</auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/content-slot.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/content-slot.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Choose your seat preference&lt;/span&gt;
  &lt;auro-radio id="contentSlotRadio1" label="Window" name="seatPref" value="window"&gt;
    Window Seat
    &lt;span slot="content"&gt;Best for views and resting against the wall&lt;/span&gt;
  &lt;/auro-radio&gt;
  &lt;auro-radio id="contentSlotRadio2" label="Middle" name="seatPref" value="middle"&gt;
    Middle Seat
    &lt;span slot="content"&gt;Sit between two fellow travelers&lt;/span&gt;
  &lt;/auro-radio&gt;
  &lt;auro-radio id="contentSlotRadio3" label="Aisle" name="seatPref" value="aisle"&gt;
    Aisle Seat
    &lt;span slot="content"&gt;Easy access to the aisle for stretching&lt;/span&gt;
  &lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="stateManagement">State Management</auro-header>
<p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
<auro-header level="3" id="validity">validity</auro-header>
<p>Returns the current <code>validityState</code> of the radio group as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
</section>
<section>
<auro-header level="2" id="publicFunctions">Functions</auro-header>
<p>The following public methods are available on the <code>&lt;auro-radio-group&gt;</code> element.</p>
<auro-header level="3" id="reset">reset()</auro-header>
<p>Resets the radio group to its initial state, clearing the selected value and validation state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
<span slot="legend">Form label goes here</span>
<auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->
<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');
​
  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    elem.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="validate">validate()</auro-header>
<p>Triggers validation on the radio group. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
</section>
</div>
</div>
</div>
