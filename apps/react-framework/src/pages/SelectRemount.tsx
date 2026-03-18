import { useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-select': React.HTMLAttributes<HTMLElement> & { value?: string };
      'auro-menu': React.HTMLAttributes<HTMLElement>;
      'auro-menuoption': React.HTMLAttributes<HTMLElement> & { value?: string };
    }
  }
}

const OPTIONS: [string, string][] = [
  ['foo', 'Foo'],
  ['bar', 'Bar'],
  ['baz', 'Baz'],
];

const INITIAL_VALUE = 'bar';

function SelectWrapper() {
  return (
    <auro-select value={INITIAL_VALUE}>
      <auro-menu>
        {OPTIONS.map(([value, label]) => (
          <auro-menuoption key={value} value={value}>{label}</auro-menuoption>
        ))}
      </auro-menu>
    </auro-select>
  );
}

export default function SelectRemount() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Select
      </button>
      {show && <SelectWrapper />}
    </div>
  );
}
