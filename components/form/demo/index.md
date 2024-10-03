<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->
<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Form

## Dropdown

<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/partials/description.md) -->
<!-- The below content is automatically added from ../docs/partials/description.md -->
`<auro-form>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of ...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis in tellus nec pellentesque. Integer bibendum ligula sit amet vehicula gravida. Maecenas accumsan, ligula vitae molestie iaculis, tellus mi laoreet ex [install instructions](https://auro.alaskaair.com/components/auro/button/install), ac malesuada velit dolor vel mi. Cras et rutrum urna. Sed mattis mi eu tortor ullamcorper, egestas bibendum mauris cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra eros eget neque commodo vulputate. In tempus eu velit at dictum.

Nulla at augue facilisis `odio lobortis` molestie vitae a nulla.
<!-- AURO-GENERATED-CONTENT:END -->
<auro-dropdown id="testing">
    <span slot="trigger">default 1</span>
    <span>this should go in the default slot</span>
</auro-dropdown>
<br /><br /><br />
<my-select></my-select>
<br /><br /><br /><br />

## Input

<auro-input required placeholder="John Doe">
    <span slot="label">Full name</span>
</auro-input>