declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-select': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        required?: boolean;
        multiselect?: boolean;
        disabled?: boolean;
      };
      'auro-menu': React.HTMLAttributes<HTMLElement>;
      'auro-menuoption': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        disabled?: boolean;
      };
    }
  }
}

export default function SelectInteraction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>

      {/* Default: 4 options */}
      <section data-testid="default">
        <auro-select>
          <span slot="bib.fullscreen.headline">Default</span>
          <span slot="label">Default</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Nested menu for keyboard traversal */}
      <section data-testid="nested">
        <auro-select>
          <span slot="bib.fullscreen.headline">Nested</span>
          <span slot="label">Nested</span>
          <auro-menu>
            <auro-menuoption value="option 1">option 1</auro-menuoption>
            <auro-menu>
              <auro-menuoption value="option a">option a</auro-menuoption>
              <auro-menuoption value="option b">option b</auro-menuoption>
            </auro-menu>
            <auro-menuoption value="option 2">option 2</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Preset value for re-selection / deselect tests */}
      <section data-testid="preset">
        <auro-select value="Oranges">
          <span slot="bib.fullscreen.headline">Preset</span>
          <span slot="label">Preset</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Multi-select */}
      <section data-testid="multiselect">
        <auro-select multiselect>
          <span slot="bib.fullscreen.headline">Multi</span>
          <span slot="label">Multi Select</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Type-ahead: options starting with same letter */}
      <section data-testid="typeahead">
        <auro-select>
          <span slot="bib.fullscreen.headline">Type-ahead</span>
          <span slot="label">Type-ahead</span>
          <auro-menu>
            <auro-menuoption value="Apple">Apple</auro-menuoption>
            <auro-menuoption value="Apricot">Apricot</auro-menuoption>
            <auro-menuoption value="Avocado">Avocado</auro-menuoption>
            <auro-menuoption value="Banana">Banana</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Required for validation tests */}
      <section data-testid="required">
        <auro-select required>
          <span slot="bib.fullscreen.headline">Required</span>
          <span slot="label">Required</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Disabled first option — Home should skip it */}
      <section data-testid="disabled-first">
        <auro-select>
          <span slot="bib.fullscreen.headline">Disabled First</span>
          <span slot="label">Disabled First</span>
          <auro-menu>
            <auro-menuoption value="Apples" disabled>Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Disabled last option — End should skip it */}
      <section data-testid="disabled-last">
        <auro-select>
          <span slot="bib.fullscreen.headline">Disabled Last</span>
          <span slot="label">Disabled Last</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
            <auro-menuoption value="Grapes" disabled>Grapes</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Multiselect with a disabled option */}
      <section data-testid="disabled-multi">
        <auro-select multiselect>
          <span slot="bib.fullscreen.headline">Disabled Multi</span>
          <span slot="label">Disabled Multi</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" disabled>Oranges</auro-menuoption>
            <auro-menuoption value="Bananas">Bananas</auro-menuoption>
          </auro-menu>
        </auro-select>
      </section>

      {/* Outside target for click-outside-to-close tests */}
      <button id="outside-element">Outside Element</button>
    </div>
  );
}
