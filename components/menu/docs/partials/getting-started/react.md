React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-menu&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroMenu` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-menu>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
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

function MyMenu() {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const handleSelect = () => {
      console.log('Selected value:', (el as any).value);
    };

    el.addEventListener('selectedOption', handleSelect);
    return () => el.removeEventListener('selectedOption', handleSelect);
  }, []);

  return (
    <custom-menu ref={menuRef}>
      <custom-menuoption value="option1">Option 1</custom-menuoption>
      <custom-menuoption value="option2">Option 2</custom-menuoption>
      <custom-menuoption value="option3">Option 3</custom-menuoption>
    </custom-menu>
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
