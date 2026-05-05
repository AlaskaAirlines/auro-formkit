React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-counter&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

AuroCounter.register('[custom]-counter');
AuroCounterGroup.register('[custom]-counter-group');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCounter` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-counter>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-counter': React.HTMLAttributes<AuroCounter> & Partial<AuroCounter>;
      '[custom]-counter-group': React.HTMLAttributes<AuroCounterGroup> & Partial<AuroCounterGroup>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

function MyCounterGroup() {
  const groupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Counter value:', (el as any).value);
    };

    el.addEventListener('countChanged', handleInput);
    return () => el.removeEventListener('countChanged', handleInput);
  }, []);

  return (
    <custom-counter-group>
      <span slot="label">Passengers</span>
      <custom-counter ref={groupRef}>Adults</custom-counter>
      <custom-counter>Children</custom-counter>
    </custom-counter-group>
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
