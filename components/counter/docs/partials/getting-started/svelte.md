Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-counter&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
</script>
```

<auro-header level="3" id="svelteUsage">Basic usage</auro-header>
Use the elements you registered, such as `<custom-counter-group>`, directly in your Svelte template:

```html
<script lang="ts">
  import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

  AuroCounter.register('[custom]-counter');
  AuroCounterGroup.register('[custom]-counter-group');
</script>
<custom-counter-group>
  <custom-counter>
    Adults
    <span slot="ariaLabel.minus">Remove adult</span>
    <span slot="ariaLabel.plus">Add adult</span>
  </custom-counter>
  <custom-counter>
    Children
    <span slot="ariaLabel.minus">Remove child</span>
    <span slot="ariaLabel.plus">Add child</span>
  </custom-counter>
</custom-counter-group>
```

<auro-header level="3" id="svelteTypeScript">TypeScript declarations</auro-header>
Svelte doesn't automatically know about custom element attributes. To get autocomplete and type checking for `<auro-counter>` props in templates, add the following to a `.d.ts` file in your project (for example, `src/auro-elements.d.ts`):

```js
import type { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-counter': Partial<AuroCounter> & svelteHTML.HTMLAttributes<AuroCounter>;
    '[custom]-counter-group': Partial<AuroCounterGroup> & svelteHTML.HTMLAttributes<AuroCounterGroup>;
  }
}
```

This enables prop hinting in Svelte templates for attributes such as `value`, `min`, `max`, and `disabled`.

<auro-header level="3" id="svelteEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `input` event, which the counter fires whenever its value changes:

```html
<script lang="ts">
  let count = $state(0);

  function handleChange(e: Event) {
    count = (e.target as HTMLElement & { value: number }).value;
  }
</script>
<custom-counter on:input={handleChange}>
  Adults
  <span slot="ariaLabel.minus">Remove adult</span>
  <span slot="ariaLabel.plus">Add adult</span>
</custom-counter>
<p>Count: {count}</p>
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
