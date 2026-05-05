React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-dropdown&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

AuroDropdown.register('[custom]-dropdown');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroDropdown` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-dropdown>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-dropdown': React.HTMLAttributes<AuroDropdown> & Partial<AuroDropdown>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

function MyDropdown() {
  const dropdownRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const handleToggle = () => {
      console.log('Dropdown toggled, isPopoverVisible:', (el as any).isPopoverVisible);
    };

    el.addEventListener('auroDropdown-toggled', handleToggle);
    return () => el.removeEventListener('auroDropdown-toggled', handleToggle);
  }, []);

  return (
    <custom-dropdown ref={dropdownRef}>
      <span slot="trigger">Open dropdown</span>
      <p>Dropdown content goes here</p>
    </custom-dropdown>
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
