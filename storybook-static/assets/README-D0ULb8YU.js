import{j as o}from"./index-BlAcB6DZ.js";import{useMDXComponents as a}from"./index-DMGburbG.js";import{s as i}from"./radio-and-radio-group.stories-BwmcvmPH.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./lit-element-CzkqXGGu.js";import"./auro-radio-1hfMn5UE.js";import"./static-CzM4uoyW.js";import"./auro-radio-group-dwDWJf-r.js";import"./validation-DrYD_Tc9.js";import"./version-CcLPgAjI.js";import"./registered-DrZ9fufq.js";import"./auro-button-CvWxpTkj-B19uADyS.js";const d=`<!--
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
# Radio
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
\`<auro-radio>\` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) that is rendered as a small circle, which is filled or highlighted when selected. Only one \`<auro-radio>\` component in a given \`<auro-radio-group>\` can be selected at the same time.
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
// Registers <auro-radio> automatically
import '@aurodesignsystem/auro-formkit/auro-radio';
\`\`\`\r
\r
#### Custom Registration

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static \`AuroRadio.register('custom-radio')\` method on the component class and pass in a unique name.

\`\`\`javascript
// Import the class only
import { AuroRadio } from '@aurodesignsystem/auro-formkit/auro-radio/class';

// Register with a custom name if desired
AuroRadio.register('custom-radio');
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
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>\r
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
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-radio/+esm"><\/script>\r
\`\`\`\r
<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## UI development browser support
<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/browserSupport.md) -->
For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

<!-- AURO-GENERATED-CONTENT:END -->\r
\r
## auro-radio use cases
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The \`<auro-radio>\` element is designed to be a single component for the use of creating an input \`type="radio"\` with an associated \`<label>\` that meets all use case and accessibility standards.

The following examples illustrate fully functional \`<auro-radio>\` elements wrapped with the \`<auro-radio-group>\` element. The \`<auro-radio-group>\` element is REQUIRED in order to mantain the relationship between individual \`<auro-radio>\` elements for functional radio button actions.

**Note**: The \`<auro-radio>\` element is only for to for use as a set of two or more \`<auro-radio>\` elements within an \`<auro-radio-group>\` element.
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
`,o.jsx(n,{children:d})]})}function g(e={}){const{wrapper:n}={...a(),...e.components};return n?o.jsx(n,{...e,children:o.jsx(s,{...e})}):s(e)}function r(e,n){throw new Error("Expected component `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
