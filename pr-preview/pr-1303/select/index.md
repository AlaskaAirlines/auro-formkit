<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE — THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Select

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
`<auro-select>` is a combination <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">HTML custom element</auro-hyperlink> that consists of a pre-defined trigger element, `<auro-menu>` for the panel content. The `<auro-select>` element presents a menu of options. The options within the menu are represented by `<auro-menu>` and `<auro-menuoption>` elements. You can pre-select options for the user with the `selected` attribute as part of the `<auro-menuoption>` API.
<!-- AURO-GENERATED-CONTENT:END -->

## Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
See description.
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

### Basic

A baseline `<auro-select>` using `<auro-menu>` and `<auro-menuoption>` elements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-select>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Shape | Size | Layout Support

The `auro-select` component supports the `shape`, `size` and `layout` feature set. The component defaults to the `layout="classic"`, `shape="classic"` and `size="lg"`.

#### Classic Layout (Legacy)

The `classic` layout is default for `auro-select`. No customization is needed to achieve this look.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-select>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Emphasized Layout

The `emphasized` layout is only supported on light backgrounds.

The `emphasized` layout supports the following shapes:
- `pill`
- `pill-left`
- `pill-right`

The `emphasized` layout supports the following sizes:
- `xl`

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <div style="display: flex; flex-direction: row; gap: 10px;">
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;">
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;">
      <span slot="label">Select Example</span>
      <span slot="helpText">no displayValue in menuoptions</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        </auro-menuoption>
      </auro-menu>
    </auro-select>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<div style="display: flex; flex-direction: row; gap: 10px;">
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="label">Select Example</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;">
    <span slot="label">Select Example</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;">
    <span slot="label">Select Example</span>
    <span slot="helpText">no displayValue in menuoptions</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
      </auro-menuoption>
    </auro-menu>
  </auro-select>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake Layout

The `snowflake` layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.

The `snowflake` layout is only expected to be used on dark backgrounds, in conjunction with `appearance="inverse"`.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customColor></auro-icon> Flights
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customColor></auro-icon> Cars
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customColor></auro-icon> Hotels
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customColor></auro-icon> Packages
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customColor></auro-icon> Cruises
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">
      <auro-icon category="terminal" name="plane-diag-stroke" customColor></auro-icon> Flights
    </auro-menuoption>
    <auro-menuoption value="cars">
      <auro-icon category="destination" name="car-rental-stroke" customColor></auro-icon> Cars
    </auro-menuoption>
    <auro-menuoption value="hotels">
      <auro-icon category="destination" name="hotel-stroke" customColor></auro-icon> Hotels
    </auro-menuoption>
    <auro-menuoption value="packages">
      <auro-icon category="shop" name="gift-stroke" customColor></auro-icon> Packages
    </auro-menuoption>
    <auro-menuoption value="cruises">
      <auro-icon category="in-flight" name="boarding" customColor></auro-icon> Cruises
    </auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
