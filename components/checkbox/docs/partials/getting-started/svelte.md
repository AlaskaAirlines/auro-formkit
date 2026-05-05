Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-checkbox&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

  AuroCheckbox.register('[custom]-checkbox');
  AuroCheckboxGroup.register('[custom]-checkbox-group');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-checkbox-group>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

  AuroCheckbox.register('[custom]-checkbox');
  AuroCheckboxGroup.register('[custom]-checkbox-group');
</script>
<custom-checkbox-group>
  <span slot="legend">Select options</span>
  <custom-checkbox value="option1" name="example">Option 1</custom-checkbox>
  <custom-checkbox value="option2" name="example">Option 2</custom-checkbox>
</custom-checkbox-group>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-checkbox>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-checkbox': Partial<AuroCheckbox> & svelteHTML.HTMLAttributes<AuroCheckbox>;
    '[custom]-checkbox-group': Partial<AuroCheckboxGroup> & svelteHTML.HTMLAttributes<AuroCheckboxGroup>;
  }
}
```

This enables prop hinting for attributes like `value`, `checked`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the group element:

```html
<script lang="ts">
  let values = $state<string[]>([]);

  function handleInput(e: Event) {
    values = (e.target as HTMLElement & { value: string[] }).value;
  }
</script>
<custom-checkbox-group oninput={handleInput}>
  <span slot="legend">Select options</span>
  <custom-checkbox value="option1" name="example">Option 1</custom-checkbox>
  <custom-checkbox value="option2" name="example">Option 2</custom-checkbox>
</custom-checkbox-group>
<p>Selected: {values}</p>
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
