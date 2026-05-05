Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-form&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

  AuroForm.register('[custom]-form');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-form>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

  AuroForm.register('[custom]-form');
</script>
<custom-form>
  <!-- Add Auro form elements here -->
  <button type="submit">Submit</button>
</custom-form>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-form>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-form': Partial<AuroForm> & svelteHTML.HTMLAttributes<AuroForm>;
  }
}
```

This enables prop hinting for attributes like `disabled` and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `submit` and `reset` events on the element:

```html
<script lang="ts">
  function handleSubmit(e: Event) {
    console.log('Form values:', (e as CustomEvent).detail.value);
  }
</script>
<custom-form on:submit={handleSubmit}>
  <!-- Add Auro form elements here -->
  <button type="submit">Submit</button>
</custom-form>
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
