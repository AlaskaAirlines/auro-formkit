declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-counter-group': React.HTMLAttributes<HTMLElement> & {
        isDropdown?: boolean | '';
        min?: string | number;
        max?: string | number;
      };
      'auro-counter': React.HTMLAttributes<HTMLElement> & {
        min?: string | number;
        max?: string | number;
      };
    }
  }
}

export default function CounterDropdown() {
  return (
    <div>
      <auro-counter-group isDropdown>
        <span slot="ariaLabel.bib.close">Close</span>
        <span slot="bib.fullscreen.headline">Passengers</span>
        <div slot="label">Passengers</div>
        <auro-counter>
          Adults
          <span slot="description">18 years or older</span>
        </auro-counter>
        <auro-counter>
          Children
          <span slot="description">2–17 years</span>
        </auro-counter>
        <auro-counter>
          Infants
          <span slot="description">Under 2 years</span>
        </auro-counter>
      </auro-counter-group>
    </div>
  );
}
