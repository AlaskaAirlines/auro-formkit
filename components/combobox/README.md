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
`<auro-combobox>` is the combination of [dropdown](http://auro.alaskaair.com/components/auro/dropdown), [input](http://auro.alaskaair.com/components/auro/input), and [menu](http://auro.alaskaair.com/components/auro/menu) and allows users to filter search results from a predefined list as they type. When the user starts typing in the text input, a dropdown of a menu shows up to display options that match the user’s search.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->

#### NPM Installation

```shell
$ npm i @aurodesignsystem/auro-formkit
```

**Required CSS Styles**

The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).

```shell
$ npm i @aurodesignsystem/design-tokens @aurodesignsystem/webcorestylesheets 
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/gettingStarted.md) -->
<!-- The below content is automatically added from ../../docs/templates/gettingStarted.md -->

### Import Options

**Required CSS Styles**

```css
// Include in global stylesheet

// baseline design css token variables
@import "@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

// essentials setup baseline primitive selectors for any UI development
@import '@aurodesignsystem/webcorestylesheets/src/essentials.css';
```

#### Automatic Registration

For automatic registration, simply import the component:

```javascript
// Registers <auro-combobox> automatically
import '@aurodesignsystem/auro-formkit/auro-combobox';
```

#### Custom Registration

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static `AuroCombobox.register('custom-combobox')` method on the component class and pass in a unique name.

```javascript
// Import the class only
import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';

// Register with a custom name if desired
AuroCombobox.register('custom-combobox');
```
<!-- AURO-GENERATED-CONTENT:END -->
**Reference component in HTML**

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./apiExamples/basic.html -->

```html
<auro-combobox>
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
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->

## Install from CDN
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/bundleInstallDescription.md) -->
<!-- The below content is automatically added from ../../docs/templates/bundleInstallDescription.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets/dist/bundled/essentials.css" />
<script type="module "src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@2.0.0-beta.52/auro-combobox/+esm"></script>
```
<!-- AURO-GENERATED-CONTENT:END -->

## UI development browser support
<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/browserSupport.md) -->
For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

<!-- AURO-GENERATED-CONTENT:END -->

## auro-combobox use cases
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
