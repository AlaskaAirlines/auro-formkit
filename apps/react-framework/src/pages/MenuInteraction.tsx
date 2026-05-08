declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-menu': React.HTMLAttributes<HTMLElement> & {
        multiSelect?: boolean | '';
        noCheckmark?: boolean | '';
        allowDeselect?: boolean | '';
        disabled?: boolean | '';
        loading?: boolean | '';
        matchWord?: string;
        value?: string;
      };
      'auro-menuoption': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        disabled?: boolean | '';
        selected?: boolean | '';
        hidden?: boolean;
      };
    }
  }
}

export default function MenuInteraction() {
  return (
    <div>
      {/* Default single-select menu */}
      <section data-testid="default">
        <auro-menu>
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          <auro-menuoption value="Bananas">Bananas</auro-menuoption>
          <auro-menuoption value="Grapes">Grapes</auro-menuoption>
        </auro-menu>
      </section>

      {/* Multi-select menu */}
      <section data-testid="multiselect">
        <auro-menu multiSelect>
          <auro-menuoption value="Red">Red</auro-menuoption>
          <auro-menuoption value="Blue">Blue</auro-menuoption>
          <auro-menuoption value="Green">Green</auro-menuoption>
          <auro-menuoption value="Yellow">Yellow</auro-menuoption>
        </auro-menu>
      </section>

      {/* Menu with disabled options */}
      <section data-testid="with-disabled">
        <auro-menu>
          <auro-menuoption value="Enabled1">Enabled first</auro-menuoption>
          <auro-menuoption value="DisabledOpt" disabled>Disabled option</auro-menuoption>
          <auro-menuoption value="Enabled2">Enabled last</auro-menuoption>
        </auro-menu>
      </section>

      {/* Menu with preset value */}
      <section data-testid="preset">
        <auro-menu value="Oranges">
          <auro-menuoption value="Apples">Apples</auro-menuoption>
          <auro-menuoption value="Oranges">Oranges</auro-menuoption>
          <auro-menuoption value="Bananas">Bananas</auro-menuoption>
        </auro-menu>
      </section>

      {/* Allow deselect menu */}
      <section data-testid="allow-deselect">
        <auro-menu allowDeselect>
          <auro-menuoption value="One">One</auro-menuoption>
          <auro-menuoption value="Two">Two</auro-menuoption>
          <auro-menuoption value="Three">Three</auro-menuoption>
        </auro-menu>
      </section>

      {/* No checkmark menu */}
      <section data-testid="no-checkmark">
        <auro-menu noCheckmark>
          <auro-menuoption value="Alpha">Alpha</auro-menuoption>
          <auro-menuoption value="Beta">Beta</auro-menuoption>
          <auro-menuoption value="Gamma">Gamma</auro-menuoption>
        </auro-menu>
      </section>

      {/* Disabled menu */}
      <section data-testid="disabled-menu">
        <auro-menu disabled>
          <auro-menuoption value="X">X</auro-menuoption>
          <auro-menuoption value="Y">Y</auro-menuoption>
        </auro-menu>
      </section>

      {/* Nested menu */}
      <section data-testid="nested">
        <auro-menu>
          <auro-menuoption value="Parent1">Parent 1</auro-menuoption>
          <auro-menu>
            <auro-menuoption value="Child1">Child 1</auro-menuoption>
            <auro-menuoption value="Child2">Child 2</auro-menuoption>
          </auro-menu>
          <auro-menuoption value="Parent2">Parent 2</auro-menuoption>
        </auro-menu>
      </section>

      {/* Menu with hidden option */}
      <section data-testid="with-hidden">
        <auro-menu>
          <auro-menuoption value="Visible1">Visible first</auro-menuoption>
          <auro-menuoption value="HiddenOpt" hidden>Hidden option</auro-menuoption>
          <auro-menuoption value="Visible2">Visible last</auro-menuoption>
        </auro-menu>
      </section>

      <button id="outside-element">Outside</button>
    </div>
  );
}
