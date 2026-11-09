React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so the combobox works directly in JSX without any wrapper library. The examples below register it under a custom tag name, such as <code>&lt;custom-combobox&gt;</code>, and use that tag.

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the components at the top level of your application (for example, in your root `main.tsx` or `App.tsx`):

```js
import { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

AuroCombobox.register('[custom]-combobox');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCombobox` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for the combobox in JSX, add the following declaration to a `.d.ts` file in your project, replacing `[custom]` with the prefix you registered:

```js
import type { AuroCombobox } from '@aurodesignsystem/auro-formkit/auro-combobox/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-combobox': React.HTMLAttributes<AuroCombobox> & Partial<AuroCombobox>;
      '[custom]-menu': React.HTMLAttributes<AuroMenu> & Partial<AuroMenu>;
      '[custom]-menuoption': React.HTMLAttributes<AuroMenuOption> & Partial<AuroMenuOption>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

const options = [
  { id: 'opt-1', value: 'SEA', label: 'Seattle-Tacoma International' },
  { id: 'opt-2', value: 'LAX', label: 'Los Angeles International' },
  { id: 'opt-3', value: 'JFK', label: 'John F. Kennedy International' },
  { id: 'opt-4', value: 'ORD', label: "O'Hare International" },
];

function MyCombobox() {
  const comboboxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = comboboxRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Selected value:', (el as any).value);
    };

    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <custom-combobox ref={comboboxRef}>
      <span slot="bib.fullscreen.headline">Search airports</span>
      <span slot="label">Search airports</span>
      <span slot="ariaLabel.input.clear">Clear airport</span>
      <custom-menu>
        {options.map(({ id, value, label }) => (
          <custom-menuoption key={id} value={value}>{label}</custom-menuoption>
        ))}
        <custom-menuoption static nomatch>No matching airport</custom-menuoption>
      </custom-menu>
    </custom-combobox>
  );
}
```

<auro-header level="3" id="reactModuleResolution">Module resolution</auro-header>
Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
