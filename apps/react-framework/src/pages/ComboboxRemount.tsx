import { useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-combobox': React.HTMLAttributes<HTMLElement> & { value?: string; behavior?: string };
      'auro-menu': React.HTMLAttributes<HTMLElement>;
      'auro-menuoption': React.HTMLAttributes<HTMLElement> & { value?: string };
    }
  }
}

const OPTIONS: [string, string][] = [
  ['Apples', 'Apples'],
  ['Oranges', 'Oranges'],
  ['Peaches', 'Peaches'],
  ['Grapes', 'Grapes'],
];

const INITIAL_VALUE = 'Apples';

function ComboboxWrapper() {
  return (
    <auro-combobox behavior="filter" value={INITIAL_VALUE}>
      <auro-menu>
        {OPTIONS.map(([value, label]) => (
          <auro-menuoption key={value} value={value}>{label}</auro-menuoption>
        ))}
      </auro-menu>
    </auro-combobox>
  );
}

export default function ComboboxRemount() {
  const [show, setShow] = useState(true);

  function setInvalidValue() {
    const el = document.querySelector('auro-combobox') as any;
    if (el) el.value = 'invalid-option';
  }

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Combobox
      </button>
      <button id="set-invalid" onClick={setInvalidValue}>Set Invalid Value</button>
      {show && <ComboboxWrapper />}
    </div>
  );
}
