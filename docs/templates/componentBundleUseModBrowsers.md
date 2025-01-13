<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@[dtVersion]/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets@[wcssVersion]/dist/bundled/essentials.css" />

{{#each dependentComponents as |component|}}
<script src="https://cdn.jsdelivr.net/npm/[npm]/{{../monorepoName}}/[namespace]-{{component}}@{{../formkitVersion}}/dist/[namespace]-{{component}}__bundled.js" type="module"></script>
{{/each}}
