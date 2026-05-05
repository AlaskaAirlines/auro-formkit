React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-checkbox&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

AuroCheckbox.register('[custom]-checkbox');
AuroCheckboxGroup.register('[custom]-checkbox-group');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroCheckbox` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-checkbox>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-checkbox': React.HTMLAttributes<AuroCheckbox> & Partial<AuroCheckbox>;
      '[custom]-checkbox-group': React.HTMLAttributes<AuroCheckboxGroup> & Partial<AuroCheckboxGroup>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

function MyCheckboxGroup() {
  const groupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Selected values:', (el as any).value);
    };

    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <custom-checkbox-group ref={groupRef}>
      <span slot="legend">Select options</span>
      <custom-checkbox value="option1" name="example">Option 1</custom-checkbox>
      <custom-checkbox value="option2" name="example">Option 2</custom-checkbox>
    </custom-checkbox-group>
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
