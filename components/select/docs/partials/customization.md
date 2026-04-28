<auro-header level="2" id="appearance">Customize Appearance</auro-header>
<auro-header level="3" id="appearance">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noCheckmark">Hide checkmark indicators</auro-header>
<p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set the <code>nocheckmark</code> attribute on the <code>auro-menu</code> element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="2" id="customBehavior">Customize Behavior</auro-header>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>The entire component may be disabled. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
<p>When the component is disabled and part of a form, the components value is still included in the form submission.</p>
<p class="note">
<strong>Note:</strong> If the component is marked as both <strong>invalid</strong> and <code>disabled</code>, the <strong>invalid</strong> state UI/UX and functional behavior are ignored. The <code>disabled</code> UI/UX and functional behavior works normally.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableOptions">Disable Option(s)</auro-header>
<p>The component may be rendered with one or more <code>disabled</code> options. When navigating the list of options with the keyboard or assistive technology to mark the next or previous option as active, disabled options will be skipped, jumping to the next enabled option.</p>
<p>While using the pointer to mark options as active, hovering over disabled options will be ignored and the previous active option will remain active.</p>
<p class="note">
<strong>Note:</strong> If the currently <code>selected</code> option is marked as <code>disabled</code>, the component value is reset to <code>undefined</code> and the component validation workflow is performed (e.g., if the component instance is <code>required</code> it will set <code>validity="valueMissing".</code>).
</p>
<p class="note">
<strong>Note:</strong> marking all options as disabled is not supported. Disable the component instead.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-options.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
<p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
<p>When the component is marked required:</p>
<ol>
<li>Move focus to the auro-select element</li>
<li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
<li>Navigate the list of options</li>
<li>
    Collapse the bib without making a selection
    <p class="note">
    This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.
    </p>
</li>
<li>Activate the trigger</li>
<li>Navigate the list of options marking any option as active</li>
<li>
    Select the active option
    <p class="note">
    This will re-render the component and the validation error state will be removed.
    </p>
</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force an error state</auro-header>
<p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current selection.</p>
<p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
<p>Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom validation messages</auro-header>
<p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
<ul>
<li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
<li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
</ul>
<p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message. Default messages are provided by the browser and are pre-localized to the language the browser is running in.</p>
<auro-header level="3" id="placeholder">Placeholder</auro-header>
<p>Use the <code>placeholder</code> attribute to define custom placeholder text that is displayed in the trigger before a value has been selected.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="fluid">Fluid</auro-header>
<p>When the <code>fluid</code> attribute is present, the component will expand to 100% width of its container element. This is useful for form layouts where the select should fill the available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fluid.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="flexMenuWidth">Flex menu width</auro-header>
<p>By default, the bib width matches the trigger width. Setting the <code>flexMenuWidth</code> attribute allows the bib to size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match Width</auro-header>
<p>When the <code>matchWidth</code> attribute is present, the popover bib and trigger will be set to the same width. This ensures the dropdown menu appears at exactly the same width as the trigger element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="size">Size</auro-header>
<p>The <code>size</code> attribute determines the size of the dropdown bib. Only the <code>emphasized</code> layout supports <code>size="xl"</code>, while all other layouts support <code>size="lg"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/size.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/size.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placement">Placement</auro-header>
<p>The <code>placement</code> attribute defines the position where the dropdown bib should appear relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noFlip">No Flip</auro-header>
<p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>. By default, the bib will automatically reposition itself to remain visible within the viewport.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-flip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-flip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="offset">Offset</auro-header>
<p>The <code>offset</code> attribute defines the gap (in pixels) between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/offset.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/offset.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="shift">Shift</auro-header>
<p>When the <code>shift</code> attribute is present, the dropdown bib will shift its position to avoid being cut off by the viewport. This is useful when the bib would otherwise extend beyond the edge of the screen.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
