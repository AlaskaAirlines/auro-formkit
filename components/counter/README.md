<!--
The README.md file is a compiled document. No edits should be made directly to this file.

README.md is created by running `npm run build:docs`.

This file is generated based on a template fetched from
`../../docs/templates/componentReadmeTemplate.md`
and copied to `./componentDocs/README.md` each time the docs are compiled.

The following sections are editable by making changes to the following files:

| SECTION                | DESCRIPTION                                       | FILE LOCATION                       |
|------------------------|---------------------------------------------------|-------------------------------------|
| Description            | Description of the component                      | `./docs/partials/description.md`    |
| Use Cases              | Examples for when to use this component           | `./docs/partials/useCases.md`       |
| Additional Information | For use to add any component specific information | `./docs/partials/readmeAddlInfo.md` |
| Component Example Code | HTML sample code of the components use            | `./apiExamples/basic.html`          |
-->

# Counter

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
The `auro-counter` component is a ui element that enables a way to increment or decrement a single digit value. Common use case is inside the `auro-counter-group` to facilitate a collection of counters to add passenger types to a flight.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Counter Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `auro-counter` element should be used in situations where users may:

* Need to input a numeric value within a defined range
* Need a user-friendly interface for quantity selection
<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->

<pre class="language-shell"><code class="language-shell">$ npm i @aurodesignsystem/auro-formkit</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/gettingStarted.md) -->
<!-- The below content is automatically added from ../../docs/templates/gettingStarted.md -->

### TypeScript Module Resolution

When using TypeScript set `moduleResolution` to `bundler`, add the following to your `tsconfig.json`:

<pre class="language-json"><code class="language-json">{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}</code></pre>

This configuration enables proper module resolution for the component's TypeScript files.
<!-- AURO-GENERATED-CONTENT:END -->

## Install from CDN

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/bundleInstallDescription.md) -->
<!-- The below content is automatically added from ../../docs/templates/bundleInstallDescription.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-counter/+esm"&gt;&lt;/script&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->

## Formkit Development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/partials/developmentDescription.md) -->
<!-- The below content is automatically added from ../../docs/partials/developmentDescription.md -->

### Filtering

Running the `dev` command will open a `localhost` development server for all components in the monorepo at once.

To only develop a single component, use the `--filter` flag:

<pre class="language-shell"><code class="language-shell">npx turbo dev --filter=@aurodesignsystem/auro-input</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/customRegistration.md) -->
<!-- The below content is automatically added from ./docs/partials/customRegistration.md -->

## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

<pre class="language-js"><code class="language-js">// Import the class only
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';
​
// Register with a custom name if desired
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');</code></pre>

This will create a new custom element `<custom-counter>` and `<custom-counter-group>` that behaves exactly like `<auro-counter>` and `<auro-counter-group>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
<custom-counter-group>
<div slot="bib.fullscreen.headline">Passengers</div>
<div slot="label">Passengers</div>
<custom-counter>
Adults
<span slot="description">18 years or older</span>
</custom-counter>
<custom-counter>
Children
<span slot="description">2-17 years</span>
</custom-counter>
</custom-counter-group>
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>

<pre class="language-html"><code class="language-html">  &lt;custom-counter-group&gt;
    &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
    &lt;div slot="label"&gt;Passengers&lt;/div&gt;
    &lt;custom-counter&gt;
      Adults
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/custom-counter&gt;
    &lt;custom-counter&gt;
      Children
      &lt;span slot="description"&gt;2-17 years&lt;/span&gt;
    &lt;/custom-counter&gt;
  &lt;/custom-counter-group&gt;
​
```html
  &lt;custom-checkbox-group&gt;
    &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
    &lt;custom-checkbox value="value1" name="custom" id="checkbox-custom1"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
    &lt;custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked&gt;Custom checkbox option&lt;/custom-checkbox&gt;
    &lt;custom-checkbox value="value3" name="custom" id="checkbox-custom3"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
    &lt;custom-checkbox value="value4" name="custom" id="checkbox-custom4"&gt;Custom checkbox option&lt;/custom-checkbox&gt;
  &lt;/custom-checkbox-group&gt;</code></pre>
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
