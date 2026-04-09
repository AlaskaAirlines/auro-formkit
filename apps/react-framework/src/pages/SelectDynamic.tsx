import { useState, useEffect } from 'react';

const ALL_OPTIONS: [string, string][] = [
  ['foo', 'Foo'],
  ['bar', 'Bar'],
  ['baz', 'Baz'],
];

const INITIAL_VALUE = 'bar';

function SelectDynamicWrapper() {
  const [options, setOptions] = useState<[string, string][]>([]);

  useEffect(() => {
    // Simulate async option loading (e.g. an API call) arriving after the component mounts.
    const timer = setTimeout(() => {
      setOptions(ALL_OPTIONS);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <auro-select value={INITIAL_VALUE}>
      <auro-menu>
        {options.map(([value, label]) => (
          <auro-menuoption key={value} value={value}>{label}</auro-menuoption>
        ))}
      </auro-menu>
    </auro-select>
  );
}

export default function SelectDynamic() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Select
      </button>
      {show && <SelectDynamicWrapper />}
    </div>
  );
}
