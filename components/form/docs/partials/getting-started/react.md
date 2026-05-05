React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-form&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the components at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroForm.register('[custom]-form');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroForm` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for `<auro-form>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-form': React.HTMLAttributes<AuroForm> & Partial<AuroForm>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native `CustomEvent`s. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

function MyForm() {
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;

    const handleSubmit = (e: Event) => {
      console.log('Form values:', (e as CustomEvent).detail.value);
    };

    el.addEventListener('submit', handleSubmit);
    return () => el.removeEventListener('submit', handleSubmit);
  }, []);

  return (
    <custom-form ref={formRef}>
      {/* Add Auro form elements here */}
      <button type="submit">Submit</button>
    </custom-form>
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
