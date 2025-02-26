### Install

```shell
npm i @aurodesignsystem/auro-formkit
```

### Import

You can import the counter component in two ways:

#### Default Registration
For default registration, simply import the component:

```javascript
import '@aurodesignsystem/auro-formkit/auro-counter';
```

This will register both `<auro-counter>` and `<auro-counter-group>` custom elements.

#### Class Custom Registration
If you need to customize the element name or extend the class:

```javascript
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

// Optional: Register with custom names
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');
```

### Basic Usage

```html
<auro-counter-group>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
```

### Usage with Dropdown Mode

```html
<auro-counter-group isDropdown>
  <div slot="label">Passengers</div>
  <div slot="helpText">Select number of passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
```
