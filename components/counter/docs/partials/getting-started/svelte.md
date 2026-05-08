Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-counter&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-counter-group>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
</script>
<custom-counter-group>
  <span slot="label">Passengers</span>
  <custom-counter>Adults</custom-counter>
  <custom-counter>Children</custom-counter>
</custom-counter-group>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-counter>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-counter': Partial<AuroCounter> & svelteHTML.HTMLAttributes<AuroCounter>;
    '[custom]-counter-group': Partial<AuroCounterGroup> & svelteHTML.HTMLAttributes<AuroCounterGroup>;
  }
}
```

This enables prop hinting for attributes like `value`, `min`, `max`, `disabled`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `countChanged` event on the element:

```html
<script lang="ts">
  let count = $state(0);

  function handleChange(e: Event) {
    count = (e.target as HTMLElement & { value: number }).value;
  }
</script>
<custom-counter on:countChanged={handleChange}>Adults</custom-counter>
<p>Count: {count}</p>
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
