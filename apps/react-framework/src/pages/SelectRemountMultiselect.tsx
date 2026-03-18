import { useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-select': React.HTMLAttributes<HTMLElement> & { value?: string; multiselect?: boolean };
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

const INITIAL_VALUE = '["foo","bar"]';

function SelectWrapper() {
  return (
    <auro-select multiselect value={INITIAL_VALUE}>
      <auro-menu>
        {OPTIONS.map(([value, label]) => (
          <auro-menuoption key={value} value={value}>{label}</auro-menuoption>
        ))}
      </auro-menu>
    </auro-select>
  );
}

export default function SelectRemountMultiselect() {
  const [show, setShow] = useState(true);

  function setInvalidValue() {
    const el = document.querySelector('auro-select') as any;
    if (el) el.value = '["invalid-option"]';
  }

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Select
      </button>
      <button id="set-invalid" onClick={setInvalidValue}>Set Invalid Value</button>
      {show && <SelectWrapper />}
    </div>
  );
}
