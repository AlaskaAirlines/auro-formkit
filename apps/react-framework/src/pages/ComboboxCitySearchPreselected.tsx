import { useState } from 'react';
import { ComboboxFullWrapper } from './ComboboxCitySearchFull';

export default function ComboboxCitySearchPreselected() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: '1.5rem', maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button id="toggle" onClick={() => setShow((s) => !s)}>
          {show ? 'Hide' : 'Show'} Combobox
        </button>
      </div>
      {show && <ComboboxFullWrapper initialValue="SFO" initialTypedValue="" />}
    </div>
  );
}
