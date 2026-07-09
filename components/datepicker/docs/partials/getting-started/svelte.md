Svelte has <auro-hyperlink href="https://svelte.dev/docs/svelte/custom-elements">native support for custom elements</auro-hyperlink>, so <code>&lt;auro-datepicker&gt;</code> works directly in Svelte templates without any wrapper or configuration.

<auro-header level="3" id="svelteImport">Import the Component</auro-header>
Import and register the component in the <code>&lt;script&gt;</code> block:

```html
<script lang="ts">
  import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

  AuroDatePicker.register('[custom]-datepicker');
</script>
```

<auro-header level="3" id="svelteUsage">Basic Usage</auro-header>
Use `<auro-datepicker>` directly in your Svelte template. Properties can be bound using standard Svelte attribute syntax:

```html
<script lang="ts">
  import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

  AuroDatePicker.register('[custom]-datepicker');

  let datepickerValue = $state<string>('');
</script>
<custom-datepicker value={datepickerValue}>
  <span slot="fromLabel">Choose a date</span>
</custom-datepicker>
```

<auro-header level="3" id="svelteTypeScript">TypeScript Declarations</auro-header>
Svelte does not automatically know about custom element attributes. To get autocomplete and type checking for <code>&lt;auro-datepicker&gt;</code> props in templates, add the following to a <code>.d.ts</code> file in your project (e.g. <code>src/auro-elements.d.ts</code>):

```js
import type { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

declare namespace svelteHTML {
  interface IntrinsicElements {
    '[custom]-datepicker': Partial<AuroDatePicker> & svelteHTML.HTMLAttributes<AuroDatePicker>;
  }
}
```

This enables prop hinting for attributes like <code>value</code>, <code>range</code>, <code>disabled</code>, and others directly in Svelte templates.

<auro-header level="3" id="svelteEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use the `oninput` handler directly on the element:

```html
<script lang="ts">
  let value = $state('');

  function handleInput(e: Event) {
    value = (e.target as HTMLElement & { value: string }).value;
  }
</script>
<custom-datepicker oninput={handleInput}>
  <span slot="fromLabel">Choose a date</span>
</custom-datepicker>
<p>Selected: {value}</p>
```

<auro-header level="3" id="svelteModuleResolution">Module Resolution</auro-header>
Ensure your <code>tsconfig.json</code> uses <code>"moduleResolution": "bundler"</code> so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
