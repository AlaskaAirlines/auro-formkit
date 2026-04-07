<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/api.md) -->
<!-- The below content is automatically added from ../docs/api.md -->

# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property         | Modifiers | Type                                             | Description                                      |
|------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| [isInitialState](#isInitialState) | readonly  | `boolean`                                        | Returns `true` if no form element has been interacted with or had its value changed since the form was initialized or last reset. |
| [validity](#validity)       | readonly  | `"valid" \| "invalid" \| null`                   | Returns `'valid'` if all required and interacted-with form elements are valid, `'invalid'` if any are not, or `null` if the form has not been interacted with yet. |
| [value](#value)          | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` | Returns the current values of all named form elements as a key-value object, keyed by each element's `name` attribute. |

## Methods

| Method   | Type                | Description                                      |
|----------|---------------------|--------------------------------------------------|
| [reset](#reset)  | `(): void`          | Resets all form elements to their initial state and fires a `reset` event. The event's `detail.previousValue` contains the form values captured immediately before the reset. |
| [submit](#submit) | `(): Promise<void>` | Validates all form elements. If all are valid, fires a `submit` event with `detail.value` containing the current form values. If any element is invalid, its error state is surfaced and the `submit` event is not fired. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| [change](#change) |                                                  | Fires when a child form element's value changes or the form is initialized. |
| [input](#input)  |                                                  | Fires when a child form element receives user input. |
| [reset](#reset)  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is reset. The event detail contains the previous value of the form before reset. |
| [submit](#submit) | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is submitted. The event detail contains the current value of the form. |

## Slots

| Name      | Description                         |
|-----------|-------------------------------------|
| [default](#default) | The default slot for form elements. |
<!-- AURO-GENERATED-CONTENT:END -->

## Examples

### Basic Form

The most basic form implementation requires an `auro-input` and an optional auro button with `type="submit"`.

By default, Auro Form connects a `submit` event to all `type="submit"` buttons within the form.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <br />
  <auro-button type="submit">Submit</auro-button>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <br />
  <auro-button type="submit">Submit</auro-button>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Form with Column Layout

Auro Form is designed to be completely unstyled by default, allowing developers to use divs, structural elements, or
custom CSS to style the form.

This example shows that you can use advanced layouts with Auro Form, such as a column layout.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
<!-- The below content is automatically added from ./../apiExamples/column-layout.html -->
<style>
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .columned-form div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
<auro-form>
  <div class="columned-form">
    <div>
      <auro-input id="search-box" name="searchBox" required>
        <span slot="label">Search flights</span>
      </auro-input>
      <auro-input id="last-name" name="lastName" required>
        <span slot="label">Last Name</span>
      </auro-input>
    </div>
    <div>
      <div class="datepickerBlock">
        <h4>Pick a date range</h4>
        <auro-datepicker id="date-range" name="dateRange" required range>
          <span slot="fromLabel">Start</span>
          <span slot="toLabel">End</span>
          <span slot="bib.fullscreen.fromLabel">Start</span>
          <span slot="bib.fullscreen.toLabel">End</span>
        </auro-datepicker>
      </div>
      <div class="controls">
        <auro-button type="submit">Submit</auro-button>
      </div>
    </div>
  </div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/column-layout.html -->

```html
<style>
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .columned-form div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
<auro-form>
  <div class="columned-form">
    <div>
      <auro-input id="search-box" name="searchBox" required>
        <span slot="label">Search flights</span>
      </auro-input>
      <auro-input id="last-name" name="lastName" required>
        <span slot="label">Last Name</span>
      </auro-input>
    </div>
    <div>
      <div class="datepickerBlock">
        <h4>Pick a date range</h4>
        <auro-datepicker id="date-range" name="dateRange" required range>
          <span slot="fromLabel">Start</span>
          <span slot="toLabel">End</span>
          <span slot="bib.fullscreen.fromLabel">Start</span>
          <span slot="bib.fullscreen.toLabel">End</span>
        </auro-datepicker>
      </div>
      <div class="controls">
        <auro-button type="submit">Submit</auro-button>
      </div>
    </div>
  </div>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Complex Form

Finally, a more complex form example with multiple form elements, including a date picker and a select element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
<!-- The below content is automatically added from ./../apiExamples/complex.html -->
<style>
  .complex-form {
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
    background: #fff;
  }

  .sectionGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .sectionCard {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #d5d9e0;
    border-radius: 0.75rem;
    background: #fafbfc;
  }

  .sectionCard h3,
  .sectionCard h4,
  .sectionCard p {
    margin: 0;
  }

  .sectionCopy {
    color: #3f4854;
  }

  .stack {
    display: grid;
    gap: 1rem;
  }

  .counterBlock {
    display: grid;
    gap: 0.75rem;
  }

  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 767px) {
    .complex-form {
      padding: 1rem;
    }
  }
</style>
<auro-form class="complex-form">
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Traveler Details</h3>
      <p class="sectionCopy">Standard text inputs, a required field, and a disabled state.</p>
      <div class="stack">
        <auro-input id="first-name" name="firstName" required>
          <span slot="label">First Name</span>
        </auro-input>
        <auro-input id="last-name" name="lastName" required>
          <span slot="label">Last Name</span>
        </auro-input>
        <auro-input id="occupation" name="occupation">
          <span slot="label">Occupation</span>
          <span slot="helpText">Optional field for a short role description.</span>
        </auro-input>
        <auro-input id="employee-id" name="employeeId" disabled value="AS-4821">
          <span slot="label">Employee ID</span>
        </auro-input>
        <auro-input-two id="cool-fact" name="coolFact" required>
          <span slot="label">Cool Fact</span>
        </auro-input-two>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Trip Timing</h3>
      <p class="sectionCopy">Single-date and range-date examples inside the same form flow.</p>
      <div class="stack">
        <auro-datepicker id="date-example" name="dateExample" required>
          <span slot="fromLabel">Departure date</span>
          <span slot="bib.fullscreen.fromLabel">Departure date</span>
        </auro-datepicker>
        <auro-datepicker id="date-range" name="dateRange" range>
          <span slot="fromLabel">Trip start</span>
          <span slot="toLabel">Trip end</span>
          <span slot="bib.fullscreen.fromLabel">Trip start</span>
          <span slot="bib.fullscreen.toLabel">Trip end</span>
        </auro-datepicker>
      </div>
    </section>
  </div>
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Select States</h3>
      <p class="sectionCopy">Required, multiselect, and disabled dropdown patterns.</p>
      <div class="stack">
        <auro-select id="seat-preference" name="seatPreference" required placeholder="Choose a seat preference">
          <span slot="ariaLabel.bib.close">Close seat preference menu</span>
          <span slot="bib.fullscreen.headline">Seat Preference</span>
          <span slot="label">Seat Preference</span>
          <auro-menu>
            <auro-menuoption value="aisle">Aisle</auro-menuoption>
            <auro-menuoption value="window">Window</auro-menuoption>
            <auro-menuoption value="middle">Middle</auro-menuoption>
            <auro-menuoption value="exit-row">Exit row</auro-menuoption>
          </auro-menu>
        </auro-select>
        <auro-select id="trip-features" name="tripFeatures" multiselect value='["wifi","meal"]'>
          <span slot="ariaLabel.bib.close">Close trip feature menu</span>
          <span slot="bib.fullscreen.headline">Trip Features</span>
          <span slot="label">Trip Features</span>
          <span slot="helpText">Preselected values show multiselect state.</span>
          <auro-menu>
            <auro-menuoption value="wifi">Wi-Fi</auro-menuoption>
            <auro-menuoption value="meal">Meal service</auro-menuoption>
            <auro-menuoption value="power">Power outlet</auro-menuoption>
            <auro-menuoption value="streaming">Streaming entertainment</auro-menuoption>
          </auro-menu>
        </auro-select>
        <auro-select id="status-disabled" name="statusDisabled" disabled placeholder="Unavailable while syncing">
          <span slot="ariaLabel.bib.close">Close status menu</span>
          <span slot="bib.fullscreen.headline">Traveler Status</span>
          <span slot="label">Traveler Status</span>
          <auro-menu>
            <auro-menuoption value="mvp">MVP</auro-menuoption>
            <auro-menuoption value="gold">Gold</auro-menuoption>
            <auro-menuoption value="75k">75K</auro-menuoption>
          </auro-menu>
        </auro-select>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Combobox States</h3>
      <p class="sectionCopy">Suggestion, filter validation, and disabled examples.</p>
      <div class="stack">
        <auro-combobox id="favorite-fruit" name="favoriteFruit" behavior="suggestion">
          <span slot="ariaLabel.bib.close">Close combobox</span>
          <span slot="ariaLabel.input.clear">Clear fruit</span>
          <span slot="bib.fullscreen.headline">Favorite Fruit</span>
          <span slot="label">Favorite Fruit</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          </auro-menu>
        </auro-combobox>
        <auro-combobox
          id="airport-code"
          name="airportCode"
          behavior="filter"
          required
          setCustomValidityValueMissingFilter="Select an airport from the list">
          <span slot="ariaLabel.bib.close">Close airport list</span>
          <span slot="ariaLabel.input.clear">Clear airport</span>
          <span slot="bib.fullscreen.headline">Airport Search</span>
          <span slot="label">Airport Search</span>
          <span slot="helpText">Filter mode requires picking from the menu.</span>
          <auro-menu>
            <auro-menuoption value="SEA">Seattle</auro-menuoption>
            <auro-menuoption value="PDX">Portland</auro-menuoption>
            <auro-menuoption value="SFO">San Francisco</auro-menuoption>
            <auro-menuoption value="LAX">Los Angeles</auro-menuoption>
            <auro-menuoption static nomatch>No matching airport</auro-menuoption>
          </auro-menu>
        </auro-combobox>
        <auro-combobox id="travel-policy" name="travelPolicy" disabled>
          <span slot="ariaLabel.bib.close">Close policy list</span>
          <span slot="ariaLabel.input.clear">Clear policy</span>
          <span slot="bib.fullscreen.headline">Travel Policy</span>
          <span slot="label">Travel Policy</span>
          <auro-menu>
            <auro-menuoption value="standard">Standard</auro-menuoption>
            <auro-menuoption value="executive">Executive</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </div>
    </section>
  </div>
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Choice Controls</h3>
      <p class="sectionCopy">Checkbox and radio groups with required and horizontal states.</p>
      <div class="stack">
        <auro-checkbox-group required setCustomValidityValueMissing="Select at least one travel extra">
          <span slot="legend">Travel Extras</span>
          <span slot="helpText">Pick any extras that apply to this trip.</span>
          <auro-checkbox value="priority-boarding" name="travelExtras" id="extra-priority">Priority boarding</auro-checkbox>
          <auro-checkbox value="lounge" name="travelExtras" id="extra-lounge" checked>Lounge access</auro-checkbox>
          <auro-checkbox value="bags" name="travelExtras" id="extra-bags">Checked bags</auro-checkbox>
        </auro-checkbox-group>
        <auro-radio-group horizontal required setCustomValidityValueMissing="Choose a cabin class">
          <span slot="legend">Cabin Class</span>
          <auro-radio id="cabin-main" label="Main" name="cabinClass" value="main"></auro-radio>
          <auro-radio id="cabin-premium" label="Premium" name="cabinClass" value="premium"></auro-radio>
          <auro-radio id="cabin-first" label="First" name="cabinClass" value="first"></auro-radio>
        </auro-radio-group>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Counter States</h3>
      <p class="sectionCopy">Dropdown counter group plus standalone min/max and disabled states.</p>
      <div class="stack">
        <auro-counter-group id="passenger-counts" isDropdown>
          <span slot="ariaLabel.bib.close">Close passenger selector</span>
          <span slot="bib.fullscreen.headline">Passengers</span>
          <div slot="label">Passengers</div>
          <auro-counter value="1">
            Adults
            <span slot="description">18 years or older</span>
          </auro-counter>
          <auro-counter>
            Children
            <span slot="description">Under 17 years old</span>
          </auro-counter>
          <auro-counter>
            Lap Infants
            <span slot="description">Under 2 years</span>
          </auro-counter>
        </auro-counter-group>
        <div class="counterBlock">
          <auro-counter min="1" max="5" value="2">
            Hotel Rooms
            <span slot="description">Limit 5 rooms per booking</span>
          </auro-counter>
          <auro-counter disabled value="0">
            Upgrade Vouchers
            <span slot="description">Unavailable for this itinerary</span>
          </auro-counter>
        </div>
      </div>
    </section>
  </div>
  <div class="submitBlock">
    <auro-button type="reset">Reset</auro-button>
    <auro-button type="submit">Submit</auro-button>
  </div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->

```html
<style>
  .complex-form {
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
    background: #fff;
  }

  .sectionGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .sectionCard {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #d5d9e0;
    border-radius: 0.75rem;
    background: #fafbfc;
  }

  .sectionCard h3,
  .sectionCard h4,
  .sectionCard p {
    margin: 0;
  }

  .sectionCopy {
    color: #3f4854;
  }

  .stack {
    display: grid;
    gap: 1rem;
  }

  .counterBlock {
    display: grid;
    gap: 0.75rem;
  }

  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 767px) {
    .complex-form {
      padding: 1rem;
    }
  }
</style>
<auro-form class="complex-form">
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Traveler Details</h3>
      <p class="sectionCopy">Standard text inputs, a required field, and a disabled state.</p>
      <div class="stack">
        <auro-input id="first-name" name="firstName" required>
          <span slot="label">First Name</span>
        </auro-input>
        <auro-input id="last-name" name="lastName" required>
          <span slot="label">Last Name</span>
        </auro-input>
        <auro-input id="occupation" name="occupation">
          <span slot="label">Occupation</span>
          <span slot="helpText">Optional field for a short role description.</span>
        </auro-input>
        <auro-input id="employee-id" name="employeeId" disabled value="AS-4821">
          <span slot="label">Employee ID</span>
        </auro-input>
        <auro-input-two id="cool-fact" name="coolFact" required>
          <span slot="label">Cool Fact</span>
        </auro-input-two>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Trip Timing</h3>
      <p class="sectionCopy">Single-date and range-date examples inside the same form flow.</p>
      <div class="stack">
        <auro-datepicker id="date-example" name="dateExample" required>
          <span slot="fromLabel">Departure date</span>
          <span slot="bib.fullscreen.fromLabel">Departure date</span>
        </auro-datepicker>
        <auro-datepicker id="date-range" name="dateRange" range>
          <span slot="fromLabel">Trip start</span>
          <span slot="toLabel">Trip end</span>
          <span slot="bib.fullscreen.fromLabel">Trip start</span>
          <span slot="bib.fullscreen.toLabel">Trip end</span>
        </auro-datepicker>
      </div>
    </section>
  </div>
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Select States</h3>
      <p class="sectionCopy">Required, multiselect, and disabled dropdown patterns.</p>
      <div class="stack">
        <auro-select id="seat-preference" name="seatPreference" required placeholder="Choose a seat preference">
          <span slot="ariaLabel.bib.close">Close seat preference menu</span>
          <span slot="bib.fullscreen.headline">Seat Preference</span>
          <span slot="label">Seat Preference</span>
          <auro-menu>
            <auro-menuoption value="aisle">Aisle</auro-menuoption>
            <auro-menuoption value="window">Window</auro-menuoption>
            <auro-menuoption value="middle">Middle</auro-menuoption>
            <auro-menuoption value="exit-row">Exit row</auro-menuoption>
          </auro-menu>
        </auro-select>
        <auro-select id="trip-features" name="tripFeatures" multiselect value='["wifi","meal"]'>
          <span slot="ariaLabel.bib.close">Close trip feature menu</span>
          <span slot="bib.fullscreen.headline">Trip Features</span>
          <span slot="label">Trip Features</span>
          <span slot="helpText">Preselected values show multiselect state.</span>
          <auro-menu>
            <auro-menuoption value="wifi">Wi-Fi</auro-menuoption>
            <auro-menuoption value="meal">Meal service</auro-menuoption>
            <auro-menuoption value="power">Power outlet</auro-menuoption>
            <auro-menuoption value="streaming">Streaming entertainment</auro-menuoption>
          </auro-menu>
        </auro-select>
        <auro-select id="status-disabled" name="statusDisabled" disabled placeholder="Unavailable while syncing">
          <span slot="ariaLabel.bib.close">Close status menu</span>
          <span slot="bib.fullscreen.headline">Traveler Status</span>
          <span slot="label">Traveler Status</span>
          <auro-menu>
            <auro-menuoption value="mvp">MVP</auro-menuoption>
            <auro-menuoption value="gold">Gold</auro-menuoption>
            <auro-menuoption value="75k">75K</auro-menuoption>
          </auro-menu>
        </auro-select>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Combobox States</h3>
      <p class="sectionCopy">Suggestion, filter validation, and disabled examples.</p>
      <div class="stack">
        <auro-combobox id="favorite-fruit" name="favoriteFruit" behavior="suggestion">
          <span slot="ariaLabel.bib.close">Close combobox</span>
          <span slot="ariaLabel.input.clear">Clear fruit</span>
          <span slot="bib.fullscreen.headline">Favorite Fruit</span>
          <span slot="label">Favorite Fruit</span>
          <auro-menu>
            <auro-menuoption value="Apples">Apples</auro-menuoption>
            <auro-menuoption value="Oranges">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes">Grapes</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          </auro-menu>
        </auro-combobox>
        <auro-combobox
          id="airport-code"
          name="airportCode"
          behavior="filter"
          required
          setCustomValidityValueMissingFilter="Select an airport from the list">
          <span slot="ariaLabel.bib.close">Close airport list</span>
          <span slot="ariaLabel.input.clear">Clear airport</span>
          <span slot="bib.fullscreen.headline">Airport Search</span>
          <span slot="label">Airport Search</span>
          <span slot="helpText">Filter mode requires picking from the menu.</span>
          <auro-menu>
            <auro-menuoption value="SEA">Seattle</auro-menuoption>
            <auro-menuoption value="PDX">Portland</auro-menuoption>
            <auro-menuoption value="SFO">San Francisco</auro-menuoption>
            <auro-menuoption value="LAX">Los Angeles</auro-menuoption>
            <auro-menuoption static nomatch>No matching airport</auro-menuoption>
          </auro-menu>
        </auro-combobox>
        <auro-combobox id="travel-policy" name="travelPolicy" disabled>
          <span slot="ariaLabel.bib.close">Close policy list</span>
          <span slot="ariaLabel.input.clear">Clear policy</span>
          <span slot="bib.fullscreen.headline">Travel Policy</span>
          <span slot="label">Travel Policy</span>
          <auro-menu>
            <auro-menuoption value="standard">Standard</auro-menuoption>
            <auro-menuoption value="executive">Executive</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </div>
    </section>
  </div>
  <div class="sectionGrid">
    <section class="sectionCard">
      <h3>Choice Controls</h3>
      <p class="sectionCopy">Checkbox and radio groups with required and horizontal states.</p>
      <div class="stack">
        <auro-checkbox-group required setCustomValidityValueMissing="Select at least one travel extra">
          <span slot="legend">Travel Extras</span>
          <span slot="helpText">Pick any extras that apply to this trip.</span>
          <auro-checkbox value="priority-boarding" name="travelExtras" id="extra-priority">Priority boarding</auro-checkbox>
          <auro-checkbox value="lounge" name="travelExtras" id="extra-lounge" checked>Lounge access</auro-checkbox>
          <auro-checkbox value="bags" name="travelExtras" id="extra-bags">Checked bags</auro-checkbox>
        </auro-checkbox-group>
        <auro-radio-group horizontal required setCustomValidityValueMissing="Choose a cabin class">
          <span slot="legend">Cabin Class</span>
          <auro-radio id="cabin-main" label="Main" name="cabinClass" value="main"></auro-radio>
          <auro-radio id="cabin-premium" label="Premium" name="cabinClass" value="premium"></auro-radio>
          <auro-radio id="cabin-first" label="First" name="cabinClass" value="first"></auro-radio>
        </auro-radio-group>
      </div>
    </section>
    <section class="sectionCard">
      <h3>Counter States</h3>
      <p class="sectionCopy">Dropdown counter group plus standalone min/max and disabled states.</p>
      <div class="stack">
        <auro-counter-group id="passenger-counts" isDropdown>
          <span slot="ariaLabel.bib.close">Close passenger selector</span>
          <span slot="bib.fullscreen.headline">Passengers</span>
          <div slot="label">Passengers</div>
          <auro-counter value="1">
            Adults
            <span slot="description">18 years or older</span>
          </auro-counter>
          <auro-counter>
            Children
            <span slot="description">Under 17 years old</span>
          </auro-counter>
          <auro-counter>
            Lap Infants
            <span slot="description">Under 2 years</span>
          </auro-counter>
        </auro-counter-group>
        <div class="counterBlock">
          <auro-counter min="1" max="5" value="2">
            Hotel Rooms
            <span slot="description">Limit 5 rooms per booking</span>
          </auro-counter>
          <auro-counter disabled value="0">
            Upgrade Vouchers
            <span slot="description">Unavailable for this itinerary</span>
          </auro-counter>
        </div>
      </div>
    </section>
  </div>
  <div class="submitBlock">
    <auro-button type="reset">Reset</auro-button>
    <auro-button type="submit">Submit</auro-button>
  </div>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
