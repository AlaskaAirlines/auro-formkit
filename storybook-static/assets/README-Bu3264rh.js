import{j as o}from"./index-BlAcB6DZ.js";import{useMDXComponents as i}from"./index-DMGburbG.js";import{s as a}from"./dropdown.stories-_ceEUHdZ.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./storybook-utils-BWaCeRRT.js";import"./lit-element-CzkqXGGu.js";import"./static-CzM4uoyW.js";import"./async-directive-ByMGbIdb.js";import"./directive-helpers-BYhjznv8.js";import"./ref-3AivGw2q.js";import"./version-CcLPgAjI.js";import"./auro-icon-CNMF0wKG-vCjlPHA5.js";import"./auroElement-CqxMywsH.js";import"./registered-DrZ9fufq.js";import"./auro-button-CvWxpTkj-B19uADyS.js";import"./registered-BmRy1yHw.js";import"./index-CXFB-ZtJ.js";import"./repeat-NDFA8eVF.js";const d=`<!--
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
# Dropdown
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
The \`auro-dropdown\` component is a trigger and dropdown element combination intended to be used with dropdown content that is interactive. \`auro-dropdown\` is content agnostic and any valid HTML can be placed in either the trigger or the dropdown.\r
\r
_Note: if the dropdown content in your implementation is not interactive (e.g. a tooltip) [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs._
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
// Registers <auro-dropdown> automatically
import '@aurodesignsystem/auro-formkit/auro-dropdown';
\`\`\`\r
\r
#### Custom Registration

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static \`AuroDropdown.register('custom-dropdown')\` method on the component class and pass in a unique name.

\`\`\`javascript
// Import the class only
import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

// Register with a custom name if desired
AuroDropdown.register('custom-dropdown');
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
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>\r
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
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-dropdown/+esm"><\/script>\r
\`\`\`\r
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## UI development browser support
<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/browserSupport.md) -->
For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## auro-dropdown use cases
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The \`auro-dropdown\` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when interactive help is required
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
`;function r(n){const{Markdown:e,Meta:t}={...i(),...n.components};return e||s("Markdown"),t||s("Meta"),o.jsxs(o.Fragment,{children:[o.jsx(t,{of:a}),`
`,o.jsx(e,{children:d})]})}function C(n={}){const{wrapper:e}={...i(),...n.components};return e?o.jsx(e,{...n,children:o.jsx(r,{...n})}):r(n)}function s(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};
