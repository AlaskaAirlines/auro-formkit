Svelte has <a href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</a>, so <code>&lt;auro-dropdown&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the components in the `<script>` block:

```html
<script lang="ts">
  import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

  AuroDropdown.register('[custom]-dropdown');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-dropdown>` directly in your Svelte template:

```html
<script lang="ts">
  import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

  AuroDropdown.register('[custom]-dropdown');
</script>
<custom-dropdown>
  <span slot="trigger">Open dropdown</span>
  <p>Dropdown content goes here</p>
</custom-dropdown>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for `<auro-dropdown>` props in templates, add the following to a `.d.ts` file in your project (e.g. `src/auro-elements.d.ts`):

```js
import type { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-dropdown': Partial<AuroDropdown> & svelteHTML.HTMLAttributes<AuroDropdown>;
  }
}
```

This enables prop hinting for attributes like `disabled`, `chevron`, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Listen for the `auroDropdown-toggled` event on the element:

```html
<script lang="ts">
  let isOpen = $state(false);

  function handleToggle(e: Event) {
    isOpen = (e.target as HTMLElement & { isPopoverVisible: boolean }).isPopoverVisible;
  }
</script>
<custom-dropdown on:auroDropdown-toggled={handleToggle}>
  <span slot="trigger">Open dropdown</span>
  <p>Dropdown content goes here</p>
</custom-dropdown>
<p>Dropdown is {isOpen ? 'open' : 'closed'}</p>
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
