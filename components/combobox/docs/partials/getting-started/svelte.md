Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so the combobox works directly in Svelte templates without any wrapper or configuration. The examples below register it under a custom tag name, such as <code>&lt;custom-combobox&gt;</code>, and use that tag.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
</script>
```

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use the combobox directly in your Svelte template, under the tag name you registered. Bind properties with standard Svelte attribute syntax:

```html
<script lang="ts">
  import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroCombobox.register('[custom]-combobox');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');

  const options: [string, string][] = [
    ['SEA', 'Seattle-Tacoma International'],
    ['LAX', 'Los Angeles International'],
    ['JFK', 'John F. Kennedy International'],
  ];

  let comboboxValue = $state<string>('');
</script>
<custom-combobox value={comboboxValue}>
  <span slot="bib.fullscreen.headline">Search airports</span>
  <span slot="label">Search airports</span>
  <span slot="ariaLabel.input.clear">Clear airport</span>
  <custom-menu>
    {#each options as [value, label]}
      <custom-menuoption {value}>{label}</custom-menuoption>
    {/each}
    <custom-menuoption static nomatch>No matching airport</custom-menuoption>
  </custom-menu>
</custom-combobox>
```

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for the combobox's props in templates, add the following to a `.d.ts` file in your project (such as `src/auro-elements.d.ts`), replacing `[custom]` with the prefix you registered:

```js
import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-combobox': Partial<AuroCombobox> & svelteHTML.HTMLAttributes<AuroCombobox>;
    '[custom]-menu': Partial<AuroMenu> & svelteHTML.HTMLAttributes<AuroMenu>;
    '[custom]-menuoption': Partial<AuroMenuOption> & svelteHTML.HTMLAttributes<AuroMenuOption>;
  }
}
```

This turns on prop hints in Svelte templates for attributes such as `value` and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

```html
<script lang="ts">
  let value = $state('');

  function handleInput(e: Event) {
    value = (e.target as HTMLElement & { value: string }).value;
  }
</script>
<custom-combobox oninput={handleInput}>
  <span slot="bib.fullscreen.headline">Search airports</span>
  <span slot="label">Search airports</span>
  <span slot="ariaLabel.input.clear">Clear airport</span>
  <custom-menu>
    <custom-menuoption value="SEA">Seattle-Tacoma International</custom-menuoption>
    <custom-menuoption value="LAX">Los Angeles International</custom-menuoption>
    <custom-menuoption static nomatch>No matching airport</custom-menuoption>
  </custom-menu>
</custom-combobox>
<p>Selected: {value}</p>
```

<auro-header level="3" id="svelteModuleResolution">Module resolution</auro-header>
Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
