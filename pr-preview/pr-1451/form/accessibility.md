<auro-header level="1" id="overview">Form - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="formRole">Form Role</auro-header>
<p>The <code>auro-form</code> component renders as a container element that wraps Auro form elements. It does not add an explicit ARIA role — the semantic meaning comes from the form elements within it.</p>
</section>
<section>
<auro-header level="2" id="labelRequirements">Label Requirements</auro-header>
<p>Each Auro form element inside <code>auro-form</code> is individually responsible for providing accessible labels. Ensure every <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, and other form elements include proper label content via their <code>label</code> slot or <code>aria-label</code> attribute.</p>
</section>
<section>
<auro-header level="2" id="validation">Validation and Error Announcement</auro-header>
<p>When <code>submit()</code> is called and a form element is invalid, the error state is surfaced on each element. Error messages are announced to assistive technology users via the individual form element's help text region.</p>
</section>
<section>
<auro-header level="2" id="keyboardInteraction">Keyboard Interaction</auro-header>
<p>The <code>auro-form</code> component does not participate in the tab sequence itself. Each child form element is independently focusable. Pressing <code>Enter</code> while focused on a form element (not a textarea) will trigger form submission.</p>
</section>
</div>
</div>
</div>
