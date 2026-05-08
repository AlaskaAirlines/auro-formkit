In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

Each component is imported individually by its export path:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-checkbox/+esm"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-input/+esm"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-select/+esm"></script>
```
