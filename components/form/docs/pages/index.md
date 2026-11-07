<auro-header level="1" id="overview">Form</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#description">Description</auro-anchorlink>
      <auro-anchorlink fluid href="#formValueGeneration">Form value generation</auro-anchorlink>
      <auro-anchorlink fluid href="#formDataStructure" class="level2 body-xs">Form data structure</auro-anchorlink>
      <auro-anchorlink fluid href="#accessingFormData">Accessing form data</auro-anchorlink>
      <auro-anchorlink fluid href="#basicExample">Basic form example</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="description">Description</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="formValueGeneration">Form value generation</auro-header>
        <p><code>auro-form</code> gathers the values of all the Auro form elements in a form into a single object, so you can collect form data in a structured way without reading each field.</p>
        <p>For the form to collect an Auro form element automatically, the element must meet both of these requirements:</p>
        <ol>
          <li>It <strong>must</strong> have a <code>name</code> attribute, the same as in plain HTML forms.</li>
          <li>It <strong>must</strong> be an Auro form element. See the section on custom elements for more information.</li>
        </ol>
        <p>Form elements don't need to be direct children of <code>auro-form</code>. Nest them in other elements for styling, such as a <code>div</code>, <code>span</code>, or <code>fieldset</code>.</p>
        <auro-header level="3" id="formDataStructure">Form data structure</auro-header>
        <p>When the elements are registered correctly, <code>auro-form</code> automatically recognizes the Auro form elements and collects their data in the form's <code>value</code> property as one object.</p>
        <p>The form uses each enabled element's <code>name</code> attribute as the key and the element's <code>value</code> as the value. A <code>range</code> <code>auro-datepicker</code> adds its <code>values</code> array, <code>[start, end]</code>, instead, once the user enters dates.</p>
      </section>
      <section>
        <auro-header level="2" id="accessingFormData">Accessing form data</auro-header>
        <p>Auro components are framework-agnostic, so you read form data with plain JavaScript. If you've worked with a standard HTML form, you already know the pattern.</p>
        <p>Once you have a reference to the form element, such as a React ref or the result of <code>querySelector</code>, read the form data from these properties:</p>
        <p><strong>Form data</strong>:</p>
        <ul>
          <li><code>.value</code>: The current values of all named, enabled form elements, as one object.</li>
          <li><code>.validity</code>: The form's validity: <code>valid</code>, <code>invalid</code>, or <code>null</code> while the form is in its initial state.</li>
        </ul>
        <p><strong>Extra information</strong>:</p>
        <ul>
          <li><code>.isInitialState</code>: <code>true</code> while every field holds its starting value and no field has failed validation.</li>
        </ul>
        <p><strong>Events</strong>:</p>
        <ul>
          <li><code>input</code>: Fires when a child form element receives user input.</li>
          <li><code>change</code>: Fires when a child form element's value changes, and when the form rebuilds its state.</li>
          <li><code>reset</code>: Fires after the form resets.</li>
          <li><code>submit</code>: Fires when the form is submitted and no enabled field is invalid or required but empty.</li>
        </ul>
      </section>
      <section>
        <auro-header level="2" id="basicExample">Basic form example</auro-header>
        <p>The smallest working form needs one named <code>auro-input</code>. Add an <code>auro-button</code> with <code>type="submit"</code> so users can submit it.</p>
        <p><code>auro-form</code> runs <code>submit()</code> when someone clicks a <code>button</code> or <code>auro-button</code> with <code>type="submit"</code> inside it.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
