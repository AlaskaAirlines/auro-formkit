import { useState } from 'react';

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
