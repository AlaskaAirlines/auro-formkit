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
<!-- The below content is automatically added from ./description.md -->
The `auro-dropdown` component is a trigger and dropdown element combination intended to be used with dropdown content that is interactive. `auro-dropdown` is content agnostic and any valid HTML can be placed in either the trigger or the dropdown.

_Note: if the dropdown content in your implementation is not interactive (e.g. a tooltip) [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs._
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