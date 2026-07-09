React 19 includes <auro-hyperlink href="https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements">native support for custom elements</auro-hyperlink>, so <code>&lt;auro-datepicker&gt;</code> works directly in JSX without any wrapper library.

<auro-header level="3" id="reactImport">Import the Component</auro-header>
Import and register the component at the top level of your application (e.g. in your root `main.tsx` or `App.tsx`):

```js
import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

AuroDatePicker.register('[custom]-datepicker');
```

<auro-header level="3" id="reactTypeScript">TypeScript Declarations</auro-header>
The component ships with TypeScript type definitions for the `AuroDatePicker` class. However, React's JSX does not automatically map custom element tag names to their types. To get type checking for <code>&lt;auro-datepicker&gt;</code> in JSX, add the following declaration to a <code>.d.ts</code> file in your project:

```js
import type { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      '[custom]-datepicker': React.HTMLAttributes<AuroDatePicker> & Partial<AuroDatePicker>;
    }
  }
}
```

<auro-header level="3" id="reactEvents">Event Handling</auro-header>
Auro components emit native <code>CustomEvent</code>s. Use a <code>ref</code> to attach event listeners in a <code>useEffect</code>:

```js
import { useRef, useEffect } from 'react';

function MyDatePicker() {
  const datepickerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = datepickerRef.current;
    if (!el) return;

    const handleInput = () => {
      console.log('Selected date:', (el as any).value);
    };

    el.addEventListener('input', handleInput);
    return () => el.removeEventListener('input', handleInput);
  }, []);

  return (
    <custom-datepicker ref={datepickerRef}>
      <span slot="fromLabel">Choose a date</span>
    </custom-datepicker>
  );
}
```

<auro-header level="3" id="reactModuleResolution">Module Resolution</auro-header>
Ensure your <code>tsconfig.json</code> uses <code>"moduleResolution": "bundler"</code> so TypeScript can resolve the component's package exports:

```js
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```
