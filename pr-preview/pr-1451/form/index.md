<auro-header level="1" id="overview">Form</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#formValueGeneration">Form Value Generation</auro-anchorlink>
<auro-anchorlink fluid href="#formDataStructure" class="level2 body-xs">Form Data Structure</auro-anchorlink>
<auro-anchorlink fluid href="#accessingFormData">Accessing Form Data</auro-anchorlink>
<auro-anchorlink fluid href="#basicExample">Basic Form Example</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<code>&lt;auro-form&gt;</code> is a <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" target="_blank">HTML custom element</auro-hyperlink> designed to
serve as the base logic for all auro-constructed forms.

It automatically "scrapes" its inner content for any auro form elements, and surfaces
them (along with events) to the parent form element as a JSON object.
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="formValueGeneration">Form Value Generation</auro-header>
<p>Auro form exists to make a developer's life easier through surfacing all Auro form elements in a given form as a single JSON object. The most common use case the Auro team identified when building Form was the need to collect form data in a structured way.</p>
<p>The following is required on each Auro form element in a form for it to be collected automatically:</p>
<ol>
<li>It <strong>must</strong> have a <code>name</code> attribute. This is required in vanilla HTML forms, and we follow the same pattern.</li>
<li>It <strong>must</strong> be an Auro form element. See the section on custom elements for more information.</li>
</ol>
<p>That being said, we do <em>not</em> require form elements to be direct children of <code>auro-form</code>. They can be nested within other elements for styling, such as a <code>div</code>, <code>span</code> or <code>fieldset</code>.</p>
<auro-header level="3" id="formDataStructure">Form Data Structure</auro-header>
<p>In a correctly registered scenario, <code>auro-form</code> will automatically recognize the auro form elements and collect data from each on the form's <code>value</code> key as a JSON object.</p>
<p>Each element will be added using the element's <code>name</code> attribute as the key, and the element's <code>value</code> as the value.</p>
</section>
<section>
<auro-header level="2" id="accessingFormData">Accessing Form Data</auro-header>
<p>As Auro components are designed to be framework-agnostic, data can be retrieved using simple vanilla JavaScript patterns. If you have ever worked with a standard HTML5 form, you are already equipped to work with Auro forms!</p>
<p>Once you have a reference to the form element (React ref, querySelector, etc.), you can access the form data using the following methods:</p>
<p><strong>Data Keys + Get Methods</strong>:</p>
<ul>
<li><code>.value</code> - Getter which returns the current form data as a JSON object.</li>
<li><code>.validity</code> - Returns the current validity state of the form (<code>valid</code> or <code>invalid</code>).</li>
</ul>
<p><strong>Extra Information</strong>:</p>
<ul>
<li><code>.isInitialState</code> - Returns a boolean indicating if the form is in its initial state.</li>
</ul>
<p><strong>Events</strong>:</p>
<ul>
<li><code>input</code> - Fires when the form state changes.</li>
<li><code>reset</code> - Fires when the form is reset.</li>
<li><code>submit</code> - Fires when the form is submitted.</li>
</ul>
</section>
<section>
<auro-header level="2" id="basicExample">Basic Form Example</auro-header>
<p>The most basic form implementation requires an <code>auro-input</code> and an optional auro button with <code>type="submit"</code>.</p>
<p>By default, Auro Form connects a <code>submit</code> event to all <code>type="submit"</code> buttons within the form.</p>
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
<pre class="language-html"><code class="language-html">&lt;auro-form&gt;
  &lt;auro-input id="search-box" name="searchBox" required&gt;
    &lt;span slot="label"&gt;Search flights&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
