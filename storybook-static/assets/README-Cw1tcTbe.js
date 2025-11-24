import{j as o}from"./index-BlAcB6DZ.js";import{useMDXComponents as a}from"./index-DMGburbG.js";import{s as i}from"./select.stories-DbaSMnYQ.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./storybook-utils-BWaCeRRT.js";import"./lit-element-CzkqXGGu.js";import"./static-CzM4uoyW.js";import"./async-directive-ByMGbIdb.js";import"./directive-helpers-BYhjznv8.js";import"./auroElement-CqxMywsH.js";import"./validation-DrYD_Tc9.js";import"./version-CcLPgAjI.js";import"./index-B1GZsKVb.js";import"./ref-3AivGw2q.js";import"./registered-DrZ9fufq.js";import"./auro-button-CvWxpTkj-B19uADyS.js";const l=`<!--
The README.md file is a compiled document. No edits should be made directly to this file.

README.md is created by running \`npm run build:docs\`.

This file is generated based on a template fetched from
\`../../docs/templates/componentReadmeTemplate.md\`
and copied to \`./componentDocs/README.md\` each time the docs are compiled.

The following sections are editable by making changes to the following files:

| SECTION                | DESCRIPTION                                       | FILE LOCATION                       |
|------------------------|---------------------------------------------------|-------------------------------------|
| Description            | Description of the component                      | \`./docs/partials/description.md\`    |
| Use Cases              | Examples for when to use this component           | \`./docs/partials/useCases.md\`       |
| Additional Information | For use to add any component specific information | \`./docs/partials/readmeAddlInfo.md\` |
| Component Example Code | HTML sample code of the components use            | \`./apiExamples/basic.html\`          |
-->\r
\r
# Select
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
\`<auro-select>\` is a combination <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">HTML custom element</auro-hyperlink> that consists of a pre-defined trigger element, \`<auro-menu>\` for the panel content. The \`<auro-select>\` element presents a menu of options. The options within the menu are represented by \`<auro-menu>\` and \`<auro-menuoption>\` elements. You can pre-select options for the user with the \`selected\` attribute as part of the \`<auro-menuoption>\` API.
<!-- AURO-GENERATED-CONTENT:END -->\r
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## Getting Started
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->\r
\r
#### NPM Installation

\`\`\`shell
$ npm i @aurodesignsystem/auro-formkit
\`\`\`
<!-- AURO-GENERATED-CONTENT:END -->\r
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/gettingStarted.md) -->
<!-- The below content is automatically added from ../../docs/templates/gettingStarted.md -->\r
\r
### Import Options\r
\r
#### Automatic Registration

For automatic registration, simply import the component:

\`\`\`javascript
// Registers <auro-select> automatically
import '@aurodesignsystem/auro-formkit/auro-select';
\`\`\`\r
\r
#### Custom Registration

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static \`AuroSelect.register('custom-select')\` method on the component class and pass in a unique name.

\`\`\`javascript
// Import the class only
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';

// Register with a custom name if desired
AuroSelect.register('custom-select');
\`\`\`\r
\r
#### TypeScript Module Resolution

When using TypeScript set \`moduleResolution\` to \`bundler\`, add the following to your \`tsconfig.json\`:

\`\`\`json
{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}
\`\`\`

This configuration enables proper module resolution for the component's TypeScript files.
<!-- AURO-GENERATED-CONTENT:END -->\r
**Reference component in HTML**

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./apiExamples/basic.html -->\r
\r
\`\`\`html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>\r
\`\`\`\r
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
### Design Token CSS Custom Property dependency

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/designTokens.md) -->
The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).

<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## Install from CDN
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/bundleInstallDescription.md) -->
<!-- The below content is automatically added from ../../docs/templates/bundleInstallDescription.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

\`\`\`html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-select/+esm"><\/script>\r
\`\`\`\r
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## UI development browser support
<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/browserSupport.md) -->
For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## auro-select use cases
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
See description.
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## Formkit development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/partials/developmentDescription.md) -->
<!-- The below content is automatically added from ../../docs/partials/developmentDescription.md -->\r
\r
### Filtering

Running the \`dev\` command will open a \`localhost\` development server for all components in the monorepo at once.

To only develop a single component, use the \`--filter\` flag:

\`\`\`shell
npx turbo dev --filter=@aurodesignsystem/auro-input
\`\`\`
<!-- AURO-GENERATED-CONTENT:END -->
`;function s(e){const{Markdown:n,Meta:t}={...a(),...e.components};return n||r("Markdown"),t||r("Meta"),o.jsxs(o.Fragment,{children:[o.jsx(t,{of:i}),`
`,o.jsx(n,{children:l})]})}function w(e={}){const{wrapper:n}={...a(),...e.components};return n?o.jsx(n,{...e,children:o.jsx(s,{...e})}):s(e)}function r(e,n){throw new Error("Expected component `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};
