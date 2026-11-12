React 19 includes <a href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</a>, so <code>&lt;auro-input&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the component</auro-header>
Import and register the component at the top level of your application, such as in your root `main.tsx` or `App.tsx`:

```js
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

AuroInput.register('[custom]-input');
```

<auro-header level="3" id="reactTypeScript">TypeScript declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroInput` class. However, React's JSX doesn't automatically map custom element tag names to their types. To get type checking for `<auro-input>` in JSX, add the following declaration to a `.d.ts` file in your project:

```js
import type { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-input': React.HTMLAttributes<AuroInput> & Partial<AuroInput>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event handling</auro-header>
The input fires standard DOM events, such as `input`. Use a `ref` to attach event listeners in a `useEffect`:

```js
import { useRef, useEffect } from 'react';

function MyInput() {
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Current value:', (el as any).value);
    };

    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <custom-input ref={inputRef}>
      <span slot="label">Enter your name</span>
    </custom-input>
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
