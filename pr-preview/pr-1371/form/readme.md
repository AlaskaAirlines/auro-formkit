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
`<auro-form>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) designed to
serve as the base logic for all auro-constructed forms.

It automatically "scrapes" its inner content for any auro form elements, and surfaces
them (along with events) to the parent form element as a JSON object.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeAddlInfo.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeAddlInfo.md -->
<!-- AURO-GENERATED-CONTENT This file is to be used for any additional content that should be included in the README.md which is specific to this component. -->
<!-- AURO-GENERATED-CONTENT:END -->

## Form Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `<auro-form>` element should be used in situations where users want to build HTML forms.
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
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-form/+esm"></script>
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

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

// Register with a custom name if desired
AuroForm.register('custom-form');
```

This will create a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, allowing both to coexist on the same page without interfering with each other.

### Using Custom-Named Child Form Elements

When consuming custom-named Auro form elements (like `auro-input` registered as `my-custom-input`),
these elements _must_ be registered BEFORE auro-form due to rendering order limitations.
Auro form elements are automatically recognized based on their tag name (e.g. `auro-input`) or special auro attributes which are only assigned during the initial render.

For example, the following is correct:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroInput.register('my-custom-input'); // adds an internal identifier auro-form uses to recognize the custom element
AuroForm.register(); // render looks for said identifier
```

The following is NOT correct and will result in forms not working as expected:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroForm.register(); // forms start rendering, looking for auro inputs, or custom-named inputs
AuroInput.register('my-custom-input'); // too late, form has already rendered and did not find the custom element
```
<!-- AURO-GENERATED-CONTENT:END -->
