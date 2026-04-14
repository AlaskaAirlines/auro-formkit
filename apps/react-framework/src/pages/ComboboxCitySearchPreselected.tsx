import { useState } from 'react';
import { ComboboxFullWrapper } from './ComboboxCitySearchFull';

export default function ComboboxCitySearchPreselected() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: '1.5rem', maxWidth: '600px' }}>
      <h2 style={{ margin: '0 0 0.75rem' }}>Combobox: Full Planbook Config — Preselected Destination</h2>
      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 1rem' }}>
        Same as the full-options page but with <code>value="SFO"</code> set on load and an empty typed value.<br />
        Mirrors destination rehydration where code is preselected before user interaction.
      </p>
      <div style={{ marginBottom: '1rem' }}>
        <button id="toggle" onClick={() => setShow((s) => !s)}>
          {show ? 'Hide' : 'Show'} Combobox
        </button>
      </div>
      {show && <ComboboxFullWrapper initialValue="SFO" initialTypedValue="" />}
    </div>
  );
}
