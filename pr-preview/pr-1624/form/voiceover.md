<auro-header level="1" id="overview">Form - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-form&gt;</code> component. It covers announcements, interactions, and workflows for form submission and validation.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFormContainer">Form Container</auro-header>
<p>The <code>auro-form</code> element itself does not receive focus and is not announced by VoiceOver. It acts as a passive container. The individual form elements within it are what VoiceOver interacts with.</p>
<auro-header level="3" id="voiceOverFormElements">Child Form Elements</auro-header>
<p>Each Auro form element within the form (e.g., <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>) announces independently when focused:</p>
<ol>
<li><strong>Label:</strong> The element's label content</li>
<li><strong>Role:</strong> Appropriate role for the element type (e.g., <em>"text field"</em>, <em>"pop-up button"</em>)</li>
<li><strong>Required state:</strong> <em>"required"</em> if the element has the <code>required</code> attribute</li>
<li><strong>Value:</strong> The current value if one is set</li>
<li><strong>Help text:</strong> Additional description from the <code>helpText</code> slot</li>
</ol>
<auro-header level="3" id="voiceOverValidation">Validation Errors</auro-header>
<p>When <code>submit()</code> is called and a form element fails validation:</p>
<ul>
<li>The error state is applied to the invalid element</li>
<li>The help text region updates to show the validation error message</li>
<li>VoiceOver announces the error through the element's accessible description when it receives focus</li>
</ul>
<auro-header level="2" id="voiceOverWorkflow">Submission Workflow</auro-header>
<ol>
<li><strong>Navigate form elements:</strong> Tab through each form element; VoiceOver announces labels, roles, and states</li>
<li><strong>Enter values:</strong> Interact with each element to provide input</li>
<li><strong>Submit:</strong> Focus the submit button and activate it, or press <code>Enter</code> while focused on any form element</li>
<li><strong>Validation feedback:</strong> If validation fails, focus moves to (or remains on) the invalid element and VoiceOver announces the error</li>
</ol>
<auro-header level="2" id="voiceOverReset">Reset Workflow</auro-header>
<ol>
<li><strong>Focus reset/cancel button:</strong> VoiceOver announces <em>"Cancel"</em> or <em>"Reset"</em> button label</li>
<li><strong>Activate:</strong> All form elements return to their initial state</li>
<li><strong>Announcement:</strong> VoiceOver announces the focused element's cleared state</li>
</ol>
<auro-header level="2" id="voiceOverKeyboard">Keyboard Interaction</auro-header>
<p><strong>Enter key:</strong> When focused on a form element (not a textarea), pressing Enter triggers form submission. VoiceOver users can use this as an alternative to navigating to the submit button.</p>
