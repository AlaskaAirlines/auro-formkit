<auro-header level="1" id="overview">Form: Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="formRole">Form role</auro-header>
<p>The <code>auro-form</code> component renders as a container element that wraps Auro form elements. It doesn't add an explicit ARIA role. The meaning comes from the form elements inside it.</p>
</section>
<section>
<auro-header level="2" id="labelRequirements">Label requirements</auro-header>
<p>Each Auro form element inside <code>auro-form</code> provides its own accessible label. Give every form element label content, such as the <code>label</code> slot on <code>auro-input</code> and <code>auro-select</code>, the <code>fromLabel</code> slot on <code>auro-datepicker</code>, or the <code>legend</code> slot on <code>auro-checkbox-group</code> and <code>auro-radio-group</code>.</p>
</section>
<section>
<auro-header level="2" id="validation">Validation and error announcement</auro-header>
<p>When <code>submit()</code> runs and a form element is invalid, each invalid element shows its error. Screen readers announce the error message through that form element's help text region.</p>
</section>
<section>
<auro-header level="2" id="keyboardInteraction">Keyboard interaction</auro-header>
<p>The <code>auro-form</code> component isn't in the tab sequence itself. Each child form element is focusable on its own. Pressing <code>Enter</code> in a named, enabled form element runs <code>submit()</code>, which validates the form and submits it when no enabled field is invalid or required but empty.</p>
</section>
</div>
</div>
</div>
