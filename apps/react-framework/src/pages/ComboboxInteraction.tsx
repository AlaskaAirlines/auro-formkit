declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-combobox': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        behavior?: string;
        required?: boolean;
        noFilter?: boolean;
        setCustomValidityValueMissingFilter?: string;
      };
      'auro-menu': React.HTMLAttributes<HTMLElement>;
      'auro-menuoption': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        disabled?: boolean;
      };
    }
  }
}

export default function ComboboxInteraction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>

      {/* Default: 2 options */}
      <section data-testid="default">
        <auro-combobox>
          <span slot="label">Default</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* Three options for Home / End / arrow cycling */}
      <section data-testid="three-options">
        <auro-combobox>
          <span slot="label">Three Options</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* First option disabled — Home should skip it */}
      <section data-testid="disabled-first">
        <auro-combobox>
          <span slot="label">Disabled First</span>
          <auro-menu>
            <auro-menuoption value="Apples" disabled>Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* Nested menu for keyboard traversal across menu boundaries */}
      <section data-testid="nested">
        <auro-combobox>
          <span slot="label">Nested</span>
          <auro-menu>
            <auro-menuoption value="option 1">option 1</auro-menuoption>
            <auro-menu>
              <auro-menuoption value="option a">option a</auro-menuoption>
              <auro-menuoption value="option b">option b</auro-menuoption>
            </auro-menu>
            <auro-menuoption value="option 2">option 2</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* Filter behavior with required — for fullscreen validation flow */}
      <section data-testid="filter">
        <auro-combobox behavior="filter" required setCustomValidityValueMissingFilter="filter error">
          <span slot="label">Filter</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* No filter — keeps all options visible for screen reader tests */}
      <section data-testid="no-filter">
        <auro-combobox noFilter>
          <span slot="label">No Filter</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </section>

      {/* Outside target for click-outside-to-close tests */}
      <button id="outside-element">Outside Element</button>
    </div>
  );
}
