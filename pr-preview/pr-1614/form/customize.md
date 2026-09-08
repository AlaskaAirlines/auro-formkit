<auro-header level="1" id="overview">Form - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#layout">Layout</auro-anchorlink>
<auro-anchorlink fluid href="#columnLayout" class="level2 body-xs">Column Layout</auro-anchorlink>
<auro-anchorlink fluid href="#complexForm" class="level2 body-xs">Complex Form</auro-anchorlink>
<auro-anchorlink fluid href="#fieldState">Field State</auro-anchorlink>
<auro-anchorlink fluid href="#disabledFields" class="level2 body-xs">Disabled Fields</auro-anchorlink>
<auro-anchorlink fluid href="#disableAfterEdit" class="level2 body-xs">Disabling After User Edits</auro-anchorlink>
<auro-anchorlink fluid href="#behaviorChangesV6" class="level2 body-xs">Behavior Changes in v6</auro-anchorlink>
<auro-anchorlink fluid href="#runtimeMutations" class="level2 body-xs">Runtime DOM Mutations</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="layout">Layout</auro-header>
<p>The <code>auro-form</code> component does not enforce any layout on its children. Use standard CSS techniques to arrange form elements as needed.</p>
<auro-header level="3" id="columnLayout">Column Layout</auro-header>
<p>Use CSS Grid or Flexbox to arrange form elements in columns.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
<!-- The below content is automatically added from ./../apiExamples/column-layout.html -->
<style>
          .columned-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            align-items: start;
          }

          .columned-form .span-2 {
            grid-column: span 2;
          }

          .columned-form-controls {
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;
          }
</style>
<auro-form>
<div class="columned-form">
<auro-input id="cl-first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<auro-input id="cl-last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<auro-input id="cl-email" name="email" type="email" class="span-2" required>
<span slot="label">Email</span>
</auro-input>
<auro-datepicker id="cl-date-range" name="dateRange" class="span-2" required range>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
</div>
<div class="columned-form-controls">
<auro-button type="submit">Submit</auro-button>
</div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/column-layout.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }
​
  .columned-form .span-2 {
    grid-column: span 2;
  }
​
  .columned-form-controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
&lt;/style&gt;
&lt;auro-form&gt;
  &lt;div class="columned-form"&gt;
    &lt;auro-input id="cl-first-name" name="firstName" required&gt;
      &lt;span slot="label"&gt;First Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input id="cl-last-name" name="lastName" required&gt;
      &lt;span slot="label"&gt;Last Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input id="cl-email" name="email" type="email" class="span-2" required&gt;
      &lt;span slot="label"&gt;Email&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-datepicker id="cl-date-range" name="dateRange" class="span-2" required range&gt;
      &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
      &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
      &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="columned-form-controls"&gt;
    &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="complexForm">Complex Form</auro-header>
<p>A realistic booking form that exercises every form element <code>auro-form</code> manages — <code>auro-input</code>, <code>auro-select</code>, <code>auro-combobox</code>, a range <code>auro-datepicker</code>, <code>auro-counter-group</code>, <code>auro-radio-group</code>, and <code>auro-checkbox-group</code> — arranged with nested containers and a reset/submit button group.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
<!-- The below content is automatically added from ./../apiExamples/complex.html -->
<auro-form id="bookingForm" class="trip-form">
<!-- Cabin — auro-radio-group -->
<div class="form-section">
<auro-radio-group required name="cabin">
<span slot="legend">Cabin</span>
<auro-radio id="cabin-main" name="cabinChoice" label="Main" value="main" checked></auro-radio>
<auro-radio id="cabin-premium" name="cabinChoice" label="Premium" value="premium"></auro-radio>
<auro-radio id="cabin-first" name="cabinChoice" label="First class" value="first"></auro-radio>
</auro-radio-group>
</div>
<!-- Route — auro-select (from) + auro-combobox (to) -->
<div class="form-section">
<h4 class="section-heading">Where are you going?</h4>
<div class="field-row">
<auro-select required name="departureAirport">
<span slot="label">From</span>
<span slot="bib.fullscreen.headline">Choose a departure city</span>
<auro-menu>
<auro-menuoption value="SEA">Seattle (SEA)</auro-menuoption>
<auro-menuoption value="PDX">Portland (PDX)</auro-menuoption>
<auro-menuoption value="SFO">San Francisco (SFO)</auro-menuoption>
<auro-menuoption value="LAX">Los Angeles (LAX)</auro-menuoption>
<auro-menuoption value="ANC">Anchorage (ANC)</auro-menuoption>
</auro-menu>
</auro-select>
<auro-combobox required name="destination">
<span slot="label">To</span>
<span slot="bib.fullscreen.headline">Search destinations</span>
<auro-menu>
<auro-menuoption value="HNL">Honolulu (HNL)</auro-menuoption>
<auro-menuoption value="OGG">Maui (OGG)</auro-menuoption>
<auro-menuoption value="JFK">New York (JFK)</auro-menuoption>
<auro-menuoption value="ORD">Chicago (ORD)</auro-menuoption>
<auro-menuoption value="DFW">Dallas–Fort Worth (DFW)</auro-menuoption>
<auro-menuoption static nomatch>No matching destinations</auro-menuoption>
</auro-menu>
</auro-combobox>
</div>
</div>
<!-- When & who — auro-datepicker (range) + auro-counter-group -->
<div class="form-section">
<h4 class="section-heading">When and who?</h4>
<div class="field-row">
<auro-datepicker required range name="travelDates">
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<auro-counter-group isDropdown max="9" name="travelers">
<div slot="label">Travelers</div>
<span slot="bib.fullscreen.headline">Travelers</span>
<span slot="ariaLabel.bib.close">Close</span>
<auro-counter name="adults" min="1" max="9" value="1">
                  Adults
<span slot="description">Age 18+</span>
</auro-counter>
<auro-counter name="children" min="0" max="8" value="0">
                  Children
<span slot="description">Age 2–17</span>
</auro-counter>
<auro-counter name="infants" min="0" max="4" value="0">
                  Lap infants
<span slot="description">Under 2</span>
</auro-counter>
</auro-counter-group>
</div>
</div>
<!-- Lead traveler — auro-input -->
<div class="form-section">
<h4 class="section-heading">Lead traveler</h4>
<div class="field-row">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First name</span>
</auro-input>
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last name</span>
</auro-input>
<auro-input id="email" name="email" type="email" class="span-2" required>
<span slot="label">Email</span>
<span slot="helpText">We'll send your confirmation here.</span>
</auro-input>
</div>
</div>
<!-- Extras — auro-checkbox-group -->
<div class="form-section">
<auro-checkbox-group name="extras">
<span slot="legend">Add to your trip (optional)</span>
<auro-checkbox id="extra-bags" value="bags">First checked bag</auro-checkbox>
<auro-checkbox id="extra-insurance" value="insurance">Travel insurance</auro-checkbox>
<auro-checkbox id="extra-lounge" value="lounge">Alaska Lounge+ day pass</auro-checkbox>
</auro-checkbox-group>
</div>
<div class="form-actions">
<auro-button type="reset" variant="secondary">Reset</auro-button>
<auro-button type="submit">Search flights</auro-button>
</div>
</auro-form>
<output id="bookingFormOutput" aria-live="polite">Fill in the required fields and submit to see the collected form value. Notice the shapes each field contributes — <code>travelDates</code> as a two-item <code>[departure, return]</code> array, <code>travelers</code> as an object keyed by counter name, <code>extras</code> as an array, and <code>cabin</code> as the selected value.</output>
<style>
          #bookingFormOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }

          .trip-form {
            display: block;
            padding: 1.5rem;
            border: 1px solid #2a2a2a;
            border-radius: 1rem;
          }

          .trip-form .form-section {
            margin-top: 1.5rem;
          }

          .trip-form .form-section:first-of-type {
            margin-top: 0;
          }

          .trip-form .section-heading {
            margin: 0 0 0.75rem;
          }

          .trip-form .field-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            align-items: start;
          }

          .trip-form .field-row + .field-row {
            margin-top: 1rem;
          }

          .trip-form .span-2 {
            grid-column: span 2;
          }

          @media (max-width: 660px) {
            .trip-form .field-row {
              grid-template-columns: 1fr;
            }

            .trip-form .span-2 {
              grid-column: span 1;
            }
          }

          .trip-form .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="bookingForm" class="trip-form"&gt;
  &lt;!-- Cabin — auro-radio-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-radio-group required name="cabin"&gt;
      &lt;span slot="legend"&gt;Cabin&lt;/span&gt;
      &lt;auro-radio id="cabin-main" name="cabinChoice" label="Main" value="main" checked&gt;&lt;/auro-radio&gt;
      &lt;auro-radio id="cabin-premium" name="cabinChoice" label="Premium" value="premium"&gt;&lt;/auro-radio&gt;
      &lt;auro-radio id="cabin-first" name="cabinChoice" label="First class" value="first"&gt;&lt;/auro-radio&gt;
    &lt;/auro-radio-group&gt;
  &lt;/div&gt;
  &lt;!-- Route — auro-select (from) + auro-combobox (to) --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Where are you going?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-select required name="departureAirport"&gt;
        &lt;span slot="label"&gt;From&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Choose a departure city&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption value="SEA"&gt;Seattle (SEA)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="PDX"&gt;Portland (PDX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="SFO"&gt;San Francisco (SFO)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="LAX"&gt;Los Angeles (LAX)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="ANC"&gt;Anchorage (ANC)&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-select&gt;
      &lt;auro-combobox required name="destination"&gt;
        &lt;span slot="label"&gt;To&lt;/span&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Search destinations&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption value="HNL"&gt;Honolulu (HNL)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="OGG"&gt;Maui (OGG)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="JFK"&gt;New York (JFK)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="ORD"&gt;Chicago (ORD)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption value="DFW"&gt;Dallas–Fort Worth (DFW)&lt;/auro-menuoption&gt;
          &lt;auro-menuoption static nomatch&gt;No matching destinations&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-combobox&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- When &amp; who — auro-datepicker (range) + auro-counter-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;When and who?&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-datepicker required range name="travelDates"&gt;
        &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
        &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
        &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
      &lt;/auro-datepicker&gt;
      &lt;auro-counter-group isDropdown max="9" name="travelers"&gt;
        &lt;div slot="label"&gt;Travelers&lt;/div&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Travelers&lt;/span&gt;
        &lt;span slot="ariaLabel.bib.close"&gt;Close&lt;/span&gt;
        &lt;auro-counter name="adults" min="1" max="9" value="1"&gt;
          Adults
          &lt;span slot="description"&gt;Age 18+&lt;/span&gt;
        &lt;/auro-counter&gt;
        &lt;auro-counter name="children" min="0" max="8" value="0"&gt;
          Children
          &lt;span slot="description"&gt;Age 2–17&lt;/span&gt;
        &lt;/auro-counter&gt;
        &lt;auro-counter name="infants" min="0" max="4" value="0"&gt;
          Lap infants
          &lt;span slot="description"&gt;Under 2&lt;/span&gt;
        &lt;/auro-counter&gt;
      &lt;/auro-counter-group&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Lead traveler — auro-input --&gt;
  &lt;div class="form-section"&gt;
    &lt;h4 class="section-heading"&gt;Lead traveler&lt;/h4&gt;
    &lt;div class="field-row"&gt;
      &lt;auro-input id="first-name" name="firstName" required&gt;
        &lt;span slot="label"&gt;First name&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="last-name" name="lastName" required&gt;
        &lt;span slot="label"&gt;Last name&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="email" name="email" type="email" class="span-2" required&gt;
        &lt;span slot="label"&gt;Email&lt;/span&gt;
        &lt;span slot="helpText"&gt;We'll send your confirmation here.&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Extras — auro-checkbox-group --&gt;
  &lt;div class="form-section"&gt;
    &lt;auro-checkbox-group name="extras"&gt;
      &lt;span slot="legend"&gt;Add to your trip (optional)&lt;/span&gt;
      &lt;auro-checkbox id="extra-bags" value="bags"&gt;First checked bag&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-insurance" value="insurance"&gt;Travel insurance&lt;/auro-checkbox&gt;
      &lt;auro-checkbox id="extra-lounge" value="lounge"&gt;Alaska Lounge+ day pass&lt;/auro-checkbox&gt;
    &lt;/auro-checkbox-group&gt;
  &lt;/div&gt;
  &lt;div class="form-actions"&gt;
    &lt;auro-button type="reset" variant="secondary"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Search flights&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;
&lt;output id="bookingFormOutput" aria-live="polite"&gt;Fill in the required fields and submit to see the collected form value. Notice the shapes each field contributes — &lt;code&gt;travelDates&lt;/code&gt; as a two-item &lt;code&gt;[departure, return]&lt;/code&gt; array, &lt;code&gt;travelers&lt;/code&gt; as an object keyed by counter name, &lt;code&gt;extras&lt;/code&gt; as an array, and &lt;code&gt;cabin&lt;/code&gt; as the selected value.&lt;/output&gt;
&lt;style&gt;
  #bookingFormOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
​
  .trip-form {
    display: block;
    padding: 1.5rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
​
  .trip-form .form-section {
    margin-top: 1.5rem;
  }
​
  .trip-form .form-section:first-of-type {
    margin-top: 0;
  }
​
  .trip-form .section-heading {
    margin: 0 0 0.75rem;
  }
​
  .trip-form .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }
​
  .trip-form .field-row + .field-row {
    margin-top: 1rem;
  }
​
  .trip-form .span-2 {
    grid-column: span 2;
  }
​
  @media (max-width: 660px) {
    .trip-form .field-row {
      grid-template-columns: 1fr;
    }
​
    .trip-form .span-2 {
      grid-column: span 1;
    }
  }
​
  .trip-form .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.js -->
<pre class="language-js"><code class="language-js">/* eslint-disable jsdoc/require-jsdoc */
​
/**
 * Displays the collected value of the complex booking form on submit, mirroring
 * the Disabled Fields example. Every field in this form — including the cabin
 * radio group — is collected into `form.value` automatically by `auro-form`; no
 * per-field wiring is needed.
 */
export async function complexExample() {
  await customElements.whenDefined('auro-form');
​
  const form = document.querySelector('#bookingForm');
  if (!form) {
    throw new Error('complexExample: #bookingForm not yet rendered');
  }
​
  const output = document.querySelector('#bookingFormOutput');
  if (!output) {
    throw new Error('complexExample: #bookingFormOutput not yet rendered');
  }
​
  await form.updateComplete;
​
  form.addEventListener('submit', (event) =&gt; {
    output.textContent = JSON.stringify(event.detail.value, null, 2);
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="fieldState">Field State</auro-header>
<p>Per the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled" target="_blank">HTML spec</auro-hyperlink>, form controls with the <code>disabled</code> attribute are excluded from form submission and are not validated. <code>auro-form</code> mirrors that behavior.</p>
<auro-header level="3" id="disabledFields">Disabled Fields</auro-header>
<p>When a child form element has the <code>disabled</code> attribute:</p>
<ul>
<li>Its <code>name</code> is omitted from <code>form.value</code> and from the <code>submit</code> event's <code>detail.value</code>, even if the element carries a value.</li>
<li>It does not contribute to <code>validity</code> — a disabled <code>required</code> field will not block submission.</li>
<li>A disabled field carrying its <strong>default</strong> (attribute-declared) value does not taint <code>isInitialState</code> — the form is still in its initial state. However, a field that the user has already edited and then becomes disabled <em>does</em> still count toward the form being non-initial. Disabling a field does not clear its dirty state, matching HTML's <code>dirtyValueFlag</code> semantics.</li>
</ul>
<p>In the example below the Mileage Plan number is preset and disabled. Fill in the remaining required fields and submit the form — the output region below the form will show the contents of the <code>submit</code> event's <code>detail.value</code>. Notice that only <code>firstName</code> and <code>lastName</code> appear; <code>loyaltyNumber</code> is omitted even though the field has a value. See the <auro-hyperlink href="#behaviorChangesV6">Behavior changes in v6</auro-hyperlink> section below for the full set of migration notes, including the recommended replacement for using <code>disabled</code> to carry values through to submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-form id="disabledExampleForm">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<br />
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<br />
<auro-input id="loyalty-number" name="loyaltyNumber" value="AS-123456" disabled>
<span slot="label">Mileage Plan number</span>
<span slot="helpText">Account number is read-only and is not submitted with the form.</span>
</auro-input>
<br />
<auro-button type="submit">Submit</auro-button>
</auro-form>
<output id="disabledExampleOutput" aria-live="polite">Submit the form to see what data gets stored.</output>
<style>
          #disabledExampleOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="disabledExampleForm"&gt;
  &lt;auro-input id="first-name" name="firstName" required&gt;
    &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="last-name" name="lastName" required&gt;
    &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="loyalty-number" name="loyaltyNumber" value="AS-123456" disabled&gt;
    &lt;span slot="label"&gt;Mileage Plan number&lt;/span&gt;
    &lt;span slot="helpText"&gt;Account number is read-only and is not submitted with the form.&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;
&lt;output id="disabledExampleOutput" aria-live="polite"&gt;Submit the form to see what data gets stored.&lt;/output&gt;
&lt;style&gt;
  #disabledExampleOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableAfterEdit">Disabling a field after user edits</auro-header>
<p>If a field is disabled <em>after</em> the user has edited it, the value is still excluded from <code>form.value</code>, validation, and the submit payload — but the form correctly reports as non-initial and Reset remains enabled. Type into the field below, then click "Disable field" to observe the behavior. Submit to see the form's current <code>value</code> and <code>isInitialState</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-after-edit.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-after-edit.html -->
<auro-form id="disableAfterEditForm">
<auro-input id="dae-field" name="comment">
<span slot="label">Comment</span>
</auro-input>
<br />
<auro-button id="dae-toggle" type="button">Disable field</auro-button>
<auro-button type="submit">Submit</auro-button>
<auro-button type="reset">Reset</auro-button>
</auro-form>
<output id="disableAfterEditOutput" aria-live="polite">Type something, then click "Disable field". The form correctly reports as non-initial, Reset stays enabled, and the field is excluded from the submit payload.</output>
<style>
          #disableAfterEditOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-after-edit.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-after-edit.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="disableAfterEditForm"&gt;
  &lt;auro-input id="dae-field" name="comment"&gt;
    &lt;span slot="label"&gt;Comment&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button id="dae-toggle" type="button"&gt;Disable field&lt;/auro-button&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;auro-button type="reset"&gt;Reset&lt;/auro-button&gt;
&lt;/auro-form&gt;
&lt;output id="disableAfterEditOutput" aria-live="polite"&gt;Type something, then click "Disable field". The form correctly reports as non-initial, Reset stays enabled, and the field is excluded from the submit payload.&lt;/output&gt;
&lt;style&gt;
  #disableAfterEditOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="behaviorChangesV6">Behavior changes in v6</auro-header>
<p>This release brings <code>auro-form</code> closer to native HTML form semantics. The following are consumer-visible behavior changes from previous versions:</p>
<ul>
<li><strong><code>form.value</code> omits disabled fields.</strong> Any control with the <code>disabled</code> attribute is excluded from <code>form.value</code> and from the <code>submit</code> event's <code>detail.value</code>. <em>Migration:</em> if you were using <code>disabled</code> on a populated field to carry a value through to submission (for example, a read-only account number or a preset reference id), switch that field to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden"><code>&lt;input type="hidden"&gt;</code></a> — hidden inputs are submitted with the form even though they are not interactive, which is the native pattern for "include this value, but don't show or validate it."</li>
<li><strong>Disabled required fields no longer block submission.</strong> A form whose only invalid field is a <code>disabled</code> + <code>required</code> field is now submittable. Per the HTML spec, disabled controls do not participate in constraint validation.</li>
<li><strong><code>isInitialState</code> uses a dirty-value-flag model.</strong> A field taints the form only when its current value diverges from its captured initial value (or enters an error validity state). A pre-filled form whose user has not yet edited anything reports <code>isInitialState === true</code>; previously, any non-null value would mark the form as non-initial. Disabling a previously-edited field does <em>not</em> clear the dirty flag — the form correctly remains non-initial. <em>Migration:</em> if you were using <code>isInitialState === false</code> as a proxy for "user has interacted with the form," use a per-field <code>touched</code> signal on each <code>auro-input</code> instead.</li>
<li><strong>Submit availability depends on validity alone.</strong> The Submit button is enabled when no enabled field has an unmet constraint, regardless of <code>isInitialState</code>. Pre-filled valid forms (for example, forms pre-populated from a logged-in user's profile) can be submitted on first render without a prior user edit. Empty forms with only optional fields also have Submit enabled at first render. Previously both cases would have been blocked.</li>
<li><strong>Focus/blur on an optional field no longer taints the form.</strong> Tabbing through an optional field that the user did not edit no longer flips <code>isInitialState</code> to <code>false</code>. Required fields are unaffected — focusing then blurring an empty required field still taints, because the resulting <code>'valueMissing'</code> validity is an error state. <em>Migration:</em> if you needed "user has engaged with the form" as a signal, use per-field <code>touched</code> state on each <code>auro-input</code>.</li>
</ul>
<auro-header level="3" id="runtimeMutations">Runtime DOM mutations</auro-header>
<p><code>auro-form</code> tracks its child form elements through a subtree <code>MutationObserver</code> on <code>name</code> and <code>disabled</code> attributes, plus a slot-change listener. The following runtime patterns are supported without any consumer-side reinitialization:</p>
<ul>
<li><strong>Runtime renames.</strong> Changing the <code>name</code> attribute on a tracked field re-keys <code>formState</code> and migrates the captured initial value to the new key, preserving <code>isInitialState</code> semantics across the rename. <code>form.value</code> reflects the new key on the next render. Removing the <code>name</code> attribute drops the field from <code>formState</code> and prunes its captured initial.</li>
<li><strong>Late name attachment.</strong> An element that initially renders without a <code>name</code> is invisible to <code>auro-form</code> (it queries via <code>form</code>). When the consumer adds a <code>name</code> attribute later, the field is picked up automatically — both <code>formState</code> registration and the <code>input</code>/<code>auroFormElement-validated</code>/<code>keydown</code> listeners are wired up via the same attribute observer.</li>
<li><strong>Reset gating.</strong> The Reset button is enabled whenever the form is dirty (<code>isInitialState === false</code>), or any non-disabled field carries a current or default value. A disabled field carrying only its captured initial value does <em>not</em> enable Reset; a previously-edited field that has since been disabled <em>does</em> (the dirty flag persists across disabling, so the user always has a UI path back to the initial state).</li>
<li><strong>Enter-to-submit on disabled fields.</strong> Pressing Enter inside a disabled form field never submits the form, matching native HTML behavior. Disabled controls do not dispatch the implicit submit, so the user must move focus to an enabled field (or click Submit) to trigger submission.</li>
</ul>
</section>
</div>
</div>
</div>
