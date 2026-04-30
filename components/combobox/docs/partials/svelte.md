Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-combobox&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
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

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-combobox>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

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
  <span slot="label">Search airports</span>
  <custom-menu>
    {#each options as [value, label]}
      <custom-menuoption {value}>{label}</custom-menuoption>
    {/each}
    <custom-menuoption static nomatch>No matching airport</custom-menuoption>
  </custom-menu>
</custom-combobox>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-combobox>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

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

This enables prop hinting for attributes like `value`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

```html
<script lang="ts">
  let value = $state('');

  function handleInput(e: Event) {
    value = (e.target as HTMLElement & { value: string }).value;
  }
</script>
<custom-combobox oninput={handleInput}>
  <span slot="label">Search airports</span>
  <custom-menu>
    <custom-menuoption value="SEA">Seattle-Tacoma International</custom-menuoption>
    <custom-menuoption value="LAX">Los Angeles International</custom-menuoption>
    <custom-menuoption static nomatch>No matching airport</custom-menuoption>
  </custom-menu>
</custom-combobox>
<p>Selected: {value}</p>
```

<auro-header level="3" id="svelteModuleResolution">Module Resolution</auro-header>
Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
