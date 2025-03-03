### Import Options

#### Automatic Registration

For automatic registration, simply import the component:

```javascript
// Registers <{{ namespace }}-{{ name }}> automatically
import '@aurodesignsystem/auro-formkit/{{ namespace }}-{{ name }}';
```

#### Custom Registration

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our static `{{ capitalize namespace }}{{ capitalize name }}.register('custom-{{name}}')` method on the component class and pass in a unique name.

```javascript
// Import the class only
import { {{ capitalize namespace }}{{ capitalize name }} } from '@aurodesignsystem/auro-formkit/{{ namespace }}-{{ name }}/class';

// Register with a custom name if desired
{{ capitalize namespace }}{{ capitalize name }}.register('custom-{{name}}');
```

#### TypeScript Module Resolution

When using TypeScript set `moduleResolution` to `bundler`, add the following to your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}
```

This configuration enables proper module resolution for the component's TypeScript files.
