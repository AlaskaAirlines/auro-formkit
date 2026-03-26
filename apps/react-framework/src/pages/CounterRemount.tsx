import { useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-counter-group': React.HTMLAttributes<HTMLElement> & {
        isDropdown?: boolean | '';
      };
      'auro-counter': React.HTMLAttributes<HTMLElement> & {
        value?: number;
        min?: number;
        max?: number;
      };
    }
  }
}

const INITIAL_VALUES = [2, 1, 0];

function CounterGroupWrapper() {
  return (
    <auro-counter-group isDropdown>
      <span slot="ariaLabel.bib.close">Close</span>
      <span slot="bib.fullscreen.headline">Passengers</span>
      <div slot="label">Passengers</div>
      <div slot="valueText">Open passengers</div>
      <auro-counter name="adults" value={String(INITIAL_VALUES[0])}>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter name="children" value={String(INITIAL_VALUES[1])}>
        Children
        <span slot="description">2–17 years</span>
      </auro-counter>
      <auro-counter name="infants" value={String(INITIAL_VALUES[2])}>
        Infants
        <span slot="description">Under 2 years</span>
      </auro-counter>
    </auro-counter-group>
  );
}

export default function CounterRemount() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Counter
      </button>
      {show && <CounterGroupWrapper />}
    </div>
  );
}
