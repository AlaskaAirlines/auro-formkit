Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-radio&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

  AuroRadio.register('[custom]-radio');
  AuroRadioGroup.register('[custom]-radio-group');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-radio-group>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

  AuroRadio.register('[custom]-radio');
  AuroRadioGroup.register('[custom]-radio-group');
</script>
<custom-radio-group>
  <span slot="legend">Choose an option</span>
  <custom-radio value="yes" name="example" label="Yes"></custom-radio>
  <custom-radio value="no" name="example" label="No"></custom-radio>
</custom-radio-group>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-radio>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-radio': Partial<AuroRadio> & svelteHTML.HTMLAttributes<AuroRadio>;
    '[custom]-radio-group': Partial<AuroRadioGroup> & svelteHTML.HTMLAttributes<AuroRadioGroup>;
  }
}
```

This enables prop hinting for attributes like `value`, `checked`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the group element:

```html
<script lang="ts">
  let selected = $state('');

  function handleInput(e: Event) {
    selected = (e.target as HTMLElement & { value: string }).value;
  }
</script>
<custom-radio-group oninput={handleInput}>
  <span slot="legend">Choose an option</span>
  <custom-radio value="yes" name="example" label="Yes"></custom-radio>
  <custom-radio value="no" name="example" label="No"></custom-radio>
</custom-radio-group>
<p>Selected: {selected}</p>
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
