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

# Checkbox

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
`<auro-checkbox>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of allowing users to select one or more options of a limited number of choices.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Checkbox Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `<auro-checkbox>` element should be used in situations where users may:

* Be filling out a form
* Need to select one or more options
<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->

#### NPM Installation

```shell
$ npm i @aurodesignsystem/auro-formkit
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/gettingStarted.md) -->
<!-- The below content is automatically added from ../../docs/templates/gettingStarted.md -->

### TypeScript Module Resolution

When using TypeScript set `moduleResolution` to `bundler`, add the following to your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}
```

This configuration enables proper module resolution for the component's TypeScript files.
<!-- AURO-GENERATED-CONTENT:END -->

## Install from CDN

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/bundleInstallDescription.md) -->
<!-- The below content is automatically added from ../../docs/templates/bundleInstallDescription.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-checkbox/+esm"></script>
```
<!-- AURO-GENERATED-CONTENT:END -->

## Formkit Development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/partials/developmentDescription.md) -->
<!-- The below content is automatically added from ../../docs/partials/developmentDescription.md -->

### Filtering

Running the `dev` command will open a `localhost` development server for all components in the monorepo at once.

To only develop a single component, use the `--filter` flag:

```shell
npx turbo dev --filter=@aurodesignsystem/auro-input
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/customRegistration.md) -->
<!-- The below content is automatically added from ./docs/partials/customRegistration.md -->

## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This will create a new custom element `<custom-checkbox>` and `<custom-checkbox-group>` that behaves exactly like `<auro-checkbox>` and `<auro-checkbox-group>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
  <custom-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
  </custom-checkbox-group>
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

```html
  <custom-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
  </custom-checkbox-group>
```
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
