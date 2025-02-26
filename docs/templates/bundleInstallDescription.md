In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Legacy browsers such as IE11 are no longer supported.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets/dist/bundled/essentials.css" />

<script type="module "src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/{{ monorepoName }}@{{ formkitVersion }}/{{ namespace }}-{{ name }}/+esm"></script>
```
