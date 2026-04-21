declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-form': React.HTMLAttributes<HTMLElement>;
      'auro-input': React.HTMLAttributes<HTMLElement> & {
        required?: boolean | '';
        name?: string;
        value?: string;
        type?: string;
        bordered?: boolean | '';
      };
      'auro-checkbox-group': React.HTMLAttributes<HTMLElement> & {
        required?: boolean | '';
        name?: string;
      };
      'auro-checkbox': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        name?: string;
        checked?: boolean | '';
      };
      'auro-radio-group': React.HTMLAttributes<HTMLElement> & {
        required?: boolean | '';
        name?: string;
      };
      'auro-radio': React.HTMLAttributes<HTMLElement> & {
        value?: string;
        name?: string;
        checked?: boolean | '';
      };
      'auro-button': React.HTMLAttributes<HTMLElement> & {
        type?: string;
        variant?: string;
        disabled?: boolean | '';
      };
    }
  }
}

export default function FormInteraction() {
  return (
    <div>
      {/* Simple form with two required inputs */}
      <section data-testid="simple">
        <auro-form>
          <auro-input required name="firstName" bordered>
            <span slot="label">First Name</span>
          </auro-input>
          <auro-input required name="lastName" bordered>
            <span slot="label">Last Name</span>
          </auro-input>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </auro-form>
      </section>

      {/* Form with preset values */}
      <section data-testid="prefilled">
        <auro-form>
          <auro-input name="email" value="test@example.com" bordered>
            <span slot="label">Email</span>
          </auro-input>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </auro-form>
      </section>

      {/* Form with mixed element types */}
      <section data-testid="mixed">
        <auro-form>
          <auro-input required name="fullName" bordered>
            <span slot="label">Full Name</span>
          </auro-input>
          <auro-checkbox-group name="preferences">
            <span slot="legend">Preferences</span>
            <auro-checkbox value="newsletter" name="preferences">Newsletter</auro-checkbox>
            <auro-checkbox value="updates" name="preferences">Updates</auro-checkbox>
          </auro-checkbox-group>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </auro-form>
      </section>

      {/* Form for validation testing */}
      <section data-testid="validation">
        <auro-form>
          <auro-input required name="requiredField" bordered>
            <span slot="label">Required Field</span>
          </auro-input>
          <auro-input name="optionalField" bordered>
            <span slot="label">Optional Field</span>
          </auro-input>
          <button type="submit">Submit</button>
        </auro-form>
      </section>

      <button id="outside-element">Outside</button>
    </div>
  );
}
