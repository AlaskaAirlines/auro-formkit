<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-radio-group slots</auro-header>
<auro-header level="4" id="slot-legend">legend</auro-header>
<p>Label for the group, such as "Seat preference". The group shows it in a native <code>&lt;legend&gt;</code> element, and screen readers announce it as the group's name.</p>
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>The <code>helpText</code> slot shows help text below the radio group. While the group shows an error, the error message replaces it.</p>
<auro-header level="4" id="slot-optionalLabel">optionalLabel</auro-header>
<p>The <code>optionalLabel</code> slot replaces the default <em>"(optional)"</em> text that appears next to the legend when the group isn't <code>required</code>.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="3" id="slotsRadio">auro-radio slots</auro-header>
<auro-header level="4" id="slot-default-radio">(default)</auro-header>
<p>Label text for the radio button, such as "Window seat". Content in the default slot replaces the <code>label</code> attribute, so use it for richer labels, such as multiline text.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiline-group.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiline-group.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-content">content</auro-header>
<p>Named slot for additional content rendered below the radio button label. Use this for supplementary information or descriptions associated with a radio option.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/content-slot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/content-slot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
