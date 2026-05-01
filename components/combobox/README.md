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

# Combobox

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
<p><code>&lt;auro-combobox&gt;</code> combines a text input with a filterable dropdown menu, letting users either type a value or pick one from a list. As the user types, the menu narrows to show only matching options.</p>
<p>The component supports two modes:</p>
<ul>
  <li><strong>Suggestion (default)</strong> — The user may type any value. The menu provides suggestions but does not restrict input.</li>
  <li><strong>Filter</strong> — The user must select from the menu. Typing filters the available options but does not set the component's value. The value is only set when a menu option is selected.</li>
</ul>
<p>Common use cases:</p>
<ul>
  <li><strong>Airport or city search</strong> — Type a city name or airport code to filter a long list of destinations.</li>
  <li><strong>Country or region selection</strong> — Quickly find and select from a large set of geographic options.</li>
  <li><strong>Autocomplete fields</strong> — Provide type-ahead suggestions for form fields where the set of valid values is known.</li>
  <li><strong>Search with suggestions</strong> — Offer recommended results while still allowing freeform input.</li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Combobox Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `<auro-combobox>` element should be used in situations where users may:

* Search
  * Airports: user looks for a specific airport by searching for the city name or airport code
  * Site wide: user searches for a topic site wide and combobox makes suggestions on searchable results
* Filter
  * Options: user chooses filters for their search by using combobox
* Select
  * Quantity: user types a quantity to select an option within a range (for example, the user may be limited to 2-34)
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
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/@latest/auro-combobox/+esm"></script>
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
// Import the class only
import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';

// Register with a custom name if desired
AuroCombobox.register('custom-combobox');
```

This will create a new custom element `<custom-combobox>` that behaves exactly like `<auro-combobox>`, allowing both to coexist on the same page without interfering with each other.

```html
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
```
<!-- AURO-GENERATED-CONTENT:END -->
