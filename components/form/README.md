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

# Form

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
`<auro-form>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of ...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis in tellus nec pellentesque. Integer bibendum ligula sit amet vehicula gravida. Maecenas accumsan, ligula vitae molestie iaculis, tellus mi laoreet ex [install instructions](https://auro.alaskaair.com/components/auro/button/install), ac malesuada velit dolor vel mi. Cras et rutrum urna. Sed mattis mi eu tortor ullamcorper, egestas bibendum mauris cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra eros eget neque commodo vulputate. In tempus eu velit at dictum.

Nulla at augue facilisis `odio lobortis` molestie vitae a nulla.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## UI development browser support

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/browserSupport.md) -->
For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

<!-- AURO-GENERATED-CONTENT:END -->

## Install

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentInstall.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentInstall.md -->

```shell
$ npm i @aurodesignsystem/auro-formkit
```
<!-- AURO-GENERATED-CONTENT:END -->

### Design Token CSS Custom Property dependency

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/designTokens.md) -->
The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).

<!-- AURO-GENERATED-CONTENT:END -->

### Define dependency in project component

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/usage/componentImportDescription.md) -->
Defining the component dependency within each component that is using the `<auro-form>` component.

<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentUsage.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentUsage.md -->

```js
import "@aurodesignsystem/auro-formkit/auro-form";
```
<!-- AURO-GENERATED-CONTENT:END -->
**Reference component in HTML**

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./apiExamples/basic.html -->

```html
<auro-form>
  <auro-input>
      <span slot="label">Hello World</span>
  </auro-input>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->

## Install bundled assets from CDN

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/usage/bundleInstallDescription.md) -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use. See -- `auro-form__bundled.js` for modern browsers. Legacy browsers such as IE11 are no longer supported.

**WARNING!** When installing into your application environment, DO NOT use `@latest` for the requested version. Risks include unknown MAJOR version releases and instant adoption of any new features and possible bugs without developer knowledge. The `@latest` wildcard should NEVER be used for production customer-facing applications. You have been warned.

<!-- AURO-GENERATED-CONTENT:END -->

### Bundle example code

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../../docs/templates/componentBundleUseModBrowsers.md) -->
<!-- The below content is automatically added from ../../docs/templates/componentBundleUseModBrowsers.md -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@4.13.0/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets@5.1.2/dist/bundled/essentials.css" />
<script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit/auro-form@2.0.0-beta.45/dist/auro-form__bundled.js" type="module"></script>
<!-- AURO-GENERATED-CONTENT:END -->

## auro-form use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `<auro-form>` element should be used in situations where users may:

* ...
* ...
* ...
<!-- AURO-GENERATED-CONTENT:END -->

## API Code Examples

### Default auro-form

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./apiExamples/basic.html -->

```html
<auro-form>
  <auro-input>
      <span slot="label">Hello World</span>
  </auro-input>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->

## Development

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/developmentDescription.md) -->
In order to develop against this project, if you are not part of the core team, you will be required to fork the project prior to submitting a pull request.

Please be sure to review the [contribution guidelines](https://auro.alaskaair.com/contributing) for this project. Please make sure to **pay special attention** to the **conventional commits** section of the document.

<!-- AURO-GENERATED-CONTENT:END -->

### Start development environment

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/localhost.md) -->
Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open a shell session to run the **dev server**.

```shell
$ npm run dev
```

Open [localhost:8000](http://localhost:8000/)

If running separate sessions is preferred, please run the following commands in individual terminal shells.

```shell
$ npm run build:watch

$ npm run serve
```

<!-- AURO-GENERATED-CONTENT:END -->

### API generation

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/api.md) -->
The custom element API file is generated in the build and committed back to the repo with a version change. If the API doc has changed without a version change, author's are to run `npm run build:api` to generate the doc and commit to version control.

<!-- AURO-GENERATED-CONTENT:END -->

### Testing

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/testing.md) -->
Automated tests are required for every Auro component. See `.\test\auro-form.test.js` for the tests for this component. Run `npm test` to run the tests and check code coverage. Tests must pass and meet a certain coverage threshold to commit. See [the testing documentation](https://auro.alaskaair.com/support/tests) for more details.

<!-- AURO-GENERATED-CONTENT:END -->

### Bundled assets

<!-- AURO-GENERATED-CONTENT:START (REMOTE:url=https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/partials/development/bundles.md) -->
Bundled assets are only generated in the remote and not merged back to this repo. To review and/or test a bundled asset locally, run `$ npm run bundler` to generate assets.

<!-- AURO-GENERATED-CONTENT:END -->
