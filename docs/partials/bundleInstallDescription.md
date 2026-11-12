When your project can't process JS assets, use the pre-processed assets instead. Legacy browsers, such as IE11, aren't supported.

Each component is imported individually by its export path:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-checkbox/+esm"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-input/+esm"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@latest/auro-select/+esm"></script>
```
