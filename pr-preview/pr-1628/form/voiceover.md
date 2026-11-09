<auro-header level="1" id="overview">Form: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-form&gt;</code> component. It covers announcements, interactions, and workflows for form submission and validation.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>
<auro-header level="3" id="voiceOverFormContainer">Form container</auro-header>
<p>The <code>auro-form</code> element itself doesn't receive focus, and VoiceOver doesn't announce it. It acts as a passive container. The individual form elements within it are what VoiceOver interacts with.</p>
<auro-header level="3" id="voiceOverFormElements">Child form elements</auro-header>
<p>Each Auro form element within the form, such as <code>auro-input</code>, <code>auro-select</code>, or <code>auro-datepicker</code>, announces independently when focused:</p>
<ol>
<li><strong>Label:</strong> The element's label content</li>
<li><strong>Role:</strong> The role for the element type, such as <em>"text field"</em> or <em>"pop-up button"</em></li>
<li><strong>Required state:</strong> <em>"required"</em> if the element has the <code>required</code> attribute</li>
<li><strong>Value:</strong> The current value if one is set</li>
<li><strong>Help text:</strong> The <code>helpText</code> slot content, for elements that link it to their input, such as <code>auro-input</code>. Some elements, such as <code>auro-select</code> and <code>auro-combobox</code>, don't currently link it, so VoiceOver doesn't read it on focus.</li>
</ol>
<auro-header level="3" id="voiceOverValidation">Validation errors</auro-header>
<p>When <code>submit()</code> runs and a form element fails validation:</p>
<ul>
<li>The invalid element shows its error state.</li>
<li>The help text region updates to show the validation error message.</li>
<li>For elements that link their help text, such as <code>auro-input</code>, VoiceOver reads the error as the element's description when it receives focus. For other elements, such as <code>auro-select</code> and <code>auro-combobox</code>, VoiceOver doesn't currently read the error on focus. It announces their error only when it appears, through the help text region's <code>role="alert"</code>.</li>
</ul>
<auro-header level="2" id="voiceOverWorkflow">Submission workflow</auro-header>
<ol>
<li><strong>Navigate form elements:</strong> Tab through each form element; VoiceOver announces labels, roles, and states.</li>
<li><strong>Enter values:</strong> Interact with each element to provide input.</li>
<li><strong>Submit:</strong> Focus the submit button and activate it, or press <code>Enter</code> while focus is on a named, enabled form element.</li>
<li><strong>Validation feedback:</strong> If validation fails, each invalid element shows its error. <code>auro-form</code> doesn't move focus, so VoiceOver reads the error when the user moves to an invalid element that links its help text, such as <code>auro-input</code>.</li>
</ol>
<auro-header level="2" id="voiceOverReset">Reset workflow</auro-header>
<ol>
<li><strong>Focus the reset button:</strong> VoiceOver announces the button's label, such as <em>"Reset"</em>.</li>
<li><strong>Activate:</strong> Each form element resets itself; for example, <code>auro-input</code> clears its value.</li>
<li><strong>Announcement:</strong> VoiceOver announces the focused element's cleared state.</li>
</ol>
<auro-header level="2" id="voiceOverKeyboard">Keyboard interaction</auro-header>
<p><strong>Enter key:</strong> When focus is on a named, enabled form element, pressing Enter runs <code>submit()</code>, which validates the form and submits it when no enabled field is invalid or required but empty. VoiceOver users can use this as an alternative to navigating to the submit button.</p>
