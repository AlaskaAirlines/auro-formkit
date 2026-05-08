React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-select&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>

Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

AuroSelect.register('[custom]-select');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>

The component ships with TypeScript type definitions for the `AuroSelect` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-select>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-menu/auro-menu/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-select': React.HTMLAttributes<AuroSelect> & Partial<AuroSelect>;
      '[custom]-menu': React.HTMLAttributes<AuroMenu> & Partial<AuroMenu>;
      '[custom]-menuoption': React.HTMLAttributes<AuroMenuOption> & Partial<AuroMenuOption>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>

Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

const options = [
  { id: 'opt-1', value: 'stops', label: 'Stops' },
  { id: 'opt-2', value: 'price', label: 'Price' },
  { id: 'opt-3', value: 'duration', label: 'Duration' },
  { id: 'opt-4', value: 'departure', label: 'Departure' },
];

function MySelect() {
  const selectRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Selected value:', (el as any).value);
    };

    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <custom-select ref={selectRef}>
      <span slot="label">Choose an option</span>
      <custom-menu>
        {options.map(({ id, value, label }) => (
          <custom-menuoption key={id} value={value}>{label}</custom-menuoption>
        ))}
      </custom-menu>
    </custom-select>
  );
}
```

<auro-header level="3" id="reactModuleResolution">Module Resolution</auro-header>

Ensure your `tsconfig.json` uses `"moduleResolution": "bundler"` so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
