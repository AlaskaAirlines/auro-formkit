<auro-header level="1" id="install">Install</auro-header>
<auro-header level="2" id="npmInstall">NPM Installation</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/componentInstall.md -->

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/auro-formkit</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="2" id="gettingStarted">Getting Started</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/gettingStarted.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/gettingStarted.md -->

### TypeScript Module Resolution

When using TypeScript set `moduleResolution` to `bundler`, add the following to your `tsconfig.json`:

<pre class="language-json"><code class="language-json">{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}</code></pre>

This configuration enables proper module resolution for the component's TypeScript files.
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="2" id="defaultSetup">Default Component Setup</auro-header>
Once installed, the component can be used in your project by importing the component's registered module:

<pre class="language-js"><code class="language-js">import '@aurodesignsystem/auro-formkit/auro-combobox';</code></pre>

This import registers the `<auro-combobox>` custom element globally. You can then use it in your HTML:

<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="label"&gt;Choose an option&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="option1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="option2"&gt;Option 2&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>

<auro-header level="2" id="cdn">Install from CDN</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/bundleInstallDescription.md) -->
<!-- The below content is automatically added from ./../../../docs/templates/bundleInstallDescription.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-combobox/+esm"&gt;&lt;/script&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="2" id="customRegistration">Custom Component Registration</auro-header>
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
