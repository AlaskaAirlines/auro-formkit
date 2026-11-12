Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-menu&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
</script>
```

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use `<auro-menu>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

  AuroMenu.register('[custom]-menu');
  AuroMenuOption.register('[custom]-menuoption');
</script>
<custom-menu>
  <custom-menuoption value="option1">Option 1</custom-menuoption>
  <custom-menuoption value="option2">Option 2</custom-menuoption>
  <custom-menuoption value="option3">Option 3</custom-menuoption>
</custom-menu>
```

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-menu>` props in templates, add the following to a `.d.ts` file in your project, such as `src/auro-elements.d.ts`:

```js
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-menu': Partial<AuroMenu> & svelteHTML.HTMLAttributes<AuroMenu>;
    '[custom]-menuoption': Partial<AuroMenuOption> & svelteHTML.HTMLAttributes<AuroMenuOption>;
  }
}
```

This enables prop hinting for attributes such as `value` and `disabled` directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `auroMenu-selectedOption` event on the element:

```html
<script lang="ts">
  let value = $state('');

  function handleSelect(e: Event) {
    value = (e.target as HTMLElement & { value: string }).value;
  }
</script>
<custom-menu on:auroMenu-selectedOption={handleSelect}>
  <custom-menuoption value="option1">Option 1</custom-menuoption>
  <custom-menuoption value="option2">Option 2</custom-menuoption>
</custom-menu>
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
