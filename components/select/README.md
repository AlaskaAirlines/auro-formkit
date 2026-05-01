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

# Select

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
<p>The component is a combination <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">HTML custom elements</auro-hyperlink> that consists of a pre-defined trigger element, <code>&lt;auro-menu&gt;</code> for the panel content. The <code>&lt;auro-select&gt;</code> element presents a menu of options. The options within the menu are represented by <code>&lt;auro-menu&gt;</code> and <code>&lt;auro-menuoption&gt;</code> elements. You can pre-select options for the user with the `selected` attribute as part of the <code>&lt;auro-menuoption&gt;</code> API.</p>
<p>The component is used to create a drop-down list for user input within a form. It acts as a container for options.</p>
<p>Key features:</p>
<ul>
  <li>Preset values</li>
  <li>Mark as required when in a form</li>
  <li>Disable individual options or the entire component</li>
  <li>Enable multi-select</li>
  <li>Separate options into groups with dividers</li>
  <li>Group options into nested levels</li>
  <li>Autocomplete</li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Select Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
See description.
<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->

```shell
$ npm i @aurodesignsystem/
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
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/@latest/auro-select/+esm"></script>
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the classes
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu } from '@aurodesignsystem/auro-formkit/auro-menu/class';
import { AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menuoption/class';

// Register each component with a custom name
AuroSelect.register('[custom]-select');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

The `<auro-menu>` and `<auro-menuoption>` components must also be custom registered when using a custom `<auro-select>` registration. All three components work together and need to be registered under the same custom naming convention.

This will create new custom elements that behave exactly like their standard counterparts, allowing both to coexist on the same page without interfering with each other.

```html
<custom-select placeholder="Placeholder Text" id="custom-select">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <custom-menu>
    <custom-menuoption value="stops">Stops</custom-menuoption>
    <custom-menuoption value="price">Price</custom-menuoption>
    <custom-menuoption value="duration">Duration</custom-menuoption>
    <custom-menuoption value="departure">Departure</custom-menuoption>
    <custom-menuoption value="arrival">Arrival</custom-menuoption>
    <custom-menuoption value="prefer alaska">Prefer Alaska</custom-menuoption>
  </custom-menu>
</custom-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
