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

# Menu

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
The <code>&lt;auro-menu&gt;</code> element provides a list of options for a user to select from.

A list of options is created within the <code>&lt;slot&gt;</code> of the <code>&lt;auro-menu&gt;</code> element by using the <code>&lt;auro-menuoption&gt;</code> element to define options. Use a standard <code>&lt;hr&gt;</code> element to create dividers within the list of options.

The <code>&lt;auro-menu&gt;</code> element is designed for contextual menus, e.g. a dropdown menus. They are not intended to be used for navigation menus which have a different semantic meaning. The <code>&lt;auro-menu&gt;</code> element does not support hide/show functionality within its scope. This functionality will be managed by a wrapping element such as a drop-down menu composite element.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Menu Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The <code>&lt;auro-menu&gt;</code> element is not intended for stand-alone use. It serves as the options list within <auro-hyperlink href="https://auro.alaskaair.com/components/auro/select" target="_blank">auro-select</auro-hyperlink> and <auro-hyperlink href="https://auro.alaskaair.com/components/auro/combobox" target="_blank">auro-combobox</auro-hyperlink>. Refer to those components for use cases and implementation guidance.
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

<pre class="language-html"><code class="language-html">&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-menu/+esm"&gt;&lt;/script&gt;</code></pre>
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
