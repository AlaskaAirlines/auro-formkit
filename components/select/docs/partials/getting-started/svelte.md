Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-select&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>

Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroSelect.register('[custom]-select');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
</script>
```

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>

Use `<auro-select>` directly in your Svelte template. Bind properties with standard Svelte attribute syntax:

```html
<script lang="ts">
  import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroSelect.register('[custom]-select');
  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');

  const options: [string, string][] = [
    ['stops', 'Stops'],
    ['price', 'Price'],
    ['duration', 'Duration'],
  ];

  let selectValue = $state<string>(''); // Presets the value, but isn't reactive: it's a one-way binding.
</script>

<custom-select value={selectValue}>
  <span slot="label">Filter by</span>
  <custom-menu>
    {#each options as [value, label]}
      <custom-menuoption {value}>{label}</custom-menuoption>
    {/each}
  </custom-menu>
</custom-select>
```

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>

Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-select>` props in templates, add the following to a `.d.ts` file in your project (such as `src/auro-elements.d.ts`):

```js
import type { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-select': Partial<AuroSelect> & svelteHTML.HTMLAttributes<AuroSelect>;
    '[custom]-menu': Partial<AuroMenu> & svelteHTML.HTMLAttributes<AuroMenu>;
    '[custom]-menuoption': Partial<AuroMenuOption> & svelteHTML.HTMLAttributes<AuroMenuOption>;
  }
}
```

This turns on prop hints in Svelte templates for attributes such as `value`, `placeholder`, and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>

Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

```html
<script lang="ts">
  let value = $state('');

  function handleInput(e: Event) {
    value = (e.target as HTMLElement & { value: string }).value;
  }
</script>

<custom-select oninput={handleInput}>
  <span slot="label">Choose an option</span>
  <custom-menu>
    <custom-menuoption value="option1">Option 1</custom-menuoption>
    <custom-menuoption value="option2">Option 2</custom-menuoption>
  </custom-menu>
</custom-select>

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
