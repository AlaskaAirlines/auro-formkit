import { useState } from 'react';

const INITIAL_VALUE = 3;

function CounterWrapper() {
  return (
    <auro-counter value={String(INITIAL_VALUE)} min="0" max="9">
      Bags
      <span slot="description">Number of checked bags</span>
    </auro-counter>
  );
}

export default function SingleCounterRemount() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Counter
      </button>
      {show && <CounterWrapper />}
    </div>
  );
}
