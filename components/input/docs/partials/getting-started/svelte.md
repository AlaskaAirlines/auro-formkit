Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

  AuroInput.register('[custom]-input');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-input>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

```html
<script lang="ts">
  import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

  AuroInput.register('[custom]-input');

  let inputValue = $state<string>('');
</script>
<custom-input value={inputValue}>
  <span slot="label">Enter your name</span>
</custom-input>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-input>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-input': Partial<AuroInput> & svelteHTML.HTMLAttributes<AuroInput>;
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
<custom-input oninput={handleInput}>
  <span slot="label">Enter your name</span>
</custom-input>
<p>Current value: {value}</p>
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
